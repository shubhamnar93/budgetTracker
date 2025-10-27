import z from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import FormData from "form-data";
import fetch from "node-fetch";

interface TabScannerResponse {
  token: string;
  status: string;
  message?: string;
}

interface TabScannerResult {
  token: string;
  status: "processing" | "done" | "error";
  result?: any;
  error?: string;
}

// Validation schemas
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"] as const;

const imageFileSchema = z.object({
  name: z.string(),
  type: z.enum(ALLOWED_MIME_TYPES),
  size: z.number().max(MAX_FILE_SIZE, "File size must be less than 10MB"),
  base64: z.string(), // Base64 encoded image data
});

export const tabscannerRouter = createTRPCRouter({
  processImage: protectedProcedure
    .input(
      z.object({
        files: z.array(imageFileSchema).min(1, "At least one file is required"),
        params: z.record(z.any()).optional().default({}),
      }),
    )
    .mutation(async ({ input }) => {
      const apiKey = process.env.TABCANNER_API_KEY;

      if (!apiKey) {
        throw new Error("TABCANNER_API_KEY is not configured");
      }

      const { files, params } = input;

      // Create FormData
      const formData = new FormData();

      // Add files to form data
      for (const file of files) {
        // Convert base64 to buffer
        const base64Data = file.base64.split(",")[1] || file.base64;
        const buffer = Buffer.from(base64Data, "base64");

        formData.append("file", buffer, {
          filename: file.name,
          contentType: file.type,
        });
      }

      // Add additional params
      Object.entries(params).forEach(([key, value]) => {
        formData.append(key, String(value));
      });

      try {
        // Make request to TabScanner API
        const response = await fetch(
          "https://api.tabscanner.com/api/2/process",
          {
            method: "POST",
            headers: {
              apikey: apiKey,
              ...formData.getHeaders(),
            },
            body: formData,
          },
        );

        if (!response.ok) {
          throw new Error(`TabScanner API error: ${response.statusText}`);
        }

        const result = (await response.json()) as TabScannerResponse;
        return result;
      } catch (error) {
        console.error("TabScanner API error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to process image",
        );
      }
    }),
  getResult: protectedProcedure
    .input(
      z.object({
        token: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const apiKey = process.env.TABCANNER_API_KEY;

      if (!apiKey) {
        throw new Error("TABCANNER_API_KEY is not configured");
      }

      try {
        const response = await fetch(
          `https://api.tabscanner.com/api/result/${input.token}`,
          {
            method: "GET",
            headers: {
              apikey: apiKey,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`TabScanner API error: ${response.statusText}`);
        }

        const result = (await response.json()) as TabScannerResult;
        return result;
      } catch (error) {
        console.error("TabScanner result fetch error:", error);
        throw new Error(
          error instanceof Error ? error.message : "Failed to fetch result",
        );
      }
    }),
});
