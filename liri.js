require("dotenv").config();
var keys = require("./keys.js");
var fs = require('fs');

var Spotify = require('node-spotify-api');
var Request = require('request');
var moment = require('moment')
var spotify = new Spotify(keys.spotify);

switch (process.argv[2]) {
    case ("concert-this"):
        BIT();
        break;

    case ("spotify-this-song"):
        spotify_song();
        break;

    case ("movie-this"):
        OMDB();
        break;

    case ("do-what-it-says"):
        read_from_txt();
        break;
}

//####################### 1. `node liri.js concert-this <artist/band name here>` ##########################
function BIT() {
    let band = process.argv[3];
    Request(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`, function (error, response, body) {
        let bandsResponse = JSON.parse(body);
        let band_in_town = function BIN_data() {
            for (let i = 0; i < 2; i++) {
                console.log("Name of the venue: " + bandsResponse[i].venue.name);
                console.log("Venue location: " + bandsResponse[i].venue.city + ", " + bandsResponse[0].venue.region + ", " + bandsResponse[0].venue.country);
                console.log("Date of the Event: " + bandsResponse[i].datetime);
                console.log("Tickets are avaliable for sale on: " + bandsResponse[i].on_sale_datetime);
                console.log("==========================================================================================================================");
            }
        }
        band_in_town();
    });
}

//######################### 2. `node liri.js spotify-this-song '<song name here>'` ##############################
function spotify_song() {
    let key_word;
    if ( process.argv.length = 2){
     key_word = "The Sign";
    }else {
        let split_contents = process.argv.slice(3)
        console.log(split_contents);
        key_word = split_contents.join('+')
        console.log(key_word);
    }

    spotify.search({
        type: 'track',
        query: key_word
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //the number that will follow item will decied what album.
        //query need to be var 
        let spotify_data = function spotify() {
            for (let i = 0; i < 2; i++) {
                console.log("Artist(s) Name: " + data.tracks.items[i].artists[0].name); //to get name of the singer
                console.log("The song's name: " + data.tracks.items[i].name);
                console.log("Name of the Album: " + data.tracks.items[i].album.name); //here to get album name
                console.log("How Many Songs in this Album: " + data.tracks.items[i].album.total_tracks); //how many songs per album
                console.log("Here is a link to The Album: " + data.tracks.items[i].album.external_urls.spotify); //to get link to the ablbum that has the song
                console.log("==========================================================================================================================");
            }
        }
        spotify_data();
    });
}

//######################## 3. `node liri.js movie-this '<movie name here>'` ############################
function OMDB() {
    let split_contents = process.argv.slice(3)
    console.log(split_contents);
    let movie = split_contents.join('+')
    console.log(movie);
    Request(`http://www.omdbapi.com/?apikey=trilogy&t=${movie}`, function (error, response, movie) {
        let movie_info = JSON.parse(movie);
        console.log("Title of the movie: " + movie_info.Title);
        console.log("Year the movie came out: " + movie_info.Year);
        console.log("IMDB Rating of the movie: " + movie_info.imdbRating);
        console.log("Country where the movie was produced: " + movie_info.Country);
        console.log("Language of the movie: " + movie_info.Language);
        console.log("Plot of the movie: " + movie_info.Plot);
        console.log("Actors in the movie: " + movie_info.Actors);
        console.log("=================================================================================");

    });
}

//############################ 4. `node liri.js do-what-it-says` ###################################
//read from random.txt
function read_from_txt() {
    fs.readFile('random.txt', 'utf8', function (err, contents) {
        let split_contents = contents.split(",");
        let key_word = split_contents.slice(1).join('+')

        spotify.search({
            type: 'track',
            query: key_word
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //the number that will follow item will decied what album.
            //query need to be var 
            let spotify_data = function spotify() {
                for (let i = 0; i < 1; i++) {
                    console.log("Artist(s) Name: " + data.tracks.items[i].artists[0].name); //to get name of the singer
                    console.log("The song's name: " + data.tracks.items[i].name);
                    console.log("Name of the Album: " + data.tracks.items[i].album.name); //here to get album name
                    console.log("How Many Songs in this Album: " + data.tracks.items[i].album.total_tracks); //how many songs per album
                    console.log("Here is a link to The Album: " + data.tracks.items[i].album.external_urls.spotify); //to get link to the ablbum that has the song
                    console.log("==========================================================================================================================");
                }
            }
            spotify_data();
        });
    });
}