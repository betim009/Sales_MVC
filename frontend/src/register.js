import { users } from "./data/mockUsers.js";

const selectUsers = document.getElementById('users');
const myForm = document.getElementById('myForm');

let data = {
    user_id: '',
    type: '',
    date: '',
    value: '',
    status: ''
};

const createUsersSelect = () => {
    return users.forEach(element => {
        selectUsers.innerHTML += `
            <option value="${element.id}">${element.name}</option>
        `;
    });
};

window.addEventListener('DOMContentLoaded', () => {
    createUsersSelect();
});


myForm.addEventListener('input', ({ target }) => {
    const { name, value } = target;
    data = {
        ...data,
        [name]: value,
    };
});

const formatDate = (date) => {
    const parsedDate = new Date(date);  // Cria um objeto de data a partir da string
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');  // Adiciona zero à esquerda do mês
    const day = String(parsedDate.getDate()).padStart(2, '0');  // Adiciona zero à esquerda do dia
    return `${year}-${month}-${day}`;  // Retorna no formato 'yyyy-mm-dd'
};

const registerSale = async () => {
    try {
        const formattedData = {
            ...data,
            date: formatDate(data.date),  // Formata a data para 'yyyy-mm-dd'
            value: parseFloat(data.value),
        };

        const req = await fetch('http://127.0.0.1:5000/sales/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        if (!req.ok) throw new Error('Erro ao cadastrar venda');
        await createDataFrame(); // Recarregar os dados
    } catch (error) {
        console.error("Erro ao cadastrar a venda:", error);
    }
};


myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    registerSale();
});
