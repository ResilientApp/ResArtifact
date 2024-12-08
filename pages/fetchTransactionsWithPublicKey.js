  const { MongoClient } = require('mongodb');

  const mongoConfig = {
    uri: 'mongodb://localhost:27017',
    dbName: 'data',
    collectionName: 'collection',
  };


  const targetPublicKey = "8QkgpLEShfkMEruc5SubiRPN3JagYWLvFAUG9Jy3bay4";

  (async () => {
    const client = new MongoClient(mongoConfig.uri);

    try {
      await client.connect();
      const db = client.db(mongoConfig.dbName);
      const collection = db.collection(mongoConfig.collectionName);

      console.log('Connected to MongoDB for fetching transactions.');

    
      const indexName = await collection.createIndex({ "transactions.value.inputs.owners_before": 1 });
      console.log(`Index created: ${indexName} on transactions.value.inputs.owners_before`);

      const pipeline = [
        { $unwind: "$transactions" },
        { $unwind: "$transactions.value.inputs" },
        { 
          $match: { 
            "transactions.value.inputs.owners_before": targetPublicKey 
          }
        },
        { $sort: { "transactions.value.asset.data.timestamp": -1 } },
        { $project: { transaction: "$transactions", _id: 0 } }
      ];

      const cursor = collection.aggregate(pipeline);
      const transactions = await cursor.toArray();

      if (transactions.length > 0) {
        console.log('Transactions with the specified publicKey in owners_before:', 
                    JSON.stringify(transactions, null, 2));
      } else {
        console.log(`No transactions found for publicKey: ${targetPublicKey}`);
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      await client.close();
    }
  })();
