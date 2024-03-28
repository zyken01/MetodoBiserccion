const express = require('express');
const path = require('path');
const morgan = require('morgan');

// Rutas
const { findAvailablePort } = require('./js/free-port.js');
const indexRouter = require( path.join(__dirname, 'routes/index') );
const otherRouteRouter = require( path.join(__dirname, 'routes/otherRoute') );

// Settings
const desiredPort = process.env.PORT || 3000;

// Inicializar la aplicación Express
const app = express();

// Middleware
app.use(morgan('dev'));

// Servir archivos estáticos desde el directorio 'node_modules'
app.use('/node_modules', express.static(path.join(__dirname, '..','node_modules')));

// Rutas
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);
// app.use('/other-route', otherRouteRouter); // Otra ruta

// Iniciar el servidor
findAvailablePort(desiredPort).then(port => {
  app.listen(port, () => {
    console.log(`====> Servidor escuchando en el puerto http://localhost:${port}`);
  });
});
