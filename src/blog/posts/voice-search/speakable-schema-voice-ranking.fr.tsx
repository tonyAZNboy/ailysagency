/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'
import { meta } from './speakable-schema-voice-ranking'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Le schéma Speakable aide-t-il vraiment le classement vocal?',
  metaDescription:
    "Une lecture honnête du schéma Speakable en 2026. Où il aide le classement vocal, où l'effet reste débattu, et comment les commerçants locaux devraient le déployer sans surpromettre.",
  tldr: "Le schéma Speakable est un balisage Schema.org qui marque des passages d'une page comme propices à être lus à haute voix par les assistants vocaux. Google le recommande pour le contenu d'actualité et les surfaces de réponse vocale. La lecture honnête en 2026 : Speakable aide en contexte d'actualité et éditorial où l'assistant tire un paragraphe à lire, mais l'effet sur le classement des pages de commerces locaux est débattu et faible. Livrez-le parce qu'il ne coûte rien, mais ne comptez pas dessus pour faire bouger seul l'aiguille.",
  faqItems: [
    {
      question: "Le schéma Speakable aide-t-il vraiment le classement vocal?",
      answer:
        "Partiellement. Le schéma Speakable est un balisage Schema.org qui marque des passages d'une page comme propices à être lus à haute voix par les assistants vocaux. Google le recommande pour le contenu d'actualité, où l'effet est réel et mesurable. Pour les pages de commerces locaux, l'effet sur le classement est débattu et modeste. Les surfaces vocales s'appuient davantage sur la qualité globale du contenu, les schémas FAQPage et les attributs d'entité de marque que sur Speakable seul. Livrez-le parce qu'il est bon marché, mais ne le voyez pas comme un levier principal.",
    },
    {
      question: "Qu'est-ce que le schéma Speakable en langage clair?",
      answer:
        "Le schéma Speakable est une propriété Schema.org appelée SpeakableSpecification qui dit aux assistants vocaux quelles parties d'une page sont de bonnes candidates à la lecture à haute voix. Le balisage utilise des sélecteurs CSS ou des expressions XPath pour pointer des éléments précis, typiquement le H1 et le premier paragraphe. L'assistant vocal peut alors synthétiser la parole à partir de ce passage en répondant à une requête. Google le soutient surtout pour les pages d'actualité et les surfaces de réponse vocale.",
    },
    {
      question: "Les commerces locaux devraient-ils utiliser le schéma Speakable?",
      answer:
        "Oui, avec des attentes réalistes. Le schéma Speakable est bon marché à ajouter et ne casse rien. La réponse honnête, c'est que pour la page d'un dentiste, d'un avocat ou d'un restaurant, l'effet sur le classement vocal est faible comparé aux schémas FAQPage, à la complétude de la fiche Google Business Profile et à la vélocité d'avis. Livrez Speakable sur la page d'accueil et les principales pages FAQ comme couche de fond, puis mettez le plus gros budget d'optimisation ailleurs.",
    },
    {
      question: "En quoi Speakable diffère-t-il des schémas FAQPage pour la voix?",
      answer:
        "Les schémas FAQPage structurent les questions et réponses pour que les assistants vocaux et les moteurs de réponse fassent correspondre une requête à une paire Q-R nette. Speakable marque des passages de n'importe quelle page comme propices à la lecture à haute voix. Les deux sont complémentaires. FAQPage pilote la correspondance, Speakable peut guider ce qui se fait lire à voix haute. Pour les surfaces de réponse vocale en 2026, FAQPage fait plus bouger l'aiguille sur les pages locales, mais Speakable ajoute une couche bon marché par-dessus.",
    },
    {
      question: "Où Speakable fonctionne-t-il le mieux?",
      answer:
        "Le contenu d'actualité et éditorial. Google a lancé Speakable en bêta pour les éditeurs de presse et la documentation penche encore de ce côté. Pour les pages d'actualité, des assistants vocaux comme Google Assistant tirent les passages marqués et les lisent. Pour les pages de commerces locaux, l'effet est réel mais plus petit parce que les surfaces vocales pour les requêtes locales s'appuient sur les signaux Google Business Profile (heures, adresse, avis) plutôt que sur les passages lus à voix haute. Le schéma compte mais le placement aussi.",
    },
    {
      question: "AiLys livre-t-elle le schéma Speakable?",
      answer:
        "Oui, à chaque palier. Speakable fait partie de la pile de schémas que nous livrons par défaut aux côtés d'Article, FAQPage, BreadcrumbList et Organization. Le coût d'ajout est essentiellement nul une fois l'infrastructure de schémas en place. Nous ne vendons pas Speakable comme levier vocal principal parce que les preuves honnêtes ne soutiennent pas cette affirmation. Nous le livrons parce qu'il est bon marché, recommandé pour les surfaces vocales, et qu'il ne nuit pas.",
    },
  ],
  headings: [
    { id: 'ce-qu-est-le-schema-speakable', text: "Ce qu'est le schéma Speakable" },
    { id: 'la-preuve-honnete-sur-le-classement-vocal', text: 'La preuve honnête sur le classement vocal' },
    { id: 'ou-speakable-fonctionne-vraiment', text: 'Où Speakable fonctionne vraiment' },
    { id: 'comment-ecrire-le-balisage', text: 'Comment écrire le balisage' },
    { id: 'speakable-vs-faqpage-pour-la-voix', text: 'Speakable vs FAQPage pour la voix' },
    { id: 'ce-qui-fait-plus-bouger-le-classement-vocal', text: 'Ce qui fait plus bouger le classement vocal' },
    { id: 'un-plan-de-deploiement-realiste', text: 'Un plan de déploiement réaliste' },
    { id: 'ou-ailys-le-livre', text: 'Où AiLys le livre' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le schéma Speakable est un balisage Schema.org qui marque des passages d'une page comme propices à être lus à haute voix par les assistants vocaux. Google le recommande pour le contenu d'actualité et les surfaces de réponse vocale. La lecture honnête en 2026, c'est que Speakable aide en contexte d'actualité et éditorial où l'assistant tire un paragraphe à lire, mais l'effet sur le classement des pages de commerces locaux est débattu et modeste. Livrez-le parce qu'il ne coûte rien, mais ne comptez pas dessus pour faire bouger seul l'aiguille. Les leviers vocaux les plus forts sont ailleurs.
      </p>

      <StatHighlight
        stats={[
          { value: 'Schema.org', label: 'SpeakableSpecification est une propriété standard' },
          { value: "Actualité d'abord", label: 'Google l\'a lancé en bêta pour les éditeurs de presse' },
          { value: 'Bon marché', label: 'Ajoute 10 lignes de JSON-LD par page' },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-qu-est-le-schema-speakable">Ce qu'est le schéma Speakable</h2>
      <p>
        Le schéma Speakable est une propriété Schema.org appelée SpeakableSpecification qui dit aux assistants vocaux quelles parties d'une page sont de bonnes candidates à la lecture à haute voix. Le balisage utilise des sélecteurs CSS ou des expressions XPath pour pointer des éléments précis, typiquement le H1 et le premier paragraphe ou la méta-description. L'assistant vocal peut ensuite synthétiser la parole à partir de ce passage en répondant à une requête. La propriété s'attache à l'objet Article ou WebPage à l'intérieur du JSON-LD de la page.
      </p>
      <p>
        Google a lancé Speakable en bêta pour les éditeurs de presse en 2018 et l'a maintenu documenté depuis. La page Schema.org la liste comme propriété avec les sous-propriétés cssSelector et xpath. Le format est stable, la syntaxe simple, et le coût d'implémentation essentiellement nul une fois que la page livre déjà du JSON-LD. Le débat honnête ne porte pas sur l'écriture. Il porte sur l'effet sur le classement vocal pour les pages hors actualité.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour les définitions de fond et la place de la voix dans la grande image AEO et GEO, voir <InternalLink to="/glossary/aeo" title="Définition AEO" description="Answer Engine Optimization, en langage clair" />, le guide pratique sur <InternalLink to="/blog/voice-search-changed-for-dentists" title="Comment la recherche vocale a changé pour les dentistes" description="Ce qui fait vraiment bouger le classement vocal pour les cliniques locales" /> et l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Sonde les surfaces vocales et IA ensemble" /> en direct.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez savoir si vos surfaces vocales se classent? Lancez l'audit AI Visibility gratuit en 24 heures, qui sonde la voix et l'IA ensemble." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-preuve-honnete-sur-le-classement-vocal">La preuve honnête sur le classement vocal</h2>
      <p>
        Trois schémas reviennent au fil des années de tests. Premièrement, Speakable fonctionne sur les pages d'actualité où l'assistant vocal a un cas d'usage clair (lis-moi le premier titre). Deuxièmement, l'effet sur le classement des pages de commerces locaux est faible et inconstant. Les surfaces vocales pour « trouver un dentiste près de moi » tirent de Google Business Profile et du pack local, pas des passages Speakable de la page d'une clinique. Troisièmement, quand l'effet apparaît sur une page locale, il vient surtout d'une meilleure qualité de contenu, pas de Speakable précisément.
      </p>
      <p>
        Ce troisième point compte. Une page qui livre Speakable livre habituellement aussi FAQPage, Article et Organization, en plus d'un H1 et d'un premier paragraphe nets qui répondent directement à la requête. Quand le classement vocal monte, attribuer la hausse à Speakable seul est difficile parce que le reste de la pile a bougé en même temps. La lecture honnête, c'est que Speakable est l'une des nombreuses petites couches, pas un levier autonome.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Méfiez-vous des fournisseurs qui présentent Speakable comme le correctif principal du classement vocal. La documentation Schema.org est claire : c'est un indice donné aux assistants vocaux sur les passages à lire, pas un signal de classement confirmé par Google pour le contenu hors actualité. Quiconque vend Speakable comme une solution miracle surpromet.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="ou-speakable-fonctionne-vraiment">Où Speakable fonctionne vraiment</h2>
      <p>
        Le contenu d'actualité et éditorial est l'endroit où Speakable a été conçu pour fonctionner, et il y arrive. Une page d'actualité qui livre Speakable sur le paragraphe d'amorce se fait tirer dans les briefings de Google Assistant, les Flash Briefings d'Alexa (où c'est soutenu) et des surfaces vocales similaires. Les éditeurs avec un cycle quotidien voient un vrai gain parce que l'assistant a un travail clair (lis-moi l'actualité) et le balisage lui dit quel passage lire.
      </p>
      <p>
        Les pages de commerces locaux en profitent moins parce que la surface vocale pour les requêtes locales est différente. Quand un utilisateur demande à Siri ou Google Assistant « trouve un dentiste ouvert près de moi », l'assistant interroge le pack local, lit le nom, l'adresse et les heures depuis GBP, et lit rarement, voire jamais, un paragraphe du site de la clinique. Le balisage Speakable sur la page d'accueil de la clinique est techniquement correct mais frappe une surface qui ne le consomme pas. C'est l'écart entre recommandé et marquant.
      </p>

      <SectionDivider />

      <h2 id="comment-ecrire-le-balisage">Comment écrire le balisage</h2>
      <p>
        Le balisage est court. À l'intérieur du JSON-LD Article ou WebPage de la page, ajoutez une propriété speakable qui pointe le H1 et le premier paragraphe avec des sélecteurs CSS. L'exemple ci-dessous montre le schéma canonique. La plupart des billets AiLys livrent cette même paire de sélecteurs sur chaque page.
      </p>

      <h3>Schéma Speakable canonique</h3>
      <ul>
        <li>Propriété : speakable</li>
        <li>Type : SpeakableSpecification</li>
        <li>cssSelector : un tableau, typiquement [".prose-blog h2", ".prose-blog p:first-of-type"]</li>
        <li>Alternative : xpath, un tableau d'expressions XPath pour les cas non-HTML</li>
        <li>Placement : à l'intérieur de l'objet Article ou WebPage du JSON-LD, aux côtés de headline, datePublished et author</li>
      </ul>

      <p>
        Le coût d'implémentation est une propriété supplémentaire par page. Si le site livre déjà du JSON-LD via un composant de mise en page, ajouter Speakable est une seule modification. Si le site ne livre pas encore de JSON-LD, c'est le plus gros chantier, et Speakable devrait suivre le déploiement plus large des schémas plutôt que d'être un projet en soi.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Où le schéma Speakable a-t-il l'effet le plus fort sur le classement?"
        options={[
          'Sur les pages d\'accueil de commerces locaux pour les requêtes du pack local',
          'Sur le contenu d\'actualité et éditorial tiré par les assistants vocaux',
          'Sur les pages de produits pour les requêtes de commerce vocal',
          'Sur chaque page de façon égale, peu importe le type de contenu',
        ]}
        correctIndex={1}
        explanation="Google a lancé Speakable en bêta pour les éditeurs de presse, et c'est là que l'effet est le plus net. Les assistants vocaux tirent les passages marqués des pages d'actualité pour les lire dans les briefings. Pour les pages de commerces locaux, l'effet est faible parce que les surfaces vocales pour les requêtes locales s'appuient sur les signaux Google Business Profile, pas sur les passages lus à voix haute."
      />

      <SectionDivider />

      <h2 id="speakable-vs-faqpage-pour-la-voix">Speakable vs FAQPage pour la voix</h2>
      <p>
        Les schémas FAQPage sont le mouvement à plus fort impact pour la voix sur la plupart des pages locales. La raison, c'est la correspondance. Les requêtes vocales sont habituellement des questions en langage naturel, et FAQPage structure la page en paires Q-R que le moteur de réponse peut faire correspondre directement. Speakable décrit quel passage lire, mais si le moteur n'a jamais fait correspondre la page d'abord, le balisage de lecture à haute voix ne sert à rien.
      </p>
      <p>
        Les deux sont complémentaires, pas concurrents. FAQPage pilote la correspondance. Speakable peut guider la lecture. Pour la page d'une clinique locale, livrez FAQPage sur les cinq questions principales (heures, emplacement, assurance, services, stationnement) et ajoutez Speakable sur le H1 et le premier paragraphe comme couche de fond. Cette pile est bon marché, rapide et alignée avec les preuves honnêtes.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma comparatif montrant FAQPage qui pilote la correspondance et Speakable qui guide le passage lu à voix haute pour une requête vocale"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="ce-qui-fait-plus-bouger-le-classement-vocal">Ce qui fait plus bouger le classement vocal</h2>
      <p>
        Trois leviers font plus bouger le classement vocal pour les commerces locaux que Speakable. Premièrement, la complétude de la fiche Google Business Profile (heures, photos, services, attributs, publications). Les assistants vocaux les tirent directement en répondant aux requêtes locales. Deuxièmement, les schémas FAQPage sur les pages des questions principales, parce que les requêtes vocales sont des questions et le moteur veut une structure Q-R. Troisièmement, la vélocité et la note des avis, parce que les surfaces vocales s'appuient sur les signaux d'avis pour classer les résultats locaux.
      </p>
      <p>
        Au-delà de ces trois, la cohérence NAP entre les citations alimente les attributs d'entité que les assistants vocaux utilisent pour vérifier que le commerce est réel et à jour. Les entrées Wikidata et les schémas Person ou Organization renforcent l'entité. Rien de cela n'est Speakable. Le plan honnête livre Speakable comme couche bon marché et met le plus gros budget sur le travail GBP, FAQPage, avis et NAP.
      </p>

      <InlineCTA variant="pricing" text="Voyez les forfaits AiLys conçus pour la voix et l'AI Visibility, de Starter à 300 dollars CAD à Agency à 2 500 dollars CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="un-plan-de-deploiement-realiste">Un plan de déploiement réaliste</h2>
      <p>
        Pour un commerçant local sans schémas, séquencez le travail ainsi. Semaine un, livrez Article et Organization à l'échelle du site. Semaine deux, livrez FAQPage sur la page d'accueil et les cinq pages de service principales. Semaine trois, livrez Speakable sur ces mêmes pages comme couche de fond. Semaine quatre, livrez BreadcrumbList et LocalBusiness. Après, l'infrastructure de schémas est mature et le travail courant porte sur la qualité de contenu et le renforcement d'entité.
      </p>
      <p>
        Pour un commerçant avec des schémas matures mais sans Speakable, son ajout est un seul déploiement. Couplez-le à une vérification rapide du H1 et du premier paragraphe sur chaque page pour confirmer que les passages visés par le balisage répondent vraiment à la question principale. Un Speakable qui pointe une intro vague est techniquement valide et pratiquement inutile.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le contrôle qualité le plus simple après avoir livré Speakable, c'est d'afficher le code source de la page, de trouver le bloc JSON-LD et de confirmer que la propriété speakable apparaît avec cssSelector pointant le H1 et le premier paragraphe. Puis passez la page dans le validateur Schema.org. Si les deux passent, le balisage est correct. L'effet sur le classement vocal est une question distincte qui prend 60 à 90 jours à se lire.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="ou-ailys-le-livre">Où AiLys le livre</h2>
      <p>
        Chaque palier AiLys livre le schéma Speakable comme partie de la pile par défaut. Starter à 300 dollars CAD inclut les schémas de fond (Article, FAQPage, Speakable, Organization) sur la page d'accueil et les pages de service principales. Core à 799 dollars l'étend à tout le site. Growth à 1 499 dollars ajoute les entrées Wikidata et la photographie originale pour le renforcement d'entité. Agency à 2 500 dollars ajoute les livrables en marque blanche et le temps de stratège dédié pour les déploiements vocaux multi-emplacements.
      </p>
      <p>
        AiLys ne vend pas Speakable comme levier vocal principal parce que les preuves honnêtes ne soutiennent pas cette affirmation. La plateforme le livre parce qu'il est bon marché, recommandé, et qu'il ne nuit pas. Le plus gros travail vocal se passe sur GBP, FAQPage, avis et nettoyage NAP, qu'AiLys livre dans le même forfait. Pour voir où se situe le classement vocal aujourd'hui, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Sonde les surfaces vocales et IA ensemble" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier votre feuille de route vocale et AI Visibility? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Le schéma Speakable marque des passages d\'une page comme propices à la lecture à haute voix par les assistants vocaux, via sélecteurs CSS ou XPath.',
          'L\'effet est réel sur les pages d\'actualité, débattu et modeste sur les pages de commerces locaux.',
          'Livrez-le parce qu\'il ne coûte rien, pas parce qu\'il est une solution miracle au classement vocal.',
          'Les schémas FAQPage, la complétude GBP et la vélocité d\'avis font plus bouger le classement vocal que Speakable seul.',
          'AiLys livre Speakable à chaque palier comme partie de la pile de schémas par défaut, sans surcoût.',
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
        alt="Matrice de décision montrant la place du schéma Speakable dans une stratégie de classement vocal aux côtés du travail FAQPage, GBP et avis"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
