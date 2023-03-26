import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { MongoClient } from "mongodb";
import { getSession, signOut } from "next-auth/react";
import { useState } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userEmail = session.user.email;

  // tests to see if the user is signed in before rendering the page.
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // connect to mongodb
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  // get all profiles from profile collection in db
  const profiles = await db.collection("profile").find().toArray();
  const findProfile = await db.collection("profile").findOne({ userEmail });

  client.close();

  const serializedProfiles = JSON.parse(JSON.stringify(profiles));
  const serializedfindProfile = JSON.parse(JSON.stringify(findProfile));

  return {
    props: {
      findProfile: serializedfindProfile,
      profiles: serializedProfiles,
      email: userEmail,
    },
  };
}

export default function Connections({ profiles, findProfile, email }) {
  const [hasProfile, setHasProfile] = useState(
    findProfile?.userEmail === email ? "hidden" : ""
  );

  return (
    <>
      <Head>
        <title>Super</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="w-11/12 h-28 mx-auto flex items-center justify-between ">
        <Link href="/">
          <div className="flex items-center justify-between w-48">
            <img
              className="w-16"
              src="https://i.imgur.com/0BIn6HA.png"
              alt="Super Logo"
            />
            <h1 className="text-4xl text-[#4478ff] font-bold min-[320px]:hidden ">SUPER</h1>
          </div>
        </Link>
        <Link href="/profile/new">
          <motion.button className={`${hasProfile} text-xl bg-[#4478ff] text-white font-semibold p-2 rounded-lg`}
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }} >Set up Profile</motion.button>
        </Link>
        <section>
          <motion.button
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="text-xl font-semibold border-2 border-[#4478ff] rounded-md px-2"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </motion.button>
        </section>
      </header>
      <main className="w-full">
        <h3 className="text-center min-[320px]:text-5xl sm:text-7xl mb-10">Connections</h3>
        
        <section className="w-full flex flex-col items-center">
          {profiles.map((profile) => (
            <Link
              className=""
              key={profile._id}
              href={`/profile/view/${profile._id}`}
            >
              <motion.section
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                className="min-[320px]:w-72 sm:w-96 h-[40rem] text-2xl mb-20 relative overflow-hidden rounded-2xl hover:shadow-md hover:shadow-black hover:scale-105 transition ease-in-out bg-orange-300"
              >
                <img
                  className="w-full h-full object-cover absolute"
                  src="https://i.imgur.com/J2580PS.jpg"
                  alt="placeholder"
                />
                  <section className="absolute bottom-0 w-full p-4 text-white bg-black bg-opacity-70 backdrop-blur-md">
                  <div className="flex justify-between font-semibold text-3xl">
                    <h3>{profile.sname}</h3>
                    <p>{profile.age}</p>
                  </div>
                  <h4 className="text-xl">{profile.rname}</h4>
                  <p className="text-xl">{profile.location}</p>
                </section>
              </motion.section>
            </Link>
          ))}
        </section>
      </main>
    </>
  );
}
