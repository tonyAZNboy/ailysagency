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
import { meta } from './google-review-velocity-playbook'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Cadence d'avis Google, combien il en faut pour le local pack",
  metaDescription:
    "Combien d'avis Google faut-il pour figurer dans le local pack? Voici le playbook de cadence avec cibles mensuelles, fenêtre de fraîcheur et ratios qui bougent vraiment le classement.",
  tldr: "La plupart des entreprises locales ont besoin de 80 à 150 avis Google cumulés avec 4 à 6 avis frais chaque mois pour tenir une position dans le local pack. Le total compte moins que la fraîcheur. Google pondère maintenant les 60 derniers jours plus fortement, donc une cadence régulière bat une rafale unique. La cible exacte dépend du plancher des concurrents dans votre catégorie et votre ville.",
  faqItems: [
    {
      question: "Combien d'avis Google faut-il pour figurer dans le local pack?",
      answer:
        "La plupart des entreprises locales ont besoin de 80 à 150 avis cumulés avec 4 à 6 avis frais chaque mois pour tenir une position dans le local pack. La cible exacte est fixée par le plancher des concurrents dans votre catégorie et votre ville. Auditez les concurrents en deuxième et cinquième position du local pack, puis battez la moyenne entre les deux de 25 % sur le cumul et égalez-les sur la cadence mensuelle.",
    },
    {
      question: "La fraîcheur des avis compte-t-elle plus que le total?",
      answer:
        "Oui depuis le changement de pondération de 2024 sur Google et le changement iOS 18.2 sur Apple Maps. Une clinique avec 80 avis et 5 dans les 30 derniers jours dépasse maintenant une clinique avec 400 avis et zéro activité récente. La fraîcheur se lit comme un signal que l'entreprise est en exploitation et livre actuellement. La cible honnête est une cadence régulière, pas une rafale trimestrielle suivie d'un silence.",
    },
    {
      question: "À quelle vitesse répondre à un avis Google?",
      answer:
        "Dans les 24 heures pour les avis négatifs, dans les 72 heures pour les positifs. La vitesse et le taux de réponse sont des entrées directes du classement. Les entreprises qui répondent à plus de 80 % des avis dans la semaine dépassent celles sans habitude de réponse, même à moyennes égales. Bâtissez une pile de gabarits pour que la réponse soit rapide sans sonner générique.",
    },
    {
      question: "Les outils de filtrage d'avis sont-ils permis par Google?",
      answer:
        "Non. Envoyer seulement les clients heureux à Google et router les insatisfaits vers un formulaire privé enfreint les politiques d'avis Google et peut signaler votre fiche. La version conforme est de demander à chaque client le même message, puis de gérer la récupération de service séparément si l'expérience était mauvaise. La plupart des sanctions vues viennent d'une question d'enquête qui filtre par satisfaction avant d'afficher le lien Google.",
    },
    {
      question: "Comment obtenir plus d'avis Google sans enfreindre la politique?",
      answer:
        "Envoyez une invitation à laisser un avis dans les 24 heures suivant la visite, avec un lien direct vers la page d'avis de votre fiche Google Business Profile. Demandez à chaque client, pas seulement aux heureux. Utilisez un outil d'acheminement qui signe la demande au nom de l'employé. La variété de mots-clés de service dans l'invitation augmente les taux de citation AI Overviews en bonus. Évitez les incitatifs qui conditionnent un paiement à un avis positif, Google les pénalise.",
    },
  ],
  headings: [
    { id: 'ce-que-cadence-veut-dire', text: "Ce que la cadence d'avis Google veut vraiment dire en 2026" },
    { id: 'les-chiffres-par-categorie', text: 'Les chiffres par catégorie, ce que 80, 150 et 300 avis vous achètent vraiment' },
    { id: 'fenetre-de-fraicheur-google', text: 'La fenêtre de fraîcheur que Google surveille et pourquoi elle a changé' },
    { id: 'comment-tenir-la-cadence-mensuelle', text: 'Comment tenir la cadence mensuelle sans enfreindre la politique' },
    { id: 'taux-de-reponse-comme-signal', text: 'Le taux de réponse comme signal que la plupart des propriétaires ignorent' },
    { id: 'mots-cles-dans-le-texte', text: 'Mots-clés dans le texte des avis et comment les moteurs IA les réutilisent' },
    { id: 'plan-cadence-90-jours', text: 'Un plan de cadence sur 90 jours pour les fiches stagnantes' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        La plupart des entreprises locales ont besoin de 80 à 150 avis Google cumulés avec 4 à 6 avis frais chaque mois pour tenir une position dans le local pack en 2026. La cible exacte de cadence d'avis Google dépend du plancher des concurrents dans votre catégorie et votre ville, mais la structure est la même. Le total compte moins que la fraîcheur, le taux de réponse compte plus que la plupart des propriétaires le réalisent, et la variété de mots-clés dans le texte des avis alimente directement les citations AI Overviews. Voici comment les chiffres jouent et comment tenir la cadence sans enfreindre la politique de Google.
      </p>

      <StatHighlight
        stats={[
          { value: '80-150', label: 'Avis cumulés requis pour la plupart des entreprises locales' },
          { value: '4-6', label: 'Avis frais par mois pour tenir le classement' },
          { value: '60 jours', label: "Fenêtre de fraîcheur que Google pondère le plus" },
        ]}
      />

      <h2 id="ce-que-cadence-veut-dire">Ce que la cadence d'avis Google veut vraiment dire en 2026</h2>
      <p>
        La cadence d'avis est le nombre de nouveaux avis par unité de temps, pondéré par la fraîcheur. Deux fiches d'entreprise avec la même note moyenne et le même cumul peuvent se classer très différemment si l'une obtient des avis chaque mois et l'autre est silencieuse depuis les fêtes. Google lit le silence comme un signe que l'entreprise peut être en déclin, même si l'opérateur sait que le travail va très bien.
      </p>
      <p>
        La cadence n'est pas le volume. Une clinique qui obtient 30 avis lors d'une semaine de lancement puis zéro pendant 12 semaines se classe sous une clinique qui obtient 1 avis tous les quatre jours pour le même trimestre. L'algorithme du local pack a appris à escompter les rafales. Le motif paraît artificiel et la pondération de fraîcheur frappe immédiatement après la fin de la rafale.
      </p>
      <p>
        La cadence interagit aussi avec le taux de réponse. Une fiche qui obtient 6 avis par mois et répond aux 6 dépasse une fiche qui obtient 6 avis par mois et ne répond à aucun. Le texte des réponses devient une surface de citation pour les moteurs IA, un bonus discret que les propriétaires avec une habitude de réponse active récoltent gratuitement.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Le plancher de cadence d'avis Google est fixé par le groupe concurrent, pas par un nombre absolu. En catégorie urbaine dense, le plancher est plus haut parce que le groupe est plus compétitif. En marché rural ou spécialisé, 30 avis cumulés et 2 par mois suffisent pour tenir le sommet du map pack. Auditez votre groupe avant de fixer votre cible mensuelle.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="les-chiffres-par-categorie">Les chiffres par catégorie, ce que 80, 150 et 300 avis vous achètent vraiment</h2>
      <p>
        La réponse honnête à « combien d'avis Google faut-il » est « à quoi ressemble votre local pack ». Nous avons tiré les comptes d'avis des 30 premiers gagnants du local pack dans six catégories de clients AiLys au Québec pour bâtir une base de référence. Le motif est cohérent entre catégories.
      </p>
      <ul>
        <li><strong>Cliniques dentaires :</strong> 80 à 150 avis cumulés, 4 à 6 frais par mois, moyenne 4,7 étoiles ou plus.</li>
        <li><strong>Restaurants en quartier dense :</strong> 200 à 400 avis cumulés, 8 à 15 frais par mois, moyenne 4,5 étoiles ou plus.</li>
        <li><strong>Cabinets juridiques (famille ou immigration) :</strong> 30 à 80 avis cumulés, 2 à 4 frais par mois, moyenne 4,8 étoiles ou plus.</li>
        <li><strong>Détaillants spécialisés :</strong> 100 à 250 avis cumulés, 5 à 10 frais par mois, selon la fréquence de transaction.</li>
        <li><strong>Entrepreneurs en services à domicile :</strong> 50 à 120 avis cumulés, 3 à 6 frais par mois, taux de réponse au-dessus de 80 %.</li>
        <li><strong>Hôtels et gîtes :</strong> 150 à 350 avis cumulés répartis entre Google, TripAdvisor et Booking.</li>
      </ul>
      <p>
        Ce sont des planchers, pas des plafonds. Atteindre le plancher vous fait entrer dans le local pack. Battre la moyenne du groupe de 25 % en cumul et l'égaler en cadence mensuelle vous fait monter dans le top trois. Au-delà, les rendements diminuent à moins que la densité concurrentielle ne soit inhabituellement élevée.
      </p>

      <InternalLink
        to="/audit"
        title="AI Visibility Audit gratuit"
        description="Inclut un test de cadence d'avis comparé à vos cinq premiers concurrents du local pack."
      />

      <SectionDivider />

      <h2 id="fenetre-de-fraicheur-google">La fenêtre de fraîcheur que Google surveille et pourquoi elle a changé</h2>
      <p>
        Google a discrètement basculé vers une fenêtre de fraîcheur de 60 jours pendant 2024 et l'a maintenue jusqu'en 2025. Le changement répondait aux cimetières d'avis, ces fiches avec des milliers de notes héritées et zéro activité actuelle. Apple a livré le même virage dans iOS 18.2 avec une fenêtre de 30 à 60 jours. Les deux algorithmes ont convergé vers la même réponse parce que le même problème s'appliquait.
      </p>
      <p>
        Pour un opérateur, l'implication est tranchante. Une clinique qui a obtenu 80 avis il y a deux ans et a cessé de demander glisse dans le classement même si sa moyenne tient. Une clinique qui obtient 5 avis chaque mois grimpe. Le réordonnancement peut se produire en un trimestre, ce qui est plus rapide que ce que la plupart des propriétaires attendent d'un signal lié aux avis.
      </p>
      <p>
        La solution est une cadence régulière, pas une campagne. Une campagne qui double le compte mensuel pour un mois puis se termine ne tiendra pas le nouveau classement. Bâtissez un système qui pousse une demande d'avis après chaque transaction et vous garderez la pondération de fraîcheur de votre côté sans travailler plus fort.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>L'édit qui a le plus de levier sur un programme d'avis stagnant est de passer de l'invitation par courriel envoyée le lendemain à un SMS le jour même à la sortie du rendez-vous. Le SMS le jour même double à peu près le taux de réponse parce que la visite est encore fraîche dans la tête du client, et c'est précisément le moment où l'avis s'écrit tout seul.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-tenir-la-cadence-mensuelle">Comment tenir la cadence mensuelle sans enfreindre la politique</h2>
      <p>
        La mécanique est simple. Envoyez une invitation à laisser un avis dans les 24 heures suivant la visite, avec un lien direct vers la page d'avis de la fiche Google Business Profile. Demandez à chaque client, pas seulement aux heureux. Utilisez un outil d'acheminement qui signe la demande au nom de l'employé et selon la langue préférée. La variété de mots-clés de service dans l'invitation augmente les taux de citation AI Overviews en bonus.
      </p>
      <p>
        À éviter : les outils de filtrage d'avis qui filtrent par satisfaction avant de montrer le lien Google. Google qualifie cette pratique de trompeuse et a appliqué des sanctions sur des fiches prises à le faire. La version conforme est de demander à tous avec la même invitation, puis de gérer la récupération de service séparément si l'expérience était mauvaise. Le client mécontent peut quand même laisser un avis. La bonne action est de bien répondre, pas de cacher.
      </p>
      <p>
        Les incitatifs sont aussi restreints. Google interdit de conditionner un paiement, un rabais ou un service à un avis positif. Un courriel de remerciement plat ou un petit jeton d'appréciation après l'avis qui ne dépend pas de la note est la surface sécuritaire. Le module Reviuzy dans la pile AiLys s'occupe de l'acheminement, de la cadence et des garde-fous de politique d'office.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma montrant le flux d'invitation à laisser un avis sur 24 heures du rendez-vous à la page d'avis Google Business Profile"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Deux entreprises locales ont la même note moyenne et le même cumul d'avis. Pourquoi Google en classe une plus haut dans le local pack?"
        options={[
          'Celle qui s\'est inscrite plus tôt à Google Ads',
          'Celle qui cache les avis négatifs derrière un filtre de satisfaction',
          'Celle avec une cadence d\'avis récents régulière, pondérée sur les 60 derniers jours',
          'Celle dont la fiche Google Business Profile est la plus ancienne',
        ]}
        correctIndex={2}
        explanation="Google pondère maintenant les 60 derniers jours d'avis plus fortement que le total. Une entreprise avec 5 avis frais ce mois-ci dépasse une entreprise qui a obtenu tous ses avis il y a deux ans, parce que la fraîcheur se lit comme un signal que l'opération livre actuellement."
      />

      <SectionDivider />

      <h2 id="taux-de-reponse-comme-signal">Le taux de réponse comme signal que la plupart des propriétaires ignorent</h2>
      <p>
        Le taux de réponse est une entrée directe du classement que la plupart des propriétaires sous-pondèrent. Les entreprises qui répondent à plus de 80 % des avis dans la semaine dépassent celles sans habitude de réponse, même à moyennes égales. Les avis négatifs sont les réponses au plus fort levier parce que la réponse est visible à chaque futur client qui survole la fiche.
      </p>
      <p>
        Bâtissez une pile de gabarits, pas un script. La pile devrait couvrir quatre scénarios : avis positif avec mention de service, avis positif avec commentaire générique, avis négatif avec une affirmation factuelle corrigible, et avis négatif d'opinion. Chaque gabarit reste sous 100 mots et termine par une fermeture personnalisée nommant l'employé. Une réponse qui prend 90 secondes bat une réponse qui sonne générique.
      </p>
      <p>
        Répondez dans les 24 heures pour les avis négatifs, dans les 72 heures pour les positifs. La vitesse signale que l'opérateur est attentif. Le texte de réponse devient partie de la surface de citation de la page pour les moteurs IA comme Google AIO et Perplexity, qui montent maintenant les motifs de réponse dans leurs résumés sur l'entreprise.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA et la voix? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="mots-cles-dans-le-texte">Mots-clés dans le texte des avis et comment les moteurs IA les réutilisent</h2>
      <p>
        Le texte d'avis n'est plus juste une note. Les moteurs IA fouillent les mots dans les avis pour répondre aux requêtes spécifiques à un service. Une clinique avec plusieurs avis qui mentionnent « pédiatrique » ressort pour les requêtes vocales « dentiste pour enfants près de moi » et les réponses AI Overviews. Une clinique avec des avis qui disent tous « excellente clinique » ne gagne rien sur la différenciation.
      </p>
      <p>
        Concevez la variété de mots-clés. Après un rendez-vous pédiatrique, demandez au parent de décrire la visite par service. Après un blanchiment, demandez à la patiente de mentionner le blanchiment par son nom. L'invitation doit sonner naturelle et courte. Trois ou quatre mentions de service sur les 60 derniers jours suffisent généralement à commencer à émerger pour la requête correspondante.
      </p>
      <p>
        Suivez l'inventaire comme un calendrier de contenu. Tirez les 30 derniers jours de texte d'avis, comptez les mentions de chaque service prioritaire et corrigez le plus faible avec la prochaine ronde d'invitations. Ce travail compose et il augmente les taux de citation sur Siri, Google AIO et Perplexity en même temps.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Évitez les services qui promettent des centaines d'avis depuis des comptes achetés ou qui acheminent les avis par des pages d'atterrissage tierces conçues pour filtrer les clients mécontents. Google détecte les deux motifs et applique des sanctions qui peuvent suspendre la fiche au complet. La liste de correctifs conformes est courte et durable : invitations le jour même, accès égal au lien d'avis et zéro incitatif conditionnel.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 60 minutes du test de groupe et de la pile de gabarits de réponse sur votre fiche? Réservez un appel stratégique, sans pitch." buttonText="Réserver un appel" />

      <InternalLink
        to="/glossary/review-velocity"
        title="Glossaire de la cadence d'avis"
        description="Définitions en langage clair pour fenêtre de fraîcheur, taux de réponse et le reste du vocabulaire du classement local pack."
      />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'La plupart des entreprises locales ont besoin de 80 à 150 avis cumulés avec 4 à 6 frais par mois pour tenir le classement.',
          'La fraîcheur bat maintenant le total. Google surveille les 60 derniers jours, Apple les 30 à 60.',
          'Un taux de réponse de plus de 80 % dans la semaine est une entrée directe du classement.',
          "Les mots-clés du texte d'avis alimentent les citations AI Overviews et vocales, concevez la variété.",
        ]}
      />

      <SectionDivider />

      <h2 id="plan-cadence-90-jours">Un plan de cadence sur 90 jours pour les fiches stagnantes</h2>
      <p>
        Jours 1 à 14, auditez le groupe. Tirez le cumul et le compte des 30 derniers jours pour les cinq premiers concurrents du local pack dans votre catégorie. Réglez la cible mensuelle à 4 avis au-dessus de la moyenne du groupe, avec un taux de réponse au-dessus de 80 %. Jours 15 à 30, installez l'outil d'acheminement qui envoie une demande d'avis dans les 24 heures suivant chaque visite, avec support bilingue si le marché l'exige.
      </p>
      <p>
        Jours 31 à 60, bâtissez la pile de gabarits de réponse et assignez la fenêtre de réponse quotidienne à un propriétaire nommé. Visez 24 heures pour les négatifs, 72 heures pour les positifs. Jours 61 à 90, auditez l'inventaire de mots-clés, corrigez le service le plus faible et reprenez le test de groupe. La plupart des fiches stagnantes montent de deux positions dans le local pack en 90 jours si le système tourne chaque jour, pas seulement au lancement.
      </p>
      <p>
        Après le 90<sup>e</sup> jour, le travail devient de la maintenance. Planifiez le test de groupe chaque trimestre, l'audit de mots-clés chaque mois et l'habitude de réponse chaque jour ouvrable. Pour la version dentiste de la cadence, voyez le hub <InternalLink to="/industries" title="playbooks d'industrie" />. Les propriétaires qui veulent un diagnostic rapide peuvent lancer l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" /> d'abord, puis réserver un appel stratégique pour dimensionner le programme.
      </p>

      <InlineCTA variant="pricing" text="Besoin d'un programme géré de cadence d'avis avec acheminement SMS, pile de réponses et test de groupe en pilote automatique? Voyez les forfaits AiLys pour entreprises locales." buttonText="Voir les forfaits" />

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
        alt="Propriétaire d'entreprise locale consultant un tableau de bord de cadence d'avis Google avec rythme mensuel et taux de réponse"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
