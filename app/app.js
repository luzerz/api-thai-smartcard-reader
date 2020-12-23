const express = require("express");
const { ThaiCardReader, EVENTS, MODE } = require('./smartcard-reader')
const cors = require('cors')
const app = express();

const port = process.env.PORT || 3000;
app.use(cors());
app.use(function (req, res, next) {
    console.log('Time: %d IP:%s => req := %s', Date.now(),req.ip,req.params)
    next()
})
app.route('').get((req, res) => {
  res.send('RESTFUL API ARE Running');
});

app.route('/getdata').get((req ,res) => {
    const reader = new ThaiCardReader()
    reader.readMode = MODE.PERSONAL_PHOTO
    reader.autoRecreate = false
    reader.startListener()
    reader.on(EVENTS.CARD_REMOVED,()=>{
        console.log("Card Removed")
    })
    reader.on(EVENTS.DEVICE_DISCONNECTED,()=>{
        console.log("DEVICE_DISCONNECTED")
        res.send("DEVICE_DISCONNECTED")
    })
    reader.on(EVENTS.PCSC_CLOSE, ()=>{
        console.log("PCSC_CLOSE")
        let data = {
            "ERROR":"PCSC_CLOSE"
        }
        res.send(data)
    })
    reader.on(EVENTS.READING_PROGRESS, (obj) => {
        console.log(obj)
    })
    reader.on(EVENTS.READING_COMPLETE, (obj) => {
        res.send(obj)
    })
    reader.on(EVENTS.READING_FAIL,(err) => {
        console.log("Error",err)
    })
    
})

app.listen(port, () => {
  console.log('server is running on port: ', port);
});
