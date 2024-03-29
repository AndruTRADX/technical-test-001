import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"; 
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) redirect("/login");

  return (
    <main className="flex min-h-screen bg-white h-screen">{children}</main>
  );
};

export default layout;
