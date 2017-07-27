const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Activity = require('./models/activity')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/shororop-api', {
  useMongoClient: true
});

app.get('/api/activities', (req, res) => {
  Activity.find({}).then(activity => {
    res.json(activity);
  })
})

app.post('/api/activities', (req, res) => {
  Activity.create({
    activity_name: req.body.activity_name,
    quantity: req.body.quantity
  }).then(activity => {
    res.json(activity)
  });
});

app.get('/api/activities/:activity_id', (req, res) => {
  Activity.findById(req.params.activity_id).then((err, activity) => {
    if (err) {
      res.send(err)
    }
    res.json(activity)
  })
})

app.put('/api/activities/:activity_id', (req, res) => {
  Activity.findOneAndUpdate({
    activity_name: req.body.activity_name,
    quantity: req.body.quantity
  }).then((activity) => {
    res.json(activity)
  });
});

app.delete('/api/activities/:activity_id', (req, res) => {
  Activity.findOneAndRemove().then((activity) => {
    res.json(activity)
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
