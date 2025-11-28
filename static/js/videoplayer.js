let uploadedVid = null;

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById("videoFile");
    const videoPlayer = document.getElementById("videoPlayer");
    const videoSource = document.getElementById("videoSource")
    const timeStamp = document.getElementById("timestamp")


    // Handle Video Upload
    fileInput.addEventListener('change', async e => {
    const file = fileInput.files[0];
    if (!file) return; // No file selected

    // Upload to FastAPI
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/upload_video",
        {
            method: "POST",
            body: formData
        });
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
// --- Pause/Play video -- currently not in use
const myVideo = document.getElementById("videoPlayer");

function playPause() {
    if (myVideo.paused)
        myVideo.play();
    else
        myVideo.pause();
}

// Reference: https://www.geeksforgeeks.org/javascript/username-validation-in-js-regex/
// Used for understanding username validation using Regex
function myFunction() {
    const name = document.getElementById("userName").value;
    document.getElementById("greeting").textContent =
        "Hello, " + name + "!\n" + "Welcome to Ocrroo website!";

    // Validate username regex:
    const pattern = /^[a-zA-Z][a-zA-Z0-9_]{2,15}$/;

    const isValid = pattern.test(name);
    console.log("Username entered: ", name);
    console.log("Username entered: ", isValid);

    // Test
    return isValid

    // function validateUsername(name){
    //     if (name.length <3) {
    //         return "Username is too short. Please enter a longer name!";
    //     }
    //     if (name.length > 16) {
    //         return "Username is too long. Please enter a shorter name!"
    //     }
    //
    //     // Regex to check valid characters
    //     const pattern = /^[a-zA-Z0-9._]+$/;
    //     if (!pattern.test(name)) {
    //         return "Username contains invalid characters. Only letters, numbers, " +
    //             "dots and underscores are allowed.";
    //     }
    //
    //     return "Valid Username.";
    // }
    //
    //  console.log(validateUsername());

}




// Capture and Read Transcript button combined
async function captureFrameAndTranscriptButton(){
   if (!uploadedVid) {
       alert("Upload a video first!");
       return;
   }
    const videoPlayer = document.getElementById("videoPlayer");
    const time = videoPlayer.currentTime;
    const safeVid = encodeURIComponent(uploadedVid);
    const img = document.getElementById("frameImage");

    // -- Capture Video Frame --
    try {

        const frameRes = await fetch(`/video/${safeVid}/frame/${time}`);
        if (!frameRes.ok) throw new Error(`Frame error: ${frameRes.status}`);

        // Convert binary PNG data into a blob then to image URL
        const blob = await frameRes.blob();
        img.src = URL.createObjectURL(blob);

    } catch (err) {
            console.error(err)

    }


    // -- Read Transcript from OCR --
    try{
        const res = await fetch(`/video/${safeVid}/frame/${time}/transcript`);
        if (!res.ok) {
            throw new Error(`Transcript error: ${res.status}`)
        }

        const data = await res.json();
        const text = data.text || "No text detected";

        document.getElementById("transcriptText").textContent = text;
    } catch (err){
        console.error(err)
         document.getElementById("transcriptText").textContent = "Failed to read transcript.";
    }
}


// Reset function not in use - uncomment to use
/* function resetTranscript(){
    const element = document.getElementById("transcriptText");
    if (element) element.textContent = "";
} */

// Copy transcript text to Clipboard
// Reference: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp
// Used for understanding how copy to clipboard works
function copyText() {
    const text = document.getElementById('transcriptText').value;
    navigator.clipboard.writeText(text)
        .then(() => {
            alert("Copied text:\n\n" + text);
        })
        .catch(err => {
            console.error("Error copying text: ", err);
        });

    alert("Here is the copied text: " + text);
}