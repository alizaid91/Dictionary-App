function search() {
  const searchInput = document.getElementById("searchInput").value;
  // Redirect to the meaning page with the word as a parameter
  if (searchInput != "") {
    window.location.href = `meaning.html?word=${searchInput}`;
    document.getElementById("searchInput").value = "";
  } else {
    alert("Enter Word!");
  }
}

let audioPlayer = document.getElementById("audioPlayer");
let wordName = document.querySelector("#word-name");
let meaningContainer = document.querySelector("#meaning-ontainer");

// Extract the word parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get("word");
// console.log(word);
const wikiUrl = `https://en.wikipedia.org/wiki/${word}`;

fetchMeaning(word);

//fetch using async-await
async function fetchMeaning(word) {
  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const meanings = await response.json();
    // console.log(meanings);

    // Check if the word exists
    if (meanings.title === "No Definitions Found") {
      wordName.innerText = "No definitions found for the word.";
    } else {
      wordName.innerHTML = `<div class="hello pr-3 ml-1 w-auto flex flex-row items-center gap-2 overflow-x-scroll justify-center h-full">
          <i class="fa-solid fa-volume-high text-xs text-white bg-blue-700 p-2 rounded-full h-full" id="audio-icon" onclick="playWord()"></i>
          <h1 class="font-extrabold text-3xl tracking-wider md:text-black h-full">${word}</h1>
          <span class="text-2xl font-bold text-gray-700 md:text-slate-700 h-full">${meanings[0].meanings[0].partOfSpeech}</span>
          <a href="${wikiUrl}" target="_blank" class="h-full">Wikipedia</a>
        </div>`;

      const definitions = meanings[0].meanings[0].definitions;
      const meaningNew = definitions.filter(
        (meaning) => meaning.example || meaning.definition
      );
      // console.log(meaningNew);
      let defNum = 0;
      for (let i = 0; i < meaningNew.length; i++) {
        defNum++;
        meaningContainer.innerHTML += `
              <div class="meaning-div relative bg-slate-200 p-6 rounded-xl shadow-xl md:max-w-[400px] min-w-[300px]">
              <p class="font-extrabold text-blue-700">Defination ${defNum}:</p>
              <p class="mb-3 text-[1rem] font-semibold tracking-wide">${
                meaningNew[i].definition
              }</p>
              <p class="font-extrabold text-blue-700">${
                meaningNew[i].example ? "Example:" : ""
              }</p>
              <p class="text-[1rem] font-semibold tracking-wide">${
                meaningNew[i].example ? meaningNew[i].example : ""
              }</p>
              <div class="corner top-left bg-red-500 rounded-tl-xl"></div>
              <div class="corner top-right bg-blue-500 rounded-tr-xl"></div>
              <div class="corner bottom-left bg-green-500 rounded-bl-xl"></div>
              <div class="corner bottom-right bg-yellow-500 rounded-br-xl"></div>
              </div>`;
        // console.log(`word ${i} added`)
      }
    }

    const audioUrl = meanings[0].phonetics;
    const audioUrlExist = audioUrl.filter((url) => url.audio);
    // console.log(audioUrl)
    // console.log(audioUrlExist.length)
    if (audioUrlExist.length > 0) {
      audioPlayer.src = audioUrlExist[0].audio;
    }
  } catch (error) {
    console.log(`Error fetching the meaning: ${error}`);
  }
}

function playWord() {
  audioPlayer.playbackRate = 0.7;
  audioPlayer.play();
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    if (!word) {
      search();
      document.getElementById("searchInput").value = "";
    } else {
      console.log(e.key);
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("opacity-0");
});

//fetch using .then
/*
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then((response) => response.json())
  .then((data) => {
    // console.log(data)
    // Check if the word exists
    if (data.title === "No Definitions Found") {
      wordName.innerText = "No definitions found for the word.";
    } else {
      // Insert HTML content for the first three meanings
      wordName.innerHTML = `<div class="hello pr-3 ml-1 w-auto flex flex-row items-center gap-2 overflow-x-scroll justify-center h-full">
        <i class="fa-solid fa-volume-high text-xs text-white bg-blue-700 p-2 rounded-full h-full" id="audio-icon" onclick="playWord()"></i>
        <h1 class="font-extrabold text-3xl tracking-wider md:text-black h-full">${word}</h1>
        <span class="text-2xl font-bold text-gray-700 md:text-slate-700 h-full">${data[0].meanings[0].partOfSpeech}</span>
        <a href="${wikiUrl}" target="_blank" class="h-full">Wikipedia</a>
      </div>`;
      const meaning = data[0].meanings[0].definitions;
      const meaningNew = meaning.filter((meanin) => meanin.example || meanin.definition);
      // console.log(meaning)
      // console.log(meaningNew)
      let defNum = 0;
      for (let i = 0; i < meaningNew.length; i++) {
        defNum++;
        meaningContainer.innerHTML += `
            <div class="meaning-div relative bg-slate-200 p-6 rounded-xl shadow-xl md:max-w-[400px] min-w-[300px]">
            <p class="font-extrabold text-blue-700">Defination ${defNum}:</p>
            <p class="mb-3 text-[1rem] font-semibold tracking-wide">${meaningNew[i].definition}</p>
            <p class="font-extrabold text-blue-700">${meaningNew[i].example ? 'Example:' : ''}</p>
            <p class="text-[1rem] font-semibold tracking-wide">${meaningNew[i].example ? meaningNew[i].example : ''}</p>
            <div class="corner top-left bg-red-500 rounded-tl-xl"></div>
            <div class="corner top-right bg-blue-500 rounded-tr-xl"></div>
            <div class="corner bottom-left bg-green-500 rounded-bl-xl"></div>
            <div class="corner bottom-right bg-yellow-500 rounded-br-xl"></div>
            </div>`;
            // console.log(`word ${i} added`)
      }
    }

      const audioUrl = data[0].phonetics
      const audioUrlExist = audioUrl.filter((url) => url.audio)
      // console.log(audioUrl)
      // console.log(audioUrlExist.length)
      if(audioUrlExist.length > 0){
        audioPlayer.src = audioUrlExist[0].audio;
      }
  })

function playWord() {
  audioPlayer.playbackRate = 0.7;
  audioPlayer.play();
}

document.addEventListener('keydown' , (e) => {
  if(e.key === 'Enter'){
    if(!word){
      search()
      document.getElementById("searchInput").value = ''
    }
    else{
      console.log(e.key)
    }
  }
})

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.remove("opacity-0");
});
*/
