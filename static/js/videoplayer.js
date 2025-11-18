let uploadedVid = null;

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById("videoFile");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource")
    const timeStamp = document.getElementById("timestamp")


    fileInput.addEventListener('change', async e => {
    const file = fileInput.files[0];
    if (!file) return;

    // Upload to FastAPI
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/upload_video", { method: "POST", body: formData });
    const data = await res.json();

    if (!res.ok) {
        alert("Failed to upload video");
        return;
    }

    // Save filename returned by backend
    uploadedVid = data.filename;

    // Load video in browser
    const url = URL.createObjectURL(file);
    videoSource.src = url;
    videoPlayer.load();
});

    videoPlayer.addEventListener('timeupdate', () =>{
        const current = videoPlayer.currentTime;

        // Format time
        const minutes = Math.floor(current/60);
        const seconds = Math.floor(current % 60).toString().padStart(2, '0');
        const milliseconds = Math.floor((current % 1) * 1000).toString().padStart(3, '0');

        timeStamp.textContent = `TimeStamp: ${minutes}:${seconds}.${milliseconds}`;

    });

    // Capture frame button
    const CaptureBtn = document.getElementById("captureFrame");

    CaptureBtn.addEventListener('click', () => {
        if (!uploadedVid) {
            alert("Please upload a video first!");
            return;
        }
        const time = videoPlayer.currentTime;
        frameCapture(uploadedVid, time);

    })

})
// === Control functions ===
const myVideo = document.getElementById("videoPlayer");

function playPause() {
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

// Capture frame button
function captureFrameButton() {
    if (!uploadedVid) {
        alert("Upload a video first!");
        return;
    }
    const time = videoPlayer.currentTime;
    frameCapture(uploadedVid, time);
}

// capture frame function
function frameCapture(vid, time) {
   const img = document.getElementById("frameImage");
   const safeVid = encodeURIComponent(vid);

    // Call the FastAPI endpoint
    fetch(`/video/${safeVid}/frame/${time}`)
        .then(response => {
            if (!response.ok) throw new Error(`Frame error: ${response.status}`);
            return response.blob();
        })
        .then(blob => img.src = URL.createObjectURL(blob))
        .catch(err => console.error(err));
}
async function readTranscript() {
    if (!uploadedVid){
        alert("Upload a video first.");

    }
    const videoPlayer = document.getElementById("videoPlayer");
    const time = videoPlayer.currentTime;
    const safeVid = encodeURIComponent(uploadedVid);

    frameCapture(uploadedVid, time);

    try{
        const res = await fetch(`/video/${safeVid}/frame/${time}/transcript`);
        if (!res.ok) {
            throw new Error(`Transcript error: ${res.status}`)
        }

        const data = await res.json();
        const text = data.text || "No text detected";

        document.getElementById("transcriptText").textContent = text;
    } catch (err){
        console.error(err);
        document.getElementById("transcriptText").textContent = "Failed to read transcript.";
    }

}

function resetTranscript(){
    const element = document.getElementById("transcriptText");
    if (element) element.textContent = "";
}