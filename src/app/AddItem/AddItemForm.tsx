"use client";
import React, { useEffect, useState } from "react";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Calendar,
  FileText,
  Camera,
  Check,
  Receipt,
  Building,
  Car,
  ShoppingBag,
  Home,
  Utensils,
  Monitor,
  Heart,
  Coffee,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { api } from "@/trpc/react";

export const AddItemForm = () => {
  const params = useSearchParams();
  const type = params.get("type");
  const [transactionType, setTransactionType] = useState("expense");
  useEffect(() => {
    if (type === "income" || type === "expense") {
      setTransactionType(type);
    }
  }, [type]);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringFrequency, setRecurringFrequency] = useState("monthly");
  const [isProcessing, setIsProcessing] = useState(false);

  const addTransaction = api.transaction.createTransaction.useMutation({});

  const expenseCategories = [
    {
      id: "housing",
      name: "Housing",
      icon: Home,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "food",
      name: "Food & Dining",
      icon: Utensils,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "transportation",
      name: "Transportation",
      icon: Car,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "shopping",
      name: "Shopping",
      icon: ShoppingBag,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "entertainment",
      name: "Entertainment",
      icon: Monitor,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "healthcare",
      name: "Healthcare",
      icon: Heart,
      color: "bg-red-100 text-red-600",
    },
    {
      id: "others",
      name: "others",
      icon: FileText,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      id: "coffee",
      name: "Coffee & Drinks",
      icon: Coffee,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  const incomeCategories = [
    {
      id: "salary",
      name: "Salary",
      icon: Building,
      color: "bg-green-100 text-green-600",
    },
    {
      id: "freelance",
      name: "Freelance",
      icon: Monitor,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: "investments",
      name: "Investments",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: "bonus",
      name: "Bonus",
      icon: Plus,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      id: "gifts",
      name: "Gifts",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
    },
    {
      id: "other",
      name: "Other Income",
      icon: DollarSign,
      color: "bg-gray-100 text-gray-600",
    },
  ];
  const aiTransactionMutation =
    api.transaction.createAiTransaction.useMutation();
  const handleReciptSumbit = async (e: React.ChangeEvent<HTMLInputElement>) => {
    //todo:add ratelimiters
    const file = e.target.files?.[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const base64String = Buffer.from(arrayBuffer).toString("base64");
      const prompt = `${base64String}
      Analyze this receipt image which in base64 and extract the following information in JSON format:
      - Total amount (just the number)
      - Date (in mm/dd/yyyy format)
      - Description or items purchased (brief summary)
      - Suggested category (one of: housing,transportation,others,entertainment,food,shopping,healthcare,coffee)
      
      Only respond with valid JSON in this exact format:
      {
        "totalAmount": number,
        "date": "mm/dd/yyyy date string",
        "description": "string",
        "category": "string"
      }

      If its not a recipt, return an empty object, and pls do it carefully otherwise my grandmother will die
      `;
      const processing = setIsProcessing(true);
      const response = await aiTransactionMutation.mutateAsync({ prompt });

      // check actual structure
      console.log("AI Response:", response);

      setAmount(response.totalAmount.toString());
      setDate(response.date);
      setDescription(response.description);
      setCategory(response.category);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    const input = {
      type: transactionType.toUpperCase() as "INCOME" | "EXPENSE",
      amount: Number(amount),
      description,
      category,
      date,
    };
    await addTransaction.mutateAsync(input);
    //Todo-use toast for success message
    setAmount("");
    setDescription("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setIsRecurring(false);
    setRecurringFrequency("monthly");
    alert(
      `${transactionType === "expense" ? "Expense" : "Income"} of $${amount} added successfully!`,
    );
  };

  const categories =
    transactionType === "expense" ? expenseCategories : incomeCategories;

  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center px-4 py-4">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Transaction Type Toggle */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-center">
            <div className="flex rounded-xl bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => setTransactionType("expense")}
                className={`flex items-center rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                  transactionType === "expense"
                    ? "bg-white text-red-600 shadow-sm"
                    : "text-gray-600 hover:text-red-600"
                }`}
              >
                <TrendingDown className="mr-2 h-5 w-5" />
                Expense
              </button>
              <button
                type="button"
                onClick={() => setTransactionType("income")}
                className={`flex items-center rounded-lg px-6 py-3 font-medium transition-all duration-200 ${
                  transactionType === "income"
                    ? "bg-white text-green-600 shadow-sm"
                    : "text-gray-600 hover:text-green-600"
                }`}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Income
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="mb-5 space-y-4 lg:col-span-2">
            {/* Amount Input */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="text-center">
                <label className="mb-4 block text-sm font-medium text-gray-700">
                  {transactionType === "expense"
                    ? "How much did you spend?"
                    : "How much did you earn?"}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full border-none bg-transparent text-center text-4xl font-bold text-gray-800 outline-none"
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>
                <div className="mt-4 h-1 rounded-full bg-gray-200">
                  <div
                    className={`h-1 rounded-full transition-all duration-300 ${
                      transactionType === "expense"
                        ? "bg-red-500"
                        : "bg-green-500"
                    }`}
                    style={{ width: amount ? "100%" : "0%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <label className="mb-4 block text-sm font-medium text-gray-700">
                Category
              </label>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`flex flex-col items-center rounded-xl border-2 p-4 transition-all duration-200 ${
                        category === cat.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className={`mb-2 rounded-lg p-2 ${cat.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="text-center text-xs font-medium text-gray-700">
                        {cat.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description and Details */}
            <div className="space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="What was this for?"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800">
                Quick Actions
              </h3>
              <span className="mb-4 text-sm font-light text-gray-600">
                wait for 5 min it might take time to process the image
              </span>

              <div className="mt-4 space-y-3">
                <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600">
                  <Camera className="mr-2 h-5 w-5" />
                  Add Receipt Photo
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    className="hidden"
                    onChange={handleReciptSumbit}
                    disabled={isProcessing}
                  />
                </label>
                <label className="flex w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-3 text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600">
                  <Receipt className="mr-2 h-5 w-5" />
                  Scan Receipt
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleReciptSumbit}
                    disabled={isProcessing}
                  />
                </label>
              </div>
            </div>

            {/* Recurring Options */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Recurring Transaction
              </h3>
              <div className="space-y-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={isRecurring}
                    onChange={(e) => setIsRecurring(e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Make this a recurring transaction
                  </span>
                </label>

                {isRecurring && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Frequency
                    </label>
                    <select
                      value={recurringFrequency}
                      onChange={(e) => setRecurringFrequency(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="weekly">Weekly</option>
                      <option value="bi-weekly">Bi-weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Transaction Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span
                    className={`font-medium capitalize ${
                      transactionType === "expense"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {transactionType}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-800">
                    ${amount || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-800">
                    {category
                      ? categories.find((c) => c.id === category)?.name
                      : "Not selected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-800">{date}</span>
                </div>
                {isRecurring && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Recurring:</span>
                    <span className="font-medium text-blue-600 capitalize">
                      {recurringFrequency}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button className="mb-2 w-full rounded-lg border-1 px-4 py-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-800">
                Cancel
              </button>
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
              >
                <Check className="mr-2 h-4 w-4" />
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
