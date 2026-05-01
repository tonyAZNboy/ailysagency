/**
 * Comprehensive accent pass for the 8 competitor comparison FR posts.
 * Two passes:
 *  1. Whole-word substitutions for unambiguous terms (~250 entries)
 *  2. Phrase-level " a " → " à " preposition substitutions (safe contexts only)
 *
 * Followed by a post-pass that strips accents from heading IDs and import
 * paths to keep URL anchors and module resolution working.
 *
 * Run: node scripts/add-fr-accents-comparison-posts.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const FILES = [
  'src/blog/posts/ailys-product/ailys-vs-digitad-seo-quebec.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-bloom-agence-montreal.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-major-tom-agence-canada.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-prostar-seo-canada.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-bofu-marketing-quebec.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-adviso-conseil-numerique.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-rablab-creative-montreal.fr.tsx',
  'src/blog/posts/ailys-product/ailys-vs-wsi-canada-franchise.fr.tsx',
]

const SUBS = [
  // Geography
  ['Quebec', 'Québec'],
  ['Quebecois', 'Québécois'], ['quebecois', 'québécois'],
  ['Quebecoise', 'Québécoise'], ['quebecoise', 'québécoise'],
  ['Quebecoises', 'Québécoises'], ['quebecoises', 'québécoises'],
  ['Montreal', 'Montréal'],
  ['Montrealais', 'Montréalais'], ['montrealais', 'montréalais'],
  ['Montrealaise', 'Montréalaise'], ['montrealaise', 'montréalaise'],
  ['montrealaises', 'montréalaises'],
  // Common nouns
  ['francais', 'français'], ['Francais', 'Français'],
  ['francaise', 'française'], ['francaises', 'françaises'],
  ['commercant', 'commerçant'], ['commercants', 'commerçants'],
  ['commercante', 'commerçante'], ['commercantes', 'commerçantes'],
  ['operateur', 'opérateur'], ['operateurs', 'opérateurs'],
  ['operatrice', 'opératrice'],
  ['proprietaire', 'propriétaire'], ['proprietaires', 'propriétaires'],
  ['categorie', 'catégorie'], ['categories', 'catégories'],
  ['equipe', 'équipe'], ['equipes', 'équipes'],
  ['donnees', 'données'],
  ['reputation', 'réputation'],
  ['reservation', 'réservation'], ['reservations', 'réservations'],
  ['identite', 'identité'], ['identites', 'identités'],
  ['fidelite', 'fidélité'],
  ['publicite', 'publicité'], ['publicites', 'publicités'],
  ['marche', 'marché'], ['marches', 'marchés'],
  ['etude', 'étude'], ['etudes', 'études'],
  ['ecart', 'écart'], ['ecarts', 'écarts'],
  ['echelle', 'échelle'], ['echelles', 'échelles'],
  ['echange', 'échange'], ['echanges', 'échanges'],
  ['element', 'élément'], ['elements', 'éléments'],
  ['ebauche', 'ébauche'], ['ebauches', 'ébauches'],
  ['etiquette', 'étiquette'], ['etiquettes', 'étiquettes'],
  ['etage', 'étage'], ['etages', 'étages'],
  ['lecons', 'leçons'], ['lecon', 'leçon'],
  ['systeme', 'système'], ['systemes', 'systèmes'],
  ['probleme', 'problème'], ['problemes', 'problèmes'],
  ['modele', 'modèle'], ['modeles', 'modèles'],
  ['scenario', 'scénario'], ['scenarios', 'scénarios'],
  ['reference', 'référence'], ['references', 'références'],
  ['referentiel', 'référentiel'],
  ['conference', 'conférence'], ['conferences', 'conférences'],
  ['preference', 'préférence'], ['preferences', 'préférences'],
  ['responsabilite', 'responsabilité'], ['responsabilites', 'responsabilités'],
  ['credibilite', 'crédibilité'],
  ['fiabilite', 'fiabilité'],
  ['stabilite', 'stabilité'],
  ['agilite', 'agilité'],
  ['stratege', 'stratège'], ['strateges', 'stratèges'],
  ['strategie', 'stratégie'], ['strategies', 'stratégies'],
  ['region', 'région'], ['regions', 'régions'],
  ['decision', 'décision'], ['decisions', 'décisions'],
  ['definition', 'définition'],
  ['execution', 'exécution'],
  ['integration', 'intégration'],
  ['evaluation', 'évaluation'], ['evaluations', 'évaluations'],
  ['amelioration', 'amélioration'],
  ['representation', 'représentation'],
  ['presence', 'présence'],
  ['experience', 'expérience'], ['experiences', 'expériences'],
  ['decouverte', 'découverte'],
  ['reseau', 'réseau'], ['reseaux', 'réseaux'],
  ['cout', 'coût'], ['couts', 'coûts'],
  ['tete', 'tête'], ['tetes', 'têtes'],
  ['fenetre', 'fenêtre'], ['fenetres', 'fenêtres'],
  ['repere', 'repère'], ['reperes', 'repères'],
  ['repertoire', 'répertoire'], ['repertoires', 'répertoires'],
  ['portee', 'portée'], ['portees', 'portées'],
  ['annee', 'année'], ['annees', 'années'],
  ['siege', 'siège'], ['sieges', 'sièges'],
  // Adjectives
  ['regional', 'régional'], ['regionale', 'régionale'],
  ['regionaux', 'régionaux'], ['regionales', 'régionales'],
  ['general', 'général'], ['generale', 'générale'],
  ['generaux', 'généraux'], ['generales', 'générales'],
  ['generative', 'générative'], ['generatif', 'génératif'],
  ['generation', 'génération'],
  ['generaliste', 'généraliste'], ['generalistes', 'généralistes'],
  ['specialise', 'spécialisé'], ['specialisee', 'spécialisée'],
  ['specialises', 'spécialisés'], ['specialisees', 'spécialisées'],
  ['specialiste', 'spécialiste'], ['specialistes', 'spécialistes'],
  ['specifique', 'spécifique'], ['specifiques', 'spécifiques'],
  ['different', 'différent'], ['differente', 'différente'],
  ['differents', 'différents'], ['differentes', 'différentes'],
  ['difference', 'différence'], ['differences', 'différences'],
  ['interieur', 'intérieur'], ['interieure', 'intérieure'],
  ['exterieur', 'extérieur'], ['exterieure', 'extérieure'],
  ['precis', 'précis'], ['precise', 'précise'],
  ['precisement', 'précisément'], ['precision', 'précision'],
  ['adequat', 'adéquat'], ['adequate', 'adéquate'],
  ['celebre', 'célèbre'], ['celebres', 'célèbres'],
  ['eleve', 'élevé'], ['elevee', 'élevée'],
  ['eleves', 'élevés'], ['elevees', 'élevées'],
  ['etroit', 'étroit'], ['etroite', 'étroite'],
  ['etroits', 'étroits'], ['etroites', 'étroites'],
  ['honnete', 'honnête'], ['honnetes', 'honnêtes'],
  ['veridique', 'véridique'],
  ['recent', 'récent'], ['recente', 'récente'],
  ['recents', 'récents'], ['recentes', 'récentes'],
  ['premiere', 'première'], ['premieres', 'premières'],
  ['derniere', 'dernière'], ['dernieres', 'dernières'],
  ['regulier', 'régulier'], ['reguliere', 'régulière'],
  ['regulierement', 'régulièrement'],
  ['particuliere', 'particulière'],
  ['particulierement', 'particulièrement'],
  ['frequent', 'fréquent'], ['frequente', 'fréquente'],
  ['frequents', 'fréquents'], ['frequentes', 'fréquentes'],
  ['frequence', 'fréquence'],
  ['evolutif', 'évolutif'], ['evolutive', 'évolutive'],
  ['evolution', 'évolution'],
  ['etablie', 'établie'], ['etabli', 'établi'],
  ['etablis', 'établis'], ['etablies', 'établies'],
  ['previsible', 'prévisible'], ['previsibles', 'prévisibles'],
  ['immediat', 'immédiat'], ['immediate', 'immédiate'],
  ['immediats', 'immédiats'], ['immediates', 'immédiates'],
  ['immediatement', 'immédiatement'],
  ['concrete', 'concrète'],
  ['fideles', 'fidèles'], ['fidele', 'fidèle'],
  ['mesuree', 'mesurée'], ['mesurees', 'mesurées'],
  ['avancee', 'avancée'], ['avance', 'avancé'],
  ['avances', 'avancés'], ['avancees', 'avancées'],
  ['anglais', 'anglais'], // no accent - English
  ['anglaise', 'anglaise'],
  ['capacite', 'capacité'], ['capacites', 'capacités'],
  // Verbs
  ['developpe', 'développé'], ['developpee', 'développée'],
  ['developpes', 'développés'], ['developpees', 'développées'],
  ['developpement', 'développement'], ['developpements', 'développements'],
  ['developper', 'développer'], ['developpeur', 'développeur'],
  ['deploye', 'déployé'], ['deployee', 'déployée'],
  ['deploiement', 'déploiement'], ['deployer', 'déployer'],
  ['decouvrir', 'découvrir'], ['decouvre', 'découvre'],
  ['rediger', 'rédiger'], ['redige', 'rédigé'],
  ['redigee', 'rédigée'], ['rediges', 'rédigés'],
  ['redigees', 'rédigées'],
  ['redacteur', 'rédacteur'], ['redactrice', 'rédactrice'],
  ['redaction', 'rédaction'],
  ['publie', 'publié'], ['publiee', 'publiée'],
  ['publies', 'publiés'], ['publiees', 'publiées'],
  ['evaluer', 'évaluer'], ['evalue', 'évalue'], ['evaluee', 'évaluée'],
  ['executif', 'exécutif'], ['executive', 'exécutive'],
  ['execute', 'exécute'], ['executer', 'exécuter'],
  ['gere', 'gère'], ['gerer', 'gérer'], ['geree', 'gérée'],
  ['integre', 'intégré'], ['integree', 'intégrée'],
  ['integrant', 'intégrant'], ['integrer', 'intégrer'],
  ['ameliorer', 'améliorer'], ['ameliore', 'amélioré'],
  ['ameliorees', 'améliorées'],
  ['cree', 'créé'], ['creee', 'créée'], ['creer', 'créer'],
  ['creation', 'création'], ['creations', 'créations'],
  ['creatif', 'créatif'], ['creative', 'créative'],
  ['creatifs', 'créatifs'], ['creatives', 'créatives'],
  ['creativite', 'créativité'],
  ['etudier', 'étudier'],
  ['necessaire', 'nécessaire'], ['necessaires', 'nécessaires'],
  ['necessite', 'nécessite'], ['necessitent', 'nécessitent'],
  ['presente', 'présente'], ['presentes', 'présentes'],
  ['presenter', 'présenter'], ['presentant', 'présentant'],
  ['represente', 'représente'], ['representent', 'représentent'],
  ['representer', 'représenter'],
  ['identifie', 'identifié'], ['identifiee', 'identifiée'],
  ['repondent', 'répondent'], ['repondre', 'répondre'],
  ['reponse', 'réponse'], ['reponses', 'réponses'],
  ['preferer', 'préférer'], ['prefere', 'préfère'],
  ['proteger', 'protéger'], ['protege', 'protégé'],
  ['negocier', 'négocier'], ['negocie', 'négocié'],
  ['negociation', 'négociation'], ['negociations', 'négociations'],
  ['suggerent', 'suggèrent'], ['suggere', 'suggère'],
  ['definir', 'définir'], ['defini', 'défini'],
  ['definie', 'définie'], ['definit', 'définit'],
  ['decide', 'décide'], ['decidee', 'décidée'], ['decident', 'décident'],
  ['decisif', 'décisif'], ['decisive', 'décisive'],
  ['accumule', 'accumulé'], ['accumulee', 'accumulée'],
  ['ete', 'été'],
  ['etre', 'être'],
  ['tres', 'très'],
  ['meme', 'même'], ['memes', 'mêmes'],
  ['deja', 'déjà'],
  ['voila', 'voilà'],
  ['au-dela', 'au-delà'],
  ['cote', 'côté'], ['cotes', 'côtés'],
  ['controle', 'contrôle'], ['controles', 'contrôles'],
  ['controler', 'contrôler'],
  ['batie', 'bâtie'], ['bati', 'bâti'],
  ['batis', 'bâtis'], ['baties', 'bâties'],
  ['batir', 'bâtir'], ['batissent', 'bâtissent'],
  ['batit', 'bâtit'],
  ['surete', 'sûreté'],
  ['etranger', 'étranger'], ['etrangere', 'étrangère'],
  ['etrangers', 'étrangers'], ['etrangeres', 'étrangères'],
  ['experimente', 'expérimenté'], ['experimentee', 'expérimentée'],
  ['experimenter', 'expérimenter'],
  ['mene', 'mène'], ['menent', 'mènent'],
  ['leve', 'lève'], ['levent', 'lèvent'],
  ['cede', 'cède'], ['cedent', 'cèdent'],
  ['accede', 'accède'], ['accedent', 'accèdent'],
  ['propriete', 'propriété'], ['proprietes', 'propriétés'],
  ['ferent', 'fèrent'],
  ['ferment', 'ferment'], // no accent
  // Quiz / FAQ labels
  ['eclair', 'éclair'],
  // Dataset
  ['detaille', 'détaillé'], ['detaillee', 'détaillée'],
  ['detailler', 'détailler'], ['detail', 'détail'], ['details', 'détails'],
  ['operationnel', 'opérationnel'], ['operationnels', 'opérationnels'],
  ['operationnelle', 'opérationnelle'], ['operationnelles', 'opérationnelles'],
  ['communautaire', 'communautaire'], // no accent
  ['couvrent', 'couvrent'], // no accent
  ['fondee', 'fondée'], ['fonde', 'fondé'],
  ['fondes', 'fondés'], ['fondees', 'fondées'],
  // Common-prep noun forms
  ['etablissent', 'établissent'],
  ['etablit', 'établit'],
  // Plurals of accent words
  ['publiees', 'publiées'],
  // Unique words from posts
  ['fonctionnement', 'fonctionnement'], // no accent
  ['affirmation', 'affirmation'], // no accent
  ['hesitez', 'hésitez'], ['hesite', 'hésite'],
  ['reflechir', 'réfléchir'], ['reflechi', 'réfléchi'],
  ['fideliser', 'fidéliser'], ['fidelise', 'fidélisé'],
  // Round 3: minor accent words
  ['defaut', 'défaut'], ['defauts', 'défauts'],
  ['personnalise', 'personnalisé'], ['personnalisee', 'personnalisée'],
  ['personnalises', 'personnalisés'], ['personnalisees', 'personnalisées'],
  ['entree', 'entrée'], ['entrees', 'entrées'],
  ['periode', 'période'], ['periodes', 'périodes'],
  ['periodique', 'périodique'], ['periodiquement', 'périodiquement'],
  ['caracteristique', 'caractéristique'],
  ['caracteristiques', 'caractéristiques'],
  ['demarche', 'démarche'], ['demarches', 'démarches'],
  // Round 2: words missed in first pass
  ['numerique', 'numérique'], ['Numerique', 'Numérique'],
  ['numeriques', 'numériques'],
  ['priorite', 'priorité'], ['priorites', 'priorités'],
  ['denigrement', 'dénigrement'],
  ['inventee', 'inventée'], ['inventees', 'inventées'],
  ['invente', 'inventé'], ['inventes', 'inventés'],
  ['etabli', 'établi'], ['etabli', 'établi'],
  ['determine', 'déterminé'], ['determinee', 'déterminée'],
  ['determines', 'déterminés'], ['determinees', 'déterminées'],
  ['determinent', 'déterminent'], ['determiner', 'déterminer'],
  ['concue', 'conçue'], ['concu', 'conçu'],
  ['concues', 'conçues'], ['concus', 'conçus'],
  ['concevoir', 'concevoir'], // no accent
  ['conception', 'conception'], // no accent
  ['etende', 'étend'], ['etendent', 'étendent'],
  ['etendre', 'étendre'], ['etendu', 'étendu'],
  ['etendue', 'étendue'], ['etendus', 'étendus'],
  ['categorise', 'catégorisé'], ['categorisee', 'catégorisée'],
  ['debattre', 'débattre'], ['debat', 'débat'], ['debats', 'débats'],
  ['demarre', 'démarre'], ['demarrer', 'démarrer'],
  ['demarrent', 'démarrent'], ['demarrage', 'démarrage'],
  ['demande', 'demande'], // no accent
  ['demandent', 'demandent'], // no accent
  ['comparée', 'comparée'], // no change
  ['compare', 'comparé'], ['comparee', 'comparée'],
  ['compares', 'comparés'], ['comparees', 'comparées'],
  ['detrompe', 'détrompe'],
  ['certifications', 'certifications'], // no accent
  ['certifie', 'certifié'], ['certifiee', 'certifiée'],
  ['certifies', 'certifiés'], ['certifiees', 'certifiées'],
  ['certificat', 'certificat'], // no accent
  ['certain', 'certain'], // no accent
  ['certaine', 'certaine'], // no accent
  ['centre', 'centre'], // no accent
  ['centree', 'centrée'], ['centres', 'centres'],
  ['concurrentielle', 'concurrentielle'], // no accent
  ['suceptibilite', 'susceptibilité'],
  ['accumule', 'accumulé'], ['accumulees', 'accumulées'],
  ['acces', 'accès'],
  ['proces', 'procès'],
  ['progres', 'progrès'],
  ['exces', 'excès'],
  ['reussi', 'réussi'], ['reussie', 'réussie'],
  ['reussis', 'réussis'], ['reussies', 'réussies'],
  ['reussir', 'réussir'], ['reussite', 'réussite'],
  ['heberge', 'hébergé'], ['hebergee', 'hébergée'],
  ['hebergement', 'hébergement'],
  ['leger', 'léger'], ['legere', 'légère'],
  ['legers', 'légers'], ['legeres', 'légères'],
  ['ideal', 'idéal'], ['ideale', 'idéale'],
  ['ideaux', 'idéaux'], ['ideales', 'idéales'],
  ['detache', 'détaché'], ['detachee', 'détachée'],
  ['detail', 'détail'], ['details', 'détails'],
  ['detaille', 'détaillé'], ['detaillee', 'détaillée'],
  ['profil', 'profil'], // no accent
  ['profils', 'profils'],
  ['ressource', 'ressource'], // no accent
  ['ressources', 'ressources'],
  ['voila', 'voilà'],
  // Verbs ending -ee/-é where ascii eats the accent
  ['delivre', 'délivre'], ['delivrent', 'délivrent'],
  ['delivrer', 'délivrer'],
  ['decline', 'décline'], ['declinent', 'déclinent'],
  ['declarent', 'déclarent'], ['declare', 'déclare'],
  ['déclarer', 'déclarer'], // no change
  ['declarer', 'déclarer'],
  ['relais', 'relais'], // no accent
  ['relai', 'relai'],
  ['etalent', 'étalent'], ['etale', 'étalé'],
  ['echec', 'échec'], ['echecs', 'échecs'],
  ['echoue', 'échoué'], ['echouee', 'échouée'],
  ['echouer', 'échouer'], ['echouent', 'échouent'],
  // Misc
  ['emerger', 'émerger'], ['emergent', 'émergent'],
  ['emerge', 'émerge'], ['emergence', 'émergence'],
  ['etudient', 'étudient'], ['etudiees', 'étudiées'],
  ['etudie', 'étudié'], ['etudiee', 'étudiée'],
  ['etudies', 'étudiés'],
  ['ecrit', 'écrit'], ['ecrite', 'écrite'],
  ['ecrits', 'écrits'], ['ecrites', 'écrites'],
  ['ecrire', 'écrire'], ['ecriture', 'écriture'],
  ['ecran', 'écran'], ['ecrans', 'écrans'],
  ['rappelle', 'rappelle'], // no accent
  ['rappelez', 'rappelez'],
  ['interactive', 'interactive'], // no accent
  ['interactives', 'interactives'],
  ['interactif', 'interactif'],
  ['interactifs', 'interactifs'],
  ['narration', 'narration'], // no accent
  // Important brand-context
  ['Reviuzy', 'Reviuzy'], // brand stays
  ['Truvizy', 'Truvizy'], // brand stays
  // 'a' as preposition handled in PHRASES
]

// Phrase-level " a " → " à " safe substitutions
const PHRASES = [
  [/\ba la /g, 'à la '], [/\bA la /g, 'À la '],
  [/\ba l'/g, 'à l\''], [/\bA l'/g, 'À l\''],
  [/\ba un /g, 'à un '], [/\bA un /g, 'À un '],
  [/\ba une /g, 'à une '], [/\bA une /g, 'À une '],
  [/\ba des /g, 'à des '], [/\bA des /g, 'À des '],
  [/\ba ce /g, 'à ce '], [/\bA ce /g, 'À ce '],
  [/\ba cette /g, 'à cette '], [/\bA cette /g, 'À cette '],
  [/\ba ces /g, 'à ces '], [/\bA ces /g, 'À ces '],
  [/\ba chaque /g, 'à chaque '], [/\bA chaque /g, 'À chaque '],
  [/\ba travers /g, 'à travers '], [/\bA travers /g, 'À travers '],
  [/\ba partir /g, 'à partir '], [/\bA partir /g, 'À partir '],
  [/\ba propos /g, 'à propos '], [/\bA propos /g, 'À propos '],
  [/\ba cause /g, 'à cause '], [/\bA cause /g, 'À cause '],
  [/jusqu'a /g, "jusqu'à "],
  [/grace a /g, 'grâce à '], [/Grace a /g, 'Grâce à '],
  [/face a /g, 'face à '], [/Face a /g, 'Face à '],
  [/quant a /g, 'quant à '], [/Quant a /g, 'Quant à '],
  [/par rapport a /g, 'par rapport à '],
  [/Par rapport a /g, 'Par rapport à '],
  // Numerics: " a 600 " → " à 600 "
  [/\ba (\d)/g, 'à $1'],
  // Verb-then-prep idioms
  [/convient a /g, 'convient à '],
  [/conviennent a /g, 'conviennent à '],
  [/aide a /g, 'aide à '], [/aident a /g, 'aident à '],
  [/sert a /g, 'sert à '], [/servent a /g, 'servent à '],
  [/répondre a /g, 'répondre à '],
  [/cherche a /g, 'cherche à '], [/cherchent a /g, 'cherchent à '],
  [/comparer a /g, 'comparer à '],
  [/comparable a /g, 'comparable à '],
  [/cote a cote/g, 'côte à côte'], [/Cote a cote/g, 'Côte à côte'],
  [/face a face/g, 'face à face'],
  [/un a un/g, 'un à un'],
  // " a [ProperNoun]" → " à [ProperNoun]" - safe because lowercase 'a' before
  // a capitalized word is almost always the preposition (not avoir conjugation)
  [/\ba (Digitad|Bloom|Major|ProStar|Bofu|Adviso|Rablab|WSI|AiLys|Reviuzy|Truvizy|Quebec|Québec|Montreal|Montréal|Toronto|Vancouver|Calgary|Sherbrooke|Laval|Google|ChatGPT|Perplexity|Claude|Gemini|Bing|Meta|LinkedIn|TikTok|Anthropic|HubSpot|Klaviyo|Air|Banque|Cirque|Nespresso|New|Mile|Ouest|Sud|Nord|Est)/g, 'à $1'],
  // Common headers
  [/Quiz eclair/g, 'Quiz éclair'], [/QUIZ ECLAIR/g, 'QUIZ ÉCLAIR'],
  [/Bonne reponse/g, 'Bonne réponse'],
  [/Pas tout a fait/g, 'Pas tout à fait'],
  [/Questions frequentes/g, 'Questions fréquentes'],
]

function applyPass(content, list, isRegex = false) {
  let out = content
  for (const [from, to] of list) {
    if (isRegex) {
      out = out.replace(from, to)
    } else {
      const re = new RegExp(`\\b${from}\\b`, 'g')
      out = out.replace(re, to)
    }
  }
  return out
}

// Strip accents from heading IDs and import paths to keep URL anchors and
// module resolution working. This runs AFTER the accent additions to undo
// any damage to id="..." values and from="..." import paths.
function deaccentChars(s) {
  return s
    .replace(/[éèêë]/g, 'e').replace(/[ÉÈÊË]/g, 'E')
    .replace(/[àâä]/g, 'a').replace(/[ÀÂÄ]/g, 'A')
    .replace(/[îï]/g, 'i').replace(/[ÎÏ]/g, 'I')
    .replace(/[ôö]/g, 'o').replace(/[ÔÖ]/g, 'O')
    .replace(/[ùûü]/g, 'u').replace(/[ÙÛÜ]/g, 'U')
    .replace(/ç/g, 'c').replace(/Ç/g, 'C')
}

function sanitizeIdsAndImports(content) {
  let out = content
  // h2 id="..." anywhere
  out = out.replace(/(<h\d\s+id=")([^"]+)(")/g, (_, p1, val, p3) => p1 + deaccentChars(val) + p3)
  // headings array: { id: '...', text: '...' } - id values only
  out = out.replace(/(\{\s*id:\s*['"])([^'"]+)(['"])/g, (_, p1, val, p3) => p1 + deaccentChars(val) + p3)
  // import paths: from './...'
  out = out.replace(/(from\s+['"])(\.[^'"]+)(['"])/g, (_, p1, val, p3) => p1 + deaccentChars(val) + p3)
  return out
}

let totalChanges = 0
for (const rel of FILES) {
  const path = join(ROOT, rel)
  const before = readFileSync(path, 'utf-8')
  let after = applyPass(before, SUBS, false)
  after = applyPass(after, PHRASES, true)
  after = sanitizeIdsAndImports(after)
  const changed = before !== after
  if (changed) {
    writeFileSync(path, after)
    totalChanges++
    console.log(`  modified ${rel}`)
  } else {
    console.log(`  unchanged ${rel}`)
  }
}
console.log(`\nDone. ${totalChanges}/${FILES.length} files modified.`)
