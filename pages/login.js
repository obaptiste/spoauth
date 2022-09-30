import React, {useEffect, useState} from 'react'
import { getProviders, signIn} from "next-auth/react";

function Login({providers}) {

  return (
    <div className="flex flex-col items-center bg-black min-h-screen w-full justify-center">
      <img
        className="w-52 mb-5"
        src="https://1000logos.net/wp-content/uploads/2021/04/Spotify-logo.png"
        alt=""
      />
      {providers &&
        Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="bg-[#1BD860] text-white p-5 rounded-full"
              onClick={() => signIn(provider.id, { callbackUrl: "/" })}
            >
              Log in with {provider.name}
            </button>
          </div>
        ))}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();
  console.log(providers);
  //console.log(process.env.NEXT_PUBLIC_CLIENT_ID);
  return {
    props: { providers }
  } 
};