require("dotenv").config()
require("firebase/auth");
const firebase = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./appsus-tech-test-firebase-adminsdk-cjtqy-c07c746a02.json");
const express = require("express");
const songsModule = require("./api/v1/songsModule");
const albumsModule = require("./api/v1/albumsModule");
const app = express();
const port = 5000;

app.use(express.json());
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

app.get("/api/v1/songs/search", async (req, res) => {
    const data = req.query;
    const fetchedSong = await songsModule.searchSong(data, db);
    if (fetchedSong) {
        res.status(200).json({
            songs: fetchedSong,
        });
    } else {
        res.sendStatus(500);
    }
});

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
    const {fetchedAlbum, fetchedSongs} = await songsModule.indexSongs(data, db);
    if (fetchedAlbum && fetchedSongs) {
        let songs = []
        fetchedSongs.forEach(collection => {
            songs.push(collection.data());
        });
        res.status(200).json({
            songs: songs,
            album: fetchedAlbum.data()
        });
    } else {
        res.sendStatus(500);
    }
});

app.post("/api/v1/songs/update", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await songsModule.updateSong(data, db);
    if (firestoreResponse) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.post("/api/v1/songs/delete", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await songsModule.deleteSong(data, db);
    if (firestoreResponse) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.post("/api/v1/albums/create", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await albumsModule.createAlbum(data, db);
    if (firestoreResponse) {
        res.status(200).json({
            song: firestoreResponse.data()
        });
    } else {
        res.sendStatus(500);
    }
});

app.get("/api/v1/albums", async (req, res) => {
    const data = req.query;
    const firestoreResponse = await albumsModule.indexAlbums(data, db);
    if (firestoreResponse) {
        var albums = [];
        firestoreResponse.docs.forEach(document => {
            albums.push(document.data());
        });
        res.status(200).json({
            albums: albums
        });
    } else {
        res.sendStatus(500);
    }
});

app.get("/api/v1/album", async (req, res) => {
    const data = req.query;
    const firestoreResponse = await albumsModule.showAlbum(data, db);
    if (firestoreResponse.exists) {
        res.status(200).json({
            song: firestoreResponse.data()
        });
    } else {
        res.sendStatus(500);
    }
});

app.post("/api/v1/albums/update", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await albumsModule.updateAlbum(data, db);
    if (firestoreResponse) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.post("/api/v1/albums/delete", async (req, res) => {
    const data = req.body.data;
    const firestoreResponse = await albumsModule.deleteAlbum(data, db);
    if (firestoreResponse) {
        res.sendStatus(200);
    } else {
        res.sendStatus(500);
    }
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
