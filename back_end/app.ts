import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
//import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Modèles
import User from './models/User';
import Vente from './models/Vente';

const app = express();
app.use(express.json());
//app.use(cors());

// Connexion MongoDB
const MONGO_URI = 'mongodb+srv://tissotpierrelouis:h8ZJ8VWQSqr6egnD@cluster0.ayur1.mongodb.net/mydatabase';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connection to MongoDB successful!'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API for user and sales management.',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            email: { type: 'string', example: 'user@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        Vente: {
          type: 'object',
          properties: {
            id: { type: 'string', example: 'vente_1678901234567' },
            somme: { type: 'number', example: 150.75 },
            idProduits: {
              type: 'array',
              items: { type: 'string', example: 'product123' },
            },
          },
        },
      },
    },
  },
  apis: ['./app.ts'],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

/**
 * @openapi
 * /:
 *   get:
 *     summary: Checking server status
 *     description: Returns a message indicating that the backend is running.
 *     responses:
 *       200:
 *         description: Success message.
 */
app.get('/', (req: Request, res: Response) => {
  res.send("\uD83D\uDE80 Backend running. Go to /swagger-ui for documentation.");
});

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with a hashed password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User registered successfully.
 *       400:
 *         description: User already exists.
 */
app.post('/api/register', async (req: Request, res: Response): Promise<undefined> =>  {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).send({ error: 'Already existing user.' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).send({ error: 'Server error.' });
  }
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates an existing user.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Connection successful.
 *       400:
 *         description: Incorrect email or password.
 */
app.post('/api/login', async (req: Request, res: Response): Promise<undefined> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send({ error: 'Incorrect email or password.' });
      return;
    }
    res.status(200).send({ message: 'Connection successful.' });
  } catch (err) {
    res.status(500).send({ error: 'Server error.' });
  }
});

/**
 * @openapi
 * /api/vente:
 *   post:
 *     summary: Recording a sale
 *     description: Creates a new sale in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vente'
 *     responses:
 *       201:
 *         description: Sale successfully registered.
 *       400:
 *         description: Invalid data.
 */
app.post('/api/vente', async (req: Request, res: Response): Promise<undefined> => {
  const { id, somme, idProduits } = req.body;

  try {
    if (!id || !somme || !idProduits || !Array.isArray(idProduits)) {
      res.status(400).json({ error: 'Invalid data.' });
      return;
    }
    const vente = new Vente({ id, somme, idProduits });
    await vente.save();
    res.status(201).json({ message: 'Sale successfully registered.', vente });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

/**
 * @openapi
 * /api/ventes:
 *   get:
 *     summary: Collect all sales
 *     description: Returns all sales recorded in the database.
 *     responses:
 *       200:
 *         description: List of all sales.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vente'
 *       500:
 *         description: Server error.
 */
app.get('/api/ventes', async (req: Request, res: Response): Promise<undefined> => {
  try {
    const ventes = await Vente.find();
    res.status(200).json(ventes);
  } catch (err) {
    console.error('Error retrieving sales:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Deleting a user
 *     description: Deletes a user by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User successfully deleted.
 *       404:
 *         description:User not found.
 */
app.delete('/api/users/:id', async (req: Request, res: Response): Promise<undefined> => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ error: 'User not found.' });
      return;
    }
    res.status(200).json({ message: 'User successfully deleted.', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: 'Server error.' });
  }
});

// Server start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\uD83D\uDE80 Server started on http://localhost:${PORT}/swagger-ui`);
});
