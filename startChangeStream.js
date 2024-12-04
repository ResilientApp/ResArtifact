const { MongoClient } = require('mongodb');

const mongoConfig = {
  uri: 'mongodb://localhost:27017',
  dbName: 'art',
  collectionName: 'collection',
  historyCollectionName: 'art_his',
};

const client = new MongoClient(mongoConfig.uri);

async function syncDataPeriodically() {
  await client.connect();
  const db = client.db(mongoConfig.dbName);
  const collection = db.collection(mongoConfig.collectionName);
  const transactionHistories = db.collection(mongoConfig.historyCollectionName);

  // Function to fetch and sync data
  const syncData = async () => {
    try {
      // Fetch latest data from the collection (you can customize this query)
      const latestTransactions = await collection.find({}).toArray();

      // Loop through the transactions and update the history collection
      for (let newTransaction of latestTransactions) {
        // Extract the uniqueId from the transaction
        const uniqueId = newTransaction.transactions[0]?.value?.asset?.data?.uniqueId;

        // Ensure uniqueId exists before processing
        if (uniqueId) {
          // Check if the transaction already exists in the history collection
          const existingHistory = await transactionHistories.findOne({ uniqueId: uniqueId });

          if (existingHistory) {
            // Update if the new transaction id is larger
            if (newTransaction.id > existingHistory.largestId) {
              await transactionHistories.updateOne(
                { uniqueId: uniqueId },
                {
                  $set: {
                    largestId: newTransaction.id,
                    transaction: newTransaction
                  }
                }
              );
            }
          } else {
            // Insert a new record if no existing history
            await transactionHistories.insertOne({
              uniqueId: uniqueId,
              largestId: newTransaction.id,
              transaction: newTransaction
            });
          }
        } else {
          console.log(`Transaction skipped, no uniqueId found: ${newTransaction._id}`);
        }
      }
    } catch (error) {
      console.error("Error syncing data:", error);
    }
  };

  // Run the sync function every 10 seconds
  setInterval(syncData, 30000); // 10000ms = 10 seconds

  console.log('Data synchronization started (every 10 seconds).');
}

syncDataPeriodically().catch(console.error);

