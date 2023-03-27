import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { signOut, signIn, getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default function New({ session }) {
  if (session) {
    return (
      <>
        <Head>
          <title>Super</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="w-11/12 h-20 mx-auto flex items-center justify-between ">
          <Link href="/">
            <div className="flex items-center justify-between w-48">
              <img className="w-16" src="https://i.imgur.com/0BIn6HA.png" alt="Super Logo"/>
              <h1 className="text-4xl text-[#4478ff] font-bold min-[320px]:hidden sm:inline">SUPER</h1>
              </div>
          </Link>
            <section>
              <motion.button 
              whileHover={{scale: 1.2}} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-xl font-semibold border-2 border-[#4478ff] rounded-md px-2" 
              onClick={() => signOut({callbackUrl: '/'})}>Sign Out</motion.button>
            </section>
        </header>
        <main className="w-full h-full bg-blue-100">
          <h2 className="text-center text-5xl py-10">Set up profile</h2>

          <form action="/api/create-action" method="POST" className="w-full h-full">
            <section className="max-w-4xl h-full mx-auto"> 
              {/* Card 1 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}} 
              className="w-auto h-[30rem] flex flex-col items-center justify-center bg-white rounded-3xl mb-72 mx-4 shadow-lg">
                <label className="min-[320px]:text-lg sm:text-3xl mb-2">Super Name</label>
                <input className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg" type="text" name="sname" placeholder="Super Name" />
              </motion.section>
              
              {/* Card 2 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}}
              className="w-auto h-[30rem] 
              min-[320px]:flex-col md:flex-row flex   
              items-center justify-evenly bg-white rounded-3xl mb-72 mx-4 shadow-lg">
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Real Name</label>
                  <input className="border-solid border-2 border-black 
                  min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" type="text" name="rname" placeholder="Real Name" />
                </section>
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Age</label>
                  <input className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" type="number" min="0" name="age" placeholder="Age" />
                </section>
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Location</label>
                  <input className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" type="text" name="location" placeholder="Location" />
                </section>
              </motion.section>

                {/* Card 3 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}} 
              className="w-auto h-[30rem] 
              min-[320px]:flex-col md:flex-row flex 
              items-center justify-evenly bg-white rounded-3xl mb-72 mx-4 shadow-lg">  
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Species</label>
                  <input className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" type="text" name="species" placeholder="Species" />
                </section>
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Gender (if human)</label>
                  <select defaultValue={'DEFAULT'} className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" name="gender">
                    <option value="DEFAULT" disabled hidden>Gender</option>
                    <option value="Agender">Agender</option>
                    <option value="Androgynous">Androgynous</option>
                    <option value="Bigender">Bigender</option>
                    <option value="Cisgender">Cisgender</option>
                    <option value="Cis Woman">Cis Woman</option>
                    <option value="Cis Man">Cis Man</option>
                    <option value="Non-binary">Non-binary</option>
                    <option value="Gender Fluid">Gender Fluid</option>
                    <option value="Gender Questioning">Gender Questioning</option>
                    <option value="Transgender">Transgender</option>
                    <option value="Trans Woman">Trans Woman</option>
                    <option value="Trans Man">Trans Man</option>
                    <option value="Transgender Person">Transgender Person</option>
                    <option value="Two-Spirit">Two-Spirit</option>
                  </select>
                </section>
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Sexual Orientation</label>
                  <select defaultValue={'DEFAULT'} className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" name="sex">
                    <option value="DEFAULT" disabled hidden>Sexual Orientation</option>
                    <option value="Asexual">Asexual</option>
                    <option value="Bisexual">Bisexual</option>
                    <option value="Gay">Gay</option>
                    <option value="Lesbian">Lesbian</option>
                    <option value="Pansexual">Pansexual</option>
                    <option value="Polysexual">Polysexual</option>
                    <option value="Queer">Queer</option>
                    <option value="Questioning">Questioning</option>
                    <option value="Straight">Straight</option>
                  </select>
              </section>
              </motion.section>

              {/* Card 4 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}}
              className="w-auto h-[30rem] flex flex-col items-center justify-center bg-white rounded-3xl mb-72 mx-4 shadow-lg">
                <label className="min-[320px]:text-lg sm:text-3xl mb-2">Abilities</label>
                <input className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" type="text" name="ability" placeholder="Abilities" />
              </motion.section>
              
              {/* Card 5 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}}
              className="w-auto h-[30rem] 
              min-[320px]:flex-col sm:flex-row flex 
              items-center justify-evenly bg-white rounded-3xl mb-72 mx-4 shadow-lg">
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Pick your side</label>
                  <select  defaultValue={'DEFAULT'} className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" name="hva">
                    <option value="DEFAULT" disabled hidden>Select your Side</option>
                    <option value="Hero">Hero</option>
                    <option value="Villain">Villain</option>
                    <option value="Anti-Hero">Anti-Hero</option>
                  </select>
                </section>
                <section className="flex flex-col text-center">
                  <label className="min-[320px]:text-lg sm:text-3xl mb-2">Affiliation</label>
                  <select defaultValue={'DEFAULT'} className="border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4" name="tpi">
                    <option value="DEFAULT" disabled hidden>Team/Partner/Indie</option>
                    <option value="I am on a team">I&#39;m on a team</option>
                    <option value="I have a partner">I have a partner</option>
                    <option value="I work independently">I work independently</option>
                  </select>
              </section>
              </motion.section>
              
              {/* Card 6 */}
              <motion.section initial={{opacity: 0}} whileInView={{opacity: 1}} transition={{duration: 1}} viewport={{once:true}}
              id="card6" 
              className="w-auto h-[30rem] flex flex-col items-center justify-center bg-white rounded-3xl mx-4 shadow-lg">
                <label className="min-[320px]:text-lg sm:text-3xl mb-2">Backstory</label>
                <textarea
                className="w-11/12
                border-solid border-2 border-black min-[320px]:text-base sm:text-xl p-1 rounded-lg mb-4"
                  name="story"
                  rows="4"
                  cols="50"
                  maxLength="500"
                  placeholder="Born with abilities beyond imagination, I grew up in a world that could not understand them..."
                />
              <motion.button 
              whileHover={{scale: 1.1}} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-52 p-2 rounded-lg font-semibold bg-[#4478ff] text-white min-[320px]:text-lg text-xl" type="submit">Create Super Profile</motion.button>
              </motion.section>
            </section>
            <div className="w-full h-72"></div>
          </form>
        </main>
      </>
    );
  } else {
    return (
      <>
        <h2>You are not signed in</h2>
        <button onClick={() => signIn()}>Sign In</button>
      </>
    );
  }
}
