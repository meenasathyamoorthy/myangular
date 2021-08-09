var express = require("express");
var mongo = require("mongoose");
var bodyparse = require("body-parser");
var cors = require("cors");
var path = require("path");
var app = express();
var db = mongo.connect("mongodb://localhost:27017/angularcurd", (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("connected to" + db, '+', res);
    }
});
app.use(bodyparse());
app.use(bodyparse.json());
app.use(bodyparse.urlencoded({ extended: false }));
app.use(cors());
app.use("/", (req, res, next) => {
    res.setHeader('Access-control-Allow-origin', 'http://localhost:4200');
    res.setHeader('Access-control-Allow-Methods', 'Get,post,put,delete,patch');
    next();     
});
mongo.promise = global.promise;
var Schema = mongo.Schema;
var UserSchema = new Schema({
    Username:  {type: String, required: true, max: 100 } ,
    Age: {type: String, required: true, max: 100 } ,
    Dob:  {type: String, required: true, max: 100 } ,
    Mobile:  {type: String, required: true, max: 100 }
});
var usermodel = mongo.model('userdemo', UserSchema);

app.get('/', function (req, res) {
    console.log("welcome node");
});
app.post('/create', (req, res)=> {
    // console.log(req.body);
    let user = new usermodel(
        {
            Username: req.body.Username,
            Age: req.body.Age,
            Dob: req.body.Dob,
            Mobile: req.body.Mobile
        });
           user.save((err, data) =>{
            if (err) {
                return console.log(err);
            }
                
        res.json(data);
        // res.send("user inserted")
    });
});

app.put('/update/:id', (req, res, next) => {
    usermodel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, data) => {
        if (err) {
            return next(err);
        }
        else {
            res.json('data updated successfully');

        }
    });
});
app.get('/read/:id', (req, res, next) => {
    // console.log(req.params.id)
    usermodel.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        }
        else {
            res.json(data);
        }
    });
});
app.get('/find', (req, res) => {
    
    usermodel.find((err, data) => {
        // console.log(data);
        if (err) {
            return next(err);
        }
        else {
            res.json(data);
        }
    });
});
app.delete('/delete/:id', (req, res, next) => {
    // console.log(req.params.id)
    usermodel.findByIdAndDelete(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        }
        else {
            res.json(data);

        }
    });
});





let port = 3000;
app.listen(port, () => {
    console.log("server is running on number" + port);
});





