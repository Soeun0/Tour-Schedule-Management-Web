const title = document.getElementById('title');
const Otitle = document.getElementById('title-output');
title.addEventListener('input', function () {
    Otitle.textContent = title.value;
});

const country = document.getElementById('country');
const regionInput = document.getElementById('region');
const regionOutput = document.getElementById('region-output');

regionInput.addEventListener('input', function () {
    regionOutput.textContent = country.value+ " "+regionInput.value;
});

const departureDateInput = document.getElementById('departure-date');
const arrivalDateInput = document.getElementById('arrival-date');
const timetableDiv = document.getElementById('timetable');
const bestInput = document.getElementById('best-input');
const prevButton = document.getElementById('prev-day');
const nextButton = document.getElementById('next-day');

let timetableDates = [];
let currentIndex = 0;

function createTimetable() {
    const departureDate = new Date(departureDateInput.value);
    const arrivalDate = new Date(arrivalDateInput.value);
    timetableDiv.innerHTML = ''; // 기존 타임테이블 초기화
    timetableDates = []; // 날짜 배열 초기화
    currentIndex = 0; // 현재 인덱스 초기화

    if (departureDate && arrivalDate && arrivalDate >= departureDate) {
        let currentDate = new Date(departureDate);
        while (currentDate <= arrivalDate) {
            const dateString = currentDate.toISOString().split('T')[0]; // YYYY-MM-DD 형식
            timetableDates.push(dateString); // 날짜 배열에 추가
            currentDate.setDate(currentDate.getDate() + 1); // 다음 날로 이동
        }
        displayCurrentDate(); // 현재 날짜 표시
    }
}

function displayCurrentDate() {
    if (timetableDates.length > 0) {
        timetableDiv.innerHTML = `📅여행 날짜 : ${timetableDates[currentIndex]}`;
    } else {
        timetableDiv.innerHTML = '날짜가 없습니다. 출발 날짜와 도착 날짜를 설정하세요.';
    }
}

prevButton.addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCurrentDate();
    }
});

nextButton.addEventListener('click', function() {
    if (currentIndex < timetableDates.length - 1) {
        currentIndex++;
        displayCurrentDate();
    }
});

// 출발 날짜와 도착 날짜의 변경 이벤트 리스너 추가
departureDateInput.addEventListener('change', createTimetable);
arrivalDateInput.addEventListener('change', createTimetable);
