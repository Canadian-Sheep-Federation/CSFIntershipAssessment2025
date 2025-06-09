For this coding assessment, I have written an API that lets a user search a song
and it will return a youtube video and lyrics of the song. Allowing the user to
Listen to the song while reading its lyrics. To complete this task, I will use the
following APIs to solve this problem:
- Genius API to search and obtain song metadata
  - This API reqires a key stored in `GENIUS_API_KEY`,
- Lyrics.ovh to obtain song lyrics of a valid song (I'm surprised Genius doesn't
  do this with their API)
- Youtube's Embedded API to obtain the song from youtube

# API
For the API, I will need an approach that uses two types of GET requests, and one
POST request. The POST request will be used to search for a list of available
songs, and the GET requests will be used to pull the song metadata.

## GET request
`/API/REST/GetLastSong`

This one is more used for convenience as I am currently unsure how I would use
this in a practical sense. This request just returns the last requested song

### Output
```json
{
  "Success": bool,
  "data": Success ? [
    "Name": string,
    "Artist": string,
    "Artwork": string,
    "Lyrics": string,
    "Youtube": URL
  ] : ErrorMessage
}
```

## GET/:id request
`/API/REST/GetSong/:id`

After receiving an ID from the POST Request, you can feed that ID into this method
and the API will return a youtube video, the song lyrics, and a URL to the embed of the song.

### Output
```json
{
  "Success": bool,
  "data": Success ? [
    "Name": string,
    "Artist": string,
    "Artwork": string,
    "Lyrics": string,
    "Youtube": URL
  ] : ErrorMessage
}
```

## POST request
`/API/POST/SearchSongs`

Post Request Format:
```json
{
  "Search": string,
  "SearchCount": (unsigned int <= 10),
}
```

This post request returns the number of songs requested. If a number of songs
are not requested, this should by default return 10 search results max.
This search should not be any bigger than 10 due to limitations in Genius' API.

### Output
```json
{
  "Success": bool,
  "data": Success ? [
    {
      "SongID": int
      "Song": string,
      "Artist": string,
      "Artwork": URL,
    }
  ] : ErrorMessage
}
```

# Bonus Points

## Discuss how the application and api could be extended and improved

After completing this assignment, I unfortunately realized I misunderstood
the task of the assignment, and realized I have no way to see the responses
other people have made. However, you do get to see what the last song listened
to was on load, so if I had to expand on this I would implement a system to see
a list of songs that have been recently viewed in general by other web app
users.

As of how this API could be improved, the API returns youtube videos, and due
to some songs on Youtube not being permitted to be played outside of Youtube,
this means you can not listen to every song availabe. To improve the API
further, I would need access to a service that allows any song to be played
freely such as Spotify's API (but that requires a premium subscription which
I do not have).

As of general functionality, using serverless code would be a good way to scale
up. This would allow a larger scale of users to use the API and web app without
taking too much of a toll on the service.

## Discuss how the application and api should be deployed

If you build the frontend, you can take the output and move it to a folder
called static. Assuming you have your .env file, all you have to do is run `node ./` and the API is up and running. As for deploying further,
containerization would be a good approach and the API can be hosted on a
service such as Cloudfront or even AWS using the right services.

## Intuitive design and user interface

I kept UI design simple since I wanted to focus more on functionality.
On the left, you have two tabs. One is to search for a song, and the other is
to see the lyrics of the loaded song. On the right, you have the song name, the
artist, and the video selected to play the song.
