import Card from '@/components/super-card'
import Head from 'next/head'
import { MongoClient } from "mongodb";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context){
    const session = await getSession(context)

// connect to mongodb
const client = await MongoClient.connect(process.env.MONGODB_URI);
const db = client.db(process.env.MONGODB_DB);

    // get all profiles from profile collection in db
    const profiles = await db.collection("profile").find().toArray();
    // const user = db.collection("users").findOne({_id: pid});

    client.close();

    const serializedProfiles = JSON.parse(JSON.stringify(profiles));
    console.log(serializedProfiles)

    return {
        props: {
            profiles: serializedProfiles
        }
    }
}



export default function Connections({profiles}) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2>Connections/Super Matches Page</h2>
       <section className="flex">
         {profiles.map((profile) => (
          <section className="bg-blue-200 w-60 h-60 text-2xl mx-2">
          <h3>{profile.sname}</h3>
          <h4>{profile.rname}</h4>
          <p>{profile.age}</p>
          <p>{profile.location}</p>
             </section>
         ))}
       </section>
        
      </main>
    </>
  )
}
