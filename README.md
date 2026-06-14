# PromoWatch API

API REST permettant de mettre en relation des créateurs de contenu et des marques. Le projet intègre la collecte et l'analyse de données issues de plateformes de streaming (YouTube) via une intelligence artificielle pour identifier les partenariats publicitaires.


## Fonctionnalités

- Authentification : Système d'inscription et de connexion sécurisé avec génération de tokens JWT (Access & Refresh tokens).
- Gestion des utilisateurs : CRUD complet avec système de rôles.
- Contrôle d'accès : Middlewares dédiés pour la vérification de token et la vérification de propriété des ressources.
- Base de données relationnelle : Modélisation et requêtage sécurisés avec Prisma ORM et MySQL / MariaDB.
- Sécurité : Hachage des mots de passe avec bcrypt.


## Technologies

- Backend : Node.js, Express.js, TypeScript
- Base de données : MySQL / MariaDB, Prisma ORM
- Sécurité & Utilitaires : jsonwebtoken, bcrypt, dotenv

## Installation et lancement

### Cloner le dépôt :
```bash
git clone https://github.com/Conte-Alexandre/PromoWatch-API.git
```
### Installez les dépendances :
```bash
npm install
```

### Créez un fichier .env à la racine :

```bash
DATABASE_URL= "mysql://user:password@localhost:3306/promowatch"
ACCESS_TOKEN_SECRET = 
REFRESH_TOKEN_SECRET =
```
### Initialisez la base de données :

```bash
npx prisma generate
```

### Lancement

```bash
npm run dev
```

## Documentation et Tests (Postman)
L'ensemble des routes de l'API est documenté et testable via une collection Postman fournie dans ce dépôt.

- Téléchargez le fichier : [Documentation Postman](https://drive.google.com/file/d/1wR7fxbqJctu20mrLaXACjOahwb1omhbo/view?usp=sharing)

- Ouvrez Postman et cliquez sur Import.
