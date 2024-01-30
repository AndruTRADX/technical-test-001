import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"; 
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

const layout = async ({ children }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) redirect("/dashboard");

  return <>{children}</>;
};

export default layout;
