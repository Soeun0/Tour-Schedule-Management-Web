const daysTag = document.querySelector(".days"),
    yearDate = document.querySelector(".year-date"),
    monthDate = document.querySelector(".month-date"),
    lastYearButton = document.querySelector(".last_year"),
    nextYearButton = document.querySelector(".next_year"),
    lastMonthButton = document.querySelector(".last_month"),
    nextMonthButton = document.querySelector(".next_month");

let date = new Date(),
    currYear = date.getFullYear(),
    currMonth = date.getMonth();

const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
const dayDescriptions = {
    '2024-11-01': '설명 1', 
    '2024-11-05': '설명 2',
    // 나머지 날짜들에 대해 설명을 추가s
};


const weeksContainer = document.querySelector(".weeks");
weekdays.forEach(day => {
    const li = document.createElement("li");
    li.textContent = day;
    weeksContainer.appendChild(li);
});
const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
        lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
        lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
        lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class="inactive" data-date="${lastDateofLastMonth - i + 1}">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
        let isToday = i === date.getDate() && currMonth === new Date().getMonth()
            && currYear === new Date().getFullYear() ? "today" : "";

        const dateKey = `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
        const description = dayDescriptions[dateKey] || "설명 없음";

        liTag += `
        <li class="${isToday}" data-date="${i}" data-description="${description}">
            ${i}
            <div class="date-description">${description}</div>
        </li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class="inactive" data-date="${i - lastDayofMonth + 1}">${i - lastDayofMonth + 1}</li>`;
    }

    yearDate.innerText = `${currYear}`;
    monthDate.innerText = `${months[currMonth]}`;

    daysTag.innerHTML = liTag;

    const dayItems = daysTag.querySelectorAll("li");
    let isMouseDown = false;
    let dragStartDate = null;
    let dragEndDate = null;

    const clearSelection = () => {
        dayItems.forEach(day => day.classList.remove("selected", "selected-range"));
    };

    dayItems.forEach(day => {
        day.addEventListener("mousedown", (e) => {
            if (e.target.classList.contains("inactive")) return;
            isMouseDown = true;
            clearSelection();
            e.target.classList.add("selected");
            dragStartDate = parseInt(e.target.getAttribute("data-date"));
            dragEndDate = dragStartDate;
        });

        day.addEventListener("mousemove", (e) => {
            if (isMouseDown) {
                const hoveredDay = e.target;
                if (!hoveredDay.classList.contains("inactive")) {
                    dragEndDate = parseInt(hoveredDay.getAttribute("data-date"));
                    clearSelection();

                    const rangeStart = Math.min(dragStartDate, dragEndDate);
                    const rangeEnd = Math.max(dragStartDate, dragEndDate);

                    dayItems.forEach(day => {
                        const dayNum = parseInt(day.getAttribute("data-date"));
                        if (dayNum >= rangeStart && dayNum <= rangeEnd && !day.classList.contains("inactive")) {
                            day.classList.add("selected-range");
                        }
                    });
                }
            }
        });

        day.addEventListener("mouseup", () => {
            if (isMouseDown) {
                isMouseDown = false;
                const rangeStart = Math.min(dragStartDate, dragEndDate);
                const rangeEnd = Math.max(dragStartDate, dragEndDate);
                const selectedDates = [];

                for (let i = rangeStart; i <= rangeEnd; i++) {
                    const dateKey = `${currYear}-${(currMonth + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`;
                    const description = dayDescriptions[dateKey] || "설명 없음";
                    selectedDates.push(`${dateKey} (${description})`);
                }

                console.log(selectedDates.join(", "));
            }
        });
    });

    document.addEventListener("mouseup", () => {
        isMouseDown = false;
    });
};


renderCalendar();

lastYearButton.addEventListener("click", () => {
    currYear -= 1;
    date = new Date(currYear, currMonth, date.getDate());
    renderCalendar();
});

nextYearButton.addEventListener("click", () => {
    currYear += 1;
    date = new Date(currYear, currMonth, date.getDate());
    renderCalendar();
});

lastMonthButton.addEventListener("click", () => {
    currMonth -= 1;
    if (currMonth < 0) {
        currMonth = 11;
        currYear -= 1;
    }
    date = new Date(currYear, currMonth, date.getDate());
    renderCalendar();
});

nextMonthButton.addEventListener("click", () => {
    currMonth += 1;
    if (currMonth > 11) {
        currMonth = 0;
        currYear += 1;
    }
    date = new Date(currYear, currMonth, date.getDate());
    renderCalendar();
});
