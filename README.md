1- Prérequis
Avant de commencer, assurez-vous d’avoir installé :

- Node.js
- Un gestionnaire de dépendances tel que npm ou yarn

2- Démarrage du projet
  1.1- Backend (Express.js)
- Ouvrez un terminal
- Naviguez vers le dossier testApi si ce n’est pas déjà fait 
- Lancez le serveur : "node index.js"
- Cela démarre votre serveur Express.js


  1.2- Frontend (React.js)
- Ouvrez un nouveau terminal
- Naviguez vers le dossier test-api-front situé à l’intérieur de testApi 
- Lancez le projet React "npm start"
- Cela démarre votre application frontend React.js

3- Connexion et fonctionnement
Accédez à l’application via le navigateur

- Connectez-vous avec les identifiants suivants :

	- Nom : admin
	
	- Email : admin@gmail.com
	
	- Mot de passe : admin123

- Une fois connecté, vous verrez une simulation de compte à rebours (à ignorer, elle est uniquement illustrative)
- Ouvrez la console du navigateur (F12 > onglet Console)
- Vous devriez voir un message indiquant que le token est vérifié toutes les 5 à 10 secondes.
- Lorsque l’accessToken expire, il est automatiquement rafraîchi et un message l’indique dans la console.

4- Les durées d’expiration de l’accessToken et du refreshToken sont modifiables dans le backend selon vos besoins.
