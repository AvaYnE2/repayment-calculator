import { calculationRouter } from "@/server/api/routers/calculation";
import { createTRPCRouter } from "@/server/api/trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	calculation: calculationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
