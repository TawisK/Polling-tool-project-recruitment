const express = require('express');
const { MongoClient } = require("mongodb");
    
const uri =
  "mongodb://localhost:27017/polldb?poolSize=20&writeConcern=majority"

const app = express();
const port = process.env.PORT || 4000;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
});
    
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

app.post('/vote', async (req, res) => {
    const { body } = req;
    const { answer } = body;
    const selectedName = req.body.element.name;
    const selectedCount = req.body.element.count+1;
    console.log(selectedCount);
    await client.connect();
    const db = client.db('polldb');
    const answers = db.collection('answers');
    const filter = { name: selectedName };
    const options = { upsert: false };
    const updateC = {
        $set: {
          count:
            selectedCount,
        },
      };
    const result = await answers.updateOne(filter, updateC, options);
    res.json({ answer });

    //await client.close();
});

app.get('/answers', async (req, res) => {
    await client.connect();
    const db = client.db('polldb');
    const answers = db.collection('answers');
    res.send(JSON.stringify({
        answers: await answers.find().toArray(),
    }));
    //await client.close();
});