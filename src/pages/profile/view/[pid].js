import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, getSession } from "next-auth/react";
import { MongoClient, ObjectId } from "mongodb";
import { useState } from "react";

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const userEmail = session?.user?.email;

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const pID = context.query.pid;

  // CONNECT TO MONGODB DATABASE
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db(process.env.MONGODB_DB);

  // QUERY FOR SPECIFIC DATA
  const otherProfileData = await db
    .collection("profile")
    .findOne({ _id: new ObjectId(pID) });
  const currentUserProfile = await db
    .collection("profile")
    .findOne({ userEmail });

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
    },
  };
}

export default function View({ otherProfileData, pID, currentUserProfile }) {
  const [ownsProfile, setOwnsProfile] = useState(
    currentUserProfile?._id === pID ? "visible" : "hidden"
  );

  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <header className="w-full h-[8vh] mx-auto flex items-center justify-between relative">
        <Link href="/">
          <img
            className="w-14 ml-12"
            src="https://i.imgur.com/0BIn6HA.png"
            alt="Super Logo"
          />
        </Link>
        <Link href="/connections">
          <motion.button
            className="text-xl bg-[#4478ff] text-white font-semibold p-2 rounded-lg"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            Connections
          </motion.button>
        </Link>
        <img
          onClick={handleMenu}
          className="w-10 mr-16 hover:cursor-pointer"
          src="https://i.imgur.com/P4oiyA3.png"
          alt="hamburger side menu"
        />
        <section
          className={`${
            menu ? "" : "scale-y-0"
          } ease-in-out duration-300 origin-top w-fit h-fit bg-white px-6 py-1.5 text-lg flex flex-col items-center justify-evenly absolute right-2 top-[5rem]`}
        >
          <button
            className="hover:underline"
            onClick={() => signOut({ callbackUrl: "/" })}
          >
            Sign Out
          </button>
          <Link href={`/profile/edit/${otherProfileData._id}`}>
            <button className={`${ownsProfile} hover:underline`}>
              Edit Profile
            </button>
          </Link>
          <form action="/api/delete-action" method="POST">
            <button className={`${ownsProfile} hover:underline`} type="submit">
              Delete Profile
            </button>
          </form>
        </section>
      </header>
      <main className="w-full h-[92vh] bg-blue-200 flex">
        <section className="w-[40rem] h-[90%] bg-white mx-auto rounded-3xl mt-10 overflow-hidden shadow-[0_25px_40px_-20px_rgba(0,0,0,0.3)] shadow-black">
          <section className="h-[30rem] overflow-hidden">
            <img
              src="https://i.imgur.com/nXC08kY.jpg"
              alt="Super Profile Portrait"
            />
          </section>
          <section className="w-full h-[36%] text-xl px-4 overflow-scroll overflow-x-hidden">
            <div className="flex justify-between text-3xl font-semibold mt-4">
              <p>{otherProfileData.sname}</p>
              <p>{otherProfileData.age}</p>
            </div>
            <div className="flex justify-between mt-2">
              <p>{otherProfileData.rname}</p>
              <p>{otherProfileData.location}</p>
            </div>
            <h2 className="text-2xl font-semibold text-center">Identity</h2>
            <div className="flex justify-between mt-4">
              <div className="text-center">
                <h3 className="font-semibold">Gender</h3>
                <p>{otherProfileData.gender}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Sex</h3>
                <p>{otherProfileData.sex}</p>
              </div>
              <div className="text-center">
                <h3 className="font-semibold">Species</h3>
                <p>{otherProfileData.species}</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-center mt-7">
              Attributes
            </h2>
            <div className="mt-4">
              <h3 className="font-semibold">Abilities</h3>
              <p>{otherProfileData.ability}</p>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold">Side</h3>
              <p>{otherProfileData.hva}</p>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold">Affiliation</h3>
              <p>{otherProfileData.tpi}</p>
            </div>
            <div className="mt-2">
              <h3 className="font-semibold">Backstory:</h3>
              <p>{otherProfileData.story}</p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
