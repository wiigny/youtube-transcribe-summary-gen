import { pipeline } from "@xenova/transformers";

const summarize = async (text) => {
  try {
    const generator = await pipeline(
      "summarization",
      "Xenova/distilbart-cnn-12-6"
    );

    const summary = await generator(text);

    return summary[0].summary_text;
  } catch (error) {
    throw new Error(error);
  }
};
export default summarize;
