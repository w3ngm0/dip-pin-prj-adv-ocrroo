"""A basic introduction to Open CV

Instructions
------------

Implement the functions below based on their docstrings.

Notice some docstrings include references to third-party documentation
Some docstrings **require** you to add references to third-party documentation.

Make sure you read the docstrings C.A.R.E.F.U.L.Y (yes, I took the L to check that you are awake!)
"""

# imports - add all required imports here

import cv2
from pathlib import Path
import numpy as np
from PIL import Image
import pytesseract
pytesseract.pytesseract.tesseract_cmd=r'c:\Users\WANGMK.TDM\source\repos\Tesseract-OCR\tesseract.exe'

VID_PATH = Path("../resources/oop.mp4")
OUT_PATH = Path("../resources/")

class CodingVideo:
    capture: cv2.VideoCapture

    def __init__(self, video: Path | str):
        self.capture = cv2.VideoCapture(video)  # You complete me!
        if not self.capture.isOpened():
            raise ValueError(f"Cannot open {video}")

        self.fps = self.capture.get(cv2.CAP_PROP_FPS)
        self.frame_count = self.capture.get(cv2.CAP_PROP_FRAME_COUNT)
        self.duration = self.frame_count/self.fps  # duration = frame_count/fps


    def __str__(self) -> str:
        """Displays key metadata from the video

        Specifically, the following information is shown:
            FPS - Number of frames per second rounded to two decimal points
            FRAME COUNT - The total number of frames in the video
            DURATION (minutes) - Calculated total duration of the video given FPS and FRAME COUNT

        Reference
        ----------
        https://docs.opencv.org/3.4/d4/d15/group__videoio__flags__base.html#gaeb8dd9c89c10a5c63c139bf7c4f5704d
        """
        info_string = (f"Current video has the following prop: " +
                       f'{self.fps:.2f} fps' + "\n"
                       f'{self.frame_count:.2f} counts per frame' + '\n'
                       f'{self.duration / 60:.2f} minutes')

        return info_string

    def get_frame_number_at_time(self, seconds: int) -> int:
        """Given a time in seconds, returns the value of the nearest frame"""
        return int(seconds * self.fps)

    def get_frame_rgb_array(self, capture: cv2.VideoCapture, frame_number: int) -> np.ndarray:
        """Returns a numpy N-dimensional array (ndarray)

        The array represents the RGB values of each pixel in a given frame

        Note: cv2 defaults to BGR format, so this function converts the color space to RGB

        Reference
        ---------
        # TODO: Find a tutorial on OpenCV that demonstrates color space conversion

        """
        capture.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        ret, frame = capture.read()
        if not ret:
            raise ValueError(f"Invalid read {frame_number}")
        return cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)

    def get_image_as_bytes(self, seconds: int) -> bytes:
        self.capture.set(cv2.CAP_PROP_POS_FRAMES, self.get_frame_number_at_time(seconds))
        ok, frame = self.capture.read()
        if not ok or frame is None:
            raise ValueError("Invalid frame in target location")
        ok, buf = cv2.imencode(".png", frame)
        if not ok:
            raise ValueError("Failed to encode frame")
        return buf.tobytes()

    def save_as_image(self, seconds: int, output_path: Path | str = 'output.png') -> None:
        """Saves the given frame as a png image

        # Third party library - PIL, pillow for images
        # Reference for PIL: https://pypi.org/project/pillow/


        """
        if type(output_path) is str:
            output_path = OUT_PATH/output_path

        frame = self.get_frame_number_at_time(seconds)
        self.capture.set(cv2.CAP_PROP_POS_FRAMES, frame-1)
        ok, frame = self.capture.read()
        if not ok:
            raise ValueError("Unable to read frame from file")

        image = Image.fromarray(frame)
        image.save(output_path)

    def get_image_with_tesseract(self):
        img_cv = cv2.imread(r'../resources/output.png')

        if img_cv is None:
            raise FileNotFoundError("Could not read image: output.png. Check file path")

        img_rgb = cv2.cvtColor(img_cv, cv2.COLOR_RGB2BGR)
        print(pytesseract.image_to_string(img_rgb))


def test():
    """Try out your class here"""
    oop = CodingVideo(VID_PATH)
    print(oop)
    oop.save_as_image(42)
    oop.get_image_with_tesseract()


if __name__ == '__main__':
    test()
