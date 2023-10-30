const express = require('express');
const app = express();
// const cors = require("cors");
const cors = require('cors');

const connecttoDB = require('./config/db');
const User = require('./config/User');
const Content = require('./config/Content');

app.use(express.json());
app.use(cors());

connecttoDB();

// to check if api is working
app.get('/', (req, resp) => {
  resp.send('App is working');
});

// to insert a object in users
app.post('/register', async (req, resp) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;       // not to display password
  resp.send(result);
  console.log('data inserted');
});

app.post('/login', async (req, resp) => {
  //   resp.send(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select('-password');
    if (user) resp.send(user);
    else resp.send({ result: 'No user found' });
  } else resp.send({ result: 'Please provide all data' });
});

app.post('/addContent', async (req, resp) => {
  let content = new Content(req.body);
  let result = await content.save();
  result = result.toObject();
  resp.send(result);
  console.log('content data inserted');
});

app.get('/contents', async (req, resp) => {
  let contents = await Content.find();
  if (contents.length > 0) {
    resp.send(contents);
  }
  else {
    resp.send({ result: "No Content found" })
  }
})

app.delete('/deleteContent/:id', async (req, resp) => {
  const result = await Content.deleteOne({ _id: req.params.id });
  resp.send(result);
});

app.get('/content/:id', async (req, resp) => {
  // resp.send(req.params.id);
  const result = await Content.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  }
  else {
    resp.send({ result: "No Record Found" })
  }
});

app.put('/content/:id', async (req, resp) => {
  // resp.send("working");
  const result = await Content.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );
  if (result) {
    resp.send(result);
  }
  else {
    resp.send({ result: "No Content found" });
  }
});

// app.get('/search/:key', async (req, resp) => {
//   let result = await Content.find({
//     "$or": [
//       { name: { $regex: req.params.key } },
//       { company: { $regex: req.params.key } },
//       { category: { $regex: req.params.key } },
//     ]
//   });
//   resp.send(result);
// });

const PORT = process.env.PORT || 5000
app.listen(PORT)