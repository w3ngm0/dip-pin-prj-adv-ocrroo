# Overview

Brief overview of the project, include:

- How do you deploy and run the project?
- What are its core dependencies?
- Who is it for and why?

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



