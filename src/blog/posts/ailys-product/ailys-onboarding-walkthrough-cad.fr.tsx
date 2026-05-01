/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { meta } from './ailys-onboarding-walkthrough-cad'
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
  title: 'Intégration AiLys, le déroulement semaine par semaine pour les PME québécoises',
  metaDescription:
    'Le déroulement clair semaine par semaine de l\'intégration AiLys pour une PME québécoise. L\'audit, le travail GBP, les citations, la base de visibilité IA, et le premier rapport hebdomadaire.',
  tldr: 'L\'intégration AiLys pour une PME québécoise dure quatre semaines. Semaine 1 : audit gratuit + passe GBP + couche de consentement. Semaine 2 : premières 2 à 8 citations (selon le palier) et schéma AEO. Semaine 3 : base de visibilité IA et premier breffé de contenu. Semaine 4 : premier rapport exécutif et alignement de la cadence. Après la semaine 4, le travail passe à un rythme régulier adapté au palier.',
  faqItems: [
    {
      question: 'Combien de temps prend réellement l\'intégration AiLys?',
      answer:
        'Quatre semaines de la signature du contrat à une cadence régulière. La semaine 1 ferme l\'audit et la passe GBP. La semaine 2 livre les citations et le schéma. La semaine 3 livre la visibilité IA et le premier breffé de contenu. La semaine 4 livre le premier rapport exécutif. La plupart des clients voient un mouvement dans le local pack durant la semaine 2 et la visibilité IA apparaître durant la semaine 3, bien que le calendrier varie selon l\'état de départ.',
    },
    {
      question: 'Dois-je fournir quoi que ce soit avant la première semaine?',
      answer:
        'Trois choses. L\'accès à votre fiche d\'établissement Google (on s\'ajoute comme gestionnaire, vous restez le principal). La liste des emplacements physiques que vous opérez (un pour Starter, plusieurs pour le palier Agency). Une courte description écrite de vos services dans votre voix. On n\'a pas besoin d\'accès aux statistiques jusqu\'à l\'audit de la semaine 1; l\'étape d\'audit le demande au premier appel.',
    },
    {
      question: 'Qu\'est-ce que l\'audit gratuit couvre exactement?',
      answer:
        'Cinq couches, toutes livrées en moins de 24 heures après soumission. Base technique SEO (vitesse, exploration, indexation), complétude GBP par rapport au jeu d\'attributs de catégorie, cohérence NAP sur les répertoires de citations principaux pour votre secteur, audit de schéma sur la page d\'accueil et les pages de service principales, et une sonde de visibilité IA sur six moteurs IA pour vos trois requêtes de marque principales. Le livrable est un PDF qui nomme les écarts, pas un argumentaire de vente.',
    },
    {
      question: 'L\'intégration est-elle bilingue EN et FR-CA dès le départ?',
      answer:
        'Oui. AiLys livre chaque livrable en EN et FR-CA à l\'interne dès le premier jour. L\'audit est livré dans votre langue préférée. L\'optimisation GBP comporte des heures bilingues et une description principale bilingue. Le schéma inclut des entrées alternateName dans les deux langues. Le premier breffé de contenu inclut les versions anglaise et française du Québec. Aucune API de traduction ne touche le travail.',
    },
    {
      question: 'Que se passe-t-il après la semaine 4?',
      answer:
        'Le travail passe à une cadence régulière adaptée à votre palier. Starter livre quatre publications GBP par mois plus la sonde Visibilité IA mensuelle. Core livre six publications GBP, quatre citations par mois et du contenu bilingue hebdomadaire (4 sujets uniques). Growth ajoute le travail Wikipedia et Wikidata, huit publications par mois, six citations, tableau multi-emplacements jusqu'à 3 emplacements. Agency ajoute les heures de stratège dédié, le tableau multi-emplacements illimité, douze publications par mois, huit citations par domaine, et la présentation exécutive trimestrielle livrée en personne.',
    },
  ],
  headings: [
    { id: 'why-four-weeks', text: 'Pourquoi quatre semaines, pas deux ni huit' },
    { id: 'week-one-audit-and-gbp', text: 'Semaine 1 : audit et passe GBP' },
    { id: 'week-two-citations-and-schema', text: 'Semaine 2 : citations et schéma AEO' },
    { id: 'week-three-ai-visibility', text: 'Semaine 3 : base de visibilité IA et premier breffé' },
    { id: 'week-four-first-report', text: 'Semaine 4 : premier rapport exécutif et alignement de cadence' },
    { id: 'what-changes-by-tier', text: 'Ce qui change entre Starter, Core, Growth et Agency' },
    { id: 'common-onboarding-blockers', text: 'Blocages courants et comment on les déloge' },
    { id: 'after-the-first-month', text: 'Après le premier mois : la cadence régulière' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        L\'intégration AiLys prend quatre semaines de la signature du
        contrat à un rythme régulier. La semaine 1 ferme l\'audit et la
        passe GBP. La semaine 2 livre les premières 2 à 8 citations (selon le
        palier) et le schéma. La semaine 3 livre la base de visibilité IA et le
        premier breffé de contenu. La semaine 4 livre le premier rapport
        exécutif et aligne la cadence avec votre palier.
      </p>

      <StatHighlight
        stats={[
          { value: '4 semaines', label: 'de la signature au rythme régulier' },
          { value: '24 heures', label: 'délai de l\'audit dès le jour 1' },
          { value: '30 jours', label: 'garantie de satisfaction sur chaque forfait' },
        ]}
      />

      <p>
        Ce déroulement est honnête sur le calendrier et la portée. AiLys
        ne promet pas un classement dans le local pack en première
        semaine. Il promet un audit propre, une fiche GBP complète, les
        premières citations en ligne et une base de mesure que vous pouvez
        lire à la semaine 4. Les mouvements de local pack et la montée de
        visibilité IA suivent ce travail, souvent durant les semaines 2 et
        3, bien que chaque état de départ soit différent.
      </p>

      <SectionDivider />

      <h2 id="why-four-weeks">Pourquoi quatre semaines, pas deux ni huit</h2>
      <p>
        Une intégration de deux semaines bâcle l\'audit et saute le
        schéma. Une intégration de huit semaines remplit le calendrier
        avec des réunions de découverte que la plateforme peut faire
        automatiquement. Quatre semaines est le juste milieu honnête :
        assez long pour livrer une première passe complète sur les cinq
        couches (base technique, GBP, citations, schéma, visibilité IA),
        assez court pour que l\'équipe ressente une traction au premier
        mois.
      </p>

      <CalloutBox type="info">
        L\'étape d\'audit est automatisée. La plateforme exécute les
        sondes, marque les écarts et génère le livrable en moins de 24
        heures. La stratège ajoute le jugement durant la semaine 1 pour
        prioriser les écarts qui comptent pour votre secteur et votre
        ville. C\'est pour ça que l\'audit est gratuit et arrive vite.
      </CalloutBox>

      <SectionDivider />

      <h2 id="week-one-audit-and-gbp">Semaine 1 : audit et passe GBP</h2>
      <p>
        Le jour 1, c\'est l\'appel de coup d\'envoi (45 minutes). La
        stratège confirme vos services, vos emplacements et votre
        secteur cible. La plateforme déclenche la sonde d\'audit. Le
        livrable arrive dans votre courriel en moins de 24 heures, dans
        la langue de votre choix.
      </p>
      <p>
        Les jours 2 à 5 sont la passe GBP. L\'équipe s\'ajoute comme
        gestionnaire, complète chaque attribut de catégorie, fixe les
        heures bilingues, remplit la description principale en EN et
        FR-CA, téléverse les premières 4 photos sourcées par vous (quota
        Starter; Core 8, Growth 12, Agency jusqu\'à 12 par domaine), et
        ouvre la première publication hebdomadaire.
      </p>

      <InternalLink
        to="/audit"
        title="Lancez l\'audit gratuit de visibilité IA en 24 heures"
        description="La même sonde que lance AiLys au jour 1 de l\'intégration. Sans carte, sans pitch, livrable par courriel."
      />

      <p>
        Le livrable de la semaine 1 est le PDF d\'audit, la fiche GBP
        complète, la première publication GBP, et le gabarit de couche
        de consentement câblé sur votre site. D\'ici le vendredi de la
        semaine 1, la bannière de consentement est en ligne et votre GBP
        est à 100 % de complétude. L\'équipe signale tout blocage
        technique SEO pour le travail de la semaine 2.
      </p>

      <CalloutBox type="tip">
        Les photos sourcées par le client portent les vraies métadonnées
        EXIF, que les moteurs IA pondèrent comme authentiques. Les photos
        de stock et les images générées par IA sont sous-pondérées. Selon
        le flux de travail de l\'application Reviuzy, vous téléversez les
        photos depuis votre téléphone; AiLys ne les source pas.
      </CalloutBox>

      <SectionDivider />

      <h2 id="week-two-citations-and-schema">Semaine 2 : citations et schéma AEO</h2>
      <p>
        Les citations atterrissent selon votre palier. Starter livre 2
        citations par mois. Core livre 4 citations vers les répertoires qui
        comptent pour votre secteur (Yelp, BBB, Pages Jaunes, plus un
        annuaire spécifique au secteur). Growth livre 6. Agency livre 8 par
        domaine avec une dispersion géographique plus profonde.
      </p>
      <p>
        Le schéma AEO se déploie sur la page d\'accueil et les trois
        pages de service principales. LocalBusiness ou sous-type sectoriel
        (Attorney, Dentist, Restaurant, AutoRepair, etc.), FAQPage sur la
        section FAQ, Service pour chaque offre, BreadcrumbList pour la
        navigation. Schéma Person pour le propriétaire si les signaux
        E-E-A-T font partie de la stratégie.
      </p>

      <InternalLink
        to="/blog/local-schema-markup-cheat-sheet"
        title="Aide-mémoire de balisage schéma local"
        description="Les types de schéma exacts qu\'AiLys déploie par secteur, avec exemples de charge utile"
      />

      <SectionDivider />

      <h2 id="week-three-ai-visibility">Semaine 3 : base de visibilité IA et premier breffé</h2>
      <p>
        La semaine 3 établit la base de visibilité IA. La plateforme
        exécute des sondes sur six moteurs IA pour vos trois requêtes de
        marque principales et vos trois requêtes sectorielles principales.
        La sortie est un score Share of Model par moteur plus une
        classification de sentiment par citation. La base devient le
        point de comparaison pour chaque sonde hebdomadaire ensuite.
      </p>

      <QuickQuiz
        question="Que mesure la base de visibilité IA pendant la semaine 3 d\'intégration?"
        options={[
          'Le nombre de liens entrants vers votre page d\'accueil',
          'La part de citations dans les réponses de six moteurs IA nommés',
          'Les impressions GBP des 30 derniers jours',
          'Un score d\'autorité de domaine d\'un outil SEO tiers',
        ]}
        correctIndex={1}
        explanation="Le moteur de visibilité IA d\'AiLys sonde six moteurs IA nommés (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) pour vos requêtes de marque et sectorielles, compte les citations, et rapporte un Share of Model par moteur et agrégé. Les autres items mesurent des choses adjacentes (liens, impressions GBP, autorité) mais aucun n\'est la base de visibilité IA."
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
      />

      <p>
        Le premier breffé de contenu arrive à la fin de la semaine 3. Il
        nomme les trois requêtes avec le plus grand écart entre le Share
        of Model actuel et ce qui est gagnable en 90 jours. Pour chaque
        requête, le breffé inclut la longueur de réponse cible, la couche
        de schéma à ajouter, et les ancres de citation à viser.
      </p>

      <InlineCTA
        variant="audit"
        text="Curieux de savoir où votre PME se situe dans la recherche IA avant de signer? Lancez l\'audit gratuit de visibilité IA, la même sonde qu\'AiLys utilise au jour 1 de l\'intégration."
      />

      <SectionDivider />

      <h2 id="week-four-first-report">Semaine 4 : premier rapport exécutif et alignement de cadence</h2>
      <p>
        Le premier rapport exécutif est livré à la fin de la semaine 4.
        Six tuiles : Share of Model %, visites de trafic IA, conversions,
        citations vérifiées, photos publiées, questions répondues. Marque
        blanche pour le palier Agency; Starter, Core et Growth voient la
        version brandée AiLys. Le rapport est un PDF généré côté client
        dans votre navigateur; rien ne quitte votre base de compte
        durant l\'export.
      </p>

      <CalloutBox type="warning">
        Le rapport de la semaine 4 est la première fois que l\'équipe
        voit la ligne du taux de conversion. Si le site n\'est pas câblé
        avec les quatre événements personnalisés (click_call,
        click_directions, click_book, form_submit), la ligne est vide.
        La passe GBP de la semaine 1 inclut la couche de consentement,
        mais les événements sont câblés durant l\'étape technique SEO en
        semaine 2. À la semaine 4, le câblage est en ligne et la ligne
        se remplit.
      </CalloutBox>

      <p>
        La semaine 4 verrouille aussi la cadence pour le reste du
        mandat. La stratège confirme quel jour de la semaine les
        publications GBP sortent, quel jour le rapport exécutif est
        livré, et quel jour le contrôle des citations s\'exécute. À
        partir de la semaine 5, le rythme est régulier.
      </p>

      <SectionDivider />

      <h2 id="what-changes-by-tier">Ce qui change entre Starter, Core, Growth et Agency</h2>
      <p>
        La forme en quatre semaines reste la même entre les paliers. La
        profondeur et la cadence changent.
      </p>
      <ul>
        <li><strong>Starter (300 $ CAD/mois) :</strong> audit, passe GBP, cohérence NAP, sonde Visibilité IA mensuelle, 4 publications GBP/mois, 4 photos/mois, 2 citations/mois</li>
        <li><strong>Core (600 $) :</strong> tout Starter plus schéma AEO, 4 citations mensuelles, contenu bilingue (4 sujets uniques/mois), 6 publications GBP/mois, 6 photos/mois, sondes Visibilité IA hebdomadaires, analyse de sentiment</li>
        <li><strong>Growth (1 200 $) :</strong> tout Core plus autorité d\'entité GEO, Wikipedia et Wikidata, 8 publications GBP/mois, 8 photos/mois, 6 citations/mois, contenu bilingue hebdomadaire (6 sujets/mois), tableau multi-emplacements jusqu\'à 3 emplacements, surveillance concurrentielle</li>
        <li><strong>Agency (2 500 $) :</strong> tout Growth plus tableau multi-emplacements illimité, PDF en marque blanche, SLA Slack moins de 4 heures, accès API, intégrations sur mesure, sondes Visibilité IA quotidiennes, 12 publications GBP/mois, jusqu\'à 12 photos/mois par domaine, 8 citations/mois par domaine, 8 sujets de blogue uniques/mois par domaine, stratège senior dédié, présentation exécutive trimestrielle livrée en personne</li>
      </ul>

      <InternalLink
        to="/blog/ailys-pricing-tiers-explained-cad"
        title="Paliers de prix AiLys expliqués en CAD"
        description="La ventilation complète palier par palier avec ce qui est inclus à chaque prix"
      />

      <SectionDivider />

      <h2 id="common-onboarding-blockers">Blocages courants et comment on les déloge</h2>
      <ul>
        <li><strong>GBP suspendu ou non vérifié :</strong> on parcourt le formulaire de réintégration à l\'appel de coup d\'envoi et soumet les documents de vérification la même semaine</li>
        <li><strong>Incohérence NAP sur 30+ répertoires :</strong> on publie le bloc NAP canonique, le verrouille dans vos archives, et exécute une passe de cohérence durant la semaine 2</li>
        <li><strong>Vitesse du site sous 200 ms TTFB mais Core Web Vitals en échec :</strong> on ajoute Domain Speed Boost (35 $/mois en supplément) pour la semaine 2 et on relance l\'audit à la fin de la semaine 4</li>
        <li><strong>Pas encore de contenu bilingue :</strong> on livre la première passe FR-CA durant la semaine 3 à l\'interne; aucune API de traduction utilisée</li>
        <li><strong>Propriétaire pas sur GBP :</strong> on demande le transfert de propriété au jour 1 et on suit la fenêtre de révision standard de 7 jours de Google</li>
      </ul>

      <CalloutBox type="danger">
        Le blocage le plus courant est une fiche GBP que le propriétaire
        ne possède pas réellement. Vérifiez le statut de propriété
        avant la semaine 1 si possible. Le correctif est simple mais
        ajoute 7 jours au calendrier.
      </CalloutBox>

      <SectionDivider />

      <h2 id="after-the-first-month">Après le premier mois : la cadence régulière</h2>
      <p>
        À partir de la semaine 5, le travail passe à un rythme
        hebdomadaire régulier. La stratège exécute le contrôle des
        citations, la sonde de visibilité IA, la révision des
        publications GBP, la révision des téléversements de photos (vos
        photos via l\'application Reviuzy) et la rédaction du breffé de
        contenu. Mensuellement, le rapport exécutif est livré le premier
        jour ouvrable. Trimestriellement, les clients Agency reçoivent
        une présentation exécutive en personne livrée par la stratège
        dédiée.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'L\'intégration de quatre semaines est le juste milieu honnête entre les configurations bâclées de deux semaines et les calendriers gonflés de huit semaines',
          'Semaine 1 : audit + GBP. Semaine 2 : citations + schéma. Semaine 3 : visibilité IA + premier breffé. Semaine 4 : premier rapport exécutif + verrouille la cadence.',
          'Bilingue EN et FR-CA à l\'interne dès le jour 1. Aucune API de traduction ne touche le travail.',
          'Les photos sont sourcées par le client (vraies données EXIF) via l\'application Reviuzy. AiLys ne source pas les photos.',
          'Après la semaine 4, le rythme est régulier et adapté à votre palier (Starter à Agency).',
        ]}
      />

      <InlineCTA
        variant="pricing"
        text="Prêt à voir les quatre paliers et choisir celui qui vous convient? Les forfaits commencent à 300 $ CAD/mois, tous avec une garantie de satisfaction de 30 jours."
      />

      <img
        src={meta.images.end}
        alt="Une stratège et une propriétaire de PME québécoise se serrant la main à une table de réunion en verre après la première révision du rapport exécutif"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <InlineCTA
        variant="book"
        text="Vous voulez un appel stratégique de 60 minutes avant de signer? Pas de pitch, document de stratégie envoyé peu importe que vous signiez ou non."
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
