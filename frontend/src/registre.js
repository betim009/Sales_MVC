import { payments } from "./data/mockPayments.js";
import { users } from "./data/mockUsers.js";

const selectUsers = document.getElementById('users');
const btnRegistre = document.getElementById('btnRegistre');
const myForm = document.getElementById('myForm');

let data = {
    userId: '',
    type: '',
    date: '',
    value: '',
    status: ''
};


const createUsersSelect = () => {
    return users.forEach(element => {
        selectUsers.innerHTML += `
        <option value="${element.id}">${element.name}</option>
    `
    })
};

window.addEventListener('DOMContentLoaded', () => {
    createUsersSelect();
});

myForm.addEventListener('input', ({ target }) => {
    const { name, value } = target;
    data = {
        ...data,
        [name]: value,
    }
})

btnRegistre.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(data)
});
