"use client";
import {
  ArrowRight,
  CreditCard,
  Target,
  TrendingUp,
  Wallet,
  Zap,
} from "lucide-react";

export const HeroContent = () => {
  return (
    <section className="relative overflow-hidden pt-20 pb-32">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-blue-200 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-purple-200 opacity-20 blur-3xl"></div>

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* Hero Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
              <Zap className="mr-2 h-4 w-4" />
              New: AI-Powered Expense Categorization
            </div>

            <h1 className="text-5xl leading-tight font-bold text-gray-900 lg:text-6xl">
              Take Control of Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Finances
              </span>
            </h1>

            <p className="text-xl leading-relaxed text-gray-600">
              The smartest way to track expenses, manage budgets, and achieve
              your financial goals. Join us and transform your finances.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                className="flex transform items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
                onClick={() => {
                  window.location.href = "/api/auth/signin";
                }}
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative">
            <div className="rotate-3 transform rounded-3xl bg-white p-8 shadow-2xl transition-transform duration-500 hover:rotate-0">
              <div className="space-y-6">
                {/* Mock Dashboard */}
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800">
                    This Month
                  </h3>
                  <div className="text-2xl font-bold text-green-600">
                    +$2,560
                  </div>
                </div>

                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-blue-100">Total Balance</span>
                    <Wallet className="h-5 w-5 text-blue-200" />
                  </div>
                  <div className="mb-2 text-3xl font-bold">$12,450.75</div>
                  <div className="h-2 w-full rounded-full bg-white/20">
                    <div className="h-2 w-3/4 rounded-full bg-white"></div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-xl bg-green-50 p-4 text-center">
                    <TrendingUp className="mx-auto mb-2 h-8 w-8 text-green-600" />
                    <div className="text-sm font-medium text-green-800">
                      Income
                    </div>
                    <div className="text-lg font-bold text-green-600">
                      $5,800
                    </div>
                  </div>
                  <div className="rounded-xl bg-red-50 p-4 text-center">
                    <CreditCard className="mx-auto mb-2 h-8 w-8 text-red-600" />
                    <div className="text-sm font-medium text-red-800">
                      Expenses
                    </div>
                    <div className="text-lg font-bold text-red-600">$3,240</div>
                  </div>
                  <div className="rounded-xl bg-blue-50 p-4 text-center">
                    <Target className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                    <div className="text-sm font-medium text-blue-800">
                      Goals
                    </div>
                    <div className="text-lg font-bold text-blue-600">85%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
