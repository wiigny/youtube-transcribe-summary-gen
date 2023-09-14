import fs from "fs";
import wav from "node-wav";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";

const convert = (filePath) => {
  const outputPath = filePath.replace(".mp4", ".wav");

  return new Promise((resolve, reject) => {
    ffmpeg.setFfmpegPath(ffmpegStatic);
    ffmpeg()
      .input(filePath)
      .audioFrequency(16000)
      .audioChannels(1)
      .format("wav")
      .on("end", () => {
        const file = fs.readFileSync(outputPath);
        const fileDecoded = wav.decode(file);

        const audioData = fileDecoded.channelData[0];
        const floatArray = new Float32Array(audioData);

        resolve(floatArray);
        fs.unlinkSync(filePath);
        fs.unlinkSync(outputPath);
      })
      .on("error", (error) => {
        reject(error);
      })
      .save(outputPath);
  });
};
export default convert;
