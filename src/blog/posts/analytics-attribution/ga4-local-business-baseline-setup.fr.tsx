/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { meta } from './ga4-local-business-baseline-setup'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  QuickQuiz,
  InternalLink,
  SectionDivider,
} from '../../components/shared'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Configuration GA4 de base pour une PME québécoise à un seul emplacement',
  metaDescription:
    'Une configuration Google Analytics 4 utile pour une PME québécoise à un seul emplacement. Les événements, la couche de consentement Loi 25, le trafic IA, et le rapport hebdo qu\'on lit vraiment.',
  tldr: 'Une configuration GA4 utile pour une PME québécoise à un seul emplacement reste petite. Cinq événements (page_view, click_call, click_directions, click_book, form_submit), quatre dimensions personnalisées (page_lang, location_id, ai_engine, ai_referrer), une couche de consentement conforme à la Loi 25, et un rapport hebdomadaire qui nomme le trafic des moteurs IA, le taux de conversion et les trois pages d\'atterrissage du haut. Le reste est du bruit.',
  faqItems: [
    {
      question: 'Ai-je besoin de GA4 si je suis déjà mes conversions dans Google Business Profile?',
      answer:
        'Les statistiques GBP couvrent les événements qui se passent sur la fiche elle-même : appels, demandes d\'itinéraire, vues de photos. Elles ne couvrent pas ce qui se passe une fois sur votre site web. GA4 prend le relais à partir de là. Pour une PME à un seul emplacement qui prend toute action en ligne (formulaire, réservation, commande), GA4 et les statistiques GBP forment le couple minimum honnête.',
    },
    {
      question: 'Comment rendre GA4 conforme à la Loi 25?',
      answer:
        'Câblez GA4 derrière une bannière de consentement qui refuse par défaut à la première visite, qui bloque analytics_storage et ad_storage jusqu\'à un accept explicite, qui consigne la décision avec un témoin de visiteur haché dans votre propre registre, et qui offre un lien clair de retrait dans le pied de page. Le texte de la bannière doit expliquer en français québécois clair ce qui est collecté et pourquoi. La mise en place est dans la section Loi 25 plus bas.',
    },
    {
      question: 'Quels événements GA4 une petite entreprise devrait-elle réellement suivre?',
      answer:
        'Cinq événements suffisent pour une PME à un seul emplacement. page_view (auto), click_call (clics sur les liens tel), click_directions (clics sur les liens vers les cartes), click_book (clics sur les liens ou boutons de réservation), form_submit (chaque formulaire incluant contact, soumission, infolettre). Ajoutez un sixième événement pour la commande en ligne ou le passage à la caisse si vous vendez. Plus que ça, c\'est du bruit que personne ne lit.',
    },
    {
      question: 'Puis-je voir le trafic de ChatGPT ou de Perplexity dans GA4 sans configuration personnalisée?',
      answer:
        'Partiellement. GA4 voit l\'hôte référent (chat.openai.com, perplexity.ai, etc.) mais ne le classe pas automatiquement comme trafic IA. Vous avez besoin d\'une dimension personnalisée et d\'un petit fragment JavaScript qui lit le référent et le utm_source à l\'arrivée, écrit dans un champ de formulaire caché ou un paramètre d\'événement personnalisé, et fait remonter le nom du moteur IA. Notre guide complémentaire sur le suivi du trafic ChatGPT dans GA4 contient le fragment.',
    },
    {
      question: 'Quel est le moyen le moins cher de garder GA4 fiable à long terme?',
      answer:
        'Le marquage côté serveur via Cloudflare Workers ou Vercel Functions pour le point de mesure du protocole, une seule propriété GA4 (pas une par langue ou par type de page), et une révision trimestrielle des dimensions personnalisées pour retirer celles qu\'aucun membre de l\'équipe n\'ouvre. Le coût d\'hébergement est typiquement de zéro à vingt dollars CAD par mois à faible trafic. Notre guide complémentaire sur le marquage côté serveur sur Vercel couvre la mise en place pratique.',
    },
  ],
  headings: [
    { id: 'why-baseline-not-blank', text: 'Pourquoi une base bat une propriété GA4 vide' },
    { id: 'the-five-events', text: 'Les cinq événements qui couvrent une PME locale' },
    { id: 'custom-dimensions', text: 'Dimensions personnalisées, quatre suffisent' },
    { id: 'loi-25-consent-layer', text: 'La couche de consentement Loi 25' },
    { id: 'ai-traffic-surface', text: 'Faire remonter le trafic des moteurs IA dans GA4' },
    { id: 'one-weekly-report', text: 'Le seul rapport hebdomadaire qu\'on lit vraiment' },
    { id: 'common-mistakes', text: 'Les erreurs courantes qui cassent l\'attribution' },
    { id: 'shipping-checklist', text: 'Une liste de vérification de deux heures pour livrer' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Une configuration GA4 utile pour une PME québécoise à un seul
        emplacement reste petite. Cinq événements. Quatre dimensions
        personnalisées. Une couche de consentement qui satisfait la Loi 25.
        Un rapport hebdomadaire qui nomme ce qui a changé. Tout le reste,
        c\'est un tableau de bord que personne n\'ouvre après la troisième
        semaine.
      </p>

      <StatHighlight
        stats={[
          { value: '5 événements', label: 'couvrent la majorité des besoins de rapport d\'une PME' },
          { value: '4 dimensions', label: 'assez pour découper par langue, emplacement, moteur IA, référent' },
          { value: '~2 heures', label: 'pour configurer la base de bout en bout' },
        ]}
      />

      <p>
        Ce guide est la base que livre AiLys aux clients Starter et Core lors
        de leur première semaine d\'intégration. Il est opinioné. Il suppose
        un seul emplacement, un site bilingue EN et FR-CA, et une obligation
        Loi 25. Les configurations multi-emplacements et palier Agency
        l\'étendent sans jamais le remplacer.
      </p>

      <SectionDivider />

      <h2 id="why-baseline-not-blank">Pourquoi une base bat une propriété GA4 vide</h2>
      <p>
        Une propriété GA4 vide commence à suivre automatiquement page_view,
        scroll, click, file_download et quelques autres. Les données
        arrivent quelque part. L\'équipe ne peut toujours pas répondre aux
        trois seules questions qui comptent : quelqu\'un a-t-il appelé,
        quelqu\'un a-t-il réservé, d\'où vient cette personne. Une base
        nomme ces questions à l\'avance et câble les événements qui y
        répondent.
      </p>

      <CalloutBox type="tip">
        La plus petite question utile qu\'une PME locale peut poser à GA4
        est : parmi les personnes arrivées sur le site cette semaine,
        combien ont fait l\'une des quatre choses pour lesquelles le site
        a été conçu. Tout le reste est du soutien de preuve.
      </CalloutBox>

      <SectionDivider />

      <h2 id="the-five-events">Les cinq événements qui couvrent une PME locale</h2>
      <p>
        page_view est gratuit. Les quatre autres sont des clics ou des
        soumissions explicites que l\'équipe doit câbler. Chacun
        correspond à une action humaine réelle.
      </p>
      <ul>
        <li><strong>click_call</strong> : chaque clic sur un lien `tel:`, avec le chemin de page comme paramètre</li>
        <li><strong>click_directions</strong> : chaque clic sur un lien Google Maps, Apple Maps, ou un bouton « Itinéraire »</li>
        <li><strong>click_book</strong> : chaque clic qui ouvre un flux de réservation, qu\'il s\'agisse d\'un agenda interne, Calendly, OpenTable, ou un `mailto:` pour une demande</li>
        <li><strong>form_submit</strong> : chaque formulaire du site, incluant l\'infolettre et le contact</li>
      </ul>
      <p>
        C\'est suffisant pour calculer le seul chiffre qu\'une PME locale
        lit chaque semaine : le taux de conversion de session à action.
      </p>

      <SectionDivider />

      <h2 id="custom-dimensions">Dimensions personnalisées, quatre suffisent</h2>
      <p>
        Les dimensions personnalisées rendent les événements segmentables.
        Quatre suffisent. En ajouter davantage crée un fardeau d\'entretien
        qu\'aucun membre de l\'équipe ne paiera.
      </p>
      <ul>
        <li><strong>page_lang</strong> : en ou fr, lu depuis l\'attribut html lang à l\'arrivée</li>
        <li><strong>location_id</strong> : le slug de l\'emplacement, habituellement une seule valeur pour le moment mais prêt pour le second site quand il ouvrira</li>
        <li><strong>ai_engine</strong> : chatgpt, perplexity, claude, gemini, copilot, googleaio, ou vide si pas d\'un moteur IA</li>
        <li><strong>ai_referrer</strong> : le nom d\'hôte du référent quand le visiteur est venu directement de chat.openai.com, perplexity.ai, gemini.google.com, copilot.microsoft.com, ou similaire</li>
      </ul>

      <CalloutBox type="info">
        Définir des dimensions personnalisées ne coûte rien, mais en
        nettoyer une obsolète référencée dans quinze rapports coûte cher.
        Quatre est le plafond pour une base à un seul emplacement.
        N\'ajoutez une cinquième que lorsqu\'une question nommée le force.
      </CalloutBox>

      <SectionDivider />

      <h2 id="loi-25-consent-layer">La couche de consentement Loi 25</h2>
      <p>
        La Loi 25 du Québec rend obligatoire le consentement explicite
        avant toute collecte de données non essentielle. GA4 chargé par
        défaut sur chaque page n\'est pas conforme. Le correctif est une
        bannière de consentement qui refuse par défaut, qui mentionne
        explicitement analytics_storage et ad_storage, et qui bloque
        l\'appel gtag config derrière l\'événement accept.
      </p>
      <p>
        Les cinq couches de conformité que livre AiLys :
      </p>
      <ol>
        <li>La bannière apparaît à la première visite, refuse par défaut analytics_storage et ad_storage</li>
        <li>Le texte en français québécois clair explique ce qui est collecté et pourquoi</li>
        <li>Les boutons accepter et refuser sont également proéminents (pas grisés)</li>
        <li>La décision de consentement est consignée avec un témoin de visiteur haché dans votre propre registre, gardé sept ans selon les règles de rétention de la Loi 25</li>
        <li>Un lien de retrait du consentement se trouve dans le pied de page, retire les témoins, et reverrouille la propriété</li>
      </ol>

      <InlineCTA
        variant="audit"
        text="Vous voulez savoir si votre site actuel passe déjà une revue Loi 25? Notre audit de visibilité IA gratuit en 24 heures nomme les écarts."
      />

      <SectionDivider />

      <h2 id="ai-traffic-surface">Faire remonter le trafic des moteurs IA dans GA4</h2>
      <p>
        Le trafic des moteurs IA n\'apparaît pas comme « IA » dans GA4 par
        défaut. Il atterrit comme direct, ou comme référent avec un hôte
        comme chat.openai.com ou perplexity.ai. Les dimensions
        personnalisées ai_engine et ai_referrer corrigent ça. Un petit
        fragment en ligne lit le référent et tout utm_source à l\'arrivée,
        normalise les deux dans un vocabulaire de six noms, et écrit la
        valeur à une propriété utilisateur de niveau session.
      </p>

      <InternalLink
        to="/blog/track-chatgpt-traffic-in-ga4"
        title="Suivre le trafic ChatGPT dans GA4"
        description="Le guide complémentaire avec le fragment exact, la convention UTM, et un rapport explore d\'exemple"
      />

      <p>
        Une fois la dimension peuplée, chaque rapport explore standard de
        GA4 peut découper le trafic par ai_engine. Taux de conversion par
        moteur, pages d\'atterrissage du haut par moteur, alertes de
        fraîcheur des citations quand un moteur tombe à zéro pendant une
        semaine. Tout ça fonctionne sans quitter l\'interface standard de
        GA4.
      </p>

      <CalloutBox type="warning">
        Ne mettez pas les noms de moteurs IA dans utm_source de vos
        propres liens sortants. utm_source est pour le trafic que vous
        contrôlez. Le moteur IA est le référent, pas la source. Confondre
        les deux corrompt l\'attribution dans vos autres campagnes.
      </CalloutBox>

      <SectionDivider />

      <h2 id="one-weekly-report">Le seul rapport hebdomadaire qu\'on lit vraiment</h2>
      <p>
        Construisez une seule explore. Nommez-la « Lecture locale
        hebdomadaire ». Six lignes. La liste plus bas. Envoyez-la comme
        lien Looker Studio à l\'équipe chaque lundi matin à 8 h, heure de
        l\'Est.
      </p>
      <ol>
        <li>Sessions, 7 derniers jours vs 7 jours précédents</li>
        <li>Taux de conversion (n\'importe quel des quatre événements personnalisés / sessions)</li>
        <li>Sessions par ai_engine, top six</li>
        <li>Top trois pages d\'atterrissage par sessions</li>
        <li>Top trois pages d\'atterrissage par taux de conversion</li>
        <li>Taux d\'acceptation du consentement Loi 25 (événements accept / impressions de bannière)</li>
      </ol>

      <QuickQuiz
        question="Quelle ligne du rapport hebdomadaire est la plus utile pour une propriétaire de PME locale qui a peu de temps?"
        options={[
          'Sessions, 7 derniers jours vs 7 jours précédents (volume seulement)',
          'Taux de conversion (action / sessions)',
          'Top trois pages d\'atterrissage par sessions (popularité)',
          'Taux d\'acceptation du consentement Loi 25 (signal de conformité)',
        ]}
        correctIndex={1}
        explanation="Le volume seul cache si le site fait son travail. La ligne du taux de conversion regroupe chaque signal d\'interaction en un seul nombre qui répond à la question qui compte : les visiteurs font-ils réellement les quatre choses pour lesquelles le site a été conçu. Les autres lignes sont des preuves de soutien utiles, mais le taux de conversion est le titre."
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
      />

      <SectionDivider />

      <h2 id="common-mistakes">Les erreurs courantes qui cassent l\'attribution</h2>
      <ul>
        <li>Charger gtag avant que la bannière de consentement ne soit acceptée (violation de la Loi 25, et pollue les données avec les pré-chargements de robots)</li>
        <li>Deux propriétés GA4 (une pour le site EN, une pour le site FR). Utilisez une seule propriété et découpez avec la dimension page_lang.</li>
        <li>Décorer avec UTM les liens qui mènent entre vos propres pages. La navigation interne ne devrait jamais porter de paramètres utm; ils écrasent les vraies sources de session.</li>
        <li>Suivre la profondeur de défilement sur chaque page. Le déclencheur de défilement par défaut se déclenche à 90 % et est rarement actionnable pour une PME locale.</li>
        <li>Sauter form_submit parce qu\'il y a « seulement le formulaire de contact ». Les inscriptions à l\'infolettre, les demandes de soumission, les formulaires de rappel comptent tous.</li>
      </ul>

      <CalloutBox type="danger">
        Le plus grand tueur d\'attribution est un lien interne qui porte
        utm_source. Un clic depuis votre page d\'accueil vers une page de
        service ne devrait jamais écraser la source originale du visiteur.
        Si vous trouvez utm_source sur des liens internes, retirez-les
        aujourd\'hui.
      </CalloutBox>

      <SectionDivider />

      <h2 id="shipping-checklist">Une liste de vérification de deux heures pour livrer</h2>
      <ol>
        <li>Créer une seule propriété GA4 et coller l\'ID de mesure dans la configuration du site (10 min)</li>
        <li>Câbler les quatre événements personnalisés (click_call, click_directions, click_book, form_submit) via gtag (30 min)</li>
        <li>Définir les quatre dimensions personnalisées et confirmer leur apparition dans l\'admin GA4 (10 min)</li>
        <li>Déposer la bannière de consentement avec le patron Loi 25 à cinq couches (40 min)</li>
        <li>Ajouter le fragment de détection de moteur IA qui peuple ai_engine et ai_referrer (15 min)</li>
        <li>Construire l\'explore hebdomadaire dans Looker Studio avec les six lignes plus haut (10 min)</li>
        <li>Tester en navigation privée, accepter le consentement, cliquer chaque élément suivi, confirmer les événements dans DebugView (5 min)</li>
      </ol>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Cinq événements et quatre dimensions personnalisées couvrent la majorité des rapports d\'un seul emplacement',
          'La couche de consentement n\'est pas optionnelle au Québec; la Loi 25 rend obligatoire l\'accept explicite avant analytics_storage',
          'Le trafic des moteurs IA est invisible jusqu\'à ce que vous câbliez les dimensions ai_engine et ai_referrer',
          'Un seul rapport hebdomadaire à six lignes bat un tableau de 40 tuiles que personne n\'ouvre',
          'Les liens internes avec utm_source sont le plus grand tueur d\'attribution; retirez-les',
        ]}
      />

      <InlineCTA
        variant="pricing"
        text="Vous voulez cette base plus le suivi des citations, l\'optimisation GBP et la visibilité IA livrés en première semaine? Voyez les forfaits AiLys conçus pour les PME locales."
      />

      <img
        src={meta.images.end}
        alt="Explore Looker Studio hebdomadaire avec les six lignes du rapport local sur un bureau du lundi matin calme"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <InlineCTA
        variant="book"
        text="Vous voulez un appel stratégique de 60 minutes pour passer en revue votre base GA4 actuelle? Pas de pitch, document de stratégie envoyé peu importe."
      />

      <h2 id="faq">Questions fréquentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}
    </article>
  )
}
