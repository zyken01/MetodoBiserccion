const EventEmitter = require('events');

// Creamos una instancia de EventEmitter
const myEmitter = new EventEmitter();

// Registramos un manejador de eventos para el evento 'customEvent'
myEmitter.on('customEvent', (arg) => {
    console.log('Evento personalizado fue activado con argumento:', arg);
});

// Emitimos el evento 'customEvent' con un argumento
myEmitter.emit('customEvent', 'Este es un argumento');
