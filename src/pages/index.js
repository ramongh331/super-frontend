import Head from "next/head";
import { signIn, signOut, getSession } from "next-auth/react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  const profileData = await db.collection("profile").findOne({ userEmail });

  client.close();

  const serializedData = JSON.parse(JSON.stringify(profileData));

  return {
    props: {
      profileData: serializedData,
      session,
    },
  };
}

export default function Home({ session, profileData }) {
  const router = useRouter();
  

  const handleSignIn = async () => {
    // const redirectUrl = profileData ? "/connections" : "/profile/new"
    // console.log('Redirecting to: ' + redirectUrl)
    await signIn("google");
    
    // console.log({profileData, session})
  };

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
          <button onClick={handleSignIn}>Sign In</button>
        </main>
      </>
    );
  }
}
