import { api } from "../../service/api";
import buttonDisabled from "./buttonDisabled";

const buttonSend = document.querySelector("#buttonSend");
const input = document.querySelector("#url");
const form = document.querySelector("#form");
const content = document.querySelector("#content");
const summary = document.querySelector("#summary");
const h2 = document.querySelectorAll(".h2-hidden");

buttonDisabled(input, buttonSend);

form.addEventListener("submit", (event) => handleSubmit(event));

const handleSubmit = async (e) => {
  e.preventDefault();

  summary.innerText = "";
  h2.forEach((h2) => h2.classList.add("h2-hidden"));

  const videoUrl = input.value;

  if (videoUrl.includes("youtube.com/shorts")) {
    const params = videoUrl.split("/shorts/")[1];

    const videoId = params.split("?")[0];

    h2[0].classList.remove("h2-hidden");

    content.innerText = "Obtendo a transcrição...";

    const resultTranscribe = await api.get(`/summary/${videoId}`);

    h2[1].classList.remove("h2-hidden");

    content.innerText = resultTranscribe.data.result;

    summary.innerText = "Realizando o resumo...";

    const resultSummary = await api.post(`/summary`, {
      text: resultTranscribe.data.result,
    });

    summary.innerText = resultSummary.data.result;
  } else {
  }
};
