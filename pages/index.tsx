import { getSession, GetSessionParams } from "next-auth/react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Sidebar from "../components/sidebar";
import Center from "../components/center";
import Player from "../components/player";

const Home: NextPage = () => {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className="flex">
        <Sidebar />
        <Center />
      </main>
      <div className="sticky bottom-0">
        <Player />
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
}
