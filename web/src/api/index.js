import axios from 'axios';
import URLS from './urls';

const Playlists = {
    createPlaylist : async (params) => (await axios.post(URLS.createPlaylist(),params)).data,
    addPlaylistToUser : async (params) => (await axios.post(URLS.addPlaylistToUser(),params)).data,
}

const Users = {
    createUser : async (params) => (await axios.post(URLS.createUser, params)).data,
    userAdminStatus : async (id) => (await axios.get(URLS.userAdminStatus(id))).data
}

const Admin = {
    createTrack : async (params) => (await axios.post(URLS.createTrack(),params,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })).data,
    createArtist :  async (params) => (await axios.post(URLS.createArtist(),params)).data
}

const Artist = {
    getArtists : async (params) => (await axios.get(URLS.getArtists(),params)).data
}

let API;
export default API = {
    ...Playlists,
    ...Users,
    ...Admin,
    ...Artist
}