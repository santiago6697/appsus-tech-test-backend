module.exports = {
    createSong: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        const song = data.song;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").doc(album.id)
            .collection("songs").add(song);
    },
    indexSongs: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        return await db.collection("artists").doc(artist)
            .collection("albums").doc(album)
            .collection("songs").get();
    },
    showSong: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        const song = data.song;
        return await db.collection("artists").doc(artist)
            .collection("albums").doc(album)
            .collection("songs").doc(song).get();
    }
}