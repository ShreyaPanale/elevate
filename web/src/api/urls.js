const ENDPOINT = "http://localhost:5000"
let URLS;
const playlistURL = {
    createPlaylist:()=>`${ENDPOINT}/playlist/create`,
    addPlaylistToUser:()=>`${ENDPOINT}/user/playlists`
}

const userURL = {
    createUser: `${ENDPOINT}/user/create`,
    userAdminStatus:(id)=>`${ENDPOINT}/user/adminstat?uid=${id}`
}
export default URLS = {
    ...playlistURL,
    ...userURL
}