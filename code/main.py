from fastapi import FastAPI
from todo import todo_router
import uvicorn

app = FastAPI()

@app.get("/") #데코레이터, 파라미터는 호스트 뒤에 붙는 주소
async def welcome() -> dict:
    return {
        "msg" : "hello world?? " #Json형식
    }

app.include_router(todo_router)

if __name__ == '__main__':
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)


