const express = require('express');
const app = express();
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
    // console.log(req.body);
    let result = await user.save();
    result = result.toObject();
    // console.log(result);
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
    // console.log(req.body);
    let result = await content.save();
    result = result.toObject();
    resp.send(result);
    console.log('content data inserted');
    const user = await User.updateOne(
        { _id: req.body.userId },
        { $inc: { count: 1 } }
    );
    if (user) {
        console.log("Count updated", user);
    }
    else {
        console.log({ result: "No Content found" });
    }
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

app.delete('/deleteContent/:userId/:id', async (req, resp) => {
    // console.log(req.params.userId);
    const user = await User.updateOne(
        { _id: req.params.userId },
        { $inc: { count: -1 } }
    );
    if (user) {
        console.log("Count updated", user);
    }
    else {
        console.log({ result: "No Content found" });
    }
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
    resp.send("working");
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

const PORT = process.env.PORT || 5000
app.listen(PORT)