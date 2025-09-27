# Utiliser Node pour builder
FROM node:20-alpine

# Créer un dossier de travail
WORKDIR /app

# Copier package.json et installer les dépendances
COPY package*.json ./
RUN npm install

#install sass-embedded
RUN npm install -D sass-embedded

#install tailwind-css
RUN npm install tailwindcss @tailwindcss/postcss postcss

# Copier tout le code
COPY . .

# Exposer le port de Vite
EXPOSE 5173

# Lancer le serveur de dev
CMD ["npm", "run", "dev", "--", "--host"]
