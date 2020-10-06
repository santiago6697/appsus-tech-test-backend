require("dotenv").config()
require("firebase/auth");
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./appsus-tech-test-firebase-adminsdk-cjtqy-c07c746a02.json");
const express = require("express");
const songsModule = require("./api/v1/songsModule");
const app = express();
const port = 3000;

app.use(express.json());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

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

app.get("/", (req, res) => {
    res.send("Hello World!")
})

app.post("/api/v1/songs/create", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await songsModule.createSong(data, db);
    if (firestoreResponse) {
        res.status(200).json({
            song: firestoreResponse.data()
        });
    } else {
        res.sendStatus(500);
    }
});

app.get("/api/v1/songs", async (req, res) => {
    const data = req.query;
    const firestoreResponse = await songsModule.indexSongs(data, db);
    if (firestoreResponse) {
        var songs = [];
        firestoreResponse.forEach(collection => {
            songs.push(collection.data());
        });
        res.status(200).json({
            songs: songs
        });
    } else {
        res.sendStatus(500);
    }
});

app.get("/api/v1/song", async (req, res) => {
    const data = req.query;
    const firestoreResponse = await songsModule.showSong(data, db);
    if (firestoreResponse.exists) {
        res.status(200).json({
            song: firestoreResponse.data()
        });
    } else {
        res.sendStatus(500);
    }
});

// app.post("/api/v1/songs/update", (req, res) => {
//     const data = req.body.data;
//     const user = data.user;
//     const album = data.album;
//     const song = data.song;
//     db.collection("artists").doc(user.id)
//         .collection("albums").doc(album.id)
//         .collection("songs").doc(song.id).update(song);
// });

// app.post("/api/v1/songs/update", (req, res) => {
//     const data = req.body.data;
//     const user = data.user;
//     const album = data.album;
//     const song = data.song;
//     db.collection("artists").doc(user.id)
//         .collection("albums").doc(album.id)
//         .collection("songs").doc(song.id).delete();
// });

// app.get("/api/v1/albums/index", async (req, res) => {
//     const albums = db.collection("artists").doc("tame-impala");
//     const songs = await albums.listCollections();
//     songs.forEach(collection => {
//         console.log('Found subcollection with id:', collection.id);
//     });
// });

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
