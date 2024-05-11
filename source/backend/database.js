const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://CSE112:mUE8NjfC5ucaSgYu@fortunes.yyomahu.mongodb.net/?retryWrites=true&w=majority&appName=Fortunes";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


async function createUser(username, password, email, firstname, lastname) {
  
  var newUser = { user : username, email : email, first : firstname, last : lastname, pass : password }
  
  await client.db("admin").insertOne(newUser, function(err, res) {
    if (err)  throw err;
    console.log("User Created");
    db.close();
  });

  return true
}

async function Login(username, password){

  await client.db("admin").findOne({user : username }, user = function(err, res) {
    if (err) {
      /* Could not find User */
      return false
    }
    else {
      return true
    };

  });
  await client.db("admin").findOne({pass : password }, pass = function(err, res) {
    if (err) {
      /* Could not find Pass */
      return false
    }
    else {
      return true
    };

  });
  
  if(user && pass){
    return true;
  }

  return false;
}

async function deleteFortune(username, password) {
  var myquery = { user: username, pass: password };
  var newvalues = { };

  await client.db("admin").updateOne(myquery, newvalues)
}