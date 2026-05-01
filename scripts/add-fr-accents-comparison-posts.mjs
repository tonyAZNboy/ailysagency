/**
 * Comprehensive accent pass for the 8 competitor comparison FR posts.
 * Two passes:
 *  1. Whole-word substitutions for unambiguous terms
 *  2. Phrase-level substitutions for the safe " a " preposition cases
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

// ── Pass 1: whole-word substitutions ──
const SUBS = [
  // Geography + place names
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
  ['fournisseur', 'fournisseur'], // no accent
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
  ['epingle', 'épingle'], ['epingles', 'épingles'],
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
  ['specificite', 'spécificité'],
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
  ['expertise', 'expertise'], // no accent
  ['decouverte', 'découverte'],
  ['reseau', 'réseau'], ['reseaux', 'réseaux'],
  ['cout', 'coût'], ['couts', 'coûts'],
  ['tete', 'tête'], ['tetes', 'têtes'],
  ['fenetre', 'fenêtre'], ['fenetres', 'fenêtres'],
  ['repere', 'repère'], ['reperes', 'repères'],
  ['repertoire', 'répertoire'], ['repertoires', 'répertoires'],
  ['portee', 'portée'], ['portees', 'portées'],
  ['annee', 'année'], ['annees', 'années'],
  // Common adjectives
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
  ['premier', 'premier'], // no accent
  ['premiere', 'première'], ['premieres', 'premières'],
  ['derniere', 'dernière'], ['dernieres', 'dernières'],
  ['regulier', 'régulier'], ['reguliere', 'régulière'],
  ['regulierement', 'régulièrement'],
  ['particulier', 'particulier'], // no accent
  ['particuliere', 'particulière'],
  ['particulierement', 'particulièrement'],
  ['frequent', 'fréquent'], ['frequente', 'fréquente'],
  ['frequents', 'fréquents'], ['frequentes', 'fréquentes'],
  ['frequence', 'fréquence'], ['frequences', 'fréquences'],
  ['evolutif', 'évolutif'], ['evolutive', 'évolutive'],
  ['evolution', 'évolution'],
  ['etablie', 'établie'], ['etabli', 'établi'],
  ['etablis', 'établis'], ['etablies', 'établies'],
  ['previsible', 'prévisible'], ['previsibles', 'prévisibles'],
  ['immediat', 'immédiat'], ['immediate', 'immédiate'],
  ['immediats', 'immédiats'], ['immediates', 'immédiates'],
  ['immediatement', 'immédiatement'],
  ['concret', 'concret'], // no accent
  ['concrete', 'concrète'],
  ['fideles', 'fidèles'], ['fidele', 'fidèle'],
  ['mesure', 'mesure'], // no accent (noun)
  ['mesuree', 'mesurée'], ['mesures', 'mesures'],
  ['mesurees', 'mesurées'],
  ['avancee', 'avancée'], ['avance', 'avancé'],
  ['avances', 'avancés'], ['avancees', 'avancées'],
  // Verbs (common forms)
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
  ['amelioree', 'améliorée'],
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
  ['identifier', 'identifier'], // no accent
  ['identifie', 'identifié'], ['identifiee', 'identifiée'],
  ['identification', 'identification'],
  ['repondent', 'répondent'], ['repondre', 'répondre'],
  ['reponse', 'réponse'], ['reponses', 'réponses'],
  ['preferer', 'préférer'], ['prefere', 'préfère'],
  ['proteger', 'protéger'], ['protege', 'protégé'],
  ['negocier', 'négocier'], ['negocie', 'négocié'],
  ['negociation', 'négociation'], ['negociations', 'négociations'],
  ['suggerent', 'suggèrent'], ['suggere', 'suggère'],
  ['ferent', 'fèrent'], // for "different" already handled above
  ['definir', 'définir'], ['defini', 'défini'],
  ['definie', 'définie'], ['definit', 'définit'],
  ['decide', 'décide'], ['decidee', 'décidée'], ['decident', 'décident'],
  ['decisif', 'décisif'], ['decisive', 'décisive'],
  ['fonctionne', 'fonctionne'], // no accent
  ['fonctionnent', 'fonctionnent'],
  ['fonctionner', 'fonctionner'],
  ['fonctionnement', 'fonctionnement'],
  ['accumule', 'accumulé'], ['accumulee', 'accumulée'],
  ['accumulent', 'accumulent'],
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
  ['batir', 'bâtir'],
  ['suret', 'sûret'], // for sûreté (avoid surete=sûreté risk to surf)
  ['surete', 'sûreté'],
  ['etranger', 'étranger'], ['etrangere', 'étrangère'],
  ['etrangers', 'étrangers'], ['etrangeres', 'étrangères'],
  ['expérimente', 'expérimente'], // already handled
  ['experimente', 'expérimenté'], ['experimentee', 'expérimentée'],
  ['experimenter', 'expérimenter'],
  ['responsable', 'responsable'], // no accent
  ['responsables', 'responsables'],
  ['affirme', 'affirme'], // no accent
  ['affirment', 'affirment'],
  ['affirmation', 'affirmation'],
  // Quiz / FAQ labels
  ['Quiz eclair', 'Quiz éclair'], ['QUIZ ECLAIR', 'QUIZ ÉCLAIR'],
  ['Bonne reponse', 'Bonne réponse'],
  ['Pas tout a fait', 'Pas tout à fait'],
  ['Questions frequentes', 'Questions fréquentes'],
  ['comment-choisir', 'comment-choisir'], // ID, no change
  ['eclair', 'éclair'],
  // Truvizy / Reviuzy stay
  ['parlent', 'parlent'], // no accent
  ['parle', 'parle'], // no accent (single, common)
]

// ── Pass 2: phrase-level " a " → " à " preposition substitutions ──
// Only safe contexts where "a" is unambiguously the preposition.
// Order matters: longer phrases first.
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
  [/\ba cote /g, 'à côté '], [/\ba côté /g, 'à côté '],
  [/jusqu'a /g, "jusqu'à "],
  [/grace a /g, 'grâce à '], [/Grace a /g, 'Grâce à '],
  [/face a /g, 'face à '], [/Face a /g, 'Face à '],
  [/quant a /g, 'quant à '], [/Quant a /g, 'Quant à '],
  [/contraire a /g, 'contraire à '],
  [/par rapport a /g, 'par rapport à '],
  [/Par rapport a /g, 'Par rapport à '],
  [/conformement a /g, 'conformément à '],
  // Numerics with currency: " a 600 dollars " → " à 600 dollars "
  [/\ba (\d)/g, 'à $1'],
  // Verb-then-prep idioms (à follows common verbs)
  [/convient a /g, 'convient à '],
  [/conviennent a /g, 'conviennent à '],
  [/mene a /g, 'mène à '], [/menent a /g, 'mènent à '],
  [/aide a /g, 'aide à '], [/aident a /g, 'aident à '],
  [/sert a /g, 'sert à '], [/servent a /g, 'servent à '],
  [/repondre a /g, 'répondre à '],
  [/répondre a /g, 'répondre à '],
  [/tendance a /g, 'tendance à '],
  [/destine a /g, 'destiné à '],
  [/destinee a /g, 'destinée à '],
  [/destines a /g, 'destinés à '],
  [/destinees a /g, 'destinées à '],
  [/cherche a /g, 'cherche à '], [/cherchent a /g, 'cherchent à '],
  [/aboutit a /g, 'aboutit à '],
  [/aboutissent a /g, 'aboutissent à '],
  [/se compare a /g, 'se compare à '],
  [/comparer a /g, 'comparer à '],
  [/comparable a /g, 'comparable à '],
  [/equivalent a /g, 'équivalent à '], [/équivalent a /g, 'équivalent à '],
  // Common stand-alone " a " between words for "at/to" usage
  // Patterns where preceding word is verb-like
  [/cote a cote/g, 'côte à côte'], [/Cote a cote/g, 'Côte à côte'],
  [/face a face/g, 'face à face'],
  [/tete a tete/g, 'tête à tête'], [/tête a tête/g, 'tête à tête'],
  [/un a un/g, 'un à un'],
  // Headings/IDs left as-is (no accents to break URL anchors)
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

let totalChanges = 0
for (const rel of FILES) {
  const path = join(ROOT, rel)
  const before = readFileSync(path, 'utf-8')
  let after = applyPass(before, SUBS, false)
  after = applyPass(after, PHRASES, true)
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
