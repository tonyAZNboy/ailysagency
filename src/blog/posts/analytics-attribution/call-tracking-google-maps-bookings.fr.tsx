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
import { meta } from './call-tracking-google-maps-bookings'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Suivi des appels Google Maps, le branchement GBP et GA4",
  metaDescription:
    "Peut-on suivre les appels téléphoniques partis d'une fiche Google Maps? Oui. Voici le branchement GBP Insights, GA4 server-side et numéros dynamiques avec la conformité Loi 25 incluse.",
  tldr: "Les appels téléphoniques qui partent d'une fiche Google Maps sont traçables. Google Business Profile expose déjà les événements d'appel dans l'API Insights et les pousse vers GA4 quand la propriété est bien liée. Pour une attribution plus profonde, branchez un numéro téléphonique dynamique avec CallRail ou Twilio Studio pour que le canal source survive jusqu'au système de réservation. Au Québec, toute la chaîne doit franchir la barre de consentement de la Loi 25 avant tout enregistrement ou enrichissement de renseignements personnels.",
  faqItems: [
    {
      question: "Peut-on suivre les appels téléphoniques partis d'une fiche Google Maps?",
      answer:
        "Oui. Google Business Profile expose les événements d'appel dans son API Insights, et une propriété GA4 bien liée capte le même événement comme une conversion d'appel téléphonique en provenance de Google Organique. Pour une attribution plus profonde dans le système de réservation, branchez un numéro dynamique avec CallRail ou Twilio Studio pour que la source survive à l'appel. Au Québec, chaque couche doit honorer le consentement Loi 25 avant tout enregistrement ou enrichissement.",
    },
    {
      question: "Quelle est la différence entre les insights d'appel GBP et un vrai outil de suivi d'appels?",
      answer:
        "Les insights d'appel GBP comptent le clic sur le bouton d'appel sur Google Maps et la fiche GBP. Un outil de suivi d'appels remplace le numéro affiché par un numéro de transfert lié au canal source et enregistre la destination, la durée d'appel, l'indicatif régional du correspondant et (avec consentement) l'enregistrement. Les deux couches sont complémentaires : GBP donne le haut du tunnel, l'outil de suivi donne le résultat de la réservation.",
    },
    {
      question: "Échanger le numéro GBP pour un numéro de suivi va-t-il nuire au classement local pack?",
      answer:
        "Non quand c'est bien fait. Google permet explicitement un numéro suivi sur la fiche GBP tant que le numéro principal reste la ligne principale de l'entreprise et que la fiche reste cohérente NAP à travers les citations. Le motif le plus sécuritaire est de mettre le numéro de suivi comme numéro secondaire sur le GBP et de garder la ligne principale comme primaire, ce qui préserve le graphe de citations tout en captant les appels étiquetés à la source.",
    },
    {
      question: "Comment envoyer un événement d'appel téléphonique depuis un système téléphonique vers GA4?",
      answer:
        "Utilisez le Measurement Protocol GA4 depuis un point de terminaison côté serveur. CallRail, Twilio Studio et la plupart des outils gérés exposent un webhook qui se déclenche après la fin de l'appel. Acheminez la charge utile vers un petit point de terminaison sur votre pile qui mappe les étiquettes source, médium et campagne dans l'événement phone_call de GA4. Gardez l'identifiant utilisateur cohérent (un numéro d'appelant haché ou un client ID dérivé de la session) pour que l'appel atterrisse sur le même enregistrement utilisateur que la session web.",
    },
    {
      question: "La Loi 25 du Québec s'applique-t-elle au suivi d'appels sur une fiche Google Maps?",
      answer:
        "Oui. La Loi 25 s'applique à tout renseignement personnel collecté auprès d'une résidente du Québec, et un numéro de téléphone avec les métadonnées d'appel s'y qualifient. La barre de conformité demande un consentement explicite avant l'enregistrement, un avis de confidentialité publié sur le site, une durée de conservation documentée et un contact pour les demandes d'accès ou de suppression. La plupart des outils gérés livrent des avis Loi 25, mais l'obligation reste à l'entreprise, donc révisez l'avis et le flux de consentement avant de mettre en ligne.",
    },
  ],
  headings: [
    { id: 'ce-que-google-maps-expose', text: "Ce que Google Maps expose vraiment pour les appels téléphoniques" },
    { id: 'gbp-insights-et-le-lien-ga4', text: "GBP Insights, le lien GA4 et ce que chaque couche mesure" },
    { id: 'numeros-dynamiques-callrail-twilio', text: "Numéros dynamiques avec CallRail et Twilio Studio" },
    { id: 'numeros-decores-utm', text: "Numéros téléphoniques décorés UTM, le motif d'opérateur" },
    { id: 'ingestion-evenements-cote-serveur', text: "Ingestion d'événements côté serveur dans GA4" },
    { id: 'liste-loi-25-consentement', text: "Liste de vérification Loi 25 pour l'enregistrement d'appels" },
    { id: 'plan-deploiement-30-jours', text: 'Un plan de déploiement de 30 jours de zéro à réservations attribuées' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les appels téléphoniques qui partent d'une fiche Google Maps sont traçables d'un bout à l'autre. Google Business Profile compte déjà le clic sur le bouton d'appel dans l'API Insights et envoie une conversion d'appel téléphonique vers GA4 quand les deux propriétés sont liées. Pour une attribution plus profonde dans le système de réservation, un numéro téléphonique dynamique avec CallRail ou Twilio Studio capte le canal source, l'étiquette de campagne et la durée d'appel. Les fiches Québec ajoutent une exigence en plus : le consentement Loi 25 avant tout enregistrement ou enrichissement. Ce guide parcourt toute la pile, de la fiche GBP à la rangée de réservation dans la base de données.
      </p>

      <StatHighlight
        stats={[
          { value: 'Oui', label: 'Les appels depuis Google Maps sont traçables aujourd\'hui' },
          { value: '3 couches', label: 'Insights GBP, lien GA4, outil de suivi dynamique' },
          { value: 'Loi 25', label: 'Barre de consentement québécoise pour enregistrement et enrichissement' },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-que-google-maps-expose">Ce que Google Maps expose vraiment pour les appels téléphoniques</h2>
      <p>
        Google Business Profile compte chaque clic sur le bouton d'appel de la page de fiche et de la carte Maps. L'événement s'appelle CALLS dans l'API Insights héritée et est exposé comme métrique de performance d'appel téléphonique dans la nouvelle API Performance. Le compte est le clic, pas l'appel connecté, ce qui veut dire qu'un correspondant qui raccroche avant que la ligne décroche enregistre quand même un événement d'appel. L'écart est petit en pratique mais il compte au moment de réconcilier avec le système téléphonique.
      </p>
      <p>
        L'API Insights ventile aussi les requêtes qui ont déclenché les impressions de fiche, ce qui permet de corréler les appels avec des catégories d'intention (marque, catégorie, près de moi). C'est la couche d'attribution que GBP fournit gratuitement, et elle suffit à beaucoup d'entreprises locales pour dimensionner le canal avant d'investir dans un outil de suivi dédié. Les données atterrissent dans le tableau de bord Insights et sont aussi importées dans GA4 quand la propriété GBP est liée par le même compte Google.
      </p>
      <p>
        Ce que GBP n'expose pas est la destination de l'appel, la durée, l'indicatif régional du correspondant ou l'enregistrement. Pour cela, il faut une couche au-dessus de la fiche. C'est là que CallRail, Twilio Studio ou un outil de suivi géré entre dans la pile. Les deux couches ne se concurrencent pas : elles répondent à des questions différentes. GBP vous dit combien d'appels la fiche a produits. L'outil de suivi vous dit ce qui s'est passé pendant l'appel.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>L'API Insights GBP a un quota documenté et une rétention de 540 jours. Tirez les données d'appel dans votre propre entrepôt sur une cadence hebdomadaire pour que la tendance historique survive même si une fiche change de propriétaire ou si l'accès à l'API tombe. Voyez l'<InternalLink to="/glossary/ai-traffic" title="entrée du glossaire AI Traffic" description="Taxonomie de sources qui inclut Google Maps, les moteurs IA et le direct" /> pour situer Google Maps dans la taxonomie de sources.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Lancez l'audit gratuit pour voir combien d'appels votre fiche a produits le trimestre dernier et où les données GBP fuient hors de GA4." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="gbp-insights-et-le-lien-ga4">GBP Insights, le lien GA4 et ce que chaque couche mesure</h2>
      <p>
        Le lien GBP et GA4 se règle dans le tableau de bord Performance de GBP. Une fois le lien actif, GA4 commence à recevoir une conversion d'appel téléphonique Google Organique comme événement de session. L'événement est attribué au canal Google Organique, pas à une source Google Maps par défaut. Pour séparer Maps de l'organique régulier, il faut soit ajouter un lien décoré UTM sur la fiche, soit utiliser un numéro de suivi qui déclenche son propre événement GA4 avec une valeur de source spécifique à Maps.
      </p>
      <p>
        GA4 comptera l'événement d'appel comme une conversion de session quand il est configuré comme événement clé dans les paramètres de propriété. Les appels apparaissent alors dans les rapports standards à côté des soumissions de formulaires, des réservations et des événements e-commerce. Le piège est que la session attachée à l'événement d'appel est la session Google Organique qui a atterri sur le GBP, pas nécessairement une session sur le site web. Pour les propriétaires qui se soucient de l'attribution web, la couche numéro dynamique est la prochaine étape.
      </p>
      <p>
        Pour les entreprises multi-sites, le lien GBP et GA4 ne règle que la propriété parent. Chaque emplacement a besoin de sa propre audience GA4 ou de sa propre vue filtrée pour voir les appels par emplacement. Le motif plus propre à l'échelle est une seule propriété GA4 avec une dimension d'emplacement passée sur l'événement, ce qui garde la surface d'analyse unifiée. Pour la stratégie UTM par emplacement, voyez la <InternalLink to="/blog/utm-strategy-multi-location-business" title="stratégie UTM pour entreprises multi-sites" description="Convention de nommage qui survit à travers GBP, payant et AI Visibility" />.
      </p>

      <SectionDivider />

      <h2 id="numeros-dynamiques-callrail-twilio">Numéros dynamiques avec CallRail et Twilio Studio</h2>
      <p>
        Un numéro téléphonique dynamique est un numéro de transfert lié à un canal source spécifique. CallRail est le produit géré que la plupart des entreprises locales utilisent, et Twilio Studio est l'option à bâtir soi-même pour les équipes déjà sur Twilio. Les deux fonctionnent de la même façon au niveau de la fiche : remplacer le numéro affiché dans le champ de téléphone secondaire du GBP, garder la ligne principale comme primaire et configurer le transfert pour faire sonner la même ligne d'entreprise.
      </p>
      <p>
        CallRail livre les intégrations Google préconstruites. Le numéro sur le GBP devient un numéro CallRail, l'appel sonne à destination, et CallRail déclenche un webhook avec la source, la campagne, la durée et l'enregistrement (quand le consentement est saisi). Le palier gratuit couvre quelques centaines de minutes par mois, ce qui suffit à la majorité des entreprises à un seul emplacement. Twilio Studio coûte moins par minute à l'échelle mais demande le travail d'intégration pour brancher le webhook dans GA4 et le système de réservation.
      </p>
      <p>
        Le risque à gérer est la cohérence NAP. Google permet explicitement un numéro de suivi sur la fiche GBP, mais seulement quand la ligne principale reste la ligne principale de l'entreprise et que les citations à travers le web restent alignées avec cette principale. Le geste d'audit est de lancer un balayage de citations après chaque échange de numéro et de confirmer qu'aucune fiche tierce n'a changé par accident. Pour la discipline de citation, voyez <InternalLink to="/glossary/ai-traffic" title="bases de la cohérence NAP" description="Comment numéros, adresses et noms s'alignent à travers le graphe de citations" />.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Mettez le numéro de suivi dans la fente de téléphone secondaire du GBP et gardez la ligne principale comme primaire. Cela préserve la cohérence NAP à travers le graphe de citations existant tout en routant l'appel par le numéro étiqueté à la source. La fiche GBP affiche le numéro secondaire sur Maps dans la plupart des surfaces, ce qui est l'emplacement voulu pour le suivi.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="numeros-decores-utm">Numéros téléphoniques décorés UTM, le motif d'opérateur</h2>
      <p>
        Un numéro téléphonique décoré UTM est le motif où l'outil de suivi assigne un numéro par combinaison source-médium-campagne. Le numéro sur la fiche GBP est un numéro. Le numéro sur une extension d'appel Google Ads est un deuxième numéro. Le numéro sur une campagne Meta payante est un troisième. Chaque numéro fait sonner la même ligne d'entreprise, mais l'étiquette de source sur l'événement d'appel correspond au canal qui a produit le clic. C'est la façon la plus propre de séparer les appels Google Maps des appels Google Ads des appels de recherche organique dans un seul tableau de bord.
      </p>
      <p>
        La convention de nommage des étiquettes UTM doit correspondre à la convention du site. Source pour l'appel de la fiche GBP est google, médium est organic, campagne est gbp-listing. Source pour l'appel Google Ads est google, médium est cpc, campagne est le nom réel de la campagne. Garder la convention cohérente entre le site web et la couche d'appel veut dire qu'une seule dimension de source peut alimenter les deux rapports.
      </p>
      <p>
        Pour les entreprises multi-sites, l'étiquette de campagne porte l'emplacement. campagne est gbp-listing-laval pour la fiche de Laval, gbp-listing-quebec pour la fiche de Québec, et ainsi de suite. La dimension d'emplacement peut aussi être passée comme dimension personnalisée distincte si l'entreprise porte déjà un champ d'emplacement sur tous les autres événements. La bonne réponse dépend du schéma GA4 déjà en place. Pour les propriétaires qui bâtissent à partir de zéro, le schéma à propriété unique avec dimension d'emplacement passe mieux à l'échelle.
      </p>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Une dentiste québécoise a une fiche GBP à Laval, une extension d'appel Google Ads et un site web avec un bouton clic-pour-appeler. La propriétaire veut savoir quel canal a produit les réservations le mois dernier. Quelle est la pile minimale pour répondre?"
        options={[
          'L\'API Insights GBP seule',
          'GA4 avec le lien GBP activé',
          'Trois numéros dynamiques (un par canal) qui alimentent GA4 plus le système de réservation, avec consentement Loi 25 sur chaque jambe',
          'Un seul numéro de suivi sur la fiche GBP',
        ]}
        correctIndex={2}
        explanation="GBP Insights et le lien GA4 donnent le compte d'appels par canal en haut du tunnel, mais pas le résultat de réservation. Trois numéros dynamiques, un par canal, plus l'événement GA4 côté serveur et la réconciliation avec le système de réservation sont la pile minimale pour répondre quel canal a produit les réservations. Le consentement Loi 25 court sur chaque jambe avant tout enregistrement ou enrichissement."
      />

      <SectionDivider />

      <h2 id="ingestion-evenements-cote-serveur">Ingestion d'événements côté serveur dans GA4</h2>
      <p>
        L'outil de suivi déclenche un webhook quand l'appel se termine. La charge utile du webhook inclut la source, le médium, la campagne, la durée et (avec consentement) l'URL de l'enregistrement. Le webhook atterrit sur un petit point de terminaison sur votre pile qui mappe la charge utile dans un événement phone_call GA4 par le Measurement Protocol GA4. Le point de terminaison roule côté serveur, ce qui veut dire qu'il survit aux bloqueurs de pubs, à l'effacement des cookies et à la dépréciation des cookies tiers qui a déjà cassé le suivi côté client sur Safari et Firefox.
      </p>
      <p>
        L'identifiant utilisateur sur l'événement GA4 compte plus que la plupart des propriétaires le réalisent. Si l'outil de suivi passe un numéro d'appelant haché, GA4 peut coudre l'appel à une session web quand le même identifiant est apparu sur une vue de formulaire ou un événement clic-pour-appeler antérieur. Si l'outil ne passe pas d'identifiant, l'appel atterrit comme utilisateur séparé, ce qui gonfle le compte d'utilisateurs et casse le tunnel de conversion. Le bon motif est de dériver un identifiant stable du client ID de session quand l'appel vient du site, et d'un numéro de téléphone haché quand l'appel vient de la fiche GBP.
      </p>
      <p>
        Le point de terminaison devrait aussi acheminer le même événement vers le système de réservation. La plupart des systèmes de réservation acceptent un webhook avec les métadonnées d'appel attachées au dossier client. Cela joint l'appel à la réservation côté arrière, donc une requête sur la table de réservation peut séparer les réservations par source de la même façon que l'analytique web sépare les sessions par source. C'est la couche qui transforme le suivi d'appels en système d'attribution en boucle fermée plutôt qu'en compteur de haut de tunnel.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne passez pas le numéro brut du correspondant dans GA4. Le Measurement Protocol interdit explicitement les identifiants personnels, et un numéro brut avec l'horodatage peut ré-identifier l'appelant. Hachez toujours le numéro de téléphone avant l'envoi, et documentez la fonction de hachage dans l'avis de confidentialité pour fins d'audit Loi 25.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Diagramme de séquence montrant le webhook de l'outil de suivi qui se déclenche vers un point de terminaison côté serveur qui achemine un événement phone_call vers GA4 et un dossier client vers le système de réservation"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="pricing" text="Vous voulez une pile gérée d'attribution d'appels avec branchement GBP, GA4 et système de réservation? Voyez les forfaits AiLys." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="liste-loi-25-consentement">Liste de vérification Loi 25 pour l'enregistrement d'appels</h2>
      <p>
        La Loi 25 est la réglementation québécoise sur la vie privée entrée en vigueur en 2023 et resserrée en 2024. La loi s'applique à tout renseignement personnel collecté auprès d'une résidente du Québec, et un numéro de téléphone avec les métadonnées d'appel s'y qualifient. La barre de conformité a cinq couches pour le suivi d'appels, et chaque couche a besoin d'un propriétaire documenté avant la mise en ligne du système.
      </p>
      <ol>
        <li>Consentement explicite avant l'enregistrement. Le message d'accueil enregistré sur l'appel dit que l'appel peut être enregistré et donne au correspondant un moyen de retirer son consentement avant le début de l'enregistrement.</li>
        <li>Avis de confidentialité sur le site. L'avis liste l'outil de suivi comme sous-traitant, décrit les données collectées, la durée de conservation et les droits du correspondant.</li>
        <li>Durée de conservation. La plupart des entreprises locales fixent 12 mois pour l'enregistrement d'appel et 36 mois pour les métadonnées, avec une tâche de purge documentée.</li>
        <li>Contact d'accès et de suppression. Une personne nommée à l'entreprise qui traite les demandes d'accès et de suppression dans le délai légal de réponse.</li>
        <li>Ententes de sous-traitance. Le contrat de l'outil de suivi porte les obligations Loi 25 jusqu'à CallRail, Twilio ou qui que ce soit qui traite les données.</li>
      </ol>
      <p>
        La plupart des outils gérés livrent des avis Loi 25 et des invites de consentement comme bascule de fonctionnalité, mais l'obligation reste à l'entreprise. Révisez le langage de l'avis avec une conseillère en vie privée avant la mise en ligne. Le coût d'une violation Loi 25 va d'un avertissement écrit à une amende dans les millions pour les récidivistes, donc la révision en amont est une assurance peu coûteuse.
      </p>

      <SectionDivider />

      <h2 id="plan-deploiement-30-jours">Un plan de déploiement de 30 jours de zéro à réservations attribuées</h2>
      <p>
        Jours 1 à 5, liez la propriété GBP à la propriété GA4 et vérifiez que la conversion d'appel téléphonique se déclenche dans GA4. Tirez les 90 derniers jours de données d'appel GBP Insights dans une vue d'entrepôt pour préserver la base de référence historique. Confirmez que la fiche GBP a le bon numéro principal et qu'elle correspond au graphe de citations.
      </p>
      <p>
        Jours 6 à 15, configurez l'outil de suivi. Choisissez CallRail pour un branchement géré ou Twilio Studio pour une construction sur mesure. Provisionnez les numéros dynamiques (un pour la fiche GBP, un pour le site, un pour toute extension d'annonce payante). Mettez à jour le téléphone secondaire du GBP avec le numéro de suivi. Lancez le balayage de citations après l'échange et confirmez qu'aucune fiche tierce n'a changé par accident.
      </p>
      <p>
        Jours 16 à 25, bâtissez le point de terminaison côté serveur. Le point de terminaison reçoit le webhook de l'outil de suivi, mappe la charge utile vers l'événement phone_call GA4, hache le numéro du correspondant et achemine un dossier client vers le système de réservation. Validez la chaîne de bout en bout avec un appel test depuis chaque source. Confirmez que l'événement GA4 atterrit avec les bonnes étiquettes source-médium-campagne et que le système de réservation montre les métadonnées d'appel sur le dossier client.
      </p>
      <p>
        Jours 26 à 30, livrez la couche Loi 25. Mettez à jour l'avis de confidentialité du site avec la divulgation du sous-traitant outil de suivi. Configurez le message d'accueil enregistré sur l'outil pour saisir le consentement avant le début de l'enregistrement. Documentez les durées de conservation et le contact d'accès et de suppression. Faites le premier test de bout en bout avec le flux de consentement actif. Pour le motif d'audit plus large qui inclut la vérification Loi 25, voyez l'<InternalLink to="/audit" title="AI Visibility et audit d'attribution gratuit en 24 heures" description="Inclut une révision d'attribution d'appels et un test de préparation Loi 25" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 60 minutes de la pile de suivi d'appels sur vos fiches GBP? Réservez un appel stratégique, sans pitch, le schéma de pile est envoyé peu importe." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Les appels depuis Google Maps sont traçables aujourd\'hui par GBP Insights, le lien GA4 et un numéro dynamique sur la fiche.',
          'Mettez le numéro de suivi dans la fente de téléphone secondaire du GBP et gardez la ligne principale comme primaire pour préserver la cohérence NAP.',
          'Utilisez le Measurement Protocol GA4 depuis un point de terminaison côté serveur pour que l\'événement survive aux bloqueurs et à la dépréciation des cookies.',
          'Hachez le numéro du correspondant avant de l\'envoyer à GA4 et documentez la fonction de hachage dans l\'avis de confidentialité.',
          'La Loi 25 demande consentement explicite avant enregistrement, avis de confidentialité publié, durée de conservation et contact de suppression.',
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
        alt="Propriétaire révisant un tableau de bord d'attribution d'appels téléphoniques avec Google Maps comme source distincte à côté d'Organique, Payant et Moteurs IA"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
