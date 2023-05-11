const express = require ('express');
const mongoose = require ('mongoose');      // Importing Mongoose for the Mongo DB
const cors = require ('cors');
// const bodyParser = require('body-parser');
const route = require ("./Route/index");
const dotenv = require("dotenv");
const passport = require('passport');
const cookiesession = require('cookie-session')

const paymentRoutes = require("./Controllers/payment");
const authRoutes = require("./Controllers/auth");
const passportSetup = require("./Controllers/passport");

dotenv.config();

const Port = process.env.PORT || 5500;
const hostname = 'localhost';

const atlasDbUrl = 'mongodb+srv://Baneet:N37IgAEFQI3S0m5Z@unopposedempire.ekqewh1.mongodb.net/zomato-56?retryWrites=true&w=majority';        // MongoDb Atlas connection URL

//Baneet
//N37IgAEFQI3S0m5Z
//zomato-56

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}

const app = express();

app.use(cookiesession({ name: "session", keys: ["edureka"],maxAge: 24*60*60*1000 }));

// 24 hours * 60 minutes * 60 Seconds * 1000 MilliSeconds = 84600000 milli seconds a day

// app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use('/',route);
app.use("/api/payment/", paymentRoutes);
app.use("/auth", authRoutes);

mongoose.connect(atlasDbUrl, {           // Creating a mongo DB Connection
    useNewUrlParser: true, useUnifiedTopology: true // Creating a new connection with DB and using the MongoDB Driver's connection management engine
})
    .then(res => {
        app.listen(Port, hostname, () => {
            console.log(`Server is running at ${hostname}: ${Port}`)
        });
    })
    .catch(err => console.log(err));


