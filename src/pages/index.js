import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, getSession } from "next-auth/react";
import {motion } from "framer-motion"

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}

export default function Home({ session}) {

  if (session) {
    return (
      <>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <header className="sm:w-11/12 w-11/12 
        sm:h-20 h-36 
        mx-auto 
        flex items-center justify-between ">
          <Link href="/">
            <div className="flex items-center justify-between 
            sm:w-24 w-48">
              <img className="sm:w-10 w-16" src="https://i.imgur.com/0BIn6HA.png" alt="Super Logo"/>
              <h1 className="sm:text-base text-4xl text-[#4478ff] font-bold">SUPER</h1>
              </div>
          </Link>
            <section className="flex justify-between
            sm:w-[23rem] md:w-[28rem] w-[55rem] 
            sm:text-xs md:text-sm text-xl">
              <h2>Why Super?</h2>
              <h2>How does it work?</h2>
              <Link href="/connections">
                <h2 className="hover:underline">Connections</h2>
              </Link>
              <h2>Contact</h2>
            </section>
            <section>
              <motion.button 
              whileHover={{scale: 1.2}} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="sm:text-xs md:text-sm text-xl 
              font-semibold 
              sm:border-[1px] border-2 border-[#4478ff] 
              rounded-md 
              px-2" 
              onClick={() => signOut({callbackUrl: '/'})}>Sign Out</motion.button>
            </section>
        </header>
        <main className="w-full h-[66.7vh]">
          <section className="w-fit mx-auto mt-5">
            <h3 className="sm:text-2xl md:text-4xl text-5xl">Join <span className="">Super</span> and...</h3>
            <h3 className="sm:text-6xl md:text-7xl text-8xl font-semibold">Find <span className="text-[#4478ff]">Your</span> Super <span className="text-[#4478ff]">Match</span></h3>
          </section>
           <section className="w-full 
           flex justify-evenly 
           sm:mt-16 mt-10 
           relative" >
            <motion.img 
            src="https://i.imgur.com/KklYWBT.png" className="sm:w-[105px] object-contain" alt="Wizard Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9}}
            />
            <motion.img 
            src="https://i.imgur.com/FykyQB3.png" className="sm:w-[105px] w-[290px] object-contain" alt="Sarg Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />
            <motion.img 
            src="https://i.imgur.com/4ML1GiN.png" className="sm:w-[105px] w-[290px] object-contain right-[40%]" alt="Wonder Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3}}
            />
            <motion.img 
            src="https://i.imgur.com/Evhsjgw.png" className="sm:w-[140px] w-[390px] object-contain right-[25%]" alt="Joker Card"
            animate={{y: [32, -50, 32]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />
            </section>
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
        <header className="w-11/12 h-36 mx-auto flex items-center justify-between ">
          <Link href="/">
            <div className="flex items-center justify-between w-48">
              <img className="w-16" src="https://i.imgur.com/0BIn6HA.png" alt="Super Logo"/>
              <h1 className="text-4xl text-[#4478ff] font-bold">SUPER</h1>
              </div>
          </Link>
            <section className="flex w-[55rem] justify-between text-xl">
              <h2>Why Super?</h2>
              <h2>How does it work?</h2>
              <h2>Contact</h2>
            </section>
            <section>
              <motion.button 
              whileHover={{scale: 1.2}} 
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="text-xl font-semibold border-2 border-[#4478ff] rounded-md px-2" 
              onClick={() => signIn('google', {callbackUrl: '/connections'})}>Sign In</motion.button>
            </section>
        </header>
        <main className="w-full h-[66.7vh]">
          <section className="w-fit mx-auto mt-5">
            <h3 className="text-5xl">Join <span className="">Super</span> and...</h3>
            <h3 className="text-8xl font-semibold">Find <span className="text-[#4478ff]">Your</span> Super <span className="text-[#4478ff]">Match</span></h3>
          </section>
           <section className="w-full flex justify-evenly mt-10 relative" >
            <motion.img 
            src="https://i.imgur.com/KklYWBT.png" className="w-[290px] object-contain" alt="Wizard Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.9}}
            />
            <motion.img 
            src="https://i.imgur.com/FykyQB3.png" className="w-[290px] object-contain" alt="Sarg Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />
            <motion.img 
            src="https://i.imgur.com/4ML1GiN.png" className="w-[290px] object-contain right-[40%]" alt="Wonder Card"
            animate={{y: [28, -50, 28]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.3}}
            />
            <motion.img 
            src="https://i.imgur.com/Evhsjgw.png" className="w-[390px] object-contain right-[25%]" alt="Joker Card"
            animate={{y: [32, -50, 32]}}
            transition={{duration: 5, repeat: Infinity, ease: "easeInOut"}}
            />
            </section>
        </main>
      </>
    );
  }
}
