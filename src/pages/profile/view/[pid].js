import Head from 'next/head'
import { useRouter } from 'next/router'

export default function View() {
  const router = useRouter()
  const {pid} = router.query
  
    return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <h2>View Profile Page of {pid}</h2>
      </main>
    </>
  )
}