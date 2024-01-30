"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Button from "./Button";

const AuthProfileMenu = () => {
  const { data, status } = useSession();

  const isAuth = status === "authenticated";

  if (!isAuth) {
    return (
      <Link href="/login">
        <Button text="Log In" />
      </Link>
    );
  }

  return <Button text={`Log Out`} onClick={() => signOut()} outline />;
};

export default AuthProfileMenu;
