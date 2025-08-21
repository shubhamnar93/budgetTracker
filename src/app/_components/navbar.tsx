import { auth } from "@/server/auth";
import { NavbarMenu } from "./navbarMenu";

export const Navbar = async () => {
  const session = await auth();
  return <NavbarMenu session={session} />;
};
