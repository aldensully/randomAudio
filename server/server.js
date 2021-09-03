const express = require('express');
require('dotenv').config();
const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const ytdl = require('ytdl-core');

const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
ffmpeg.setFfmpegPath(ffmpegPath);
const app = express();
const rp = require('request-promise');
const htmlParser = require('node-html-parser');
const cheerio = require('cheerio');
const { text } = require('cheerio/lib/api/manipulation');
const { children } = require('cheerio/lib/api/traversing');



app.get('/test', (req, res) => {
    res.send(data.items[0].id.videoId);   //sends the video id to react. youtube.com/watch?v={videoId}
})



//--------- with scraping ----------
// app.get('/try', async (req, res) => {
//     const randomId = createRandomId();
//     const urls = []
//     const url = `https://www.google.com/search?q=youtube+img+${randomId}`;
//     // const data = await rp(url);
//     const data = <div class="yuRUbf" />;
//     const $ = cheerio.load(data);
//     $("div.yuRUbf").each((index, value) => {
//         var link = $(value).text;
//         console.log(value)
//         if (link) urls.push(link);
//     });
//     console.log(urls)
// })



//--------- With Google Youtube API   ----------

app.get('/try', async (req, res) => {

    res.set({ "Content-Type": "audio/mpeg" });

    const randomId = createRandomId();
    console.log("ID: ", randomId);

    const id = await google.youtube('v3').search.list({
        key: process.env.YOUTUBE_TOKEN,
        part: "snippet",
        type: "video",
        videoDuration: "short",
        q: `img ${randomId}`,
        maxResults: 1
    })
    var yturl = ("https://www.youtube.com/watch?v=" + id.data.items[0].id.videoId);
    console.log("Downloading: ", yturl);

    let stream = ytdl(yturl, {
        quality: 'highestaudio',
    });

    try {
        let start = Date.now();
        ffmpeg(stream)
            .audioBitrate(128)
            //.save(`${__dirname}/${id}1.mp3`)
            //.save("/audio.mp3")
            .toFormat('mp3')
            .on('end', () => {
                console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
            })
            .pipe(res)


    }
    catch (e) {
        console.log(e.message);
        res.send({ error: e.message });
    }

})


function createRandomId() {
    return Math.floor(Math.random() * 10000);
}






//testing purposes
app.get('/data', (req, res) => {
    const data = [
        { id: 1, firstName: 'alden', lastName: 'doodle' }
    ];
    res.json(data);
});



const port = 5000

app.listen(port, () => console.log(`server started on port ${port}`));
