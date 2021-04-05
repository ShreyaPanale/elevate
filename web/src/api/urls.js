const ENDPOINT = "http://localhost:5000"
let URLS;
const playlistURL = {
    createPlaylist:()=>`${ENDPOINT}/playlist/create`,
    addPlaylistToUser:()=>`${ENDPOINT}/user/playlists`,
    addTrackToPlaylist:()=>`${ENDPOINT}/user/playlist/tracks`,
    getPlaylistTracks:(id)=>`${ENDPOINT}/playlist/tracks?pid=${id}`
}

const userURL = {
    createUser: `${ENDPOINT}/user/create`,
    userAdminStatus:(id)=>`${ENDPOINT}/user/adminstat?uid=${id}`,
    getUserData : (id) => `${ENDPOINT}/user?uid=${id}`
}

const adminURL = {
    createTrack:()=>`${ENDPOINT}/addtrack`,
    createArtist:()=>`${ENDPOINT}/addartist`
}

const artistURL = {
    getArtists:()=>`${ENDPOINT}/getartists`
}

const tracksURL = {
    getTracks:(id)=>`${ENDPOINT}/gettracks?uid=${id}`,
    getTracksByArtist:(aid)=>`${ENDPOINT}/tracks/artist?aid=${aid}`
}

export default URLS = {
    ...playlistURL,
    ...userURL,
    ...adminURL,
    ...artistURL,
    ...tracksURL
}