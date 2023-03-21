import Head from "next/head";
import Link from "next/link";
import { signOut, getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";
import { useState } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context)
  const userEmail = session?.user?.email
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  const pID = context.query.pid

  // CONNECT TO MONGODB DATABASE
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  // QUERY FOR SPECIFIC DATA
  const otherProfileData = await db.collection("profile").findOne({_id: new ObjectId(pID) });
  const currentUserProfile = await db.collection("profile").findOne({userEmail});

  client.close();

  // SERIALIZE DATA AND TURN IT INTO JSON
  const serializedOPData = JSON.parse(JSON.stringify(otherProfileData));
  const serializedCUData = JSON.parse(JSON.stringify(currentUserProfile));

  // ADD TO PROPS OBJECT TO EXTRACT AS PROPS IN THE PAGE JSX
  return {
    props: {
      otherProfileData: serializedOPData,
      currentUserProfile: serializedCUData,
      pID,
    }
  }

}



export default function View({ otherProfileData, pID, currentUserProfile}) {
  const [ownsProfile, setOwnsProfile] = useState(currentUserProfile?._id === pID ? 'visible' : 'hidden')

    return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <button onClick={() => signOut({callbackurl: "/"})}>Sign Out</button><br/>
        <Link href="/connections">Connections Page</Link> <br/>
        <Link href={`/profile/edit/${otherProfileData._id}`}><button className={`${ownsProfile}`}>Edit Profile</button></Link> 
        <form action="/api/delete-action" method="POST">
          <button className={`${ownsProfile}`} type="submit">Delete Profile</button>
          </form>


        <h2>View Profile Page of {otherProfileData.sname}</h2>
        <h2>Identity</h2>
        <p>Super Name: {otherProfileData.sname}</p>
        <p>Real Name: {otherProfileData.rname}</p>
        <p>Age: {otherProfileData.age}</p>
        <p>Location: {otherProfileData.location}</p>
        <p>Species: {otherProfileData.species}</p>
        <p>Gender: {otherProfileData.gender}</p>
        <p>Sexual Orientation: {otherProfileData.sex}</p>
        <h2>Attributes</h2>
        <p>Abilities: {otherProfileData.ability}</p>
        <p>Side: {otherProfileData.hva}</p>
        <p>Affiliation: {otherProfileData.tpi}</p>
        <h2>Bio</h2>
        <p>Backstory: {otherProfileData.story}</p>
      </main>
    </>
  )
}