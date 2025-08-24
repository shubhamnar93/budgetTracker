import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { GoogleGenAI } from "@google/genai";
import { get } from "http";
import z from "zod";

export const transactionRouter = createTRPCRouter({
  getTransactions: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { date: "desc" },
    });
    return transactions;
  }),
  getTrasactions3: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: { date: "desc" },
      take: 3,
    });
    return transactions;
  }),

  getTotalBalance: protectedProcedure.query(async ({ ctx }) => {
    const transaction = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
    });
    let sum = 0;
    for (const t of transaction) {
      if (t?.type === "EXPENSE") {
        sum -= t?.amount ?? 0;
      } else {
        sum += t?.amount ?? 0;
      }
    }
    return sum;
  }),

  getMontlyBalance: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
    });
    const currentDay = new Date().getDay();
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    console.log(new Date().setDate);
    const monthlyTransaction = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        currentMonth == transactionDate.getMonth() &&
        currentYear == transactionDate.getFullYear()
      );
    });
    const totalNumberOfTransaction = monthlyTransaction.length;
    let monthlyIncome = 0;
    let monthlySpent = 0;

    for (const t of monthlyTransaction) {
      if (t?.type === "EXPENSE") {
        monthlySpent += t?.amount ?? 0;
      } else {
        monthlyIncome += t?.amount ?? 0;
      }
    }

    return {
      monthlyIncome,
      monthlySpent,
      totalNumberOfTransaction,
    };
  }),

  createTransaction: protectedProcedure
    .input(
      z.object({
        amount: z.number(),
        description: z.string(),
        date: z.string().optional(),
        category: z.string(),
        type: z.enum(["INCOME", "EXPENSE"]),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const transaction = await ctx.db.transaction.create({
        data: {
          userId,
          amount: input.amount,
          description: input.description,
          date: input.date ? new Date(input.date) : undefined, // <-- fix here
          category: input.category,
          type: input.type,
        },
      });
      return transaction;
    }),
  createAiTransaction: protectedProcedure
    .input(
      z.object({
        prompt: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
      });
      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: input.prompt,
      });
      const resposnseText = result.text;
      const cleanedText =
        resposnseText?.replace(/```(?:json)?\n?/g, "").trim() ?? "";
      const data = JSON.parse(cleanedText) as {
        totalAmount: number;
        date: string;
        description: string;
        category: string;
      };

      return data;
    }),

  getCategories: protectedProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id, type: "EXPENSE" },
    });
    let housing = 0;
    let food = 0;
    let transport = 0;
    let shopping = 0;
    let entertainment = 0;
    let healthcare = 0;
    let coffee = 0;
    let other = 0;
    for (const t of categories) {
      if (t.category === "housing") {
        housing += t.amount;
      } else if (t.category === "food") {
        food += t.amount;
      } else if (t.category === "transportation") {
        transport += t.amount;
      } else if (t.category === "shopping") {
        shopping += t.amount;
      } else if (t.category === "entertainment") {
        entertainment += t.amount;
      } else if (t.category === "healthcare") {
        healthcare += t.amount;
      } else if (t.category === "coffee") {
        coffee += t.amount;
      } else {
        other += t.amount;
      }
    }
    return {
      housing,
      food,
      transport,
      shopping,
      other,
      entertainment,
      healthcare,
      coffee,
    };
  }),
  getWeeklyBalance: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
    });

    const today = new Date();
    const currentDay = today.getDay(); // Sunday = 0, Monday = 1...
    const diffToMonday = currentDay === 0 ? -6 : 1 - currentDay;

    const startOfWeek = new Date(today);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(today.getDate() + diffToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    // Filter this week's transactions
    const weeklyTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= startOfWeek && transactionDate <= endOfWeek;
    });

    // Prepare structure for each day of the week
    const days: { date: string; income: number; spent: number }[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push({
        date: day.toISOString().split("T")[0] ?? "", // YYYY-MM-DD
        income: 0,
        spent: 0,
      });
    }

    // Fill in income and spent for each day
    for (const t of weeklyTransactions) {
      const transactionDate = new Date(t.date);
      const key = transactionDate.toISOString().split("T")[0];

      const dayData = days.find((d) => d.date === key);
      if (dayData) {
        if (t?.type === "EXPENSE") {
          dayData.spent += t?.amount ?? 0;
        } else {
          dayData.income += t?.amount ?? 0;
        }
      }
    }

    return {
      startOfWeek,
      endOfWeek,
      days, // array with income + spent for each day
    };
  }),
});
