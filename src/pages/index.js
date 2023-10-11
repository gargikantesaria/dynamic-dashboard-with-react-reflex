import Head from "next/head";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Home(props) {

  return (
    <div className="">
      <Head>
        <title>Dynamic dashboard with react-reflex </title>
        <meta name="description" content="Dynamic dashboard with react-reflex Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
