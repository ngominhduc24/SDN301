const bodyParser = require('body-parser');
const express = require('express');
const RequestController = require('../controllers/request.controller'); 

const router = express.Router();
router.use(bodyParser.json());

router.post('/', RequestController.create);
router.get('/', RequestController.getAll);
router.get('/:id', RequestController.getById);
router.put('/:id', RequestController.updateInfo);
router.put('/:id/accept', RequestController.update);
router.put('/status/:id', RequestController.updateStatus);

module.exports = router;
