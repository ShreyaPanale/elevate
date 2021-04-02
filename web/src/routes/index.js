export default {
    dashboard: "/",
    profile:"/profile",
    signin:"/signin",
    signup:"/signup",
    landing:"/landing",
    forgotPassword:'/forgotPassword',
    admin:"/admin",
    favourites: "/favourites",
    artists: "/artist",
    artist:"/artist/:id",
    songs:"/songs",
    history:"/history",
    playlist:"/playlist/:id",

    // route generator functions
    genPlaylist:(id)=>`/playlist/${id}`,
    genArtist:(id)=>`/artist/${id}`
}