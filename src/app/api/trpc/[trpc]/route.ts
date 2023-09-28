import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { authRouter } from "@/server/routers/auth";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: authRouter,
    createContext: () => ({}),
  });

export { handler as GET, handler as POST };
