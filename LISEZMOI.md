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
- Mise à jour : remplacer les fichiers sur GitHub et changer `VERSION` en haut de `sw.js` (par ex. `lexrhin-v1.4`).
- Ajouter du contenu : `data.js` (vocabulaire, grammaire, sujets de textes). On peut ajouter des lignes à la fin de chaque liste sans perdre la progression.
