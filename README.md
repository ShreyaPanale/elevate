

<p  align="center">

<br />

<img  src="https://github.com/avinash-vk/elevate/blob/main/Elevate.png"  alt="To add image"></img>

</p>

  

## What's special about Elevate

> “After silence, that which comes nearest to expressing the inexpressible is music.”

> > – Aldous Huxley

  

Elevate is an ad free music player, encompassing the perfect blend of elegant design and functionality. We aim to offer realtime updates on all your actions with breathtaking sound quality!

  

* Understable and minimal UI which makes the whole experience much more appealing!

* Extremely flexible Navigation using a minimalistic and efficient **Sidebar**

*  ***Discover*** to view Top Songs and higly Recommended Songs by the elevate. community.

*  ***Music Player*** to seamelessly listen to your favourite tracks and cultivate a vibe with just a click of a button.

* Easy to access Song Lists of your **Favourites** and **Play History**

* Manage your ***Playlists*** so you can have all your tracks in one place.

* View all tracks by an ***Artist*** using our Artist Profile.

* Search for Artists and Tracks using our dynamic Search Bar.

  

## Discover

  

It helps you to easily access your **recommendation**, based on your likes,play history and popularity among the community. _Listen to the best of what the music world has to offer_.

  

## Music Player

  

* Play and Pause at your convinience.

* Use our easy to understand controls to Skip to The previous or next track or even seek to your favourite part of the song!!

* Access the *Queue* to know what tracks you have coming up next!

* Handy options to *like* a song or add it to your playlist.

  

## Playlists

  

* Create playlists and you can even categrize them according to the MOOD cause *elevate.* lets your create as many playlists as you like!!

* Add songs to a multiple Playlists at once using a simple checkbox form!

* View all tracks for a Playlist using the Playlist Song view.

  

## Admin Functionality

  

* Manage Tracks by adding the newest tracks to contribute to the *elevate.* community!

* Manage the Artists that get showcased on our platform!

  

# Setup and Configuration
> Filesystem
- `web/` : Contains all files related to the frontend developed using ReactJS
- `backend/`:  Contains all files related to the backend developed using Flask

<br/>
To setup the project and get it running, clone the repository into your system and follow the steps.
  
>Frontend

The frontend is build using reactJS. Dependencies for this project would be [Node v12+](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install). 

```console

cd web

yarn install

yarn start

```
Your client would be running at port 3000.
<br/>
> Backend  

Dependencies to run the server would be python 3.

-  **Step 1**: Env configuration.

```console

cd backend

virtualenv myenv

source myenv/Scripts/activate

pip install -r requirements.txt

```
-  **Step 2**: Setup the firebase credentials and the `.env` configuration, more information available [here](https://github.com/avinash-vk/elevate/tree/main/backend#readme).

- **Step3**: Run the server.

```console

cd backend

export FLASK_APP=main.py

export FLASK_ENV=development

flask run

```

Your server would be running at port 5000.

*For local development, the server must be running in order to successfully query from the frontend, so make sure server runs before running the React app.*
  
  
## Test out the API's acting as the backbone to this application on our *Postman* Workspace

  

[Elevate Workspace][postman]

  

## Class Diagram

  

## Technologies & Tools used

<img  align="left" width="120px" src="https://media3.giphy.com/media/eNAsjO55tPbgaor7ma/giphy.gif"/>

<img  align="left" width="140px" margin=20px src="https://miro.medium.com/max/800/1*Q5EUk28Xc3iCDoMSkrd1_w.png"/>

<img width="140px"  src="https://cdn.dribbble.com/users/6295/screenshots/6509850/f.gif"/>

<br />

## Demo Link :

  

## Team :

  <table>
  <tr>
    <td align="center"><a href="https://github.com/ShreyaPanale "><img src="https://avatars.githubusercontent.com/u/44115662?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Shreya Panale</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/sanskritip"><img src="https://avatars.githubusercontent.com/u/48806637?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Sanskriti Pattanayak</b></sub></a><br /></td>
    <td align="center"><a href="https://github.com/avinash-vk"><img src="https://avatars.githubusercontent.com/u/51489449?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Avinash V K</b></sub></a><br /></td>



  

## Check out elevate at :

  

[https://elevate-25d94.web.app/][elevate]

  
  

## License

  

[MIT](LICENSE.md)  &copy; Elevate.

  

[elevate]:https://elevate-25d94.web.app/

[postman]:https://www.postman.com/kratos12/workspace/ooad/overview