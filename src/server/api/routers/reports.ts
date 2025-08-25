import { createTRPCRouter, protectedProcedure } from "../trpc";

export const reportRouter = createTRPCRouter({
  getWeeklyData: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const dayOfWeek = today.getDay();

    // Calculate Monday (start of week)
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((dayOfWeek + 6) % 7));
    monday.setHours(0, 0, 0, 0);

    // Calculate Sunday (end of week)
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    sunday.setHours(23, 59, 59, 999);

    const weeksTransaction = await ctx.db.transaction.findMany({
      where: {
        date: {
          gte: monday,
          lte: sunday,
        },
        userId: ctx.session.user.id,
      },
    });
    const categoryIncome = {
      salary: {
        id: "salary",
        total: 0,
      },
      freelance: {
        id: "freelance",
        total: 0,
      },
      investments: {
        id: "investments",
        total: 0,
      },
      bonus: {
        id: "bonus",
        total: 0,
      },
      gifts: {
        id: "gifts",
        total: 0,
      },
      other: {
        id: "other",
        total: 0,
      },
    };

    const dateData = [
      {
        day: "sunday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "monday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "tuesday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "wednessday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "thursday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "friday",
        income: 0,
        expense: 0,
        saving: 0,
      },
      {
        day: "saturday",
        income: 0,
        expense: 0,
        saving: 0,
      },
    ];

    const categoryExpense = {
      housing: {
        id: "housing",
        total: 0,
      },
      food: {
        id: "food",
        total: 0,
      },
      transportation: {
        id: "transportation",
        total: 0,
      },
      shopping: {
        id: "shopping",
        total: 0,
      },
      entertainment: {
        id: "entertainment",
        total: 0,
      },
      healthcare: {
        id: "healthcare",
        total: 0,
      },
      others: {
        id: "others",
        total: 0,
      },
      coffee: {
        id: "coffee",
        total: 0,
      },
    };

    type INCOMEcategory =
      | "salary"
      | "freelance"
      | "investments"
      | "bonus"
      | "gifts"
      | "other";

    type EXPENSEcategory =
      | "housing"
      | "food"
      | "transportation"
      | "shopping"
      | "entertainment"
      | "healthcare"
      | "others"
      | "coffee";

    // type day = 0 | 1 | 2 | 3 | 4 | 5 | 6;
    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of weeksTransaction) {
      const tDate = t.date.getDay();
      if (dateData[tDate]) {
        if (t.type === "EXPENSE" && dateData[tDate]) {
          categoryExpense[t.category as EXPENSEcategory].total += t.amount;
          dateData[tDate].expense += t.amount;
          totalExpense += t.amount;
        } else {
          categoryIncome[t.category as INCOMEcategory].total += t.amount;
          dateData[tDate].income += t.amount;
          totalIncome += t.amount;
        }
        dateData[tDate].saving =
          dateData[tDate].income - dateData[tDate].expense;
      }
    }

    const totalSavig = totalIncome - totalExpense;
    return {
      categoryExpense,
      dateData,
      categoryIncome,
      totalIncome,
      totalExpense,
      totalSavig,
    };
  }),
  getMonthlyData: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();

    // Start of current month
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    monthStart.setHours(0, 0, 0, 0);

    // End of current month
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    // Fetch all transactions for this month
    const monthsTransaction = await ctx.db.transaction.findMany({
      where: {
        date: {
          gte: monthStart,
          lte: monthEnd,
        },
        userId: ctx.session.user.id,
      },
    });

    // Income categories
    const categoryIncome = {
      salary: { id: "salary", total: 0 },
      freelance: { id: "freelance", total: 0 },
      investments: { id: "investments", total: 0 },
      bonus: { id: "bonus", total: 0 },
      gifts: { id: "gifts", total: 0 },
      other: { id: "other", total: 0 },
    };

    // Expense categories
    const categoryExpense = {
      housing: { id: "housing", total: 0 },
      food: { id: "food", total: 0 },
      transportation: { id: "transportation", total: 0 },
      shopping: { id: "shopping", total: 0 },
      entertainment: { id: "entertainment", total: 0 },
      healthcare: { id: "healthcare", total: 0 },
      others: { id: "others", total: 0 },
      coffee: { id: "coffee", total: 0 },
    };

    // Days in current month
    const daysInMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0,
    ).getDate();
    const dateData = Array.from({ length: daysInMonth }, (_, i) => ({
      day: (i + 1).toString(), // numeric day (1..31)
      income: 0,
      expense: 0,
      saving: 0,
    }));

    type INCOMEcategory =
      | "salary"
      | "freelance"
      | "investments"
      | "bonus"
      | "gifts"
      | "other";

    type EXPENSEcategory =
      | "housing"
      | "food"
      | "transportation"
      | "shopping"
      | "entertainment"
      | "healthcare"
      | "others"
      | "coffee";

    // Fill data

    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of monthsTransaction) {
      const dayOfMonth = t.date.getDate(); // 1..31
      const index = dayOfMonth - 1;
      if (dateData[index]) {
        if (t.type === "EXPENSE") {
          categoryExpense[t.category as EXPENSEcategory].total += t.amount;
          dateData[index].expense += t.amount;
          totalExpense += t.amount;
        } else {
          categoryIncome[t.category as INCOMEcategory].total += t.amount;
          dateData[index].income += t.amount;
          totalIncome += t.amount;
        }

        dateData[index].saving =
          dateData[index].income - dateData[index].expense;
      }
    }

    const totalSavig = totalIncome - totalExpense;
    return {
      categoryExpense,
      dateData,
      categoryIncome,
      totalIncome,
      totalExpense,
      totalSavig,
    };
  }),
  getQuarterlyData: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();
    const currentMonth = today.getMonth(); // 0–11
    const quarterStartMonth = Math.floor(currentMonth / 3) * 3;

    // Start of quarter
    const quarterStart = new Date(today.getFullYear(), quarterStartMonth, 1);
    quarterStart.setHours(0, 0, 0, 0);

    // End of quarter
    const quarterEnd = new Date(today.getFullYear(), quarterStartMonth + 3, 0);
    quarterEnd.setHours(23, 59, 59, 999);

    const quarterTransactions = await ctx.db.transaction.findMany({
      where: {
        date: {
          gte: quarterStart,
          lte: quarterEnd,
        },
        userId: ctx.session.user.id,
      },
    });

    // Income & expense categories (same as before)
    const categoryIncome = {
      salary: { id: "salary", total: 0 },
      freelance: { id: "freelance", total: 0 },
      investments: { id: "investments", total: 0 },
      bonus: { id: "bonus", total: 0 },
      gifts: { id: "gifts", total: 0 },
      other: { id: "other", total: 0 },
    };
    const categoryExpense = {
      housing: { id: "housing", total: 0 },
      food: { id: "food", total: 0 },
      transportation: { id: "transportation", total: 0 },
      shopping: { id: "shopping", total: 0 },
      entertainment: { id: "entertainment", total: 0 },
      healthcare: { id: "healthcare", total: 0 },
      others: { id: "others", total: 0 },
      coffee: { id: "coffee", total: 0 },
    };

    // Data per month of quarter
    const dateData = Array.from({ length: 3 }, (_, i) => ({
      day: new Date(
        today.getFullYear(),
        quarterStartMonth + i,
        1,
      ).toLocaleString("default", { month: "long" }),
      income: 0,
      expense: 0,
      saving: 0,
    }));

    type INCOMEcategory =
      | "salary"
      | "freelance"
      | "investments"
      | "bonus"
      | "gifts"
      | "other";
    type EXPENSEcategory =
      | "housing"
      | "food"
      | "transportation"
      | "shopping"
      | "entertainment"
      | "healthcare"
      | "others"
      | "coffee";

    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of quarterTransactions) {
      const monthIndex = t.date.getMonth() - quarterStartMonth;

      if (dateData[monthIndex]) {
        if (t.type === "EXPENSE") {
          categoryExpense[t.category as EXPENSEcategory].total += t.amount;
          dateData[monthIndex].expense += t.amount;
          totalExpense += t.amount;
        } else {
          categoryIncome[t.category as INCOMEcategory].total += t.amount;
          dateData[monthIndex].income += t.amount;
          totalIncome += t.amount;
        }

        dateData[monthIndex].saving =
          dateData[monthIndex].income - dateData[monthIndex].expense;
      }
    }

    const totalSavig = totalIncome - totalExpense;
    return {
      categoryExpense,
      dateData,
      categoryIncome,
      totalIncome,
      totalExpense,
      totalSavig,
    };
  }),
  getYearlyData: protectedProcedure.query(async ({ ctx }) => {
    const today = new Date();

    // Start & end of year
    const yearStart = new Date(today.getFullYear(), 0, 1);
    yearStart.setHours(0, 0, 0, 0);

    const yearEnd = new Date(today.getFullYear(), 11, 31);
    yearEnd.setHours(23, 59, 59, 999);

    const yearTransactions = await ctx.db.transaction.findMany({
      where: {
        date: {
          gte: yearStart,
          lte: yearEnd,
        },
        userId: ctx.session.user.id,
      },
    });

    // Income & expense categories (same as before)
    const categoryIncome = {
      salary: { id: "salary", total: 0 },
      freelance: { id: "freelance", total: 0 },
      investments: { id: "investments", total: 0 },
      bonus: { id: "bonus", total: 0 },
      gifts: { id: "gifts", total: 0 },
      other: { id: "other", total: 0 },
    };
    const categoryExpense = {
      housing: { id: "housing", total: 0 },
      food: { id: "food", total: 0 },
      transportation: { id: "transportation", total: 0 },
      shopping: { id: "shopping", total: 0 },
      entertainment: { id: "entertainment", total: 0 },
      healthcare: { id: "healthcare", total: 0 },
      others: { id: "others", total: 0 },
      coffee: { id: "coffee", total: 0 },
    };

    // Data for each month
    const dateData = Array.from({ length: 12 }, (_, i) => ({
      day: new Date(today.getFullYear(), i, 1).toLocaleString("default", {
        month: "long",
      }),
      income: 0,
      expense: 0,
      saving: 0,
    }));

    type INCOMEcategory =
      | "salary"
      | "freelance"
      | "investments"
      | "bonus"
      | "gifts"
      | "other";
    type EXPENSEcategory =
      | "housing"
      | "food"
      | "transportation"
      | "shopping"
      | "entertainment"
      | "healthcare"
      | "others"
      | "coffee";

    let totalIncome = 0;
    let totalExpense = 0;

    for (const t of yearTransactions) {
      const monthIndex = t.date.getMonth(); // 0–11

      if (dateData[monthIndex]) {
        if (t.type === "EXPENSE") {
          categoryExpense[t.category as EXPENSEcategory].total += t.amount;
          dateData[monthIndex].expense += t.amount;
          totalExpense += t.amount;
        } else {
          categoryIncome[t.category as INCOMEcategory].total += t.amount;
          dateData[monthIndex].income += t.amount;
          totalIncome += t.amount;
        }

        dateData[monthIndex].saving =
          dateData[monthIndex].income - dateData[monthIndex].expense;
      }
    }

    const totalSavig = totalIncome - totalExpense;
    return {
      categoryExpense,
      dateData,
      categoryIncome,
      totalIncome,
      totalExpense,
      totalSavig,
    };
  }),
  getTopExepense: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id, type: "EXPENSE" },
      orderBy: { amount: "desc" },
      take: 3,
    });
    return transactions;
  }),
});
