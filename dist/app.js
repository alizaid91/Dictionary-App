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
    let meaningDiv = document.querySelector("#meaning");

    try {
      // Check if the word exists
      if (data.title === "No Definitions Found") {
        meaningDiv.innerText = "No definitions found for the word.";
      } else {
        // Insert HTML content for the first three meanings
        meaningDiv.innerHTML = `<div class="ml-5 mt-5 w-full flex flex-row items-center gap-2">
        <i class="fa-solid fa-volume-high text-2xl text-white bg-blue-700 p-1.5 rounded-full" id="audio-icon" onclick="playWord()"></i>
        <h1 class="font-extrabold text-4xl tracking-wider">${word}</h1>
        <span class="text-2xl font-bold text-gray-700">${data[0].meanings[0].partOfSpeech}</span>
      </div>`;

        let defNum = 0;
        for (let i = 0; i < 3; i++) {
          defNum++;
          const meaning = data[0].meanings[0].definitions[i];
          meaningDiv.innerHTML += `
            <div class="bg-slate-200 p-6 rounded-xl shadow-xl m-5">
            <p class="font-extrabold text-blue-700">Defination ${defNum}:</p>
            <p class="mb-3 text-[1rem] font-semibold tracking-wide">${meaning.definition}</p>
            <p class="font-extrabold text-blue-700">Example:</p>
            <p class="text-[1rem] font-semibold tracking-wide">${meaning.example}</p>
            </div>`;
        }
      }
    } catch {
      // Check if audio exists
      if (data[0].phonetics && data[0].phonetics[0].audio) {
        const audioUrl = data[0].phonetics[0].audio;
        console.log("Audio URL:", audioUrl);

        audioPlayer.src = audioUrl;
        console.log("Src attribute set:", audioPlayer.src);
      }
    }
  })
  .catch((error) => console.error("Error:", error));

function playWord() {
  audioPlayer.playbackRate = 0.7;
  audioPlayer.play();
}
