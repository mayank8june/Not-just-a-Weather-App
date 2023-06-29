
window.onload = function() {
  get_location();
};
function get_location() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
      console
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

async function showPosition(position) {
    let lat = position.coords.latitude
    let long =position.coords.longitude;
    
    const api_key = "f749e0c55996ac9cb467e1a23350b53b"
    const api_url = "https://api.openweathermap.org/data/2.5/weather?"

    const response = await fetch(api_url + `lat=${lat}`+ `&lon=${long}`+ `&appid=${api_key}`);
    var data = await response.json()
    var weather = data.weather[0].description + ' weather'
    console.log("response:", data)

    get_playlist(weather)
  }

  function get_playlist(weather){
    // const axios = require('axios');
    console.log("get+playlist function called")
    var client_id = "1019f4e6207447049724e9c4078dedea"
    var client_secret = "1493bc05fbf540a0961e93c03d337103"
    var redirect_uri = 'http://127.0.0.1:5500/';

    const _getToken = async () => {
      const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
      });

      const data = await result.json();
      const token = data.access_token
      console.log("token:", token)
      var spotifyApi = new SpotifyWebApi();
      spotifyApi.setAccessToken(token);
      // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
      //   if (err) console.error(err);
      //   else console.log('Artist albums', data);
      // });

      queryTerm = weather

      prev = spotifyApi.searchPlaylists(queryTerm, { limit: 30 });
      prev.then(
        function (data) {
          // clean the promise so it doesn't call abort
          var playlists = data.playlists.items
          console.log("spotify result:", playlists.length)
          prev = null;
          for( var i = 0; i < playlists.length; i++) {
            console.log("search result:", playlists[i].images[0].url)
            console.log("search result:", playlists[i].external_urls.spotify)
            document.querySelector('.cards').innerHTML += `
             <div class="card">
                <a href="${playlists[i].external_urls.spotify}"><img src="${playlists[i].images[0].url}"></a>
            </div>	
            `;
            
          }
          // ...render list of search results...
        },
        function (err) {
          console.error(err);
        }
      );

      
      return data.access_token
    }

    _getToken()
    

    // var Spotify = require('spotify-web-api-js');
    // var s = new Spotify();
    // var clientId = 'YOUR_CLIENT_ID';

    // Define the authentication options
    // var authOptions = {
    //   method: 'POST',
    //   url: 'https://accounts.spotify.com/api/toke',
    //   headers: {
    //     'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
    //   },
    //   dataType: 'json',
    //   body: 'grant_type=client_credentials'
    // };

    // // Make the AJAX call
    // fetch(authOptions.url, authOptions)
    //   .then(function(response) {
    //     return response.json();
    //   })
    //   .then(function(data) {
    //     // The token is available in the `data` object
    //     var token = data.access_token;
    //     console.log('Token:', token);
    //   })
    //   .catch(function(error) {
    //     console.error('Error:', error);
    //   });

    // $.ajax({
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: {
    //     'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
    //   },
    //   method: 'POST',
    //   body: 'grant_type=client_credentials',
    //   dataType: 'json',
    //   success: function(data){
    //     console.log('success: '+data);
    //   }
    // });
    
    // var spotifyApi = new SpotifyWebApi();
    // spotifyApi.setAccessToken('1019f4e6207447049724e9c4078dedea');
    // console.log("spotify", spotifyApi)
    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: {
    //     'Authorization': 'Basic ' + ((client_id + ':' + client_secret).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
    //   json: true
    // };
    
    
    // axios.post(authOptions).then((response) => {
    //   if (response.status === 200) {
    //     var token = response.data.access_token;
    //     console.log('Token:', token);
    //   }
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
    // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
    //   function (data) {
    //     console.log('Artist albums', data);
    //   },
    //   function (err) {
    //     console.error(err);
    //   }
    // );

    // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE', function (err, data) {
    //   if (err) console.error(err);
    //   else console.log('Artist albums', data);
    // });
    
    // $.ajax({
    //   type: "GET",
    //   url: "http://127.0.0.1:5500/",
    //   data: client_id,
    //   success: function(response){
    //     console.log("Success", response)
    //   }
    // }).done(function( response ) {
       
    // });
  }