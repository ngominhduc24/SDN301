var userRouter = require('express').Router();
const UserController = require("../controllers/user.controller");
const verifyTokenHandle = require("../middlewares/verifyToken.middleware");
const { validateLogin } = require('../utils/common.validate');
const multer = require('multer');
const { storage } = require('../config/storage');
const upload = multer({ storage });

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return a token.
 *     tags:
 *       - Users
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
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: "user@example.com"
 *               password: "password123"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *               example:
 *                 token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/auth/login',  UserController.AuthenLogin);

/**
 * @swagger
 * /admin/users:
 *   post:
 *     summary: Add a new user
 *     description: Create a new user with the provided information.
 *     tags:
 *       - Users
 *     requestBody:
 *       description: User object that needs to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.post('/admin/users', verifyTokenHandle.verifyTokenAdmin, UserController.AddNewUser);


/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: List all users
 *     description: Retrieve a list of all users.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.get('/admin/users', verifyTokenHandle.verifyToken, UserController.ListAllUsers);

/**
 * @swagger
 * /admin/user/{id}:
 *   put:
 *     summary: Update a user by ID
 *     description: Update the details of an existing user by their ID.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     requestBody:
 *       description: User object that needs to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
userRouter.put('/admin/users/:id', upload.single('image'), UserController.updateUserById);

userRouter.get('/admin/users/:id', UserController.getUserById);

// MANAGER
userRouter.post('/manager/staff', verifyTokenHandle.verifyTokenManager, UserController.AddNewStaff);
userRouter.get('/manager/staff', verifyTokenHandle.verifyTokenManager, UserController.getListStaff);

userRouter.get('/manager/shop', verifyTokenHandle.verifyTokenManager, UserController.getListShopForManager);



module.exports = userRouter;
