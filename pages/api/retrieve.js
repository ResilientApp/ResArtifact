import { MongoClient } from 'mongodb';

const mongoConfig = {
  uri: 'mongodb://localhost:27017',
  dbName: 'art',
  collectionName: 'collection',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const targetPublicKey = req.query.publicKey; 

  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection(mongoConfig.collectionName);

    console.log('Connected to MongoDB.');

    // Updated aggregation pipeline
    const pipeline = [
      { $unwind: "$transactions" },
      { $unwind: "$transactions.value.inputs" },
      { $match: { "transactions.value.inputs.owners_before": targetPublicKey } },
      { $match: { "transactions.value.asset.data.name": { $exists: true } } }, // Ensure 'name' exists
      { $sort: { "transactions.value.asset.data.timestamp": -1 } },
      {
        $group: {
          _id: "$_id",
          document: { $first: "$$ROOT" }
        }
      },
      { $replaceRoot: { newRoot: "$document" } }, // Replace with the grouped document
      { $project: { transaction: "$transactions", _id: 0 } }, // Project the desired fields
    ];

    const cursor = collection.aggregate(pipeline);
    const transactions = await cursor.toArray();

    if (transactions.length > 0) {
      res.status(200).json({ transactions });
    } else {
      res.status(404).json({ message: `No transactions found for publicKey: ${targetPublicKey}` });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
}

