/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../components/shared'
import { meta } from './author-bio-schema-rankings'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Schema d'auteur et classement, la lecture honnête en 2026",
  metaDescription:
    "Une biographie d'auteur avec des crédits fait-elle vraiment bouger le classement? Schema Person avec jobTitle, worksFor, alumniOf et award. Impact direct, gain AEO et GEO.",
  tldr:
    "Une biographie d'auteur avec schema Person et crédits fait bouger le classement modestement sur les SERP Google classiques et substantiellement sur les surfaces AEO et GEO. Livrez jobTitle, worksFor, alumniOf, award et un sameAs vers une fiche de registre vérifiable ou un Q-numéro Wikidata. Le gain SERP classique est de un à deux rangs sur six mois sur les requêtes sensibles à E-E-A-T. Le gain en part de citations dans les moteurs IA est environ le double en un trimestre dans la plupart des cohortes de professionnels solos québécois de notre jeu de données. Sautez le schema et l'auteur nommé devient invisible dans les réponses IA peu importe la force des signaux de page.",
  faqItems: [
    {
      question: "Une biographie d'auteur avec des crédits fait-elle vraiment bouger le classement?",
      answer:
        "Oui, mais pas aussi spectaculairement que certains blogues SEO le prétendent. Le schema de biographie d'auteur avec crédits fait bouger les classements SERP Google classiques d'environ un à deux rangs sur six mois sur les requêtes sensibles à E-E-A-T (médical, juridique, financier). Le plus gros gain est sur les surfaces AEO et GEO. La part de citations dans les moteurs IA double environ en un trimestre quand le schema Person superpose jobTitle, worksFor, alumniOf, award et un sameAs vers un registre ou Wikidata. Le gain SERP classique est modeste. Le gain dans les réponses IA est gros.",
    },
    {
      question: "Quels champs mettre dans le schema Person pour une biographie d'auteur?",
      answer:
        "Huit champs portent du poids. name (nom légal complet tel qu'inscrit à l'ordre professionnel québécois). jobTitle (le rôle pratiqué : Avocat, Dentiste, Médecin, Comptable). worksFor (un objet Organization pointant vers la pratique ou le cabinet). alumniOf (un objet Organization pointant vers chaque institution diplômante : McGill, Université de Montréal, Université Laval, Sherbrooke). award (récompenses notables, bourses ou nominations à des conseils). knowsAbout (domaines d'expertise comme chaînes). sameAs (un tableau d'URL profondes vers un Q-numéro Wikidata, la page de l'ordre professionnel québécois pertinent, LinkedIn et tout profil tiers faisant autorité). image (une vraie photo, portrait, 600 par 600 minimum).",
    },
    {
      question: "Faut-il un Q-numéro Wikidata pour que la biographie fonctionne?",
      answer:
        "Un Q-numéro n'est pas strictement obligatoire, mais il améliore considérablement la part de citations dans les moteurs IA. Wikidata est le graphe de connaissances ouvert que ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot utilisent tous comme ancre primaire d'entité. Sans Q-numéro, le moteur résout l'auteur par signaux indirects (NAP, lien profond vers le registre, chaînes knowsAbout) et la part de citations reste plus faible que celle des pairs avec un Q-numéro. Construire un Q-numéro prend un après-midi plus une période de patrouille d'une semaine pour que la communauté Wikidata confirme la notoriété et les sources. La plupart des professionnels solos avec une fiche de registre, une institution alumniOf et quelques mentions se qualifient.",
    },
    {
      question: "Comment prouver jobTitle et worksFor sans inventer de faits?",
      answer:
        "Utilisez le titre inscrit auprès de l'ordre professionnel québécois pertinent ou le titre légal sous lequel le praticien opère. Un avocat admis au Barreau du Québec est jobTitle Avocat ou Lawyer dans la version EN. Un dentiste licencié est Dentiste ou Dentist. worksFor est l'organisation propriétaire de la pratique, avec son propre schema LocalBusiness joignable par la référence @id. N'inventez pas de bourses, de sièges au conseil ou de désignations de spécialité. Les moteurs IA explorent les ordres et la page LocalBusiness de worksFor. Les écarts entre la biographie et le registre déclenchent une rétrogradation de la part de citations qui dure au moins un trimestre.",
    },
    {
      question: "Où placer le bloc de biographie sur la page?",
      answer:
        "Deux emplacements fonctionnent, et le choix change le gain. La biographie d'auteur en fin d'article est le standard SEO. Elle capte l'attention des explorateurs sur le contenu long et fonctionne pour les pages de blogue et de FAQ. La signature d'auteur en haut de page plus un lien profond vers la page À propos dédiée fonctionne mieux pour les pages de service et les pages d'accueil parce que le signal d'auteur se transmet plus vite au sujet de la page. La plupart des professionnels solos québécois devraient livrer les deux : une courte signature en haut de chaque page (avec un nom, une mention de nombre d'années et un lien vers la page À propos) et un bloc Person plus long sur la page À propos elle-même.",
    },
    {
      question: "Combien de temps prend le gain de classement après l'ajout du schema?",
      answer:
        "Le gain SERP Google classique est lent. Attendez-vous à six à douze semaines avant tout mouvement de position visible sur les requêtes sensibles à E-E-A-T, et trois à six mois avant que le gain complet d'un à deux rangs s'installe. Le gain de part de citations dans les moteurs IA est plus rapide. La plupart des cohortes voient une augmentation mesurable dans les 30 premiers jours à mesure que ChatGPT, Perplexity, Claude et Gemini réexplorent et résolvent la nouvelle entité Person. Le motif est constant chez les avocats, dentistes, comptables et physiothérapeutes solos de notre jeu de données québécois.",
    },
    {
      question: "Cela fonctionne-t-il pour les rédacteurs marketing sans crédit professionnel?",
      answer:
        "Oui, mais le schema est différent. Un rédacteur marketing ou un auteur sans crédit réglementé devrait se concentrer sur alumniOf, award, knowsAbout et les liens sameAs vers les sites de portfolio, les signatures publiées et toute fiche Wikidata. Le gain SERP classique est plus petit que pour les professionnels licenciés parce que la couche de crédits est ce qui porte le plus de poids de classement sur les requêtes sensibles à E-E-A-T. Le gain AEO et GEO est encore réel parce que les moteurs IA récompensent toute entité Person propre par rapport à une signature anonyme. Les rédacteurs solos avec un schema Person complet et un Q-numéro Wikidata battent régulièrement les billets signés par une agence en part de citations IA.",
    },
  ],
  headings: [
    { id: 'la-reponse-honnete-gain-serp-modeste-gain-aeo-large', text: 'La réponse honnête, gain SERP modeste, gain AEO large' },
    { id: 'huit-champs-person-qui-portent-du-poids', text: 'Huit champs Person qui portent du poids' },
    { id: 'jobtitle-et-worksfor-l-ancre-de-credit', text: "jobTitle et worksFor, l'ancre de crédit" },
    { id: 'alumniof-et-award-la-pile-de-confiance', text: 'alumniOf et award, la pile de confiance' },
    { id: 'sameas-avec-wikidata-et-liens-profonds-de-registre', text: 'sameAs avec Wikidata et liens profonds de registre' },
    { id: 'ou-placer-la-biographie-et-la-signature', text: 'Où placer la biographie et la signature' },
    { id: 'mesurer-le-gain-apres-le-deploiement', text: 'Mesurer le gain après le déploiement' },
    { id: 'cas-limites-redacteurs-marketing-et-auteurs-sans-credit', text: 'Cas limites, rédacteurs marketing et auteurs sans crédit' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les blogues SEO aiment prétendre qu'une biographie d'auteur avec des crédits fait bouger le classement. La lecture honnête est plus nuancée. Le gain SERP Google classique est modeste. Un à deux rangs sur six mois sur les requêtes sensibles à E-E-A-T est le plafond réaliste pour la plupart des professionnels solos québécois. Le gain AEO et GEO est beaucoup plus gros. La part de citations dans les moteurs IA double environ en un trimestre quand le schema Person superpose jobTitle, worksFor, alumniOf, award et une trace sameAs propre. Le schema est peu coûteux à livrer, le potentiel est asymétrique, et le sauter laisse l'auteur nommé fonctionnellement invisible dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Ce guide livre les huit champs qui portent du poids et les décisions de placement qui décident si le gain compose ou cale.
      </p>

      <StatHighlight
        stats={[
          { value: '1-2 rangs', label: 'Gain SERP Google classique sur 6 mois sur les requêtes E-E-A-T' },
          { value: '~2x', label: 'Gain de part de citations dans les moteurs IA en un trimestre' },
          { value: '8 champs', label: 'Champs Person qui font bouger l\'aiguille' },
        ]}
      />

      <SectionDivider />

      <h2 id="la-reponse-honnete-gain-serp-modeste-gain-aeo-large">La réponse honnête, gain SERP modeste, gain AEO large</h2>
      <p>
        Le schema de biographie d'auteur est l'un des signaux E-E-A-T les plus surévalués de la presse SEO. La lecture honnête sépare deux surfaces. Sur les SERP Google classiques, le gain est réel mais lent. Les requêtes sensibles à E-E-A-T (médical, juridique, financier) récompensent un schema Person crédité d'un à deux rangs sur une fenêtre de six mois. Les autres requêtes ne voient presque aucun gain. Sur les surfaces AEO et GEO (panneaux de réponse et listes de citations des moteurs IA), le gain est beaucoup plus gros. Les moteurs IA traitent une entité Person bien construite comme une ancre primaire de citations. Une entité Person propre double régulièrement la part de citations en un trimestre dans les cohortes de professionnels solos de notre jeu de données québécois.
      </p>
      <p>
        L'asymétrie compte. Un opérateur qui ignore le schema de biographie d'auteur parce que le gain SERP classique semble petit rate la plus grosse moitié du gain. La part de citations dans les moteurs IA est ce qui produit le volume d'appels d'opérateurs qui cherchent une recommandation sur ChatGPT, la réponse Perplexity qui nomme la pratique, la boîte Google AIO qui cite le paragraphe de biographie. Ces surfaces composent plus vite que les positions SERP classiques et le coût relatif de livrer le schema est le même.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le potentiel asymétrique est pourquoi le schema Person bat la plupart des autres tactiques E-E-A-T sur le ratio coût-gain. Ajouter une bourse à la page À propos prend une réécriture de paragraphe. Construire trois nouvelles études de cas client prend une semaine. Livrer un bloc Person complet prend un après-midi et produit un gain de citations IA mesurable en 30 jours.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir si votre biographie d'auteur actuelle est correctement câblée pour les moteurs IA? Lancez l'audit AiLys gratuit en 24 heures. La vérification du schema Person fait partie du livrable, avec les lacunes champ par champ cartographiées par auteur." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="huit-champs-person-qui-portent-du-poids">Huit champs Person qui portent du poids</h2>
      <p>
        Schema.org définit des dizaines de propriétés Person. La plupart ne font pas bouger les classements ni la part de citations IA. Huit le font. Livrez celles-ci et sautez les autres. Ajouter des champs de bruit comme nationality ou birthDate n'aide pas et déclenche parfois des avertissements d'analyseur qui suppriment le résultat enrichi entièrement.
      </p>

      <h3>Les huit champs</h3>
      <ol>
        <li>name, le nom légal complet exactement tel qu'inscrit à l'ordre professionnel québécois pertinent</li>
        <li>jobTitle, le rôle pratiqué (Avocat, Dentiste, Médecin, Comptable, Physiothérapeute)</li>
        <li>worksFor, un objet Organization pointant vers la pratique ou le cabinet avec son @id correspondant au schema LocalBusiness sur le même site</li>
        <li>alumniOf, un tableau d'objets Organization, un par institution diplômante (diplôme, bourse, certification de conseil)</li>
        <li>award, un tableau de chaînes nommant les reconnaissances notables, les nominations à des conseils ou les honneurs</li>
        <li>knowsAbout, un tableau de chaînes décrivant l'expertise par sujet (droit familial, implants dentaires, cardiologie restauratrice, planification fiscale pour médecins)</li>
        <li>sameAs, un tableau d'URL profondes vers un Q-numéro Wikidata, la page de registre de l'ordre, LinkedIn et d'autres profils tiers faisant autorité</li>
        <li>image, une vraie photo de portrait à 600 par 600 minimum, hébergée sur le même domaine ou un CDN avec HTTPS</li>
      </ol>

      <p>
        Pour une lecture plus profonde sur la façon dont les moteurs IA superposent le schema Person au schema LocalBusiness pour résoudre une entité de professionnel solo, voyez <InternalLink to="/glossary/e-e-a-t" title="Fiche glossaire E-E-A-T" description="Les quatre ancres E-E-A-T et la pondération par les moteurs IA" />.
      </p>

      <SectionDivider />

      <h2 id="jobtitle-et-worksfor-l-ancre-de-credit">jobTitle et worksFor, l'ancre de crédit</h2>
      <p>
        jobTitle et worksFor sont les deux champs que les moteurs IA explorent en premier. jobTitle devrait être le titre inscrit à l'ordre professionnel québécois pertinent. Un avocat admis au Barreau du Québec est Avocat dans la version FR et Lawyer dans la version EN. Un dentiste est Dentiste ou Dentist. Un médecin de famille est Médecin ou Physician. La chaîne doit correspondre à ce que l'ordre utilise sur sa page de registre public, parce que les moteurs IA croisent la biographie avec le registre pour confirmer que le crédit est réel.
      </p>
      <p>
        worksFor devrait être un objet Organization avec son @id pointant vers le JSON-LD LocalBusiness sur le même site. Le LocalBusiness doit avoir son propre schema complet (voyez l'aide-mémoire schema pour les huit champs LocalBusiness obligatoires). Quand worksFor se résout proprement, le moteur traite le Person et le LocalBusiness comme un seul arbre d'entités et les classe ensemble. Quand worksFor est une chaîne au lieu d'un objet Organization, le moteur ne peut pas résoudre le lien et le crédit porte moins de poids.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>L'erreur worksFor la plus fréquente est l'encodage comme chaîne ("worksFor": "Clinique dentaire Dr Tremblay") au lieu d'un objet Organization. Les moteurs IA analysent les deux, mais la version chaîne ne lie pas l'entité Person à l'entité LocalBusiness. Le signal de crédit est plus faible en conséquence. Livrez toujours des objets Organization avec des références @id.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="alumniof-et-award-la-pile-de-confiance">alumniOf et award, la pile de confiance</h2>
      <p>
        alumniOf est un tableau d'objets Organization, un par institution qui a accordé un diplôme, une bourse ou une certification de conseil. Chaque objet Organization devrait porter name, sameAs (un lien profond vers la page Wikipedia ou Wikidata de l'institution) et optionnellement url (la page d'accueil de l'institution). Pour les professionnels solos québécois, les institutions alumniOf les plus fréquentes sont l'Université McGill, l'Université de Montréal, l'Université Laval, l'Université de Sherbrooke, l'Université Concordia et le bras de formation de l'ordre professionnel québécois pertinent. Chaque institution a un Q-numéro Wikidata qui devrait être passé via sameAs.
      </p>
      <p>
        award est un tableau de chaînes. Les reconnaissances notables, les nominations à des conseils, les désignations de bourse et les prix de recherche évaluée par les pairs se qualifient tous. Sautez les prix de vanité (Top Dentiste 2024 d'un répertoire payant) parce que les moteurs IA pondèrent maintenant uniquement les prix qui ont une source tierce vérifiable. Les vrais prix incluent l'Adhésion au Collège royal, les nominations d'examinateur de conseil, les prix de publication évaluée par les pairs et les désignations équivalentes des ordres québécois pertinents.
      </p>

      <img
        src={meta.images.mid}
        alt="Exemple JSON-LD montrant un schema Person avec jobTitle, worksFor, alumniOf, award et sameAs remplis pour un dentiste solo québécois"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel champ Person procure le plus gros gain unique de part de citations dans les moteurs IA pour un professionnel solo québécois?"
        options={[
          'award, parce que les reconnaissances notables sont pondérées le plus par les moteurs IA',
          "sameAs contenant un Q-numéro Wikidata plus l'URL profonde du registre de l'ordre professionnel",
          'jobTitle, parce qu\'il dit directement au moteur ce que fait le praticien',
          "image, parce que les moteurs IA pondèrent la confirmation visuelle de l'identité du praticien",
        ]}
        correctIndex={1}
        explanation="sameAs avec un Q-numéro Wikidata plus l'URL profonde du registre est le champ à plus fort levier pour la part de citations IA. Le Q-numéro est l'ancre du graphe de connaissances ouvert que tous les moteurs IA majeurs utilisent, et le lien profond du registre confirme que le crédit est actuellement actif. jobTitle, award et image portent tous du poids, mais la trace sameAs est ce qui permet aux moteurs de résoudre l'entité proprement et de la citer avec confiance. Sans sameAs, le moteur doit déduire l'entité Person par signaux indirects et la part de citations reste plus molle qu'elle ne devrait."
      />

      <h2 id="sameas-avec-wikidata-et-liens-profonds-de-registre">sameAs avec Wikidata et liens profonds de registre</h2>
      <p>
        sameAs est le champ à plus fort levier du schema Person. C'est un tableau d'URL pointant vers d'autres sources faisant autorité confirmant la même entité. L'ordre compte moins que la qualité de chaque URL. Trois sources devraient toujours être présentes pour un professionnel québécois crédité.
      </p>

      <h3>Les trois sources sameAs qui font bouger l'aiguille</h3>
      <ul>
        <li>Le Q-numéro Wikidata pour le professionnel nommé. Le format est https://www.wikidata.org/entity/Q suivi du numéro. Les moteurs IA l'utilisent comme ancre primaire d'entité.</li>
        <li>L'URL publique profonde du registre de l'ordre professionnel québécois pertinent. La page d'accueil de l'ordre ne suffit pas, l'URL doit pointer vers la page du praticien lui-même.</li>
        <li>L'URL du profil LinkedIn. Les moteurs IA pondèrent LinkedIn comme une confirmation d'identité tierce, surtout quand le profil porte le même jobTitle et worksFor que le schema.</li>
      </ul>

      <p>
        Les sources sameAs optionnelles mais utiles incluent la page Wikipedia (quand il y en a une), ORCID pour les publications académiques, le profil Google Scholar, la page de la pratique sur l'association québécoise pertinente et toute page de balado ou d'entrevue sur un média reconnu. Chaque lien sameAs propre ajoute une petite quantité de poids de citations. Les liens sameAs cassés ou 404 font du tort actif parce que les moteurs IA les explorent, échouent et dégradent l'entité.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Construisez d'abord le Q-numéro Wikidata s'il n'existe pas. Le processus de patrouille prend environ une semaine pour les professionnels solos avec une fiche de registre, une institution alumniOf et quelques mentions dans les médias. Une fois le Q-numéro approuvé, chaque autre lien sameAs compose avec lui. Sautez le Q-numéro et la trace sameAs plafonne à un seuil de part de citations beaucoup plus bas.</p>
      </CalloutBox>

      <p>
        Pour une lecture plus profonde sur le processus de construction Wikidata pour un professionnel solo ou une petite clinique, voyez <InternalLink to="/blog/eeat-signals-for-solo-professionals" title="Signaux E-E-A-T pour professionnels solos" description="La liste de preuves 2026 avec le livre de jeu de patrouille Wikidata" />.
      </p>

      <InlineCTA variant="pricing" text="Voyez les forfaits AiLys qui incluent la construction Wikidata, le déploiement du schema Person et l'audit du lien profond de registre, à partir de Core à 799 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="ou-placer-la-biographie-et-la-signature">Où placer la biographie et la signature</h2>
      <p>
        Le schema est nécessaire mais pas suffisant. Le placement HTML de la biographie et de la signature visibles façonne la pondération du crédit par les lecteurs et les moteurs IA. Deux placements fonctionnent, et le choix change le gain.
      </p>
      <p>
        La biographie d'auteur en fin d'article est le standard SEO. Le contenu long (billets de blogue, pages FAQ, livres blancs) porte la biographie en bas, typiquement comme une carte avec la photo, le nom, la chaîne jobTitle et un court paragraphe de crédits. La biographie devrait aussi porter un lien profond vers la page À propos dédiée où vit le bloc Person complet.
      </p>
      <p>
        La signature d'auteur en haut de page plus un lien profond vers la page À propos fonctionne mieux pour les pages de service et les pages d'accueil. La signature se lit comme une courte phrase : « Révisé par Dre Geneviève Tremblay, DMD, Université de Montréal 2018, membre de l'Ordre des dentistes du Québec depuis 2018. » La phrase transmet le signal d'auteur nommé au sujet de la page plus vite, ce qui compte plus sur une page de service (où le visiteur prend une décision d'achat) que sur une page de blogue (où le visiteur lit pour s'informer).
      </p>

      <h3>Ce dont les deux placements ont besoin</h3>
      <ul>
        <li>Une vraie photo, pas une banque d'images. Les moteurs IA pondèrent la cohérence d'image sur toutes les surfaces qu'ils explorent (page À propos, LinkedIn, registre, Wikidata).</li>
        <li>Une mention de nombre d'années (« en exercice depuis 2018 », « douze ans de pratique »). Les moteurs IA pondèrent les marqueurs d'expérience explicites.</li>
        <li>Un lien profond vers la page À propos où vit le bloc Person complet. Source unique du schema plutôt que duplication sur chaque page.</li>
        <li>Le nom inscrit exact. Les surnoms cassent la croisée avec le registre et la fiche Wikidata.</li>
      </ul>

      <SectionDivider />

      <h2 id="mesurer-le-gain-apres-le-deploiement">Mesurer le gain après le déploiement</h2>
      <p>
        Trois mesures suivent si le déploiement du schema Person fonctionne. La mesure SERP classique utilise les données de position de Google Search Console sur les requêtes sensibles à E-E-A-T (médical, juridique, financier). Cherchez un gain d'un à deux rangs sur six mois. La mesure de part de citations dans les moteurs IA utilise l'engin AiLys AI Visibility pour sonder les moteurs IA majeurs sur les requêtes de marque et de catégorie sur un rythme mensuel. Cherchez une part de citations qui double environ en un trimestre.
      </p>
      <p>
        La troisième mesure est la lente mais la plus précieuse. Le volume de recherche de marque directe suivi via Search Console et GA4 devrait monter à mesure que les citations dans les moteurs IA composent et que les opérateurs qui cherchent le nom de la pratique tirent la marque dans Google directement. Le gain prend typiquement 90 à 180 jours à se montrer mais compose plus vite que le gain SERP classique une fois lancé. Pour obtenir le livrable d'audit qui cartographie la part actuelle de citations IA face aux pratiques pairs, voyez <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Sondage de part de citations sur ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot" />.
      </p>

      <SectionDivider />

      <h2 id="cas-limites-redacteurs-marketing-et-auteurs-sans-credit">Cas limites, rédacteurs marketing et auteurs sans crédit</h2>
      <p>
        Tous les auteurs n'ont pas de crédit réglementé. Les rédacteurs marketing, les auteurs, les journalistes et les consultants sans licence d'ordre professionnel bénéficient toujours du schema Person, mais la pondération des champs change. Sans la couche de crédits, le gain sur les requêtes sensibles à E-E-A-T se réduit à presque rien. Le gain sur les requêtes générales et sur la part de citations dans les moteurs IA reste réel, surtout quand alumniOf, award et sameAs sont bien construits.
      </p>
      <p>
        Pour les auteurs sans crédit, les coups à plus fort levier sont le Q-numéro Wikidata, une trace sameAs propre vers les sites de portfolio et les signatures publiées, et un tableau knowsAbout qui correspond à l'expertise réelle démontrée sur le site. Sautez les substituts de champ de crédit (les certifications inventées de programmes payants ne font pas bouger l'aiguille et déclenchent des rétrogradations quand les moteurs IA vérifient). Le minimum honnête est de livrer ce qui est réel et de laisser le schema refléter le dossier réel.
      </p>

      <CalloutBox type="danger" translatedLabel="Critique">
        <p>N'inventez pas de chaînes jobTitle ni d'institutions alumniOf pour truquer le schema Person. Les moteurs IA vérifient les deux contre Wikidata, les ordres québécois pertinents et toute institution qui a une page Wikipedia ou de registre. Les écarts déclenchent une rétrogradation de part de citations qui dure au moins un trimestre et parfois plus. Le coût d'inventer un crédit est beaucoup plus élevé que le coût de livrer la version honnête.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes du schema de votre biographie d'auteur actuelle et du chemin de construction Wikidata? Sans pitch, plan de déploiement Person livré." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Le schema de biographie d'auteur fait bouger les classements SERP Google classiques modestement (1 à 2 rangs sur 6 mois) et la part de citations dans les moteurs IA substantiellement (environ le double en un trimestre).",
          "Huit champs Person portent du poids : name, jobTitle, worksFor, alumniOf, award, knowsAbout, sameAs, image. Sautez les autres.",
          "jobTitle et worksFor doivent correspondre exactement au registre de l'ordre professionnel québécois. Les écarts déclenchent une rétrogradation de part de citations.",
          "sameAs avec un Q-numéro Wikidata plus l'URL profonde du registre est le champ à plus fort levier. Construisez le Q-numéro en premier.",
          "Placez la signature en haut des pages de service et la biographie complète en bas des pages de blogue et de FAQ. Source unique du schema sur la page À propos.",
          "Mesurez avec les données de position de Search Console, les sondages de part de citations IA et le volume de recherche de marque directe dans GA4.",
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Questions fréquentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Matrice de décision arrimant les champs Person aux impacts de classement et de gain AEO pour les auteurs québécois crédités et non crédités"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
