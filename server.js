const express = require('express');
const connectDB = require('./config/db');
const mongoData = require('./mongoData');
const cors = require('cors');
const mongoose = require('mongoose')
const Pusher = require('pusher')

// App Config
const app = express();
const PORT = process.env.PORT || 5000;

const pusher = new Pusher({
    appId: "1122190",
    key: "6ee0d2c0c8adc5cff9da",
    secret: "1cef271a45f60cf77716",
    cluster: "ap2",
    useTLS: true
  });


// Init Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();
mongoose.connection.once('open', () => {
    console.log('DB Connected')
    const changeStream = mongoose.connection.collection('conversations').watch()

    changeStream.on('change', (change) => {
        if (change.operationType === 'insert') {
            pusher.trigger('channels', 'newChannel', {
                'change': change
            });
        } else if (change.operationType === 'update') {
            pusher.trigger('conversations', 'newMessage', {
                'change': change
            });
        } else {
            console.log('Error Triggering Pusher')
        }
    })
})

app.get('/', (req, res) => res.status(200).send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));

app.post('/new/channel', (req,res) => {
    const dbData = req.body

    mongoData.create(dbData, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    })
})

app.get('/get/channelList', (req,res) => {
    mongoData.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            let channels = []

            data.map((channelData) => {
                const channelInfo = {
                    id: channelData._id,
                    name: channelData.channelName
                }
                channels.push(channelInfo)
            })

            res.status(200).send(channels)
        }
    })
})


app.post('/new/message', (req, res) => {
    const newMessage = req.body

    mongoData.update(
        {_id: req.query.id},
        {$push: {conversation: req.body}},
        (err, data) => {
            if (err) {
                console.log('Error saving message..')
                console.log(err)
                res.status(500).send(err)
            } else {
                res.status(201).send(data)
            }
        }
    )
})


app.get('/get/data', (req, res) => {
    mongoData.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

app.get('/get/conversation', (req, res) => {
    const id = req.query.id

    mongoData.find({_id: id}, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})



app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));