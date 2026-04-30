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
import { meta } from './reviuzy-review-automation-guide'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "AiLys Automation, le guide du module d'automatisation des avis pour AiLys",
  metaDescription:
    "Comment le module AiLys Automation automatise la vélocité des avis Google pour les clients AiLys. Collecte NFC, brouillons assistés par IA, réponses automatisées, moteur de concours, détection d'avis bidons, branchement GBP.",
  tldr: "AiLys Automation est le module de réputation AiLys à 100 dollars CAD par mois, inclus dans le palier Agency. Il couvre la collecte d'avis par tap NFC, les brouillons assistés par IA dans le flux client, les réponses automatisées sur chaque avis Google, un moteur de concours avec gabarits juridiques que le client opère à l'interne, la détection d'avis bidons, et le branchement direct au GBP. L'objectif est de hausser la vélocité à 4 à 6 avis frais par mois sans briser la politique Google.",
  faqItems: [
    {
      question: "Comment le module AiLys Automation d'AiLys s'intègre-t-il à la vélocité d'avis?",
      answer:
        "AiLys Automation hausse la vélocité d'avis Google en automatisant les pièces que les commerçants oublient les semaines chargées. Collecte NFC au comptoir, suggestions de brouillon IA dans le flux client, réponses automatisées sur chaque nouvel avis, et un moteur de concours mensuel que le client opère pour pousser des sommets quand il le faut. Le moteur AiLys lit ensuite les nouveaux avis dans la couche d'optimisation GBP, et la variété des mots-clés et la récence haussent le score du pack local dans la même semaine.",
    },
    {
      question: "Combien coûte AiLys Automation et comment l'ajouter à mon forfait AiLys?",
      answer:
        "AiLys Automation coûte 100 dollars CAD par mois en module autonome. Il est inclus sans frais supplémentaires dans le palier AiLys Agency à 2 499 dollars par mois. Les clients sur Starter, Core ou Growth peuvent ajouter AiLys Automation sur la page de tarifs ou demander au stratège de l'attacher au prochain cycle. Le module inclut les autocollants NFC, le tableau de bord, le flux de réponse automatique, le moteur de concours et la bibliothèque de gabarits juridiques.",
    },
    {
      question: "AiLys Automation opère-t-il mon concours ou est-ce moi qui l'opère?",
      answer:
        "Le client opère le concours. AiLys Automation fournit la configuration, le générateur de termes et conditions juridiques, les guides d'aide et le tableau de bord pour tirer le gagnant. Le client est propriétaire du prix, de la relation client et de toute divulgation fiscale ou réglementaire qui s'applique dans sa juridiction. AiLys ne tire pas le gagnant et ne communique pas avec les concurrents. Cette séparation garde l'agence du bon côté des règles de concours au Québec et au Canada.",
    },
    {
      question: "Qui téléverse les photos quand un gagnant de concours est annoncé?",
      answer:
        "Le client téléverse les photos via l'application AiLys Automation. AiLys ne fournit pas les photos de gagnant et ne téléverse pas au GBP au nom du concours. L'application AiLys Automation fournit le formulaire de téléversement, la capture de consentement et la poussée vers le GBP, mais l'action humaine reste chez l'opérateur. Cela protège le client des enjeux de droits d'auteur et garde la provenance photo propre pour Google.",
    },
    {
      question: "Comment AiLys Automation détecte-t-il les avis bidons et que fait-il avec?",
      answer:
        "Le détecteur d'avis bidons de AiLys Automation évalue chaque nouvel avis et chaque soumission de formulaire sur quatre signaux livrés : patrons de texte généré par IA (empreintes d'écriture LLM), empreintes d'agent utilisateur de bot (outils d'automatisation, navigateurs sans tête, scrapers), domaines de courriel jetable (fournisseurs comme tempmail et mailinator), et timing de soumission rapide (moins de trois secondes). Les avis au-dessus du seuil sont remontés dans le tableau de bord avec une action « signaler à Google » en un clic. Le système ne signale pas automatiquement sans approbation du propriétaire, parce que Google pénalise les faux positifs. Le propriétaire décide quels signalements pousser à Google.",
    },
    {
      question: "Les réponses automatisées sont-elles sûres ou Google pénalise-t-il les réponses gabarit?",
      answer:
        "Les réponses automatisées sont sûres quand elles sont personnalisées par avis. AiLys Automation génère un brouillon adapté au texte de l'avis, au prénom du commentateur et au service mentionné. Le propriétaire approuve ou édite le brouillon en un clic, et la réponse part au GBP via l'API officielle Google. Les réponses gabarit identiques sur plusieurs avis déclenchent la détection de schémas et peuvent provoquer une suppression douce de la fiche. La convention AiLys Automation est un brouillon approuvé par avis, jamais un copier-coller.",
    },
  ],
  headings: [
    { id: 'ce-qu-est-reviuzy-et-ce-qu-il-n-est-pas', text: "Ce qu'est AiLys Automation et ce qu'il n'est pas" },
    { id: 'tap-nfc-la-boucle-du-comptoir', text: 'Tap NFC, la boucle du comptoir' },
    { id: 'brouillons-assistes-par-ia-dans-le-flux-client', text: 'Brouillons assistés par IA dans le flux client' },
    { id: 'reponses-automatisees-avec-approbation-du-proprietaire', text: 'Réponses automatisées avec approbation du propriétaire' },
    { id: 'le-moteur-de-concours-et-les-gabarits-juridiques', text: 'Le moteur de concours et les gabarits juridiques' },
    { id: 'detection-d-avis-bidons-et-flux-de-signalement', text: "Détection d'avis bidons et flux de signalement" },
    { id: 'comment-reviuzy-se-branche-au-gbp-et-au-moteur-ailys', text: 'Comment AiLys Automation se branche au GBP et au moteur AiLys' },
    { id: 'quand-reviuzy-se-rentabilise', text: 'Quand AiLys Automation se rentabilise' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        AiLys Automation est le module de réputation AiLys à 100 dollars CAD par mois, inclus sans frais supplémentaires dans le palier Agency. C'est la pièce qui transforme la vélocité d'avis Google en habitude quotidienne au lieu d'un projet trimestriel. Le produit couvre la collecte par tap NFC au comptoir, les suggestions de brouillon assistées par IA dans le flux client, les réponses automatisées sur chaque nouvel avis Google, un moteur de concours mensuel opéré par le client à l'interne, la détection d'avis bidons avec un flux de signalement, et le branchement direct au GBP et au moteur AiLys d'AI Visibility. Voici comment chaque pièce s'imbrique et où l'agence trace la ligne entre ce qui est livré et ce que l'opérateur garde sous sa responsabilité.
      </p>

      <StatHighlight
        stats={[
          { value: '100 $ CAD', label: 'Prix mensuel du module AiLys Automation' },
          { value: 'Palier Agency', label: 'Inclus sans frais supplémentaires' },
          { value: '4 à 6', label: "Avis frais par mois visés" },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-qu-est-reviuzy-et-ce-qu-il-n-est-pas">Ce qu'est AiLys Automation et ce qu'il n'est pas</h2>
      <p>
        AiLys Automation est un produit d'automatisation de la réputation. Il collecte les avis, rédige les brouillons de réponse, surveille les avis bidons, et pousse les données dans le moteur AiLys qui lit la récence et la variété des mots-clés comme intrants de classement. Il fonctionne comme la couche d'automatisation interne de la plateforme agence AiLys, avec un tableau de bord unifié et une facturation unifiée à l'intérieur du compte AiLys.
      </p>
      <p>
        AiLys Automation n'est pas un service de production de contenu. Il ne rédige pas d'articles de blogue. Il n'opère pas les réseaux sociaux du commerçant. Il ne fournit pas la photographie pour la fiche Google Business Profile, parce que les photos sont téléversées par le client via l'application AiLys Automation pour garder la provenance propre. AiLys Automation n'est pas non plus un opérateur de concours. Le client opère le concours, et AiLys Automation fournit la configuration, les gabarits juridiques et les guides d'aide.
      </p>
      <p>
        Le cadrage honnête, c'est que AiLys Automation est un moteur de vélocité pour la collecte et la réponse aux avis, avec une trousse jointe pour les campagnes de concours et la gestion des avis bidons. Les commerçants qui le traitent comme tel obtiennent la hausse. Ceux qui s'attendent à ce qu'il remplace un gestionnaire marketing trouvent qu'il livre moins, parce que l'étape d'approbation humaine est volontaire et reste chez l'opérateur.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le prix mensuel de 100 dollars couvre la trousse complète : accès au tableau de bord, autocollants NFC, suggestions de brouillon IA, flux de réponse automatique, moteur de concours, bibliothèque de gabarits juridiques et détection d'avis bidons. Il n'y a pas de surcharge par avis ni par emplacement pour les commerces à un seul emplacement. Les tarifs multi-emplacements sont calculés sur la page de tarifs AiLys selon le nombre d'emplacements.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les forfaits AiLys et où AiLys Automation est inclus ou ajouté en plus, de Starter à 300 dollars à Agency à 2 499 dollars CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="tap-nfc-la-boucle-du-comptoir">Tap NFC, la boucle du comptoir</h2>
      <p>
        L'autocollant NFC pour avis se pose sur le comptoir ou le porte-reçu. Le client tape un téléphone, l'appareil ouvre une page AiLys Automation, la page fait surgir le lien direct vers l'avis Google avec un flux en une touche vers le formulaire d'avis du GBP. L'expérience entière prend moins de cinq secondes du tap à la composition de l'avis. Les autocollants sont expédiés dans la trousse d'embarquement AiLys Automation sans frais supplémentaires.
      </p>
      <p>
        Si la boucle NFC fonctionne, c'est qu'elle élimine les deux frictions qui tuent la vélocité d'avis. D'abord, le client n'a pas à trouver la fiche GBP sur Google, parce que la page AiLys Automation saute directement au formulaire d'avis. Ensuite, le client n'a pas à se rappeler de laisser l'avis plus tard, parce que l'invitation arrive au moment de la satisfaction. La plupart des commerçants voient la vélocité doubler dans les 60 premiers jours après le déploiement NFC.
      </p>
      <p>
        La page AiLys Automation intègre aussi une question rapide qui adapte l'expérience sans briser la politique Google. La version honnête achemine chaque client vers le lien d'avis Google et utilise la question seulement pour décider quel gabarit suggérer, jamais pour filtrer les clients insatisfaits. Filtrer par satisfaction brise la politique Google et peut provoquer une suppression douce de la fiche.
      </p>

      <h3>Ce qui est inclus dans la trousse NFC</h3>
      <ul>
        <li>Cinq autocollants NFC par emplacement, à la marque du commerce</li>
        <li>Un présentoir NFC pour le comptoir d'accueil ou la caisse</li>
        <li>La page AiLys Automation configurée avec le lien d'avis du GBP</li>
        <li>La vue tableau de bord qui suit le nombre de taps, la conversion en avis et la source par autocollant</li>
      </ul>

      <SectionDivider />

      <h2 id="brouillons-assistes-par-ia-dans-le-flux-client">Brouillons assistés par IA dans le flux client</h2>
      <p>
        Les clients veulent souvent laisser un avis mais figent devant la zone de texte vide. La suggestion de brouillon IA AiLys Automation montre une phrase d'amorce basée sur le service reçu, le prénom du membre du personnel rencontré et le contexte de la visite. Le client voit trois phrases suggérées et peut en choisir une comme point de départ ou rédiger l'avis à partir de zéro. L'IA n'écrit jamais l'avis complet et ne soumet jamais sans que le client tape.
      </p>
      <p>
        Pourquoi ça compte pour l'AI Visibility : le texte d'avis est maintenant une surface de citation pour les moteurs IA. ChatGPT, Perplexity, Gemini et Google AIO analysent tous le texte d'avis quand ils résument un commerce local. Les avis qui mentionnent des services précis et des prénoms de personnel nourrissent ces résumés avec un langage concret. Les avis qui disent seulement « excellent service » ne nourrissent rien.
      </p>
      <p>
        Le brouillon IA est configurable par catégorie d'entreprise. Une clinique dentaire reçoit des suggestions sur les visites d'hygiène et les rendez-vous d'urgence. Un restaurant reçoit des suggestions sur les plats du menu courant. Un entrepreneur reçoit des suggestions sur le type de projet et la rapidité de réponse. La configuration de catégorie part durant l'embarquement et se met à jour automatiquement quand les catégories GBP changent.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le brouillon IA est un point de départ, pas un script. Si le client copie la suggestion telle quelle et soumet, l'avis se lit comme gabarit et Google peut détecter le schéma. L'interface AiLys Automation invite le client à personnaliser la suggestion avant de soumettre, avec un petit indice visuel quand le brouillon n'a pas été édité. Cet indice améliore la qualité d'avis et protège la fiche.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="reponses-automatisees-avec-approbation-du-proprietaire">Réponses automatisées avec approbation du propriétaire</h2>
      <p>
        Chaque nouvel avis Google déclenche un brouillon de réponse AiLys Automation. Le brouillon est adapté au texte de l'avis, au prénom du commentateur et au service mentionné. Le propriétaire voit le brouillon dans le tableau de bord et dans une notification courriel ou SMS optionnelle. Un clic approuve et expédie la réponse au GBP via l'API officielle Google. Toute la boucle se ferme en moins de deux minutes quand le propriétaire est sur le tableau de bord.
      </p>
      <p>
        Les réponses automatisées sont sûres quand chaque réponse est personnalisée. AiLys Automation n'expédie jamais deux fois une réponse identique, parce que le modèle de brouillon varie la structure, le choix de mots et la mention de service selon le contenu de l'avis. Les réponses gabarit identiques sur plusieurs avis déclenchent la détection de schémas Google et peuvent provoquer une suppression douce de la fiche.
      </p>
      <p>
        L'étape d'approbation par le propriétaire est volontaire. Les réponses expédiées sans révision portent un risque de conformité : une réponse qui se trompe de service, qui se trompe de pronom ou qui contredit un changement opérationnel récent peut endommager la relation. Les deux minutes d'approbation sont le coût d'éviter ce risque.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quelle est la bonne convention pour les réponses automatisées AiLys Automation sur les avis Google?"
        options={[
          'Expédier chaque réponse sans révision pour maximiser la vitesse',
          'Utiliser la même réponse gabarit sur chaque avis pour la cohérence',
          'Générer un brouillon personnalisé par avis et expédier après approbation en un clic',
          "Répondre seulement aux avis négatifs, ignorer les positifs",
        ]}
        correctIndex={2}
        explanation="Les brouillons personnalisés avec approbation en un clic, c'est la convention. Cela maintient une vitesse de réponse proche du quasi-automatique, évite la détection de schéma qui frappe les réponses identiques, et garde le propriétaire dans la boucle sur le ton et l'exactitude. Les réponses identiques et le silence sur les positifs sont deux risques de classement."
      />

      <SectionDivider />

      <h2 id="le-moteur-de-concours-et-les-gabarits-juridiques">Le moteur de concours et les gabarits juridiques</h2>
      <p>
        Le moteur de concours AiLys Automation est le levier pour les sommets de vélocité d'avis. Un concours mensuel invite les clients à laisser un avis, avec un prix tiré parmi les inscriptions. Le tableau de bord remonte le nombre d'inscriptions, les règles d'admissibilité, la description du prix et la mécanique de tirage. La configuration prend moins de 30 minutes au premier concours et moins de 5 minutes pour les concours suivants.
      </p>
      <p>
        La ligne dure, c'est que le client opère le concours. AiLys fournit la configuration, le générateur de termes et conditions juridiques, et les guides d'aide. Le client est propriétaire du prix, de la relation client, du tirage, de la notification au gagnant et de toute divulgation fiscale ou réglementaire qui s'applique. L'agence ne tire pas le gagnant et ne communique pas avec les concurrents. Cette séparation garde tout le monde du bon côté des règles de concours au Québec et au Canada.
      </p>

      <h3>Ce que couvre la bibliothèque de gabarits juridiques</h3>
      <ul>
        <li>Divulgation de concours québécoise (avis à la Régie des alcools, des courses et des jeux quand la valeur du prix dépasse le seuil)</li>
        <li>Gabarit de question d'habileté (obligatoire pour les prix en argent ou de grande valeur au Canada)</li>
        <li>Admissibilité, mécanique d'inscription, méthode de tirage et description du prix</li>
        <li>Avis de confidentialité sur le traitement des données d'inscription et le consentement à l'avis</li>
        <li>Versions française et anglaise, rédigées à la main, avec graphies régionales</li>
      </ul>

      <p>
        La gestion des photos de gagnant suit la même séparation. Le client téléverse la photo via l'application AiLys Automation, l'application capte le consentement, et la photo part au GBP via l'API officielle. AiLys ne fournit pas les photos de gagnant et ne téléverse pas au nom du concours. Cela protège le client des enjeux de droits d'auteur et garde la provenance photo propre pour Google.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le sommet de concours est plus efficace quand il est jumelé à la vélocité NFC régulière, pas comme un substitut. Un commerce qui fait un concours et arrête de collecter des avis le reste du mois voit un creux de vélocité qui efface le sommet en 60 jours. Le schéma qui tient le classement, c'est NFC régulier plus un concours par trimestre, pas concours seulement.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="detection-d-avis-bidons-et-flux-de-signalement">Détection d'avis bidons et flux de signalement</h2>
      <p>
        Chaque nouvel avis et chaque soumission de formulaire passent par le notateur d'avis bidons AiLys Automation à l'arrivée. Le notateur lit quatre signaux livrés. La détection de texte généré par IA compare le corps à une bibliothèque de phrases connues pour récurrer dans la sortie LLM (les expressions de remplissage qui reviennent dans la production de ChatGPT, Claude, Gemini et Perplexity quand on leur demande de rédiger un avis). L'empreinte d'agent utilisateur de bot signale les requêtes provenant d'outils d'automatisation, de navigateurs sans tête, de scrapers et de noms de crawler connus. Le filtrage des courriels jetables compare l'adresse à une liste de fournisseurs jetables. Le timing de soumission rapide signale les formulaires remplis en moins de trois secondes, le signal fort d'une publication automatisée.
      </p>
      <p>
        Chaque signal contribue à un score de risque pondéré. Les soumissions au-dessus du seuil supérieur sont bloquées au niveau du formulaire ; les soumissions dans la bande médiane sont signalées et mises en file dans le tableau de bord avec le score et les signaux qui ont matché en pièce jointe. Le système ne signale pas automatiquement les avis légitimes sans approbation du propriétaire, parce que les faux positifs portent une pénalité. Google a resserré les règles de signalement et provoque maintenant une suppression douce des fiches qui signalent à répétition des avis légitimes. La convention AiLys Automation est une décision humaine par signalement, avec le notateur qui fournit le texte de justification.
      </p>
      <p>
        Le tableau de bord suit les résultats de signalement dans le temps, et le propriétaire voit quels signaux mènent à des retraits Google réussis et lesquels non. La plupart des signalements légitimes viennent de grappes de soumissions à patron de bot, de contenu qui correspond à la bibliothèque d'écriture IA, et d'avis qui réfèrent à des services que le commerce n'offre pas. La plupart des signalements rejetés viennent de clients réguliers qui utilisent simplement un langage très bref.
      </p>

      <SectionDivider />

      <h2 id="comment-reviuzy-se-branche-au-gbp-et-au-moteur-ailys">Comment AiLys Automation se branche au GBP et au moteur AiLys</h2>
      <p>
        AiLys Automation se connecte au Google Business Profile via l'API officielle Google avec des portées de lecture et d'écriture pour les avis, les réponses, et (avec consentement du propriétaire) les téléversements de photos. La connexion est en OAuth, le jeton est stocké chiffré, et l'opérateur peut révoquer l'accès à tout moment depuis le tableau de bord. Aucun identifiant ne vit hors du coffre AiLys Automation.
      </p>
      <p>
        Côté AiLys, chaque avis et chaque réponse alimentent le moteur AI Visibility qui note la fiche chaque semaine. Le moteur lit la variété des mots-clés dans le texte d'avis, la fenêtre de récence, le taux de réponse et l'équilibre linguistique des commentateurs. Le score se met à jour dans le tableau de bord AiLys la même semaine, et le stratège utilise la tendance pour recommander le prochain levier opérationnel (placement des autocollants NFC, cadence de concours, ajustements de ton de réponse).
      </p>
      <p>
        Pour les commerçants qui veulent l'image de données complète, l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez où atterrissent les signaux d'avis dans le score AI Visibility" /> livre une base qui inclut la tranche vélocité d'avis. Jumelez ça avec le <InternalLink to="/blog/google-review-velocity-playbook" title="Plan de vélocité d'avis Google" description="Les chiffres qui bougent le classement du pack local" /> pour la plongée opérateur sur les cibles mensuelles, et avec <InternalLink to="/blog/ailys-vs-traditional-seo-agency" title="AiLys vs agence SEO traditionnelle" description="Où le module AiLys Automation se place dans le plan global" /> pour le cadre de comparaison.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma de flux de données AiLys Automation montrant le tap NFC, le brouillon IA, l'approbation propriétaire, la poussée API GBP et la boucle de notation du moteur AI Visibility"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="audit" text="Vous voulez voir où en est votre commerce dans la recherche IA? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="quand-reviuzy-se-rentabilise">Quand AiLys Automation se rentabilise</h2>
      <p>
        Le prix mensuel de 100 dollars se rentabilise quand la hausse de vélocité génère un client de plus par mois. Pour une clinique dentaire avec une valeur à vie de 1 200 dollars par patient, c'est un retour de 12 pour 1 dans le premier trimestre. Pour un restaurant avec un ticket moyen de 60 dollars et un taux de retour de 30 pour cent, le calcul est plus près de 2 pour 1, ce qui demeure une dépense défendable.
      </p>
      <p>
        Les commerçants qui obtiennent la plus grande hausse sont ceux qui traitent AiLys Automation comme une habitude quotidienne. Le tableau de bord devient le contrôle courriel du matin et la passe de réponses d'après-midi. Le stratège côté AiLys suit la vélocité dans le rapport hebdomadaire et ajuste la couche d'optimisation GBP quand la combinaison de mots-clés d'avis change. L'effet combiné, c'est un score de pack local qui monte régulièrement sur un trimestre.
      </p>
      <p>
        Les commerçants qui obtiennent le moins de hausse sont ceux qui achètent AiLys Automation et l'oublient. Le tableau de bord reste non lu, les réponses automatisées s'empilent non envoyées, et le moteur de concours ne démarre jamais. Dans ce cas la dépense est gaspillée, et la recommandation honnête est d'annuler le module et d'y revenir quand l'opérateur a la bande passante de lui consacrer cinq minutes par jour.
      </p>

      <CalloutBox type="danger" translatedLabel="Critique">
        <p>Les cinq mauvais usages AiLys Automation les plus courants : expédier des réponses gabarit identiques, filtrer les avis par satisfaction (une violation de la politique Google), opérer des concours sans termes juridiques, signaler des avis légitimes comme bidons, et téléverser des photos de banque pour des gagnants. Chacun porte un risque de suppression douce sur la fiche GBP. Le produit prévient les cinq, mais seulement quand l'opérateur suit les invitations.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez une visite guidée de 60 minutes du tableau de bord AiLys Automation par rapport à votre fiche GBP actuelle? Doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'AiLys Automation coûte 100 dollars CAD par mois, inclus dans le palier AiLys Agency.',
          'Collecte NFC plus brouillons IA plus réponses automatisées plus concours, les quatre leviers.',
          "Le client opère le concours. AiLys fournit configuration, gabarits juridiques et guides d'aide seulement.",
          "Les photos sont téléversées par le client via l'application AiLys Automation. AiLys ne fournit pas les photos de gagnant.",
          "Les réponses automatisées partent après approbation en un clic. Les réponses gabarit identiques sont un risque de suppression douce.",
          "Les signalements d'avis bidons sont approuvés par le propriétaire, jamais déposés automatiquement, pour éviter les pénalités Google sur les faux positifs.",
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
        alt="Carte récapitulative du module AiLys Automation avec les quatre leviers et le branchement GBP pour un commerce local québécois"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
