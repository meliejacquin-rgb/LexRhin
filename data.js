/* LexRhin — contenu pédagogique
   VOCAB : [allemand, français, remarque, thème]
   Les identifiants sont calculés à partir du terme allemand : on peut ajouter des
   mots à la fin sans perdre la progression. */

const THEMES = {
  succ: 'Successions',
  obl: 'Contrats et obligations',
  bien: 'Biens et sûretés',
  proc: 'Procédure',
  fam: 'Famille et protection',
  soc: 'Sociétés',
  acte: 'Actes et administration',
  style: 'Style juridique',
  faux: 'Faux amis'
};

const VOCAB = [
  // Successions
  ['der Erblasser', 'le défunt (le de cujus)', '', 'succ'],
  ['der Erbe', "l'héritier", '', 'succ'],
  ['der Nachlass', 'la succession (le patrimoine successoral)', '', 'succ'],
  ['der Erbschein', "le certificat d'héritier", "Équivalent fonctionnel en France : l'acte de notoriété dressé par le notaire.", 'succ'],
  ['das eigenhändige Testament', 'le testament olographe', '', 'succ'],
  ['das notarielle Testament', 'le testament authentique', '', 'succ'],
  ['das gemeinschaftliche Testament', 'le testament conjonctif', 'Prohibé en droit français (art. 968 C. civ.).', 'succ'],
  ['der Erbvertrag', 'le pacte successoral', 'En principe prohibé en France, sauf exceptions légales.', 'succ'],
  ['der Pflichtteil', 'la réserve héréditaire', "Équivalent fonctionnel, pas identique : en droit allemand, c'est une créance en argent contre les héritiers.", 'succ'],
  ['der Pflichtteilsberechtigte', "l'héritier réservataire", '', 'succ'],
  ['das Vermächtnis', 'le legs', '', 'succ'],
  ['der Vermächtnisnehmer', 'le légataire à titre particulier', '', 'succ'],
  ['der Alleinerbe', "l'héritier unique", "Institué par testament, on parlera souvent de légataire universel.", 'succ'],
  ['die Ausschlagung der Erbschaft', 'la renonciation à la succession', '', 'succ'],
  ['die Annahme der Erbschaft', "l'acceptation de la succession", '', 'succ'],
  ['die Erbengemeinschaft', "l'indivision successorale", '', 'succ'],
  ['die Erbauseinandersetzung', 'le partage successoral', '', 'succ'],
  ['der Testamentsvollstrecker', "l'exécuteur testamentaire", '', 'succ'],
  ['das Nachlassgericht', 'le tribunal des successions', "Pas d'équivalent exact : en France, ce rôle est largement assuré par le notaire.", 'succ'],
  ['der Nachlasspfleger', 'le curateur à la succession', 'Approximation : selon le cas, mandataire successoral ou curatelle de succession vacante.', 'succ'],
  ['die gesetzliche Erbfolge', 'la dévolution légale', '', 'succ'],
  ['der Erbteil', 'la part successorale', '', 'succ'],
  ['die Testierfähigkeit', 'la capacité de tester', '', 'succ'],
  ['das Nachlassverzeichnis', "l'inventaire de la succession", '', 'succ'],
  ['der überlebende Ehegatte', 'le conjoint survivant', '', 'succ'],
  ['die Erbunwürdigkeit', "l'indignité successorale", '', 'succ'],
  ['die Erbschaftsteuer', 'les droits de succession', '', 'succ'],
  ['das Europäische Nachlasszeugnis', 'le certificat successoral européen', 'Règlement (UE) n° 650/2012.', 'succ'],
  ['der letzte gewöhnliche Aufenthalt', 'la dernière résidence habituelle', 'Critère de rattachement du règlement successions européen.', 'succ'],
  ['die Schenkung', 'la donation', '', 'succ'],

  // Contrats et obligations
  ['der Vertragsschluss', 'la conclusion du contrat', '', 'obl'],
  ['das Angebot', "l'offre", '', 'obl'],
  ['die Willenserklärung', 'la déclaration de volonté', 'Notion propre au droit allemand ; on garde souvent le terme tel quel.', 'obl'],
  ['die Anfechtung', "l'annulation pour vice du consentement", '', 'obl'],
  ['der Rücktritt', 'la résolution du contrat', '', 'obl'],
  ['die Kündigung', 'la résiliation', '', 'obl'],
  ['der Schadensersatz', 'les dommages et intérêts', '', 'obl'],
  ['die Verjährung', 'la prescription', '', 'obl'],
  ['die Frist', 'le délai', '', 'obl'],
  ['die Haftung', 'la responsabilité', '', 'obl'],
  ['der Gläubiger', 'le créancier', '', 'obl'],
  ['der Schuldner', 'le débiteur', '', 'obl'],
  ['die Bürgschaft', 'le cautionnement', '', 'obl'],
  ['der Bürge', 'la caution (la personne)', '', 'obl'],
  ['die Gewährleistung', 'la garantie légale des vices', '', 'obl'],
  ['der Kaufvertrag', 'le contrat de vente', '', 'obl'],
  ['der Mietvertrag', 'le contrat de bail', '', 'obl'],
  ['der Vermieter', 'le bailleur', '', 'obl'],
  ['der Mieter', 'le locataire (le preneur)', '', 'obl'],
  ['der Verzug', 'la demeure (retard fautif)', '', 'obl'],
  ['die Mahnung', 'la mise en demeure', '', 'obl'],
  ['die Vertragsstrafe', 'la clause pénale', '', 'obl'],
  ['die Allgemeinen Geschäftsbedingungen', 'les conditions générales', '', 'obl'],
  ['die Vollmacht', 'la procuration', '', 'obl'],
  ['der Bevollmächtigte', 'le mandataire', '', 'obl'],
  ['die Geschäftsfähigkeit', "la capacité d'exercice", '', 'obl'],
  ['die Rechtsfähigkeit', 'la capacité de jouissance', '', 'obl'],
  ['der Anspruch', 'la prétention (le droit d’exiger)', '', 'obl'],
  ['die Anspruchsgrundlage', 'le fondement juridique de la prétention', '', 'obl'],
  ['die Einrede', "l'exception (moyen de défense)", '', 'obl'],
  ['die ungerechtfertigte Bereicherung', "l'enrichissement injustifié", '', 'obl'],
  ['die unerlaubte Handlung', 'le délit civil', 'Responsabilité extracontractuelle.', 'obl'],

  // Biens et sûretés
  ['das Eigentum', 'la propriété', '', 'bien'],
  ['der Besitz', 'la possession', '', 'bien'],
  ['das Grundbuch', 'le livre foncier', "Terme utilisé aussi en Alsace-Moselle ; ailleurs en France : la publicité foncière.", 'bien'],
  ['die Grundschuld', 'la dette foncière', 'Sûreté proche de l’hypothèque, mais détachée de la créance.', 'bien'],
  ['die Hypothek', "l'hypothèque", '', 'bien'],
  ['der Nießbrauch', "l'usufruit", '', 'bien'],
  ['das Wohnungseigentum', 'la copropriété (lot de copropriété)', '', 'bien'],
  ['der Eigentumsvorbehalt', 'la clause de réserve de propriété', '', 'bien'],
  ['das Vorkaufsrecht', 'le droit de préemption', '', 'bien'],
  ['das Grundstück', 'le bien immobilier (le terrain)', '', 'bien'],

  // Procédure
  ['die Klage', "l'action en justice", '', 'proc'],
  ['der Kläger', 'le demandeur', '', 'proc'],
  ['der Beklagte', 'le défendeur', '', 'proc'],
  ['das Urteil', 'le jugement', '', 'proc'],
  ['der Beschluss', "l'ordonnance (la décision)", '', 'proc'],
  ['die Berufung', "l'appel", '', 'proc'],
  ['die Revision', 'le pourvoi en cassation', '', 'proc'],
  ['das Amtsgericht', 'le tribunal cantonal', "Pas d'équivalent exact (≈ tribunal de proximité) : on ajoute souvent « Amtsgericht » entre parenthèses.", 'proc'],
  ['das Landgericht', 'le tribunal régional', '≈ tribunal judiciaire.', 'proc'],
  ['das Oberlandesgericht', "la cour d'appel régionale", '', 'proc'],
  ['der Bundesgerichtshof', 'la Cour fédérale de justice', '', 'proc'],
  ['die Zwangsvollstreckung', "l'exécution forcée", '', 'proc'],
  ['der Gerichtsvollzieher', 'le commissaire de justice', 'Anciennement : huissier de justice.', 'proc'],
  ['die Zustellung', 'la signification', '', 'proc'],
  ['der Vergleich', 'la transaction', '', 'proc'],
  ['das Mahnverfahren', "la procédure d'injonction de payer", '', 'proc'],
  ['die einstweilige Verfügung', "l'ordonnance de référé", 'Équivalent fonctionnel.', 'proc'],
  ['die mündliche Verhandlung', "l'audience", '', 'proc'],
  ['der Zeuge', 'le témoin', '', 'proc'],
  ['der Sachverständige', "l'expert", '', 'proc'],
  ['die Prozesskostenhilfe', "l'aide juridictionnelle", '', 'proc'],
  ['der Schriftsatz', 'les conclusions (écrit de procédure)', '', 'proc'],
  ['das Aktenzeichen', 'le numéro de dossier (n° RG)', '', 'proc'],
  ['die Rechtskraft', 'la force de chose jugée', '', 'proc'],
  ['die Kosten des Rechtsstreits', 'les dépens', '', 'proc'],
  ['die Zuständigkeit', 'la compétence', '', 'proc'],
  ['der Rechtsstreit', 'le litige', '', 'proc'],

  // Famille et protection
  ['die Scheidung', 'le divorce', '', 'fam'],
  ['der Güterstand', 'le régime matrimonial', '', 'fam'],
  ['die Zugewinngemeinschaft', 'la participation aux acquêts', 'Régime légal allemand (≠ communauté réduite aux acquêts, régime légal français).', 'fam'],
  ['die Gütertrennung', 'la séparation de biens', '', 'fam'],
  ['der Ehevertrag', 'le contrat de mariage', '', 'fam'],
  ['der Unterhalt', "l'obligation alimentaire", '', 'fam'],
  ['das Sorgerecht', "l'autorité parentale", '', 'fam'],
  ['die Vormundschaft', 'la tutelle (des mineurs)', '', 'fam'],
  ['die Betreuung', 'la protection juridique des majeurs', '≈ curatelle ou tutelle selon l’étendue.', 'fam'],
  ['die Vorsorgevollmacht', 'le mandat de protection future', '', 'fam'],
  ['die Patientenverfügung', 'les directives anticipées', '', 'fam'],
  ['die eingetragene Lebenspartnerschaft', 'le partenariat enregistré', '≠ PACS, même si on les compare souvent.', 'fam'],
  ['die Abstammung', 'la filiation', '', 'fam'],

  // Sociétés
  ['die GmbH', 'la SARL', 'Équivalent fonctionnel le plus proche.', 'soc'],
  ['die Aktiengesellschaft', 'la société anonyme', '', 'soc'],
  ['der Geschäftsführer', 'le gérant', '', 'soc'],
  ['der Gesellschafter', "l'associé", '', 'soc'],
  ['das Stammkapital', 'le capital social', '', 'soc'],
  ['der Geschäftsanteil', 'la part sociale', '', 'soc'],
  ['das Handelsregister', 'le registre du commerce et des sociétés', '', 'soc'],
  ['das Insolvenzverfahren', 'la procédure collective', 'Redressement ou liquidation judiciaire.', 'soc'],
  ['die Abtretung', 'la cession', '', 'soc'],

  // Actes et administration
  ['die öffentliche Urkunde', "l'acte authentique", '', 'acte'],
  ['die Unterschriftsbeglaubigung', 'la légalisation de signature', '', 'acte'],
  ['die beglaubigte Abschrift', 'la copie certifiée conforme', '', 'acte'],
  ['die Ausfertigung', "l'expédition (d'un acte)", '', 'acte'],
  ['die Beurkundung', "l'établissement d'un acte authentique", '', 'acte'],
  ['die Vollstreckungsklausel', 'la formule exécutoire', '', 'acte'],
  ['der Antrag', 'la requête', '', 'acte'],
  ['die Behörde', "l'autorité administrative", '', 'acte'],
  ['der Bescheid', 'la décision administrative', '', 'acte'],
  ['der Widerspruch', 'le recours administratif préalable', '', 'acte'],
  ['das Grundgesetz', 'la Loi fondamentale', '', 'acte'],
  ['die Rechtsprechung', 'la jurisprudence', '', 'acte'],
  ['das Schrifttum', 'la doctrine', '', 'acte'],
  ['der Tatbestand', "les conditions d'application", "Dans un jugement : l'exposé des faits.", 'acte'],
  ['die Rechtsfolge', "l'effet juridique", '', 'acte'],
  ['die Auslegung', "l'interprétation", '', 'acte'],
  ['die Vorschrift', 'la disposition légale', '', 'acte'],
  ['der Absatz', "l'alinéa", '', 'acte'],

  // Style juridique
  ['gemäß', 'en vertu de / conformément à', '', 'style'],
  ['unbeschadet', 'sans préjudice de', '', 'style'],
  ['vorbehaltlich', 'sous réserve de', '', 'style'],
  ['unverzüglich', 'sans délai', 'Au sens du BGB : sans retard fautif.', 'style'],
  ['fristgerecht', 'dans les délais', '', 'style'],
  ['nach Maßgabe', 'selon les modalités de', '', 'style'],
  ['von Amts wegen', "d'office", '', 'style'],
  ['mit sofortiger Wirkung', 'avec effet immédiat', '', 'style'],
  ['rechtskräftig', 'passé en force de chose jugée', '', 'style'],
  ['hiermit', 'par la présente', '', 'style'],
  ['im Folgenden', 'ci-après', '', 'style'],
  ['die Klage abweisen', 'débouter le demandeur', '', 'style'],

  // Faux amis
  ['der Konkurs', 'la faillite', 'Faux ami : ≠ un concours.', 'faux'],
  ['die Mietkaution', 'le dépôt de garantie', 'Faux ami : la « caution » française = der Bürge.', 'faux'],
  ['die Akte', 'le dossier', "Faux ami : ≠ l'acte (= die Urkunde).", 'faux'],
  ['der Prozess', 'le procès', '≠ le processus.', 'faux'],
  ['die Rente', 'la pension de retraite', '≠ la rente (souvent : die Leibrente = la rente viagère).', 'faux'],
  ['die Instanz', 'le degré de juridiction', "« in erster Instanz » = en première instance ; mais die Instanz ≠ l'instance (= das Verfahren).", 'faux']
];

/* GRAMMAR : {t: thème, q: phrase (___ = trou), o: options, a: index de la bonne réponse, e: explication} */
const GRAMMAR = [
  // Subjonctif
  { t: 'Subjonctif', q: "Il est indispensable que le notaire ___ l'acte avant la fin du mois.", o: ['établit', 'établisse', 'établira', 'établirait'], a: 1, e: "« Il est indispensable que » exprime une nécessité : subjonctif." },
  { t: 'Subjonctif', q: "Bien que le défunt ___ sa résidence en Allemagne, ses biens se trouvaient en France.", o: ['avait', 'ait', 'aura', 'aurait'], a: 1, e: "« Bien que » est toujours suivi du subjonctif." },
  { t: 'Subjonctif', q: "Nous vous remercions de nous faire parvenir ces pièces afin que nous ___ clôturer le dossier.", o: ['pouvons', 'puissions', 'pourrons', 'pourrions'], a: 1, e: "« Afin que » (but) + subjonctif." },
  { t: 'Subjonctif', q: "Le tribunal a ordonné que les parties ___ entendues.", o: ['sont', 'soient', 'seront', 'seraient'], a: 1, e: "« Ordonner que » (volonté) + subjonctif." },
  { t: 'Subjonctif', q: "Je doute que ce testament ___ valable.", o: ['est', 'soit', 'sera', 'serait'], a: 1, e: "« Douter que » (doute) + subjonctif." },
  { t: 'Subjonctif', q: "Il est probable que la succession ___ réglée en Allemagne.", o: ['soit', 'sera', 'fût'], a: 1, e: "Piège : « il est probable que » prend l'indicatif (contrairement à « il est possible que »)." },
  { t: 'Subjonctif', q: "Après que le juge ___ sa décision, les parties pourront interjeter appel.", o: ['aura rendu', 'ait rendu', 'rende', 'rendrait'], a: 0, e: "« Après que » se construit avec l'indicatif ; le subjonctif est une faute fréquente." },
  { t: 'Subjonctif', q: "Il convient de déposer la déclaration avant que le délai n'___.", o: ['expire', 'expirera', 'expirait', 'a expiré'], a: 0, e: "« Avant que » + subjonctif (le « ne » explétif est facultatif)." },
  { t: 'Subjonctif', q: "Le notaire exige que chaque héritier ___ une pièce d'identité.", o: ['fournit', 'fournisse', 'fournira', 'fournirait'], a: 1, e: "« Exiger que » + subjonctif." },
  { t: 'Subjonctif', q: "À supposer que l'héritier ___ à la succession, sa part reviendrait à ses descendants.", o: ['renonce', 'renoncera', 'renonçait', 'renoncerait'], a: 0, e: "« À supposer que » (hypothèse) + subjonctif." },

  // Pronoms relatifs
  { t: 'Pronoms relatifs', q: "Voici la liste des documents ___ nous avons besoin.", o: ['que', 'dont', 'lesquels', 'où'], a: 1, e: "On a besoin DE quelque chose : « dont ». Calque fréquent de « die wir brauchen »." },
  { t: 'Pronoms relatifs', q: "Le tribunal ___ l'affaire a été portée s'est déclaré incompétent.", o: ['devant lequel', 'dont', 'que', 'où'], a: 0, e: "On porte une affaire DEVANT un tribunal : « devant lequel »." },
  { t: 'Pronoms relatifs', q: "C'est une clause ___ les parties ont expressément convenu.", o: ['que', 'dont', 'à laquelle', 'laquelle'], a: 1, e: "« Convenir de quelque chose » : « dont »." },
  { t: 'Pronoms relatifs', q: "L'acte ___ je vous ai parlé hier est prêt.", o: ['que', 'dont', 'duquel', 'lequel'], a: 1, e: "« Parler de » : « dont »." },
  { t: 'Pronoms relatifs', q: "La société ___ il est le gérant a été radiée.", o: ['dont', 'que', 'à laquelle', 'où'], a: 0, e: "Il est le gérant DE la société : « dont »." },
  { t: 'Pronoms relatifs', q: "Le contrat en vertu ___ le paiement est dû a été résilié.", o: ['duquel', 'dont', 'lequel', 'auquel'], a: 0, e: "Après une locution prépositive (« en vertu de »), on emploie « duquel », jamais « dont »." },
  { t: 'Pronoms relatifs', q: "Le jour ___ la succession s'est ouverte, le défunt résidait à Kehl.", o: ['où', 'que', 'dont', 'lequel'], a: 0, e: "Complément de temps : « où »." },
  { t: 'Pronoms relatifs', q: "Les héritiers, ___ certains résident en France, ont accepté la succession.", o: ['dont', 'desquels', 'que', 'lesquels'], a: 0, e: "« Certains d'entre eux » : « dont »." },

  // Accord du participe passé
  { t: 'Participe passé', q: "Les pièces que vous nous avez ___ sont incomplètes.", o: ['transmis', 'transmise', 'transmises'], a: 2, e: "Avec « avoir », accord avec le COD placé avant (« que » = les pièces)." },
  { t: 'Participe passé', q: "Les parties se sont ___ sur le montant de l'indemnité.", o: ['entendu', 'entendues', 'entendus'], a: 1, e: "Verbe pronominal « s'entendre sur » : accord avec le sujet (les parties)." },
  { t: 'Participe passé', q: "Les héritiers se sont ___ le droit de contester le testament.", o: ['réservé', 'réservés', 'réservées'], a: 0, e: "Le COD (« le droit ») est placé après : pas d'accord." },
  { t: 'Participe passé', q: "La décision qu'a ___ le tribunal est définitive.", o: ['rendu', 'rendue', 'rendus'], a: 1, e: "COD « qu' » (= la décision) placé avant : accord au féminin." },
  { t: 'Participe passé', q: "Les délais ont été ___ par la loi.", o: ['fixé', 'fixés', 'fixées'], a: 1, e: "Avec « être » (voix passive), accord avec le sujet." },
  { t: 'Participe passé', q: "Ci-___ la copie du jugement.", o: ['joint', 'jointe'], a: 0, e: "En tête de phrase, « ci-joint » reste invariable." },
  { t: 'Participe passé', q: "Les copies ci-___ doivent être signées.", o: ['joint', 'jointes'], a: 1, e: "Placé après le nom, « ci-joint » s'accorde." },
  { t: 'Participe passé', q: "Elle s'est ___ compte de l'erreur.", o: ['rendu', 'rendue'], a: 0, e: "« Se rendre compte » : participe toujours invariable." },

  // Temps et modes
  { t: 'Temps et modes', q: "Si le défunt ___ un testament, la dévolution légale ne s'appliquerait pas.", o: ['avait laissé', 'aurait laissé', 'a laissé'], a: 0, e: "Jamais de conditionnel après « si » d'hypothèse." },
  { t: 'Temps et modes', q: "Si vous ___ ces documents avant vendredi, nous pourrons déposer la demande.", o: ['transmettez', 'transmettriez', 'transmettrez'], a: 0, e: "« Si » + présent, puis futur dans la principale." },
  { t: 'Temps et modes', q: "Le notaire nous a indiqué qu'il ___ l'acte la semaine suivante.", o: ['signera', 'signerait', 'signe'], a: 1, e: "Futur dans le passé : conditionnel présent." },
  { t: 'Temps et modes', q: "D'après les héritiers, le défunt ___ des biens en Suisse.", o: ['aurait possédé', 'possède', 'possédera'], a: 0, e: "Information non vérifiée : conditionnel (allemand : « soll … besessen haben »)." },
  { t: 'Temps et modes', q: "Nous vous ___ reconnaissants de bien vouloir nous répondre rapidement.", o: ['serions', 'serons', 'soyons'], a: 0, e: "Conditionnel de politesse." },
  { t: 'Temps et modes', q: "Dès que le certificat ___ délivré, nous procéderons au partage.", o: ['sera', 'soit', 'serait'], a: 0, e: "« Dès que » + indicatif ; ici futur (en allemand on mettrait le présent)." },
  { t: 'Temps et modes', q: "Le défendeur prétend qu'il n'___ jamais reçu la mise en demeure.", o: ['a', 'ait', 'eût'], a: 0, e: "« Prétendre que » + indicatif." },
  { t: 'Temps et modes', q: "Le défunt résidait à Kehl ___ 2010.", o: ['depuis', 'dès', 'pendant'], a: 0, e: "Durée qui se prolonge (« seit ») : « depuis » avec l'imparfait." },

  // Prépositions et constructions
  { t: 'Constructions', q: "Le délai court ___ la signification du jugement.", o: ['à compter de', 'depuis de', 'dès de'], a: 0, e: "Formule consacrée : « à compter de »." },
  { t: 'Constructions', q: "Le tribunal a fait droit ___ la demande.", o: ['à', 'de', 'sur'], a: 0, e: "« Faire droit à une demande » = l'accueillir." },
  { t: 'Constructions', q: "Conformément ___ l'article 1240 du Code civil, l'auteur du dommage doit le réparer.", o: ['à', 'avec', 'selon'], a: 0, e: "« Conformément à »." },
  { t: 'Constructions', q: "Il a été procédé ___ l'inventaire des biens.", o: ['à', 'de', 'pour'], a: 0, e: "« Procéder à »." },
  { t: 'Constructions', q: "Le requérant se prévaut ___ son droit de préemption.", o: ['de', 'sur', 'à'], a: 0, e: "« Se prévaloir de »." },
  { t: 'Constructions', q: "Ce jugement est susceptible ___ appel.", o: ["d'", 'à', 'en'], a: 0, e: "« Susceptible d'appel » (allemand : « berufungsfähig »)." },
  { t: 'Constructions', q: "Les parties sont convenues ___ reporter la signature.", o: ['de', 'à', 'pour'], a: 0, e: "« Convenir de faire quelque chose »." },
  { t: 'Constructions', q: "Il incombe ___ demandeur de prouver ses allégations.", o: ['au', 'le', 'du'], a: 0, e: "« Incomber à quelqu'un »." },
  { t: 'Constructions', q: "La présente procuration est donnée ___ effet de vendre le bien.", o: ["à l'", "pour l'", "dans l'"], a: 0, e: "Formule notariale : « à l'effet de »." },
  { t: 'Constructions', q: "Nous accusons réception ___ votre courrier du 12 mai.", o: ['de', 'à', 'pour'], a: 0, e: "« Accuser réception de »." },

  // Registre
  { t: 'Registre', q: "___ votre courrier, nous vous adressons les pièces demandées.", o: ['À la suite de', 'Suite à', 'Après'], a: 0, e: "« Suite à » est critiqué dans un registre soutenu : préférer « à la suite de »." },
  { t: 'Registre', q: "Formule de politesse pour un notaire : « Je vous prie d'agréer, ___, l'expression de mes salutations distinguées. »", o: ['Maître', 'Monsieur le Notaire', 'cher Collègue'], a: 0, e: "On s'adresse à un notaire (comme à un avocat) par « Maître »." },
  { t: 'Registre', q: "Cette mesure permet de pallier ___ difficultés.", o: ['les', 'aux'], a: 0, e: "« Pallier » est transitif direct : pallier quelque chose." },
  { t: 'Registre', q: "___ le délai soit expiré, la demande a été examinée.", o: ['Bien que', 'Malgré que'], a: 0, e: "« Malgré que » est à éviter à l'écrit soutenu." },
  { t: 'Registre', q: "Le tribunal a ___ la nullité du contrat.", o: ['prononcé', 'fait', 'dit'], a: 0, e: "On « prononce » la nullité." },
  { t: 'Registre', q: "La partie perdante a ___ appel.", o: ['interjeté', 'déposé', 'porté'], a: 0, e: "On « interjette » appel (Berufung einlegen)." },
  { t: 'Registre', q: "Le notaire a ___ un acte de notoriété.", o: ['dressé', 'écrit', 'fabriqué'], a: 0, e: "On « dresse » un acte." },
  { t: 'Registre', q: "Les héritiers ont ___ le tribunal judiciaire.", o: ['saisi', 'appelé', 'contacté'], a: 0, e: "On « saisit » une juridiction (das Gericht anrufen)." },

  // Faux amis et calques
  { t: 'Calques', q: "« Die Klage wurde abgewiesen. » → La demande a été ___.", o: ['rejetée', 'refusée', 'abandonnée'], a: 0, e: "Une demande est « rejetée » ; le demandeur est « débouté »." },
  { t: 'Calques', q: "« Der Mieter hat die Kaution gezahlt. » → Le locataire a versé ___.", o: ['le dépôt de garantie', 'la caution', 'le cautionnement'], a: 0, e: "Faux ami : la « caution » française est une personne (der Bürge)." },
  { t: 'Calques', q: "« Die Akte liegt beim Gericht. » → ___ se trouve au tribunal.", o: ['Le dossier', "L'acte", 'Le registre'], a: 0, e: "Die Akte = le dossier ; l'acte = die Urkunde." },
  { t: 'Calques', q: "« Die mündliche Verhandlung findet am 5. Mai statt. » → ___ aura lieu le 5 mai.", o: ["L'audience", 'La négociation orale', 'Le débat oral'], a: 0, e: "Au tribunal, « Verhandlung » = « l'audience »." },
  { t: 'Calques', q: "« Er hat Konkurs angemeldet. » → Il a déposé ___.", o: ['le bilan', 'un concours', 'une plainte'], a: 0, e: "« Déposer le bilan » = se déclarer en cessation des paiements." },
  { t: 'Calques', q: "« in erster Instanz » → ___", o: ['en première instance', 'au premier degré d’urgence', 'en première demande'], a: 0, e: "Ici l'équivalent est direct." }
];

/* TEXTES : exercices d'écriture et de traduction (un par jour, en rotation) */
const TEXTS = {
  redaction: [
    { id: 'r1', titre: 'Courriel au notaire', consigne: "Rédige un courriel à Maître Lefèvre, notaire à Colmar, pour lui transmettre la liste des pièces nécessaires au règlement d'une succession franco-allemande (150 à 200 mots)." },
    { id: 'r2', titre: 'Pflichtteil et réserve', consigne: "Explique à un client français, dans une lettre de 150 à 200 mots, pourquoi le Pflichtteil allemand n'est pas tout à fait la réserve héréditaire française." },
    { id: 'r3', titre: 'Loi applicable', consigne: "Rédige une courte note (150 à 200 mots) pour un confrère français : quelle loi s'applique à la succession d'un Allemand qui résidait en dernier lieu à Strasbourg ?" },
    { id: 'r4', titre: 'Compte rendu de rendez-vous', consigne: "Rédige un courriel à une collègue pour lui faire le compte rendu d'un rendez-vous avec deux héritiers qui ne s'entendent pas sur le partage (150 à 200 mots)." },
    { id: 'r5', titre: 'Le Erbschein expliqué', consigne: "Explique à une cliente française ce qu'est un Erbschein, à quoi il sert et comment l'obtenir (150 à 200 mots, registre soutenu mais clair)." },
    { id: 'r6', titre: 'Zugewinngemeinschaft', consigne: "Présente à un notaire français, en 150 à 200 mots, le régime allemand de la Zugewinngemeinschaft et ses conséquences au décès d'un époux." },
    { id: 'r7', titre: 'Testament conjonctif', consigne: "Réponds à un notaire français qui te demande si le testament conjonctif (Berliner Testament) de ses clients allemands peut produire effet en France (150 à 200 mots)." },
    { id: 'r8', titre: 'Mise en demeure', consigne: "Rédige une lettre de mise en demeure, en français, adressée à un locataire qui n'a pas payé trois mois de loyer (150 à 200 mots)." }
  ],
  trad_de_fr: [
    { id: 'd1', titre: 'Testament et Pflichtteil', source: "Der Erblasser hat in seinem notariellen Testament vom 3. März 2019 seine Ehefrau zur Alleinerbin eingesetzt. Seine beiden Kinder aus erster Ehe machen nunmehr ihren Pflichtteil geltend. Der Testamentsvollstrecker hat ein Nachlassverzeichnis erstellt." },
    { id: 'd2', titre: 'Vollmacht', source: "Hiermit bevollmächtige ich Herrn Paul Weber, mich in allen Angelegenheiten, die den Nachlass meiner verstorbenen Mutter betreffen, gerichtlich und außergerichtlich zu vertreten. Die Vollmacht erlischt nicht mit meinem Tod." },
    { id: 'd3', titre: 'Extrait de jugement', source: "Die Klage ist zulässig, aber unbegründet. Der Kläger hat nicht dargelegt, dass ihm ein Anspruch auf Schadensersatz zusteht. Die Kosten des Rechtsstreits trägt der Kläger." },
    { id: 'd4', titre: 'Clause de bail', source: "Der Mieter ist verpflichtet, bei Beginn des Mietverhältnisses eine Kaution in Höhe von drei Monatsmieten zu leisten. Der Vermieter hat die Kaution getrennt von seinem Vermögen anzulegen." },
    { id: 'd5', titre: 'Ehevertrag', source: "Die Beteiligten leben im gesetzlichen Güterstand der Zugewinngemeinschaft. Durch diesen Vertrag vereinbaren sie Gütertrennung. Ein Zugewinnausgleich findet nicht statt." },
    { id: 'd6', titre: 'Erbschein', source: "Es wird bezeugt, dass der am 12. Januar 2026 verstorbene Hans Müller von seiner Ehefrau zu 1/2 und von seinen beiden Kindern zu je 1/4 beerbt worden ist." },
    { id: 'd7', titre: 'Cession de parts', source: "Der Gesellschafter kann seinen Geschäftsanteil nur mit Zustimmung der Gesellschaft abtreten. Die Abtretung bedarf der notariellen Beurkundung." },
    { id: 'd8', titre: 'Voies de recours', source: "Gegen diesen Bescheid kann innerhalb eines Monats nach Bekanntgabe Widerspruch erhoben werden. Der Widerspruch ist schriftlich bei der oben genannten Behörde einzulegen." }
  ],
  trad_fr_de: [
    { id: 'f1', titre: 'Acte de notoriété', source: "Le notaire chargé du règlement de la succession a dressé un acte de notoriété. Les héritiers disposent d'un délai de six mois pour déposer la déclaration de succession." },
    { id: 'f2', titre: 'Clause résolutoire', source: "Le présent bail sera résilié de plein droit à défaut de paiement d'un seul terme de loyer, un mois après un commandement de payer demeuré infructueux." },
    { id: 'f3', titre: 'Dispositif de jugement', source: "Par jugement du 4 février 2026, le tribunal judiciaire de Strasbourg a débouté le demandeur de l'ensemble de ses prétentions et l'a condamné aux dépens." },
    { id: 'f4', titre: 'Contrat de mariage', source: "Les époux ont adopté le régime de la séparation de biens par contrat de mariage reçu par Maître Dupont, notaire à Colmar." },
    { id: 'f5', titre: 'Donation', source: "Le donateur se réserve l'usufruit du bien donné sa vie durant. La donation est consentie en avancement de part successorale." },
    { id: 'f6', titre: 'Clause attributive', source: "Toute contestation relative à l'exécution du présent contrat relèvera de la compétence exclusive des tribunaux de Strasbourg." },
    { id: 'f7', titre: 'Mandat de protection future', source: "Le mandataire veille à ce que le mandant conserve, dans la mesure du possible, des relations personnelles avec les tiers." },
    { id: 'f8', titre: 'Renonciation', source: "La renonciation à une succession ne se présume pas. L'héritier qui renonce est censé n'avoir jamais été héritier." }
  ]
};

/* ===== Version 1.6 : nouveaux thèmes et épreuves du Bade-Wurtemberg ===== */
Object.assign(THEMES, {
  pen: 'Droit pénal',
  pub: 'Droit public',
  trav: 'Travail et affaires',
  inst: 'Institutions et civilisation'
});

/* Domaines proposés dans Profil (chaque domaine regroupe des thèmes) */
const DOMAINS = [
  { id: 'prive', label: 'Droit privé', themes: ['succ', 'obl', 'bien', 'fam', 'soc', 'trav'] },
  { id: 'penal', label: 'Droit pénal', themes: ['pen'] },
  { id: 'public', label: 'Droit public', themes: ['pub'] },
  { id: 'proc', label: 'Procédure et actes', themes: ['proc', 'acte'] },
  { id: 'civ', label: 'Institutions et civilisation', themes: ['inst'] },
  { id: 'langue', label: 'Style et faux amis', themes: ['style', 'faux'] }
];

VOCAB.push(
  // Droit pénal
  ['die Straftat', "l'infraction", '', 'pen'],
  ['der Täter', "l'auteur (de l'infraction)", '', 'pen'],
  ['das Verbrechen', 'le crime', 'Les seuils diffèrent : en DE, peine minimale d’un an ; en FR, crime = infraction jugée par la cour d’assises ou la cour criminelle.', 'pen'],
  ['das Vergehen', 'le délit', '', 'pen'],
  ['die Ordnungswidrigkeit', 'la contravention', 'Approximation : en DE, elle relève du droit administratif des sanctions.', 'pen'],
  ['der Vorsatz', "l'intention", 'Élément moral de l’infraction (dol).', 'pen'],
  ['die Fahrlässigkeit', "l'imprudence (la négligence)", '', 'pen'],
  ['der Versuch', 'la tentative', '', 'pen'],
  ['die Beihilfe', 'la complicité', 'Par aide ou assistance.', 'pen'],
  ['die Anstiftung', "l'instigation", 'En droit français : complicité par provocation ou instigation.', 'pen'],
  ['der Mittäter', 'le coauteur', '', 'pen'],
  ['die Notwehr', 'la légitime défense', '', 'pen'],
  ['die Schuldfähigkeit', 'la responsabilité pénale', '', 'pen'],
  ['die Strafanzeige', 'la plainte', 'Au sens strict : la dénonciation ; der Strafantrag = la plainte de la victime exigée pour certaines infractions.', 'pen'],
  ['die Staatsanwaltschaft', 'le ministère public (le parquet)', '', 'pen'],
  ['der Staatsanwalt', 'le procureur', '', 'pen'],
  ['das Ermittlungsverfahren', "l'enquête (phase d'enquête)", '', 'pen'],
  ['der Beschuldigte', 'la personne mise en cause', '', 'pen'],
  ['der Angeklagte', 'le prévenu', 'Devant la cour d’assises : l’accusé.', 'pen'],
  ['die Anklageschrift', "l'acte d'accusation", '', 'pen'],
  ['die Untersuchungshaft', 'la détention provisoire', '', 'pen'],
  ['der Haftbefehl', "le mandat d'arrêt", '', 'pen'],
  ['die Hauptverhandlung', "l'audience de jugement", '', 'pen'],
  ['der Freispruch', 'la relaxe', 'Devant la cour d’assises : l’acquittement.', 'pen'],
  ['die Verurteilung', 'la condamnation', '', 'pen'],
  ['die Freiheitsstrafe', "la peine d'emprisonnement", '', 'pen'],
  ['die Geldstrafe', "l'amende", '', 'pen'],
  ['die Strafaussetzung zur Bewährung', 'le sursis probatoire', '', 'pen'],
  ['das Strafgesetzbuch', 'le Code pénal', '', 'pen'],
  ['die Strafprozessordnung', 'le Code de procédure pénale', '', 'pen'],
  ['der Pflichtverteidiger', "l'avocat commis d'office", '', 'pen'],
  ['die Nebenklage', 'la constitution de partie civile', 'Équivalent approximatif.', 'pen'],
  ['der Diebstahl', 'le vol', '', 'pen'],
  ['der Betrug', "l'escroquerie", '', 'pen'],
  ['die Untreue', "l'abus de confiance", 'Approximation ; selon le cas, aussi abus de biens sociaux.', 'pen'],
  ['die Körperverletzung', 'les violences volontaires', '', 'pen'],
  ['die Urkundenfälschung', 'le faux (en écriture)', '', 'pen'],
  ['die Unschuldsvermutung', "la présomption d'innocence", '', 'pen'],
  ['das Bundeszentralregister', 'le casier judiciaire', '', 'pen'],
  ['das Jugendstrafrecht', 'le droit pénal des mineurs', '', 'pen'],

  // Droit public
  ['das Verwaltungsrecht', 'le droit administratif', '', 'pub'],
  ['das Verfassungsrecht', 'le droit constitutionnel', '', 'pub'],
  ['das Bundesverfassungsgericht', 'la Cour constitutionnelle fédérale', '', 'pub'],
  ['die Verfassungsbeschwerde', 'le recours constitutionnel', 'Recours individuel, sans équivalent exact en France (≠ QPC).', 'pub'],
  ['das Verwaltungsgericht', 'le tribunal administratif', '', 'pub'],
  ['das Bundesverwaltungsgericht', 'la Cour administrative fédérale', '', 'pub'],
  ['der Verwaltungsakt', "l'acte administratif individuel", '', 'pub'],
  ['die Anfechtungsklage', "le recours en annulation", '≈ recours pour excès de pouvoir.', 'pub'],
  ['das Ermessen', "le pouvoir d'appréciation", '', 'pub'],
  ['die Verhältnismäßigkeit', 'la proportionnalité', '', 'pub'],
  ['die Gewaltenteilung', 'la séparation des pouvoirs', '', 'pub'],
  ['der Rechtsstaat', "l'État de droit", '', 'pub'],
  ['die Grundrechte', 'les droits fondamentaux', '', 'pub'],
  ['die Gesetzgebungskompetenz', 'la compétence législative', '', 'pub'],
  ['der Bund', "la Fédération (l'État fédéral)", '', 'pub'],
  ['das Bundesland', 'le Land (État fédéré)', '', 'pub'],
  ['die Gemeinde', 'la commune', '', 'pub'],
  ['der Landkreis', "l'arrondissement (Landkreis)", 'Pas d’équivalent exact : on garde souvent le terme allemand.', 'pub'],
  ['die Rechtsverordnung', 'le règlement (décret)', '', 'pub'],
  ['die Amtshaftung', "la responsabilité de l'État", '', 'pub'],
  ['der Beamte', 'le fonctionnaire', '', 'pub'],
  ['die Aufenthaltserlaubnis', 'le titre de séjour', '', 'pub'],
  ['die Einbürgerung', 'la naturalisation', '', 'pub'],
  ['die Meldebescheinigung', "l'attestation de domicile", '', 'pub'],
  ['der Steuerbescheid', "l'avis d'imposition", '', 'pub'],
  ['das Finanzamt', 'le service des impôts', '', 'pub'],
  ['die Baugenehmigung', 'le permis de construire', '', 'pub'],
  ['die Enteignung', "l'expropriation", '', 'pub'],
  ['der Bundesrat', 'le Bundesrat (chambre des Länder)', '', 'pub'],
  ['die Bundesregierung', 'le gouvernement fédéral', '', 'pub'],

  // Travail et affaires
  ['der Arbeitsvertrag', 'le contrat de travail', '', 'trav'],
  ['der Arbeitgeber', "l'employeur", '', 'trav'],
  ['der Arbeitnehmer', 'le salarié', '', 'trav'],
  ['die Probezeit', "la période d'essai", '', 'trav'],
  ['die Abmahnung', "l'avertissement", 'Sanction disciplinaire préalable au licenciement.', 'trav'],
  ['die fristlose Kündigung', 'le licenciement sans préavis', '', 'trav'],
  ['die Kündigungsfrist', 'le délai de préavis', '', 'trav'],
  ['der Betriebsrat', 'le comité social et économique', '≈ CSE.', 'trav'],
  ['der Tarifvertrag', 'la convention collective', '', 'trav'],
  ['das Arbeitsgericht', 'le conseil de prud’hommes', '', 'trav'],
  ['die Abfindung', "l'indemnité de licenciement", '', 'trav'],
  ['der Handelsvertreter', "l'agent commercial", '', 'trav'],
  ['der Kaufmann', 'le commerçant', '', 'trav'],
  ['der Verbraucher', 'le consommateur', '', 'trav'],
  ['das Widerrufsrecht', 'le droit de rétractation', '', 'trav'],
  ['die Produkthaftung', 'la responsabilité du fait des produits défectueux', '', 'trav'],
  ['die Rechnung', 'la facture', '', 'trav'],
  ['die Zahlungsunfähigkeit', 'la cessation des paiements', '', 'trav'],

  // Institutions et civilisation (France et Allemagne)
  ['die Nationalversammlung', "l'Assemblée nationale", '', 'inst'],
  ['der Verfassungsrat', 'le Conseil constitutionnel', '', 'inst'],
  ['der Staatsrat', "le Conseil d'État", '', 'inst'],
  ['der Kassationshof', 'la Cour de cassation', '', 'inst'],
  ['der Rechnungshof', 'la Cour des comptes', '', 'inst'],
  ['der Präfekt', 'le préfet', 'Représentant de l’État dans le département.', 'inst'],
  ['das Departement', 'le département', '', 'inst'],
  ['die Gebietskörperschaft', 'la collectivité territoriale', '', 'inst'],
  ['der Bürgermeister', 'le maire', '', 'inst'],
  ['das Staatsoberhaupt', "le chef de l'État", '', 'inst'],
  ['das Amtsblatt der Französischen Republik', 'le Journal officiel', '', 'inst'],
  ['die Fünfte Republik', 'la Ve République', '', 'inst'],
  ['das Lokalrecht', 'le droit local (Alsace-Moselle)', '', 'inst'],
  ['der Élysée-Vertrag', "le traité de l'Élysée", '1963.', 'inst'],
  ['der Aachener Vertrag', "le traité d'Aix-la-Chapelle", '2019.', 'inst'],
  ['der Eurodistrikt', "l'Eurodistrict", 'Ex. : Eurodistrict Strasbourg-Ortenau.', 'inst'],
  ['der Grenzgänger', 'le travailleur frontalier', '', 'inst'],
  ['die Laizität', 'la laïcité', '', 'inst']
);

/* Épreuves écrites (Staatliche Prüfung für Übersetzer, Bade-Wurtemberg) :
   1. essai en français (civilisation française, 1 sujet sur 3, 180 min)
   2. traduction FR → DE, texte général (90 min)
   3. traduction FR → DE, texte juridique (90 min)
   4. traduction DE → FR, texte général (90 min)
   5. traduction DE → FR, texte juridique (90 min)
   Les textes « mock: true » sont réservés à l'épreuve blanche (≈ 30 lignes). */

TEXTS.essai = [
  { id: 'e1', titre: 'Le droit local alsacien-mosellan', consigne: "Le droit local d'Alsace-Moselle : héritage historique ou exception à défendre ?" },
  { id: 'e2', titre: 'Le couple franco-allemand', consigne: "Le couple franco-allemand est-il encore le moteur de la construction européenne ?" },
  { id: 'e3', titre: 'La décentralisation', consigne: "Depuis les lois de décentralisation de 1982, la France est-elle toujours un État centralisé ?" },
  { id: 'e4', titre: 'Le Conseil constitutionnel', consigne: "Comment la question prioritaire de constitutionnalité a-t-elle changé le rôle du Conseil constitutionnel ?" },
  { id: 'e5', titre: 'La laïcité', consigne: "La laïcité en France : principe juridique, débat de société." },
  { id: 'e6', titre: 'Le Rhin supérieur', consigne: "Vivre et travailler des deux côtés du Rhin : quels atouts, quels obstacles ?" },
  { id: 'e7', titre: 'La Ve République', consigne: "La Ve République est-elle devenue un régime présidentiel ?" },
  { id: 'e8', titre: 'Le notariat', consigne: "Quelle place le notaire occupe-t-il dans la société française d'aujourd'hui ?" },
  { id: 'e9', titre: 'Les grandes écoles', consigne: "Les grandes écoles favorisent-elles l'égalité des chances ou la reproduction des élites ?" },
  { id: 'e10', titre: 'Les langues régionales', consigne: "Faut-il mieux protéger les langues régionales en France ?" },
  { id: 'e11', titre: "L'apprentissage de l'allemand", consigne: "Pourquoi l'apprentissage de l'allemand recule-t-il en France, et comment y remédier ?" },
  { id: 'e12', titre: 'La France rurale', consigne: "Services publics, médecins, commerces : la France rurale est-elle abandonnée ?" },
  { id: 'em1', mock: true, titre: 'Sujet A', consigne: "Le modèle social français est-il encore adapté au XXIe siècle ?" },
  { id: 'em2', mock: true, titre: 'Sujet B', consigne: "Paris et la province : une opposition dépassée ?" },
  { id: 'em3', mock: true, titre: 'Sujet C', consigne: "Quel rôle les régions frontalières jouent-elles dans la coopération franco-allemande ?" }
];

TEXTS.gen_fr_de = [
  { id: 'g1', titre: 'Le vélo en ville', source: "Depuis une dizaine d'années, de nombreuses villes françaises ont multiplié les pistes cyclables. À Strasbourg, pionnière en la matière, le vélo fait désormais partie du paysage quotidien. La cohabitation entre cyclistes, piétons et automobilistes reste pourtant source de tensions. Les associations réclament davantage d'aménagements sécurisés, tandis que certains commerçants du centre-ville craignent de perdre une partie de leur clientèle." },
  { id: 'g2', titre: 'Les marchés de Noël', source: "Chaque hiver, les marchés de Noël attirent en Alsace des centaines de milliers de visiteurs venus de toute l'Europe. Pour les commerçants, cette période représente parfois un tiers de leur chiffre d'affaires annuel. Mais les habitants se plaignent de plus en plus de la foule, des embouteillages et de la hausse des loyers liée à la location de meublés touristiques." },
  { id: 'g3', titre: 'Le télétravail', source: "Né de la crise sanitaire, le télétravail s'est durablement installé dans les entreprises françaises. Les salariés y voient un gain de temps et de qualité de vie ; les employeurs, une manière de réduire leurs coûts immobiliers. Reste une question délicate : comment préserver la cohésion des équipes lorsque les collègues ne se croisent plus qu'un ou deux jours par semaine ?" },
  { id: 'g4', titre: 'Les déserts médicaux', source: "Dans certains départements, il faut désormais plusieurs mois pour obtenir un rendez-vous chez un ophtalmologue. Les maires ruraux multiplient les initiatives pour attirer de jeunes médecins : logements gratuits, maisons de santé, aides à l'installation. Ces mesures restent toutefois insuffisantes tant que les praticiens préfèrent s'établir dans les grandes agglomérations." },
  { id: 'g5', titre: "L'allemand à l'école", source: "Le nombre d'élèves apprenant l'allemand en France a fortement diminué en vingt ans. Les enseignants regrettent que la langue de Goethe souffre d'une réputation de difficulté, alors que l'Allemagne reste le premier partenaire économique de la France. Dans les régions frontalières, les entreprises peinent à recruter des salariés bilingues." },
  { id: 'g6', titre: 'Les circuits courts', source: "De plus en plus de consommateurs se tournent vers les circuits courts : vente directe à la ferme, marchés de producteurs, paniers hebdomadaires. Ils y trouvent des produits frais et le sentiment de soutenir l'agriculture locale. Les agriculteurs, eux, y gagnent une meilleure rémunération, mais au prix d'une charge de travail considérablement alourdie." },
  { id: 'gm1', mock: true, titre: 'Le Rhin, trait d’union', source: "Pendant des siècles, le Rhin a été une frontière disputée, le théâtre de conflits sanglants et le symbole de la rivalité entre la France et l'Allemagne. Aujourd'hui, des milliers de personnes le traversent chaque matin pour aller travailler, faire leurs courses ou rendre visite à des proches, sans même y prêter attention. Le tramway relie Strasbourg à Kehl depuis 2017, et les deux rives partagent des projets culturels, des pistes cyclables et même des services d'urgence.\n\nCette normalité n'a pourtant rien d'évident. Elle est le fruit d'une volonté politique patiente, incarnée par le traité de l'Élysée en 1963, puis par le traité d'Aix-la-Chapelle en 2019, qui a doté les régions frontalières de nouveaux outils de coopération. Sur le terrain, les obstacles demeurent nombreux : les systèmes de santé, de retraite et de fiscalité ne sont pas harmonisés, et un travailleur frontalier doit souvent jongler avec deux administrations qui ne se comprennent pas toujours.\n\nLa crise sanitaire de 2020 a d'ailleurs rappelé la fragilité de ces liens. La fermeture temporaire des frontières a été vécue comme un choc par les habitants, qui avaient fini par oublier qu'elles existaient. Beaucoup ont alors pris conscience que la coopération transfrontalière, loin d'être acquise, devait être entretenue au quotidien. Pour les jeunes générations, l'enjeu est désormais de faire vivre cet espace commun, notamment en apprenant la langue du voisin." }
];

TEXTS.gen_de_fr = [
  { id: 'h1', titre: 'Wohnungsnot', source: "In vielen deutschen Großstädten ist bezahlbarer Wohnraum knapp geworden. Junge Familien ziehen ins Umland, weil sie sich die Mieten in der Innenstadt nicht mehr leisten können. Die Politik setzt auf Neubau und Mietpreisbremse, doch Kritiker bemängeln, dass die Maßnahmen zu spät kommen und an den Ursachen vorbeigehen." },
  { id: 'h2', titre: 'Fachkräftemangel', source: "Ob Pflege, Handwerk oder IT: Überall fehlen in Deutschland qualifizierte Arbeitskräfte. Viele Betriebe müssen Aufträge ablehnen, weil sie keine Mitarbeiter finden. Die Bundesregierung hat deshalb die Einwanderung von Fachkräften erleichtert, doch langwierige Verfahren und die Sprachbarriere schrecken viele Interessenten ab." },
  { id: 'h3', titre: 'Energiewende', source: "Die Energiewende gilt als eines der ehrgeizigsten Projekte der deutschen Nachkriegsgeschichte. Wind- und Solarenergie decken inzwischen einen großen Teil des Strombedarfs. Gleichzeitig stoßen neue Stromtrassen und Windräder vor Ort häufig auf Widerstand: Viele Bürger befürworten den Ausbau grundsätzlich, wollen ihn aber nicht vor der eigenen Haustür." },
  { id: 'h4', titre: 'Schüleraustausch', source: "Seit Jahrzehnten ermöglichen Austauschprogramme deutschen und französischen Jugendlichen, einige Wochen im Nachbarland zu verbringen. Viele ehemalige Teilnehmer berichten, dass diese Erfahrung ihren weiteren Lebensweg geprägt hat. Dennoch sinkt die Zahl der Anmeldungen, nicht zuletzt weil immer weniger Schüler die Sprache des Nachbarn lernen." },
  { id: 'h5', titre: 'Ehrenamt', source: "Rund ein Drittel der Deutschen engagiert sich ehrenamtlich, sei es im Sportverein, bei der Freiwilligen Feuerwehr oder in der Flüchtlingshilfe. Ohne diesen Einsatz wären viele gesellschaftliche Aufgaben kaum zu bewältigen. Die Vereine klagen jedoch zunehmend über Nachwuchsprobleme, da sich junge Menschen lieber projektbezogen und zeitlich begrenzt einbringen." },
  { id: 'h6', titre: 'Digitale Verwaltung', source: "Wer in Deutschland einen Personalausweis beantragen oder ein Auto anmelden möchte, muss häufig noch persönlich im Amt erscheinen. Die Digitalisierung der Verwaltung kommt nur schleppend voran. Bürger und Unternehmen fordern seit Jahren einfache Online-Verfahren, doch unterschiedliche Zuständigkeiten von Bund, Ländern und Kommunen erschweren eine einheitliche Lösung." },
  { id: 'hm1', mock: true, titre: 'Pendeln über die Grenze', source: "Jeden Morgen überqueren Zehntausende Menschen die Grenze zwischen dem Elsass und Baden-Württemberg, um zur Arbeit zu fahren. Für viele von ihnen ist das Pendeln längst Alltag: Sie wohnen in Frankreich, wo die Immobilienpreise oft niedriger sind, und arbeiten in Deutschland, wo die Löhne in manchen Branchen höher liegen. Andere gehen den umgekehrten Weg, weil sie in Straßburg eine Stelle gefunden haben, die ihren Qualifikationen entspricht.\n\nWas auf den ersten Blick einfach klingt, entpuppt sich im Alltag häufig als bürokratischer Hindernislauf. Grenzgänger müssen sich mit zwei Steuersystemen, zwei Krankenversicherungen und unterschiedlichen Regeln für die Rente auseinandersetzen. Wer arbeitslos wird, krank ist oder in Elternzeit geht, stellt schnell fest, dass die Zuständigkeiten nicht immer klar geregelt sind. Beratungsstellen auf beiden Seiten des Rheins versuchen, Licht ins Dunkel zu bringen, doch die Nachfrage übersteigt ihre Kapazitäten bei Weitem.\n\nHinzu kommt die Sprache. Zwar sprechen viele ältere Elsässer noch Dialekt und verstehen daher Deutsch, doch bei der jüngeren Generation geht diese Kompetenz deutlich zurück. Arbeitgeber in Baden suchen deshalb händeringend nach zweisprachigen Mitarbeitern. Politiker beider Länder betonen regelmäßig die Bedeutung des Grenzraums für die europäische Integration. Ob ihre Bekenntnisse auch zu konkreten Verbesserungen führen, wird sich in den kommenden Jahren zeigen." }
];

TEXTS.jur_fr_de = TEXTS.trad_fr_de.map((t) => Object.assign({ dom: 'prive' }, t)).concat([
  { id: 'p1', dom: 'penal', titre: 'Audience correctionnelle', source: "Le prévenu, poursuivi pour escroquerie et abus de confiance, a comparu libre devant le tribunal correctionnel de Strasbourg. Le ministère public a requis une peine de dix-huit mois d'emprisonnement, dont douze avec sursis. La victime, constituée partie civile, sollicite la réparation de son préjudice matériel et moral." },
  { id: 'p2', dom: 'penal', titre: "Présomption d'innocence", source: "Toute personne suspectée ou poursuivie est présumée innocente tant que sa culpabilité n'a pas été établie. Les atteintes à sa présomption d'innocence sont prévenues, réparées et réprimées dans les conditions prévues par la loi." },
  { id: 'p3', dom: 'public', titre: 'Recours contre un refus de permis', source: "Par une requête enregistrée le 3 mars 2026, la société requérante demande au tribunal administratif de Strasbourg d'annuler l'arrêté du 12 décembre 2025 par lequel le maire de la commune a refusé de lui délivrer un permis de construire. Elle soutient que cette décision est insuffisamment motivée et entachée d'une erreur manifeste d'appréciation." },
  { id: 'p4', dom: 'public', titre: 'Le préfet', source: "Le préfet est le représentant de l'État dans le département. Il veille au respect des lois, assure le contrôle administratif des collectivités territoriales et dirige les services déconcentrés de l'État." },
  { id: 'pm1', mock: true, dom: 'prive', titre: 'Jugement : partage successoral', source: "Par acte de commissaire de justice du 14 février 2025, Madame Claire Muller a fait assigner son frère, Monsieur Paul Muller, devant le tribunal judiciaire de Strasbourg aux fins de voir ordonner l'ouverture des opérations de compte, liquidation et partage de la succession de leur mère, Madame Hélène Muller, décédée le 2 juin 2023 à Colmar.\n\nLa demanderesse expose que la défunte a laissé pour lui succéder ses deux enfants, chacun pour moitié, et que l'actif successoral comprend principalement une maison d'habitation située à Riquewihr ainsi que des avoirs bancaires détenus en France et en Allemagne. Elle fait valoir que les tentatives de partage amiable ont échoué, son frère occupant seul l'immeuble depuis le décès sans verser la moindre indemnité à l'indivision.\n\nLe défendeur conclut au rejet de la demande d'indemnité d'occupation. Il soutient qu'il a assumé seul, depuis plus de dix ans, les soins quotidiens dont sa mère avait besoin et qu'il a financé sur ses deniers personnels d'importants travaux de rénovation de la toiture. Il sollicite en conséquence que ces dépenses soient portées à son crédit dans les comptes de l'indivision.\n\nLe tribunal ordonne l'ouverture des opérations de compte, liquidation et partage, désigne à cet effet Maître Antoine Weiss, notaire à Colmar, et commet un juge pour surveiller lesdites opérations. Il dit que Monsieur Paul Muller est redevable envers l'indivision d'une indemnité d'occupation à compter du 2 juin 2023 et réserve les dépens." }
]);

TEXTS.jur_de_fr = TEXTS.trad_de_fr.map((t) => Object.assign({ dom: 'prive' }, t)).concat([
  { id: 'q1', dom: 'penal', titre: 'Urteilstenor (Strafsache)', source: "Der Angeklagte wird wegen Betrugs in drei Fällen zu einer Gesamtfreiheitsstrafe von einem Jahr und sechs Monaten verurteilt. Die Vollstreckung der Strafe wird zur Bewährung ausgesetzt. Der Angeklagte trägt die Kosten des Verfahrens." },
  { id: 'q2', dom: 'penal', titre: 'Einstellung des Verfahrens', source: "Die Staatsanwaltschaft hat das Ermittlungsverfahren gegen den Beschuldigten mangels hinreichenden Tatverdachts eingestellt. Der Anzeigeerstatter kann gegen diese Entscheidung binnen zwei Wochen Beschwerde einlegen." },
  { id: 'q3', dom: 'public', titre: 'Verwaltungsgerichtliche Klage', source: "Der Kläger begehrt die Aufhebung des Bescheids der Stadt Offenburg vom 4. Mai 2026, mit dem ihm die Baugenehmigung für die Errichtung eines Carports versagt wurde. Er ist der Auffassung, das Vorhaben füge sich in die Eigenart der näheren Umgebung ein." },
  { id: 'q4', dom: 'public', titre: 'Grundgesetz, Art. 2', source: "Jeder hat das Recht auf die freie Entfaltung seiner Persönlichkeit, soweit er nicht die Rechte anderer verletzt und nicht gegen die verfassungsmäßige Ordnung oder das Sittengesetz verstößt." },
  { id: 'qm1', mock: true, dom: 'prive', titre: 'Arbeitsgericht: Kündigungsschutzklage', source: "Die Parteien streiten über die Wirksamkeit einer ordentlichen Kündigung. Der Kläger ist seit dem 1. April 2014 bei der Beklagten, einem mittelständischen Unternehmen der Metallindustrie mit Sitz in Kehl, als Lagerist beschäftigt. Sein monatliches Bruttogehalt betrug zuletzt 3.200 Euro. Im Betrieb der Beklagten sind regelmäßig mehr als zehn Arbeitnehmer tätig; ein Betriebsrat ist gebildet.\n\nMit Schreiben vom 28. Februar 2026, dem Kläger am selben Tag zugegangen, kündigte die Beklagte das Arbeitsverhältnis zum 30. Juni 2026. Zur Begründung beruft sie sich auf wiederholte Verspätungen sowie darauf, dass der Kläger trotz einer Abmahnung vom 10. November 2025 am 19. Februar 2026 erneut ohne Entschuldigung der Arbeit ferngeblieben sei.\n\nDer Kläger hält die Kündigung für sozial ungerechtfertigt. Er trägt vor, er sei am 19. Februar 2026 arbeitsunfähig erkrankt gewesen und habe dies der Beklagten noch am Morgen telefonisch mitgeteilt; die ärztliche Bescheinigung habe er am Folgetag nachgereicht. Zudem rügt er, der Betriebsrat sei vor Ausspruch der Kündigung nicht ordnungsgemäß angehört worden.\n\nDas Gericht hat Beweis erhoben durch Vernehmung des Schichtleiters als Zeugen. Die Klage ist zulässig und begründet. Die Kündigung ist bereits deshalb unwirksam, weil die Beklagte nicht dargelegt hat, dass sie dem Betriebsrat die maßgeblichen Kündigungsgründe vollständig mitgeteilt hat. Das Arbeitsverhältnis besteht daher über den 30. Juni 2026 hinaus fort." }
]);


/* ===== Grammaire : nouvelles questions ===== */
GRAMMAR.push(
  // Pronoms y / en
  { t: 'Pronoms y et en', q: "Le notaire a reçu le testament ; il ___ a pris connaissance hier.", o: ['en', 'y', 'le'], a: 0, e: "Prendre connaissance DE quelque chose → « en »." },
  { t: 'Pronoms y et en', q: "Cette clause est importante : les parties ___ tiennent beaucoup.", o: ['y', 'en', 'lui'], a: 0, e: "Tenir À quelque chose → « y »." },
  { t: 'Pronoms y et en', q: "Le délai d'appel ? Le demandeur ne ___ a pas tenu compte.", o: ['en', 'y', "l'"], a: 0, e: "Tenir compte DE → « en »." },
  { t: 'Pronoms y et en', q: "La mise en demeure est restée sans réponse ; le débiteur n'___ a pas donné suite.", o: ['y', 'en', 'lui'], a: 0, e: "Donner suite À quelque chose → « y »." },
  { t: 'Pronoms y et en', q: "Le juge s'est adressé au témoin et ___ a posé trois questions.", o: ['lui', 'y', 'en'], a: 0, e: "Pour une personne (s'adresser à quelqu'un), on emploie « lui », pas « y »." },
  // Négation
  { t: 'Négation', q: "Le défendeur ___ a produit qu'une seule pièce.", o: ["n'", 'ne pas', '—'], a: 0, e: "« Ne … que » = seulement (nur). Pas de « pas » avec « que »." },
  { t: 'Négation', q: "Le testament n'est ni daté ___ signé.", o: ['ni', 'ou', 'et'], a: 0, e: "« Ni … ni » (weder … noch) ; le « ne » reste devant le verbe." },
  { t: 'Négation', q: "Le contrat a été résilié sans que le locataire ___ prévenu.", o: ['ait été', "n'ait été", 'a été'], a: 0, e: "« Sans que » + subjonctif ; à l'écrit soigné, on évite le « ne » après « sans que »." },
  { t: 'Négation', q: "Il faut agir avant que le délai ___ expiré.", o: ['ne soit', "n'est", 'ne sera'], a: 0, e: "« Avant que » + subjonctif ; le « ne » explétif (sans valeur négative) est facultatif mais fréquent chez les juristes." },
  // Accords
  { t: 'Accords', q: "Les parties, ___ informées de leurs droits, ont signé l'acte.", o: ['dûment', 'dûement', 'dues'], a: 0, e: "« Dûment » (ordnungsgemäß) : adverbe, invariable, avec accent circonflexe." },
  { t: 'Accords', q: "Les sommes ___ par le défunt reviennent à la succession.", o: ['laissées', 'laissés', 'laissé'], a: 0, e: "Participe employé comme adjectif : accord avec « les sommes » (féminin pluriel)." },
  { t: 'Accords', q: "Le délai est de trois mois et ___.", o: ['demi', 'demie', 'demis'], a: 0, e: "Après un nom masculin (mois), « et demi » s'accorde en genre : demi. « Une heure et demie » au féminin." },
  { t: 'Accords', q: "___ les pièces doivent être produites en original.", o: ['Toutes', 'Tous', 'Tout'], a: 0, e: "« Tout » déterminant s'accorde avec le nom : toutes les pièces." },
  { t: 'Accords', q: "Les héritiers sont ___ d'accord sur le partage.", o: ['tout à fait', 'tous à fait', 'toute à fait'], a: 0, e: "« Tout à fait » est une locution adverbiale invariable." },
  // Participe présent et adjectif verbal
  { t: 'Participe présent', q: "Les faits ___ le litige remontent à 2019.", o: ['précédant', 'précédent', 'précédents'], a: 0, e: "Verbe avec complément (précéder le litige) → participe présent en -ant, invariable." },
  { t: 'Participe présent', q: "Selon la jurisprudence ___, la clause est nulle.", o: ['précédente', 'précédante', 'précédant'], a: 0, e: "Adjectif (qualité) → « précédent(e) », qui s'accorde. Même logique : négligent / négligeant." },
  { t: 'Participe présent', q: "Le demandeur a présenté des arguments ___.", o: ['convaincants', 'convainquants', 'convainquant'], a: 0, e: "Adjectif verbal : « convaincant(s) ». Le participe présent s'écrit « convainquant »." },
  { t: 'Participe présent', q: "Les créanciers, ___ leurs droits menacés, ont saisi le juge.", o: ['estimant', 'estimants', 'estimantes'], a: 0, e: "Participe présent (avec complément) : toujours invariable." },
  // Voix passive et tournures impersonnelles
  { t: 'Passif et impersonnel', q: "« Die Klage wird abgewiesen. » → La demande ___.", o: ['est rejetée', 'devient rejetée', 'se rejette'], a: 0, e: "Le passif allemand en « werden » se rend par « être » + participe en français." },
  { t: 'Passif et impersonnel', q: "« Es wird darauf hingewiesen, dass … » → ___ que…", o: ['Il est rappelé', 'Il devient rappelé', 'On devient rappelé'], a: 0, e: "Passif impersonnel allemand → « Il est rappelé / indiqué / précisé que »." },
  { t: 'Passif et impersonnel', q: "« Hierüber ist zu entscheiden. » → Il ___ statuer sur ce point.", o: ['y a lieu de', 'est à', 'faut que'], a: 0, e: "« Il y a lieu de » + infinitif : tournure juridique pour « es ist … zu »." },
  { t: 'Passif et impersonnel', q: "« Der Antrag ist zurückzuweisen. » → La requête ___.", o: ['doit être rejetée', 'est à rejeter par', 'est rejetante'], a: 0, e: "« sein + zu + infinitif » exprime une obligation → « doit être » + participe." }
);

/* ===== Fiches de règles (affichées avant la première question d'un thème et dans « Règles ») ===== */
const RULES = {
  'Subjonctif': ["Le subjonctif s'emploie après les expressions de nécessité, de volonté, de doute ou de sentiment : il faut que, il est indispensable que, exiger que, ordonner que, douter que.", "Il suit aussi certaines conjonctions : bien que, afin que, pour que, avant que, sans que, à condition que, à supposer que.", "Mais l'indicatif après : il est probable que, après que, dès que, prétendre que, espérer que.", "Astuce germanophone : là où l'allemand dit simplement « dass … », le français choisit le mode selon le verbe ou la conjonction qui précède."],
  'Pronoms relatifs': ["« qui » = sujet ; « que » = complément direct.", "« dont » remplace un complément introduit par « de » : avoir besoin de → dont nous avons besoin ; parler de → dont je parle.", "Après une préposition (devant, sur, avec…) : lequel, laquelle, lesquels (devant lequel, sur laquelle).", "Après une locution prépositive en « de » (en vertu de, à l'issue de) : duquel, de laquelle, jamais « dont ».", "« où » pour le lieu et le temps : le jour où, le tribunal où."],
  'Participe passé': ["Avec « être » : accord avec le sujet (les délais ont été fixés).", "Avec « avoir » : accord avec le complément direct seulement s'il est placé AVANT le verbe (les pièces que vous avez transmises).", "Verbes pronominaux : accord avec le sujet si le pronom est complément direct (elles se sont entendues), pas d'accord si le complément direct suit (ils se sont réservé le droit).", "Cas fixes : « se rendre compte » est invariable ; « ci-joint » est invariable en tête de phrase, variable après le nom."],
  'Temps et modes': ["Jamais de conditionnel après « si » d'hypothèse : si + imparfait → conditionnel (si le défunt avait laissé un testament, la loi ne s'appliquerait pas).", "Futur dans le passé : conditionnel (il a indiqué qu'il signerait).", "Information non vérifiée (allemand : « soll … haben ») : conditionnel (le défunt aurait possédé…).", "Après « dès que », « lorsque » avec une idée de futur, le français met le futur, là où l'allemand garde le présent.", "« depuis » + présent ou imparfait pour une action qui dure (seit)."],
  'Constructions': ["Les verbes juridiques ont des prépositions fixes : faire droit à, procéder à, se prévaloir de, incomber à, accuser réception de, convenir de.", "Formules figées : à compter de, conformément à, en vertu de, à l'effet de, susceptible d'appel.", "Apprends-les comme un bloc, avec leur préposition, comme tu le ferais pour « Anspruch auf etwas haben »."],
  'Registre': ["Le registre juridique préfère les tournures soutenues : à la suite de (plutôt que suite à), bien que (jamais malgré que).", "Verbes techniques : on interjette appel, on prononce la nullité, on dresse un acte, on saisit une juridiction, on déboute un demandeur.", "À un notaire ou un avocat : « Maître », dans l'adresse comme dans la formule de politesse."],
  'Calques': ["Méfie-toi des faux amis : die Akte = le dossier (pas l'acte), die Kaution = le dépôt de garantie (pas la caution), der Konkurs = la faillite.", "Ne traduis pas mot à mot les tournures allemandes : « Die Klage wird abgewiesen » → « La demande est rejetée » / « Le demandeur est débouté ».", "Au tribunal, « die Verhandlung » est « l'audience », pas « la négociation »."],
  'Pronoms y et en': ["« en » remplace un complément introduit par « de » : prendre connaissance de → en prendre connaissance ; tenir compte de → en tenir compte.", "« y » remplace un complément introduit par « à » (pour une chose) : tenir à → y tenir ; donner suite à → y donner suite.", "Pour une personne, on utilise « lui / leur » (s'adresser à quelqu'un → lui), pas « y »."],
  'Négation': ["« ne … que » = seulement (nur) : il n'a produit qu'une pièce.", "« ne … ni … ni » = weder … noch : il n'est ni daté ni signé.", "« ne » explétif : après « avant que », « à moins que », « craindre que », un « ne » sans valeur négative est possible en style soutenu (avant que le délai ne soit expiré).", "Après « sans que », on évite le « ne » à l'écrit soigné."],
  'Accords': ["« tout » déterminant s'accorde (toutes les pièces) ; « tout à fait » est invariable.", "« demi » : invariable devant le nom avec trait d'union (une demi-heure) ; après le nom, accord en genre seulement (trois mois et demi, une heure et demie).", "Le participe employé comme adjectif s'accorde avec le nom (les sommes laissées par le défunt).", "« dûment », « indûment » : adverbes invariables, avec accent circonflexe."],
  'Participe présent': ["Le participe présent (-ant) exprime une action, il a souvent un complément et reste invariable : les faits précédant le litige.", "L'adjectif verbal exprime une qualité et s'accorde : la jurisprudence précédente, des arguments convaincants.", "L'orthographe change parfois : précédant / précédent, négligeant / négligent, convainquant / convaincant, fatiguant / fatigant."],
  'Passif et impersonnel': ["Le passif allemand en « werden » se traduit par « être » + participe : die Klage wird abgewiesen → la demande est rejetée.", "« sein + zu + infinitif » (ist zurückzuweisen) exprime une obligation : doit être rejeté(e), ou « il y a lieu de rejeter ».", "Les passifs impersonnels (es wird darauf hingewiesen) deviennent : il est rappelé que, il est précisé que, il convient de noter que."]
};

/* ===== Conjugaison =====
   pr = présent (6 personnes), imp = radical de l'imparfait, fut = radical du futur et du conditionnel,
   subj = subjonctif présent (6 personnes), ps = passé simple (il, ils), pp = participe passé */
const CONJ = {
  'être': { pr: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'], imp: 'ét', fut: 'ser', subj: ['sois', 'sois', 'soit', 'soyons', 'soyez', 'soient'], ps: ['fut', 'furent'], pp: 'été' },
  'avoir': { pr: ['ai', 'as', 'a', 'avons', 'avez', 'ont'], imp: 'av', fut: 'aur', subj: ['aie', 'aies', 'ait', 'ayons', 'ayez', 'aient'], ps: ['eut', 'eurent'], pp: 'eu' },
  'aller': { pr: ['vais', 'vas', 'va', 'allons', 'allez', 'vont'], imp: 'all', fut: 'ir', subj: ['aille', 'ailles', 'aille', 'allions', 'alliez', 'aillent'], ps: ['alla', 'allèrent'], pp: 'allé' },
  'faire': { pr: ['fais', 'fais', 'fait', 'faisons', 'faites', 'font'], imp: 'fais', fut: 'fer', subj: ['fasse', 'fasses', 'fasse', 'fassions', 'fassiez', 'fassent'], ps: ['fit', 'firent'], pp: 'fait' },
  'pouvoir': { pr: ['peux', 'peux', 'peut', 'pouvons', 'pouvez', 'peuvent'], imp: 'pouv', fut: 'pourr', subj: ['puisse', 'puisses', 'puisse', 'puissions', 'puissiez', 'puissent'], ps: ['put', 'purent'], pp: 'pu' },
  'devoir': { pr: ['dois', 'dois', 'doit', 'devons', 'devez', 'doivent'], imp: 'dev', fut: 'devr', subj: ['doive', 'doives', 'doive', 'devions', 'deviez', 'doivent'], ps: ['dut', 'durent'], pp: 'dû' },
  'vouloir': { pr: ['veux', 'veux', 'veut', 'voulons', 'voulez', 'veulent'], imp: 'voul', fut: 'voudr', subj: ['veuille', 'veuilles', 'veuille', 'voulions', 'vouliez', 'veuillent'], ps: ['voulut', 'voulurent'], pp: 'voulu' },
  'savoir': { pr: ['sais', 'sais', 'sait', 'savons', 'savez', 'savent'], imp: 'sav', fut: 'saur', subj: ['sache', 'saches', 'sache', 'sachions', 'sachiez', 'sachent'], ps: ['sut', 'surent'], pp: 'su' },
  'venir': { pr: ['viens', 'viens', 'vient', 'venons', 'venez', 'viennent'], imp: 'ven', fut: 'viendr', subj: ['vienne', 'viennes', 'vienne', 'venions', 'veniez', 'viennent'], ps: ['vint', 'vinrent'], pp: 'venu' },
  'tenir': { pr: ['tiens', 'tiens', 'tient', 'tenons', 'tenez', 'tiennent'], imp: 'ten', fut: 'tiendr', subj: ['tienne', 'tiennes', 'tienne', 'tenions', 'teniez', 'tiennent'], ps: ['tint', 'tinrent'], pp: 'tenu' },
  'prendre': { pr: ['prends', 'prends', 'prend', 'prenons', 'prenez', 'prennent'], imp: 'pren', fut: 'prendr', subj: ['prenne', 'prennes', 'prenne', 'prenions', 'preniez', 'prennent'], ps: ['prit', 'prirent'], pp: 'pris' },
  'mettre': { pr: ['mets', 'mets', 'met', 'mettons', 'mettez', 'mettent'], imp: 'mett', fut: 'mettr', subj: ['mette', 'mettes', 'mette', 'mettions', 'mettiez', 'mettent'], ps: ['mit', 'mirent'], pp: 'mis' },
  'dire': { pr: ['dis', 'dis', 'dit', 'disons', 'dites', 'disent'], imp: 'dis', fut: 'dir', subj: ['dise', 'dises', 'dise', 'disions', 'disiez', 'disent'], ps: ['dit', 'dirent'], pp: 'dit' },
  'voir': { pr: ['vois', 'vois', 'voit', 'voyons', 'voyez', 'voient'], imp: 'voy', fut: 'verr', subj: ['voie', 'voies', 'voie', 'voyions', 'voyiez', 'voient'], ps: ['vit', 'virent'], pp: 'vu' },
  'recevoir': { pr: ['reçois', 'reçois', 'reçoit', 'recevons', 'recevez', 'reçoivent'], imp: 'recev', fut: 'recevr', subj: ['reçoive', 'reçoives', 'reçoive', 'recevions', 'receviez', 'reçoivent'], ps: ['reçut', 'reçurent'], pp: 'reçu' },
  'acquérir': { pr: ['acquiers', 'acquiers', 'acquiert', 'acquérons', 'acquérez', 'acquièrent'], imp: 'acquér', fut: 'acquerr', subj: ['acquière', 'acquières', 'acquière', 'acquérions', 'acquériez', 'acquièrent'], ps: ['acquit', 'acquirent'], pp: 'acquis' },
  'résoudre': { pr: ['résous', 'résous', 'résout', 'résolvons', 'résolvez', 'résolvent'], imp: 'résolv', fut: 'résoudr', subj: ['résolve', 'résolves', 'résolve', 'résolvions', 'résolviez', 'résolvent'], ps: ['résolut', 'résolurent'], pp: 'résolu' },
  'joindre': { pr: ['joins', 'joins', 'joint', 'joignons', 'joignez', 'joignent'], imp: 'joign', fut: 'joindr', subj: ['joigne', 'joignes', 'joigne', 'joignions', 'joigniez', 'joignent'], ps: ['joignit', 'joignirent'], pp: 'joint' },
  'convaincre': { pr: ['convaincs', 'convaincs', 'convainc', 'convainquons', 'convainquez', 'convainquent'], imp: 'convainqu', fut: 'convaincr', subj: ['convainque', 'convainques', 'convainque', 'convainquions', 'convainquiez', 'convainquent'], ps: ['convainquit', 'convainquirent'], pp: 'convaincu' },
  'produire': { pr: ['produis', 'produis', 'produit', 'produisons', 'produisez', 'produisent'], imp: 'produis', fut: 'produir', subj: ['produise', 'produises', 'produise', 'produisions', 'produisiez', 'produisent'], ps: ['produisit', 'produisirent'], pp: 'produit' },
  'appeler': { pr: ['appelle', 'appelles', 'appelle', 'appelons', 'appelez', 'appellent'], imp: 'appel', fut: 'appeller', subj: ['appelle', 'appelles', 'appelle', 'appelions', 'appeliez', 'appellent'], ps: ['appela', 'appelèrent'], pp: 'appelé' },
  'interjeter': { pr: ['interjette', 'interjettes', 'interjette', 'interjetons', 'interjetez', 'interjettent'], imp: 'interjet', fut: 'interjetter', subj: ['interjette', 'interjettes', 'interjette', 'interjetions', 'interjetiez', 'interjettent'], ps: ['interjeta', 'interjetèrent'], pp: 'interjeté' }
};
const TENSES = {
  pr: { nom: 'Présent', cadre: "Aujourd'hui, {p} ___.", regle: "Formes irrégulières à connaître par cœur, surtout aux 3es personnes : il doit / ils doivent, il reçoit / ils reçoivent." },
  imp: { nom: 'Imparfait', cadre: 'À cette époque, {p} ___.', regle: "Radical de « nous » au présent + -ais, -ais, -ait, -ions, -iez, -aient (nous devons → je devais). Seule exception : être → j'étais." },
  fut: { nom: 'Futur', cadre: 'Demain, {p} ___.', regle: "Radical du futur + -ai, -as, -a, -ons, -ez, -ont. Les radicaux irréguliers sont les mêmes qu'au conditionnel : pourr-, devr-, viendr-, recevr-." },
  cond: { nom: 'Conditionnel présent', cadre: 'Si c’était possible, {p} ___.', regle: "Radical du futur + terminaisons de l'imparfait : -ais, -ais, -ait, -ions, -iez, -aient (je pourrais, nous devrions)." },
  subj: { nom: 'Subjonctif présent', cadre: 'Il faut que {p} ___.', regle: "Formé en général sur « ils » au présent (ils doivent → que je doive), mais avec des formes très irrégulières : que je sois, aie, fasse, puisse, sache, veuille, aille." },
  ps: { nom: 'Passé simple', cadre: 'Ce jour-là, {p} ___.', regle: "Temps du récit écrit, fréquent dans les jugements et les textes historiques. Aux 3es personnes : il fut / ils furent, il dut / ils durent, il prit / ils prirent." },
  pp: { nom: 'Participe passé', cadre: 'Le juge a ___.', regle: "À connaître pour tous les temps composés : dû (avec accent, au masculin singulier seulement), reçu, acquis, résolu, joint, convaincu." }
};
const PERSONS = ['je', 'tu', 'il', 'nous', 'vous', 'ils'];

/* ===== Successions : vocabulaire renforcé (thème mis en avant) ===== */
VOCAB.push(
  ['das Erbrecht', 'le droit des successions', '', 'succ'],
  ['der Erbfall', "l'ouverture de la succession", '', 'succ'],
  ['der Miterbe', 'le cohéritier', '', 'succ'],
  ['die Abkömmlinge', 'les descendants', '', 'succ'],
  ['die Seitenverwandten', 'les collatéraux', '', 'succ'],
  ['die Erbquote', 'la quote-part successorale', '', 'succ'],
  ['die Nachlassverbindlichkeiten', 'le passif successoral', '', 'succ'],
  ['die Erbenhaftung', 'la responsabilité des héritiers pour les dettes successorales', '', 'succ'],
  ['die Ausschlagungsfrist', "le délai d'option", 'DE : six semaines (six mois si le défunt résidait à l’étranger) ; FR : l’héritier ne peut être contraint d’opter avant quatre mois.', 'succ'],
  ['die Enterbung', "l'exhérédation", '', 'succ'],
  ['der Erbverzicht', 'la renonciation anticipée à succession', 'Équivalent fonctionnel : la RAAR (renonciation anticipée à l’action en réduction).', 'succ'],
  ['der Pflichtteilsergänzungsanspruch', "l'action en réduction", 'Équivalent fonctionnel : en DE, complément de réserve pour les donations des dix dernières années.', 'succ'],
  ['die Ausgleichung', 'le rapport des libéralités', '', 'succ'],
  ['das Vorausvermächtnis', 'le legs préciputaire', '', 'succ'],
  ['die Auflage', 'la charge (d’une libéralité)', '', 'succ'],
  ['die Teilungsanordnung', 'la disposition de partage', '', 'succ'],
  ['die Vor- und Nacherbschaft', 'la libéralité graduelle', '≈ substitution fidéicommissaire.', 'succ'],
  ['der Vorerbe', 'le grevé', 'Dans une libéralité graduelle.', 'succ'],
  ['der Nacherbe', "l'appelé", 'Dans une libéralité graduelle.', 'succ'],
  ['das Berliner Testament', 'le testament berlinois', 'Testament conjonctif entre époux, prohibé sous cette forme en droit français.', 'succ'],
  ['die Schenkung von Todes wegen', 'la donation à cause de mort', '', 'succ'],
  ['die Testamentseröffnung', "l'ouverture du testament", '', 'succ'],
  ['das Zentrale Testamentsregister', 'le fichier central des dispositions de dernières volontés', '≈ FCDDV en France.', 'succ'],
  ['die Nachlassverwaltung', "l'administration de la succession", '', 'succ'],
  ['der Pflichtteilsanspruch', 'la créance de réserve', 'En DE, droit à une somme d’argent (et non à une part des biens).', 'succ']
);
const FOCUS_THEME = 'succ';
