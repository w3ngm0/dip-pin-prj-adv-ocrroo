# Overview

Brief overview of the project, include:

- How do you deploy and run the project?
> 
- What are its core dependencies?
> 
- Who is it for and why?
> This project is for learning purposes. 

## Deploy and run the project
* Open terminal or command prompt 
* Navigate to the directory containing your Python file using `cd`:
```markdown
cd path/to/your/project
```
* Run the script using the python command:
```bash
python main.py
```
> Note: your python file might be under a different name and not `main.py`

### Running in an IDE or Code Editor
Most IDEs like PyCharm, VS Code etc. allow you to run Python projects directly:
* Open the project in your IDE.
* Locate the main script (e.g. `simple_api.py` under `preliminary` file)
* Click the **Run** button or use shortcut (e.g. `Shift + F10` for PyCharm)

### Create Virtual Environment 
In your CLI (command line interface), create a virtual environment for your project. 

Navigate to the directory containing your Python file using `cd`:
```markdown
cd path/to/your/project
```
Bash is the CLI used underneath: 
```bash
$ python.exe -m venv .venv
```
```bash
$ source .venv/Scripts/activate
```

### Install required dependencies
```bash
$ pip install -r requirements.txt
```

```bash
$ pip install fastapi uvicorn 
```

### Start FastAPI Server 

```bash
$ uvicorn main:app --host 127.0.0.1 --port 8000 --reload 
```

## Installing Tesseract OCR when using uv 
`uv` manages Python dependencies, Tesseract is a system-level application, so it must still be installed separately.

# Windows with uv 
1. Install Tesseract system-wide 
  `https://github.com/UB-Mannheim/tesseract/wiki`

2. Install pytesseract pillow opencv-python
```bash
    uv add pytesseract pilow opencv-python
```
3. Verify Tesseract installation 
```bash
    tesseract --verison 
```

### Core dependencies
#### pytesseract
> <https://pypi.org/project/pytesseract/> 
> Python-tesseract is an optical character recognition (OCR) tool for python. 
> It will recognize and "read" the text embedded in images.

#### pillow 
> <https://pypi.org/project/pillow/> 
> Python Imaging Library (PIL)

#### opencv-python 
> <https://pypi.org/project/opencv-python/#documentation-for-opencv-python> 
> OpenCV is an open-source computer vision and machine learning software library. 
> It is widely used for various image processing and computer vision tasks.


### Additional Dependencies 
For pytesseract additional dependencies such as `pygments` and `restructuredtext_lint`
can be included. 

#### pygments 
> <https://pygments.org/> 
> Generic syntax highlighter suitable for use in code applications to prettify source code.
> 

#### restructuredtext_lint
> <https://pypi.org/project/restructuredtext-lint/>

> linter 

## Who is it for and why?
This project is designed to help individuals with visual impairments.
Additionally, it serves as a valuable learning resource for students and developers
interested in exploring on using python's third party libraries and assistive tools.

It was designed using xxx-fastapi-demo project, for the starter layout. 

### References used to create this project 
GeeksforGeeks (2024). JavaScript Username Validation using Regex. [online] GeeksforGeeks. Available at: https://www.geeksforgeeks.org/javascript/username-validation-in-js-regex/ 

Jesús Velázquez (2020). Upload and preview a video using vanilla JavaScript. [online] DEV Community. Available at: https://dev.to/tepexic/upload-and-preview-a-video-using-vanilla-javascript-37k2 

Mozilla.org. (2025a). HTMLCanvasElement: toBlob() method - Web APIs | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob.Mozilla.org. (2025b). 

HTMLVideoElement: requestPictureInPicture() method - Web APIs | MDN. [online] Available at: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement/requestPictureInPicture 

www.w3schools.com. (n.d.). How To Copy to Clipboard. [online] Available at: https://www.w3schools.com/howto/howto_js_copy_clipboard.asp

xjavascript. (2025). JavaScript: How to Extract Video Frames Reliably Without Stuck Frames (Client-Side Guide). [online] Available at: https://www.xjavascript.com/blog/javascript-extract-video-frames-reli
