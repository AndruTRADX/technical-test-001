import BgGrid from "@/components/background/BgGrid";
import Button from "@/components/common/Button";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { ButtonTypeSubmit } from "@/components/common/Button";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOptions"; 
import AuthProfileMenu from "@/components/common/AuthProfileMenu";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="relative flex min-h-screen flex-col justify-center items-center">
      <BgGrid />
      <article className="flex flex-col justify-center items-center gap-4 mb-24 px-8">
        <div className="bg-teal-500 rounded-full p-6 flex justify-center items-center mb-4">
          <ChatBubbleLeftEllipsisIcon className="w-24 h-24 text-white" />
        </div>
        <h2 className="content-title">
          Ready to embark on your{" "}
          <span className="span-decoration">learning journey</span>?
        </h2>
        <p className="content-paragraph">
          Seamless access to your classes, vibrant interactions with classmates,
          active participation, and an engaging learning experience await you.
        </p>

        <div className="flex gap-x-4 mt-8">
          {session ? (
            <>
              <Link href="/dashboard">
                <Button
                  text={"Get started"}
                  typeSubmit={ButtonTypeSubmit.BUTTON}
                />
              </Link>

              <AuthProfileMenu />
            </>
          ) : (
            <>
              <AuthProfileMenu />

              <Link href="/sign-up">
                <Button
                  text={"Sign Up"}
                  outline
                  typeSubmit={ButtonTypeSubmit.BUTTON}
                />
              </Link>
            </>
          )}
        </div>
      </article>
    </main>
  );
}
