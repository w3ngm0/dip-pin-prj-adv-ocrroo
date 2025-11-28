import io
from pathlib import Path

from fastapi import FastAPI, Request, HTTPException, UploadFile, File
from fastapi.responses import HTMLResponse, JSONResponse, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from preliminary.library_basics import CodingVideo

from PIL import Image
import io
import pytesseract


app = FastAPI(title="FastAPI & Jinja2")
videos = {}

BASE_PATH = Path(__file__).parent
print(BASE_PATH)

app.mount("/static",
          StaticFiles(directory="static"),
          name="static")
app.mount("/css",
          StaticFiles(directory="static/css"),
          name="css")
app.mount("/js",
          StaticFiles(directory="static/js"),
          name="js")
app.mount("/images",
          StaticFiles(directory="static/img"),
          name="images")

TEMPLATES = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return TEMPLATES.TemplateResponse(
        request=request,
        name="pages/home.html"
    )

def open_vid_or_404(vid: str) -> CodingVideo:
    if vid not in videos:
        try:
            videos[vid] = CodingVideo(f"resources/{vid}")
        except Exception as e:
            raise HTTPException(status_code=404, detail=str(e))
    return videos[vid]

@app.post("/upload_video")
async def upload_video(file: UploadFile = File(...)):
    """
    Upload a video file, save it to disk.

    Parameters
    ---------
    file: UploadFile
        the video file uploaded by the client.

    Returns
    --------
    dict
        A JSON object containing the filename.

    Raises
    -------
    400 Bad Request
        If the uploaded file is not a supported video format.
    """
    filename = file.filename.replace(" ", "_") # remove spaces
    filename = filename.replace("(", "_").replace(")", "_") # remove parentheses
    filename = filename.lower()

    if not filename.endswith((".mp4", ".mov", ".avi")):
        return JSONResponse({"error": "Not a video file"}, status_code=400)

    save_path = BASE_PATH / "resources" / filename
    with open(save_path, "wb") as f:
        f.write(await file.read())

    videos[filename] = CodingVideo(save_path)
    return {"filename": filename}


@app.get("/video/{vid}/frame/{t}", response_class=Response)
async def video_frame(vid: str, t: float):
    """
    Return the raw PNG image bytes for the video frame at a given timestamp.

    Parameters
    ------------
    vid: str
        The video identifier (filename)

    t: float
        The timestamp from which to extract the frame converted to int before lookup.
    """
    video = open_vid_or_404(vid)
    data = video.get_image_as_bytes(int(t))
    return Response(content=data, media_type="image/png")


@app.get("/video/{vid}/frame/{t}/transcript")
async def video_frame_transcript(vid: str, t: float):
    """
    Perform OCR on specific video frame and return detected text.

    Parameters
    -------------
    vid: str
        The identifier for the video from which to extract text.
    t: float
        Timestamp of the frame to analyze for OCR
    """
    video = open_vid_or_404(vid)

    frame_bytes = video.get_image_as_bytes(int(t)) #using existing api from VideoPlayer class
    image = Image.open(io.BytesIO(frame_bytes))

    text = pytesseract.image_to_string(image)

    return {"text": text}