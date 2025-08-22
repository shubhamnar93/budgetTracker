import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const postRouter = createTRPCRouter({
  userData: protectedProcedure.query(async ({ ctx }) => {
    // todo - replace with actual user data fetching logic
    const userData = await ctx.db.user.findUnique({
      where: { id: ctx.session.user.id },
    });
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const today = new Date().getDate();
    const daysLeft = daysInMonth - today;
    return {
      name: userData?.name || "User",
      monthlyBudget: userData?.Budget || 0,
      daysLeftInMonth: daysLeft,
    };
  }),
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
    for (let i = 0; i < transaction.length; i++) {
      if (transaction[i]?.type == "EXPENSE") {
        sum -= transaction[i]?.amount!;
      } else sum += transaction[i]?.amount!;
    }
    return sum;
  }),
  getMontlyBalance: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await ctx.db.transaction.findMany({
      where: { userId: ctx.session.user.id },
    });
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
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

    for (let i = 0; i < totalNumberOfTransaction; i++) {
      if (transactions[i]?.type == "EXPENSE") {
        monthlySpent += transactions[i]?.amount!;
      } else monthlyIncome += transactions[i]?.amount!;
    }

    return {
      monthlyIncome,
      monthlySpent,
      totalNumberOfTransaction,
    };
  }),
});
