import express from "express";
import cors from "cors";
import download from "./download.js";
import convert from "./convert.js";
import transcribe from "./transcribe.js";
import summarize from "./summarize.js";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/summary/:id", async (req, resp) => {
  try {
    const videoId = req.params.id;

    if (!videoId) {
      return resp.status(400).json({ message: "ID is not provide." });
    }

    const filePath = await download(req.params.id);
    const audioConverted = await convert(filePath);
    const result = await transcribe(audioConverted);

    return resp.status(200).json({ result: result });
  } catch (error) {
    console.error(error);

    return resp.json({ error });
  }
});

app.post("/summary", async (req, resp) => {
  try {
    const textToResume = req.body.text;

    if (!textToResume) {
      return resp.status(400).json({ message: "Text is not provide." });
    }

    const result = await summarize(textToResume);

    resp.status(201).json({ result: result });
  } catch (error) {
    console.error(error);

    return resp.json({ error });
  }
});

app.listen(3000, () => {
  console.log("Server is Running! http://localhost:3000");
});
