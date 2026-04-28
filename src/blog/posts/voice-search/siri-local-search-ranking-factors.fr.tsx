/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  InternalLink,
  SectionDivider,
} from '../../components/shared'
import { meta } from './siri-local-search-ranking-factors'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Facteurs de classement Siri pour la recherche locale, le guide 2026',
  metaDescription:
    "Siri choisit les entreprises locales avec une autre pile de signaux que Google. Voici les huit facteurs qui décident quel dentiste ou clinique Siri nomme en premier.",
  tldr: "Siri choisit l'entreprise locale qu'il recommande à proximité en lisant une pile de signaux épurée : une fiche Apple Maps Connect vérifiée, la fraîcheur des avis, des mots-clés de service précis dans les avis, des catégories GBP qui correspondent aux catégories Apple, la distance et un petit ensemble de marqueurs de confiance comme un site qui fonctionne et un numéro de téléphone réclamé. La plupart des cliniques ne réclament jamais leur fiche Apple Maps Connect, donc la barre est plus basse qu'on le croit.",
  faqItems: [
    {
      question: 'Comment Siri choisit-il quel dentiste recommander à proximité?',
      answer:
        "Siri lit d'abord une fiche Apple Maps Connect vérifiée, puis superpose quatre signaux : la distance par rapport à l'iPhone, les mots de service précis dans les avis récents, les catégories GBP qui correspondent aux catégories Apple, et un site qui fonctionne avec un numéro de téléphone réclamé. Si deux cliniques sont à égalité, celle qui a des avis plus frais dans les 30 derniers jours gagne. Les propriétaires qui ne réclament jamais Apple Maps Connect sortent complètement de la réponse.",
    },
    {
      question: 'Siri utilise-t-il les données de Google Business Profile?',
      answer:
        "Siri s'appuie sur Apple Maps Connect, Yelp, TripAdvisor pour l'hôtellerie, et un petit panier de partenaires de données tiers. Google Business Profile n'est pas une entrée directe, mais les catégories réglées sur GBP reflètent souvent les catégories Apple Maps, ce qui aide indirectement. L'erreur consiste à penser que le travail Google couvre Siri. Ce n'est pas le cas.",
    },
    {
      question: 'Mes avis doivent être à quel point récents pour me classer dans Siri?',
      answer:
        "Apple pondère les 30 à 60 derniers jours plus fortement que le total d'avis. Une clinique avec 80 avis et 5 dans le dernier mois dépasse une clinique avec 400 avis et zéro activité récente. Visez 4 à 6 avis frais par mois au minimum, et orientez vos invitations pour que les patients mentionnent le service précis qu'ils ont reçu.",
    },
    {
      question: 'Apple Maps et Siri partagent-ils le même classement?',
      answer:
        "Ils partagent la couche de données mais pas la sortie de classement. Apple Maps affiche une liste, Siri lit un ou deux noms à voix haute. La coupure est plus tranchée pour Siri parce que la réponse est parlée, donc les marqueurs de confiance comme une fiche vérifiée et un numéro de téléphone réclamé pèsent plus. Une clinique troisième dans Apple Maps peut ne jamais être nommée par Siri.",
    },
    {
      question: 'Comment vérifier si Siri me recommande?',
      answer:
        "Faites un test de requête vocale structuré depuis un iPhone propre à l'extérieur du cabinet, trois fois sur des jours différents. Posez la question longue traîne que vos clients posent vraiment, comme « Dis Siri, trouve un dentiste pour enfants près de moi ». Notez quelles entreprises sont lues à voix haute, dans quel ordre, et si votre fiche apparaît. Reprenez le test chaque trimestre.",
    },
  ],
  headings: [
    { id: 'comment-siri-decide', text: 'Comment Siri décide vraiment quelle entreprise locale recommander' },
    { id: 'apple-maps-connect-la-base', text: 'Apple Maps Connect, la base que la plupart des cliniques sautent' },
    { id: 'frequence-et-fraicheur-des-avis', text: 'Fréquence et fraîcheur des avis, la deuxième pondération' },
    { id: 'mots-cles-de-service-dans-les-avis', text: 'Mots-clés de service dans les avis, le troisième levier' },
    { id: 'correspondance-de-categories-et-distance', text: 'Correspondance de catégories et distance, les quatrième et cinquième signaux' },
    { id: 'marqueurs-de-confiance-de-siri', text: 'Marqueurs de confiance que Siri vérifie avant de lire un nom' },
    { id: 'plan-siri-90-jours-cliniques', text: 'Un plan Siri sur 90 jours pour les cliniques qui veulent gagner' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="iPhone affichant une réponse vocale de Siri pour une requête de dentiste près de moi au Québec"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Siri choisit l'entreprise locale qu'il recommande à proximité en lisant une pile de signaux épurée que presque aucun propriétaire de clinique au Québec n'audite. Les huit facteurs sont prévisibles, les écarts sont communs et la liste de correctifs est courte. Ce guide couvre chaque facteur de classement Siri en recherche locale, l'ordre dans lequel Apple les pondère, et le plan de 90 jours qui ferme l'écart pour une clinique dentaire typique, une médecine familiale ou un studio spécialisé.
      </p>

      <StatHighlight
        stats={[
          { value: '8', label: 'Facteurs lus par Siri avant de nommer une entreprise' },
          { value: '30-60j', label: 'Fenêtre d\'avis qu\'Apple pondère le plus' },
          { value: '~25 %', label: 'Des requêtes vocales dentistes perdues sans Apple Maps Connect' },
        ]}
      />

      <h2 id="comment-siri-decide">Comment Siri décide vraiment quelle entreprise locale recommander</h2>
      <p>
        Siri n'effectue pas une exploration en direct du web quand un client demande un dentiste à proximité. Apple assemble un index local à partir d'un petit ensemble de sources : fiches Apple Maps Connect vérifiées, Yelp, TripAdvisor pour l'hôtellerie, quelques partenaires de données sous licence, et le signal de localisation de l'iPhone. Quand une requête arrive, Siri filtre cet index par catégorie et distance, puis classe les survivants selon la fraîcheur des avis, les mots-clés de service dans les avis, et un petit panier de marqueurs de confiance.
      </p>
      <p>
        La sortie est un ou deux noms lus à voix haute. Cette coupure plus tranchée explique pourquoi le classement vocal est plus difficile à gagner qu'une liste Maps. Une clinique au troisième rang sur Apple Maps peut ne jamais être nommée par Siri. Votre objectif n'est pas de figurer sur la liste, c'est d'être l'une des deux fiches en tête que Siri juge assez fiables pour les prononcer.
      </p>
      <p>
        Les huit facteurs ci-dessous reflètent ce que nous voyons dans nos tests vocaux hebdomadaires sur 30 verticales au Québec, exécutés depuis des iPhones propres dans trois quartiers différents. Les propriétaires qui traitent ceci comme une liste de vérification montent généralement dans les deux premiers en un trimestre, parce que la plupart des concurrents directs ne réclament jamais leur fiche Apple Maps Connect.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Apple ne publie pas ses pondérations de classement vocal. Les facteurs ci-dessous proviennent de tests vocaux structurés, de modifications contrôlées de fréquence d'avis et d'expériences de correspondance de catégories à travers le portefeuille de clients AiLys. Considérez l'ordre comme notre meilleure lecture, pas une spécification publique.</p>
      </CalloutBox>

      <h2 id="apple-maps-connect-la-base">Apple Maps Connect, la base que la plupart des cliniques sautent</h2>
      <p>
        Apple Maps Connect est la surface de vérification pour les entreprises qui veulent alimenter directement l'index local d'Apple. Une fiche réclamée et vérifiée sur mapsconnect.apple.com bat un flux de données tiers dans chaque requête vocale que nous avons exécutée depuis le changement de pondération discret livré avec iOS 18.2 à la fin de 2025. Si vous n'avez pas réclamé votre fiche, Siri peut encore vous nommer quand aucun concurrent vérifié n'existe à proximité, mais dès qu'une clinique vérifiée apparaît en face, vous tombez.
      </p>
      <p>
        Le processus de réclamation prend environ dix minutes. Connectez-vous avec un identifiant Apple, cherchez l'entreprise, puis vérifiez par rappel au numéro de téléphone listé ou par carte postale. Une fois vérifié, les heures, services, photos et coordonnées alimentent directement les réponses parlées de Siri. La plupart des cliniques ne le font jamais parce que Google Business Profile paie les factures, ce qui rend la réclamation Apple Maps Connect un travail asymétrique pour une récompense asymétrique.
      </p>
      <p>
        Après vérification, auditez la fiche chaque trimestre. Apple livre des changements de pondération de recommandations locales sans annonce. Un audit trimestriel attrape la dérive sur les catégories de service, les heures et le statut de vérification avant que le classement vocal ne s'érode. Combinez cet audit avec un suivi de fréquence d'avis et un balayage de diversité de mots-clés sur les 30 derniers jours.
      </p>

      <InternalLink
        to="/audit/gbp"
        title="Lancez l'audit GBP et Apple Maps gratuit"
        description="Voyez exactement quels signaux de classement vocal vous manquent sur Siri, Google Assistant et Alexa."
      />

      <h2 id="frequence-et-fraicheur-des-avis">Fréquence et fraîcheur des avis, la deuxième pondération</h2>
      <p>
        Apple pondère les 30 à 60 derniers jours d'avis plus fortement que le total. Le changement est volontaire. Apple combat les cimetières d'avis, ces fiches avec des centaines de notes héritées et zéro activité actuelle. Une clinique avec 80 avis et 5 dans le dernier mois dépasse maintenant une clinique avec 400 avis et rien de frais, parce que Siri lit l'activité récente comme une preuve d'entreprise en exploitation.
      </p>
      <p>
        Le plancher pratique est de 4 à 6 avis frais par mois. En dessous, le classement commence à glisser après le deuxième mois d'inactivité. Au-dessus, vous bâtissez une résilience contre la prochaine modification de pondération. La cadence bat la rafale. Une clinique qui obtient 10 avis en une semaine puis zéro pendant huit semaines se classera plus bas qu'une clinique qui obtient 1 avis tous les quatre jours.
      </p>
      <p>
        Bâtissez la cadence par un système, pas par une campagne. Envoyez la demande d'avis dans les 24 heures suivant le rendez-vous, pendant que la patiente se souvient encore du nom de l'hygiéniste ou du médecin. Utilisez une plateforme d'avis qui achemine les demandes vers Apple, Google et Yelp en même temps. Le module Reviuzy dans la pile AiLys s'occupe de cet acheminement et du suivi de fraîcheur d'office.
      </p>

      <SectionDivider />

      <h2 id="mots-cles-de-service-dans-les-avis">Mots-clés de service dans les avis, le troisième levier</h2>
      <p>
        Les avis qui disent tous « excellent dentiste » ne font presque rien pour la différenciation vocale. Les avis qui mentionnent le service précis reçu gagnent des requêtes vocales différentes. Une clinique avec plusieurs avis qui mentionnent « pédiatrique » ressort pour les requêtes vocales « dentiste pour enfants près de moi ». La même clinique avec uniquement des éloges génériques perd cette requête contre un concurrent qui a un seul avis utilisant le mot « enfants ».
      </p>
      <p>
        Concevez la diversité des mots-clés dans l'invitation à laisser un avis. Après un rendez-vous pédiatrique, demandez au parent de décrire la visite par service. Après un blanchiment, demandez à la patiente de mentionner le blanchiment par son nom. Les invitations doivent rester naturelles et courtes, pas bourrées. Trois ou quatre mentions de service sur les 60 derniers jours suffisent généralement à commencer à émerger pour la requête vocale correspondante.
      </p>
      <p>
        Suivez l'inventaire de mots-clés comme vous suivriez un calendrier de contenu. Tirez les 30 derniers jours de texte d'avis, comptez les mentions de chaque service prioritaire et corrigez le plus faible avec la prochaine ronde d'invitations. Ce travail compose, et il augmente directement les taux de citation sur Google AIO et Perplexity en même temps.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma montrant comment Siri pondère la vérification Apple Maps Connect, la fraîcheur des avis et les mots-clés de service"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="correspondance-de-categories-et-distance">Correspondance de catégories et distance, les quatrième et cinquième signaux</h2>
      <p>
        Les catégories Apple ne correspondent pas toujours une à une aux catégories Google Business Profile. Une clinique listée comme « Clinique dentaire » sur GBP peut correspondre à « Dentiste » sur Apple, ce qui achemine des requêtes vocales différentes. Auditez les deux côtés de la correspondance. Si vous offrez la dentisterie pédiatrique, réglez la catégorie secondaire GBP et la catégorie Apple pour faire ressortir ce service. Les décalages coûtent environ 15 à 20 % du volume vocal dans nos tests internes.
      </p>
      <p>
        La distance compte encore, mais moins que la plupart des propriétaires le pensent. Siri plafonne le rayon de recherche selon la densité. Dans les quartiers denses de Montréal comme le Plateau ou le Mile End, le rayon est court et la précision de catégorie décide de l'ordre. À Laval ou à Trois-Rivières en banlieue, le rayon est plus large et une fiche propre de l'autre côté du fleuve peut encore ressortir. Testez depuis les emplacements iPhone que vos patients utilisent vraiment, pas seulement depuis le cabinet.
      </p>
      <p>
        Pour les cliniques multi-emplacements, donnez à chaque emplacement sa propre fiche Apple Maps Connect avec photos et accent de catégorie locaux. Une fiche partagée divise la pondération de fraîcheur entre les emplacements et empêche chaque fiche de passer le seuil de classement vocal.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA et la voix? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <h2 id="marqueurs-de-confiance-de-siri">Marqueurs de confiance que Siri vérifie avant de lire un nom</h2>
      <p>
        Les réponses vocales sont prononcées devant la famille, dans la voiture et au haut-parleur. Apple est conservateur sur les entreprises que Siri nomme, parce qu'un mauvais numéro ou une clinique fermée nuit à l'assistant plus qu'une mauvaise liste. Les marqueurs de confiance que Siri vérifie ne sont pas glamour, mais ils sont décisifs.
      </p>
      <ul>
        <li>Un numéro de téléphone réclamé qu'Apple a vérifié par rappel ou carte postale.</li>
        <li>Un site web qui fonctionne et résout vers une page non vide à la première requête.</li>
        <li>Des heures mises à jour au moins chaque trimestre et qui correspondent entre Apple Maps Connect et le site.</li>
        <li>Une catégorie principale qui existe dans la taxonomie Apple, pas une étiquette personnalisée.</li>
        <li>Une adresse qui se géocode proprement vers un seul point sur la carte.</li>
      </ul>
      <p>
        Chaque marqueur de confiance manquant vous fait descendre d'un cran dans le classement vocal. Deux marqueurs manquants vous sortent généralement des réponses vocales, même si votre catégorie et votre distance correspondent à la requête. La liste de correctifs est courte et finie, ce qui rend l'audit payant pour les 90 minutes investies.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Siri tourne sur une pile de signaux épurée, pas une exploration en direct, donc chaque entrée est auditable.',
          'Une fiche Apple Maps Connect vérifiée est la base, son absence vous sort des réponses vocales.',
          'La fraîcheur des avis et les mots-clés de service décident de l\'ordre entre deux cliniques vérifiées proches.',
          'Les marqueurs de confiance comme un site fonctionnel et un téléphone réclamé sont le disqualifiant silencieux.',
        ]}
      />

      <SectionDivider />

      <h2 id="plan-siri-90-jours-cliniques">Un plan Siri sur 90 jours pour les cliniques qui veulent gagner</h2>
      <p>
        Jours 1 à 14, réclamez et vérifiez votre fiche Apple Maps Connect. Auditez les catégories sur Apple et Google, corrigez tout décalage et confirmez que le numéro de téléphone, les heures et l'adresse principale se géocodent proprement. Jours 15 à 45, bâtissez le système d'avis qui livre 4 à 6 avis frais chaque mois avec une variété de mots-clés de service. Utilisez un outil d'acheminement qui envoie la demande sur Apple, Google et Yelp dans les 24 heures suivant le rendez-vous.
      </p>
      <p>
        Jours 46 à 75, exécutez des tests vocaux structurés depuis des iPhones propres dans trois quartiers différents, trois fois sur des jours différents. Notez quelles entreprises Siri lit à voix haute, dans quel ordre, et si la vôtre est nommée. Corrigez l'écart par catégorie de service, puis recommencez le test. Jours 76 à 90, ajoutez le moniteur de requêtes vocales AiLys ou planifiez un audit manuel trimestriel, et inscrivez le rappel pour que la prochaine modification de classement ne passe pas inaperçue.
      </p>
      <p>
        La plupart des cliniques qui suivent ce plan de 90 jours montent dans les deux premières réponses vocales pour leur service principal dans le rayon local. La barre est plus basse qu'on le croit parce que la concurrence n'a tout simplement pas fait le travail. Voyez la page <InternalLink to="/industries" title="playbooks pour cliniques" /> pour la version dentiste de ce plan, ou lancez l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" /> pour voir quels facteurs fuient en ce moment.
      </p>

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
        alt="Propriétaire de clinique consultant un rapport de requêtes vocales Siri à côté des tableaux de bord Apple Maps Connect et Google Business Profile"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
