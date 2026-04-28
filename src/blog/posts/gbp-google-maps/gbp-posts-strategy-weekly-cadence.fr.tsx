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
import { meta } from './gbp-posts-strategy-weekly-cadence'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Stratégie de publications GBP, la cadence hebdomadaire qui bouge le pack local',
  metaDescription:
    'Stratégie de publications GBP : à quelle fréquence publier, quoi publier, et la cadence hebdomadaire qui fait monter le pack local. Inclut le tableau des cadences AiLys par forfait.',
  tldr: "Une cadence hebdomadaire de publications Google Business Profile est le plancher pour bouger le pack local. AiLys livre quatre paliers : Starter à une publication par mois, Core à quatre par mois, Growth à huit par mois, Agency à douze par mois. Le type de publication compte autant que la fréquence : Offres, Mises à jour et Événements bougent des signaux différents.",
  faqItems: [
    {
      question: "À quelle fréquence faut-il publier sur Google Business Profile?",
      answer:
        "Une cadence hebdomadaire est le plancher pour bouger le pack local. Une publication par semaine garde le GBP assez frais pour alimenter le signal de récence que Google pondère pour les requêtes « ouvert maintenant » et contraintes. AiLys livre quatre paliers : Starter à une publication par mois, Core à quatre par mois (une par semaine), Growth à huit par mois (deux par semaine), Agency à douze par mois (trois par semaine). Au-delà de trois par semaine, les rendements stagnent dans la plupart des catégories.",
    },
    {
      question: "Les publications GBP affectent-elles vraiment le classement du pack local?",
      answer:
        "Oui, mais indirectement. Les publications GBP alimentent les signaux de récence et d'engagement que Google pondère beaucoup pour les requêtes « ouvert maintenant » et contraintes comme « meilleur ramen près de moi ouvert maintenant ». Un profil sans publication depuis 90 jours est traité comme périmé et perd l'effet de fraîcheur. Les publications déclenchent aussi des conversions directes par les boutons de réservation et d'offre, que Google mesure et réinjecte dans l'algorithme local.",
    },
    {
      question: "Quel est le bon dosage des types de publications GBP?",
      answer:
        "Une cadence équilibrée fait tourner quatre types de publications. Les Mises à jour (environ 50 pour cent) couvrent les nouvelles, les changements d'horaires et les contenus des coulisses. Les Offres (environ 25 pour cent) portent un bouton CTA et déclenchent des conversions directes. Les Événements (environ 15 pour cent) sont liés à des activités datées comme des horaires saisonniers ou des événements communautaires. Les Produits (environ 10 pour cent) mettent en valeur un service ou un article avec un lien vers une page profonde. Le ratio 50-25-15-10 tient dans la plupart des catégories locales.",
    },
    {
      question: "Quelle longueur pour chaque publication GBP?",
      answer:
        "Les publications GBP plafonnent à 1 500 caractères, mais le point optimal est de 150 à 300 caractères avec un CTA clair. Les publications plus longues sont tronquées dans l'aperçu du pack local, et la troncature nuit au taux de clic. Les 80 premiers caractères portent le poids du titre : commencez par l'offre, la nouvelle ou la valeur, pas par une accroche. Terminez par un CTA d'une ligne qui correspond à l'un des boutons GBP (Réserver, Commander, Appeler, En savoir plus).",
    },
    {
      question: "Peut-on automatiser les publications GBP en toute sécurité?",
      answer:
        "L'automatisation partielle est sûre et recommandée. Planifiez les quatre publications mensuelles à l'avance avec un calendrier de contenu, mais rédigez chacune à la main. L'automatisation complète qui génère le texte à partir de gabarits déclenche le classifieur antispam GBP, qui suspend la fiche. AiLys utilise des publications planifiées rédigées par des humains à chaque palier et ne livre jamais de texte généré automatiquement. Les outils de planification comme l'API GBP ou les planificateurs tiers conviennent, la génération automatique du texte non.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-cadence-bat-le-volume', text: 'Pourquoi la cadence bat le volume' },
    { id: 'la-cadence-ailys-par-palier', text: 'La cadence AiLys par palier' },
    { id: 'les-quatre-types-de-publication-et-le-dosage-50-25-15-10', text: 'Les quatre types de publication et le dosage 50-25-15-10' },
    { id: 'longueur-de-publication-et-discipline-cta', text: 'Longueur de publication et discipline CTA' },
    { id: 'quoi-ecrire-chaque-semaine', text: 'Quoi écrire chaque semaine' },
    { id: 'mesurer-l-impact-sur-le-pack-local', text: "Mesurer l'impact sur le pack local" },
    { id: 'erreurs-frequentes-de-cadence', text: 'Erreurs fréquentes qui suspendent les fiches' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Une cadence hebdomadaire de publications Google Business Profile est le plancher pour bouger le pack local. La plupart des commerçants locaux publient une fois par trimestre et se demandent pourquoi le classement du pack local ne bouge pas. Google pondère beaucoup la récence du GBP pour les requêtes « ouvert maintenant » et contraintes, et un profil sans publication depuis 90 jours perd l'effet de fraîcheur. La correction passe par une cadence écrite avec le bon dosage de types de publication, la bonne longueur et la bonne discipline CTA.
      </p>

      <StatHighlight
        stats={[
          { value: '1/sem', label: 'Cadence plancher pour bouger le pack local (forfait Core)' },
          { value: '50-25-15-10', label: 'Dosage Mises à jour, Offres, Événements, Produits' },
          { value: '150-300', label: 'Plage optimale de caractères par publication' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-la-cadence-bat-le-volume">Pourquoi la cadence bat le volume</h2>
      <p>
        Le volume compte moins que le rythme. Un profil qui publie cinq fois en une semaine puis zéro fois pendant trois semaines performe moins bien qu'un profil qui publie une fois par semaine, chaque semaine, pendant un trimestre. Google pondère la régularité. Le signal de fraîcheur est bâti sur une fenêtre glissante de 30 jours, donc une cadence hebdomadaire stable garde le profil dans l'effet de fraîcheur en continu, alors qu'un schéma rafale-silence sort de l'effet pendant les semaines de silence.
      </p>
      <p>
        Pour la plupart des catégories locales, le rendement marginal d'une quatrième publication par semaine est faible. Trois publications par semaine est le plafond pratique dans nos données de cohorte. Au-delà de trois, le pack local ne bouge plus, et le coût en temps s'accumule. La cadence honnête est de une à trois publications par semaine, selon ce que l'opérateur peut soutenir sans s'épuiser.
      </p>

      <InlineCTA variant="audit" text="Voyez comment votre cadence GBP actuelle se compare au leader du pack local. Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-cadence-ailys-par-palier">La cadence AiLys par palier</h2>
      <p>
        AiLys livre des publications GBP dans quatre paliers de cadence, alignés sur les forfaits mensuels. Chaque palier est une cadence publiée sur laquelle l'opérateur peut compter sans négocier.
      </p>

      <h3>Cadence par palier AiLys</h3>
      <ul>
        <li>Starter (300 dollars CAD par mois) : 1 publication GBP par mois, écrite à la main, planifiée à l'avance</li>
        <li>Core (799 dollars CAD par mois) : 4 publications par mois, une par semaine, mélangées entre les types</li>
        <li>Growth (1 499 dollars CAD par mois) : 8 publications par mois, deux par semaine, avec rafraîchissement photo mensuel</li>
        <li>Agency (2 499 dollars CAD par mois) : 12 publications par mois, trois par semaine, avec coordination multi-emplacements</li>
      </ul>

      <p>
        Le palier Core est le plancher pour bouger le pack local. Le palier Starter empêche le profil de devenir périmé mais ne bouge pas le pack local seul. Le palier Growth convient aux opérateurs qui font des offres hebdomadaires et qui ont besoin du volume de conversion des publications d'offre. Le palier Agency sert les opérateurs multi-emplacements où chaque emplacement a besoin de sa propre cadence.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La cadence s'applique à chaque emplacement, pas au commerce parent. Un opérateur multi-emplacements au palier Agency reçoit douze publications par emplacement par mois, et non douze publications réparties sur les emplacements. La coordination multi-emplacements au palier Agency garantit que chaque publication d'emplacement reste locale et non gabaritisée.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel est le plafond pratique de cadence hebdomadaire de publications GBP avant que les rendements ne stagnent?"
        options={[
          'Une publication par semaine, au-delà c\'est du spam',
          'Trois publications par semaine, au-delà le pack local ne bouge plus',
          'Sept publications par semaine, une par jour',
          'Il n\'y a pas de plafond, plus c\'est toujours mieux',
        ]}
        correctIndex={1}
        explanation="Dans les données de cohorte, trois publications par semaine est le plafond pratique. Au-delà de trois, le pack local ne bouge plus et le coût en temps s'accumule. Une à trois publications par semaine est la cadence honnête, calibrée sur ce que l'opérateur peut soutenir sans s'épuiser."
      />

      <SectionDivider />

      <h2 id="les-quatre-types-de-publication-et-le-dosage-50-25-15-10">Les quatre types de publication et le dosage 50-25-15-10</h2>
      <p>
        GBP prend en charge quatre types de publication : Mises à jour, Offres, Événements et Produits. Chaque type porte des signaux de classement et des comportements de conversion différents. Une cadence équilibrée fait tourner les quatre types dans un dosage 50-25-15-10 qui tient dans la plupart des catégories locales.
      </p>

      <h3>Mises à jour (environ 50 pour cent)</h3>
      <p>
        Les Mises à jour sont la bête de somme. Nouvelles, changements d'horaires, contenus des coulisses, présentations de l'équipe, victoires clients, photos avant-après. Les Mises à jour ne portent pas de bouton CTA et ne déclenchent pas de conversions directes, mais elles alimentent le signal de récence que Google pondère pour les requêtes « ouvert maintenant ». Visez la moitié de la cadence en Mises à jour parce qu'elles sont les plus faciles à soutenir et qu'elles gardent le profil frais.
      </p>

      <h3>Offres (environ 25 pour cent)</h3>
      <p>
        Les Offres portent un bouton CTA et une fenêtre de validité. Elles déclenchent les conversions directes les plus fortes parmi les types de publication. La lecture honnête est que les Offres font aussi monter le pack local par la boucle de rétroaction de conversion : les clients qui réservent ou achètent par le bouton signalent à Google que le profil est sain et actif. Les Offres demandent plus d'effort à rédiger que les Mises à jour parce qu'elles exigent une vraie promotion, mais le gain en conversion justifie l'effort.
      </p>

      <h3>Événements (environ 15 pour cent)</h3>
      <p>
        Les Événements sont datés. Horaires saisonniers, événements communautaires, soldes anniversaires, fermetures pour fêtes. Les Événements apparaissent dans le pack local avec une date, ce qui hausse le taux de clic sur les requêtes sensibles au temps. Visez un ou deux Événements par mois, pas plus, parce que la date perd son intérêt si chaque publication est un Événement.
      </p>

      <h3>Produits (environ 10 pour cent)</h3>
      <p>
        Les Produits mettent en valeur un service ou un article avec un lien d'apprentissage vers une page de service profonde sur votre site. Ils nourrissent les recoupements de schéma Service et tirent du trafic vers les pages de service profondes. Utilisez les Produits avec parcimonie, environ une fois par mois, parce que le format est plus lourd à rédiger et que le comportement de conversion chevauche les Offres.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme circulaire montrant le dosage 50-25-15-10 des publications GBP entre Mises à jour, Offres, Événements et Produits"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="longueur-de-publication-et-discipline-cta">Longueur de publication et discipline CTA</h2>
      <p>
        Les publications GBP plafonnent à 1 500 caractères, mais l'aperçu du pack local tronque autour de 80 caractères de titre et 150 caractères de corps. Le point optimal est 150 à 300 caractères au total : assez pour transmettre la valeur, assez court pour entrer dans l'aperçu sans troncature. Les publications plus longues performent moins bien sur le clic parce que la troncature coupe le CTA en plein milieu.
      </p>
      <p>
        Commencez par l'offre, la nouvelle ou la valeur. Ne commencez pas par une accroche ou une question. Les 80 premiers caractères portent le poids du titre, et une question gaspille cet espace. Terminez par un CTA d'une ligne qui correspond à l'un des boutons GBP : Réserver, Commander, Appeler, En savoir plus. Le CTA doit correspondre au bouton, sinon la publication semble confuse et le clic baisse.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Pour les publications en français sur un GBP du Québec, utilisez les graphies du Québec (courriel, magasiner, fin de semaine au besoin). L'algorithme local lit la cohérence des graphies régionales et la pondère. Le français de France sur un profil québécois crée une mollesse petite mais mesurable dans l'effet de fraîcheur.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="quoi-ecrire-chaque-semaine">Quoi écrire chaque semaine</h2>
      <p>
        Un plan de contenu mensuel simple pour la cadence Core de quatre publications :
      </p>

      <ol>
        <li>Semaine 1 Mise à jour : une photo des coulisses avec une légende de deux lignes sur une victoire client récente, un jalon d'équipe ou une amélioration de processus</li>
        <li>Semaine 2 Offre : une vraie promotion avec une fenêtre de validité et un bouton CTA Réserver ou Commander</li>
        <li>Semaine 3 Mise à jour : une publication d'horaires ou de nouvelle saisonnière, ou un témoignage client avec prénom et photo si le consentement est donné</li>
        <li>Semaine 4 Événement ou Produit : un événement daté pour le mois à venir, ou une publication Produit liée à une page de service profonde</li>
      </ol>

      <p>
        Rédigez les quatre publications à l'avance au début de chaque mois. Planifiez-les par l'API GBP ou un planificateur tiers. Ne générez pas le texte automatiquement. Le classifieur antispam GBP signale les textes auto-générés répétitifs et les suspensions suivent. <InternalLink to="/services/gbp-optimization" title="Service d'optimisation GBP" description="Inclut la cadence hebdomadaire et la coordination multi-emplacements" /> gère la cadence de bout en bout sur chaque palier payant. Pour le contexte pilier sur la façon dont la cadence alimente le graphe de citations, voyez <InternalLink to="/blog/share-of-model-metric-explained" title="Share of Model expliqué" description="La métrique de part de citations pour la recherche IA" />.
      </p>

      <InlineCTA variant="pricing" text="Voyez les paliers de cadence AiLys, d'une publication par mois à Starter à douze par mois par emplacement à Agency." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="mesurer-l-impact-sur-le-pack-local">Mesurer l'impact sur le pack local</h2>
      <p>
        La bonne mesure du pack local est la part de voix sur une grille verrouillée de requêtes, pas la position brute. Choisissez cinq requêtes à forte intention, lancez-les chaque semaine avec un outil de grille ancré au lieu, et suivez la fréquence d'apparition de votre profil dans le top trois. Une cadence hebdomadaire propre fait habituellement grimper la part de voix dans le pack local de 8 à 15 points sur le premier trimestre, avec la majorité de la hausse aux semaines 6 à 10. Combinez avec l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Inclut l'analyse de cadence GBP et de signal de fraîcheur de référence" /> pour figer la ligne de départ avant le changement de cadence.
      </p>
      <p>
        Combinez la mesure du pack local avec l'export GBP Insights. Suivez les vues, l'engagement, les clics de bouton et les demandes d'itinéraire. Le taux d'engagement des publications est l'indicateur avancé : un engagement en hausse à la semaine 4 prédit la hausse du pack local à la semaine 8. Un engagement en baisse à la semaine 4 signifie que le dosage est mauvais (souvent trop de Mises à jour et pas assez d'Offres) et que la cadence doit être rééquilibrée.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Évitez de bourrer chaque publication du même mot-clé principal. Le classifieur antispam GBP pondère la densité de mots-clés sur les publications récentes, et un profil qui répète la même phrase d'ancrage chaque semaine est signalé en douceur en un trimestre. Variez la phrase d'attaque entre Mises à jour, Offres, Événements et Produits même quand le service sous-jacent est identique.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="erreurs-frequentes-de-cadence">Erreurs fréquentes qui suspendent les fiches</h2>
      <p>
        Trois schémas déclenchent des suspensions GBP et remettent l'horloge de fraîcheur à zéro.
      </p>

      <ol>
        <li>Texte auto-généré à partir d'un gabarit, où la même structure de phrase se répète d'une publication à l'autre. Le classifieur le repère en un trimestre.</li>
        <li>Publications d'Offre avec des codes promo empilés qui violent les directives d'offre GBP. Une promo empilée par trimestre passe, des promos empilées hebdomadaires sont lues comme du spam.</li>
        <li>Publications d'Événement avec des dates passées. Publier un Événement après la date marque le profil comme inactif et le signal d'événement bascule en négatif.</li>
      </ol>

      <p>
        La correction passe par un texte rédigé à la main avec un calendrier de contenu et un audit trimestriel des directives d'offre et des dates d'événement. La plupart des opérateurs évitent les trois avec une session mensuelle d'une heure et un planificateur. AiLys mène cette session mensuelle dans le livrable du palier Core et livre les quatre publications selon un horaire hebdomadaire fixe.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de votre cadence GBP et du dosage des publications? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'La cadence hebdomadaire est le plancher pour bouger le pack local. Trois publications par semaine est le plafond pratique.',
          'Cadence AiLys : Starter 1 par mois, Core 4 par mois, Growth 8 par mois, Agency 12 par mois par emplacement.',
          'Mélangez les quatre types dans un ratio 50-25-15-10 : Mises à jour, Offres, Événements, Produits.',
          'Plage optimale de 150 à 300 caractères avec un CTA clair qui correspond au bouton GBP.',
          'Ne générez pas le texte automatiquement. Le classifieur antispam repère la répétition et les suspensions suivent.',
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
        alt="Plan de contenu de cadence hebdomadaire GBP avec quatre publications planifiées pour un commerce local du Québec"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
