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

    const transactionId = req.query.id; 

    const client = new MongoClient(mongoConfig.uri);

    try {
      await client.connect();
      const db = client.db(mongoConfig.dbName);
      const collection = db.collection(mongoConfig.collectionName);


      if (!transactionId) {
        return res.status(400).json({ message: 'Transaction ID is required' });
      }

      const formattedTransactionId = transactionId.startsWith('artifact/')
        ? transactionId.replace('artifact/', '') 
        : transactionId;

      const pipeline = [
        { $unwind: "$transactions" },
        { $match: { "transactions.value.id": formattedTransactionId } }, 
        { $project: { _id: 0, transaction: "$transactions" } }, 
      ];

      const cursor = collection.aggregate(pipeline);
      const transactions = await cursor.toArray();

      if (transactions.length > 0) {
      
        const uniqueId = transactions[0].transaction.value.asset.data.uniqueId;

      
        const allTransactionsPipeline = [
          { $unwind: "$transactions" },
          { $match: { 'transactions.value.asset.data.uniqueId': uniqueId } }, 
          { $project: { _id: 0, transaction: "$transactions" } }, 
        ];

        const allTransactions = await collection.aggregate(allTransactionsPipeline).toArray();

        if (allTransactions.length > 0) {
        
          res.status(200).json({ transactions: allTransactions });
        } else {
          res.status(404).json({ message: `No transactions found with uniqueId: ${uniqueId}` });
        }
      } else {
        res.status(404).json({ message: `No transaction found for ID: ${formattedTransactionId}` });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    } finally {
      await client.close();
    }
  }

