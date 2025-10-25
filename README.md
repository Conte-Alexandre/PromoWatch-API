# PromoWatch API

`PromoWatch` est une API RESTful backend développée avec Node.js et Express.js, conçue pour

Le projet est construit sur une architecture MVC, sécurise les endpoints à l'aide de JSON Web Tokens (JWT) et gère les permissions via des middlewares personnalisés.

---

## ✨ Fonctionnalités

- **Authentification :** Système de connexion sécurisé avec génération de tokens JWT.
- **Contrôle d'accès :** Middlewares pour la vérification de token et la gestion des rôles (ex: admin).
- **Architecture Propre :** Séparation des responsabilités (MVC) avec des dossiers pour les `routes`, `controllers`, `models`, et `middlewares`.
- **Documentation :** Documentation technique complète générée via JSDoc.

---

## 💻 Tech Stack

- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/fr/)
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (Pour l'authentification JWT)
- [bcrypt](https://github.com/kelektiv/node.bcrypt.js) (Pour le hachage de mot de passe)
- [JSDoc](https://jsdoc.app/) (Pour la génération de documentation)

---

## 🚀 Démarrage Rapide (Getting Started)

Suivez ces étapes pour mettre en place et lancer le projet en local.

### Prérequis

- [Node.js](https://nodejs.org/en/) (v18+ recommandé)
- [npm](https://www.npmjs.com/)

### Installation

1.  Clonez ce dépôt :

    ```bash
    git clone https://github.com/Conte-Alexandre/PromoWatch-API.git
    ```

2.  Naviguez dans le dossier `backend` et installez les dépendances :

    ```bash
    cd src
    npm install
    ```

3.  Créez un fichier `.env` à la racine du dossier `src` et ajoutez vos variables d'environnement, notamment votre secret JWT :

    ```env
    # Le port sur lequel le serveur écoutera
    PORT=5000

    # Une chaîne secrète longue et aléatoire pour signer les tokens
    JWT_SECRET=votre_super_secret_jwt_ici_tres_securise
    ```

### Lancement

Une fois les dépendances installées, vous pouvez lancer le serveur :

```bash
# Depuis le dossier /backend
npm run start
```

Le serveur devrait maintenant être en écoute sur http://localhost:5000 (ou le port spécifié dans votre .env).

## 📚 Documentation

La documentation technique complète de l'API, détaillant toutes les classes, fonctions et middlewares, est disponible en ligne : [Accéder à la documentation en ligne](google.com)

## 📈 Évolutions Futures (Roadmap)
