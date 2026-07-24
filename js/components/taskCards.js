export function createCard(details) {
    let prio = details["taskPriority"].trim().toLowerCase();
    const card = document.createElement("div");
    card.classList.add("card", "task-card");
    let div = document.createElement("div");
    div.classList.add("task-top", "flex");
    let span = document.createElement("span");
    span.classList.add("task-title");
    span.textContent = details["task"];
    div.appendChild(span);
    let div1 = document.createElement("div");
    div1.classList.add("task-priority", "flexbox", prio);
    span = document.createElement("span");
    span.classList.add("task-priority-text");
    span.textContent = details["taskPriority"];
    div1.innerHTML = `<svg
                                width="6"
                                height="6"
                                viewBox="0 0 6 6"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 3C0 1.34315 1.34315 0 3 0C4.65685 0 6 1.34315 6 3C6 4.65685 4.65685 6 3 6C1.34315 6 0 4.65685 0 3Z"
                                    fill="#FF2056"
                                />
                            </svg>`;
    div1.appendChild(span);
    div.appendChild(div1);
    card.appendChild(div);
    div = document.createElement("div");
    div.classList.add("task-desc");
    div1 = document.createElement("div");
    div1.classList.add("detail", "flex");
    span = document.createElement("span");
    span.textContent = "ASSIGNED";
    div1.appendChild(span);
    span = document.createElement("span");
    span.classList.add("assign");
    span.textContent = details["taskAssignee"];
    div1.appendChild(span);
    div.appendChild(div1);

    div1 = document.createElement("div");
    div1.classList.add("detail", "flex");
    span = document.createElement("span");
    span.textContent = "DUE";
    div1.appendChild(span);
    span = document.createElement("span");
    span.classList.add("assign");
    span.textContent = details["taskDueDate"];
    div1.appendChild(span);
    div.appendChild(div1);

    div1 = document.createElement("div");
    div1.classList.add("detail", "flex");
    span = document.createElement("span");
    span.textContent = "STATUS";
    div1.appendChild(span);
    span = document.createElement("span");
    span.classList.add("assign", "task-status-text");
    span.textContent = "Pending";
    span.style.color = "#e17100";
    div1.appendChild(span);
    div.appendChild(div1);

    card.appendChild(div);

    div = document.createElement("div");
    div.classList.add("task-action", "flex");

    let button = document.createElement("button");
    button.classList.add("complete-button", "flexbox");
    button.innerHTML = `<svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clip-path="url(#clip0_2_936)">
                                    <path
                                        d="M6 11C8.76142 11 11 8.76142 11 6C11 3.23858 8.76142 1 6 1C3.23858 1 1 3.23858 1 6C1 8.76142 3.23858 11 6 11Z"
                                        stroke="#1A1A1A"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                    <path
                                        d="M4.5 6L5.5 7L7.5 5"
                                        stroke="#1A1A1A"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2_936">
                                        <rect
                                            width="12"
                                            height="12"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>`;
    span = document.createElement("span");
    span.textContent = "Complete";
    button.appendChild(span);
    let count = 0;
    button.addEventListener("click", (e) => {
        count++;
        document.querySelector(".task-status-text").textContent = "Completed";
        document.querySelector(".task-status-text").style.color = "#009966";
        if (count == 1) {
            const completed = document.querySelector(
                ".task-completed .dashboard-stat"
            );
            completed.textContent = Number(completed.textContent) + 1;
            const pending = document.querySelector(
                ".task-pending .dashboard-stat"
            );
            pending.textContent = Number(pending.textContent) - 1;
        }
        e.currentTarget.parentElement.parentElement.classList.add("completed");
    });
    div.appendChild(button);

    button = document.createElement("button");
    button.classList.add("delete-but", "flexbox");
    button.innerHTML = ` <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.5 3H10.5" stroke="#7A7060" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.5 3V10C9.5 10.5 9 11 8.5 11H3.5C3 11 2.5 10.5 2.5 10V3" stroke="#7A7060" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 3V2C4 1.5 4.5 1 5 1H7C7.5 1 8 1.5 8 2V3" stroke="#7A7060" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M5 5.5V8.5" stroke="#7A7060" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 5.5V8.5" stroke="#7A7060" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;
    button.addEventListener("click", (e) => {
        const status = e.currentTarget.parentElement.parentElement
            .querySelector(".task-status-text")
            .textContent.trim();

        const total = document.querySelector(".task-total .dashboard-stat");
        total.textContent = Number(total.textContent) - 1;
        const val3 = Number(
            document.querySelector(".no-of-tasks span").textContent
        );
        document.querySelector(".no-of-tasks span").textContent = val3 - 1;
        if (status == "Pending") {
            const pending = document.querySelector(
                ".task-pending .dashboard-stat"
            );
            pending.textContent = Number(pending.textContent) - 1;
        } else {
            const completed = document.querySelector(
                ".task-completed .dashboard-stat"
            );
            completed.textContent = Number(completed.textContent) - 1;
        }
        e.currentTarget.parentElement.parentElement.remove();
    });
    div.appendChild(button);
    card.appendChild(div);
    return card;
}
