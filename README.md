# PromoWatch API

`PromoWatch` est une API RESTful backend développée avec Node.js, Express.js et TypeScript, conçue pour gérer un système complet de promotions et d'utilisateurs.

Le projet est construit sur une architecture modulaire avec séparation des responsabilités, sécurise les endpoints à l'aide de JSON Web Tokens (JWT), utilise Prisma comme ORM pour la gestion de la base de données, et gère les permissions via des middlewares personnalisés.

---

## ✨ Fonctionnalités

- **Authentification complète :** Système d'inscription et de connexion sécurisé avec génération de tokens JWT
- **Gestion des utilisateurs :** CRUD complet avec système de rôles (user, admin)
- **Contrôle d'accès :** Middlewares pour la vérification de token, gestion des rôles et vérification de propriété des ressources
- **Architecture modulaire :** Organisation par modules (auth, users, sponsors, billing, data_analysis) avec pattern MVC
- **Base de données :** Gestion avec Prisma ORM et PostgreSQL
- **Type-safety :** Développement entièrement typé avec TypeScript
- **Sécurité :** Hachage des mots de passe avec bcrypt, validation des données, protection CORS

---

## 💻 Tech Stack

### Core

- [Node.js](https://nodejs.org/en/) - Runtime JavaScript
- [Express.js](https://expressjs.com/fr/) - Framework web
- [TypeScript](https://www.typescriptlang.org/) - Langage typé

### Base de données

- [Prisma](https://www.prisma.io/) - ORM moderne
- [mariadb](https://go.mariadb.com/high-availability-guide-MariaDB-whitepaper.html?utm_source=google&utm_medium=ppc&utm_campaign=enterprise&qgad=771163141187&qgterm=mariadb&utm_source=google&utm_medium=ppc&utm_campaign=22939587589_182246370697&utm_term=g_kwd-295966390790_e_mariadb&utm_content=771163141187&locationid=1006094&device=c_c&gad_source=1&gad_campaignid=22939587589&gbraid=0AAAAADyOKhPT57aNH_5_3L_Is9IdDML1t&gclid=CjwKCAiAu67KBhAkEiwAY0jAldjBDaA2CR7iv1rmXm80tr_UKXqHgpVIRGGPxS5xJ0O6427Dn0Sk5hoCQrgQAvD_BwE) - Base de données relationnelle

### Sécurité & Authentification

- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - Authentification JWT
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) - Hachage de mots de passe

### Utilitaires

- [dotenv](https://github.com/motdotla/dotenv) - Gestion des variables d'environnement

---

## 📁 Structure du Projet

```
src/
├── api/
│   ├── config/          # Configuration (Prisma, YouTube API)
│   ├── middlewares/     # Middlewares d'authentification et autorisation
│   ├── modules/         # Modules métier
│   │   ├── auth/        # Authentification (login, register)
│   │   ├── users/       # Gestion des utilisateurs
│   │   ├── billing/     # Facturation
│   │   ├── data_analysis/  # Analyse de données
│   │   └── sponsors/    # Gestion des sponsors
│   └── types/           # Types TypeScript globaux
├── prisma/
│   └── schema.prisma    # Schéma de base de données
├── app.ts               # Configuration Express
└── server.ts            # Point d'entrée
```

---

## 🚀 Démarrage Rapide

### Prérequis

- [Node.js](https://nodejs.org/en/) (v18+ recommandé)
- [npm](https://www.npmjs.com/) ou [pnpm](https://pnpm.io/)

### Installation

1. Clonez ce dépôt :

   ```bash
   git clone https://github.com/Conte-Alexandre/PromoWatch-API.git
   cd PromoWatch-API
   ```

2. Installez les dépendances :

   ```bash
   npm install
   ```

3. Créez un fichier `.env` à la racine du projet avec les variables suivantes :

   ```env
   # Port du serveur
   PORT=5000

   # URL de connexion à la base de données
   DATABASE_URL="postgresql://user:password@localhost:5432/promowatch?schema=public"

   # Secret pour signer les tokens JWT (chaîne aléatoire longue et sécurisée)
   JWT_SECRET=votre_super_secret_jwt_ici_tres_securise

   # Configuration YouTube API (optionnel)
   YOUTUBE_API_KEY=votre_cle_api_youtube
   ```

4. Initialisez la base de données avec Prisma :

   ```bash
   # Génère le client Prisma
   npx prisma generate

   # Applique les migrations
   npx prisma migrate dev

   # (Optionnel) Seed la base avec des données de test
   npx prisma db seed
   ```

### Lancement

Lancez le serveur en mode développement :

```bash
npm run dev
```

Le serveur sera accessible sur `http://localhost:5000` (ou le port défini dans `.env`).

Pour la production :

```bash
npm run build
npm start
```

---

## 🔐 Authentification

### Inscription

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe",
  "role": "USER"
}
```

### Connexion

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Réponse :**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "role": "USER"
  }
}
```

### Utilisation du token

Ajoutez le token dans le header `Authorization` :

```http
GET /api/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 📚 Documentation

La documentation technique complète de l'API, détaillant toutes les classes, fonctions et middlewares, est disponible en ligne : [Accéder à la documentation](https://votre-lien-documentation.com)

### Scripts disponibles

```bash
npm run dev          # Lance le serveur en mode développement
npm run build        # Compile TypeScript en JavaScript
npm start            # Lance le serveur en production
npm run prisma:studio # Ouvre l'interface Prisma Studio
npm run prisma:generate # Génère le client Prisma
```

---

## 🛡️ Middlewares de Sécurité

- **`authenticateToken`** : Vérifie la validité du JWT
- **`authorizeRole`** : Contrôle l'accès basé sur les rôles (ADMIN, USER)
- **`checkOwnership`** : Vérifie que l'utilisateur accède uniquement à ses propres ressources
