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
import { meta } from './ai-visibility-audit-checklist-2026'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Liste de vérification de l'audit AI Visibility pour 2026",
  metaDescription:
    "Une liste de vérification complète de l'audit AI Visibility pour 2026. Évaluez votre entreprise dans ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot en 24 heures.",
  tldr:
    "Pour faire un audit AI Visibility complet, évaluez votre marque dans six moteurs IA, mesurez le share-of-model contre vos trois concurrents locaux, puis corrigez les trous de schéma, les déserts de citations et les attributs GBP manquants. Le moteur AiLys retourne un bilan en 24 heures. La plupart des entreprises locales partent à 0 sur 6 et atteignent 4 sur 6 en 90 jours.",
  faqItems: [
    {
      question: "Comment faire un audit AI Visibility complet sur mon entreprise?",
      answer:
        "Choisissez un ensemble fixe de 10 à 15 questions d'acheteur, exécutez chaque requête dans ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, et notez si votre marque apparaît dans la réponse ou dans la liste des sources. Comparez ensuite avec vos trois principaux concurrents locaux. L'audit AI Visibility d'AiLys automatise ce travail et retourne un bilan en 24 heures avec le share-of-model et les trois priorités de correction.",
    },
    {
      question: "Qu'est-ce que le share-of-model et pourquoi est-ce important pour le SEO local?",
      answer:
        "Le share-of-model est le pourcentage de requêtes d'acheteur où un moteur IA nomme votre marque. Si cinq des dix requêtes pertinentes font apparaître votre entreprise dans ChatGPT, votre share-of-model sur ChatGPT est de 50 pour cent. C'est important parce que la réponse IA devient souvent le seul résultat lu. Un bon classement dans le local pack qui perd au share-of-model perd quand même la réservation.",
    },
    {
      question: "À quelle fréquence dois-je relancer l'audit AI Visibility?",
      answer:
        "Au minimum chaque mois. Les moteurs IA se réentraînent et se réindexent à différents rythmes, donc un score de janvier n'est pas un score de mars. Les propriétaires sur le forfait Core d'AiLys et plus reçoivent un nouvel audit mensuel et un rapport delta. Si vous auditez seulement deux fois par année, vous manquerez la fenêtre de 60 jours où un concurrent publie un contenu de citation et vous vole votre share-of-model dans Perplexity.",
    },
    {
      question: "Quels moteurs IA une entreprise locale au Québec doit-elle auditer en premier?",
      answer:
        "Auditez ChatGPT, Perplexity et Google AIO en premier. ChatGPT pousse le plus gros volume absolu de requêtes d'acheteur. Perplexity est le plus accessible parce qu'il pondère la fraîcheur et la diversité des sources plus que l'autorité brute du domaine. Google AIO apparaît dans le même SERP que vos clients utilisent déjà. Une fois ces trois stables, ajoutez Claude, Gemini et Bing Copilot pour la couverture complète.",
    },
    {
      question: "Puis-je faire un audit AI Visibility par moi-même sans outils payants?",
      answer:
        "Oui, la version manuelle prend environ six heures par audit. Construisez un ensemble de 12 requêtes d'acheteur, exécutez chacune à la main dans les six moteurs, notez si votre marque apparaît, et comparez avec trois concurrents. Le coût est votre temps. Le moteur AiLys compresse cela en un bilan automatisé de 24 heures à partir de 300 dollars par mois au forfait Starter, avec relance mensuelle et delta concurrents inclus.",
    },
  ],
  headings: [
    { id: 'pourquoi-les-audits-ai-visibility-ont-remplace-le-suivi-de-rang', text: "Pourquoi les audits AI Visibility ont remplacé le suivi de rang" },
    { id: 'les-six-moteurs-qui-comptent-vraiment-en-2026', text: 'Les six moteurs qui comptent vraiment en 2026' },
    { id: 'construire-l-ensemble-de-requetes-sur-lequel-l-audit-repose', text: "Construire l'ensemble de requêtes sur lequel l'audit repose" },
    { id: 'evaluer-le-share-of-model-contre-trois-concurrents', text: 'Évaluer le share-of-model contre trois concurrents' },
    { id: 'trouver-les-trous-de-schema-citations-et-gbp', text: 'Trouver les trous de schéma, citations et GBP' },
    { id: 'corriger-les-trois-fuites-prioritaires', text: 'Corriger les trois fuites prioritaires en premier' },
    { id: 'fixer-la-cadence-mensuelle-de-relance-de-l-audit', text: "Fixer la cadence mensuelle de relance de l'audit" },
    { id: 'faq', text: 'Foire aux questions' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Pour faire un audit AI Visibility complet sur votre entreprise, construisez un ensemble de 12 requêtes d'acheteur, exécutez chacune dans ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, notez si votre marque apparaît, et comparez le résultat avec vos trois principaux concurrents locaux. L'audit AI Visibility d'AiLys automatise l'exécution et retourne un bilan avec share-of-model, trous de schéma et trois priorités de correction en 24 heures.
      </p>

      <StatHighlight
        stats={[
          { value: '6 moteurs', label: 'ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot' },
          { value: '24 heures', label: "Délai de l'audit AiLys" },
          { value: '300 $/mois', label: 'Forfait Starter avec relance mensuelle' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-les-audits-ai-visibility-ont-remplace-le-suivi-de-rang">Pourquoi les audits AI Visibility ont remplacé le suivi de rang</h2>
      <p>
        Le suivi de rang a mesuré une chose qui a compté pendant deux décennies. La liste des liens bleus. Un acheteur tapait une requête, parcourait dix résultats organiques plus un local pack, puis cliquait. La position trois était un vrai prix. Les moteurs IA ont brisé cette surface. Dans ChatGPT, Perplexity et Google AIO, la réponse est la page. Il n'y a plus dix liens bleus. Il y a une réponse avec trois ou quatre sources nommées, et l'acheteur agit souvent avant de cliquer.
      </p>
      <p>
        C'est pour cela que les audits AI Visibility existent. La métrique nécessaire n'est pas « où est-ce que je me classe pour ramen près de moi ». C'est « quand un acheteur demande à ChatGPT le meilleur ramen au Plateau, est-ce que la réponse nomme mon restaurant ». La première métrique se règle avec du SEO classique et une fiche d'établissement Google. La seconde se règle avec des données structurées, de la diversité de citations et un share-of-model mesurable dans les six moteurs.
      </p>
      <p>
        Voyez la <InternalLink to="/glossary/share-of-model" title="Définition du share-of-model" /> pour la définition complète. Version courte : le share-of-model est le pourcentage de requêtes d'acheteur où un moteur nomme votre marque. C'est le nouveau classement dans le local pack.
      </p>

      <h2 id="les-six-moteurs-qui-comptent-vraiment-en-2026">Les six moteurs qui comptent vraiment en 2026</h2>
      <p>
        Un audit complet couvre six moteurs. ChatGPT et Google AIO génèrent le plus gros volume d'acheteurs. Perplexity offre les citations les plus propres parce qu'il pondère la diversité des sources et la fraîcheur. Claude et Gemini couvrent le marché des assistants plus petit mais en croissance. Bing Copilot couvre les acheteurs B2B et l'écosystème Microsoft qui ne sortent jamais de Edge ou Outlook.
      </p>
      <ol>
        <li><strong>ChatGPT</strong>. Volume le plus élevé, pondère l'autorité du domaine et la profondeur historique du contenu.</li>
        <li><strong>Perplexity</strong>. Le plus accessible, pondère la fraîcheur, la diversité des sources et les données structurées.</li>
        <li><strong>Google AIO</strong>. Même SERP que la recherche classique, pondère la complétude de la fiche et le schéma FAQPage.</li>
        <li><strong>Claude</strong>. Volume plus petit, pondère l'expertise long format et les citations explicites.</li>
        <li><strong>Gemini</strong>. Lié au contexte du compte Google, pondère fortement les signaux du local pack.</li>
        <li><strong>Bing Copilot</strong>. Orienté B2B, pondère la présence LinkedIn et les données structurées de la page source.</li>
      </ol>
      <p>
        Sauter un seul des six crée un angle mort. L'échec le plus fréquent que nous voyons est un client qui suit seulement ChatGPT et perd ensuite trois mois d'acheteurs au profit d'un concurrent qui a décroché des citations Perplexity.
      </p>

      <SectionDivider />

      <CalloutBox type="tip" translatedLabel="Astuce de pro">
        <p>Le moteur le plus rapide à percer est Perplexity. La plupart des entreprises locales peuvent gagner leur première citation Perplexity en moins de 30 jours avec un schéma propre, un article frais sur l'état actuel et trois références tierces diversifiées. Commencez là si vous n'avez qu'un mois de budget d'audit.</p>
      </CalloutBox>

      <h2 id="construire-l-ensemble-de-requetes-sur-lequel-l-audit-repose">Construire l'ensemble de requêtes sur lequel l'audit repose</h2>
      <p>
        L'audit ne vaut que ce que valent les requêtes. La plupart des propriétaires rédigent des requêtes qui ressemblent à des mots-clés, « meilleur dentiste Montréal », et passent à côté de la façon dont les acheteurs formulent réellement leurs questions à un moteur IA. Les requêtes IA sont conversationnelles, plus longues, et contiennent du contexte que l'acheteur n'aurait jamais tapé dans Google.
      </p>
      <p>
        Construisez douze requêtes en trois catégories. Quatre requêtes de découverte (« qui sont les meilleurs X dans Y pour Z », où Z est une contrainte comme « ouvert le dimanche » ou « accepte la RAMQ »). Quatre requêtes de comparaison (« comparez A et B pour quelqu'un qui a besoin de C »). Quatre requêtes de confiance (« est-ce que X est fiable pour Y », « que disent les clients de X »). Lancez chaque requête à neuf dans chaque moteur, jamais connecté à vos comptes de marque, idéalement depuis un profil de navigateur propre.
      </p>
      <p>
        Notez trois choses par requête : la marque est-elle apparue dans le texte, dans la liste de sources, et la réponse a-t-elle nommé un concurrent à la place. Le champ concurrent est celui que la plupart des propriétaires oublient, et c'est lui qui pilote la liste de corrections.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Une requête IA n'est pas un mot-clé. Une requête est une question conversationnelle avec des contraintes intégrées. « Meilleur dentiste Montréal » est un mot-clé. « Quel est un bon dentiste de famille à NDG qui prend la RAMQ et qui ouvre le samedi » est une requête. L'audit ne fonctionne que si votre ensemble sonne comme la deuxième formulation, pas la première.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Mini-quiz"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel moteur est habituellement le plus rapide à percer pour une entreprise locale au Québec?"
        options={[
          'ChatGPT, à cause du volume brut',
          'Perplexity, parce qu\'il pondère la fraîcheur et la diversité des sources',
          'Bing Copilot, à cause du signal LinkedIn',
          'Gemini, à cause du contexte du compte Google',
        ]}
        correctIndex={1}
        explanation="Perplexity pondère la fraîcheur et la diversité des sources plus que l'autorité brute du domaine. Un schéma propre et trois citations tierces variées peuvent décrocher une première citation en 30 jours. ChatGPT a plus de volume mais prend plus de temps parce qu'il s'appuie sur l'autorité historique."
      />

      <SectionDivider />

      <h2 id="evaluer-le-share-of-model-contre-trois-concurrents">Évaluer le share-of-model contre trois concurrents</h2>
      <p>
        Choisissez trois concurrents locaux. Pas des géants nationaux. Locaux. La clinique deux rues plus loin, le cabinet d'avocats du même immeuble, le resto qui a pris vos réservations du vendredi soir le trimestre dernier. Lancez les mêmes douze requêtes pour chaque marque concurrente et notez les mêmes trois champs. Vous avez maintenant quatre bilans.
      </p>
      <p>
        Calculez le share-of-model par moteur. Si votre marque est nommée dans cinq des douze réponses ChatGPT, votre share-of-model sur ChatGPT est de 42 pour cent. Si le concurrent A est nommé dans huit des douze, A est à 67 pour cent. L'écart, 25 points, est le budget des 90 prochains jours. Répétez par moteur. Le portrait global dans les six moteurs est votre score AI Visibility.
      </p>
      <p>
        L'audit AiLys produit ce bilan automatiquement. Si vous préférez la voie manuelle, le gabarit de chiffrier sur notre page <InternalLink to="/audit" title="Lancer un audit AI Visibility gratuit" /> couvre le calcul.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>N'évaluez pas sur le compte brut de mentions. Évaluez sur le share-of-model. Un concurrent mentionné dans 8 réponses sur 12 a 67 pour cent de share-of-model. Un concurrent mentionné dans 8 sur 30 est à 27 pour cent. Même nombre absolu, réalité très différente.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les forfaits conçus pour les entreprises locales, à partir de 300 $/mois CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="trouver-les-trous-de-schema-citations-et-gbp">Trouver les trous de schéma, citations et GBP</h2>
      <p>
        Une fois l'écart connu, il faut savoir pourquoi. Trois vérifications diagnostiques couvrent la majorité des cas. D'abord, le schéma. Passez vos cinq pages d'intention d'acheteur dans les validateurs Schema.org. Confirmez que LocalBusiness, FAQPage, Service et Review se valident proprement. L'absence de schéma est la raison la plus fréquente pour laquelle ChatGPT et Perplexity sautent une marque entièrement.
      </p>
      <p>
        Ensuite, les citations. Comptez vos citations NAP et comparez avec les concurrents. Si votre concurrent principal a 80 citations dans des annuaires et vous en avez 22, les moteurs voient un signal plus faible pour votre marque et la pondèrent moins. La correction est la construction mensuelle de citations, livrée à 2 par mois au forfait Starter, 4 au Core, 6 au Growth, 8 à Agency (max par domaine).
      </p>
      <p>
        Enfin, la fiche d'établissement Google. La plupart des diagnostics « absent des réponses IA » remontent à un attribut GBP qui n'a jamais été rempli. Catégories, mentions alimentaires, modes de paiement, accessibilité, heures d'ouverture. Google AIO et Gemini puisent tous deux dans cette couche. Voyez notre <InternalLink to="/audit/gbp" title="Audit GBP approfondi" description="Liste complète des attributs GBP pour les entreprises locales du Québec" /> pour la liste complète des attributs.
      </p>

      <SectionDivider />

      <h2 id="corriger-les-trois-fuites-prioritaires">Corriger les trois fuites prioritaires en premier</h2>
      <p>
        Choisissez les trois écarts à plus fort impact et livrez-les dans les 30 premiers jours. L'audit en identifiera plus que trois. Résistez à l'envie de tout régler. Le modèle qui fonctionne est concentrer, livrer, mesurer, puis élargir. Un paquet de correction typique de 30 jours ressemble à ceci. Déployer LocalBusiness et FAQPage sur les cinq pages principales. Décrocher trois citations de qualité Perplexity, idéalement un sous-Reddit de niveau ville, un répertoire industriel régional et une mention de presse. Remplir tous les attributs GBP pertinents, y compris les sous-ensembles alimentation, accessibilité et paiement.
      </p>
      <p>
        Au jour 30, relancez l'ensemble de requêtes. La plupart des clients passent de 1 sur 6 moteurs cités à 3 sur 6 dans le premier mois. Ensuite, les 30 jours suivants traitent Claude et Gemini, et les 30 derniers s'attaquent à Bing Copilot et à la queue longue de requêtes secondaires.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <InternalLink to="/glossary/aeo" title="Définition AEO" description="L'Answer Engine Optimization, la discipline derrière chaque audit AI Visibility" />

      <SectionDivider />

      <h2 id="fixer-la-cadence-mensuelle-de-relance-de-l-audit">Fixer la cadence mensuelle de relance de l'audit</h2>
      <p>
        Les moteurs IA se réindexent à des cadences différentes et vos concurrents continuent d'avancer. Un score de janvier ne survit pas à mars sans entretien. Fixez une cadence mensuelle de relance avec un ensemble de requêtes fixe pour que les deltas soient réels et non des artefacts de nouvelles requêtes. Le forfait Core d'AiLys livre cette relance le premier de chaque mois, avec un rapport delta et les trois prochaines corrections.
      </p>
      <p>
        Les propriétaires qui sautent la cadence mensuelle perdent souvent du terrain en 90 jours, non parce qu'ils ont régressé, mais parce qu'un concurrent a remarqué la même chose et a livré deux articles de citation. Le share-of-model est compétitif. L'audit est une habitude, pas un exercice ponctuel.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Évaluez dans six moteurs : ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.',
          "Utilisez un ensemble fixe de 12 requêtes d'acheteur, jamais connecté à vos comptes de marque.",
          'Calculez le share-of-model par moteur, puis comparez avec trois concurrents locaux.',
          'Diagnostiquez avec trois vérifications : schéma, écart de citations, complétude des attributs GBP.',
          'Corrigez les trois fuites prioritaires, puis relancez chaque mois avec le même ensemble de requêtes.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Foire aux questions</h2>
      <p>
        Pour la version anglaise canonique de ce guide, consultez la même liste de vérification sur notre page <InternalLink to="/blog/ai-visibility-audit-checklist-2026" title="AI Visibility audit checklist for 2026" />. Prêt à lancer le vrai audit sur votre entreprise? La version gratuite revient en 24 heures et couvre les six moteurs.
      </p>
      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes, sans pitch, document de stratégie envoyé peu importe?" buttonText="Réserver un appel" />
    </article>
  )
}
