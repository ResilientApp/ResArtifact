import { MongoClient } from 'mongodb';

const mongoConfig = {
  uri: 'mongodb://localhost:27017',
  dbName: 'art',
  collectionName: 'art_his',
};

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests are allowed' });
  }

  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection(mongoConfig.collectionName);

    console.log('Connected to MongoDB.');

    // Aggregation pipeline to retrieve all transactions
    const pipeline = [
      { $unwind: "$transaction.transactions" }, // Unwind the transactions array
      { $unwind: "$transaction.transactions.value.outputs" }, // Unwind outputs within transactions
      { $project: { _id: 0, transaction: "$transaction.transactions.value" } }, // Return transaction details
    ];

    const cursor = collection.aggregate(pipeline);
    const transactions = await cursor.toArray();

    if (transactions.length > 0) {
      res.status(200).json({ transactions });
    } else {
      res.status(404).json({ message: 'No transactions found' });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
}

