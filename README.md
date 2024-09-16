# Convert


![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)

Ce projet est une application web qui permet aux utilisateurs de convertir des devises entre différentes paires de monnaies. Il utilise une architecture front-end avec React et TypeScript, et un back-end basé sur Node.js et Express. L'application consomme une API de conversion de devises pour obtenir les taux de change en temps réel.

### Pré-requis

- node
- npm ou yarn

### Installation

Clonez le dépot du projet : 

1. Clonez le dépôt du projet :

   ```bash
   git clone https://github.com/NicoGallego/Lokki_test_technique.git
   cd Lokki_test_technique.git
   ```

2. Installez les dépendances côté **front-end** et **back-end** :

   ```bash
   # Pour le client React
   cd client
   npm install

   # Pour le serveur Node.js
   cd ../server
   npm install
   ```

3. Créez un fichier `.env` dans le répertoire **server** et configurez l'API de taux de change :

   ```bash
   API_KEY= fourni par email ;) 
   ```

## Démarrage

1. Lancez le serveur back-end :

   ```bash
   cd server
   npm run dev
   ```

2. Lancez l'application front-end :

   ```bash
   cd ../client
   npm start
   ```

## Technologies utilisées

### Front-end
- **React** - Librairie JavaScript pour construire des interfaces utilisateur.
- **TypeScript** - Super-ensemble de JavaScript qui ajoute du typage statique.
- **Styled-Components** - Pour le stylisme et la mise en forme de l'application.
- **Ant Design** - Pour les composants react prédéfinis

### Back-end
- **Node.js** - Environnement JavaScript côté serveur.
- **Express.js** - Framework minimaliste pour construire des API.
- **Axios** - Pour faire des requêtes HTTP à l'API de conversion de devises.
