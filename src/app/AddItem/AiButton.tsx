import { Camera, Receipt, Loader2 } from "lucide-react";

interface AiButtonProps {
  onReceiptProcessed: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  isProcessing: boolean;
}

export const AiButton = ({
  onReceiptProcessed,
  isProcessing,
}: AiButtonProps) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
      <span className="mb-4 block text-sm font-light text-gray-600">
        {isProcessing
          ? "Processing receipt... This may take up to 5 minutes"
          : "Upload a receipt to automatically extract transaction details"}
      </span>

      <div className="mt-4 space-y-3">
        <label
          className={`flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 transition-colors ${
            isProcessing
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          {isProcessing ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Camera className="mr-2 h-5 w-5" />
          )}
          {isProcessing ? "Processing..." : "Add Receipt Photo"}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            capture="environment"
            className="hidden"
            onChange={onReceiptProcessed}
            disabled={isProcessing}
          />
        </label>

        <label
          className={`flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 transition-colors ${
            isProcessing
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer hover:border-gray-400 hover:text-gray-600"
          }`}
        >
          {isProcessing ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Receipt className="mr-2 h-5 w-5" />
          )}
          {isProcessing ? "Processing..." : "Scan Receipt"}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            onChange={onReceiptProcessed}
            disabled={isProcessing}
          />
        </label>
      </div>

      {isProcessing && (
        <div className="mt-4 rounded-lg bg-blue-50 p-3 text-sm text-blue-700">
          <div className="flex items-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span>Extracting receipt data...</span>
          </div>
        </div>
      )}
    </div>
  );
};
