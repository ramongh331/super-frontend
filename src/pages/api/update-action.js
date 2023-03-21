import { MongoClient } from 'mongodb';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // const { pID } = req.query; // Extract the ID of the document to update from the URL

    const formData = req.body;

    // Retrieve the user's session to get their email
    const session = await getSession({ req });
    const userEmail = session?.user?.email ?? null;

    // Connect to MongoDB instance
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db(process.env.MONGODB_DB);

    // Retrieve the existing document from the "profile" collection
    const existingProfile = await db
      .collection('profile')
      .findOne({ userEmail });
    
    const pID = existingProfile._id

    // Merge the new form data with the existing document
    const updatedProfile = {
      ...existingProfile,
      ...formData,
      userEmail,
    };

    // Save the merged document back to the "profile" collection
    await db.collection('profile').updateOne(
      { _id: pID },
      { $set: updatedProfile }
    );

    client.close();
    res.redirect(`/profile/view/${pID}`);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}