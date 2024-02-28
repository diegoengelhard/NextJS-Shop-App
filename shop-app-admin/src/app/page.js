"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import Layout from '../components/Layout';


export default function Home() {
  const { data: session, status } = useSession();
  console.log(session);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <h2>
        Welcome, <b>{session?.user?.name}</b>!
      </h2>
      <p>You're Logged in</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>
    </Layout>
  )
}