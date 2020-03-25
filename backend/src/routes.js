const express = require('express');

// Importando meus controladores
const OngController = require('./controller/ongController');
const IncidentController = require('./controller/incidentController');
const ProfileController = require('./controller/profileController');
const SessionController = require('./controller/sessionController');


const routes = express.Router();

// Rotas
routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentController.index);
routes.post('/incidents', IncidentController.create);
routes.delete('/incidents/:id', IncidentController.delete)

module.exports = routes;