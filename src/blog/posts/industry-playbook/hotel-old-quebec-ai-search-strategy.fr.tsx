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
import { meta } from './hotel-old-quebec-ai-search-strategy'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Stratégie de recherche IA pour les hôtels du Vieux-Québec en 2026",
  metaDescription:
    "Comment les hôtels boutiques du Vieux-Québec rivalisent avec Booking, Expedia et Hotels.com dans ChatGPT, Perplexity, Google AIO et la recherche vocale. Schémas, FAQ et plan de citations.",
  tldr: "Les hôtels boutiques du Vieux-Québec perdent les réservations directes au profit de Booking.com, Expedia et Hotels.com parce que les moteurs IA citent les OTA en premier. La solution est un travail de citation directe : schéma Hotel avec la bonne liste d'équipements, pages FAQ qui répondent à de vraies questions de voyageurs, cohérence NAP sur les répertoires de voyage, et contenu de conciergerie locale signé. Les hôtels qui livrent cette pile gagnent une part mesurable des requêtes de marque et de catégorie dans les réponses IA en moins d'un trimestre.",
  faqItems: [
    {
      question: "Comment les hôtels du Vieux-Québec rivalisent-ils avec les sites de réservation dans la recherche IA?",
      answer:
        "Les hôtels boutiques rivalisent en devenant la source de citation directe que les moteurs IA vont chercher, pas en essayant de battre Booking.com sur le prix. Le plan est une pile : schéma Hotel avec données d'équipements complètes, pages FAQ qui répondent à de vraies questions comme meilleur hôtel boutique Vieux-Québec ou hôtel près du Château Frontenac avec stationnement, cohérence NAP sur les répertoires de voyage, et contenu de conciergerie locale signé par un membre nommé du personnel. ChatGPT, Perplexity et Google AIO citent les sources primaires quand les données structurées sont assez propres pour être dignes de confiance.",
    },
    {
      question: "De quel balisage de schéma les hôtels boutiques ont-ils besoin pour être cités par les IA?",
      answer:
        "Le schéma Hotel (type Schema.org Hotel) avec starRating, priceRange, amenityFeature, checkinTime, checkoutTime, address et coordonnées geo. Le schéma LocalBusiness seul ne suffit pas pour les requêtes hôtelières puisque les moteurs IA distinguent les propriétés par les attributs propres aux hôtels. Ajoutez le schéma FAQPage pour les principales questions de voyageurs, BreadcrumbList pour la navigation, et Organization avec liens sameAs vers Booking, Expedia, TripAdvisor et l'office du tourisme. Le schéma devient la colonne vertébrale que les moteurs IA reprennent.",
    },
    {
      question: "Pourquoi ChatGPT cite-t-il Booking au lieu du site de mon hôtel?",
      answer:
        "ChatGPT cite Booking parce que les pages OTA portent des données structurées plus denses, plus d'avis par propriété et des signaux de confiance plus forts que la plupart des sites d'hôtels boutiques. La page de l'hôtel indépendant manque souvent de schéma Hotel, a une FAQ mince et affiche moins d'avis cités. La solution est de publier les données précises dont les moteurs IA ont besoin : liste complète d'équipements, ventilation des types de chambres, heures de réception, politique du déjeuner, stationnement, animaux et contenu de conciergerie bilingue. Quand le site primaire détient la réponse canonique, les moteurs IA commencent à le citer aux côtés ou au-dessus de l'OTA.",
    },
    {
      question: "La cohérence NAP a-t-elle encore de l'importance pour les hôtels en 2026?",
      answer:
        "Oui, plus que jamais dans la recherche IA. La cohérence NAP (Nom, Adresse, Téléphone) sur Google Business Profile, Apple Business Connect, TripAdvisor, Booking, Expedia, Hotels.com, Tourisme Québec et les répertoires de marchands du Vieux-Québec est la colonne de confiance que les moteurs IA utilisent pour vérifier que l'hôtel existe et fonctionne actuellement. Une seule incohérence (un vieux numéro de téléphone sur Pages Jaunes, un format de rue différent sur TripAdvisor) suffit à affaiblir les taux de citation parce que les moteurs hésitent quand les sources ne s'accordent pas.",
    },
    {
      question: "Combien de temps faut-il pour gagner des citations IA comme hôtel boutique?",
      answer:
        "La plupart des propriétés voient un mouvement mesurable de la part de citations en 8 à 12 semaines après avoir livré la pile complète. Les schémas et pages FAQ s'indexent en deux à quatre semaines. Le nettoyage NAP se propage sur les répertoires de voyage le mois suivant. Le contenu de conciergerie gagne ses premières citations IA une fois que les moteurs ont exploré les pages bilingues et confirmé que les données structurées concordent. L'effet de composition s'enclenche autour du troisième mois quand les avis, les citations et le trafic direct commencent à se renforcer mutuellement.",
    },
  ],
  headings: [
    { id: 'pourquoi-les-ota-gagnent-la-citation-par-defaut', text: "Pourquoi les OTA gagnent la citation IA par défaut" },
    { id: 'la-pile-de-schema-hotel-qui-cite-vraiment', text: "La pile de schémas Hotel qui décroche vraiment des citations" },
    { id: 'pages-faq-pour-vraies-questions-de-voyageurs', text: 'Pages FAQ pour de vraies questions de voyageurs' },
    { id: 'nap-sur-les-repertoires-de-voyage', text: 'Cohérence NAP sur les répertoires de voyage' },
    { id: 'contenu-de-conciergerie-vieux-quebec', text: "Contenu de conciergerie locale, l'avantage du Vieux-Québec" },
    { id: 'avis-et-boucle-de-retroaction-des-citations', text: 'Avis et boucle de rétroaction des citations' },
    { id: 'plan-de-deploiement-90-jours', text: 'Un plan de déploiement de 90 jours pour les hôtels boutiques' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Un voyageur demande à ChatGPT le meilleur hôtel boutique près du Château Frontenac. La réponse cite Booking.com, Expedia et Hotels.com. L'hôtel qui détient réellement la propriété, celui qui a la conciergerie bilingue et la maçonnerie du dix-septième siècle, n'est nulle part dans la liste des citations. C'est l'état par défaut de la plupart des hôtels boutiques du Vieux-Québec dans la recherche IA, et ça se règle. Le chemin est un travail de citation directe : schéma Hotel, pages FAQ, cohérence NAP et contenu de conciergerie locale signé qui donne aux moteurs IA une source primaire à laquelle ils font plus confiance qu'à l'OTA.
      </p>

      <StatHighlight
        stats={[
          { value: '8-12 semaines', label: 'Délai typique pour une part de citations IA mesurable' },
          { value: '4-6', label: 'Répertoires de voyage qui exigent un nettoyage NAP' },
          { value: 'EN et FR', label: 'Base de contenu de conciergerie bilingue' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-les-ota-gagnent-la-citation-par-defaut">Pourquoi les OTA gagnent la citation IA par défaut</h2>
      <p>
        Booking.com, Expedia et Hotels.com gagnent la place de citation par défaut parce que leurs pages sont plus denses que celles du site moyen d'un hôtel boutique. Chaque page de propriété sur un OTA porte un schéma Hotel, des centaines d'avis, des données d'équipements structurées, une ventilation des types de chambres et des champs d'adresse vérifiés. Le site de l'hôtel indépendant a souvent une image héros, un formulaire de contact et un widget de réservation. ChatGPT, Perplexity et Google AIO lisent la page OTA comme la source la plus crédible parce que les données structurées sont plus complètes.
      </p>
      <p>
        La partie frustrante pour les propriétaires, c'est que la page OTA est une copie des données que l'hôtel a fournies au départ. Booking n'a pas inventé la liste d'équipements. L'hôtel l'a envoyée, puis Booking l'a enveloppée dans un meilleur schéma et une densité d'avis plus riche. La solution n'est pas de quitter Booking, la solution est de publier les mêmes données sur le site de l'hôtel avec un schéma plus fort et une profondeur bilingue, pour que les moteurs IA aient une source primaire à citer aux côtés ou au-dessus de l'OTA.
      </p>
      <p>
        Le Vieux-Québec ajoute une seconde couche. Les requêtes de voyage sur le quartier historique tirent de Tourisme Québec, du répertoire de l'association des marchands du Vieux-Québec et des guides patrimoniaux bilingues. Les hôtels qui apparaissent dans ces répertoires avec un NAP et un schéma cohérents sont cités comme partie de l'expérience historique, pas seulement comme une chambre où dormir. Ce positionnement vaut de vraies réservations.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Les hôtels boutiques qui décrochent des citations IA dans le Vieux-Québec partagent tous trois traits. Ils publient du contenu bilingue qui nomme des quartiers précis (Petit-Champlain, Place-Royale, Quartier du Petit-Champlain), ils portent un schéma Hotel complet avec des tableaux d'équipements, et ils gardent un NAP cohérent sur au moins six répertoires de voyage. Aucun de ces gestes n'est exotique. Ils s'accumulent.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Curieux de savoir où votre hôtel se classe dans ChatGPT et Perplexity pour les requêtes du Vieux-Québec aujourd'hui? Lancez l'audit AI Visibility gratuit en 24 heures, écarts de citations nommés par moteur." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-pile-de-schema-hotel-qui-cite-vraiment">La pile de schémas Hotel qui décroche vraiment des citations</h2>
      <p>
        Le schéma est la colonne structurée que les moteurs IA reprennent. Pour un hôtel boutique, la bonne pile est Hotel (type Schema.org), pas LocalBusiness. Le type Hotel porte les propriétés dont les moteurs IA ont besoin : starRating, priceRange, amenityFeature (un tableau de LocationFeatureSpecification), checkinTime, checkoutTime, numberOfRooms, petsAllowed, smokingAllowed, address (PostalAddress avec streetAddress complet, addressLocality, addressRegion, postalCode, addressCountry) et coordonnées geo. Chaque propriété est un crochet de citation.
      </p>
      <p>
        Ajoutez le schéma FAQPage pour les principales questions de voyageurs. Les questions deviennent des réponses AI Overview et de la recherche vocale. Ajoutez BreadcrumbList pour que la navigation se lise proprement aux robots. Ajoutez Organization avec un tableau sameAs qui relie vos pages Booking, Expedia, TripAdvisor, Tourisme Québec et Google Business Profile. Le tableau sameAs dit aux moteurs IA que toutes ces pages réfèrent à la même entité, ce qui renforce la résolution d'entités.
      </p>

      <h3>Propriétés Hotel requises pour les hôtels boutiques du Vieux-Québec</h3>
      <ul>
        <li>starRating avec bestRating fixé à la classification réelle, jamais gonflé</li>
        <li>priceRange en CAD avec une fourchette saisonnière réaliste, pas un seul signe de dollar</li>
        <li>tableau amenityFeature couvrant wifi, déjeuner, stationnement, animaux, accessibilité, climatisation, ascenseur</li>
        <li>checkinTime et checkoutTime au format ISO 8601</li>
        <li>address avec PostalAddress complet, dont addressRegion en QC et addressCountry en CA</li>
        <li>geo avec latitude et longitude, précis à l'empreinte du bâtiment</li>
        <li>tableau availableLanguage qui liste l'anglais et le français au minimum</li>
      </ul>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne bourrez pas le schéma avec des équipements que la propriété n'offre pas réellement. Les moteurs IA comparent les déclarations du schéma avec le texte des avis et les listes OTA. Une incohérence (un spa déclaré qui n'existe pas) se fait attraper et affaiblit la confiance de citation sur tout le profil. Le geste conforme est de publier seulement ce qui est réel et de rafraîchir le schéma quand les équipements changent.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pages-faq-pour-vraies-questions-de-voyageurs">Pages FAQ pour de vraies questions de voyageurs</h2>
      <p>
        Les pages FAQ sont la page à plus haut levier sur le site d'un hôtel boutique pour les citations IA. Chaque entrée FAQ est candidate à un extrait optimisé, à une citation AI Overview et à une réponse de recherche vocale. Les questions doivent être de vraies questions de voyageurs, pas des prompts marketing inventés. Tirez les questions de l'onglet Q et R de la fiche Google Business Profile, du registre d'appels de la réception et de la boîte courriel.
      </p>
      <p>
        Pour le Vieux-Québec en particulier, les questions à plus haut volume tournent autour du stationnement à l'intérieur des murs, de la distance de marche jusqu'au Château Frontenac, des heures du déjeuner, de la langue à la réception, de l'accessibilité sur les rues pavées et de la politique sur les animaux. Chacune de ces questions a une réponse directe qui tient en 40 à 80 mots. Cette longueur est le point doux pour les moteurs IA qui tirent des extraits.
      </p>

      <p>
        Marquez la section FAQ avec le schéma FAQPage. Confirmez que chaque paire Question et Réponse passe dans un outil de test de données structurées. Les hôtels bilingues doivent publier la FAQ en anglais et en français, pas comme une copie traduite mais comme des réponses rédigées séparément qui respectent la nuance du français du Québec et la graphie régionale. C'est exactement le genre de travail que couvre en détail le <InternalLink to="/industries/hotels" title="Plan AiLys pour les hôtels" description="Plan AI Visibility par industrie pour les hôtels" />.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Pourquoi ChatGPT cite-t-il Booking.com au lieu du site d'un hôtel boutique indépendant par défaut?"
        options={[
          'Booking.com paie ChatGPT pour le placement de citation',
          "Les pages Booking portent un schéma Hotel plus dense, des avis plus riches et des données d'équipements structurées",
          'ChatGPT ne cite que les sites OTA par politique',
          "Le site de l'hôtel est techniquement bloqué pour l'exploration IA",
        ]}
        correctIndex={1}
        explanation="Les OTA gagnent la place de citation par défaut parce que leurs pages ont des données structurées et une densité d'avis plus complètes que la plupart des sites d'hôtels indépendants. La solution est de publier un schéma plus fort et un contenu FAQ plus riche sur le site de l'hôtel, pas d'abandonner le canal OTA."
      />

      <SectionDivider />

      <h2 id="nap-sur-les-repertoires-de-voyage">Cohérence NAP sur les répertoires de voyage</h2>
      <p>
        La cohérence NAP est la colonne de confiance de la recherche IA locale. Pour un hôtel du Vieux-Québec, la liste des répertoires est plus longue que pour la plupart des commerces locaux parce que les surfaces de voyage se multiplient. L'ensemble minimum est Google Business Profile, Apple Business Connect, TripAdvisor, Booking, Expedia, Hotels.com, Tourisme Québec et le répertoire de l'association des marchands du Vieux-Québec. Ajoutez Wikidata pour la désambiguïsation d'entité, ce qui fait grimper les taux de citation IA avec le temps.
      </p>
      <p>
        L'incohérence NAP la plus fréquente sur les hôtels du Vieux-Québec, c'est le format de la rue. Rue est parfois écrit en toutes lettres, parfois abrégé. Les codes postaux ont parfois l'espace, parfois non. Les numéros de téléphone varient entre le format international avec préfixe +1 et le format local. Chaque variante est un signal de confiance affaibli sur lequel les moteurs IA hésitent. Le nettoyage est mécanique et ponctuel : choisir un format canonique, le pousser partout, et vérifier chaque trimestre.
      </p>

      <img
        src={meta.images.mid}
        alt="Carte de citations montrant la vérification de cohérence NAP sur Booking Expedia TripAdvisor et Tourisme Québec pour un hôtel boutique du Vieux-Québec"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        Le vocabulaire complet sur ce travail vit dans la référence du <InternalLink to="/glossary/aeo" title="Glossaire AEO" description="Termes d'Answer Engine Optimization pour les hôtels et le voyage" />. Les opérateurs qui veulent un diagnostic rapide peuvent tirer le rapport d'écarts depuis l'<InternalLink to="/audit" title="Audit AI Visibility" description="Rapport d'écarts de citations en 24 heures sur les principaux moteurs IA" /> gratuit avant de décider quoi corriger en premier.
      </p>

      <InlineCTA variant="pricing" text="Vous voulez un programme géré qui prend en charge le schéma Hotel, le nettoyage NAP sur les répertoires de voyage et le contenu de conciergerie bilingue à un palier mensuel fixe? Voyez les forfaits AiLys pour les hôtels au Québec." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="contenu-de-conciergerie-vieux-quebec">Contenu de conciergerie locale, l'avantage du Vieux-Québec</h2>
      <p>
        Le contenu de conciergerie est le différenciateur qui ramène les citations des OTA vers le site de l'hôtel. Booking ne peut pas publier un guide signé pour marcher de votre porte d'entrée jusqu'aux Plaines d'Abraham au lever du soleil. Expedia ne peut pas dire à un client quelle boulangerie de la rue Saint-Jean ouvre à six heures du matin. L'hôtel boutique, oui, et les moteurs IA récompensent cette spécificité parce qu'elle répond à des questions de voyageurs auxquelles les OTA ne peuvent structurellement pas répondre.
      </p>
      <p>
        Rédigez le contenu de conciergerie sous une signature nommée avec un schéma d'auteur. La signature porte le poids E-E-A-T : expérience, expertise, autorité, fiabilité. Un concierge qui travaille à la propriété depuis cinq ans est une source plus crédible qu'un rédacteur anonyme. Publiez en anglais et en français du Québec en parallèle, pas comme une traduction. La profondeur bilingue est lue par les moteurs IA comme un signal de qualité pour le marché local.
      </p>
      <p>
        La priorité des sujets se règle sur les questions que la réception traite vraiment. Itinéraires de marche, recommandations de restaurants par quartier, stratégies de stationnement pendant la saison des festivals, calendrier du Carnaval de Québec, conseils d'accessibilité pour les marches sur les pavés, conseils linguistiques pour les non-francophones. Chaque sujet gagne sa citation en étant concret, signé et bilingue. Deux ou trois pièces par mois pendant un trimestre suffisent pour commencer à apparaître dans les réponses IA.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>La façon la plus rapide de semer du contenu de conciergerie est d'enregistrer les appels de la réception pendant une semaine (avec consentement) et de transcrire les schémas de questions. Les dix questions les plus fréquentes deviennent vos dix premières entrées FAQ et vos trois premiers guides de conciergerie. Le travail est déjà dans le bâtiment, il faut juste le publier dans une forme que les moteurs IA peuvent citer.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="avis-et-boucle-de-retroaction-des-citations">Avis et boucle de rétroaction des citations</h2>
      <p>
        Les avis bouclent la boucle de la citation IA. ChatGPT, Perplexity et Google AIO lisent le texte des avis pour vérifier les déclarations du schéma et pour extraire des mots-clés liés aux services. Un hôtel boutique avec des avis qui mentionnent la réception bilingue, la marche sur les pavés jusqu'au Château Frontenac et le déjeuner au café maison se fait citer pour ces requêtes précises. Un hôtel dont les avis disent tous excellent séjour ne gagne rien sur la différenciation.
      </p>
      <p>
        La mécanique est la même que pour n'importe quel commerce local. Envoyez une demande d'avis dans les 24 heures suivant le départ, avec un lien direct vers la page d'avis Google Business Profile. Demandez dans la langue du client. Répondez à chaque avis dans les 72 heures, plus rapidement pour les négatifs. Le texte de réponse devient partie de la surface de citation de la page, ce qui est un bonus discret que les propriétaires assidus accumulent gratuitement.
      </p>
      <p>
        Les hôtels du Vieux-Québec doivent aussi gérer les avis TripAdvisor et Booking parce que les OTA nourrissent aussi les moteurs IA. Mêmes invitations, même discipline de réponse, même soin bilingue. La vélocité totale d'avis sur Google, TripAdvisor et Booking est ce que les moteurs IA regardent pour décider de citer l'hôtel comme source primaire pour une requête sur le Vieux-Québec.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier les écarts de citations sur votre hôtel face aux trois principaux OTA et au principal concurrent boutique? Sans pitch, livrable envoyé peu importe." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="plan-de-deploiement-90-jours">Un plan de déploiement de 90 jours pour les hôtels boutiques</h2>
      <p>
        Jour 1 à 14, vérifier le schéma et le NAP. Tirez les données structurées du site de l'hôtel, notez-les contre les exigences du schéma Hotel, et faites un audit NAP sur Booking, Expedia, TripAdvisor, Hotels.com, Google Business Profile, Apple Business Connect, Tourisme Québec et l'association des marchands du Vieux-Québec. Documentez chaque incohérence.
      </p>
      <p>
        Jour 15 à 45, livrer la mise à niveau du schéma et le nettoyage NAP. Le schéma Hotel avec l'ensemble complet de propriétés tombe en premier, puis le schéma FAQPage sur les questions tirées du registre de la réception, puis les corrections NAP poussées sur les répertoires de voyage. Entrée Wikidata créée ou mise à jour en parallèle.
      </p>
      <p>
        Jour 46 à 75, rédiger le contenu de conciergerie. Deux guides bilingues par mois sous des signatures nommées, mappés aux questions que les voyageurs posent vraiment. Itinéraires de marche, choix de restaurants, conseils d'accessibilité, calendriers de festivals. Ajouter le schéma d'auteur avec liens sameAs vers le membre du personnel nommé.
      </p>
      <p>
        Jour 76 à 90, relancer l'audit AI Visibility. Comparez la part de citations avant et après sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. La plupart des hôtels boutiques voient un mouvement de la part de citations sur au moins trois des six moteurs dans cette fenêtre. L'effet de composition court à partir du quatrième mois, quand les avis, le schéma, le NAP et le contenu se renforcent mutuellement.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Les OTA gagnent la place de citation IA par défaut parce que leurs pages portent un schéma et des avis plus denses que la plupart des sites d'hôtels indépendants.",
          "Le schéma Hotel avec tableaux d'équipements, le schéma FAQPage et le schéma Organization avec liens sameAs sont la colonne structurée.",
          "La cohérence NAP sur au moins six répertoires de voyage est le signal de confiance que les moteurs IA vérifient avant de citer.",
          "Le contenu de conciergerie bilingue sous signatures nommées est le différenciateur que les OTA ne peuvent pas égaler.",
          "La plupart des hôtels boutiques voient un mouvement mesurable de la part de citations IA en 8 à 12 semaines après avoir livré la pile.",
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
        alt="Bulletin AI Visibility pour un hôtel boutique du Vieux-Québec montrant les gains de part de citations sur ChatGPT Perplexity et Google AIO"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
