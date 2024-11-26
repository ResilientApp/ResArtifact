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

  const transactionId = req.query.id; // Expect 'id' in query params, like 'artifact/...' format

  const client = new MongoClient(mongoConfig.uri);

  try {
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const collection = db.collection(mongoConfig.collectionName);

    console.log('Connected to MongoDB.');

    // Ensure the transaction ID is provided in the query
    if (!transactionId) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    // Remove the 'artifact/' prefix if it exists
    const formattedTransactionId = transactionId.startsWith('artifact/') 
      ? transactionId.replace('artifact/', '') 
      : transactionId;

    // Define aggregation pipeline for fetching a transaction by formatted ID
    const pipeline = [
      { $unwind: "$transactions" },
      { $match: { "transactions.value.id": formattedTransactionId } }, // Match by the transaction ID
      { $project: { _id: 0, transaction: "$transactions" } }, // Return only the transaction details
    ];

    const cursor = collection.aggregate(pipeline);
    const transactions = await cursor.toArray();

    if (transactions.length > 0) {
      // Print the entire transaction data in JSON format
      console.log(JSON.stringify(transactions[0].transaction, null, 2)); // This is the raw JSON data for debugging

      res.status(200).json({ transactions: transactions[0].transaction }); // Return the first matched transaction
    } else {
      res.status(404).json({ message: `No transaction found for ID: ${formattedTransactionId}` });
    }
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  } finally {
    await client.close();
  }
}

