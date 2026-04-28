/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'
import { meta } from './gbp-attributes-ultimate-guide'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Attributs GBP, le guide complet pour les commerçants du Québec',
  metaDescription:
    "Les attributs Google Business Profile expliqués pour les commerçants du Québec. Liste complète des bascules booléennes, gestion bilingue, drapeaux d'accessibilité, options de paiement et cadence d'audit qui garde le panneau honnête.",
  tldr: "Les attributs GBP sont des bascules booléennes (accessible en fauteuil roulant, wifi gratuit, accepte les cartes, propriété de femmes, toilettes non genrées, accepte les chiens et plusieurs autres) qui apparaissent dans le panneau de connaissance Google et qui nourrissent les moteurs IA via le graphe d'entités de Google. Les commerçants du Québec doivent gérer les attributs en français comme en anglais parce que le panneau client se rend dans la langue du chercheur. La bonne cadence : un audit trimestriel, une vérification mensuelle après les changements de politique et une mise à jour le jour même quand un changement physique survient sur place. AiLys livre l'audit des attributs dans le livrable gratuit de 24 heures et met à jour les attributs par l'API GBP à partir du forfait Core.",
  faqItems: [
    {
      question: 'Comment ajouter des attributs bilingues à mon GBP au Québec?',
      answer:
        "Les attributs eux-mêmes sont des booléens neutres en langue (la bascule pour le wifi gratuit est la même pour tout le monde). Ce qui change selon la langue, c'est l'étiquette rendue dans le panneau client, que Google gère automatiquement selon la préférence linguistique du chercheur. Les commerçants du Québec ne basculent pas les attributs en deux langues, ils basculent une fois et font confiance à Google pour rendre les étiquettes françaises aux chercheurs FR-CA et anglaises aux chercheurs EN-CA. Le travail qui exige un soin bilingue, c'est la description, les services et tout attribut personnalisé que le propriétaire ajoute, puisque ces champs sont du texte libre et doivent être rédigés dans les deux langues.",
    },
    {
      question: 'Quels attributs GBP comptent le plus pour l\'AI Visibility?',
      answer:
        "Trois groupes pèsent le plus dans la récupération par les moteurs IA. L'accessibilité (entrée accessible en fauteuil roulant, stationnement accessible, toilettes accessibles) parce que Perplexity et Google AIO les valorisent fortement pour les requêtes à intention inclusive. Le paiement et les commodités (accepte les cartes de crédit, wifi gratuit, accepte les réservations) parce qu'ils répondent directement aux questions pré-visite et que les moteurs IA les citent. Les attributs d'identité (propriété de femmes, accueillant pour les LGBTQ, toilettes non genrées, propriété autochtone) parce qu'ils filtrent les requêtes de découverte que les chercheurs tapent explicitement. D'autres attributs comptent, mais ces trois groupes produisent la hausse visible d'AI Visibility.",
    },
    {
      question: 'À quelle fréquence faut-il auditer les attributs GBP?',
      answer:
        "Faites un audit complet des attributs chaque trimestre, une vérification rapide chaque mois et une mise à jour immédiate dès qu'un changement physique survient sur place (nouvelle rampe installée, terminal de paiement mis à jour pour le sans contact, changement d'horaires qui crée une nouvelle réalité « ouvert le dimanche »). Google ajoute régulièrement des attributs aux catégories, donc un audit trimestriel attrape les nouvelles bascules avant que vos concurrents ne les activent. Le forfait Core AiLys livre l'audit trimestriel des attributs comme livrable et fait remonter les bascules manquantes dans le rapport AI Visibility.",
    },
    {
      question: 'Un mauvais attribut peut-il nuire au classement GBP?',
      answer:
        "Oui, de deux façons. D'abord, un attribut qui ne correspond pas à la réalité physique (déclarer accessible en fauteuil roulant alors qu'il y a des marches à l'entrée) peut déclencher une révision de politique Google si un client signale l'écart, et la fiche peut être suspendue en attente de vérification. Ensuite, des attributs d'accessibilité ou de paiement manquants que les concurrents ont peuvent nuire au classement dans le pack local sur les recherches filtrées. Les chercheurs qui filtrent par accessibilité voient une liste de candidats plus petite, et une bascule manquante retire la fiche de cet ensemble filtré, même si la place est en fait accessible.",
    },
    {
      question: 'Les attributs GBP relèvent-ils des exigences de transparence Loi 25?',
      answer:
        "Les attributs GBP eux-mêmes ne sont pas une surface de divulgation Loi 25, puisque les données vivent du côté de Google et que la relation client est entre le chercheur et Google. Cependant, les attributs qui impliquent une collecte de données (prise de rendez-vous en ligne, commande, cartes-cadeaux) déclenchent des obligations Loi 25 en aval sur le site lié (politique de confidentialité, bandeau de consentement, divulgation de la rétention des données). Les opérateurs québécois devraient traiter tout attribut qui pointe vers un flux de réservation, de commande ou de contact comme un déclencheur pour revoir la conformité Loi 25 du site lié.",
    },
  ],
  headings: [
    { id: 'ce-que-sont-vraiment-les-attributs-gbp', text: 'Ce que sont vraiment les attributs GBP' },
    { id: 'les-categories-d-attributs-qui-comptent', text: "Les catégories d'attributs qui comptent" },
    { id: 'attributs-d-accessibilite-la-liste-honnete', text: "Attributs d'accessibilité, la liste honnête" },
    { id: 'bascules-de-paiement-et-de-commodites', text: 'Bascules de paiement et de commodités' },
    { id: 'attributs-d-identite-et-pourquoi-ils-aident', text: "Attributs d'identité et pourquoi ils aident" },
    { id: 'rendu-bilingue-pour-les-commercants-du-quebec', text: 'Rendu bilingue pour les commerçants du Québec' },
    { id: 'la-cadence-d-audit-trimestriel', text: "La cadence d'audit trimestriel" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les attributs GBP sont les bascules booléennes qui décrivent ce que votre Google Business Profile offre vraiment. Entrée accessible en fauteuil roulant, wifi gratuit, accepte les cartes de crédit, propriété de femmes, toilettes non genrées, accepte les chiens, accepte les réservations, prise de rendez-vous en ligne, cartes-cadeaux et plusieurs autres. Chaque bascule est un drapeau oui ou non qui apparaît dans le panneau client, filtre les résultats du pack local et nourrit les moteurs IA via le graphe d'entités Google. Pour les commerçants québécois, les attributs sont l'un des champs GBP à plus fort levier parce qu'ils se mettent à jour rapidement, se rendent en bilingue par défaut et répondent directement aux questions pré-visite que les chercheurs posent quotidiennement aux moteurs IA.
      </p>

      <StatHighlight
        stats={[
          { value: '60+ bascules', label: "Nombre d'attributs disponibles dans les catégories GBP courantes" },
          { value: '15 minutes', label: "Temps pour un audit complet des attributs sur une seule fiche" },
          { value: 'Trimestriel', label: "Cadence d'audit qui attrape les nouveaux attributs ajoutés par Google" },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-que-sont-vraiment-les-attributs-gbp">Ce que sont vraiment les attributs GBP</h2>
      <p>
        Les attributs GBP sont des champs booléens structurés que Google fait remonter dans le panneau de connaissance et utilise pour filtrer les résultats du pack local. Ils diffèrent de la description (texte libre), des catégories (taxonomie) et des services (liste par catégorie) parce que la valeur est un oui ou un non strict, sans nuance. La bascule est activée ou désactivée. Le rendu se fait automatiquement dans la langue du chercheur, donc une seule bascule couvre EN, FR, ES, ZH et toutes les autres langues prises en charge par Google.
      </p>
      <p>
        La liste d'attributs varie selon la catégorie. Un restaurant a une liste différente d'une clinique dentaire, qui a une liste différente d'un entrepreneur. Quand vous changez la catégorie principale, le panneau d'attributs s'actualise avec les nouvelles options. Certains attributs sont universels (accepte les cartes de crédit, entrée accessible en fauteuil roulant), d'autres sont propres à la catégorie (terrasse extérieure n'apparaît que pour les restaurants, accepte les nouveaux patients n'apparaît que pour la santé).
      </p>
      <p>
        Les chercheurs voient les attributs à trois endroits : le panneau de connaissance à droite des résultats, la tuile du pack local quand un filtre s'applique, et la page GBP sur Google Maps. Les moteurs IA (surtout Perplexity, Google AIO et Bing Copilot) lisent les attributs quand ils répondent aux questions pré-visite comme « acceptent-ils les réservations » ou « y a-t-il du stationnement gratuit ».
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le panneau d'attributs dans le tableau de bord GBP regroupe les bascules par catégorie (Accessibilité, Commodités, Clientèle, Points forts, Offres, Animaux, Planification, Options de service, À propos du commerce). Les étiquettes et le regroupement changent occasionnellement à mesure que Google fait évoluer le produit. Les valeurs booléennes elles-mêmes sont stables. Voir l'<InternalLink to="/glossary/gbp" title="Entrée de glossaire Google Business Profile" description="Définitions et champs principaux" /> pour la taxonomie complète.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit par attribut de vos bascules GBP actuelles, avec les drapeaux manquants comparés à vos trois principaux concurrents? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="les-categories-d-attributs-qui-comptent">Les catégories d'attributs qui comptent</h2>
      <p>
        Trois groupes d'attributs produisent la hausse visible en AI Visibility et en pack local pour les commerçants québécois :
      </p>
      <ol>
        <li>Accessibilité. Entrée accessible en fauteuil roulant, stationnement accessible, toilettes accessibles, places assises accessibles. Critique pour les requêtes à intention inclusive et facteur de classement strict sur les recherches filtrées.</li>
        <li>Paiement et commodités. Accepte les cartes de crédit, accepte les cartes de débit, wifi gratuit, stationnement gratuit, stationnement payant, stationnement sur place, accepte les réservations, plats à emporter, livraison. Répondent directement aux questions pré-visite et les moteurs IA les citent.</li>
        <li>Identité. Propriété de femmes, accueillant pour les LGBTQ, espace sécuritaire pour les personnes transgenres, toilettes non genrées, propriété autochtone, propriété d'ancien combattant. Filtrent les requêtes de découverte que les chercheurs tapent explicitement et que Google valorise fortement pour l'inclusion dans le pack local.</li>
      </ol>

      <p>
        Les autres groupes (Clientèle, Points forts, Offres, À propos du commerce, Planification) comptent à la marge et méritent d'être basculés correctement, mais la hausse par bascule est plus petite que celle des trois groupes prioritaires ci-dessus. Consacrez la première passe d'audit à l'Accessibilité, au Paiement et à l'Identité. Consacrez la deuxième passe au reste.
      </p>

      <h2 id="attributs-d-accessibilite-la-liste-honnete">Attributs d'accessibilité, la liste honnête</h2>
      <p>
        Les attributs d'accessibilité portent le poids le plus fort par bascule dans le couloir AI Visibility. Perplexity, Google AIO et Bing Copilot les valorisent fortement parce qu'ils répondent à des requêtes comme « dentiste accessible en fauteuil roulant près de moi » ou « clinique avec stationnement accessible à Laval ». Les drapeaux nourrissent aussi les filtres du pack local, où une bascule manquante retire la fiche de l'ensemble filtré entièrement.
      </p>
      <p>
        La liste honnête pour une fiche locale du Québec :
      </p>
      <ul>
        <li>Entrée accessible en fauteuil roulant : activée seulement si la porte est assez large et qu'il n'y a pas de marches ou qu'une rampe permanente les couvre</li>
        <li>Stationnement accessible en fauteuil roulant : activé seulement s'il y a une place réservée ou un stationnement de rue accessible adjacent</li>
        <li>Toilettes accessibles en fauteuil roulant : activées seulement si la salle de toilette respecte le code d'accessibilité local (largeur de porte, barres d'appui, rayon de virage)</li>
        <li>Places assises accessibles en fauteuil roulant : activées pour les restaurants et cliniques avec comptoirs ou tables à hauteur accessible</li>
        <li>Ascenseur accessible en fauteuil roulant : activé seulement si des ascenseurs sont présents et atteignent les étages pertinents du commerce</li>
      </ul>
      <p>
        L'honnêteté compte. Activer accessible en fauteuil roulant alors qu'il y a des marches à l'entrée crée un risque de violation de politique Google et un échec de confiance réel quand un usager d'accessibilité se présente et ne peut entrer. Le bon geste quand l'accessibilité est partielle (rampe sur le côté, toilettes au deuxième étage seulement) est de laisser la bascule désactivée et d'utiliser le champ description pour expliquer l'accessibilité partielle honnêtement.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>N'activez pas un attribut d'accessibilité sans vérifier la réalité physique. La politique Google traite la fausse représentation d'accessibilité comme une violation qui peut suspendre la fiche, et un seul signalement d'usager suffit à déclencher une révision. Le coût d'une bascule incorrecte est bien plus élevé que la hausse de la bascule.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="bascules-de-paiement-et-de-commodites">Bascules de paiement et de commodités</h2>
      <p>
        Les bascules de paiement et de commodités répondent aux questions pré-visite que les chercheurs posent le plus souvent aux moteurs IA. La liste à vérifier sur chaque fiche du Québec :
      </p>
      <ul>
        <li>Accepte les cartes de crédit : activée si vous acceptez Visa, Mastercard ou Amex</li>
        <li>Accepte les cartes de débit : activée si vous acceptez Interac en magasin</li>
        <li>Accepte les paiements mobiles NFC : activée si vous acceptez le sans contact (Apple Pay, Google Pay)</li>
        <li>Wifi gratuit : activée si le wifi client est ouvert ou en libre-service avec un mot de passe affiché</li>
        <li>Stationnement gratuit ou stationnement de rue gratuit : activée si le stationnement est gratuit pour la clientèle</li>
        <li>Stationnement payant : activée si le stationnement est payant (clarifie l'attente pour les visiteurs)</li>
        <li>Accepte les réservations : activée si un système de réservation est offert (lien ou par téléphone)</li>
        <li>Plats à emporter, livraison, sur place : activées selon l'offre réelle pour les restaurants</li>
        <li>Rendez-vous en ligne : activée pour la santé et les services avec un lien de réservation</li>
      </ul>
      <p>
        Chaque bascule est une petite hausse en soi. Ensemble, elles répondent à la majorité des questions pré-visite que les moteurs IA font remonter, et elles raccourcissent le chemin de la requête à la visite en éliminant le clic vers une page tierce juste pour confirmer « est-ce qu'ils prennent les cartes ».
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel groupe d'attributs GBP porte le plus de poids par bascule pour l'AI Visibility?"
        options={[
          'Attributs Clientèle (bon pour les groupes, bon pour les enfants, bon pour les touristes)',
          "Attributs d'accessibilité (entrée, stationnement, toilettes, places assises accessibles en fauteuil roulant)",
          'Attributs Points forts (musique en direct, jeux, foyer)',
          "Attributs À propos du commerce (s'identifie comme propriété de femmes, accueillant pour les LGBTQ)",
        ]}
        correctIndex={1}
        explanation="Les attributs d'accessibilité portent le plus de poids par bascule. Perplexity, Google AIO et Bing Copilot les valorisent fortement pour les requêtes à intention inclusive, et ils nourrissent directement les filtres du pack local. Les attributs d'identité (le groupe À propos du commerce) sont la deuxième priorité. Clientèle et Points forts comptent à la marge et méritent d'être basculés correctement, mais la hausse par bascule est plus petite."
      />

      <SectionDivider />

      <h2 id="attributs-d-identite-et-pourquoi-ils-aident">Attributs d'identité et pourquoi ils aident</h2>
      <p>
        Les attributs d'identité (le groupe À propos du commerce dans le tableau de bord GBP) sont des bascules qui décrivent l'identité de propriété ou l'inclusivité du service. Propriété de femmes, accueillant pour les LGBTQ, espace sécuritaire pour les personnes transgenres, propriété autochtone, propriété d'ancien combattant, toilettes non genrées. Ils diffèrent des autres groupes parce qu'ils sont des filtres pilotés par les chercheurs qui changent les schémas de découverte directement. Un chercheur qui filtre par restaurants à propriété de femmes à Montréal voit un ensemble de candidats plus petit, et les fiches sans la bascule sont retirées de cet ensemble entièrement, indépendamment de la réalité physique.
      </p>
      <p>
        Pour les commerçants québécois, les attributs d'identité sont l'un des rares champs GBP qui changent directement la liste d'inclusion du pack local. La bascule est activée ou désactivée, et l'inclusion est binaire sur les recherches filtrées. La bonne approche est d'activer les attributs d'identité qui s'appliquent réellement au commerce et de laisser le reste désactivé. La mauvaise approche est de basculer des attributs d'identité de façon spéculative en espérant une inclusion plus large, puisque la fausse représentation peut déclencher une révision de politique Google.
      </p>

      <InlineCTA variant="pricing" text="Les audits d'attributs GBP sont livrés sur chaque forfait AiLys payant, à partir du forfait Core (799 dollars CAD par mois). Voyez les quatre forfaits AiLys côte à côte." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="rendu-bilingue-pour-les-commercants-du-quebec">Rendu bilingue pour les commerçants du Québec</h2>
      <p>
        Les commerçants québécois s'inquiètent du rendu bilingue des attributs plus qu'ils ne le devraient. La bonne nouvelle est que les bascules d'attributs elles-mêmes sont des booléens neutres en langue. La bascule pour le wifi gratuit est une seule bascule, et Google la rend Wifi gratuit pour les chercheurs FR-CA et Free wifi pour les chercheurs EN-CA automatiquement. Il n'y a pas de flux à deux passes pour les attributs booléens.
      </p>
      <p>
        Les champs qui exigent un soin bilingue sont la description (texte libre), la liste de services (étiquettes et descriptions par catégorie) et tout attribut personnalisé qui prend une valeur en texte libre (par exemple « langues parlées » si vous voulez l'ajouter). Ces champs doivent être rédigés en EN et en FR-CA, et le sélecteur de langue dans le tableau de bord GBP gère la saisie en deuxième passe. Le flux de contenu bilingue d'AiLys livre la description et les services en EN et en FR-CA dans la même semaine, rédigés à la main en français du Québec (courriel, magasiner, fin de semaine).
      </p>
      <p>
        Pour la transparence Loi 25, les bascules d'attributs elles-mêmes ne déclenchent pas d'obligations Loi 25 parce que les données vivent du côté de Google. Cependant, les attributs qui pointent vers un flux de réservation, une page de commande ou un formulaire de contact (rendez-vous en ligne, soins en ligne, cartes-cadeaux) déclenchent des obligations Loi 25 en aval sur le site lié. La cadence d'audit ci-dessous couvre la vérification croisée.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Si vous gérez un commerce multi-emplacements au Québec, l'audit des attributs doit être lancé par emplacement, pas une fois par marque. Accessibilité, terminaux de paiement, stationnement et commodités diffèrent par emplacement, et un ensemble d'attributs uniforme cache les écarts par emplacement que les concurrents combleront avant vous.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="la-cadence-d-audit-trimestriel">La cadence d'audit trimestriel</h2>
      <p>
        La bonne cadence d'audit des attributs est trimestrielle, avec une vérification mensuelle rapide et une mise à jour immédiate sur les changements physiques. L'audit trimestriel complet prend environ 15 minutes par emplacement :
      </p>
      <ol>
        <li>Ouvrez le tableau de bord GBP, basculez sur le panneau d'attributs, faites défiler la liste complète</li>
        <li>Comparez chaque bascule à la réalité physique (visite des lieux ou revue des photos récentes et du plan)</li>
        <li>Activez ou désactivez les bascules qui ont changé depuis le dernier audit (nouvelle rampe, nouveau terminal de paiement, nouvelle déclaration d'identité)</li>
        <li>Notez les attributs ajoutés par Google depuis le dernier audit (le panneau marque les nouvelles bascules en italique ou avec une étiquette « nouveau » brièvement)</li>
        <li>Comparez les fiches concurrentes sur la même catégorie principale pour repérer les bascules que vos concurrents ont activées et que vous n'avez pas considérées</li>
        <li>Mettez à jour la description et les services si un nouveau groupe d'attributs apparaît, et documentez les changements dans votre journal de modifications GBP</li>
      </ol>
      <p>
        AiLys livre l'audit des attributs dans le livrable de l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Audit par attribut et comparaison avec les concurrents" /> gratuit sur la couche GBP. À partir du forfait Core, le moteur AiLys pousse les mises à jour d'attributs par l'API GBP automatiquement une fois le jeu de changements approuvé par l'opérateur. La trousse complète d'attributs GBP vit sur la page <InternalLink to="/glossary/gbp" title="Glossaire GBP" description="Champs principaux, attributs et trousse" />, et le guide de cadence des photos couvre le côté visuel à <InternalLink to="/blog/gbp-photo-upload-cheat-sheet" title="Aide-mémoire de téléversement de photos GBP" description="Cadence, EXIF et pondération" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de votre panneau d'attributs GBP actuel face à vos trois principaux concurrents? Sans pitch, liste de changements d'attributs livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Les attributs GBP sont des bascules booléennes qui apparaissent dans le panneau de connaissance et nourrissent les moteurs IA via le graphe d'entités.",
          "Trois groupes portent le plus de poids : accessibilité, paiement et commodités, et identité.",
          "N'activez les attributs d'accessibilité que lorsque la réalité physique correspond, puisque la fausse représentation peut suspendre la fiche.",
          "Les bascules d'attributs se rendent en bilingue par défaut, donc les commerçants québécois ne lancent pas un flux à deux passes pour les champs booléens.",
          "Faites un audit complet trimestriel, une vérification mensuelle rapide et une mise à jour immédiate dès que la réalité physique change.",
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
        alt="Synthèse d'audit des attributs GBP montrant les bascules d'accessibilité, de paiement et d'identité comparées à trois concurrents"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
