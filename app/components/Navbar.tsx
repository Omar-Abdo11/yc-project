import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation"; // لاستخدامه في Server Action
import { auth, signOut, signIn } from "@/auth";

// Server Action لتسجيل الخروج

// Server Action لتسجيل الدخول

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="px-5 py-3 bg-white text-black shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span>Create</span>
              </Link>
              <form
                action={async () =>{
                  "use server";
                  await signOut({ redirectTo: "/" });
                  redirect("/"); // تأكد من توجيه المستخدم بعد تسجيل الخروج
                }}
              >
                <button type="submit">Logout</button>
              </form>
              <Link href={`/user/${session?.user?.id}`}>
                <span>{session?.user?.name}</span>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
