# liri-node-app
Here is what our app can do:
### What Each Command Should Do
	1. node liri.js concert-this BAND NAME
		* Name of the venue
		* Venue location
		* Date of the Event useing moment

	2. node liri.js spotify-this-song SONG NAME
		 * Artist(s)
		 * The song's name
		 * A preview link of the song from Spotify
		 * The album that the song is from

	3. node liri.js spotify-this-song BUT NO SONG PROVIDED
		 * default to "The Sign"
	
	4. node liri.js movie-this MOVIE NAME
		* Title of the movie.
        	* Year the movie came out.
        	* IMDB Rating of the movie.
       		* Rotten Tomatoes Rating of the movie.
        	* Country where the movie was produced.
        	* Language of the movie.
        	* Plot of the movie.
        	* Actors in the movie.

	5. node liri.js movie-this BUT NO MOVIE PROVIDED
		* Output data for the movie 'Mr. Nobody.'

	6. node liri.js do-what-it-says
		* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands

	7. Logging the data that in terminal/bash window to `log.txt`