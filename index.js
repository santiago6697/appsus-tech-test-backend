require('dotenv').config()
require("firebase/auth");
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./appsus-tech-test-firebase-adminsdk-cjtqy-c07c746a02.json");
const express = require('express');
const app = express();
const port = 3000;

const firebaseConfig = {
    apiKey: process.env.APPSUS_TECH_TEST_WEB_API_KEY,
    authDomain: "PROJECT_ID.firebaseapp.com",
    databaseURL: "https://PROJECT_ID.firebaseio.com",
    projectId: process.env.APPSUS_TECH_TEST_PROJECT_ID,
    storageBucket: "PROJECT_ID.appspot.com",
    messagingSenderId: "SENDER_ID",
    appId: process.env.APPSUS_TECH_TEST_PROJECT_ID,
    measurementId: "G-MEASUREMENT_ID",
};

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/', (req, res) => {
    const songData = {
        name: "The Less I Know The Better",
        rating: 5,
        length: "3:37",
        genre: "Pshycedelic rock"
    }
    db.collection('artist').doc('tame-impala')
        .collection('currents').doc('the-less-i-know-the-better').set(songData);
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
