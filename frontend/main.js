import { payments } from "./src/data/mockPayments.js";
import { users } from "./src/data/mockUsers.js";

const btnSearch = document.getElementById('btn-search');
const query = document.getElementById('query');

let dataTable = payments.map(payment => {
    const userName = users.find(user => user.id === payment.userId);
    return { ...payment, name: userName.name };
});

const tbodyPayments = document.getElementById('tbody-payments');

const deleteSale = async (paymentId) => {
    try {
        const req = await fetch(`http://127.0.0.1:5000/sales/${paymentId}`, {
            method: 'DELETE',
        });
        if (!req.ok) throw new Error('Falha ao deletar venda');
        const res = await req.json();
        console.log("Venda deletada:", res);

        await createDataFrame();
    } catch (error) {
        console.error("Erro ao tentar deletar a venda:", error);
    }
};

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
                <td><button class="btn btn-danger" data-id="${payment.id}">X</button></td>
            </tr>
        `;
    });

    const deleteButtons = document.querySelectorAll('.btn-danger');
    deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const paymentId = button.getAttribute('data-id');
            deleteSale(paymentId);
        });
    });
}

const getAllSales = async () => {
    try {
        const req = await fetch('http://127.0.0.1:5000/sales');
        if (!req.ok) throw new Error('Failed to fetch sales data');
        const res = await req.json();
        return res;
    } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        return { sales: payments };
    }
};

const getAllUsers = async () => {
    try {
        const req = await fetch('http://127.0.0.1:5000/users');
        if (!req.ok) throw new Error('Failed to fetch users data');
        const res = await req.json();
        return res;
    } catch (error) {
        console.error("Erro ao buscar usuários:", error);
        return { users: users };
    }
};

const createDataFrame = async () => {
    const users = await getAllUsers();
    const sales = await getAllSales();

    dataTable = sales.map(payment => {
        const userName = users.find(user => user.id === payment.user_id);
        return { ...payment, name: userName.name };
    });

    createTableRows(dataTable);
};

window.addEventListener('DOMContentLoaded', async () => {
    await createDataFrame();
});

btnSearch.addEventListener('click', () => {
    const nameSearch = query.value;

    const filterSearch = dataTable.filter(user =>
        user.name.toLowerCase().includes(nameSearch.toLowerCase()));
    return createTableRows(filterSearch);
});
