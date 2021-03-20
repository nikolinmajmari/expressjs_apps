const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:Subset3036@cluster0.poljx.mongodb.net/ PROJECT 0?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("test").collection("devices");
    console.log(collection);
    client.close();
});
module.exports =  client;