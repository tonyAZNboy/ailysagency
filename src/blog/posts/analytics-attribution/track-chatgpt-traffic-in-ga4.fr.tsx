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
import { meta } from './track-chatgpt-traffic-in-ga4'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Suivre le trafic ChatGPT dans GA4, la configuration qui marche',
  metaDescription:
    "Comment voir le trafic ChatGPT dans Google Analytics 4. Les motifs de référence à surveiller, la règle de groupe de canaux, la convention UTM et le suivi de conversion pour la recherche IA.",
  tldr: "GA4 ne suit pas le trafic ChatGPT par défaut. La majorité atterrit en Direct parce que ChatGPT enlève le référent sur la plupart des types de clics. La solution est un groupe de canaux personnalisé avec une liste d'hôtes de référence, une convention UTM pour les liens que vous contrôlez, et une vue Looker Studio qui rassemble le trafic IA en un panneau. La configuration prend environ 90 minutes et donne un signal propre en une semaine.",
  faqItems: [
    {
      question: 'Comment voir le trafic provenant de ChatGPT dans Google Analytics 4?',
      answer:
        "Bâtissez un groupe de canaux personnalisé avec une liste d'hôtes de référence qui couvre les hôtes ChatGPT et les autres moteurs IA comme Perplexity, Gemini et Bing Copilot. Ajoutez une convention UTM sur chaque lien que vous publiez pour que le clic soit étiquetable quand ChatGPT préserve les paramètres. Ensuite, bâtissez un panneau Looker Studio qui filtre l'acquisition de trafic par votre canal Moteurs IA.",
    },
    {
      question: 'Pourquoi le trafic ChatGPT apparaît-il en Direct dans GA4?',
      answer:
        "ChatGPT enlève les référents sur plusieurs types de clics parce que le panneau de réponse passe par une redirection qui ne propage pas l'en-tête referer. Certains clics conservent l'hôte, la majorité non. Le mélange apparaît dans GA4 en Direct, le canal de repli quand le référent manque. La solution est un groupe de canaux personnalisé plus des UTM sur les liens que vous contrôlez dans votre propre contenu et vos citations.",
    },
    {
      question: 'Faut-il du tagage côté serveur pour suivre le trafic ChatGPT?',
      answer:
        "Non, la configuration de base fonctionne dans GA4 avec la balise standard. Le tagage côté serveur donne une attribution plus propre et permet d'enrichir le canal Moteurs IA avec un contexte first-party, mais il n'est pas requis pour la première semaine. Commencez par le groupe de canaux et la convention UTM. Ajoutez le tagage côté serveur dans un sprint ultérieur si le trafic IA devient une part importante des conversions.",
    },
    {
      question: 'Quelle valeur utm_source pour les moteurs IA?',
      answer:
        "Utilisez une convention stable pour que les rapports inter-moteurs restent propres. Nous utilisons utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. utm_medium reste ai_search dans tous les cas. utm_campaign nomme la pièce de contenu. La convention compte plus que les mots exacts. Choisissez-en une, documentez-la et arrêtez de la changer.",
    },
    {
      question: 'En combien de temps le trafic IA apparaît-il après la configuration GA4?',
      answer:
        "Vous pouvez voir les premiers passages dans le canal Moteurs IA en 24 heures si vous publiez du contenu qui obtient des citations IA et si la règle de groupe de canaux est correcte. Un volume hebdomadaire significatif apparaît généralement à la deuxième semaine pour une entreprise locale qui figure déjà dans les AI Overviews. Si le panneau reste vide pendant deux semaines, le problème est en amont, soit les moteurs IA ne citent pas encore votre site.",
    },
  ],
  headings: [
    { id: 'pourquoi-trafic-chatgpt-invisible', text: 'Pourquoi le trafic ChatGPT est invisible dans GA4 par défaut' },
    { id: 'groupe-canaux-personnalise-ga4', text: 'Le groupe de canaux personnalisé GA4 pour les moteurs IA' },
    { id: 'convention-utm-acheminement-ia', text: "La convention UTM qui survit à l'acheminement IA" },
    { id: 'liste-hotes-reference', text: "La liste d'hôtes de référence à surveiller pour ChatGPT et compagnie" },
    { id: 'panneau-looker-studio-trafic-ia', text: 'Un panneau Looker Studio qui révèle le trafic IA en une vue' },
    { id: 'suivi-conversion-recherche-ia', text: 'Suivi de conversion pour la recherche IA, ce qui compte et ce qui ne compte pas' },
    { id: 'modes-echec-frequents', text: 'Modes d\'échec fréquents et corrections de 5 minutes' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Google Analytics 4 ne suit pas le trafic ChatGPT dans Google Analytics par défaut. La majorité atterrit en Direct parce que les panneaux IA enlèvent les référents sur les types de clics courants. La solution qui marche a trois parties : un groupe de canaux personnalisé avec une liste d'hôtes de référence, une convention UTM sur les liens que vous contrôlez, et une petite vue Looker Studio qui rassemble le trafic IA en un panneau. La configuration prend environ 90 minutes et donne un signal propre en une semaine. Ce guide passe chaque étape avec les valeurs exactes.
      </p>

      <StatHighlight
        stats={[
          { value: '90 min', label: 'Temps de configuration de bout en bout dans GA4' },
          { value: '24 heures', label: 'Avant que les premiers passages Moteurs IA apparaissent' },
          { value: '6 sources', label: 'Moteurs IA à suivre par leur nom aujourd\'hui' },
        ]}
      />

      <h2 id="pourquoi-trafic-chatgpt-invisible">Pourquoi le trafic ChatGPT est invisible dans GA4 par défaut</h2>
      <p>
        GA4 classe le trafic en canaux par défaut au moyen d'une cascade de règles qui vérifie le référent, le médium et la source. Quand un utilisateur clique une citation dans une réponse ChatGPT, le clic passe souvent par une redirection qui ne préserve pas l'en-tête referer. Le navigateur arrive sur votre site sans aucun référent, et GA4 retombe sur Direct, le seau pour le contexte manquant.
      </p>
      <p>
        Direct est un seau bruyant. Il mélange les visites avec signets, les URL tapées à la main, les liens d'application, les clics de courriels depuis des clients de bureau qui enlèvent les référents, et les clics de moteurs IA. Si vous regardez l'acquisition de trafic et voyez Direct grimper alors que les autres canaux restent stables, les suspects sont les clics de moteurs IA et les ouvertures de courriel, pas les vrais saisies. Le travail consiste à séparer la tranche IA pour que le rapport dise la vérité.
      </p>
      <p>
        Les groupes de canaux par défaut de GA4 en 2025 ont ajouté un seau « Recherche organique autre » qui attrape un peu de trafic IA, mais la couverture est partielle et le seau mélange encore Yandex et Baidu et une longue traîne de petits moteurs. Un groupe de canaux personnalisé est la seule solution propre qui passe à l'échelle quand de nouveaux moteurs IA entrent dans le mix.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>L'écosystème des moteurs IA évolue vite. ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot sont les six à suivre par leur nom aujourd'hui. Ajoutez une règle d'attente « Autre IA » pour que le prochain moteur émergent ait un seau prêt. Mettre à jour la liste des règles chaque trimestre fait partie de la maintenance.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="groupe-canaux-personnalise-ga4">Le groupe de canaux personnalisé GA4 pour les moteurs IA</h2>
      <p>
        Créez un groupe de canaux personnalisé dans GA4. Admin, Paramètres de la propriété, Groupes de canaux, puis Créer un groupe. Nommez-le Moteurs IA. Ajoutez un canal pour chaque moteur en utilisant une règle Source correspond à regex. Le regex couvre les variations d'hôte pour qu'un changement de domaine côté source ne fasse pas tomber silencieusement le trafic.
      </p>
      <ul>
        <li><strong>ChatGPT :</strong> source correspond à un regex qui couvre l'ancien hôte de chat et l'hôte chatgpt.com.</li>
        <li><strong>Perplexity :</strong> source correspond à <code>perplexity\.ai</code>.</li>
        <li><strong>Claude :</strong> source correspond à <code>claude\.ai</code>.</li>
        <li><strong>Gemini :</strong> source correspond à <code>gemini\.google\.com</code>.</li>
        <li><strong>Google AIO :</strong> source correspond au paramètre AI Overview que votre étiquetage ajoute, puisque AIO ne passe pas toujours un hôte distinct.</li>
        <li><strong>Bing Copilot :</strong> source correspond à <code>copilot\.microsoft\.com|bing\.com\/copilot</code>.</li>
      </ul>
      <p>
        Ajoutez le groupe de canaux comme dimension secondaire du rapport Acquisition de trafic. L'ordre des canaux dans le groupe compte parce que GA4 évalue les règles de haut en bas et s'arrête au premier match. Mettez le moteur le plus précis en premier et le fourre-tout « Autre IA » en dernier pour qu'un moteur inconnu se retrouve quand même dans IA plutôt que de glisser dans Direct.
      </p>

      <InternalLink
        to="/glossary"
        title="Glossaire AiLys"
        description="Définitions en langage clair pour AI Traffic, Share of Model, AEO, GEO et le reste du vocabulaire de la recherche IA."
      />

      <SectionDivider />

      <h2 id="convention-utm-acheminement-ia">La convention UTM qui survit à l'acheminement IA</h2>
      <p>
        Le groupe de canaux attrape le trafic quand le référent survit. La convention UTM attrape le reste. Étiquetez chaque lien que vous contrôlez dans votre propre contenu, vos citations, vos fiches de répertoires et vos billets de blogue avec un ensemble UTM stable. ChatGPT préserve les paramètres UTM plus souvent que les référents, surtout sur les liens cités dans les panneaux de réponse.
      </p>
      <p>
        Utilisez une convention stable pour la source. utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. utm_medium reste ai_search pour tous les moteurs, ce qui permet de bâtir une seule règle qui attrape chaque médium IA même quand la source est inconnue. utm_campaign nomme la pièce de contenu ou la surface de citation, comme wikidata_entry ou yelp_listing.
      </p>
      <p>
        Documentez la convention dans une seule page que l'équipe peut consulter. Les mots exacts comptent moins que la cohérence. L'erreur la plus fréquente est de changer la valeur de source en milieu de trimestre, ce qui brise les comparaisons de cohortes et force des réécritures de regex laides. Choisissez un ensemble, écrivez-le et arrêtez de le changer.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>L'application la plus rapide d'une convention UTM est une petite balise de redirection en bordure qui met chaque UTM en minuscules et réécrit un alias erroné connu vers la valeur canonique avant que GA4 n'ingère le passage. Une seule règle de redirection corrige une année de dérive accidentelle sans toucher au groupe de canaux.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="liste-hotes-reference">La liste d'hôtes de référence à surveiller pour ChatGPT et compagnie</h2>
      <p>
        Au-delà du groupe de canaux GA4, l'opérateur devrait tenir une liste de surveillance des hôtes de référence qui apparaissent à proximité du trafic IA. Ce sont les hôtes qui signalent une intention de moteur IA même quand le clic n'est pas passé directement par le panneau de réponse. Épinglez-les dans Rapports, Acquisition, Acquisition de trafic, et ajoutez l'hôte comme dimension secondaire pour une vérification rapide.
      </p>
      <ul>
        <li><strong>chatgpt.com</strong> et l'ancien hôte de chat pour les clics de recherche ChatGPT.</li>
        <li><strong>perplexity.ai</strong> pour les citations Perplexity et les questions de suivi.</li>
        <li><strong>claude.ai</strong> pour les résultats de recherche Claude.</li>
        <li><strong>gemini.google.com</strong> pour les références Gemini.</li>
        <li><strong>google.com/search</strong> avec le paramètre d'extrait AI Overview pour AIO.</li>
        <li><strong>copilot.microsoft.com, bing.com/copilot</strong> pour Bing Copilot.</li>
        <li><strong>duckduckgo.com</strong> pour l'intégration de l'assistant IA.</li>
        <li><strong>kagi.com</strong> pour les fonctions FastGPT et Universal Summarizer.</li>
      </ul>
      <p>
        Traitez la liste comme un document vivant. De nouveaux moteurs IA entrent chaque trimestre et d'anciens changent de marque ou fusionnent. L'habitude de maintenance est de revoir la liste d'hôtes chaque mois contre les référents réels qui apparaissent dans GA4 et le moteur AI Visibility AiLys, puis d'ajouter tout nouvel hôte qui apparaît avec un volume non négligeable.
      </p>

      <img
        src={meta.images.mid}
        alt="Panneau Looker Studio montrant le trafic IA hebdomadaire de ChatGPT, Perplexity et Google AIO avec recouvrement de conversion"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Une clinique locale voit le trafic Direct grimper vite dans GA4 alors que la recherche organique reste stable. Quel est le suspect le plus probable avant tout autre vérification?"
        options={[
          'Les clients tapent l\'URL à la main plus que d\'habitude',
          'Les clics de moteurs IA atterrissent en Direct parce que l\'en-tête de référent est enlevé',
          'Google Analytics sous-estime la recherche organique ce mois-ci',
          'Un concurrent achète du trafic de marque sur Bing',
        ]}
        correctIndex={1}
        explanation="ChatGPT et les autres panneaux IA acheminent souvent les clics par des redirections qui éliminent l'en-tête referer. GA4 n'a nulle part où attribuer le clic et retombe sur Direct. Un groupe de canaux Moteurs IA personnalisé jumelé à des UTM sur les liens cités comble l'écart en une semaine."
      />

      <SectionDivider />

      <h2 id="panneau-looker-studio-trafic-ia">Un panneau Looker Studio qui révèle le trafic IA en une vue</h2>
      <p>
        Les rapports GA4 répondent à des questions ponctuelles mais ils sont lents pour la surveillance quotidienne. Bâtissez un panneau Looker Studio qui rassemble le trafic IA en une vue, filtré par le groupe de canaux personnalisé. Le panneau a besoin de cinq widgets : trafic IA hebdomadaire par moteur, principales pages d'arrivée par moteur IA, taux de conversion par moteur IA, durée moyenne de session par moteur IA, et une tendance d'hôtes de référence qui expose les nouveaux moteurs à mesure qu'ils émergent.
      </p>
      <p>
        Connectez Looker Studio à la propriété GA4 avec le connecteur officiel. Ajoutez le groupe de canaux personnalisé Moteurs IA comme dimension. Réglez la plage de dates aux 28 derniers jours pour les widgets de tendance et une comparaison de 90 jours pour les widgets de conversion. Épinglez le panneau à un signet enregistré pour que l'équipe le consulte chaque semaine sans rebâtir la vue.
      </p>
      <p>
        Pour les opérateurs multi-emplacements, superposez un filtre d'emplacement pour que chaque propriétaire de succursale voie le trafic IA qui a atterri sur ses pages d'emplacement. Le filtre d'emplacement expose aussi le travail d'entité de quartier qui compose la cadence d'avis et les citations AI Overviews. Les propriétaires qui suivent ça chaque semaine attrapent le prochain virage de classement de moteur en un ou deux cycles.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA et la voix? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="suivi-conversion-recherche-ia">Suivi de conversion pour la recherche IA, ce qui compte et ce qui ne compte pas</h2>
      <p>
        Les conversions de recherche IA atterrissent généralement plus tard dans l'entonnoir que le SEO classique. Un utilisateur lit une réponse IA, clique vers une page de service, part, puis revient en Direct ou par recherche de marque le lendemain pour réserver ou appeler. Le modèle de conversion par défaut de GA4 créditera la deuxième visite. La solution est de bâtir des chemins de conversion assistée qui incluent le canal Moteurs IA n'importe où dans le parcours utilisateur.
      </p>
      <p>
        Dans GA4, ouvrez Publicité, Attribution, Chemins de conversion. Ajoutez le groupe de canaux personnalisé Moteurs IA à la vue de chemin. Les colonnes de premier point de contact et de conversion assistée révèlent la part que les moteurs IA ont vraiment ouvert. Nous voyons des cliniques locales où 12 % des réservations ont un premier point de contact Moteurs IA même quand le même canal n'est que 3 % des conversions au dernier clic. L'écart est réel et il vit dans ce rapport.
      </p>
      <p>
        Définissez les événements de conversion qui comptent pour une entreprise locale : appel téléphonique depuis le GBP, soumission de formulaire sur la page contact, réservation en ligne, tape sur le calendrier. Chaque événement doit être un événement clé dans GA4. Reliez les événements au canal Moteurs IA par le rapport de chemin et vous pouvez argumenter le ROI de la recherche IA avec un chiffre qui survit à une revue de directeur financier.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>La vue des chemins de conversion est cachée dans Publicité, pas dans Rapports. Les opérateurs qui n'ouvrent jamais la surface Publicité manqueront les données d'assistance IA en entier et concluront que la recherche IA ne génère rien. Les données sont là, la navigation est juste enfouie deux clics plus loin que la vue Rapports par défaut.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 60 minutes du groupe de canaux GA4, du document UTM et du panneau Looker Studio sur votre propriété? Réservez un appel stratégique, sans pitch." buttonText="Réserver un appel" />

      <InternalLink
        to="/glossary/ai-traffic"
        title="Glossaire trafic IA"
        description="Définitions en langage clair pour premier point de contact, conversion assistée, groupe de canaux et le reste du vocabulaire d'analytique de la recherche IA."
      />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'GA4 ne voit pas le trafic ChatGPT par défaut, le groupe de canaux personnalisé est la seule solution propre.',
          "Le balisage UTM attrape la tranche que les en-têtes de référent manquent, choisissez une convention et figez-la.",
          'Looker Studio avec cinq widgets donne à l\'opérateur un tableau de bord quotidien de trafic IA.',
          'Les rapports de chemin de conversion révèlent la part de premier point de contact des Moteurs IA, généralement 3 à 4 fois la part au dernier clic.',
        ]}
      />

      <SectionDivider />

      <h2 id="modes-echec-frequents">Modes d'échec fréquents et corrections de 5 minutes</h2>
      <p>
        Mode d'échec un, l'ordre des règles du groupe de canaux est mauvais. GA4 évalue de haut en bas et s'arrête au premier match, donc une règle générique placée au-dessus de ChatGPT avalera le trafic ChatGPT. Correction par réordonnancement, la plus précise en premier. Mode d'échec deux, le regex est trop serré. Une règle qui cherche seulement l'ancien hôte de chat manque l'hôte chatgpt.com qui est plus courant depuis 2024. Correction en utilisant le regex avec l'opérateur OR qui couvre les deux hôtes.
      </p>
      <p>
        Mode d'échec trois, la convention UTM dérive. Une équipe qui utilise utm_source=chatgpt un trimestre puis utm_source=ChatGPT le suivant brise chaque regex qui suppose la sensibilité à la casse. Correction en mettant chaque UTM en minuscules et en écrivant une balise de redirection qui normalise la casse avant que GA4 n'ingère le passage. Mode d'échec quatre, les valeurs par défaut du modèle de conversion cachent l'assistance IA. Correction en ajoutant explicitement le canal Moteurs IA à la vue de chemin de conversion.
      </p>
      <p>
        Pour un gabarit fonctionnel qui inclut le groupe de canaux, le document UTM et le panneau Looker Studio, voyez la page <InternalLink to="/services/analytics-attribution" title="service Analytics et Attribution" /> ou lancez l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" />, qui inclut maintenant un test de préparation au trafic IA dans GA4. Les propriétaires qui veulent une visite guidée de 60 minutes peuvent <InternalLink to="/book-call" title="réserver un appel stratégique" />.
      </p>

      <InlineCTA variant="pricing" text="Besoin que le groupe de canaux GA4, la bibliothèque de balises UTM, le panneau Looker Studio et l'audit du chemin de conversion soient livrés pour vous? Voyez les forfaits AiLys pour entreprises locales." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="faq">Questions fréquentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Propriétaire d'entreprise locale consultant un tableau de bord Looker Studio de trafic IA avec tendances hebdomadaires sur six moteurs IA"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
