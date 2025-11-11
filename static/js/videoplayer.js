

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById("videoFile");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource")
    const timeStamp = document.getElementById("timestamp")

    fileInput.addEventListener('change', e => {
        const file = fileInput.files[0];
        if (!file) {
            alert("No file selected.");
            return;
        }

        if (!file.type.startsWith('video/')) {
            alert("Please select a valid video file.");
            return;
        }

        if (file){
            // Create a temporary URL for the file
            const url = URL.createObjectURL(file);
            console.log(url);
            // Set source and reload the video
            videoSource.src = url;
            videoPlayer.load();
        }


    })
    videoPlayer.addEventListener('timeupdate', () =>{
        const current = videoPlayer.currentTime;

        // Format time
        const minutes = Math.floor(current/60);
        const seconds = Math.floor(current % 60).toString().padStart(2, '0');
        const milliseconds = Math.floor((current % 1) * 1000).toString().padStart(3, '0');

    timeStamp.textContent = `TimeStamp: ${minutes}:${seconds}.${milliseconds}`;

    });

})
// === Control functions ===
const myVideo = document.getElementById("videoPlayer");

function playPause() {
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

function makeBig() {
    myVideo.width = 720;
}

function makeSmall() {
    myVideo.width = 320;
}

function makeNormal() {
    myVideo.width = 480;
}


function frameCapture(vid, time) {
   const img = document.getElementById("frameImage");

    // Call the FastAPI endpoint
    fetch(`/video/${vid}/frame/${time}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch frame");
            return response.blob();
        })
        .then(blob => {
            // Convert blob to object URL
            img.src = URL.createObjectURL(blob);
        })
        .catch(err => console.error(err));
}

// Example usage:
frameCapture("oop(1).mp4", 5.0);// frame at 5 seconds


function readTranscript() {
    pass
}

function resetTranscript(){
    pass
}