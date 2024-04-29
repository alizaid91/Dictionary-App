function search() {
  const searchInput = document.getElementById("searchInput").value;
  // Redirect to the meaning page with the word as a parameter
  if (searchInput != "") {
    window.location.href = `meaning.html?word=${searchInput}`;
  } else {
    alert("Enter Word!");
  }
}

// Extract the word parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get("word");
let audioIcon = document.querySelector("#audio-icon");

// Fetch meaning from API
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let audioPlayer = document.getElementById("audioPlayer");
    let wordName = document.querySelector("#word-name");
    let meaningContainer = document.querySelector("#meaning-ontainer");

    try {
      // Check if the word exists
      if (data.title === "No Definitions Found") {
        wordName.innerText = "No definitions found for the word.";
      } else {
        // Insert HTML content for the first three meanings
        wordName.innerHTML = `<div class="pr-3 ml-1 mt-5 w-auto flex flex-row items-center gap-2 overflow-x-scroll">
        <i class="fa-solid fa-volume-high text-xs text-white bg-blue-700 p-2 rounded-full" id="audio-icon" onclick="playWord()"></i>
        <h1 class="font-extrabold text-3xl tracking-wider md:text-black">${word}</h1>
        <span class="text-2xl font-bold text-gray-700 md:text-slate-700">${data[0].meanings[0].partOfSpeech}</span>
      </div>`;

        let defNum = 0;
        for (let i = 0; i < 3; i++) {
          defNum++;
          const meaning = data[0].meanings[0].definitions[i];
          meaningContainer.innerHTML += `
            <div class="relative bg-slate-200 p-6 rounded-xl shadow-xl md:max-w-[400px] min-w-[300px]">
            <p class="font-extrabold text-blue-700">Defination ${defNum}:</p>
            <p class="mb-3 text-[1rem] font-semibold tracking-wide">${meaning.definition}</p>
            <p class="font-extrabold text-blue-700">Example:</p>
            <p class="text-[1rem] font-semibold tracking-wide">${meaning.example}</p>
            <div class="corner top-left bg-red-500 rounded-tl-xl"></div>
            <div class="corner top-right bg-blue-500 rounded-tr-xl"></div>
            <div class="corner bottom-left bg-green-500 rounded-bl-xl"></div>
            <div class="corner bottom-right bg-yellow-500 rounded-br-xl"></div>
            </div>`;
        }
      }
    } catch {
      console.log("error");
    }
    for (let j = 0; j < 3; j++) {
      if (data[0].phonetics && data[0].phonetics[j].audio) {
        const audioUrl = data[0].phonetics[j].audio;
        console.log("Audio URL:", audioUrl);
        audioPlayer.src = audioUrl;
        console.log("Src attribute set:", audioPlayer.src);
        break;
      }
    }
  })
  .catch((error) => console.error("Error:", error));

function playWord() {
  audioPlayer.playbackRate = 0.7;
  audioPlayer.play();
}

document.addEventListener("DOMContentLoaded", function () {
  // Show the body smoothly after content is loaded
  document.body.classList.remove("opacity-0");
});
