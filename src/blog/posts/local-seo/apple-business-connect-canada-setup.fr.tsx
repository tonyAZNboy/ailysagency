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
import { meta } from './apple-business-connect-canada-setup'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Apple Business Connect au Canada, le guide de configuration et de doublons en 2026',
  metaDescription:
    'Configuration Apple Business Connect pour les commerçants canadiens. Réclamer, vérifier, corriger les doublons, livrer des heures bilingues. Flux EN et FR-CA pour le Québec.',
  tldr: "Apple Business Connect a été lancé mondialement en 2024 et constitue maintenant un vrai deuxième pilier à côté de Google Business Profile pour les commerçants canadiens. Réclamez la fiche avec un identifiant Apple, vérifiez par téléphone ou par la poste, puis livrez des heures et des noms bilingues pour qu'Apple Maps remonte les requêtes EN et FR-CA. La douleur la plus fréquente est les doublons créés automatiquement à partir de soumissions d'utilisateurs : la correction passe par la réclamation de chaque doublon puis une demande de fusion par le formulaire de soutien. Apple Business Connect n'est pas la même chose que les anciennes Apple Maps Place Cards, qui sont retirées.",
  faqItems: [
    {
      question: "Comment retirer une fiche Apple Business Connect en double?",
      answer:
        "Vous ne pouvez pas supprimer un doublon directement. Le flux de soutien Apple Business Connect fonctionne en deux étapes. Premièrement, réclamez chaque fiche en double dans Apple Business Connect avec le même identifiant Apple. Deuxièmement, soumettez une demande de fusion par le formulaire de soutien (Apple Business Connect, « Signaler un problème avec un lieu »), en nommant la fiche canonique et les doublons par leurs URL Apple Maps. Apple résout habituellement la fusion en 5 à 10 jours ouvrables, et la fiche canonique absorbe les évaluations et l'historique de commande des doublons quand les données concordent.",
    },
    {
      question: "Apple Business Connect est-il disponible au Canada?",
      answer:
        "Oui. Apple Business Connect a été lancé mondialement en 2024 avec une prise en charge complète au Canada, y compris des champs bilingues EN et FR-CA. Les commerces canadiens peuvent réclamer, vérifier et modifier leurs fiches via businessconnect.apple.com avec un identifiant Apple. La parité de fonctions avec les fiches américaines est élevée, avec une différence : la vérification par la poste au Canada passe par Postes Canada et le délai d'arrivée est habituellement de 7 à 14 jours ouvrables, un peu plus lent que les envois américains par code ZIP.",
    },
    {
      question: "Faut-il un compte développeur Apple pour utiliser Apple Business Connect?",
      answer:
        "Non. Apple Business Connect est gratuit et ne demande qu'un identifiant Apple ordinaire. Le compte du programme développeur (99 USD par année) n'a pas de lien. La seule fonction Apple payante pour les commerces locaux est la mise à niveau Showcase Card, qui vit en bêta dans des industries précises (restaurants, hôtels) et n'est pas requise pour la visibilité dans le pack local d'Apple Maps.",
    },
    {
      question: "Comment Apple Business Connect vérifie-t-il les commerces canadiens?",
      answer:
        "Apple offre deux méthodes de vérification pour les fiches canadiennes. La vérification par téléphone appelle le numéro public du commerce avec un code à 6 chiffres, habituellement en quelques minutes. La vérification postale envoie une lettre avec un code par Postes Canada à l'adresse du commerce, qui arrive habituellement en 7 à 14 jours ouvrables. Apple ne prend pas en charge la vérification vidéo ou par agent en direct au Canada pour le moment, donc téléphone ou poste sont les seules voies. Choisissez la vérification par téléphone quand le téléphone du commerce est répondu de façon fiable durant les heures d'ouverture.",
    },
    {
      question: "Puis-je afficher des noms EN et FR-CA différents sur Apple Maps au Québec?",
      answer:
        "Oui, en partie. Apple Business Connect permet de livrer le nom du lieu dans une seule langue principale (habituellement le français au Québec pour la conformité à la Loi 96) et d'ajouter un nom anglais dans le champ des noms alternatifs. Apple Maps remonte le nom alternatif quand la langue système de l'appareil est l'anglais. Les heures, descriptions et heures spéciales se modifient de façon bilingue avec des champs séparés pour chaque langue. Les photos et les étiquettes de catégorie sont partagées entre les langues et ne peuvent pas être propres à une langue.",
    },
    {
      question: "Quelle est la différence entre Apple Business Connect et Apple Maps Place Cards?",
      answer:
        "Apple Maps Place Cards (parfois appelé Maps Connect) était l'outil précédent qu'Apple offrait pour les fiches commerciales, lancé en 2014. Il a été retiré et intégré à Apple Business Connect au début de 2024. Les fiches Place Cards existantes ont été migrées automatiquement, mais le tableau de bord Connect est une refonte complète avec de nouveaux champs (Showcases, intégrations de commande, photos de galerie), un flux de vérification différent et un soutien bilingue que l'ancien outil n'offrait pas. Les opérateurs qui ne se sont pas connectés depuis 2023 verront une fiche migrée qui les attend.",
    },
    {
      question: "Combien de temps Apple Business Connect met-il pour afficher les modifications sur Apple Maps?",
      answer:
        "Les modifications sur une fiche vérifiée apparaissent habituellement sur Apple Maps en 24 à 72 heures, la majorité étant visible en 24 heures. L'exception est le changement de catégorie ou de nom principal, qui déclenche une revue manuelle et peut prendre jusqu'à 7 jours ouvrables. Les ajouts de photos s'affichent en 24 heures. Les modifications d'heures et les heures spéciales (jours fériés, fermetures temporaires) passent habituellement en moins de 12 heures, plus vite que les autres champs parce qu'Apple pondère la justesse opérationnelle.",
    },
  ],
  headings: [
    { id: 'pourquoi-apple-business-connect-compte-pour-les-commercants-canadiens', text: 'Pourquoi Apple Business Connect compte pour les commerçants canadiens' },
    { id: 'comment-reclamer-votre-fiche-etape-par-etape', text: 'Comment réclamer votre fiche, étape par étape' },
    { id: 'verification-telephone-vs-postes-canada', text: 'Vérification, téléphone ou Postes Canada' },
    { id: 'livrer-des-heures-et-noms-bilingues-au-quebec', text: 'Livrer des heures et des noms bilingues au Québec' },
    { id: 'corriger-les-fiches-en-double-le-flux-de-fusion', text: 'Corriger les fiches en double, le flux de fusion' },
    { id: 'pourquoi-ce-n-est-pas-apple-maps-place-cards', text: "Pourquoi ce n'est pas la même chose qu'Apple Maps Place Cards" },
    { id: 'liste-de-maintenance-mensuelle', text: 'Liste de maintenance mensuelle' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Apple Business Connect est la plateforme de fiches que tout commerçant local canadien devrait réclamer en 2026. Apple Maps est sur chaque iPhone, chaque tableau CarPlay et chaque requête vocale Siri au Canada, et le tableau de bord Connect est maintenant la seule surface canonique pour modifier votre fiche. Ce guide détaille le flux de réclamation et de vérification, le flux d'heures et de noms bilingues pour la conformité au Québec, et le processus de fusion de doublons qui fait trébucher la plupart des opérateurs. La configuration complète prend environ 30 minutes plus l'attente de vérification.
      </p>

      <StatHighlight
        stats={[
          { value: '2024', label: "Année du lancement mondial d'Apple Business Connect" },
          { value: '7-14 jours', label: "Fenêtre d'arrivée du courrier de vérification Postes Canada" },
          { value: '24-72 h', label: "Délai d'apparition des modifications sur Apple Maps" },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-apple-business-connect-compte-pour-les-commercants-canadiens">Pourquoi Apple Business Connect compte pour les commerçants canadiens</h2>
      <p>
        Apple Maps est la surface cartographique par défaut sur iOS, ce qui veut dire que chaque utilisateur d'iPhone au Canada démarre la navigation, la recherche d'heures et les requêtes « près de moi » dans Apple Maps à moins d'avoir explicitement basculé. La part de marché iOS au Canada tourne autour de 55 à 60 pour cent des téléphones intelligents, bien au-dessus de la moyenne mondiale. Un commerce local non réclamé sur Apple Business Connect est invisible ou erroné sur plus de la moitié des recherches mobiles canadiennes, peu importe la solidité de son Google Business Profile.
      </p>
      <p>
        Apple Business Connect ferme cet écart. Le tableau Connect permet de fixer les heures, les photos, le nom du lieu, la description du commerce, les liens de commande, les cartes de galerie et les étiquettes de catégorie. Apple Maps lit d'abord les données Connect et ne se rabat sur les modifications collaboratives que si un champ est vide. Les fiches réclamées dépassent les fiches non réclamées dans les résultats « près de moi » d'Apple Maps, et l'écart est suffisamment grand pour faire une différence dans toutes les catégories que nous avons mesurées.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Apple Business Connect est aussi le flux de données que Siri et CarPlay lisent pour les requêtes locales. Une fiche réclamée avec des heures à jour est la seule manière de garantir que Siri répond correctement à « est-ce que la clinique est ouverte en ce moment » quand l'utilisateur conduit avec CarPlay, là où la friction d'une mauvaise réponse est la plus forte.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez savoir si votre commerce est correctement réclamé sur Apple Business Connect dans tous vos emplacements? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="comment-reclamer-votre-fiche-etape-par-etape">Comment réclamer votre fiche, étape par étape</h2>
      <p>
        Le flux de réclamation passe par businessconnect.apple.com. Vous vous connectez avec un identifiant Apple (n'importe lequel fonctionne, y compris un identifiant personnel, mais nous recommandons un identifiant d'affaires dédié lié à un courriel d'entreprise pour la passation et l'accès d'équipe). Après la connexion, vous cherchez votre commerce par nom et adresse. Apple recoupe avec les enregistrements Apple Maps existants et vous offre la fiche s'il trouve une concordance.
      </p>

      <h3>La séquence de réclamation en cinq étapes</h3>
      <ol>
        <li>Connectez-vous à businessconnect.apple.com avec l'identifiant Apple d'affaires</li>
        <li>Cherchez le commerce par nom exact et adresse complète</li>
        <li>Choisissez la bonne concordance dans les fiches suggérées (ou créez une nouvelle fiche si aucune ne correspond)</li>
        <li>Confirmez votre rôle (propriétaire, gestionnaire, marketing) dans l'invite</li>
        <li>Choisissez une méthode de vérification (téléphone ou poste Canada) et suivez l'étape suivante</li>
      </ol>

      <p>
        Si la fiche n'existe pas encore sur Apple Maps, le flux de création neuve permet de soumettre l'enregistrement complet d'entrée : nom, adresse, téléphone, catégorie principale, heures. La nouvelle fiche passe par la revue d'Apple et apparaît habituellement sur Apple Maps en 5 jours ouvrables, séparément de l'étape de vérification qui se passe en parallèle.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Utilisez un identifiant Apple d'affaires dédié, pas un identifiant personnel. L'identifiant personnel est lié au partage familial, au calendrier et aux photos du propriétaire, ce qui crée un casse-tête de passation quand le propriétaire vend ou recule. Un identifiant Apple d'affaires avec un courriel comme apple@votreentreprise.ca vit dans le gestionnaire de mots de passe de l'entreprise et survit aux changements d'équipe.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="verification-telephone-vs-postes-canada">Vérification, téléphone ou Postes Canada</h2>
      <p>
        Apple Business Connect vérifie les fiches canadiennes par deux méthodes. La vérification par téléphone appelle le numéro public du commerce avec un code automatique à 6 chiffres, habituellement en moins de 5 minutes après la demande. Le code est lu à voix haute et vous le saisissez dans le tableau Connect. Choisissez la vérification par téléphone quand le téléphone du commerce est répondu de façon fiable durant les heures d'ouverture, que la ligne n'est pas seulement une boîte vocale, et que le numéro de la fiche correspond au numéro que vous décrochez vraiment.
      </p>
      <p>
        La vérification postale envoie une lettre avec un code à 6 chiffres par Postes Canada à l'adresse rue du commerce. L'arrivée prend habituellement 7 à 14 jours ouvrables après la demande. Choisissez la vérification postale quand le téléphone du commerce n'est pas fiable (cellulaire seulement, service de réception partagé, réceptionniste virtuel) ou quand la fiche a plusieurs réclamations en attente. La poste est aussi la seule méthode qui fonctionne pour les commerces sans téléphone public, comme les cabinets-conseils qui ne prennent que des courriels.
      </p>

      <h3>Ce qu'Apple n'offre pas au Canada (encore)</h3>
      <ul>
        <li>Vérification vidéo (partage d'écran en direct avec un représentant Apple). Disponible dans certains marchés américains, pas au Canada en 2026.</li>
        <li>Vérification par agent en direct (clavardage en temps réel pour confirmer l'identité). Pas disponible au Canada.</li>
        <li>Vérification par courriel avec correspondance de domaine. Pas offerte sur Apple Business Connect dans aucun marché.</li>
      </ul>

      <p>
        Pour la plupart des opérateurs canadiens, le téléphone est le bon choix. La poste est le repli quand le téléphone échoue. La fenêtre de vérification ne bloque pas la création de la fiche, mais elle bloque la soumission de modifications : une fiche non vérifiée peut être réclamée mais pas modifiée tant que le code n'est pas saisi.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quelle méthode de vérification Apple Business Connect fonctionne pour un commerce du Québec sans numéro de téléphone public?"
        options={[
          'Vérification par téléphone seulement, avec une redirection vers un cellulaire privé',
          "Vérification par courriel avec le domaine de l'entreprise",
          "Postes Canada à l'adresse du commerce",
          'Vérification vidéo avec un représentant Apple',
        ]}
        correctIndex={2}
        explanation="Apple Business Connect prend en charge la vérification par téléphone et par Postes Canada au Canada. La vérification par courriel n'est pas offerte, et la vérification vidéo n'est pas disponible au Canada en 2026. Pour un commerce sans téléphone public, la poste est la seule voie. Le courrier arrive en 7 à 14 jours ouvrables avec un code à 6 chiffres."
      />

      <SectionDivider />

      <h2 id="livrer-des-heures-et-noms-bilingues-au-quebec">Livrer des heures et des noms bilingues au Québec</h2>
      <p>
        Les fiches locales du Québec ont besoin de champs bilingues EN et FR-CA pour la conformité à la Loi 96 et pour bien apparaître sur les iPhones dont la langue système est l'anglais. Apple Business Connect gère la configuration bilingue avec une langue principale plus des champs de noms alternatifs et de description traduite. Les heures, les heures spéciales (jours fériés, fermetures temporaires) et les coordonnées vivent dans des champs partagés qui sont neutres en langue.
      </p>

      <h3>La liste de configuration bilingue</h3>
      <ol>
        <li>Fixez le nom principal du lieu en français (le nom légal québécois du commerce)</li>
        <li>Ajoutez le nom anglais alternatif dans le champ des noms alternatifs</li>
        <li>Rédigez la description du commerce en français comme principale, avec la description anglaise dans le champ de description traduite</li>
        <li>Les heures et heures spéciales s'appliquent aux deux langues, aucune édition séparée n'est requise</li>
        <li>Confirmez que la ville de l'adresse est le nom légal français (Montréal avec l'accent, pas Montreal)</li>
      </ol>

      <p>
        Apple Maps remonte le nom alternatif quand la langue système de l'iPhone est réglée en anglais. Le pack local et la fiche de navigation montrent à l'utilisateur la langue qui correspond, ce qui améliore la confiance et le clic sur les requêtes EN et FR-CA. Pour le cadre plus large de cohérence NAP qui relie Apple Business Connect à vos autres citations, voyez <InternalLink to="/glossary/nap" title="Entrée glossaire NAP" description="Définitions pour la cohérence Nom, Adresse, Téléphone" /> et lancez un audit complet par <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Inclut la vérification du statut Apple Business Connect" />.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>N'inscrivez pas le nom anglais comme principal sur un commerce enregistré au Québec. L'Office québécois de la langue française surveille les fiches commerciales publiques, et une fiche Apple Maps dont le nom principal est en anglais sur une raison commerciale française enregistrée peut déclencher un suivi de conformité. Principal en français, alternatif en anglais, à chaque fois.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Écran de champs bilingues Apple Business Connect montrant le nom principal français, le nom alternatif anglais et les heures partagées pour un commerce du Québec"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="pricing" text="Voyez les paliers AiLys qui incluent la configuration Apple Business Connect et la maintenance bilingue, à partir de Core à 799 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="corriger-les-fiches-en-double-le-flux-de-fusion">Corriger les fiches en double, le flux de fusion</h2>
      <p>
        Les fiches Apple Maps en double sont la douleur la plus fréquente que les opérateurs canadiens rencontrent sur Apple Business Connect. Les doublons sont habituellement créés automatiquement à partir de soumissions d'utilisateurs, où un usager d'iPhone a ajouté le commerce par le flux « Signaler un problème » sur Apple Maps avant que le propriétaire ne se connecte à Connect. Le doublon a souvent une graphie de nom légèrement différente, un téléphone périmé ou une adresse désuète, et il dispute la même requête dans le pack local.
      </p>
      <p>
        Apple ne permet pas aux propriétaires de supprimer les doublons directement. Le flux de fusion est la seule voie, et il roule en deux étapes. Premièrement, réclamez chaque fiche en double dans Apple Business Connect avec le même identifiant Apple. Le tableau montre toutes les fiches réclamées sous le compte dans une seule vue. Deuxièmement, soumettez une demande de fusion par le formulaire de soutien, en nommant la fiche canonique et les doublons par leurs URL Apple Maps. Apple résout habituellement la fusion en 5 à 10 jours ouvrables.
      </p>

      <h3>La marche à suivre pour la demande de fusion</h3>
      <ol>
        <li>Ouvrez le soutien Apple Business Connect : choisissez « Fiches » puis « Signaler un problème avec un lieu »</li>
        <li>Dans le formulaire, choisissez « Fiches en double » comme type de problème</li>
        <li>Collez l'URL Apple Maps de la fiche canonique (celle que vous voulez garder)</li>
        <li>Collez les URL Apple Maps de chaque doublon (une par ligne)</li>
        <li>Ajoutez une note d'un paragraphe expliquant que vous possédez toutes les fiches et voulez les fusionner dans la fiche canonique</li>
        <li>Soumettez et attendez la confirmation par courriel</li>
      </ol>

      <p>
        Quand la fusion se règle, la fiche canonique absorbe les évaluations, l'historique de commande et les enregistrements de photos des doublons quand les données concordent. Les champs divergents (téléphones différents, heures différentes) ne sont pas fusionnés automatiquement : Apple garde les données de la fiche canonique et écarte les champs divergents des doublons. C'est pourquoi il faut réclamer les doublons d'abord : cela permet de corriger les données divergentes avant la fusion, pour que rien ne se perde.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Apple Maps ne pénalise pas les commerces qui ont eu des doublons historiques. Le classement du pack local après une fusion s'améliore habituellement en 2 à 4 semaines parce que la fiche canonique consolide maintenant tous les signaux d'engagement qui étaient auparavant divisés.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pourquoi-ce-n-est-pas-apple-maps-place-cards">Pourquoi ce n'est pas la même chose qu'Apple Maps Place Cards</h2>
      <p>
        Apple Maps Place Cards (parfois appelé Maps Connect) était l'outil précédent qu'Apple offrait pour les fiches commerciales, lancé en 2014 et retiré au début de 2024 quand Apple Business Connect l'a remplacé. Les opérateurs qui ne se sont pas connectés depuis 2023 verront une fiche migrée qui les attend dans Connect, avec les anciens champs préservés mais le nouvel ensemble de fonctions débloqué.
      </p>
      <p>
        La migration a été automatique et silencieuse, donc la plupart des propriétaires ne savent pas que leur fiche a bougé. Le tableau Connect ajoute les Showcases (cartes riches avec images et CTA), les photos de galerie, les intégrations de commande, les champs bilingues et un flux de vérification redessiné. L'ancienne URL Place Cards (mapsconnect.apple.com) redirige vers businessconnect.apple.com, mais la nouvelle URL est la surface canonique pour chaque modification désormais.
      </p>

      <p>
        Pour les propriétaires qui reviennent après une longue pause, l'action pratique est de se connecter à businessconnect.apple.com, d'accepter la fiche migrée et de rouler la liste de configuration bilingue dessus. La fiche migrée garde le statut de vérification d'origine, donc aucune nouvelle vérification n'est requise sauf si l'adresse ou le téléphone a changé.
      </p>

      <SectionDivider />

      <h2 id="liste-de-maintenance-mensuelle">Liste de maintenance mensuelle</h2>
      <p>
        Apple Business Connect demande moins d'attention que Google Business Profile parce qu'Apple ne prend pas en charge les publications de type GBP pour le moment. La maintenance mensuelle est légère, pas nulle.
      </p>

      <h3>Ce qu'il faut vérifier chaque mois</h3>
      <ol>
        <li>Justesse des heures, y compris les heures spéciales du mois à venir (jours fériés, fermetures planifiées)</li>
        <li>Rafraîchissement de photos : ajoutez 2 à 4 nouvelles photos par mois pour garder la galerie active</li>
        <li>Revue de description et d'accroche : confirmez que les descriptions bilingues correspondent encore au mélange de services courant</li>
        <li>Cartes Showcase (si activées) : alternez pour mettre en valeur la promotion ou le service saisonnier en cours</li>
        <li>Balayage de doublons : cherchez le nom et l'adresse du commerce sur Apple Maps, confirmez qu'aucun nouveau doublon n'est apparu à partir de soumissions d'utilisateurs</li>
      </ol>

      <p>
        La revue mensuelle complète prend environ 15 minutes par emplacement. Les opérateurs sur des plans multi-emplacements regroupent habituellement la revue le premier jour ouvrable de chaque mois, jumelée à la revue mensuelle de Google Business Profile. Pour relier la maintenance Apple à votre carnet de fiches plus large, voyez <InternalLink to="/industries" title="Livres de jeu industriels" description="Plans par industrie pour la maintenance multiplateformes" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de votre configuration Apple Business Connect, du balayage de doublons et du flux bilingue? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Apple Business Connect a été lancé mondialement en 2024 et est la surface canonique pour modifier les fiches Apple Maps au Canada.",
          "Réclamez via businessconnect.apple.com avec un identifiant Apple d'affaires dédié, pas un identifiant personnel.",
          'Vérifiez par téléphone (5 minutes) ou par Postes Canada (7 à 14 jours ouvrables). Le téléphone est la voie par défaut au Canada.',
          "Les fiches du Québec ont besoin du français comme nom principal, de l'anglais dans le champ de nom alternatif, et de descriptions bilingues.",
          'Les fiches en double ne peuvent pas être supprimées. Réclamez chaque doublon, puis soumettez une demande de fusion par le formulaire de soutien.',
          "Apple Maps Place Cards a été migré automatiquement dans Connect en 2024. Les propriétaires qui ne se sont pas connectés depuis 2023 voient une fiche migrée.",
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
        alt="Liste de maintenance mensuelle Apple Business Connect pour un commerce local du Québec avec des champs bilingues"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
