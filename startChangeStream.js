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

  const syncData = async () => {
    try {
     
      const latestTransactions = await collection.find({}).toArray();

      
      for (let newTransaction of latestTransactions) {
       
        const uniqueId = newTransaction.transactions[0]?.value?.asset?.data?.uniqueId;

   
        if (uniqueId) {
         
          const existingHistory = await transactionHistories.findOne({ uniqueId: uniqueId });

          if (existingHistory) {
          
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


  setInterval(syncData, 10000); // 10000ms = 10 seconds

  console.log('Data synchronization started (every 10 seconds).');
}

syncDataPeriodically().catch(console.error);

