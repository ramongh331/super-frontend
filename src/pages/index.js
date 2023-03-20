import Head from "next/head";
import { signIn, signOut, getSession, useSession } from "next-auth/react";
import { MongoClient } from "mongodb";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  console.log('server side props have rendered')
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  // CONNECTING TO MONGO DATABASE
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  // REFERRING TO PRFOILE COLLECTION BASED ON THE CURRENT USER'S EMAIL
  const profileData = await db.collection("profile").findOne({ userEmail });
  
  client.close();

  // CONVERTING THE DATA INTO READABLE JSON
  const serializedData = JSON.parse(JSON.stringify(profileData));

  // RETURNING THE DATA AS PROPS
  return {
    props: {
      profileData: serializedData,
    },
  };
}

export default function Home({profileData}) {
  const {data: session } = useSession()
// THE REDIRECT URL IS SET DEPENDING ON THE CONDITION
  const [redirectUrl, setRedirectUrl ] = useState()

  // I THOUGHT THIS SHOULD HAPPEN AFTER SESSION DATA IS RECEIVED BUT IT ISN'T
  useEffect(() => {
    console.log('useEffect is running')
    if (profileData?.userEmail === session?.user?.email){
      setRedirectUrl('/connections')
      console.log('It was true')
    } else {
      setRedirectUrl('/profile/new')
      console.log('It was false')
    }
  }, [session])

  if (session) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h2>Home Page</h2>
          <button onClick={() => signOut()}>Sign Out</button>
          <h3>Profile Info</h3>
          <p>Signed in as: {session.user.name}</p>
          <p>Email: {session.user.email}</p>
        </main>
      </>
    );
  } else {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <h2>Home Page</h2>
          <button onClick={() => signIn('google', {callbackUrl: redirectUrl})}>Sign In</button>
        </main>
      </>
    );
  }
}
