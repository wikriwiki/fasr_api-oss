from fastapi import APIRouter, Query, HTTPException
from model import Memo
memo_router = APIRouter()

memos = []
counter = 0

#쿼리로 입력된 메모 받기
@memo_router.post("/memo")
async def create_memo(name: str = Query(...), message: str = Query(...)):
    new_memo = Memo(id=len(memos) + 1, name=name, message=message)
    memos.append(new_memo)
    return new_memo

#메모 요청 처리
@memo_router.get("/memos")
async def retrieve_memo() -> dict:
    return {
        "memos" : memos
    }


#특정 메모 반환
@memo_router.get("/memos/{memo_id}")
async def get_single_memo(memo_id: int) ->dict:
    for memo in memos:
        if memo.id == memo_id:
            return {"memo" : memo}
    return {"msg" : "There is no task whith the ID."}


#메모 삭제
@memo_router.delete("/memos/{memo_id}")
async def delete_memo(memo_id: int) ->dict:
    for memo in memos:
        if memo.id == memo_id:
            memos.remove(memo)
            return {"msg": f"memo with ID {memo_id} deleted successfully"}
    return {"msg": "memo with supplied ID doesn't exist"}