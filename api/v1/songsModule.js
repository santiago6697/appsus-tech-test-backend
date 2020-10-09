module.exports = {
    searchSong: async (data, db) => {
        const artist = data.artist;
        const search = data.search;
        const fetchedSong = await db.collection("artists").doc(artist)
                            .collection("albums").where("title", ">=", search)
                            .where("title", "<=", search);
        return fetchedSong;
    },
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
        const fetchedAlbum = await db.collection("artists").doc(artist)
                            .collection("albums").doc(album).get();
        const fetchedSongs =  await db.collection("artists").doc(artist)
                            .collection("albums").doc(album)
                            .collection("songs").get();
        return {fetchedAlbum, fetchedSongs};
    },
    updateSong: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        const song = data.song;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").doc(album.id)
            .collection("songs").doc(song.id).update(song);
    },
    deleteSong: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        const song = data.song;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").doc(album.id)
            .collection("songs").doc(song.id).delete();
    }
}