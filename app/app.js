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
    let FistCall = true
    reader.autoRecreate = true
    reader.startListener()
    
    reader.on(EVENTS.CARD_REMOVED,()=>{
        if (FistCall) {
            FistCall = false
            const err = {
                "ERROR":"CARD REMOVED"
            }
            reader.disconnectState()
            res.send(err)
        }
    })
    reader.on(EVENTS.DEVICE_DISCONNECTED,()=>{
        res.send("DEVICE_DISCONNECTED")
    })
    reader.on(EVENTS.PCSC_CLOSE, ()=>{
        let data = {
            "ERROR":"PCSC_CLOSE"
        }
        res.send(data)
    })
    reader.on(EVENTS.READING_PROGRESS, (obj) => {
        console.log(obj)
    })
    reader.on(EVENTS.READING_COMPLETE, (obj) => {
        if (FistCall){
            FistCall = false
            res.send(obj)
        }
    })
    reader.on(EVENTS.READING_FAIL,(err) => {
        console.log("Error",err)
        reader.startListener()
    })

})
app.route('/call').get((req,res)=>{
    const data ={
        "STATUS":"SUCCESS"
    }
    res.send(data)
})

app.route('/exit').get((req,res)=>{
    setTimeout(function () {
    process.on("exit", function () {
        require("child_process").spawn(process.argv.shift(), process.argv, {
            cwd: process.cwd(),
            detached : true,
            stdio: "inherit"
        });
    });
    process.exit();
    }, 1000);
})

app.listen(port, () => {
  console.log('server is running on port: ', port);
});
