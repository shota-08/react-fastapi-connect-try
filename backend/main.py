from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from langchain_community.chat_models import ChatOpenAI
from langchain.prompts import PromptTemplate
from dotenv import load_dotenv
load_dotenv()

# LLMモデルの設定
llm = ChatOpenAI(model="gpt-3.5-turbo", temperature=0)

class RequestData(BaseModel):
    text: str

class LLMResponse(BaseModel):
    text: str

def ask_question(text: str) -> str:
    template = """
    Question: {text}
    Answer:
    """
    prompt = PromptTemplate(template=template, input_variables=["text"])
    chain = prompt | llm
    answer = chain.invoke({"text": text})
    return answer.content

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/send")
async def run_llm(request_data: RequestData):
    answer = ask_question(request_data.text)
    return LLMResponse(text=answer)