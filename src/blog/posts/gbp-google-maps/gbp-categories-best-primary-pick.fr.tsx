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
import { meta } from './gbp-categories-best-primary-pick'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Catégories GBP, comment choisir la meilleure catégorie principale en 2026',
  metaDescription:
    'Comment choisir la meilleure catégorie principale GBP pour un commerce local au Québec. Compromis entre catégories larges et étroites, slots secondaires, Apple Maps et Bing Places.',
  tldr: "La catégorie principale Google Business Profile est le plus gros levier d'admissibilité au pack local. Choisissez la catégorie la plus étroite qui couvre encore vos trois principaux services en revenus. Servez-vous de l'API GBP pour énumérer toutes les étiquettes disponibles dans votre marché, auditez les trois premiers concurrents du pack local, et n'élargissez que si l'étiquette étroite n'a pas de volume de recherche. Les catégories secondaires comptent beaucoup moins, et Apple Maps comme Bing Places traitent la taxonomie différemment de Google.",
  faqItems: [
    {
      question: "Quelle est la meilleure catégorie principale pour un dentiste de Montréal sur GBP?",
      answer:
        "Pour la plupart des cliniques générales à Montréal, la bonne catégorie principale est « Dentiste ». Les étiquettes plus étroites comme « Dentiste cosmétique » ou « Dentiste pédiatrique » apportent moins de volume mais une intention plus forte, donc elles ne battent l'étiquette large que si la clinique tire la majorité de ses revenus de ce service précis. Règle de décision honnête : choisissez la catégorie la plus étroite qui couvre encore vos trois principaux services en revenus. Si une clinique fait des soins généraux plus des implants et des aligneurs transparents, « Dentiste » gagne. Si la clinique ne fait que des aligneurs, « Dentiste cosmétique » gagne.",
    },
    {
      question: "Comment voir toutes les catégories GBP disponibles dans mon pays?",
      answer:
        "La taxonomie complète est exposée par l'API Google My Business via le point de terminaison categories.list, avec des filtres regionCode et languageCode. Pour les commerces canadiens francophones, passez regionCode=CA et languageCode=fr. La liste est volumineuse (environ 4 000 étiquettes en EN-CA, un peu moins en FR-CA) et se met à jour quelques fois par année quand Google ajoute ou fusionne des catégories. Des outils comme PlePer ou LocalFalcon exposent la même liste dans une interface plus conviviale pour les commerçants qui ne veulent pas appeler l'API directement.",
    },
    {
      question: "Les catégories secondaires aident-elles le classement du pack local?",
      answer:
        "Les catégories secondaires aident, mais le gain est faible par rapport à la principale. L'algorithme du pack local pondère la catégorie principale autour de 80 pour cent du signal de catégorie et répartit les 20 pour cent restants sur jusqu'à neuf slots secondaires. Le bon réflexe est d'utiliser les slots secondaires pour des services adjacents qui génèrent des revenus mais ne méritent pas leur propre fiche, jamais pour bourrer de mots-clés sans rapport. Ajouter « Restaurant » comme secondaire sur un profil de salon de coiffure est le genre d'incohérence qui déclenche une revue manuelle et une suspension.",
    },
    {
      question: "Comment Apple Maps gère-t-il les catégories différemment de Google?",
      answer:
        "Apple Business Connect utilise une taxonomie plus petite (environ 600 étiquettes) et n'expose pas la distinction principale-secondaire de la même façon. Apple pondère le plus la première catégorie sélectionnée et autorise jusqu'à quatre slots secondaires. Bing Places utilise la liste de catégories dérivée de Yext (environ 3 500 étiquettes) et se comporte comme Google avec une principale plus jusqu'à neuf slots secondaires. Implication pratique : choisissez l'étiquette étroite équivalente sur chaque plateforme séparément, ne supposez pas que votre principale Google se traduit directement sur Apple ou Bing.",
    },
    {
      question: "Puis-je changer ma catégorie principale GBP sans nuire au classement?",
      answer:
        "Oui, mais attendez-vous à une période d'ajustement de 4 à 6 semaines où le classement du pack local sur les requêtes de l'ancienne catégorie ramollit et celui des requêtes de la nouvelle catégorie monte. L'ajustement est plus rapide quand la nouvelle catégorie est une version plus étroite de l'ancienne (Dentiste à Dentiste cosmétique) et plus lent quand les catégories n'ont pas de lien. Évitez de changer la catégorie principale plus de deux fois par année. L'algorithme lit les changements fréquents comme de l'instabilité et réduit l'effet de fraîcheur après le deuxième changement.",
    },
    {
      question: "Que faire si mon type de commerce exact n'existe pas dans la taxonomie GBP?",
      answer:
        "Repliez-vous sur l'étiquette plus large la plus proche et utilisez la description du commerce et les catégories secondaires pour préciser. Par exemple, « salle de lancer de hache » n'a pas été une catégorie pendant des années, alors les opérateurs utilisaient « Centre de divertissement » comme principale avec « Bar » et « Salle d'événements » comme secondaires. Google ajoute de nouvelles catégories chaque trimestre ou deux, donc revérifiez la taxonomie à chaque trimestre via l'API ou un outil comme PlePer.",
    },
    {
      question: "Faut-il copier la catégorie principale du leader du pack local?",
      answer:
        "Auditez-la, mais ne la copiez pas aveuglément. Le leader du pack local gagne parfois malgré une catégorie sous-optimale grâce à un volume écrasant d'avis, à la profondeur de citations ou à la proximité du chercheur. Tirez les catégories des trois premiers résultats du pack local pour vos cinq requêtes les plus importantes, cherchez la catégorie consensus parmi elles, et choisissez celle-là. Si deux des trois utilisent la même étiquette étroite et le troisième une plus large, l'étiquette étroite est habituellement le bon choix.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-categorie-principale-compte-le-plus', text: 'Pourquoi la catégorie principale compte le plus' },
    { id: 'large-ou-etroit-la-regle-de-decision-honnete', text: 'Large ou étroit, la règle de décision honnête' },
    { id: 'comment-rechercher-toutes-les-categories-via-l-api-gbp', text: "Comment rechercher toutes les catégories via l'API GBP" },
    { id: 'auditer-les-concurrents-du-pack-local', text: 'Auditer les concurrents du pack local' },
    { id: 'pourquoi-les-categories-secondaires-comptent-moins', text: 'Pourquoi les catégories secondaires comptent moins que la principale' },
    { id: 'comment-apple-maps-et-bing-places-divergent', text: 'Comment Apple Maps et Bing Places divergent de Google' },
    { id: 'changer-la-categorie-principale-en-toute-securite', text: 'Changer la catégorie principale sans nuire au classement' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        La catégorie principale Google Business Profile est le plus gros levier d'admissibilité au pack local. Elle dit à Google sur quelles requêtes votre profil a même le droit d'apparaître, avant qu'aucun signal de classement ne joue. Un dentiste de Montréal dont la principale est « Clinique médicale » est invisible sur « dentiste près de moi » peu importe le nombre d'avis cinq étoiles. La correction est rarement compliquée, mais elle est rarement bien faite. Ce guide détaille la règle de décision honnête, la méthode de recherche par l'API GBP et les divergences Apple Maps et Bing Places qui mordent les opérateurs multi-plateformes.
      </p>

      <StatHighlight
        stats={[
          { value: '~80%', label: 'Part du signal de catégorie portée par le slot principal' },
          { value: '~4 000', label: 'Catégories GBP disponibles en EN-CA' },
          { value: '4-6 sem', label: "Période d'ajustement après un changement de principale" },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-la-categorie-principale-compte-le-plus">Pourquoi la catégorie principale compte le plus</h2>
      <p>
        La catégorie principale est un filtre d'admissibilité, pas un facteur de classement. Google décide quels profils peuvent disputer une requête en croisant l'intention de la requête avec les catégories principales des profils proches. Une requête comme « dentiste Montréal » filtre vers les profils dont la principale est « Dentiste », « Dentiste cosmétique », « Dentiste pédiatrique » ou une poignée de cousines proches. Les profils hors de cet ensemble sont éliminés, peu importe la force de leurs autres signaux.
      </p>
      <p>
        Une fois le filtre passé, le classement commence. À cette étape, la catégorie principale pèse encore lourd (autour de 80 pour cent du signal de catégorie dans nos données de cohorte), mais elle côtoie d'autres leviers forts comme la proximité, la vélocité d'avis, la complétude GBP et la cohérence des citations. Choisir la bonne principale débloque la compétition. Choisir la mauvaise principale garde le profil invisible peu importe l'effort en aval.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>L'erreur de catégorie principale la plus fréquente que nous voyons au Québec est « Clinique médicale » sur une clinique dentaire. L'étiquette sonne professionnelle, mais elle filtre le profil hors de toutes les requêtes dentaires. La correction est un clic dans GBP et le profil reparaît habituellement dans le pack local en deux semaines.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez savoir si votre catégorie principale GBP vous filtre hors des requêtes à forte intention? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="large-ou-etroit-la-regle-de-decision-honnete">Large ou étroit, la règle de décision honnête</h2>
      <p>
        La règle de décision est courte. Choisissez la catégorie la plus étroite qui couvre encore vos trois principaux services en revenus. Plus étroit que ça laisse des revenus sur la table parce que le filtre vous exclut des requêtes liées à des services que vous offrez vraiment. Plus large dilue votre admissibilité face à plus de concurrents, dont certains qui ne servent même pas le créneau.
      </p>
      <p>
        Pour un dentiste de Montréal, la règle se concrétise. Une clinique générale qui fait nettoyages, plombages et extractions plus implants et aligneurs transparents devrait choisir « Dentiste » comme principale. Une clinique qui réserve 80 pour cent de ses revenus aux aligneurs transparents et à Invisalign devrait choisir « Dentiste cosmétique ». Une clinique qui ne traite que des enfants devrait choisir « Dentiste pédiatrique ». Les étiquettes étroites apportent moins de volume en absolu, mais les requêtes captées sont plus intentionnelles et convertissent à un taux beaucoup plus élevé.
      </p>

      <h3>Le compromis en chiffres simples</h3>
      <ul>
        <li>« Dentiste » à Montréal : volume élevé, concurrence forte, intention large (nettoyages, plombages, urgences, cosmétique, pédiatrique)</li>
        <li>« Dentiste cosmétique » à Montréal : volume plus bas (environ 15 à 25 pour cent de « Dentiste »), bassin concurrent plus restreint, intention plus forte (blanchiment, facettes, transformation du sourire)</li>
        <li>« Dentiste pédiatrique » à Montréal : volume le plus bas (environ 8 à 12 pour cent de « Dentiste »), bassin concurrent le plus petit, intention pilotée par les parents</li>
      </ul>

      <p>
        L'écart de volume fait peur sur papier. En pratique, l'étiquette étroite convertit 2 à 3 fois mieux que la large parce que les requêtes correspondent exactement au service. Une clinique avec un solide carnet en dentisterie cosmétique gagne presque toujours plus de revenus avec « Dentiste cosmétique » comme principale, même si le trafic absolu est plus faible.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Faites le calcul des deux côtés avant de décider. Si 60 pour cent de vos revenus viennent du service de niche, l'étiquette étroite gagne. Si seulement 20 pour cent en viennent, l'étiquette large gagne. Entre 20 et 60 pour cent, auditez vos concurrents du pack local et choisissez l'étiquette consensus.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-rechercher-toutes-les-categories-via-l-api-gbp">Comment rechercher toutes les catégories via l'API GBP</h2>
      <p>
        La taxonomie GBP complète n'est pas visible dans l'interface GBP. Le sélecteur ne montre que les étiquettes qui correspondent au texte tapé, ce qui veut dire que vous pouvez rater une catégorie plus précise sans connaître la graphie exacte. La méthode de recherche honnête est d'énumérer la liste complète via l'API Google My Business.
      </p>

      <h3>Le point de terminaison categories.list</h3>
      <p>
        Le point de terminaison est <code>businesscategories.googleapis.com/v1/categories</code>. Les paramètres pertinents sont <code>regionCode</code> (CA pour le Canada, US pour les États-Unis, FR pour la France), <code>languageCode</code> (en-CA, fr-CA, en-US) et <code>view</code> à FULL pour inclure les suggestions de catégories secondaires. La réponse renvoie la liste complète et ordonnée des catégories disponibles dans ce marché, chacune avec son categoryId (utilisé dans l'API GBP pour fixer la principale), son displayName et ses serviceTypes.
      </p>
      <p>
        Pour les commerces canadiens francophones, l'appel le plus important est l'énumération EN-CA jumelée à FR-CA, parce que les deux listes ne sont pas toujours synchronisées. Certaines catégories n'existent qu'en EN-CA, d'autres qu'en FR-CA, et une poignée ont des traductions de displayName différentes qui changent les requêtes sur lesquelles le profil apparaît.
      </p>

      <h3>Outils qui enveloppent l'API pour les non-développeurs</h3>
      <ul>
        <li>PlePer (palier gratuit) : expose la liste GBP complète dans une interface filtrable, organisée par industrie parente</li>
        <li>LocalFalcon : inclut un fureteur de catégories dans la suite de suivi de classement local</li>
        <li>BrightLocal : remonte les catégories des profils concurrents dans le repère de citations</li>
      </ul>

      <p>
        Ces outils ne sont pas strictement nécessaires, mais ils sont plus rapides que l'appel API à la main si vous n'auditez les catégories que deux ou trois fois par année.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Pourquoi le sélecteur de catégories GBP ne montre-t-il pas toutes les catégories disponibles?"
        options={[
          'Parce que Google retire les catégories peu recherchées',
          "Parce que le sélecteur ne montre que les étiquettes qui correspondent au texte tapé, donc on peut rater des catégories précises sans la graphie exacte",
          'Parce que les catégories secondaires sont derrière une barrière payante',
          'Parce que la liste est régénérée chaque jour et les petits commerces voient un sous-ensemble',
        ]}
        correctIndex={1}
        explanation="Le sélecteur GBP est une recherche par préfixe sur la taxonomie. Si vous tapez « dental » vous voyez Dentiste, Dentiste cosmétique, Dentiste pédiatrique et Clinique dentaire. Vous ne voyez pas des étiquettes de niche comme « Laboratoire dentaire » ou « Implantologue parodontiste » sans savoir taper ces mots. La liste complète vit derrière le point de terminaison categories.list."
      />

      <SectionDivider />

      <h2 id="auditer-les-concurrents-du-pack-local">Auditer les concurrents du pack local</h2>
      <p>
        Le test de cohérence le plus rapide pour un choix de catégorie est d'auditer les trois premiers résultats du pack local pour vos cinq requêtes les plus importantes. Lancez les requêtes depuis un vrai endroit près du commerce (utilisez un téléphone avec la localisation activée, pas un poste de travail avec un truc de RPV), regardez les trois résultats du pack et cliquez dans chaque profil pour lire la catégorie principale.
      </p>
      <p>
        Trois schémas reviennent dans l'audit. Premier, le schéma consensus : les trois profils partagent la même principale. C'est votre catégorie. Deuxième, le schéma divisé : deux profils partagent une principale et le troisième en utilise une autre. La catégorie partagée est habituellement le bon choix, le troisième profil gagnant malgré l'écart par d'autres signaux. Troisième, le schéma chaotique : trois catégories différentes. Cela veut souvent dire que l'intention de la requête elle-même est mixte et que vous devriez choisir la catégorie qui correspond le plus précisément à votre service, pas celle du leader.
      </p>

      <img
        src={meta.images.mid}
        alt="Grille d'audit du pack local montrant les catégories principales des trois premiers résultats pour cinq requêtes dentaires à forte intention à Montréal"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        L'audit prend environ 30 minutes pour un commerce avec cinq requêtes principales. Documentez le résultat dans un tableur avec des colonnes pour la requête, les trois URL du haut, les trois catégories principales et votre catégorie actuelle. Les écarts sautent aux yeux immédiatement. Pour un livre de jeu Québec axé sur les cliniques dentaires, voyez <InternalLink to="/industries/dentists" title="SEO local pour dentistes" description="Livre de jeu industriel pour les cliniques dentaires au Québec" />, et pour la fiche structurelle sur les signaux de recherche locale, voyez <InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Définitions pour principale, secondaire, attributs et plus" />. Pour étalonner votre catégorie actuelle face au leader du pack local, lancez l'<InternalLink to="/audit/gbp" title="Audit GBP" description="Audit gratuit de 24 heures couvrant la pertinence de la catégorie principale et l'analyse du pack concurrent" />.
      </p>

      <InlineCTA variant="pricing" text="Voyez les paliers AiLys qui incluent l'audit trimestriel des catégories et le repère concurrent, à partir de Core à 799 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="pourquoi-les-categories-secondaires-comptent-moins">Pourquoi les catégories secondaires comptent moins que la principale</h2>
      <p>
        Les catégories secondaires sont utiles mais elles ne remplacent pas le bon choix de principale. L'algorithme du pack local pondère la principale autour de 80 pour cent du signal total de catégorie et répartit les 20 pour cent restants sur jusqu'à neuf slots secondaires. Le calcul est sans pitié : neuf secondaires ne compensent pas une mauvaise principale.
      </p>
      <p>
        Le bon usage des secondaires est de capter les services de revenus adjacents qui rapportent mais ne méritent pas leur propre fiche. Une clinique dentaire générale avec une principale « Dentiste » peut utiliser des secondaires comme « Dentiste cosmétique », « Dentiste pédiatrique », « Service dentaire d'urgence » et « Service de blanchiment des dents » pour capter la longue traîne des requêtes de niche tout en gardant l'étiquette large comme ancre d'admissibilité.
      </p>

      <h3>Erreurs fréquentes avec les catégories secondaires</h3>
      <ol>
        <li>Bourrage de mots-clés avec des étiquettes sans rapport (un salon de coiffure qui liste « Restaurant » en secondaire). Déclenche une revue manuelle et un risque de suspension.</li>
        <li>Utiliser les neuf slots peu importe la pertinence. Les slots vides ne sont pas une pénalité, les slots décalés le sont.</li>
        <li>Choisir des secondaires qui chevauchent fortement la principale (par exemple « Clinique dentaire » et « Dentiste » ensemble). Gaspille un slot sur un quasi-doublon.</li>
        <li>Oublier de revoir après l'ajout d'un service. Les nouveaux services méritent souvent un nouveau slot secondaire.</li>
      </ol>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Utilisez quatre à six slots secondaires, pas neuf. Au-delà de six, le gain marginal tombe à près de zéro et le risque de décalage monte. Gardez les slots inutilisés pour des services que vous ajouterez vraiment plus tard.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-apple-maps-et-bing-places-divergent">Comment Apple Maps et Bing Places divergent de Google</h2>
      <p>
        La taxonomie Google est la plus large des trois majeures, et les opérateurs qui n'optimisent que pour Google laissent des revenus réels sur Apple Maps et Bing Places. Les deux plateformes roulent leur propre taxonomie et pondèrent les catégories différemment de Google.
      </p>

      <h3>Apple Business Connect</h3>
      <p>
        Apple utilise une taxonomie plus petite (autour de 600 étiquettes en 2026) et expose une principale plus jusqu'à quatre slots secondaires. La première catégorie sélectionnée porte le plus de poids. Apple n'expose pas d'API publique pour la taxonomie complète, donc la méthode de recherche pratique est de faire défiler le sélecteur dans Apple Business Connect et de documenter les étiquettes qui correspondent à vos services. Pour les commerces québécois, Apple livre des étiquettes de catégories bilingues (le sélecteur affiche en EN et FR-CA), ce qui simplifie la recherche par rapport à Google.
      </p>

      <h3>Bing Places</h3>
      <p>
        Bing Places utilise la liste de catégories dérivée de Yext (autour de 3 500 étiquettes) et prend en charge une principale plus jusqu'à neuf slots secondaires, comme Google. Les effets de catégorie sur la recherche locale Bing sont plus faibles que sur Google parce que Bing a moins de volume d'intention locale, mais l'avantage est que la concurrence est aussi plus faible. Un profil qui choisit la bonne étiquette étroite en principale sur Bing apparaît souvent dans le top trois local avec beaucoup moins d'effort qu'avec les mêmes choix sur Google.
      </p>

      <p>
        La règle multiplateformes honnête est simple : choisissez l'étiquette étroite équivalente sur chaque plateforme séparément, ne supposez pas que votre principale Google se traduit directement sur Apple ou Bing. Les étiquettes divergent souvent en graphie, en portée ou les deux.
      </p>

      <SectionDivider />

      <h2 id="changer-la-categorie-principale-en-toute-securite">Changer la catégorie principale sans nuire au classement</h2>
      <p>
        Les commerçants hésitent souvent à changer la catégorie principale par peur que le pack local s'effondre pendant la transition. Les données sont plus nuancées. Un changement de catégorie déclenche une période d'ajustement de 4 à 6 semaines où les requêtes de l'ancienne catégorie ramollissent et celles de la nouvelle catégorie montent. L'effet net est positif quand la nouvelle catégorie correspond mieux au mélange de services réel.
      </p>
      <p>
        Deux règles gardent l'ajustement propre. Premièrement, ne changez pas la principale plus de deux fois par année. L'algorithme lit les changements fréquents comme de l'instabilité et réduit l'effet de fraîcheur après le deuxième changement. Deuxièmement, changez la principale isolément. Ne jumelez pas un changement de catégorie avec un changement de nom, d'adresse ou une grosse édition de zone de service la même semaine. Chacun déclenche sa propre période d'ajustement et le chevauchement amplifie la volatilité.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Si le classement du pack local n'a pas récupéré après 8 semaines suivant le changement, la nouvelle catégorie correspond probablement moins bien au mélange de services réel. Auditez les requêtes qui ont perdu du classement et demandez-vous si elles décrivent encore des services que vous offrez. Si oui, revenez à la principale précédente.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de votre audit de catégories GBP et de votre choix de principale? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "La catégorie principale GBP est un filtre d'admissibilité. La mauvaise principale vous garde invisible peu importe les autres signaux.",
          'Choisissez la catégorie la plus étroite qui couvre encore vos trois principaux services en revenus.',
          "Énumérez la taxonomie complète via le point de terminaison categories.list de l'API GBP, pas via le sélecteur dans le produit.",
          'Auditez les trois premiers résultats du pack local pour vos cinq requêtes les plus importantes et choisissez la catégorie consensus.',
          'Les catégories secondaires portent autour de 20 pour cent du signal de catégorie. Utilisez quatre à six slots, pas neuf.',
          "Apple Maps et Bing Places roulent des taxonomies séparées. Choisissez l'étiquette étroite équivalente sur chaque plateforme.",
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
        alt="Matrice de décision pour choisir une catégorie principale GBP pour un commerce local du Québec"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
