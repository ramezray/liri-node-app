//calling dotenv
require("dotenv").config();
//calling key.js file
var keys = require("./keys.js");
//callimg file system npm
var fs = require('fs');
//calling spotify npm package 
var Spotify = require('node-spotify-api');
//calling request npm package 
var Request = require('request');
//calling moment npm package 
var moment = require('moment')
//creating new spotify 
var spotify = new Spotify(keys.spotify);
//creating var that will store the whole node command line
let command_line = process.argv;
//stroing index 2 in the command line
let sec_index = process.argv[2];
//stroing index 3 in the command line
let rd_index = process.argv[3];
//adding beark line for conscole use
let break_line = "***********************************************************************"
//if statment that will run for each condition 
if (sec_index === "concert-this") {
    BIT(); //if pro process.argv[2] is concert-this than run BIT() function 
} else if (sec_index === "spotify-this-song") {
    spotify_song();//if pro process.argv[2] is spotify-this-song than run spotify_song() function
} else if (sec_index === "movie-this") {
    OMDB();//if pro process.argv[2] is movie-this than run OMDB() function
} else if (sec_index === "do-what-it-says") {
    read_from_txt();//if pro process.argv[2] is do-what-it-says than run read_from_txt() function
} else { //if pro process.argv[2] has nothing will tell user what to do 
    console.log("Please Enter concert-this to search for BAND, OR spotify-this-song to search for SONG, OR movie-this to search for MOVIE, OR do-what-it-says for our defult search!! ");
}

//####################### 1. `node liri.js concert-this <artist/band name here>` ##########################
function BIT() {  //BIT is the function that will run when process.argv[2] is concert-this
    let band = rd_index; //store process.argv[3] on band var
    Request(`https://rest.bandsintown.com/artists/${band}/events?app_id=codingbootcamp`, function (error, response, body) { //send the request with band name
        let bandsResponse = JSON.parse(body); //get our data in json style
        let band_in_town = function BIN_data() { //store the the function which will display the data in var
            console.log(`\nUser searched for Band name: ${band}\n`) //log the band name that user is searching for
            for (let i = 0; i < 5; i++) { //for loop to display 5 result 
                let console_date_time = moment(bandsResponse[i].datetime).format("MMM Do YY"); //formatting the date using moment
                let console_sale_datetime = moment(bandsResponse[i].on_sale_datetime).format("MMM Do YY"); //formatting the date using moment
                let band_obj = { //the obj that will hold our data
                    search_band: band, //the word that user search for for logs needs
                    venue_name: bandsResponse[i].venue.name, 
                    venue_location: (bandsResponse[i].venue.city, +", " + bandsResponse[0].venue.region + ", " + bandsResponse[0].venue.country),
                    Event_time: console_date_time,
                    sale_time: console_sale_datetime,
                    break_line: break_line
                }
                console.log(`Name of the venue: ${band_obj.venue_name}\nVenue location: ${band_obj.venue_location}\nDate of the Event: ${band_obj.Event_time}\nTickets are avaliable for sale on: ${band_obj.sale_time}`);
                console.log("=====================================================================================");
                logging_data(band_obj)
            }
        }
        band_in_town();
    });
}
//######################### 2. `node liri.js spotify-this-song '<song name here>'` ##############################
function spotify_song() {
    key_word = command_line.slice(3).join("+")

    if (key_word === '') {
        key_word = "The+Sign"
    }
    spotify.search({
        type: 'track',
        query: key_word
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        let spotify_data = function spotify() {
            console.log(`\nUser searched for song with word: ${key_word}\n`)
            for (let i = 0; i < 5; i++) {
                let song_obj = {
                    search_song: key_word,
                    name: data.tracks.items[i].artists[0].name,
                    song_name: data.tracks.items[i].name,
                    album_name: data.tracks.items[i].album.name,
                    tracks: data.tracks.items[i].album.total_tracks,
                    link: data.tracks.items[i].album.external_urls.spotify,
                    break_line: break_line
                }
                console.log(`Artist(s) Name: ${song_obj.name}\nThe song's name: ${song_obj.song_name}\nName of the Album: ${song_obj.album_name}\nHow Many Songs in this Album: ${song_obj.tracks}\nHere is a link to The Album: ${song_obj.link}`);
                console.log("==========================================================================================================================");
                logging_data(song_obj)
            }
        }
        spotify_data();
    });
}
//######################## 3. `node liri.js movie-this '<movie name here>'` ############################
function OMDB() {
    let movie_name = command_line.slice(3).join('+')
    if (movie_name === '') {
        movie_name = "Mr.+Nobody"
    }
    console.log(`\nUser searched for Movie name: ${movie_name}\n`)
    Request(`http://www.omdbapi.com/?apikey=trilogy&t=${movie_name}`, function (error, response, movie) {

        let movie_info = JSON.parse(movie);
        let movie_obj = {
            search_movie: movie_name,
            title: movie_info.Title,
            year: movie_info.Year,
            rating: movie_info.imdbRating,
            country: movie_info.Country,
            language: movie_info.Language,
            plot: movie_info.Plot,
            actors: movie_info.Actors,
            break_line: break_line
        }
        console.log(`Title of the movie: ${movie_obj.title}\nYear the movie came out: ${movie_obj.year}\nIMDB Rating of the movie: ${movie_obj.rating}\nCountry where the movie was produced: ${movie_obj.country}\nLanguage of the movie: ${movie_obj.language}\nPlot of the movie: ${movie_obj.plot}\nActors in the movie: ${movie_obj.actors}`);
        console.log("=================================================================================");
        logging_data(movie_obj)
    });
}
//############################ 4. `node liri.js do-what-it-says` ###################################
//read from random.txt
function read_from_txt() {
    fs.readFile('random.txt', 'utf8', function (err, contents) {
        key_word = contents.split(",").slice(1).join('+')
        spotify.search({
            type: 'track',
            query: key_word
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            let spotify_data = function spotify() {
                console.log(`\nUser searched for song with word: ${key_word}\n`)
                let song_obj = {
                    search_song: key_word,
                    name: data.tracks.items[0].artists[0].name,
                    song_name: data.tracks.items[0].name,
                    album_name: data.tracks.items[0].album.name,
                    tracks: data.tracks.items[0].album.total_tracks,
                    link: data.tracks.items[0].album.external_urls.spotify,
                    break_line: break_line
                }
                console.log(`Artist(s) Name: ${song_obj.name}\nThe song's name: ${song_obj.song_name}\nName of the Album: ${song_obj.album_name}\nHow Many Songs in this Album: ${song_obj.tracks}\nHere is a link to The Album: ${song_obj.link}`);
                console.log("==========================================================================================================================");
                logging_data(song_obj)
            }
            spotify_data();
        });
    });
}
//======logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`===================
function logging_data(new_data) {
    fs.appendFile("log.txt", JSON.stringify(new_data), function (err) {
        if (err) throw err;
    })
}