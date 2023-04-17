const randomNumber = Math.floor(Math.random() * 2); // generates a random integer between 0 and 1
console.log(randomNumber);
if (randomNumber == 0){
    generateWikiart();
}
else {
    generateDalle();
}

////Generate with WikwiArt!!!!!!!

function generateWikiart() {

    // Check if the session key exists in sessionStorage
    let sessionKey = sessionStorage.getItem('sessionKey');

    if (!sessionKey) {
    // If the session key does not exist, create one
    sessionKey = generateSessionKey(); // Replace with your own session key generation function
    sessionStorage.setItem('sessionKey', sessionKey);
    }

    function generateSessionKey() {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://www.wikiart.org/en/Api/2/login?accessCode=5b1264edeaf74456&secretCode=add675c2e6fbf89e");
    xhr.onload = function() {
    // Check if the request was successful
    if (xhr.status === 200) {
        // Get the session ID from the response
        const sessionId = JSON.parse(xhr.responseText).SessionKey;
        console.log(`Session ID: ${sessionId}`);
        return sessionId;
        } else {
        console.log(`Session creation request failed. Status: ${xhr.status}`);
        }
    }
}

const apiUrl = `https://www.wikiart.org/en/App/Painting/MostViewedPaintings?randomSeed=123&authSessionKey=${sessionKey}`;
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const artworkUrl = data[Math.floor(Math.random() * 600)].image;
    document.getElementById("artwork").src = artworkUrl;
    // const arr = data;
    // const count = arr.length;
    console.log(data.length);
  })
.catch(error => console.error(error));
}



//Generate with DallE!!!!!!!
function generateDalle() {
    const apiKey = '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';
    const prompt = 'modernist painting';
    fetch(`https://api.openai.com/v1/images/generations`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY
    },
    body: JSON.stringify({
        model: 'image-alpha-001',
        prompt,
    }),
    })
    .then(response => response.json())
    .then(data => {
        const artworkUrl = data.data[0].url;
        document.getElementById("artwork").src = artworkUrl;
    })
    .catch(error => console.error(error));
}


//Button Logic!!!!

document.querySelector("#art").addEventListener("click", function() {
	console.log("You said Art!");
    if (randomNumber == 0) {
        var modal = document.getElementById("ArtArt");
    } else {
        var modal = document.getElementById("BotArt");
    }
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        location.reload();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload();
        }
    }
});

document.querySelector("#artificial").addEventListener("click", function() {
	console.log("You said Artifical!");
    if (randomNumber == 0) {
        var modal = document.getElementById("ArtBot");
    } else {
        var modal = document.getElementById("BotBot");
    }
    modal.style.display = "block";
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    location.reload();
    }
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        location.reload();
        }
    }
});


