import { users } from "./data/mockUsers.js";

const selectUsers = document.getElementById('users');
const btnRegistre = document.getElementById('btnRegistre');
const myForm = document.getElementById('myForm');

let data = {
    user_id: '',
    type: '',
    date: '',
    value: '',
    status: ''
};

// Cria o select com os usuários
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

// Captura as mudanças do formulário
myForm.addEventListener('input', ({ target }) => {
    const { name, value } = target;
    data = {
        ...data,
        [name]: value,
    };
});

// Função para formatar a data para o padrão necessário
const formatDate = (date) => {
    const parsedDate = new Date(date);
    return parsedDate.toUTCString(); // Retorna a data no formato adequado
};

// Função para cadastrar a venda
const registerSale = async () => {
    try {
        // Formatar os dados
        const formattedData = {
            ...data,
            date: formatDate(data.date), // Formata a data
            value: parseFloat(data.value), // Converte o valor para número
        };

        const req = await fetch('http://127.0.0.1:5000/sales', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formattedData),
        });

        if (!req.ok) throw new Error('Erro ao cadastrar venda');

        const res = await req.json();
        console.log("Venda cadastrada:", res);

        // Após cadastrar a venda, recarrega a tabela de vendas
        await createDataFrame();
    } catch (error) {
        console.error("Erro ao cadastrar a venda:", error);
    }
};

// Evento de envio do formulário (submit)
myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Chama a função de registrar a venda
    registerSale();
});
