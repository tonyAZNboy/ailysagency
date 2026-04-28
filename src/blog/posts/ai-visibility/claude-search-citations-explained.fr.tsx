/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  InternalLink,
  SectionDivider,
  QuickQuiz,
} from '../../components/shared'
import { meta } from './claude-search-citations-explained'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Comment Claude search choisit ses citations, le guide pour commerçants locaux',
  metaDescription:
    'Comment Claude search lit le web ouvert et choisit ses citations. Ce qui mérite une citation : schéma FAQ, signature nominative, dates récentes, cohérence NAP. Étapes pour commerçants locaux.',
  tldr: "Claude search lit le web ouvert avec un biais en faveur des données structurées. Il cite les pages qui livrent un schéma FAQ propre, une hiérarchie H2 et H3 favorable à l'extraction, de la recherche primaire originale, des dates de publication ou de mise à jour récentes, des signatures d'auteur nommées avec des qualifications, et un NAP cohérent pour les entités locales. La voie la plus rapide pour un commerçant local est de corriger la couche schéma, d'ajouter une vraie signature, de rafraîchir les dates sur les pages permanentes et d'aligner le NAP sur le graphe de citations.",
  faqItems: [
    {
      question: 'Comment puis-je gagner des citations dans les résultats de Claude search?',
      answer:
        "Claude search cite les pages qui ont un schéma FAQ structuré, une hiérarchie H2 et H3 claire, de la recherche primaire originale, des dates de publication ou de mise à jour récentes, des signatures d'auteur nommées avec des qualifications, et un NAP cohérent pour les entités locales. La voie pratique consiste à livrer un schéma FAQ et HowTo sur la page, ajouter une vraie signature avec un lien vers une biographie, rafraîchir la date de mise à jour quand le contenu change, et s'assurer que le nom, l'adresse et le téléphone correspondent sur le graphe de citations.",
    },
    {
      question: 'Claude search préfère-t-il du contenu récent ou du contenu permanent?',
      answer:
        "Les deux, mais le signal de date pèse. Une page avec une date de publication claire et une date de mise à jour entretenue bat une page sans dates du tout, même quand le contenu sous-jacent est similaire. Pour les pages permanentes, la bonne pratique est de livrer une vraie date de mise à jour quand le contenu est révisé, pas un faux rafraîchissement. Claude search lit le schéma et la date visible, et les incohérences entre les deux réduisent la confiance.",
    },
    {
      question: "Quelle est l'importance du schéma FAQ pour les citations Claude search?",
      answer:
        "Très importante. Un schéma FAQ structuré donne à Claude search des paires question-réponse propres qu'il peut extraire directement. Les questions doivent être de vraies recherches longue traîne et les réponses doivent être des paragraphes autonomes de 40 à 90 mots qui se lisent bien hors de la page. Les pages sans schéma FAQ peuvent encore gagner des citations, mais le taux auquel elles le font baisse nettement comparé aux pages qui livrent le schéma correctement.",
    },
    {
      question: "La signature de l'auteur compte-t-elle pour Claude search?",
      answer:
        "Oui. Une auteure nommée avec une vraie biographie, des qualifications et un lien depuis la signature vers une page biographique gagne plus de citations qu'une page signée « Admin » ou sans signature. Le signal d'auteur compose avec la cohérence thématique, donc une seule auteure qui rédige plusieurs pages sur un même domaine sur un même thème classe mieux qu'un casting tournant de contributeurs sans ancrage thématique. Cela reflète le signal E-E-A-T en recherche classique.",
    },
    {
      question: 'Quel rôle joue la cohérence NAP pour les citations locales Claude search?',
      answer:
        "Pour les requêtes locales, Claude search recoupe le nom, l'adresse et le téléphone sur le graphe de citations. Quand le NAP correspond entre le Google Business Profile, le site web, le schéma, Wikidata et les principaux annuaires de citations, l'entité est facile à désambiguïser et le taux de citation grimpe. Quand le NAP dérive (numéros de téléphone différents, abréviations d'adresse, bureau contre suite), les citations baissent parce que le moteur ne peut pas fusionner les enregistrements avec confiance.",
    },
    {
      question: 'Où puis-je lire les directives publiques d\'Anthropic sur Claude et le web?',
      answer:
        "Anthropic publie des directives publiques et des mises à jour produit sur son blogue d'actualités. La page couvre les lancements de produits, le comportement de lecture du web et les mises à jour de politiques. Le blogue est la source canonique pour tout opérateur qui veut la position officielle sur ce que Claude fait avec le web ouvert plutôt que des hypothèses tierces.",
    },
  ],
  headings: [
    { id: 'ce-que-claude-search-lit-vraiment', text: 'Ce que Claude search lit vraiment' },
    { id: 'schema-faq-structure-le-levier-le-plus-rapide', text: 'Schéma FAQ structuré, le levier le plus rapide' },
    { id: 'hierarchie-h2-et-h3-pour-extraction-de-citation', text: 'Hiérarchie H2 et H3 pour extraction de citation' },
    { id: 'recherche-primaire-originale-et-dates', text: 'Recherche primaire originale et dates' },
    { id: 'signatures-d-auteur-nommees-et-qualifications', text: "Signatures d'auteur nommées et qualifications" },
    { id: 'coherence-nap-pour-les-entites-locales', text: 'Cohérence NAP pour les entités locales' },
    { id: 'plan-de-citation-30-jours-pour-claude-search', text: 'Plan de citation 30 jours pour Claude search' },
    { id: 'erreurs-courantes-qui-coutent-des-citations', text: 'Erreurs courantes qui coûtent des citations' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Claude search lit le web ouvert avec un biais en faveur des données structurées et tire ses citations des pages qui rendent l'extraction facile. Les commerçants locaux posent la même question chaque semaine. Comment puis-je gagner des citations dans les résultats de Claude search? La réponse honnête a six couches : schéma FAQ structuré, hiérarchie H2 et H3 favorable à l'extraction, recherche primaire originale, dates de publication ou de mise à jour récentes, signatures d'auteur nommées et cohérence NAP pour les entités locales. Cette page parcourt chaque couche avec les étapes pratiques qu'un commerçant local peut livrer en un mois.
      </p>

      <StatHighlight
        stats={[
          { value: '6 couches', label: 'Signaux que Claude search pèse pour les citations' },
          { value: '40 à 90 mots', label: 'Longueur idéale de réponse FAQ pour extraction' },
          { value: 'Auteur nommé', label: "Requis pour l'alignement du signal E-E-A-T" },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-que-claude-search-lit-vraiment">Ce que Claude search lit vraiment</h2>
      <p>
        Claude est un produit IA public d'Anthropic, et Claude search est la famille de fonctionnalités qui récupère l'information du web ouvert pour répondre aux questions des utilisateurs. Quand Claude tire une citation, il pèse la page sur la clarté de la structure (schéma), l'autorité de la source (auteur et éditeur), la fraîcheur (dates) et la désambiguïsation d'entité (NAP pour les requêtes locales). Le moteur préfère les pages qui ont déjà livré les données dont il a besoin sous forme lisible par machine plutôt que des pages qu'il doit interpréter à l'aveugle.
      </p>
      <p>
        Anthropic publie des directives publiques sur la façon dont Claude lit le web sur le blogue d'actualités de l'entreprise. La lecture honnête, c'est que Claude suit les mêmes grands principes que les autres moteurs IA (ChatGPT, Perplexity, Gemini, Google AIO, Bing Copilot) avec sa propre pondération sur la confiance d'auteur et les données structurées. Pour tout opérateur qui veut la position officielle, la source canonique est la page d'actualités Anthropic à <a href="https://anthropic.com/news/" rel="noopener" target="_blank">anthropic.com/news</a>. Pour la vue inter-moteurs, voyez le guide <InternalLink to="/fr/blog/why-chatgpt-cites-your-competitor" title="Pourquoi ChatGPT cite votre concurrent" description="La lentille de citation inter-moteurs" />.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Cette page parle de Claude comme produit public dans lequel les commerçants locaux veulent être cités. Ce n'est pas une divulgation technique des moteurs qui font tourner la plateforme AiLys. Le moteur AI Visibility AiLys interroge Claude search de la même façon qu'il interroge ChatGPT, Perplexity, Gemini, Google AIO et Bing Copilot, et rapporte la part de citations dans le tableau de bord.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir où en est votre commerce dans la recherche IA? Lancez l'audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="schema-faq-structure-le-levier-le-plus-rapide">Schéma FAQ structuré, le levier le plus rapide</h2>
      <p>
        Le schéma FAQ est le levier le plus rapide qu'un commerçant local peut livrer pour commencer à gagner des citations dans Claude search. Le mécanisme est simple. Claude lit le JSON-LD FAQPage et extrait proprement les paires question-réponse, ce qui veut dire qu'une page avec cinq entrées FAQ bien rédigées peut gagner cinq surfaces de citation différentes pour cinq requêtes longue traîne différentes.
      </p>
      <p>
        Les questions à l'intérieur du schéma doivent être de vraies recherches longue traîne que les opérateurs ou les patients posent, pas du texte marketing inventé. Les réponses doivent être des paragraphes autonomes de 40 à 90 mots qui se lisent bien hors de la page, parce que le moteur IA cite souvent la réponse mot pour mot. Bourrez la réponse d'adjectifs ou de langage marketing et le taux de citation baisse. Rédigez-le comme un collègue compétent qui répond à un collègue.
      </p>

      <h3>Liste de vérification de qualité d'entrée FAQ</h3>
      <ul>
        <li>Vraie question longue traîne qui correspond à une requête de recherche, pas un slogan</li>
        <li>Réponse de 40 à 90 mots qui se lit comme une unité complète</li>
        <li>Nom de marque écrit en alphabet latin, NAP cohérent avec le site</li>
        <li>Lien interne depuis la réponse vers une page plus profonde quand pertinent</li>
        <li>JSON-LD validé par le test de résultats enrichis Schema.org</li>
      </ul>

      <SectionDivider />

      <h2 id="hierarchie-h2-et-h3-pour-extraction-de-citation">Hiérarchie H2 et H3 pour extraction de citation</h2>
      <p>
        Claude search utilise la hiérarchie H2 et H3 comme une carte de navigation de la page. Une page avec sept sections H2 bien nommées et quelques sous-sections H3 sous chacune a plus de chances de gagner une citation qu'un mur de texte sans structure d'ancrage. La raison est mécanique : quand le moteur extrait un extrait, il prend la section près de l'en-tête H2 qui correspond et soulève le paragraphe d'introduction de cette section.
      </p>
      <p>
        La bonne pratique est de rédiger chaque H2 comme une question ou une affirmation définitionnelle, puis de faire en sorte que le premier paragraphe de cette section réponde à la question en 40 à 60 mots. Cette structure reflète la façon dont Claude search veut extraire le contenu, et c'est exactement la structure qui gagne déjà les extraits enrichis dans la recherche Google classique. Les deux classements se renforcent.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Si vous avez une page qui classe bien dans Google mais qui ne gagne jamais de citations IA, auditez d'abord la hiérarchie H2. Les pages avec trois H2 et 800 mots de prose dense sous chacun gagnent rarement des citations même quand elles sont en position un. Cassez la prose sous chaque H2 en un paragraphe d'introduction de 40 à 60 mots, puis des paragraphes de soutien, puis un paragraphe de fermeture. Le même contenu, restructuré, débloque souvent les citations IA en quelques semaines.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez la matrice de paliers AiLys pour trouver le forfait qui inclut le schéma AEO et le suivi hebdomadaire des citations LLM." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="recherche-primaire-originale-et-dates">Recherche primaire originale et dates</h2>
      <p>
        Claude search préfère la recherche primaire originale au consensus d'industrie reformulé. Une clinique qui publie ses propres résultats de questionnaire d'admission, un cabinet d'avocats qui publie sa propre méthodologie de taux de gain, ou un restaurant qui publie son propre approvisionnement de menu saisonnier est plus citable que celui qui paraphrase des études d'industrie. La raison, c'est que le moteur détecte l'originalité par la rareté de phrase et la portée du graphe de citations, et le travail original fait surface des deux.
      </p>
      <p>
        Les dates pèsent aussi. Une page avec une date de publication visible et une date de mise à jour entretenue bat une page sans dates du tout, même quand le contenu est similaire. La date de mise à jour doit être honnête. Si le contenu est révisé et re-tamponné sans changements, le moteur finit par détecter le motif et escompte le signal. Les commerçants locaux gagnent sur les dates en révisant chaque page permanente une fois par trimestre et en livrant un vrai changement quand quelque chose a évolué (prix, équipe, portée, réglementation).
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Lequel de ces signaux Claude search pèse-t-il le plus lourdement pour le contenu permanent?"
        options={[
          'Nombre de mots au-dessus de 3 000',
          'Une date de mise à jour entretenue avec de vrais changements de contenu',
          "Nombre de liens internes pointant vers la page",
          "Inclusion d'images génériques près du titre",
        ]}
        correctIndex={1}
        explanation="Une date de mise à jour entretenue avec de vrais changements de contenu est le signal le plus fort pour le contenu permanent. Claude search lit la date visible et le dateModified du schéma ensemble. Quand les deux sont honnêtes et récents, la page surclasse des pages plus longues, riches en liens ou riches en images qui n'ont pas été touchées depuis un an."
      />

      <h2 id="signatures-d-auteur-nommees-et-qualifications">Signatures d'auteur nommées et qualifications</h2>
      <p>
        Les signatures d'auteur nommées composent le signal de citation. Une page signée par la Dre Marie Tremblay (médecin de famille, numéro du Collège 12345) avec un lien vers une vraie page biographique est plus citable qu'une page signée « Admin » ou sans signature. Le mécanisme est le même signal E-E-A-T que la recherche classique utilise, et Claude search le lit de la même façon : expérience, expertise, autorité, confiance.
      </p>
      <p>
        La bonne pratique structurelle sur le site, c'est de livrer un schéma Person pour l'auteur, de lier la signature à une page biographique qui liste les qualifications et les écrits antérieurs, et de garder la portée thématique d'un même auteur serrée. Une seule auteure qui rédige vingt pages sur le même thème sur le même domaine compose l'autorité plus vite que vingt auteurs différents qui rédigent une page chacun sur vingt thèmes. C'est vrai en SEO classique et c'est doublement vrai en recherche IA.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Les signatures génériques « Équipe éditoriale » ou « Admin » sont une erreur courante sur les sites bâtis par des agences. Elles coûtent de la part de citations. Le correctif tient à deux voies : nommer le vrai humain qui a rédigé chaque page (préféré), ou attribuer la publication à une équipe éditoriale définie avec sa propre page biographique publiée qui liste les membres humains et leurs qualifications. La seconde voie est acceptable quand la marque est institutionnelle, mais la première voie gagne toujours sur les citations IA.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="coherence-nap-pour-les-entites-locales">Cohérence NAP pour les entités locales</h2>
      <p>
        Pour les requêtes locales, Claude search recoupe le nom, l'adresse et le téléphone sur le web ouvert. Quand le NAP correspond entre le Google Business Profile, le site web, le schéma, Wikidata et les principaux annuaires de citations, l'entité est facile à fusionner en un seul enregistrement. Quand le NAP dérive (numéros de téléphone différents, suite contre bureau, noms de villes abrégés), le moteur ne peut pas désambiguïser avec confiance et les citations baissent.
      </p>
      <p>
        Le correctif, c'est un audit NAP sur le graphe de citations. Les principales sources à aligner sont le GBP, le pied de page et la page contact du site, le schéma LocalBusiness ou MedicalBusiness, Wikidata et les dix principaux annuaires du marché local. AiLys livre cet audit à chaque palier payant, avec le nettoyage de citations qui monte en volume de Starter à Growth. Voyez le guide <InternalLink to="/fr/blog/nap-consistency-audit-quebec" title="Audit de cohérence NAP pour le Québec" description="Audit étape par étape sur le graphe de citations local" /> pour les étapes pratiques.
      </p>

      <SectionDivider />

      <h2 id="plan-de-citation-30-jours-pour-claude-search">Plan de citation 30 jours pour Claude search</h2>
      <p>
        Un commerçant local peut livrer un gain de citations Claude search appréciable en 30 jours en séquençant le travail correctement. Semaine un, auditez le schéma FAQ et livrez le JSON-LD FAQPage sur les cinq pages principales. Semaine deux, restructurez la hiérarchie H2 et H3 sur ces mêmes pages et rédigez un paragraphe d'introduction de 40 à 60 mots sous chaque H2. Semaine trois, livrez une vraie signature d'auteur avec un schéma Person et une page biographique. Semaine quatre, lancez l'audit NAP sur le graphe de citations et corrigez la dérive sur les dix principales sources.
      </p>
      <p>
        Cette séquence couvre les six signaux que Claude search pèse. Le premier gain atterrit typiquement en deux à quatre semaines pour un opérateur à un seul emplacement avec une base technique propre. Pour le multi-emplacements ou les sites avec une dette technique profonde, le délai s'étire à deux ou trois mois. L'<InternalLink to="/fr/audit" title="Audit AI Visibility gratuit en 24 heures" description="Base de part de citations sur les principaux moteurs IA" /> rapporte la base avant que le travail commence.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel de 30 minutes pour cartographier le plan de citation Claude search 30 jours sur vos pages principales, sans pitch?" buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="erreurs-courantes-qui-coutent-des-citations">Erreurs courantes qui coûtent des citations</h2>
      <p>
        Trois schémas coûtent plus de citations que les autres. Premièrement, copier des entrées FAQ d'un concurrent ou d'un gabarit générique. Claude search détecte le langage dupliqué sur le graphe de citations et escompte les deux copies. Le correctif, c'est de rédiger les entrées FAQ à partir de vraies questions de clients, pas de gabarits.
      </p>
      <p>
        Deuxièmement, les fausses dates de mise à jour. Augmenter le dateModified sans changer le contenu est un gain à court terme que le moteur finit par pénaliser. Le correctif, c'est de réviser chaque page permanente une fois par trimestre et de livrer un vrai changement quand quelque chose a évolué. Troisièmement, les signatures génériques. « Admin » et « Équipe éditoriale » sans page biographique d'équipe publiée coûtent de la vraie part de citations. Le correctif, c'est un auteur humain nommé avec une vraie biographie.
      </p>

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Claude search pèse six couches : schéma FAQ, hiérarchie H2/H3, recherche originale, dates, auteur nommé et cohérence NAP.',
          'Le schéma FAQ est le levier le plus rapide. Vraies questions longue traîne, réponses autonomes de 40 à 90 mots.',
          "Chaque H2 doit être une question ou une affirmation définitionnelle, avec un paragraphe d'introduction de 40 à 60 mots.",
          "La recherche primaire originale et les dates de mise à jour honnêtes battent le consensus d'industrie reformulé et les pages permanentes périmées.",
          'Pour les requêtes locales, alignez le NAP sur GBP, site web, schéma, Wikidata et les principaux annuaires de citations.',
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
        alt="Chronologie du plan de citation 30 jours montrant les phases schéma FAQ, hiérarchie H2, signature d'auteur et audit NAP pour Claude search"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
