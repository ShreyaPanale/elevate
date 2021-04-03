const ENDPOINT = "http://localhost:5000"
let URLS;
const playlistURL = {
    createPlaylist:()=>`${ENDPOINT}/playlist/create`,
    addPlaylistToUser:()=>`${ENDPOINT}/user/playlists`
}

const userURL = {
    createUser: `${ENDPOINT}/user/create`,
}
export default URLS = {
    ...playlistURL,
    ...userURL
}