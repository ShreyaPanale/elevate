const ENDPOINT = "http://localhost:5000"
let URLS;
const playlistURL = {
    createPlaylist:()=>`${ENDPOINT}/playlist/create`,
    addPlaylistToUser:()=>`${ENDPOINT}/user/playlists`
}
export default URLS = {
    ...playlistURL
}