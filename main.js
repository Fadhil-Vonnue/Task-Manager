import { createCard } from "./js/components/taskCards.js";
import { FormValidator } from "./js/utils.js";
const form = document.querySelector("form");
const rules = {
    task: { rule: ["required", "minLength"], minLength: 2, required: true },
    taskPriority: {
        rule: ["required"],
        required: true,
    },

    taskAssignee: {
        rule: ["required", "minLength"],
        minLength: 2,
        required: true,
    },

    taskDueDate: {
        rule: ["required", "validDate"],
        validDate: Date.now(),
        required: true,
    },
};
form.addEventListener("submit", (e) => {
    e.preventDefault();
    document.body.style.overflow = "visible";
    const sendForm = {};
    let currDate = new Date();
    currDate = currDate.toLocaleString().split(",")[0];
    rules["taskDueDate"].validDate = currDate;
    console.log(e.currentTarget, e.target);
    e.currentTarget.querySelectorAll(".inputField").forEach((el) => {
        console.log("1");
        let input = el.children[1];
        console.log(input);
        const name = input.name;
        const value = input.value;
        console.log(name, value);
        sendForm[name] = value;
    });
    const newForm = new FormValidator(sendForm, rules);
    const valid = newForm.validateAll();
    if (valid) {
        const newCard = createCard(sendForm);
        document.querySelector(".task-container").appendChild(newCard);
        const target = document.querySelector(".task-total .dashboard-stat");
        const target1 = document.querySelector(".task-pending .dashboard-stat");
        const val1 = Number(target.textContent.trim());
        const val2 = Number(target1.textContent.trim());
        target.textContent = val1 + 1;
        target1.textContent = val2 + 1;
        const val3 = Number(
            document.querySelector(".no-of-tasks span").textContent
        );
        document.querySelector(".no-of-tasks span").textContent = val3 + 1;
        document.querySelector("form").reset();
        document
            .querySelectorAll(".required")
            .forEach((el) => (el.textContent = ""));
    }
});
document.querySelector(".toggleDialog").addEventListener("click", () => {
    document.querySelector(".createTaskModal").classList.toggle("hideBox");
    document.body.style.overflow = "hidden";
});
document.querySelector(".close-but").addEventListener("click", (e) => {
    document.querySelector(".createTaskModal").classList.toggle("hideBox");
    document.querySelector("form").reset();
    document.querySelectorAll("form input").forEach((el) => {
        el.classList.remove("red-border");
    });
    document
        .querySelectorAll(".required")
        .forEach((el) => (el.textContent = ""));
    document.body.style.overflow = "visible";
});
