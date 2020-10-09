module.exports = {
    createAlbum: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").add(album);
    },
    indexAlbums: async (data, db) => {
        const artist = data.artist;
        return await db.collectionGroup('albums')
            .where("artist_id", "==", artist).get();
    },
    updateAlbum: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").doc(album.id).update(album);
    },
    deleteAlbum: async (data, db) => {
        const artist = data.artist;
        const album = data.album;
        return await db.collection("artists").doc(artist.id)
            .collection("albums").doc(album.id).delete();
    }
}