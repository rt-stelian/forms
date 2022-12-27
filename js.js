"use strict";

const form = document.querySelector(".form");
const req = document.querySelectorAll("._required");
const formImage = document.querySelector("#formImage");
const formPreview = document.querySelector("#formPreview");


let error = 0;

form.addEventListener("submit", formSend);

function formSend(ev) {
	ev.preventDefault();
	error = formValidator(form);
	requiredAlerts();

	error = 0;
}

function formValidator(form) {
	req.forEach((input) => {
		removeError(input);

		if (input.classList.contains("_email")) {
			if (emailInputTest(input)) {
				addError(input);
				error++;
			}
		} else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
			addError(input);
			error++;
		} else if (input.value <= 3) {
			addError(input);
			error++;
		}
	});
	return error;
}

formImage.addEventListener("change", () => {
	uploadFile(formImage.files[0]);
});

function uploadFile(file) {
	const reader = new FileReader();

	reader.onload = function (e) {
		formPreview.innerHTML = `<img src="${e.target.result}" alt="photo"/>`;
	};
	reader.readAsDataURL(file);
}

function requiredAlerts() {
	if (error === 0) {
		console.log("no errors");
	} else if (error === 1) {
		req.forEach((el) => {
			const inputName = el.dataset.name;
			const requiredAlert = `${inputName} field is empty!`;


			if (el.classList.contains("error")) {
				alert(requiredAlert);
			}
		});
	} else if (error >= 2) {
		const check = "Check all required fields!";
		alert(check);
	}
}

function emailInputTest(input) {
	return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,8})+$/.test(input.value);
}
function addError(input) {
	input.classList.add("error");
	input.parentElement.classList.add("error");

	const inputName = input.dataset.name;
	const requiredAlert = `${inputName} is required!`
	const requiredText = document.createElement('div')
	requiredText.innerHTML = requiredAlert
	requiredText.classList.add('required-text')
	const requiredTextEl = input.parentElement.lastElementChild

	if (!requiredTextEl.classList.contains('required-text')) {
		input.parentElement.appendChild(requiredText)
	}
}

function removeError(input) {
	input.classList.remove("error");
	input.parentElement.classList.remove("error");
	const requiredTextEl = input.parentElement.lastElementChild
	if (requiredTextEl.classList.contains('required-text')) {
		requiredTextEl.remove()
	}
}

const txtArea = document.querySelector('#formMessage')
const txtLimit = txtArea.getAttribute('maxlength')
const txtCount = txtArea.nextElementSibling
txtCount.innerHTML = txtLimit
txtCount.style = 'display:none'

txtArea.addEventListener('focus', () => {
	txtCount.style = 'display:block'
})
txtArea.addEventListener('blur', () => {
	txtCount.style = 'display:none'
});


txtArea.addEventListener("keyup", txtLimitCount)
txtArea.addEventListener("keydown", (ev) => ev.repeat ? txtLimitCount() : 'return');

function txtLimitCount() {

	const countResults = txtLimit - txtArea.value.length;
	txtCount.innerHTML = countResults;
}