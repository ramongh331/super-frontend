import { MongoClient } from 'mongodb';
import { getSession } from 'next-auth/react';

export default async function deleteProfile(req, res) {
  if (req.method === 'POST') {
    const session = await getSession({ req });
    const userEmail = session?.user?.email ?? null;

    // Connect to MongoDB instance
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);

    // Retrieve the existing document from the "profile" collection
    const existingProfile = await db.collection('profile').findOne({ userEmail });

    if (!existingProfile) {
      // Return an error if the document is not found
      return res.redirect('/connections');
    }

    // Remove the document from the "profile" collection
    await db.collection('profile').deleteOne({ _id: existingProfile._id });

    client.close();
    res.redirect('/api/auth/signout?callbackUrl=/');
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}