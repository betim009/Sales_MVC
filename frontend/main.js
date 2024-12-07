import { payments } from "./src/data/mockPayments.js";
import { users } from "./src/data/mockUsers.js";

const btnSearch = document.getElementById('btn-search');
const query = document.getElementById('query');

const dataTable = payments.map(payment => {
    const userName = users.find(user => user.id === payment.userId);
    return { ...payment, name: userName.name };
});

const tbodyPayments = document.getElementById('tbody-payments');

const createTableRows = (arr) => {
    tbodyPayments.innerHTML = '';
    arr.forEach(payment => {
        tbodyPayments.innerHTML += `
            <tr>
                <td>${payment.name}</td>
                <td>${payment.type}</td>
                <td>${payment.value}</td>
                <td>${payment.status}</td>
                <td>${payment.date}</td>
                <td><button class="btn btn-danger">X</button></td>
            </tr>
        `
    });
}

window.addEventListener('DOMContentLoaded', () => {
    createTableRows(dataTable);
});

btnSearch.addEventListener('click', () => {
    const nameSearch = query.value;

    const filterSearch = dataTable.filter(user =>
        user.name.toLowerCase().includes(nameSearch.toLowerCase()));
    return createTableRows(filterSearch);
});

