"use client";
import Image from 'next/image'
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <p>Youre Logged in</p>
      <button
        onClick={() => signOut()}
        className="bg-red-500 text-white font-bold px-6 py-2 mt-3"
      >
        Log Out
      </button>
    </Layout>
  )
}
