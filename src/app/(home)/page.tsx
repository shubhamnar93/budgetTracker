import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { CheckIsLogin } from "./chekIslogin";

export default async function Home() {
  const session = await auth();

  return (
    <HydrateClient>
      <CheckIsLogin authenticated={!!session} />
    </HydrateClient>
  );
}
