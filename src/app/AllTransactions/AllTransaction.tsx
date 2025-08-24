"use client";
import { api } from "@/trpc/react";
import { Calendar, Filter, Minus, Plus, Search } from "lucide-react";
import { useMemo, useState } from "react";

export const AllTransaction = () => {
  const tran = api.transaction.getTransactions.useQuery().data ?? [];

  const [transactions] = useState(tran);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Get unique categories
  const categories = [...new Set(transactions.map((t) => t.category))];

  // Filter and sort transactions
  const filteredTransactions = useMemo(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesSearch =
        transaction.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || transaction.category === selectedCategory;
      const matchesType =
        selectedType === "all" || transaction.type === selectedType;

      return matchesSearch && matchesCategory && matchesType;
    });

    // Sort transactions
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "amount":
          aValue = Math.abs(a.amount);
          bValue = Math.abs(b.amount);
          break;
        case "date":
          aValue = new Date(a.date);
          bValue = new Date(b.date);
          break;
        case "category":
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          aValue = a.description.toLowerCase();
          bValue = b.description.toLowerCase();
      }

      if (sortOrder === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [
    transactions,
    searchTerm,
    selectedCategory,
    selectedType,
    sortBy,
    sortOrder,
  ]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  type Categories =
    | "food"
    | "transportation"
    | "entertainment"
    | "other"
    | "shopping"
    | "health"
    | "housing"
    | "salary"
    | "coffee"
    | "freelance"
    | "investments"
    | "bonus"
    | "gifts";

  const getCategoryColor = (category: Categories) => {
    const colors = {
      food: "bg-orange-100 text-orange-800",
      transportation: "bg-blue-100 text-blue-800",
      entertainment: "bg-purple-100 text-purple-800",
      other: "bg-yellow-100 text-yellow-800",
      shopping: "bg-pink-100 text-pink-800",
      health: "bg-green-100 text-green-800",
      housing: "bg-emerald-100 text-emerald-800",
      salary: "bg-green-100 text-green-600",
      coffee: "bg-orange-100 text-orange-600",
      freelance: "bg-blue-100 text-blue-600",
      investments: "bg-purple-100 text-purple-600",
      bonus: "bg-yellow-100 text-yellow-600",
      gifts: "bg-pink-100 text-pink-600",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pr-4 pl-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expenses</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
            <option value="category">Sort by Category</option>
            <option value="description">Sort by Description</option>
          </select>

          {/* Sort Order */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            All Transactions ({filteredTransactions.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      {formatDate(transaction.date.toString())}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(transaction.category as Categories)}`}
                    >
                      {transaction.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end">
                      {transaction.type === "INCOME" ? (
                        <Plus className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <Minus className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span
                        className={`text-sm font-medium ${transaction.type === "INCOME" ? "text-green-600" : "text-red-600"}`}
                      >
                        {formatCurrency(Math.abs(transaction.amount))}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="py-12 text-center">
            <div className="text-gray-500">
              <Filter className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">
                Try adjusting your search or filter criteria
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
