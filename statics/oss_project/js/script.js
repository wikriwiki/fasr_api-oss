const windows = document.querySelectorAll(".window"); 
const imo = document.querySelector("#imo"); 
const images = document.querySelector(".images"); 
const description = document.querySelector("#description");
const intro = document.querySelector(".intro-text");
const visitButton = document.querySelector("#visit-button");

const descriptions = [
    "<p>저는 현재 광운대학교 정보융합학부 2학년에 재학중입니다. <br>인공지능과 주식에 관심이 많으며, 세상을 이롭게 하는 개발자가 되는 것이 목표입니다.</p>",
    "<p>저의 취미는 공포 라디오나 미스테리 사건, 음모론에 대한 영상을 보는 것입니다. <br>으스스한 이야기를 들으며 저만의 미지의 세계에 대한 상상을 하는 것을 즐깁니다.</p>",
    "<p>제가 추구하는 라이프 스타일은 평온하고 일상적인 삶입니다. <br>지금은 목표를 향해 달려가느라 바쁘게 살지만 그 속에서도 여유와 일상 속 즐거움을 챙길려고 노력하고 있습니다.<br> 언젠가는 조용한 곳에서 안분지족하며 살아가는게 작은 바람입니다.</p>"
];

const clickCounts = Array(3).fill(0);

imo.addEventListener("click", function() {
    imo.style.opacity = 0;
    imo.style.zIndex = -1;

    setTimeout(() => {
        intro.textContent = '각 카드에는 저를 소개하기 위한 내용이 들어있습니다. 카드를 뒤집어 내용을 확인해 주세요!';
        images.style.opacity = 1;
        images.style.zIndex = 3;
    }, 1000);
});

windows.forEach((win, index) => {
    win.addEventListener("click", function() {
        win.classList.toggle("flipped");
        clickCounts[index]++;
        
        windows.forEach((otherWin) => {
            if (otherWin !== win && otherWin.classList.contains("flipped")) {
                otherWin.classList.remove("flipped");
            }
        });

        if (win.classList.contains("flipped")) {
            description.innerHTML = descriptions[index];
        } else {
            description.textContent = '';
        }


        if (clickCounts.every(count => count > 0)) {
            visitButton.style.display = "block";
        }
    });
});


visitButton.addEventListener("click", function() {
    window.location.href = "http://127.0.0.1:8000/memo";
});
