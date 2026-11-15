# LexRhin

Appli d'entraînement quotidien au français juridique pour préparer l'examen d'État de traductrice français/allemand (spécialité droit).

## Mettre l'appli en ligne (GitHub Pages, gratuit)

1. Sur github.com, crée un nouveau dépôt nommé `LexRhin` (Public, sans README).
2. Dans le dépôt : « Add file » → « Upload files ». Glisse **tout le contenu** du dossier (index.html, app.js, data.js, sw.js, manifest.webmanifest et le dossier icons). Valide avec « Commit changes ».
3. « Settings » → « Pages » → Source : « Deploy from a branch », branche `main`, dossier `/ (root)` → « Save ».
4. Après une à deux minutes, l'adresse s'affiche en haut de la page Pages, par exemple `https://meliejacquin-rgb.github.io/LexRhin/`.

## L'installer sur l'iPhone

1. Ouvre l'adresse dans **Safari**.
2. Bouton Partager → « Sur l'écran d'accueil » → « Ajouter ».
3. LexRhin s'ouvre ensuite comme une vraie appli, même hors connexion.

## Bon à savoir

- Les progrès sont enregistrés **sur le téléphone**. Dans Profil, « Exporter ma sauvegarde » de temps en temps.
- Si l'appli est supprimée de l'écran d'accueil, ses données le sont aussi : exporter avant.
- Mise à jour : remplacer les fichiers sur GitHub et changer `VERSION` en haut de `sw.js` (par ex. `lexrhin-v1.9`).
- Ajouter du contenu : `data.js` (vocabulaire, grammaire, sujets de textes). On peut ajouter des lignes à la fin de chaque liste sans perdre la progression.

## Synchronisation (facultatif, gratuit)

Pour que les progrès soient sauvegardés en ligne et retrouvés sur un autre appareil :

1. Sur console.firebase.google.com, ouvre un projet (celui de Plakardo convient) ou crée-en un.
2. Build > Authentication > Commencer > Sign-in method : active « Anonyme ».
3. Build > Firestore Database : crée la base si elle n'existe pas (région europe-west).
4. Firestore > Règles : AJOUTE ce bloc à côté des règles existantes (ne remplace pas celles de Plakardo) :

```
match /lexrhin/{code} {
  allow read, write: if request.auth != null && code.size() >= 16;
}
```

   Si le projet est neuf, les règles complètes sont :

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lexrhin/{code} {
      allow read, write: if request.auth != null && code.size() >= 16;
    }
  }
}
```

5. Paramètres du projet (roue dentée) > Général > Vos applications : copie apiKey et projectId (ajoute une appli Web </> s'il n'y en a pas).
6. Dans LexRhin > Profil > Synchronisation : colle les deux valeurs et appuie sur « Activer (premier appareil) ».
7. Sur un autre appareil : mêmes valeurs + le code affiché, puis « Récupérer mes données ».

Le code de synchronisation sert de clé : ne le partage pas.
