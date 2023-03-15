// import { MongoClient } from "mongodb";

export async function getServerSideProps(context){
    const session = await getSession(context)
}

export default function Card (){
    return (<>
    <section className="bg-blue-200 w-60 h-60 text-2xl">
        <h2>This is a card</h2>
    </section>
    </>)
}