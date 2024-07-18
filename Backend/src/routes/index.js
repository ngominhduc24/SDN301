var router = require('express').Router();
const IndexController = require("../controllers/index.controller");
const { validateMail } = require('../utils/common.validate');

/**
 * @swagger
 * /:
 *   get:
 *     summary: Home route
 *     description: Render the homepage.
 *     responses:
 *       200:
 *         description: Successfully rendered
 */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Test route
 *     description: Test the GET method.
 *     responses:
 *       200:
 *         description: Successfully fetched
 */
router.get('/test', IndexController.test);

/**
 * @swagger
 * /test:
 *   post:
 *     summary: Test POST route
 *     description: Test the POST method with email validation.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email.
 *     responses:
 *       200:
 *         description: Successfully posted
 *       400:
 *         description: Invalid email
 */
router.post('/test', validateMail, IndexController.testPostMethod);

module.exports = router;
