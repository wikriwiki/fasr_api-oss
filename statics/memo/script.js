const host = "http://50.16.250.121:8000"; // FastAPI 서버 주소

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
        memoLi.innerHTML = `<p>${memo.name}: ${memo.message}</p> <p style = "font-size: 10px;">${memo.time})</p>`;
        

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
    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var day = ('0' + today.getDate()).slice(-2);
    var hours = ('0' + today.getHours()).slice(-2); 
    var minutes = ('0' + today.getMinutes()).slice(-2);
    const dateString = month  + '/' + day + ' '+ hours +':'+minutes;

    axios.post(`${host}/api/memos`, {
        name: name,
        message: message,
        time: dateString
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

