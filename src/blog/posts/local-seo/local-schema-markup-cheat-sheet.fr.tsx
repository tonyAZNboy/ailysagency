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
import { meta } from './local-schema-markup-cheat-sheet'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Aide-mémoire schema.org local, la référence 2026 pour le Québec',
  metaDescription:
    "Aide-mémoire schema.org pour les commerces locaux du Québec. LocalBusiness, Attorney, MedicalBusiness, Restaurant, AutoRepair, Plumber, Electrician et les ordres professionnels.",
  tldr:
    "Choisissez le sous-type schema le plus étroit qui correspond à votre commerce, remplissez les huit champs obligatoires, puis ajoutez un objet Person sur chaque professionnel nommé avec son numéro d'ordre du Québec dans la propriété member. Un cabinet d'avocats utilise Attorney avec member pointant vers la fiche du Tableau de l'Ordre du Barreau du Québec. Une clinique utilise MedicalBusiness avec member pointant vers chaque médecin sur le bottin de l'Ordre des médecins. Les restaurants utilisent Restaurant avec servesCuisine. Les corps de métier utilisent Plumber, Electrician ou AutoRepair. Le Québec ajoute une règle : chaque lien de crédit doit être l'URL publique profonde du registre, jamais la page d'accueil de l'ordre, sinon les moteurs IA n'arrivent pas à résoudre la preuve.",
  faqItems: [
    {
      question: "Quel type de schema un cabinet d'avocats devrait-il utiliser localement?",
      answer:
        "Un cabinet d'avocats québécois devrait utiliser Attorney comme type primaire, pas le LocalBusiness générique, et pas LegalService seul. Attorney est le sous-type Schema.org étroit qui signale un praticien licencié à Google et aux moteurs IA. Ajoutez un objet Person sur chaque avocat nommé avec la propriété member pointant vers la fiche profonde du Tableau de l'Ordre sur le site du Barreau du Québec. Ajoutez areaServed pour chaque ville couverte, knowsAbout pour les domaines de pratique, et openingHoursSpecification pour les heures d'ouverture. La combinaison se résout proprement dans les citations de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot.",
    },
    {
      question: "Faut-il vraiment LocalBusiness et un sous-type plus précis ensemble?",
      answer:
        "Non. Choisissez le sous-type le plus étroit qui correspond et arrêtez là. Les sous-types Schema.org héritent déjà de LocalBusiness, donc ajouter les deux est redondant et déclenche parfois des avertissements de l'analyseur. Une clinique dentaire utilise Dentist ou MedicalBusiness, pas Dentist plus LocalBusiness. Un restaurant utilise Restaurant. Un plombier utilise Plumber. Le sous-type étroit dit aux moteurs IA exactement quel type d'entité ils lisent. Le LocalBusiness générique en dit moins et entre en compétition avec des milliers de correspondances faibles dans le même ensemble de réponses.",
    },
    {
      question: "Comment encoder les crédits d'un ordre professionnel québécois en schema?",
      answer:
        "Utilisez la propriété member sur le LocalBusiness ou son sous-type, avec chaque membre comme objet Person portant jobTitle, identifier (le numéro d'inscription à l'ordre) et un objet memberOf qui pointe vers l'ordre professionnel québécois avec un sameAs vers la fiche profonde du registre public. Le lien profond est l'élément porteur. ChatGPT et Perplexity peuvent confirmer qu'une licence est active en lisant la page du registre, mais seulement quand l'URL pointe vers la page du praticien lui-même, pas la page d'accueil de l'ordre. Un médecin sans ce lien profond est traité comme une affirmation non vérifiée par tous les moteurs IA majeurs.",
    },
    {
      question: "Quels sont les huit champs obligatoires pour LocalBusiness?",
      answer:
        "Name, address (comme objet PostalAddress avec streetAddress, addressLocality, addressRegion, postalCode, addressCountry), telephone, url, image, priceRange, openingHoursSpecification et geo (comme objet GeoCoordinates avec latitude et longitude). Google rejette le résultat enrichi si l'un de ces champs manque sur un commerce local. Les commerces québécois devraient aussi ajouter areaServed, même s'il est techniquement optionnel, parce que l'algorithme du pack local le lit comme un signal de zone de service. Sautez currenciesAccepted sauf si vous opérez en plusieurs devises. Cela ajoute du bruit sans gain.",
    },
    {
      question: "Devrais-je ajouter aggregateRating ou attendre d'avoir plus d'avis?",
      answer:
        "Ajoutez-le seulement si vous avez vraiment des avis sur Google ou une autre plateforme que vous pouvez pointer avec un reviewCount et un ratingValue. Google rejette désormais aggregateRating qui ne correspond à aucune source d'avis publique, et Search Console signale la page. Si votre pratique est nouvelle et a moins de cinq avis, laissez aggregateRating de côté et ajoutez-le une fois que vous dépassez dix avis. L'absence temporaire ne nuit pas au classement. La note inventée ou gonflée déclenche une action manuelle qui peut prendre six semaines à corriger.",
    },
    {
      question: "Comment valider mon schema avant de le mettre en production?",
      answer:
        "Faites trois vérifications dans l'ordre. Premièrement, collez le JSON-LD dans le Test des résultats enrichis Google et confirmez zéro erreur et le bon type de résultat enrichi. Deuxièmement, passez-le dans le validateur Schema.org à validator.schema.org pour la justesse de type sur tous les objets imbriqués. Troisièmement, après le déploiement, surveillez Google Search Console pendant les deux semaines suivantes sous l'onglet Améliorations pour le type de schema livré. Si le nombre de pages monte et le nombre d'erreurs reste à zéro, le schema est en santé. Si des erreurs apparaissent, corrigez-les en sept jours avant que le poids cumulé ne ramollisse le classement.",
    },
    {
      question: "Puis-je utiliser le schema en anglais et en français sur la même page?",
      answer:
        "Oui, et vous devriez le faire pour toute page québécoise qui se livre dans les deux langues. Chaque version linguistique est une URL séparée avec son propre bloc JSON-LD. Les champs name, description, knowsAbout et tout champ texte lisible par humain devraient refléter la langue de la page. Les champs structurés comme address, telephone, geo et openingHoursSpecification restent identiques d'une langue à l'autre. Ajoutez inLanguage à l'objet LocalBusiness avec la valeur en-CA ou fr-CA pour que les moteurs IA choisissent la bonne version linguistique quand ils citent l'entité dans les réponses.",
    },
  ],
  headings: [
    { id: 'choisir-le-sous-type-le-plus-etroit', text: 'Choisir le sous-type le plus étroit qui correspond' },
    { id: 'les-huit-champs-obligatoires-de-localbusiness', text: 'Les huit champs obligatoires de LocalBusiness' },
    { id: 'attorney-et-services-juridiques', text: 'Attorney et services juridiques' },
    { id: 'medicalbusiness-dentist-physician-et-clinique', text: 'MedicalBusiness, Dentist, Physician et clinique' },
    { id: 'restaurant-foodestablishment-et-cuisine', text: 'Restaurant, FoodEstablishment et servesCuisine' },
    { id: 'autorepair-plumber-electrician-et-corps-de-metier', text: 'AutoRepair, Plumber, Electrician et corps de métier' },
    { id: 'crédits-des-ordres-quebecois-dans-la-propriete-member', text: 'Crédits des ordres québécois dans la propriété member' },
    { id: 'valider-et-surveiller-apres-le-deploiement', text: 'Valider et surveiller après le déploiement' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le balisage schema est le gain SEO local le moins cher qui bouge encore l'aiguille en 2026. Le mauvais sous-type, un champ obligatoire vide ou un lien manquant vers l'ordre professionnel garderont un commerce québécois invisible dans les citations de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, même quand tous les autres signaux sont en santé. Cet aide-mémoire livre le bon sous-type pour les verticaux québécois les plus fréquents, les huit champs obligatoires sur tout LocalBusiness, et la règle propre au Québec pour encoder les crédits des ordres professionnels afin que les moteurs IA puissent résoudre la preuve. Pas de statistiques inventées, pas de théorie, pas de balisage en culte. De vrais sous-types, de vrais champs, de vrais liens vers les registres.
      </p>

      <StatHighlight
        stats={[
          { value: '8 champs', label: 'Obligatoires sur chaque bloc JSON-LD LocalBusiness' },
          { value: '20+ sous-types', label: 'Sous-types LocalBusiness étroits couvrant les verticaux du Québec' },
          { value: 'Lien profond', label: 'Obligatoire sur chaque crédit d\'ordre québécois' },
        ]}
      />

      <SectionDivider />

      <h2 id="choisir-le-sous-type-le-plus-etroit">Choisir le sous-type le plus étroit qui correspond</h2>
      <p>
        Chaque commerce local québécois devrait encoder le sous-type Schema.org le plus étroit qui décrit encore l'opération. Le sous-type étroit dit aux moteurs IA quel type d'entité ils lisent. Le LocalBusiness générique en dit moins et force le moteur à deviner depuis le reste de la page. Deviner produit des citations plus molles et des signaux de pack local plus faibles.
      </p>
      <p>
        L'arrimage est simple une fois le catalogue déployé. Un cabinet d'avocats est Attorney. Un avocat solo est Attorney avec une sous-entité Person. Une clinique dentaire est Dentist (un sous-type de MedicalBusiness). Un médecin de famille est Physician. Un restaurant est Restaurant, avec le sous-sous-type optionnel FastFoodRestaurant ou BarOrPub si cela colle. Un plombier est Plumber. Un électricien est Electrician. Un garage est AutoRepair. Une agence immobilière est RealEstateAgent. Un salon de coiffure est HairSalon. Un spa est DaySpa. Un gym est ExerciseGym. Aucun n'hérite des autres. Chacun est un frère au même niveau Schema.org, et chacun porte un gain de classement différent dans le pack local et les réponses des moteurs IA.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>L'arbre complet des sous-types LocalBusiness vit à schema.org/LocalBusiness. Mettez-le en signet. Le catalogue est mis à jour deux ou trois fois par année à mesure que Schema.org ajoute de nouveaux sous-types pour les catégories émergentes. Les nouveaux sous-types entrés au catalogue en 2025 et 2026 incluent Plumber séparé formellement de HomeAndConstructionBusiness, et une poignée de nouveaux sous-types Restaurant pour des cuisines de niche.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Pas certain quel sous-type colle à votre pratique? Lancez l'audit AiLys gratuit en 24 heures. La vérification du schema fait partie du livrable, avec la recommandation du bon sous-type par page." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="les-huit-champs-obligatoires-de-localbusiness">Les huit champs obligatoires de LocalBusiness</h2>
      <p>
        Google rejette le résultat enrichi LocalBusiness si l'un de ces huit champs est manquant ou mal formé. Les champs s'appliquent à chaque sous-type parce que chaque sous-type hérite de LocalBusiness. Livrez-les sur chaque page qui porte le balisage, incluant la page d'accueil, la page À propos et toute page de détail de service qui représente le même emplacement physique.
      </p>

      <h3>Les huit champs</h3>
      <ol>
        <li>name, le nom officiel du commerce tel qu'enregistré. Pas d'abréviations.</li>
        <li>address comme objet PostalAddress avec streetAddress, addressLocality, addressRegion, postalCode et addressCountry. Pour le Québec, addressRegion est QC et addressCountry est CA.</li>
        <li>telephone en format international avec l'indicatif du pays. Le signe plus est obligatoire, et le format se lit plus 1 514 555 0100 avec les tirets optionnels mais cohérents d'une page à l'autre.</li>
        <li>url, l'URL canonique de la page d'accueil. https avec la barre oblique finale qui correspond au sitemap.</li>
        <li>image, une URL absolue vers une photo de 1200 par 630 de la devanture, de l'équipe ou du service. Les images logo seul sont pénalisées en 2026 parce que Google veut maintenant des images du monde réel.</li>
        <li>priceRange comme chaîne de signes de dollar de un à quatre, ou une plage littérale comme 25 à 75. Un priceRange vide déclenche un avertissement.</li>
        <li>openingHoursSpecification comme tableau d'objets OpeningHoursSpecification, un par bloc de jour de semaine. Sautez si les heures varient trop, mais la plupart des commerces locaux le livrent.</li>
        <li>geo comme objet GeoCoordinates avec latitude et longitude. Utilisez les coordonnées au toit de la fiche GBP, pas un centre-ville générique.</li>
      </ol>

      <p>
        Deux champs optionnels frappent au-dessus de leur poids au Québec. areaServed encodé comme tableau d'objets City ou AdministrativeArea aide le pack local sur les requêtes de zone de service. inLanguage avec en-CA ou fr-CA dit aux moteurs IA quelle version linguistique de la page ils lisent et empêche les citations croisées accidentelles dans les ensembles de réponses.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le champ priceRange est le champ obligatoire le plus souvent sauté sur les pages québécoises. Les opérateurs le laissent vide parce que le prix varie par service. Ne le faites pas. Livrez une plage représentative ou une bande de signes de dollar. Un priceRange vide disqualifie le résultat enrichi et tue le gain visuel dans la SERP. Une meilleure estimation vaut mieux qu'un blanc.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="attorney-et-services-juridiques">Attorney et services juridiques</h2>
      <p>
        Un cabinet d'avocats québécois utilise Attorney comme type primaire. Attorney est un sous-type Schema.org qui signale explicitement un praticien légal licencié. Le LegalService générique est trop large et est destiné aux services parajuridiques et offices notariaux, pas aux avocats licenciés. Utilisez Attorney quand les professionnels nommés sont membres du Barreau du Québec ou de la Chambre des notaires du Québec.
      </p>
      <p>
        Ajoutez un objet Person sur chaque avocat nommé du cabinet. Chaque objet Person devrait porter name, jobTitle (Avocat ou Notaire), identifier (le numéro d'inscription au Barreau) et un objet memberOf pointant vers le Barreau du Québec avec une propriété sameAs liant à la fiche publique profonde du Tableau de l'Ordre. Ajoutez knowsAbout pour lister les domaines de pratique (droit familial, droit immobilier, droit criminel, immigration). La combinaison se résout proprement dans tous les moteurs IA majeurs et c'est ce qui donne à un petit cabinet québécois la parité de citations avec les chaînes nationales.
      </p>

      <h3>Exemple de structure pratique</h3>
      <ul>
        <li>@type : Attorney pour le cabinet</li>
        <li>name : le nom officiel complet du cabinet</li>
        <li>member : tableau d'objets Person, un par avocat en exercice</li>
        <li>chaque membre a identifier (numéro de Barreau), memberOf (l'ordre avec l'URL profonde du registre dans sameAs) et knowsAbout (domaines de pratique)</li>
        <li>areaServed : objets City pour chaque ville où le cabinet représente des clients</li>
        <li>knowsLanguage : un tableau de chaînes en-CA et fr-CA, puisque la capacité bilingue est un signal de classement dans la recherche juridique au Québec</li>
      </ul>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel est le bon sous-type primaire pour un cabinet d'avocats québécois avec trois avocats nommés?"
        options={[
          'LocalBusiness avec une description qui mentionne le droit',
          'LegalService pour le cabinet et Person pour chaque avocat',
          "Attorney pour le cabinet avec un tableau member d'objets Person pointant vers les fiches profondes du Tableau de l'Ordre du Barreau",
          'ProfessionalService avec knowsAbout listant les domaines de pratique',
        ]}
        correctIndex={2}
        explanation="Attorney est le sous-type Schema.org étroit pour les avocats licenciés. Ajouter des objets Person dans le tableau member avec des liens profonds vers le registre public du Barreau du Québec donne aux moteurs IA un arbre d'entités propre qu'ils peuvent résoudre et citer. LegalService est réservé aux parajuristes et offices notariaux au sens large. ProfessionalService et LocalBusiness sont trop génériques pour battre le sous-type Attorney étroit dans les SERP et réponses IA de 2026."
      />

      <h2 id="medicalbusiness-dentist-physician-et-clinique">MedicalBusiness, Dentist, Physician et clinique</h2>
      <p>
        Le réseau de la santé au Québec s'arrime à MedicalBusiness et ses sous-types. Une clinique dentaire utilise Dentist. Une pratique générale utilise Physician pour le médecin nommé et MedicalClinic pour la pratique si plusieurs spécialités opèrent depuis le même bâtiment. Une clinique de physiothérapie utilise MedicalBusiness avec knowsAbout listant la modalité, puisque Schema.org n'a pas encore de sous-type Physiotherapy plus étroit. Idem pour les chiropraticiens, qui utilisent MedicalBusiness avec les valeurs knowsAbout appropriées.
      </p>
      <p>
        La couche de crédit est obligatoire en santé. Chaque médecin nommé a besoin d'une sous-entité Person avec member ou memberOf pointant vers l'ordre québécois qui le licencie. L'Ordre des dentistes du Québec pour les dentistes, l'Ordre des médecins du Québec pour les médecins, l'Ordre professionnel de la physiothérapie du Québec pour les physiothérapeutes, l'Ordre des chiropraticiens du Québec pour les chiropraticiens. Le lien profond du registre vers la page du praticien est ce qui rend le crédit lisible par machine.
      </p>

      <img
        src={meta.images.mid}
        alt="Exemple JSON-LD pour une clinique dentaire québécoise avec entités Person Dentiste pointant vers le registre de l'Ordre des dentistes"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        Pour une lecture plus profonde sur la résolution d'une entité de professionnel solo par les moteurs IA via le schema Person et Wikidata, voyez <InternalLink to="/glossary/e-e-a-t" title="Fiche glossaire E-E-A-T" description="Les quatre ancres E-E-A-T pour les professionnels solos et les cliniques" />. Pour l'impact de classement de ces signaux dans les ordres professionnels du Québec, voyez <InternalLink to="/blog/eeat-signals-for-solo-professionals" title="Signaux E-E-A-T pour professionnels solos" description="La liste de preuves 2026 pour avocats, dentistes et comptables solos" />.
      </p>

      <SectionDivider />

      <h2 id="restaurant-foodestablishment-et-cuisine">Restaurant, FoodEstablishment et servesCuisine</h2>
      <p>
        Les restaurants au Québec utilisent Restaurant comme sous-type primaire. Des sous-sous-types existent pour des arrimages plus étroits. FastFoodRestaurant pour le service au comptoir. CafeOrCoffeeShop pour les cafés. BarOrPub pour les bars. Bakery pour les boulangeries et pâtisseries. Le sous-type étroit affecte quels résultats enrichis Google s'affichent. Un café étiqueté Restaurant manque les filtres propres aux cafés dans Google Maps.
      </p>
      <p>
        Deux champs propres à Restaurant bougent l'aiguille. servesCuisine est un tableau de chaînes de cuisines (Italienne, Libanaise, Québec, Fusion asiatique). Il affecte directement quelles requêtes plats près de moi font surface au restaurant. menu est une URL pointant vers la page du menu ou un PDF. Sautez menuItem et les objets Menu. Ils sont lourds à entretenir et Google ne les pondère pas plus que l'URL du menu en 2026.
      </p>

      <h3>Spécificités des restaurants québécois</h3>
      <ul>
        <li>servesCuisine devrait inclure « Quebec » comme chaîne littérale pour les restaurants servant la cuisine régionale. Google AIO reconnaît cette chaîne et fait surface au restaurant sur les requêtes de cuisine québécoise.</li>
        <li>acceptsReservations est un booléen. Mettez-le à true si le restaurant prend des réservations sur n'importe quelle plateforme, même pas spécifiquement OpenTable.</li>
        <li>hasMenu est la propriété moderne préférée à menu. Les deux fonctionnent, mais Schema.org déprécie menu depuis 2024.</li>
      </ul>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Si un restaurant a un menu en français québécois et un menu en anglais sur des URL séparées, livrez deux blocs JSON-LD (un par version linguistique de la page) avec hasMenu pointant vers l'URL du menu de la langue correspondante. Les moteurs IA qui citent le restaurant dans une réponse française veulent l'URL du menu en français, pas l'anglais. La livraison croisée est ce qui produit des citations bilingues propres.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="autorepair-plumber-electrician-et-corps-de-metier">AutoRepair, Plumber, Electrician et corps de métier</h2>
      <p>
        Les corps de métier au Québec sont bien couverts par des sous-types Schema.org étroits. AutoRepair pour les garages. Plumber pour les services de plomberie. Electrician pour les entrepreneurs en électricité. HVACBusiness pour la CVC. RoofingContractor pour les couvreurs. HousePainter pour les peintres. GeneralContractor pour les généralistes en construction. LocksmithService pour les serruriers. MovingCompany pour les déménageurs.
      </p>
      <p>
        Deux champs comptent le plus pour les corps de métier. areaServed est un tableau d'objets GeoCircle ou City décrivant le rayon de service. Google le lit comme la déclaration formelle de zone de service et l'utilise pour classer le métier sur les requêtes de zone de service même quand le métier n'a pas de toit dans la ville recherchée. Le second est paymentAccepted, une liste de chaînes des modes de paiement acceptés (Comptant, Carte de crédit, Virement Interac). Les consommateurs québécois cherchent spécifiquement Interac et le champ paymentAccepted fait surface au métier dans ces ensembles de réponses.
      </p>

      <p>
        Pour le livre de jeu entrepreneur sur la façon dont les déclarations de zone de service interagissent avec GBP, voyez <InternalLink to="/industries" title="Livres de jeu industriels AiLys" description="Livres de jeu SEO local par industrie pour le Québec" />. Pour une lecture plus profonde sur la façon dont le livrable d'audit identifie les champs schema manquants, voyez <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Schema, NAP, GBP et lacunes de citations cartographiés en un rapport" />.
      </p>

      <InlineCTA variant="pricing" text="Voyez les forfaits AiLys qui incluent la construction du schema et la cartographie des crédits d'ordres professionnels du Québec, à partir de Core à 799 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="crédits-des-ordres-quebecois-dans-la-propriete-member">Crédits des ordres québécois dans la propriété member</h2>
      <p>
        La règle propre au Québec qui casse la plupart des implémentations schema venues d'ailleurs : chaque lien de crédit doit être l'URL publique profonde du registre vers le praticien, jamais la page d'accueil de l'ordre. Les moteurs IA confirment qu'une licence est active en lisant la page du registre. L'URL de la page d'accueil pointe vers une page marketing qui ne contient pas la fiche du praticien. Le moteur ne peut pas confirmer le crédit et traite la déclaration comme non vérifiée.
      </p>
      <p>
        Le bon encodage est une propriété member sur le LocalBusiness ou son sous-type, avec chaque membre comme objet Person. Le Person porte jobTitle (le rôle pratiqué), identifier (le numéro d'inscription à l'ordre) et un objet memberOf qui pointe vers l'ordre professionnel québécois avec une propriété sameAs portant l'URL profonde du registre.
      </p>

      <h3>Où trouver l'URL profonde du registre par ordre</h3>
      <ul>
        <li>Barreau du Québec, Tableau de l'Ordre, fiches individuelles d'avocats avec le numéro de Barreau dans l'URL</li>
        <li>Chambre des notaires du Québec, registre public, fiches individuelles de notaires</li>
        <li>Ordre des médecins du Québec, Bottin des médecins, fiches individuelles de médecins</li>
        <li>Ordre des dentistes du Québec, répertoire public, fiches individuelles de dentistes</li>
        <li>Ordre des pharmaciens du Québec, répertoire des pharmaciens, fiches individuelles</li>
        <li>CPA Québec, répertoire des membres, fiches individuelles de comptables</li>
        <li>OPPQ, répertoire des physiothérapeutes, fiches individuelles</li>
        <li>Ordre des chiropraticiens du Québec, registre public, fiches individuelles</li>
      </ul>

      <p>
        L'URL profonde de chacun de ces ordres change de format toutes les quelques années à mesure que les ordres modernisent leurs registres publics. Vérifiez le motif d'URL une fois par année et mettez à jour le schema s'il bouge. Un lien sameAs cassé sur un objet Person se lit pire qu'aucun lien, parce que les moteurs IA l'explorent, échouent à le résoudre et étiquettent l'entité comme non vérifiée pour les mois suivants.
      </p>

      <CalloutBox type="danger" translatedLabel="Critique">
        <p>N'inventez pas de numéros d'inscription et ne devinez pas le motif d'URL profond. Les moteurs IA vérifient les deux. Un objet Person avec un identifier inventé ou un sameAs cassé dégrade toute l'entité LocalBusiness en part de citation pour un à deux trimestres avant que le moteur ne réévalue. Le coût en temps d'une construction schema soignée est en jours. Le coût en temps de récupérer d'une mauvaise livraison de crédit est en mois.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="valider-et-surveiller-apres-le-deploiement">Valider et surveiller après le déploiement</h2>
      <p>
        Trois vérifications confirment que le schema est en santé après le déploiement. Le Test des résultats enrichis Google attrape la plupart des erreurs d'analyseur et confirme quels types de résultats enrichis Google détecte. Le validateur Schema.org attrape les enjeux de justesse de type que Google ignore mais que les autres moteurs (surtout Bing) pénalisent. Google Search Console sous l'onglet Améliorations surveille la longue traîne et fait remonter toute erreur de champ qui s'installe avec le temps.
      </p>
      <p>
        Un schema livré sans erreur devrait rester sans erreur. Si des erreurs apparaissent des semaines plus tard, cela veut habituellement dire qu'une mise à jour CMS a changé comment un champ s'affiche, qu'une routine de traduction automatisée a corrompu un champ texte avec des guillemets typographiques, ou qu'un déploiement a retiré le JSON-LD de la page entièrement. Corrigez en sept jours. Les erreurs cumulées au-delà de deux semaines commencent à ramollir la couverture de résultats enrichis et la part de citations dans les moteurs IA.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de votre schema actuel et de votre couche de crédits? Sans pitch, doc d'audit et matrice de sous-types recommandés livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Choisissez le sous-type Schema.org le plus étroit qui colle. Attorney pour les cabinets d'avocats, Dentist pour les cliniques dentaires, Restaurant pour les restos, Plumber pour les plombiers.",
          "Livrez les huit champs obligatoires sur chaque bloc LocalBusiness. Un priceRange vide ou un geo manquant disqualifie le résultat enrichi.",
          "Ajoutez un schema Person sur chaque professionnel nommé avec le crédit de l'ordre dans la propriété member.",
          "Les crédits québécois exigent l'URL publique profonde du registre. La page d'accueil de l'ordre ne suffit pas pour la résolution dans les moteurs IA.",
          "Ajoutez inLanguage et livrez un bloc JSON-LD séparé par URL linguistique pour des citations bilingues EN et FR-CA propres.",
          "Validez avec le Test des résultats enrichis, le validateur Schema.org et Search Console. Corrigez toute nouvelle erreur en sept jours.",
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
        alt="Carte de référence rapide arrimant les verticaux québécois aux sous-types LocalBusiness Schema.org et aux champs obligatoires"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
