from fastapi import FastAPI
from todo import memo_router
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
import uvicorn

app = FastAPI()

origins = ["http://127.0.0.1:5500", "http://50.16.250.121"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/var/www/kwic/fasr_api-oss/statics", StaticFiles(directory="statics"), name="statics")


@app.get("/", response_class=HTMLResponse)
async def read_root():
    with open("/var/www/kwic/fasr_api-oss/statics/oss_project/index.html", encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), status_code=200)

@app.get("/memo", response_class=HTMLResponse)
async def read_memo_page():
    with open("/var/www/kwic/fasr_api-oss/statics/memo/index.html", encoding="utf-8") as f:
        return HTMLResponse(content=f.read(), status_code=200)

app.include_router(memo_router)

if __name__ == '__main__':
    uvicorn.run(app, host="0.0.0.0", port=8080, reload=True)

