import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  userData: protectedProcedure.query(async ({ ctx }) => {
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
});
