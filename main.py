from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from dotenv import load_dotenv
from google import genai

load_dotenv()
client = genai.Client()

app = FastAPI(title="ComicCraft")


# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")


# HTML templates
templates = Jinja2Templates(directory="templates")


# Home page
@app.get("/", response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse(
        request,
        "index.html",
        {}
    )
class ComicRequest(BaseModel):
    story_prompt: str
    character: str
    setting: str
    tone: str
    art_style: str


@app.post("/generate")
async def generate_comic(data: ComicRequest):

    prompt = f"""
    Create a short comic story.

    Story idea: {data.story_prompt}
    Main character: {data.character}
    Setting: {data.setting}
    Tone: {data.tone}
    Art style: {data.art_style}

    Give the story in 5 comic panels.
    For each panel include:
    1. Scene description
    2. Character dialogue
    """

    response = client.interactions.create(
        model="gemini-3.7-flash",
        input=prompt
    )

    return {
        "success": True,
        "answer": response.output_text
    }