import os
from fastapi import FastAPI, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Union
from pydantic import BaseModel
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from settings import settings
import openai
import re

# Put your URI end point:port here for your local inference server (in LM Studio)
openai.api_base = 'http://localhost:1234/v1'
# Put in an empty API Key
openai.api_key = ''

# Adjust the following based on the model type
# Alpaca style prompt format:
prefix = "### Instruction:\n"
suffix = "\n### Response:"

# 'Llama2 Chat' prompt format:
# prefix = "[INST]"
# suffix = "[/INST]"

# This is a simple wrapper function to allow you simplify your prompts


def get_completion(options):
    # formatted_prompt = f"{prefix}{options.prompt}{suffix}"
    formatted_system_prompt = f"{options.system_prompt}"
    formatted_user_prompt = f"{options.user_prompt}"
    messages = [
        {"role": "system", "content": formatted_system_prompt},
        {"role": "user", "content": formatted_user_prompt}
    ]
    print(f'\nYour prompt: {formatted_user_prompt}\n')
    response = openai.ChatCompletion.create(
        model="local model",
        messages=messages,
        temperature=options.temperature,
        max_tokens=options.max_tokens,
        stream=options.stream,
    )
    return response.choices[0].message["content"]


app = FastAPI()

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:5173"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]

async def shutdown_db_client():
    app.mongodb_client.close()


app.add_event_handler("startup", startup_db_client)
app.add_event_handler("shutdown", shutdown_db_client)


class PromptRequest(BaseModel):
    system_prompt: str
    user_prompt: str
    temperature: Union[int, float] = 0.0
    max_tokens: Union[int, float] = -1
    stream: bool = False

@app.post("/generate-code/{component_name}")
def generate_code(component_name: str, request_body: PromptRequest):
    if request_body is None:
        print("No env_id provided.")
        raise HTTPException(
            status_code=400,
            detail="No prompt provided",
        )
    
    print(request_body)
    response = get_completion(request_body)
    print(response)

    react_jsx_code = re.search('```jsx(.*?)```', response, flags=re.DOTALL)
    if react_jsx_code is not None:
        text_file = open(f"../frontend/src/components/{component_name}.jsx", "w")
        code_string = react_jsx_code.group(1)
        n = text_file.write(code_string)


        if n == len(code_string):
            print("Success! String written to jsx file.")
        else:
            print("Failure! String not written to jsx file.")

        # Close file
        text_file.close()

    return {"status": "success", "detail": str(response), "code": str(react_jsx_code.group(1) if react_jsx_code is not None else "")}


if __name__ == "__main__":
    uvicorn.run(
        "server:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
