import Head from "next/head";
import React from "react";
import Logon from "./landing/index";

export default function Home() {
  return (
    <div>
      <Head>
        <title>ToDo Codex</title>
      </Head>
      <Logon />
    </div>
  );
}
