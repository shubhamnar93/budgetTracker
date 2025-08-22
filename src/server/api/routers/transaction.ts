import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
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
});
