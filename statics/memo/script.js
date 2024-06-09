const host = "http://127.0.0.1:5501";

const memosContainer = document.querySelector('#messages');
const memoLis = document.querySelector('#message-list');


function getMemos() {
    axios.get(`${host}/memo`)
        .then(response=>{
            console.log(response.data);
            renderMemos(response.data.memos);
        })
        .catch(error=>{
            console.error('Error fetching memos:', error);
        });
} 

function renderMemos(memos) {
    memosContainer.innerHTML=''; // memosContainer 초기화
    memos.forEach(memo=>{

        const memoLis = document.createElement('p'); //p추가하고
        memoLis.textContent = memo.message;
        memosContainer.appendChild(memoLis);

        // 삭제버튼생성및이벤트처리
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent='x';

        // memoLis에삭제버튼추가
        memoLis.appendChild(deleteBtn);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    getMemos();
});


