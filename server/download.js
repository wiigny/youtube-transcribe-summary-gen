import ytdl from "ytdl-core";
import fs from "fs";

const download = (videoId) => {
  const timestamp = new Date().getTime();

  return new Promise((resolve, reject) => {
    ytdl(`https://www.youtube.com/shorts/${videoId}`, {
      quality: "lowestaudio",
      filter: "audioonly",
    })
      .on("info", (info) => {
        const seconds = info.formats[0].approxDurationMs / 1000;

        if (seconds > 61)
          throw new Error("The received video is longer than 60 seconds");
      })
      .on("end", () => {
        resolve(`./tmp/${timestamp}.mp4`);
      })
      .on("error", (error) => {
        reject(error);
      })
      .pipe(fs.createWriteStream(`./tmp/${timestamp}.mp4`));
  });
};
export default download;
