from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

memo_router = APIRouter()

# 임시 데이터베이스로 사용할 리스트
memos = []

# Pydantic 모델
class Memo(BaseModel):
    id: int
    name: str
    message: str

class MemoCreate(BaseModel):
    name: str
    message: str

# POST 요청 처리
@memo_router.post("/api/memos", response_model=Memo)
async def create_memo(memo: MemoCreate):
    new_memo = Memo(id=len(memos) + 1, name=memo.name, message=memo.message)
    memos.append(new_memo)
    return new_memo

# GET 요청 처리 (모든 메모)
@memo_router.get("/api/memos", response_model=List[Memo])
async def get_memos():
    return memos

# GET 요청 처리 (특정 메모)
@memo_router.get("/api/memos/{memo_id}", response_model=Memo)
async def get_memo(memo_id: int):
    for memo in memos:
        if memo.id == memo_id:
            return memo
    raise HTTPException(status_code=404, detail="Memo not found")

# DELETE 요청 처리
@memo_router.delete("/api/memos/{memo_id}", response_model=Memo)
async def delete_memo(memo_id: int):
    for memo in memos:
        if memo.id == memo_id:
            memos.remove(memo)
            return memo
    raise HTTPException(status_code=404, detail="Memo not found")
