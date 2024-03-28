// eventHandlers.js
const EventEmitter = require('events');
const fs = require('fs');

// Nueva instancia
const emisorProductos = new EventEmitter();

emisorProductos.on('compra', () =>{
    console.log("Se realizo una compra");
});

// Define la función que maneja el evento click del botón
function handleButtonClick() {
    // Realiza alguna acción cuando se hace clic en el botón
    alert('¡El botón fue clickeado!');
}

// Define la función para generar la tabla de multiplicar
function generateMultiplicationTable(multiplicando) {
    // Lee el contenido de la plantilla de la tabla
    const tableTemplate = fs.readFileSync('./public/web/index/table.html', 'utf8');

    // Genera las filas de la tabla con los datos de la multiplicación
    let tableRows = '';
    for (let i = 1; i <= 10; i++) {
        const resultado = multiplicando * i;
        tableRows += `<tr><td>${multiplicando}</td><td>${i}</td><td>${resultado}</td></tr>`;
    }

    // Llena la plantilla con las filas generadas
    const filledTable = tableTemplate.replace('<!--{contenido_de_la_tabla}-->', tableRows);

    return filledTable;
}

// Define la función para generar una fila de la tabla de multiplicar
function generateMultiplicationRow(multiplicando, multiplicador) {
    const resultado = multiplicando * multiplicador;
    return `<tr><td>${multiplicando}</td><td>${multiplicador}</td><td>${resultado}</td></tr>`;
}

// Maneja el evento clic del botón para agregar una fila a la tabla
function handleAddRowButtonClick() {
    const multiplicando = 5; // Puedes cambiar esto según tus necesidades
    const multiplicador = document.getElementById('multiplicadorInput').value;
    const multiplicationRow = generateMultiplicationRow(multiplicando, multiplicador);
    const tableBody = document.getElementById('multiplicationTableBody');
    if (tableBody) {
        tableBody.innerHTML += multiplicationRow;
    } else {
        console.error('No se encontró el cuerpo de la tabla');
    }
}


module.exports = { emisorProductos, handleButtonClick, generateMultiplicationTable, generateMultiplicationRow, handleAddRowButtonClick };



