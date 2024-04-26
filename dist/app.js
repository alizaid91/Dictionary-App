function search() {
  const searchInput = document.getElementById("searchInput").value;
  // Redirect to the meaning page with the word as a parameter
  window.location.href = `meaning.html?word=${searchInput}`;
}

// Extract the word parameter from the URL
const urlParams = new URLSearchParams(window.location.search);
const word = urlParams.get("word");

// Fetch meaning from API
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
  .then((response) => response.json())
  .then((data) => {
    const meaningDiv = document.getElementById("meaning");
    const audioPlayer = document.getElementById("audioPlayer");

    // Check if the word exists
    if (data.title === "No Definitions Found") {
      meaningDiv.innerText = "No definitions found for the word.";
    } else {
      // Display the meaning
      meaningDiv.innerHTML = `
          <h2>${word}</h2>
          <p>Part of speech: ${data[0].meanings[0].partOfSpeech}</p>
          <p>Definition: ${data[0].meanings[0].definitions[0].definition}</p>
        `;

      // Check if audio exists
      if (data[0].phonetics && data[0].phonetics[0].audio) {
        const audioUrl = data[0].phonetics[0].audio;
        audioPlayer.src = audioUrl;
      } else {
        audioPlayer.style.display = "none"; // Hide audio player if audio is not available
      }
    }
  })
  .catch((error) => console.error("Error:", error));
