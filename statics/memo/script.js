const host = "http://127.0.0.1:8000"; // FastAPI 서버 주소

const memosContainer = document.querySelector('#messages');
const memoList = document.querySelector('#message-list');

// 메모 목록 가져오기
function getMemos() {
    axios.get(`${host}/api/memos`)
        .then(response => {
            console.log(response.data);
            renderMemos(response.data);
        })
        .catch(error => {
            console.error('Error fetching memos:', error);
        });
}

// 메모 렌더링
function renderMemos(memos) {
    memoList.innerHTML = ''; // 초기화
    memos.forEach(memo => {
        const memoLi = document.createElement('li');
        memoLi.textContent = `${memo.name}: ${memo.message}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '삭제';
        deleteBtn.addEventListener('click', () => {
            deleteMemo(memo.id);
        });

        memoLi.appendChild(deleteBtn);
        memoList.appendChild(memoLi);
    });
}

// 메모 삭제
function deleteMemo(id) {
    axios.delete(`${host}/api/memos/${id}`)
        .then(() => {
            getMemos();
        })
        .catch(error => {
            console.error('Error deleting memo:', error);
        });
}

// 메모 생성
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;
    
    axios.post(`${host}/api/memos`, {
        name: name,
        message: message
    })
    .then(response => {
        getMemos();
        document.getElementById('form').reset();
    })
    .catch(error => {
        console.error('Error creating memo:', error);
    });
});

// 페이지 로드 시 메모 목록 가져오기
window.addEventListener('DOMContentLoaded', function () {
    getMemos();
});

