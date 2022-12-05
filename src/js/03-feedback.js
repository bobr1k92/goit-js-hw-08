import { throttle, update } from "lodash";

const STORAGE_KEY = "feedback-form-state";          
const form = document.querySelector('.feedback-form');
const email = document.querySelector('input');
const message = document.querySelector('textarea');

form.addEventListener('input', throttle(updateLocalStorage, 500));
form.addEventListener('submit', handleSubmit);

let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
parseLocalStorage();

function updateLocalStorage(e) {
    const fieldName = e.target.name;
    formData[fieldName] = e.target.value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function parseLocalStorage() {
    const actualData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (actualData) {
        email.value = actualData.email || '';
        message.value = actualData.message || '';
    }
}

function handleSubmit(e) {
    e.preventDefault();
    const {email, message} = (e.currentTarget.elements);
    console.log({email: email.value, message: message.value});
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}