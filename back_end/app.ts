import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Modèles
import User from './models/User';
import Vente from './models/Vente';

const app = express();
app.use(express.json());
app.use(cors());

// Connexion MongoDB
const MONGO_URI = 'mongodb+srv://tissotpierrelouis:h8ZJ8VWQSqr6egnD@cluster0.ayur1.mongodb.net/mydatabase';
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));

// Configuration Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API pour la gestion des utilisateurs et des ventes.',
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
 *     summary: Vérification de l'état du serveur
 *     description: Retourne un message indiquant que le backend est en cours d'exécution.
 *     responses:
 *       200:
 *         description: Message de succès.
 */
app.get('/', (req: Request, res: Response) => {
  res.send("\uD83D\uDE80 Backend en cours d'exécution. Accédez à /swagger-ui pour la documentation.");
});

/**
 * @openapi
 * /api/register:
 *   post:
 *     summary: Enregistrer un nouvel utilisateur
 *     description: Crée un nouvel utilisateur avec un mot de passe haché.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Utilisateur enregistré avec succès.
 *       400:
 *         description: L'utilisateur existe déjà.
 */
app.post('/api/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: 'Utilisateur déjà existant.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send({ message: 'Utilisateur enregistré avec succès.' });
  } catch (err) {
    res.status(500).send({ error: 'Erreur serveur.' });
  }
});

/**
 * @openapi
 * /api/login:
 *   post:
 *     summary: Connexion utilisateur
 *     description: Authentifie un utilisateur existant.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Connexion réussie.
 *       400:
 *         description: Email ou mot de passe incorrect.
 */
app.post('/api/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({ error: 'Email ou mot de passe incorrect.' });
    }
    res.status(200).send({ message: 'Connexion réussie.' });
  } catch (err) {
    res.status(500).send({ error: 'Erreur serveur.' });
  }
});

/**
 * @openapi
 * /api/vente:
 *   post:
 *     summary: Enregistrement d'une vente
 *     description: Crée une nouvelle vente dans la base de données.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vente'
 *     responses:
 *       201:
 *         description: Vente enregistrée avec succès.
 *       400:
 *         description: Données invalides.
 */
app.post('/api/vente', async (req: Request, res: Response) => {
  const { id, somme, idProduits } = req.body;

  try {
    if (!id || !somme || !idProduits || !Array.isArray(idProduits)) {
      return res.status(400).json({ error: 'Données invalides.' });
    }
    const vente = new Vente({ id, somme, idProduits });
    await vente.save();
    res.status(201).json({ message: 'Vente enregistrée avec succès.', vente });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

/**
 * @openapi
 * /api/ventes:
 *   get:
 *     summary: Récupérer toutes les ventes
 *     description: Renvoie toutes les ventes enregistrées dans la base de données.
 *     responses:
 *       200:
 *         description: Liste de toutes les ventes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Vente'
 *       500:
 *         description: Erreur serveur.
 */
app.get('/api/ventes', async (req: Request, res: Response) => {
  try {
    const ventes = await Vente.find();
    res.status(200).json(ventes);
  } catch (err) {
    console.error('Erreur lors de la récupération des ventes :', err);
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Suppression d'un utilisateur
 *     description: Supprime un utilisateur par son ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de l'utilisateur à supprimer.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Utilisateur supprimé avec succès.
 *       404:
 *         description: Utilisateur introuvable.
 */
app.delete('/api/users/:id', async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'Utilisateur introuvable.' });
    }
    res.status(200).json({ message: 'Utilisateur supprimé avec succès.', user: deletedUser });
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur.' });
  }
});

// Démarrage du serveur
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\uD83D\uDE80 Serveur démarré sur http://localhost:${PORT}/swagger-ui`);
});
