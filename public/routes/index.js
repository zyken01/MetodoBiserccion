// index.js
const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs').promises;

// Externals Js
const utils = require('../js/utils');
const {infoCursos} = require('../api/cursos.js')
const { emisorProductos, generateMultiplicationTable } = require('../js/eventHandlers.js'); // Importa la función desde eventHandlers.js

// Importa el módulo utils.js
const publicDir = path.join(__dirname, 'public');
const templatesRoot = ('./public/web');
const templatesDirIndex = ('./public/web/index');

// Función para leer archivos HTML de manera asíncrona
const readHTMLFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        throw error;
    }
};

// Configura Express para usar middleware para procesar datos de formularios
router.use(express.urlencoded({ extended: true }));

// Ruta para servir la página principal
router.get('/', async (req, res) => {
    try {
        // Lee el contenido del header, title, contenido y footer desde los archivos HTML
        const [headerContent, titleContent, content,  footerContent] = await Promise.all([
            readHTMLFile(path.join(templatesRoot, 'header.html')),
            readHTMLFile(path.join(templatesDirIndex, 'title.html')),
            readHTMLFile(path.join(templatesDirIndex, 'content.html')),
            readHTMLFile(path.join(templatesRoot, 'footer.html'))
        ]);

        // Se reemplaza el contenido para agregar la tabla
        // const filledContent = content.replace('<div id="tblCreate"></div>', tableContent);
        // Envía la plantilla principal con el header, el título, el contenido y el footer incluidos
        const filledTemplate = `
                                ${headerContent}
                                ${titleContent}
                                ${content}
                                ${footerContent}
                              `;

        // Envía la plantilla HTML llena como respuesta
        res.send(filledTemplate);

    } catch (error) {
        console.error('Error al leer archivos HTML:', error);
        res.status(500).send('Error interno del servidor');
    }
});

//  Test Peticiones
router.get('/dataTable', async(req, res) => {
    console.log(req.body);
    const html = await readHTMLFile(path.join(templatesDirIndex, 'table.html'))
    res.send(html);
});


// Ruta para el json 
router.get('/api/cursos', (req, res) =>{
    res.send(infoCursos);
});

// Extraer del request
router.get('/api/cursos/:lenguaje', (req, res) =>{
    const lenguaje = req.params.lenguaje;
    const resultados =   infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje)

    if(resultados.length === 0){
        return res.status(404).send("No se encontraron datos");

    }

    res.send(JSON.stringify(resultados));
});

// Define una ruta POST para procesar los datos del formulario
router.post('/formulario', (req, res) => {
    const { nombre, correo } = req.body;
    res.send(`¡Hola ${nombre}! Tu correo electrónico (${correo}) ha sido registrado correctamente.`);
});

router.get('/formulario', (req, res) => {
    let message = ''; // Mensaje de respuesta inicial vacío

    // Si el formulario ya ha sido enviado y hay datos en req.body, procesa los datos
    if (req.body.nombre && req.body.correo) {
        const { nombre, correo } = req.body;
        message = `¡Hola ${nombre}! Tu correo electrónico (${correo}) ha sido registrado correctamente.`;
    }
    
    message = `¡Hola ! Tu correo electrónico () ha sido registrado correctamente.`;

    // Envía el mensaje de respuesta como JSON
    res.json({ message });
});


module.exports = router;
