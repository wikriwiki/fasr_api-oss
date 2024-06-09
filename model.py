from pydantic import BaseModel

class Memo(BaseModel):
    id: int
    name: str
    message: str

class MemoCreate(BaseModel):
    name: str
    message: str