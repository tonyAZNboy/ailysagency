/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'
import { meta } from './aeo-vs-seo-strategic-shift'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'AEO vs GEO vs SEO, le virage stratégique de 2026',
  metaDescription:
    "Quelle est la différence entre l'AEO, le GEO et le SEO traditionnel? Une comparaison pilier des clics, de l'extraction directe et de l'inclusion générative pour les commerçants locaux.",
  tldr: "Le SEO traditionnel optimise pour le clic sur un lien bleu. L'AEO (Answer Engine Optimization) optimise pour l'extraction de réponse directe afin que des moteurs comme Google AIO et Bing Copilot citent votre page sans forcer un clic. Le GEO (Generative Engine Optimization) optimise pour l'inclusion à l'intérieur d'une réponse synthétisée par ChatGPT, Perplexity, Claude ou Gemini. Les trois ne sont pas concurrents. Ce sont des couches, et une stratégie 2026 livre les trois.",
  faqItems: [
    {
      question: "Quelle est la différence entre l'AEO, le GEO et le SEO traditionnel?",
      answer:
        "Le SEO traditionnel optimise une page pour qu'elle se classe sur une page de résultats à liens bleus et obtienne un clic. L'AEO (Answer Engine Optimization) optimise la même page pour qu'un moteur de réponse en extraie un passage cité et l'affiche directement, souvent sans clic. Le GEO (Generative Engine Optimization) optimise la marque derrière la page pour que des moteurs génératifs comme ChatGPT, Perplexity, Claude et Gemini la nomment dans leurs réponses synthétisées. Même web, trois couches de lecture différentes. Une stratégie 2026 livre les trois.",
    },
    {
      question: "L'AEO a-t-elle remplacé le SEO?",
      answer:
        "Non. L'AEO se pose sur le SEO. Le même crawl, le même contenu canonique, les mêmes schémas alimentent les deux couches. Ce qui a changé, c'est l'objectif de la page. On mesurait une page par son taux de clic depuis un lien bleu. On la mesure maintenant aussi par son taux d'extraction dans Google AIO, Bing Copilot et les autres surfaces de réponse. Le SEO contrôle toujours la découverte. L'AEO contrôle ce que le moteur cite une fois la page découverte.",
    },
    {
      question: "Le GEO est-il juste un nouveau nom pour l'AEO?",
      answer:
        "Non. Les deux surfaces se comportent autrement. L'AEO vise les boîtes de réponse extractives où le moteur tire un passage cité d'une seule page, donc le gain est d'être cette page. Le GEO vise la synthèse générative où le moteur assemble une réponse à partir de plusieurs sources et choisit quels noms de marque mentionner, donc le gain est d'être l'une des marques citées. L'AEO récompense une page Q-R propre avec des schémas clairs. Le GEO récompense une marque qui apparaît sur plusieurs pages avec des attributs cohérents.",
    },
    {
      question: "Comment les clics changent-ils quand l'AEO et le GEO travaillent?",
      answer:
        "Le volume de clics depuis la recherche baisse dans certaines catégories parce que le moteur répond sans clic. Le volume de clics depuis les moteurs IA monte parce que les utilisateurs qui cliquent après une citation arrivent avec une intention beaucoup plus forte. Le calcul qui marchait en 2018 (volume de clics fois taux de conversion) devient un calcul de qualité (moins de volume, plus d'intention, plus de revenu par clic). Les commerçants locaux qui suivent l'AI Traffic dans GA4 voient typiquement ce virage sur 90 jours.",
    },
    {
      question: "Quels schémas comptent le plus pour l'AEO et le GEO?",
      answer:
        "FAQPage et Article font le plus bouger l'AEO parce que les moteurs de réponse s'appuient sur des paires Q-R structurées et une attribution claire. Organization, LocalBusiness et Person font le plus bouger le GEO parce que les moteurs génératifs ont besoin d'attributs d'entité stables pour décider quels noms de marque nommer. BreadcrumbList aide les deux. Speakable aide les surfaces de réponse vocale. AiLys livre tout cela par défaut dans chaque palier.",
    },
    {
      question: "Où l'E-E-A-T s'inscrit-il dans ce virage?",
      answer:
        "L'E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) est le filtre de confiance qui se pose au-dessus du SEO, de l'AEO et du GEO. Une page peut avoir des schémas parfaits et une structure Q-R parfaite et tout de même être filtrée si l'auteur n'a pas de bilan ou si l'entité n'a pas de NAP cohérent sur le web. Les commerçants locaux gagnent l'E-E-A-T par les signatures, des photos réelles, des citations cohérentes et des entrées Wikidata. Le moteur AI Visibility AiLys sonde les quatre couches d'E-E-A-T à chaque audit.",
    },
  ],
  headings: [
    { id: 'trois-acronymes-trois-roles', text: 'Trois acronymes, trois rôles' },
    { id: 'ce-que-le-seo-traditionnel-fait-encore', text: 'Ce que le SEO traditionnel fait encore' },
    { id: 'comment-l-aeo-a-change-la-page', text: "Comment l'AEO a changé la page" },
    { id: 'comment-le-geo-a-change-la-marque', text: 'Comment le GEO a changé la marque' },
    { id: 'ou-les-trois-se-recoupent', text: 'Où les trois se recoupent' },
    { id: 'comment-sequencer-le-travail', text: 'Comment séquencer le travail' },
    { id: 'mesurer-le-virage', text: 'Mesurer le virage en 2026' },
    { id: 'ou-ailys-livre-la-pile', text: 'Où AiLys livre la pile' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le SEO traditionnel optimise une page pour qu'elle se classe sur une page de résultats à liens bleus et obtienne un clic. L'AEO (Answer Engine Optimization) optimise cette même page pour qu'un moteur de réponse en extraie un passage cité et l'affiche directement, souvent sans clic. Le GEO (Generative Engine Optimization) optimise la marque derrière la page pour que des moteurs génératifs comme ChatGPT, Perplexity, Claude et Gemini la nomment dans leurs réponses synthétisées. Même web, trois couches de lecture différentes. Le virage stratégique de 2026, c'est que les commerçants locaux doivent livrer les trois.
      </p>

      <StatHighlight
        stats={[
          { value: '3 couches', label: 'SEO, AEO, GEO sur le même crawl' },
          { value: '6 moteurs', label: 'AiLys sonde ChatGPT, Perplexity, Claude, Gemini, AIO, Copilot' },
          { value: '24 heures', label: "Délai de l'audit AI Visibility gratuit" },
        ]}
      />

      <SectionDivider />

      <h2 id="trois-acronymes-trois-roles">Trois acronymes, trois rôles</h2>
      <p>
        SEO, AEO et GEO sont souvent traités comme des cycles de mode dans les billets marketing, mais les rôles de fond sont distincts. Le SEO classe une URL sur une page de résultats pour qu'un humain clique. L'AEO fait remonter un passage cité sur une surface de réponse pour qu'un humain lise sans cliquer. Le GEO insère un nom de marque dans une réponse synthétisée pour qu'un humain retienne la marque. Les trois rôles partagent un crawl mais divergent au moment où le moteur décide ce qu'il montre au lecteur.
      </p>
      <p>
        Le virage compte parce que les buts ont bougé. Une page qui gagnait avant en se classant troisième pour un terme de tête peut maintenant gagner en étant citée dans Google AIO sur la même requête. Une marque qui gagnait avant en empilant des backlinks peut maintenant gagner en apparaissant comme source citée dans douze réponses Perplexity par semaine. Le crawl n'a pas changé. La couche de lecture, oui.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La meilleure page de référence sur ce site pour les définitions de fond, c'est le glossaire. Voir <InternalLink to="/glossary/aeo" title="Définition AEO" description="Answer Engine Optimization, en langage clair" />, <InternalLink to="/glossary/geo" title="Définition GEO" description="Generative Engine Optimization, en langage clair" /> et <InternalLink to="/glossary/e-e-a-t" title="Définition E-E-A-T" description="Experience, Expertise, Authoritativeness, Trustworthiness" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir où vous vous situez en SEO, AEO et GEO en ce moment? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="ce-que-le-seo-traditionnel-fait-encore">Ce que le SEO traditionnel fait encore</h2>
      <p>
        Le SEO traditionnel n'est pas mort en 2026. Il a changé d'auditoire. La page de résultats à liens bleus reste la surface par défaut sur Google pour les requêtes transactionnelles (réserver un hôtel, acheter un produit, trouver une clinique ouverte), et le calcul du clic fonctionne encore pour beaucoup de catégories locales. Le SEO contrôle toujours le crawl, l'URL canonique, la balise titre, la méta-description et la structure de page. Rien de cela n'a disparu.
      </p>
      <p>
        Ce qui a changé, c'est la part de requêtes qui se résolvent sur la page de résultats elle-même. Les requêtes informationnelles comme « qu'est-ce que l'AEO » ou « comment fonctionne Google AIO » se règlent maintenant à l'intérieur de la surface de réponse. L'utilisateur lit le passage cité et part. Le SEO traditionnel n'a jamais été optimisé pour ce schéma de complétion, donc le taux de clic sur ces requêtes a chuté. La page se charge encore, le crawl se fait encore, les schémas comptent encore. Le lecteur ne clique simplement plus.
      </p>

      <h3>Où le SEO traditionnel gagne encore</h3>
      <ul>
        <li>Requêtes transactionnelles à intention commerciale claire (réserver, acheter, embaucher, planifier)</li>
        <li>Requêtes de marque où le chercheur vise un commerce précis</li>
        <li>Requêtes longue traîne avec plusieurs candidats de comparaison qui demandent une liste cliquable</li>
        <li>Requêtes du pack local où le pack est la surface principale</li>
        <li>Requêtes d'actualité et sensibles au temps que les surfaces de réponse n'ont pas encore indexées</li>
      </ul>

      <SectionDivider />

      <h2 id="comment-l-aeo-a-change-la-page">Comment l'AEO a changé la page</h2>
      <p>
        L'AEO optimise la page pour que le moteur de réponse en extraie un passage cité. Deux schémas dominent. Premièrement, la page doit répondre à la question principale dans les premiers 40 à 60 mots, parce que c'est la zone d'extraction. Deuxièmement, la page doit utiliser les schémas FAQPage et une structure Q-R parce que c'est le format que le moteur préfère citer. Une page qui réunit les deux schémas se fait tirer dans Google AIO, Bing Copilot et les autres surfaces extractives.
      </p>
      <p>
        L'AEO n'a pas remplacé le SEO sur la même page. Elle a ajouté un second rôle. La page doit maintenant se classer (SEO) et être citable (AEO). La bonne nouvelle, c'est que les deux rôles se renforcent. Une page avec une structure Q-R propre tend aussi à bien se classer parce que c'est ce que les lecteurs veulent. La mauvaise nouvelle, c'est qu'une page qui enterre sa réponse 600 mots plus loin échoue à l'extraction AEO même quand elle se classe.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>L'amélioration AEO la moins chère pour un billet existant, c'est de réécrire le premier paragraphe en réponse directe de 40 à 60 mots à la question principale. Ajouter les schémas FAQPage. Ce seul changement fait bouger le taux d'extraction de façon mesurable en 30 à 60 jours dans la plupart des catégories locales.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys, de Starter à 300 dollars CAD à Agency à 2 500 dollars CAD, qui livrent tous l'AEO et le GEO par défaut." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="comment-le-geo-a-change-la-marque">Comment le GEO a changé la marque</h2>
      <p>
        Le GEO optimise la marque pour que les moteurs génératifs la nomment dans les réponses synthétisées. L'unité d'optimisation n'est plus la page. C'est l'entité. ChatGPT et Claude ne citent pas une seule page quand ils répondent à « meilleur dentiste à Montréal ». Ils synthétisent une réponse depuis plusieurs sources et décident quels noms de marque inclure. La marque qui se fait citer est la marque qui apparaît sur plusieurs pages avec des attributs cohérents.
      </p>
      <p>
        Ce virage récompense les marques avec une forte cohérence NAP, une vraie entrée Wikidata, des citations locales denses et un historique de mentions dans le contenu tiers. Il pénalise les marques qui n'existent que sur un seul site mince sans empreinte externe. Le correctif est mécanique. Bâtir les citations, corriger le NAP, réclamer l'entrée Wikidata, livrer les avis. Le moteur AI Visibility AiLys sonde les six grands moteurs et évalue la part de citations de la marque à chaque audit.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel rôle le GEO vise-t-il dans une réponse de moteur génératif?"
        options={[
          'Classer la page sur la page de résultats à liens bleus',
          'Tirer un passage cité dans la boîte de réponse',
          'Insérer le nom de marque dans une réponse synthétisée multi-sources',
          'Obtenir un clic depuis un featured snippet',
        ]}
        correctIndex={2}
        explanation="Le GEO vise l'inclusion de la marque dans une réponse synthétisée, pas le classement de page ni l'extraction d'un passage. Le moteur assemble la réponse depuis plusieurs sources et décide quels noms de marque mentionner. Des attributs d'entité solides (NAP, Wikidata, citations, avis) pilotent cette décision."
      />

      <SectionDivider />

      <h2 id="ou-les-trois-se-recoupent">Où les trois se recoupent</h2>
      <p>
        Les trois couches partagent l'infrastructure. Le même crawl alimente les trois. La même URL canonique se fait indexer par Google pour le SEO, scanner par Google AIO pour l'AEO et consommer par ChatGPT et Perplexity pour le GEO. Le même balisage de schémas aide les trois, FAQPage le plus fort pour l'AEO et Organization le plus fort pour le GEO. La même cohérence NAP alimente le pack local (SEO) et les attributs d'entité (GEO).
      </p>
      <p>
        Ce recoupement, c'est ce qui rend le virage 2026 réalisable. Un commerçant local n'a pas à choisir entre trois budgets séparés. Le travail qui livre le SEO livre aussi l'AEO quand la page est bien structurée. Le travail qui livre l'AEO alimente aussi le GEO quand les attributs d'entité sont cohérents. L'astuce, c'est de concevoir chaque page et chaque actif hors page pour les trois couches dès le départ, pas de les rattraper plus tard.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme de Venn montrant le recoupement entre SEO, AEO et GEO avec l'infrastructure partagée (crawl, canonique, schémas, NAP)"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="comment-sequencer-le-travail">Comment séquencer le travail</h2>
      <p>
        Pour un commerçant local qui part de zéro, la séquence est : fondations SEO, puis améliorations AEO, puis travail d'entité GEO. Les fondations SEO, ce sont le crawl, la structure canonique, les balises titre et méta, l'optimisation GBP et la hiérarchie H1 à H2. Les améliorations AEO, ce sont la réponse directe en premier paragraphe, les schémas FAQPage, les paires Q-R structurées et BreadcrumbList. Le travail d'entité GEO, c'est le nettoyage NAP, la construction de citations, l'entrée Wikidata et la vélocité d'avis.
      </p>
      <p>
        Pour un commerçant avec un SEO existant mais sans AEO ni GEO, la voie la plus rapide est de commencer par les améliorations AEO sur les dix pages qui captent le plus de trafic. Ce seul mouvement fait typiquement monter la visibilité sur les surfaces de réponse en 30 à 60 jours. Ensuite, le travail d'entité GEO compose sur 90 à 180 jours. La séquence n'est pas religieuse. Pourquoi commencer par l'AEO? Parce que l'AEO utilise les actifs que le commerçant a déjà.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne sautez pas les fondations SEO pour courir après le GEO. Une marque avec une forte densité de citations mais une structure canonique brisée ou du contenu dupliqué se fait filtrer hors des réponses génératives parce que le moteur n'arrive pas à décider quelle page fait foi. Le crawl, c'est le plancher. L'AEO et le GEO se posent dessus.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="mesurer-le-virage">Mesurer le virage en 2026</h2>
      <p>
        Les indicateurs qui comptent ont changé en même temps que les couches. Le SEO se mesure encore par rang, taux de clic et trafic organique. L'AEO se mesure par taux d'extraction (à quelle fréquence la surface de réponse cite la page) et impressions sur les surfaces de réponse. Le GEO se mesure par part de citations (à quelle fréquence la marque apparaît dans une réponse générative pour une requête de catégorie) et par la ventilation moteur par moteur sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot.
      </p>
      <p>
        AiLys sonde les six moteurs pour les requêtes de marque et de catégorie à chaque audit, évalue la part de citations et livre le travail qui ferme les écarts. Le tableau de bord suit les trois couches séparément pour que le commerçant voie quel moteur a bougé ce mois-ci et quel livrable a produit la hausse. Les rapports sont bilingues EN et FR-CA à l'interne, sans API de traduction.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier votre séquence SEO, AEO et GEO sur 90 jours? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="ou-ailys-livre-la-pile">Où AiLys livre la pile</h2>
      <p>
        Chaque palier AiLys livre la pile à trois couches. Starter à 300 dollars CAD couvre les fondations SEO et les améliorations AEO sur les pages principales. Core à 799 dollars ajoute le travail d'entité GEO (construction de citations, nettoyage NAP, schémas FAQPage à grande échelle). Growth à 1 499 dollars ajoute les entrées Wikidata, la photographie originale pour les signaux d'entité et l'automatisation de réputation par Reviuzy. Agency à 2 500 dollars ajoute les livrables en marque blanche, le travail d'entité multi-emplacements et du temps de stratège dédié.
      </p>
      <p>
        La plateforme est bâtie pour le commerçant local qui ne veut pas trois fournisseurs pour trois couches. Un audit, un tableau de bord, une équipe bilingue, une facture. La page de tarifs montre les quatre paliers côte à côte et le chemin de mise à niveau.
      </p>

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Le SEO classe la page, l\'AEO extrait un passage cité, le GEO insère la marque dans une réponse synthétisée.',
          'Les trois couches partagent l\'infrastructure : même crawl, même URL canonique, mêmes schémas, même NAP.',
          'Les améliorations AEO sur les pages existantes font monter la visibilité des surfaces de réponse en 30 à 60 jours.',
          'Le travail d\'entité GEO (citations, Wikidata, avis) compose sur 90 à 180 jours.',
          'AiLys livre la pile complète à trois couches à partir de 300 dollars CAD par mois, bilingue EN et FR-CA à l\'interne.',
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
        alt="Matrice de décision liant les livrables AEO, GEO et SEO aux paliers AiLys pour un commerce local du Québec"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
