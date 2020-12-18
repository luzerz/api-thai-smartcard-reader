const express = require("express");
const { ThaiCardReader, EVENTS, MODE } = require('./smartcard-reader')
const app = express();

const port = process.env.PORT || 3000;

app.route('').get( (req, res) => {
  res.send('RESTful API ARE Running');
});

app.route('/getdata').get( (req,res) => {
    const reader = new ThaiCardReader()
    reader.readMode = MODE.PERSONAL_PHOTO
    reader.autoRecreate = true
    reader.startListener()
    reader.on(EVENTS.READING_PROGRESS, (obj) => {
        console.log(obj)
    })
    reader.on(EVENTS.READING_COMPLETE, (obj) => {
        res.send(obj)
    })
    reader.on(EVENTS.READING_FAIL,(obj) => {
        let data = {
            "Eror":"Can't Read Data"
        }
        res.send(data)
    })
    
})

app.listen(port, () => {
  console.log('server is running on port: ', port);
});