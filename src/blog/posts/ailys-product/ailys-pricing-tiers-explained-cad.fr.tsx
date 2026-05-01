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
import { meta } from './ailys-pricing-tiers-explained-cad'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Forfaits AiLys expliqués, de 300 à 2 500 dollars CAD par mois',
  metaDescription:
    "Décortiqué palier par palier des forfaits AiLys en dollars canadiens. Ce qui est inclus dans Starter, Core, Growth et Agency. Modules, garantie et comment choisir.",
  tldr: "AiLys propose quatre forfaits mensuels en CAD. Starter à 300 $ livre le SEO technique, GBP, cohérence NAP, sonde Visibilité IA mensuelle, 4 publications GBP, 4 photos et 2 citations. Core à 600 $ ajoute le schéma AEO, 4 citations mensuelles, contenu bilingue, 6 publications GBP, 6 photos, sondes Visibilité IA hebdomadaires, analyse de sentiment. Growth à 1 200 $ ajoute l'autorité d'entité GEO, Wikipedia et Wikidata, 8 publications GBP, 8 photos, 6 citations, contenu bilingue hebdomadaire, tableau multi-emplacements jusqu'à 3 emplacements. Agency à 2 500 $ ajoute un tableau de bord multi-emplacements illimité, des PDF en marque blanche, un SLA Slack sous 4 heures, l'accès API, sondes Visibilité IA quotidiennes, 12 publications GBP, jusqu'à 12 photos par domaine, 8 citations par domaine et un stratège senior dédié.",
  faqItems: [
    {
      question: "Qu'est-ce qui est inclus dans le forfait Starter à 300 $ d'AiLys?",
      answer:
        "Le forfait Starter à 300 $ CAD par mois inclut le SEO technique, l'optimisation Google Business Profile, le travail de cohérence NAP, une sonde Visibilité IA mensuelle sur les principaux moteurs IA, quatre publications GBP par mois, quatre photos GBP par mois et deux citations par mois. C'est le palier d'entrée pour un seul emplacement qui veut de l'AI Visibility livrée à un tarif mensuel fixe sans facturation à l'heure.",
    },
    {
      question: "Combien coûte le forfait Core d'AiLys en dollars canadiens?",
      answer:
        "Core est à 600 $ CAD par mois. Il inclut tout ce qui est dans Starter plus le travail de schéma AEO, quatre citations mensuelles sur des annuaires de qualité, la production de contenu bilingue EN et FR-CA (4 sujets uniques par mois), six publications GBP par mois, six photos GBP par mois, sondes Visibilité IA hebdomadaires et analyse de sentiment sur les mentions IA. Core est le choix le plus fréquent pour un opérateur à un seul emplacement qui veut une cadence hebdomadaire de contenu et de citations.",
    },
    {
      question: "Qu'ajoute le palier Growth par rapport à Core?",
      answer:
        "Growth à 1 200 $ CAD par mois ajoute le travail d'autorité d'entité GEO, la présence Wikipedia et Wikidata quand la marque y est éligible, huit publications GBP par mois, huit photos GBP par mois, six citations par mois, six sujets de blogue uniques par mois en EN et FR-CA, tableau multi-emplacements jusqu'à 3 emplacements et surveillance concurrentielle sur les moteurs IA. Il convient à un opérateur qui veut faire composer ses signaux d'entité sur le web ouvert plutôt que d'optimiser uniquement ses propres pages.",
    },
    {
      question: "Quand le palier Agency à 2 500 $ a-t-il du sens?",
      answer:
        "Agency à 2 500 $ CAD par mois a du sens pour les opérateurs multi-emplacements ou pour les partenaires qui ont besoin d'un tableau de bord multi-emplacements illimité, de rapports PDF en marque blanche, d'un SLA Slack sous quatre heures, de l'accès API, d'intégrations sur mesure, de sondes Visibilité IA quotidiennes, de douze publications GBP par mois, jusqu'à douze photos par mois par domaine, huit citations par mois par domaine, huit sujets de blogue uniques par mois par domaine et d'un stratège senior dédié. Les modules d'automatisation Reviuzy et Domain Shield sont inclus sans coût supplémentaire.",
    },
    {
      question: "Les forfaits AiLys sont-ils mensuels avec une garantie?",
      answer:
        "Oui. Tous les forfaits AiLys sont mensuels sans engagement annuel, et chaque forfait vient avec une garantie de satisfaction de 30 jours. Si le premier mois ne répond pas aux attentes, le forfait prend fin sans pénalité. Les modules suivent la même règle mensuelle.",
    },
    {
      question: "Quels modules peut-on empiler sur un forfait Starter ou Core?",
      answer:
        "Les modules disponibles sont Reviuzy automatisation des avis à 100 $ par mois (inclus dans Agency), Tech Health Pack à 150 $ par mois (suivi indexation GSC + reindexation auto des blogues mensuels + balayage erreurs de crawl + alertes Core Web Vitals; inclus dans Agency), Domain Shield à 35 $ par mois, Domain Speed Boost à 35 $ par mois, Stratège dédié à 35 $ par mois, le trio Premium Ops à 79 $ par mois, et Langues additionnelles à 50 $ par mois chacune. Il existe aussi un Audit Indexation GSC une fois, tarifé selon la taille du site de 100 $ (1-9 pages) à 800 $ (100-149 pages) avec 150+ sur devis sur mesure. Les modules s'empilent sur n'importe quel palier, donc un forfait Starter avec Reviuzy et Tech Health Pack revient à 550 $ par mois.",
    },
  ],
  headings: [
    { id: 'comment-les-quatre-paliers-s-articulent', text: "Comment les quatre paliers s'articulent" },
    { id: 'starter-300-le-palier-fondation', text: 'Starter à 300 $, le palier fondation' },
    { id: 'core-600-le-palier-contenu-et-aeo', text: 'Core à 600 $, le palier contenu et AEO' },
    { id: 'growth-1200-le-palier-autorite-d-entite', text: "Growth à 1 200 $, le palier autorité d'entité" },
    { id: 'agency-2500-le-palier-multi-emplacements', text: 'Agency à 2 500 $, le palier multi-emplacements' },
    { id: 'modules-et-comment-les-empiler', text: 'Modules et comment les empiler' },
    { id: 'mensuel-et-garantie-30-jours', text: 'Mensuel et garantie 30 jours' },
    { id: 'comment-choisir-un-palier', text: 'Comment choisir un palier' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        AiLys propose quatre forfaits mensuels en dollars canadiens. Starter à 300 $, Core à 600 $, Growth à 1 200 $ et Agency à 2 500 $. Chaque palier est une portée fixe avec une liste de livrables publiée, sans facturation à l'heure, et toute la pile est mensuelle avec une garantie de satisfaction de 30 jours. Cette page explique palier par palier ce qui est livré, quels modules s'ajoutent à quel forfait, et comment un opérateur à un seul emplacement choisit un palier de départ sans suracheter.
      </p>

      <StatHighlight
        stats={[
          { value: '300 à 2 500 $', label: 'Forfaits AiLys mensuels en CAD' },
          { value: '30 jours', label: 'Garantie de satisfaction sur chaque forfait' },
          { value: 'Mensuel', label: "Pas d'engagement annuel sur aucun palier" },
        ]}
      />

      <SectionDivider />

      <h2 id="comment-les-quatre-paliers-s-articulent">Comment les quatre paliers s'articulent</h2>
      <p>
        Les quatre paliers s'empilent par addition. Chaque palier supérieur hérite de tout ce qui est dans le palier inférieur et ajoute une nouvelle portée par-dessus. Starter est la fondation : SEO technique, Google Business Profile, cohérence NAP, suivi hebdomadaire des citations LLM, une publication GBP par mois et quatre photos GBP par mois. Core ajoute le schéma AEO, les citations mensuelles, le contenu bilingue et les publications GBP hebdomadaires. Growth ajoute l'autorité d'entité GEO et le travail Wikidata. Agency ajoute l'infrastructure multi-emplacements pour les partenaires et les opérateurs qui gèrent plusieurs marques.
      </p>
      <p>
        La raison pour laquelle cette structure compte, c'est qu'un opérateur n'a jamais besoin de remagasiner le contrat quand il veut une petite mise à niveau. Le passage de Starter à Core se fait en un clic dans le tableau de bord, sans nouvelle entente, sans nouvel énoncé de travail. Les forfaits sont calculés au prorata le jour où la mise à niveau prend effet.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La page de tarifs liste chaque livrable à chaque palier avec la même formulation que dans le contrat. Voyez la matrice à jour sur <InternalLink to="/fr/pricing" title="Matrice de tarifs AiLys" description="Comparaison de paliers en direct avec tous les livrables" /> et lancez l'<InternalLink to="/fr/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez les écarts avant de choisir un palier" /> si vous voulez une recommandation de palier ancrée dans votre vraie part de citations.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys côte à côte, de Starter à 300 $ CAD à Agency à 2 500 $ CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="starter-300-le-palier-fondation">Starter à 300 $, le palier fondation</h2>
      <p>
        Starter est le point d'entrée pour un seul emplacement qui veut de l'AI Visibility livrée à un tarif mensuel fixe. La portée couvre le SEO technique du site, l'optimisation complète du Google Business Profile (catégories, attributs, services, heures, photos principales), la cohérence NAP sur les principales sources de citations, et le suivi hebdomadaire des citations LLM sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Chaque mois livre une publication GBP et quatre photos GBP.
      </p>
      <p>
        Starter convient à une clinique, un restaurant, un cabinet d'avocats ou un entrepreneur à un seul emplacement qui veut une base d'hygiène SEO local plus un suivi de citations qui signale quand les moteurs IA commencent à nommer la marque. Le résultat du suivi atterrit dans le tableau de bord chaque semaine avec la part de citations et les requêtes qui l'ont déclenchée. Aucune production de contenu ne tourne à ce palier, donc un opérateur sur Starter rédige typiquement ses propres articles ou achète du contenu séparément.
      </p>

      <h3>Livrables mensuels Starter</h3>
      <ul>
        <li>Audit et correctifs de SEO technique (sitemaps, bases de schéma, revue Core Web Vitals)</li>
        <li>Optimisation complète du Google Business Profile</li>
        <li>Cohérence NAP sur les principales sources de citations</li>
        <li>Suivi hebdomadaire des citations LLM sur les principaux moteurs IA</li>
        <li>4 publications GBP par mois, 4 photos GBP par mois</li>
        <li>2 citations par mois (max par domaine)</li>
      </ul>

      <SectionDivider />

      <h2 id="core-600-le-palier-contenu-et-aeo">Core à 600 $, le palier contenu et AEO</h2>
      <p>
        Core double le volume de citations et active la production de contenu bilingue. En plus de tout ce qui est dans Starter, Core livre le travail de schéma AEO (FAQ, HowTo, LocalBusiness, MedicalBusiness ou LegalService selon le cas), quatre citations mensuelles sur des annuaires de qualité, la production de contenu bilingue EN et FR-CA (4 sujets uniques par mois), six publications GBP par mois, six photos GBP par mois, sondes Visibilité IA hebdomadaires et analyse de sentiment sur les mentions IA. Le contenu bilingue est rédigé à la main, jamais passé par une API de traduction, et c'est pour cette raison qu'il classe aussi bien en français du Québec qu'en anglais.
      </p>
      <p>
        Core est le point de départ le plus fréquent pour un opérateur à un seul emplacement qui veut que la cadence hebdomadaire compose. La part de citations commence à bouger en deux à trois mois sur Core parce que la vélocité des publications GBP, le nouveau schéma et les citations mensuelles d'annuaire alimentent les moteurs IA en signaux frais chaque semaine.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Si votre math d'opérateur dit que vous pouvez porter Core mais que le saut depuis Starter vous rend nerveux, faites tourner Starter un mois, regardez la base du suivi de citations, puis montez d'un palier. Le tarif Core au prorata pour le reste du mois plus les 30 jours suivants est la façon la plus sûre de tester la vélocité de contenu.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir où en est votre commerce dans la recherche IA? Lancez l'audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="growth-1200-le-palier-autorite-d-entite">Growth à 1 200 $, le palier autorité d'entité</h2>
      <p>
        Growth ajoute la partie de l'AI Visibility qui compose le plus longtemps. En plus de tout ce qui est dans Core, Growth livre le travail d'autorité d'entité GEO, la présence Wikipedia et Wikidata quand la marque y est éligible, huit publications GBP par mois, huit photos GBP par mois, six citations par mois, la production de contenu bilingue hebdomadaire (6 sujets uniques par mois répartis EN et FR-CA), tableau multi-emplacements jusqu'à 3 emplacements et une surveillance concurrentielle qui regarde ce que les moteurs IA disent des trois principaux concurrents du pack local.
      </p>
      <p>
        Wikidata en particulier est le levier méconnu. Les moteurs IA s'appuient fortement sur les données ouvertes structurées quand ils choisissent quelle entité locale citer, et un item Wikidata propre avec les bonnes propriétés P (fondateur, adresse, zone desservie, site officiel, profils sociaux) débloque souvent de la part de citations sur des requêtes que la marque n'a jamais ciblées directement. Growth est le palier qui livre ce travail.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel palier AiLys est le premier à inclure le travail d'autorité d'entité Wikipedia et Wikidata?"
        options={[
          'Starter à 300 $ CAD',
          'Core à 600 $ CAD',
          'Growth à 1 200 $ CAD',
          'Agency à 2 500 $ CAD',
        ]}
        correctIndex={2}
        explanation="Growth à 1 200 $ CAD par mois est le premier palier qui livre l'autorité d'entité GEO, incluant Wikipedia et Wikidata quand la marque y est éligible. Starter et Core se concentrent sur GBP, citations et contenu, tandis que Agency ajoute l'infrastructure multi-emplacements par-dessus tout ce qui est dans Growth."
      />

      <h3>Livrables mensuels Growth en plus de Core</h3>
      <ul>
        <li>Travail d'autorité d'entité GEO (signaux de graphe de connaissances, alignement des données structurées)</li>
        <li>Présence Wikipedia et Wikidata quand la marque y est éligible</li>
        <li>8 publications GBP par mois, 8 photos par mois</li>
        <li>6 citations par mois (max par domaine)</li>
        <li>Tableau multi-emplacements jusqu'à 3 emplacements</li>
        <li>Production de contenu bilingue hebdomadaire</li>
        <li>Surveillance concurrentielle sur les moteurs IA</li>
      </ul>

      <SectionDivider />

      <h2 id="agency-2500-le-palier-multi-emplacements">Agency à 2 500 $, le palier multi-emplacements</h2>
      <p>
        Agency est conçu pour les partenaires et pour les opérateurs qui gèrent plusieurs marques ou plusieurs emplacements. En plus de tout ce qui est dans Growth, Agency livre un tableau de bord multi-emplacements illimité, des rapports PDF en marque blanche (pour qu'un partenaire puisse remettre un livrable à sa propre marque à son client), un SLA Slack sous quatre heures les jours ouvrables, l'accès API, des intégrations sur mesure, sondes Visibilité IA quotidiennes, douze publications GBP par mois, jusqu'à douze photos par mois par domaine, huit citations par mois par domaine, huit sujets de blogue uniques par mois par domaine et un stratège senior dédié qui pilote le compte de bout en bout.
      </p>
      <p>
        Le module Reviuzy d'automatisation des avis est inclus dans Agency sans coût supplémentaire. Pour un opérateur multi-emplacements qui paie déjà l'automatisation des avis séparément, ce regroupement à lui seul couvre une part appréciable du calcul de mise à niveau de palier. L'accès API à ce palier est l'autre levier de qualité opérateur : tout ce qui tourne dans le tableau de bord peut être déclenché depuis le backend du partenaire, donc le suivi de citations, le planificateur de publications GBP et le téléverseur de photos peuvent tous vivre dans un flux partenaire existant.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Agency n'est pas un « Starter premium ». C'est une portée différente bâtie pour les flux multi-emplacements et partenaires. Si vous opérez un seul emplacement, même haut de gamme, Growth à 1 200 $ est presque toujours le bon plafond. Agency a du sens quand le tableau de bord gère trois domaines ou plus, ou quand des PDF en marque blanche sortent de la maison.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="modules-et-comment-les-empiler">Modules et comment les empiler</h2>
      <p>
        Les modules s'attachent à n'importe quel palier et se tarifent indépendamment. La liste est courte volontairement, chaque module est un vrai produit avec sa propre portée, aucun n'est une fonctionnalité de palier reconditionnée.
      </p>

      <ul>
        <li>Reviuzy automatisation des avis : 100 $ par mois (inclus sans coût dans Agency)</li>
        <li>Tech Health Pack : 150 $ par mois, garantit que les blogues mensuels qu'AiLys publie sont effectivement indexés par Google. Sans ce module, les nouvelles pages peuvent rester dans « Détectées, actuellement non indexées » pendant des semaines, ce qui tue silencieusement le ROI de la production de contenu. Inclut le suivi indexation GSC, la reindexation auto des nouvelles pages, le balayage hebdomadaire des erreurs de crawl, la surveillance des liens brisés et les alertes Core Web Vitals. Inclus dans Agency.</li>
        <li>Audit Indexation GSC (une fois) : 100 $ pour les sites sous 10 pages, jusqu'à 800 $ pour 100-149 pages, et sur devis pour 150+ pages. Pair naturel avec le Tech Health Pack : l'audit règle l'arriéré de pages non indexées, le module garde les nouvelles pages indexées par la suite.</li>
        <li>Domain Shield : 35 $ par mois pour la surveillance d'usurpation de marque, de domaines sosies et d'empoisonnement de citations</li>
        <li>Domain Speed Boost : 35 $ par mois pour le travail de performance qui pousse les Core Web Vitals dans la bande verte</li>
        <li>Stratège dédié : 35 $ par mois pour du temps stratège direct sur Starter, Core ou Growth (Agency inclut un stratège senior par défaut)</li>
        <li>Trio Premium Ops : 79 $ par mois qui regroupe Domain Shield, Speed Boost et Stratège dédié pour les opérateurs qui veulent les trois</li>
        <li>Langues additionnelles : 50 $ par mois chacune pour la production de contenu au-delà de EN et FR-CA</li>
      </ul>

      <p>
        Une pile Starter courante qui livre bien, c'est Starter plus Reviuzy (400 $ par mois au total) pour une clinique qui veut le suivi de citations plus l'automatisation complète des avis. Une pile Core courante, c'est Core plus le trio Premium Ops (679 $ par mois au total) pour un cabinet d'avocats qui veut la cadence de contenu plus la couche de sécurité et de performance. Voyez le <InternalLink to="/fr/blog/reviuzy-review-automation-guide" title="Guide d'automatisation Reviuzy" description="Ce qui est livré dans le module à 100 $" /> pour le détail de la portée Reviuzy.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel de 30 minutes pour cartographier votre pile de modules contre le plafond de palier, sans pitch?" buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="mensuel-et-garantie-30-jours">Mensuel et garantie 30 jours</h2>
      <p>
        Chaque forfait est mensuel avec une garantie de satisfaction de 30 jours. Le calcul est simple. Si le premier mois ne répond pas aux attentes (la part de citations n'a pas bougé, les livrables n'ont pas été livrés, le tableau de bord ne convient pas), le forfait prend fin sans pénalité. C'est la même règle pour chaque palier et chaque module. Nous n'écrivons pas de contrats annuels et nous ne plaçons pas la garantie derrière des frais de mise en route.
      </p>
      <p>
        La raison pour laquelle nous offrons cette politique, c'est le calcul d'opérateur. Les commerçants locaux opèrent typiquement avec une trésorerie serrée et un contrat annuel sur un service qu'ils n'ont pas testé est une vente difficile. La garantie de 30 jours plus l'audit gratuit en 24 heures permet à un opérateur de voir les écarts de citations, de faire tourner un seul mois de travail et de décider au mois deux avec toute l'information.
      </p>

      <SectionDivider />

      <h2 id="comment-choisir-un-palier">Comment choisir un palier</h2>
      <p>
        Trois questions tranchent le palier. Premièrement, voulez-vous du contenu produit pour vous en EN et FR-CA chaque semaine? Si oui, Core à 600 $ est le plancher. Si non, Starter à 300 $ couvre la base GBP et le suivi de citations. Deuxièmement, la marque est-elle éligible à Wikipedia ou Wikidata, ou voulez-vous la surveillance concurrentielle sur les moteurs IA? Si oui, Growth à 1 200 $ est le bon palier. Troisièmement, opérez-vous trois domaines ou plus, ou livrez-vous du travail sous une marque partenaire? Si oui, Agency à 2 500 $ est l'ajustement de qualité opérateur.
      </p>
      <p>
        Pour la plupart des opérateurs à un seul emplacement au Québec, le bon palier de départ est Core à 600 $ avec l'option d'ajouter le trio Premium Ops quand le budget le permet. Growth devient le bon palier une fois que la marque a un point d'ancrage Wikipedia ou Wikidata à défendre, ou une fois que deux concurrents du pack local citent aussi du contenu hebdomadaire. Lancez d'abord l'<InternalLink to="/fr/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez les écarts de citations avant de choisir un palier" /> puis lisez la <InternalLink to="/fr/pricing" title="Matrice de tarifs" description="Liste de livrables palier par palier" /> avec vos propres écarts devant vous.
      </p>

      <InlineCTA variant="pricing" text="Lisez la matrice de paliers en direct avec livrables, modules et garantie 30 jours en langage clair." buttonText="Voir les forfaits" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Starter à 300 $ CAD livre le SEO technique, GBP, NAP, sonde Visibilité IA mensuelle, 4 publications GBP, 4 photos et 2 citations par mois.",
          "Core à 600 $ CAD ajoute le schéma AEO, 4 citations mensuelles, contenu bilingue, 6 publications GBP, 6 photos par mois, sondes Visibilité IA hebdomadaires, analyse de sentiment.",
          "Growth à 1 200 $ CAD ajoute l'autorité d'entité GEO, Wikipedia et Wikidata, 8 publications GBP, 8 photos, 6 citations par mois, contenu hebdomadaire, tableau multi-emplacements jusqu'à 3.",
          "Agency à 2 500 $ CAD ajoute le tableau de bord multi-emplacements, PDF en marque blanche, SLA Slack sous 4 heures, accès API, stratège senior dédié, et inclut Reviuzy.",
          "Chaque forfait est mensuel avec une garantie de satisfaction de 30 jours. Les modules s'empilent indépendamment sur n'importe quel palier.",
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
        alt="Matrice de décision pour choisir le bon palier AiLys selon les besoins de contenu, l'autorité d'entité et la portée multi-emplacements"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
