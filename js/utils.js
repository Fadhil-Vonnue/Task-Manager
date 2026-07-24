const rules1 = {
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
export class FormValidator {
    constructor(form, rules) {
        this.form = form;
        this.rules = rules;
        this.flags = 0;
    }
    validateAll() {
        Object.keys(this.rules).forEach((key) => {
            this.validate(this.form[key], this.rules[key], key);
        });
        if (this.flags == 0) {
            document
                .querySelector(".createTaskModal")
                .classList.toggle("hideBox");
            alert("FORM SUBMIT SUCCESSFULL");
            return true;
        } else return false;
    }
    validate(value, rule, key) {
        let flag = 0;
        let msg = "";
        rule.rule.forEach((el) => {
            switch (el) {
                case "required": {
                    if (value.trim() == "") {
                        flag = 1;
                        this.flags++;
                        msg = "This field is required";
                        document
                            .querySelector(`[name="${key}"]`)
                            .classList.add("red-border");
                        const parent = document.querySelector(
                            `[name="${key}"]`
                        ).parentElement;
                        parent.querySelector(".required").textContent = msg;
                    }
                }
                case "minLength": {
                    if (value.length < rule.minLength) {
                        msg = "Field has minlength of 2";
                        flag = 1;
                        this.flags++;
                        document
                            .querySelector(`[name="${key}"]`)
                            .classList.add("red-border");
                        const parent = document.querySelector(
                            `[name="${key}"]`
                        ).parentElement;
                        parent.querySelector(".required").textContent = msg;
                    }
                }
                case "validDate": {
                    const currDate = new Date(rule.validDate).getTime();
                    const inpDate = new Date(value).getTime();
                    if (inpDate < currDate) {
                        flag = 1;
                        msg = "Due date cannot be in past";
                        this.flags++;
                        document
                            .querySelector(`[name="${key}"]`)
                            .classList.add("red-border");
                        const parent = document.querySelector(
                            `[name="${key}"]`
                        ).parentElement;
                        parent.querySelector(".required").textContent = msg;
                    }
                }
            }
        });
    }
    display() {
        console.log(this.form);
        console.log(this.rules);
    }
}
