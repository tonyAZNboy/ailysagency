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
import { meta } from './ailys-reviuzy-addon-deep-dive'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Module AiLys Automation AiLys, ce que 100 dollars par mois vous donnent',
  metaDescription:
    "Tour complet du module AiLys Automation d'AiLys à 100 dollars CAD par mois. Cartes NFC, réponses IA, moteur de concours, générateur légal, détection de faux avis, automatisation GBP.",
  tldr: "Le module AiLys Automation se greffe à n'importe quel forfait AiLys pour 100 dollars CAD par mois, et il est inclus dans le forfait Agency. La portée couvre les cartes NFC de collecte d'avis, la génération IA d'avis et de réponses, un moteur de concours avec tirage vidéo, un générateur de termes légaux selon la juridiction, la détection de faux avis et l'ensemble d'automatisation GBP (photos, questions-réponses, attributs). Le client opère son propre concours via l'app AiLys Automation. AiLys livre uniquement la configuration, les documents légaux et les guides d'aide.",
  faqItems: [
    {
      question: "Combien coûte le module AiLys Automation d'AiLys et qu'est-ce qu'il inclut?",
      answer:
        "Le module AiLys Automation coûte 100 dollars CAD par mois en plus de n'importe quel forfait AiLys, et il est inclus dans le forfait Agency à 2 499 dollars par mois. La portée couvre les cartes NFC de collecte d'avis, la génération IA d'avis et de réponses, un moteur de concours avec tirage vidéo, un générateur de termes légaux selon la juridiction, la détection de faux avis et l'ensemble d'automatisation GBP qui comprend la mise en ligne de photos, le suivi des questions-réponses et la gestion des attributs.",
    },
    {
      question: "Est-ce qu'AiLys opère le concours AiLys Automation à la place du client?",
      answer:
        "Non. Le client opère le concours avec l'app AiLys Automation sur son téléphone. AiLys livre la configuration du concours dans le tableau de bord, le document de termes et conditions adapté à la juridiction du client, et les guides d'aide qui expliquent le tirage vidéo. Le client est propriétaire de la liste des participants, du prix et du moment du tirage. Cette séparation est une règle ferme du produit AiLys.",
    },
    {
      question: "Qui fournit les photos pour l'automatisation GBP?",
      answer:
        "Le client fournit les photos via l'app AiLys Automation. AiLys ne fournit pas les photos à la place du client. L'app AiLys Automation sur le téléphone capture la photo, exécute les vérifications EXIF et de qualité, puis pousse le fichier dans la file d'automatisation GBP. La couche agence applique les schémas, le marquage géographique et la cadence de mise en ligne, mais la photo brute vient toujours de l'appareil du client.",
    },
    {
      question: "Comment fonctionne la détection de faux avis?",
      answer:
        "AiLys Automation analyse les avis entrants selon des signaux qui correspondent au manuel Google sur les faux avis. Les signaux incluent la profondeur de l'historique du compte, la cadence des publications, la cohérence géographique avec l'emplacement du commerce, les patrons linguistiques qui correspondent à du texte généré, et les regroupements temporels. Les avis signalés vont dans une file dans le tableau de bord, et le client peut les contester via le flux de signalement de Google Business Profile avec les preuves préemballées.",
    },
    {
      question: "Le générateur de termes légaux remplace-t-il un avocat?",
      answer:
        "Non. Le générateur produit un brouillon de termes et conditions de concours adapté à la juridiction du client (Québec, Ontario, reste du Canada ou États-Unis), en s'appuyant sur les exigences de la Loi sur les loteries publicitaires pour le Québec, de la Loi sur la concurrence pour le Canada et des règles applicables aux États-Unis. C'est un brouillon de départ, pas un avis juridique. Nous recommandons une révision finale par l'avocat du client pour les concours à fort enjeu.",
    },
  ],
  headings: [
    { id: 'ce-qu-est-vraiment-le-module-reviuzy', text: "Ce qu'est vraiment le module AiLys Automation" },
    { id: 'tarifs-et-inclusion-agency', text: 'Tarifs et inclusion dans Agency' },
    { id: 'cartes-nfc-de-collecte', text: "Cartes NFC de collecte d'avis sur le comptoir" },
    { id: 'generation-ia-avis-et-reponses', text: 'Génération IA des avis et des réponses' },
    { id: 'moteur-de-concours-et-tirage-video', text: 'Moteur de concours et tirage vidéo' },
    { id: 'generateur-de-termes-legaux', text: 'Générateur de termes légaux selon la juridiction' },
    { id: 'detection-de-faux-avis', text: 'Détection de faux avis et préparation du litige' },
    { id: 'suite-d-automatisation-gbp', text: "Suite d'automatisation GBP (photos, questions-réponses, attributs)" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le module AiLys Automation d'AiLys est la couche d'automatisation de la réputation et des avis qui se greffe à n'importe quel forfait AiLys pour 100 dollars CAD par mois, et il est inclus dans le forfait Agency. La portée est plus large qu'un simple outil de collecte d'avis. Elle couvre les cartes NFC sur le comptoir, la génération IA d'avis et de réponses, un moteur de concours avec tirage vidéo, un générateur de termes légaux selon la juridiction, la détection de faux avis et la suite complète d'automatisation GBP qui livre la mise en ligne de photos, le suivi des questions-réponses et la gestion des attributs. Cette page parcourt chaque module, ce qu'il fait, et où se trouve la frontière entre la couche agence et le flux client.
      </p>

      <StatHighlight
        stats={[
          { value: '100 $ CAD', label: 'Prix mensuel du module AiLys Automation' },
          { value: 'Inclus', label: 'Dans le forfait Agency à 2 499 dollars' },
          { value: '8 modules', label: 'NFC, réponses IA, concours, légal, faux avis, photos, questions-réponses, attributs' },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-qu-est-vraiment-le-module-reviuzy">Ce qu'est vraiment le module AiLys Automation</h2>
      <p>
        AiLys Automation est le SaaS d'AiLys pour la réputation. Il fonctionne aux côtés du moteur AI Visibility et du travail GBP (voir l'<InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Google Business Profile et signaux de classement associés" /> pour la surface sous-jacente), et c'est le seul module AiLys qui livre sa propre app mobile. L'app est sur le téléphone du client pour deux raisons. Premièrement, les taps sur les cartes NFC et les inscriptions au concours arrivent sur l'appareil du client, pas sur celui de l'agence. Deuxièmement, les photos viennent de la caméra du client avec de vraies données EXIF, dont le module GBP a besoin pour bien noter le signal de fraîcheur.
      </p>
      <p>
        Le tableau de bord vit dans la couche agence. Il opère la file des réponses IA, le pipeline de détection de faux avis, la liste des participants au concours, les documents légaux et la cadence d'automatisation GBP. Les commerçants se connectent pour approuver les réponses et déclencher le tirage. Les stratèges se connectent pour réviser la file et livrer les corrections. La séparation est intentionnelle, et elle reflète deux principes du produit AiLys. Le client est propriétaire de la relation client. AiLys livre l'outillage et la couverture légale.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le module AiLys Automation n'est pas le même produit que l'app AiLys Automation autonome sur l'App Store et Google Play. L'app autonome est une version gratuite avec collecte d'avis manuelle seulement. Le module AiLys Automation à 100 dollars par mois débloque le pipeline d'automatisation complet et l'intégration GBP. Voir <InternalLink to="/blog/reviuzy-review-automation-guide" title="Guide d'automatisation des avis AiLys Automation" description="Le guide long sur l'app autonome et le module" /> pour la différence ligne par ligne.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez où s'insère le module AiLys Automation dans les quatre forfaits AiLys, de Starter à 300 dollars à Agency à 2 499 dollars." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="tarifs-et-inclusion-agency">Tarifs et inclusion dans Agency</h2>
      <p>
        Le module AiLys Automation coûte 100 dollars CAD par mois forfaitaires. Il se greffe sur Starter (300 dollars), Core (600 dollars) ou Growth (1 200 dollars), portant ces forfaits à 400, 700 ou 1 300 dollars par mois respectivement. Au forfait Agency (2 499 dollars), AiLys Automation est inclus, donc l'opérateur ne paie rien de plus. Cette décision reflète le positionnement du forfait Agency : c'est le palier multi-emplacements et marque blanche où le travail de réputation est l'attente par défaut, pas un ajout.
      </p>
      <p>
        La facturation annuelle applique un léger rabais, et ajouter AiLys Automation à l'inscription est le chemin le plus propre parce que les cartes NFC partent dans la trousse de bienvenue. L'ajouter plus tard veut dire un envoi de cartes séparé, ce qui retarde les premiers taps au comptoir d'une semaine. Le côté tableau de bord s'active la même journée que le module est activé, donc la file de réponses IA et l'automatisation GBP démarrent immédiatement même si les cartes sont encore en route.
      </p>

      <h3>À quoi ressemble chaque palier avec AiLys Automation</h3>
      <ul>
        <li>Starter avec AiLys Automation à 400 dollars : optimisation GBP, rapport AI Visibility mensuel, audit NAP sur les cinq citations principales, plus la suite AiLys Automation complète</li>
        <li>Core avec AiLys Automation à 899 dollars : publications GBP hebdomadaires, nettoyage de citations sur vingt cibles, schéma FAQ, plus AiLys Automation</li>
        <li>Growth avec AiLys Automation à 1 599 dollars : photographie originale, production de contenu mensuelle, deux audits AI Visibility par trimestre, plus AiLys Automation</li>
        <li>Agency à 2 499 dollars : AiLys Automation est inclus, multi-emplacements et marque blanche compris, stratège dédié, rapports hebdomadaires</li>
      </ul>

      <SectionDivider />

      <h2 id="cartes-nfc-de-collecte">Cartes NFC de collecte d'avis sur le comptoir</h2>
      <p>
        Les cartes NFC sont la surface physique du module. Elles sont sur le comptoir, le terminal de paiement, l'accueil ou le sac de commande à emporter. Un client tape la carte avec son téléphone, le téléphone ouvre une page AiLys Automation, et la page redirige le client vers le formulaire d'avis Google Business Profile pour le bon emplacement. Pas d'installation d'app. Pas de scan de code QR. Juste un tap.
      </p>
      <p>
        Le taux de tap NFC bat les codes QR avec une marge confortable en commerce de détail et en clinique, parce que le geste se rapproche du paiement sans contact, que la plupart des clients font déjà sans réfléchir. Les cartes sont préimprimées avec le logo du client, brandées pour l'emplacement, et expédiées dans la trousse de bienvenue. Les comptes multi-emplacements au palier Agency reçoivent une pile de cartes par emplacement, avec le routage spécifique cuit dans la puce NFC.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Placez la carte NFC à portée de la main du client qui paie. À côté du terminal de paiement, c'est la position la plus forte pour le commerce de détail et la restauration. Sur la planchette de l'accueil, c'est la position la plus forte pour les cliniques et les cabinets dentaires. Évitez de placer la carte près de la sortie, parce qu'une fois que le client marche vers la porte, le moment est passé. Le flux tap pour avis doit atterrir pendant que le client est encore arrêté.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="generation-ia-avis-et-reponses">Génération IA des avis et des réponses</h2>
      <p>
        Le module de génération de réponses tire chaque nouvel avis du Google Business Profile connecté, les classe par sentiment et visibilité, et rédige un brouillon de réponse dans la voix de la marque. Le client voit le brouillon dans le tableau de bord, modifie au besoin, et approuve d'un seul tap. Les avis négatifs déclenchent un chemin différent : le moteur produit une réponse mesurée, non défensive, qui reconnaît le problème, nomme la voie de résolution et signe avec le nom du gérant. Le commerçant n'auto-répond jamais à une étoile.
      </p>
      <p>
        Le côté génération d'avis aide les clients qui tapent la carte NFC mais figent devant le formulaire vide. La page AiLys Automation offre deux invitations facultatives. La première demande au client ce qu'il a apprécié, dans ses propres mots. La deuxième rédige une version polie de l'extrait et la lui montre, pour qu'il puisse copier, coller et soumettre. C'est facultatif, le client modifie toujours, et l'avis final est dans son écriture.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="À quel forfait AiLys le module AiLys Automation est-il inclus sans frais supplémentaires?"
        options={[
          'Starter à 300 dollars CAD par mois',
          'Core à 600 dollars CAD par mois',
          'Growth à 1 200 dollars CAD par mois',
          'Agency à 2 499 dollars CAD par mois',
        ]}
        correctIndex={3}
        explanation="AiLys Automation est inclus dans le forfait Agency. À Starter, Core et Growth, le module coûte 100 dollars CAD par mois en plus du prix du forfait. À Agency, il est inclus par défaut parce que l'automatisation de réputation est la portée standard au palier multi-emplacements et marque blanche."
      />

      <SectionDivider />

      <h2 id="moteur-de-concours-et-tirage-video">Moteur de concours et tirage vidéo</h2>
      <p>
        Le moteur de concours est le module à plus fort levier pour la vélocité d'avis. Le commerçant configure un tirage dans le tableau de bord, définit le prix, la durée et les règles d'inscription, et le moteur câble la capture des participants. Les clients s'inscrivent en tapant la carte NFC, en laissant facultativement un avis Google, et en confirmant l'inscription dans l'app AiLys Automation. La liste des participants est tenue dans le compte du client, pas dans le compte de l'agence.
      </p>
      <p>
        Le tirage roule en vidéo. Le commerçant déclenche le tirage devant le personnel ou en direct sur Facebook Live, et le tableau de bord affiche une animation aléatoire qui se pose sur le gagnant. Le fichier vidéo est téléchargeable, sans filigrane, et partageable. C'est l'artefact que le commerçant publie sur les réseaux sociaux et sur la chronologie GBP. C'est le moment qui convertit le concours en vélocité d'avis continue, parce que le prochain lot de clients voit le tirage se faire et fait confiance au prochain concours.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le client opère le concours. AiLys livre la configuration, les termes légaux et les guides d'aide, mais le moment du tirage, la remise du prix et la notification du gagnant appartiennent au client. Cette frontière est une règle ferme du produit AiLys, et elle existe parce que le concours est une activité encadrée dans la plupart des juridictions, et le régulateur veut que l'opérateur officiel soit le commerce, pas l'agence marketing.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Tableau de bord du moteur de concours AiLys Automation avec animation de tirage vidéo et exportation de la liste de participants"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="generateur-de-termes-legaux">Générateur de termes légaux selon la juridiction</h2>
      <p>
        Chaque concours a besoin de termes et conditions. Au Québec, la Loi sur les loteries publicitaires s'applique, et la Régie des alcools, des courses et des jeux exige une inscription au-delà d'un seuil de prix. Dans le reste du Canada, la Loi sur la concurrence s'applique, avec l'exigence sans achat requis et la question d'habileté. Aux États-Unis, des règles d'État s'appliquent, la Californie, New York et la Floride étant les plus encadrés. Le générateur légal produit un brouillon de termes adapté à la juridiction du client, avec les bonnes étapes d'inscription et le bon langage de divulgation.
      </p>
      <p>
        Le générateur est un brouillon de départ, pas un avis juridique. Pour les concours à fort enjeu au-dessus de 2 000 dollars en valeur de prix, nous recommandons une révision finale par l'avocat du client. Pour les concours de faible valeur (tirages de cartes-cadeaux sous 500 dollars), le brouillon généré est typiquement le seul document dont l'opérateur a besoin. Le générateur sort un PDF, une version texte pour le site web, et un résumé court pour la page de destination du concours.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où en est votre commerce dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="detection-de-faux-avis">Détection de faux avis et préparation du litige</h2>
      <p>
        Les faux avis sont la taxe silencieuse sur la réputation locale. Un concurrent ou un ancien employé frustré peut publier une étoile sans recours, et l'avis reste sur le profil pendant des années si personne ne le conteste. Le module de détection de faux avis AiLys Automation analyse les avis entrants selon des signaux qui correspondent au manuel Google sur les faux avis. Les signaux incluent la profondeur de l'historique du compte (un compte tout neuf qui publie une étoile et disparaît), la cadence des publications (regroupements d'avis venant de comptes sans autre activité), la cohérence géographique avec l'emplacement du commerce, les patrons linguistiques qui correspondent à du texte généré, et les regroupements temporels qui suggèrent une coordination.
      </p>
      <p>
        Les avis signalés vont dans une file dans le tableau de bord. Le commerçant révise chaque signalement, le confirme ou le rejette, et le système préemballe la soumission de litige pour le flux de signalement GBP. Le litige inclut les preuves (capture de l'historique du compte, données de localisation, analyse linguistique), ce qui améliore le taux de succès du retrait par rapport à un signalement nu sans contexte. Nous ne promettons pas le retrait, parce que la décision finale appartient à Google, mais le travail de préparation déplace les chances.
      </p>

      <SectionDivider />

      <h2 id="suite-d-automatisation-gbp">Suite d'automatisation GBP (photos, questions-réponses, attributs)</h2>
      <p>
        La suite d'automatisation GBP est le côté arrière-boutique du module, et c'est celui qui génère le plus de gains de visibilité continue. Voir l'<InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Définition complète de Google Business Profile et signaux de classement associés" /> pour le modèle de classement sous-jacent. La suite a trois sous-modules, et chacun roule sur une cadence hebdomadaire.
      </p>
      <p>
        La mise en ligne de photos tire les photos fraîches de l'app AiLys Automation sur le téléphone du client, exécute des vérifications EXIF et de qualité, marque le fichier avec l'adresse du commerce, et le pousse vers GBP via l'API officielle. La cadence est de deux photos par semaine au minimum, et le moteur priorise la variété intérieur, plats, équipe et façade plutôt que les doublons. Le suivi des questions-réponses analyse les questions publiques sur le profil GBP, rédige des réponses dans la voix de la marque, et les met en file pour approbation. La gestion des attributs vérifie les bascules booléennes du profil (accessible en fauteuil roulant, Wi-Fi gratuit, terrasse, accepte les réservations), et fait remonter les écarts dans le tableau de bord avec des correctifs en un seul tap.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La source des photos est toujours le client. AiLys ne fournit pas de photos à la place du client. L'app AiLys Automation sur le téléphone du client capture la photo, exécute les vérifications de fraîcheur, et alimente la file de mise en ligne. C'est une règle ferme, et c'est ce qui rend les données EXIF authentiques. Les photos de banque et les photos volées sont détectables par Google et elles érodent plutôt que construisent le signal de classement local.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez une visite guidée de 60 minutes du module AiLys Automation en partage d'écran? Sans pitch, enregistrement livré." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Le module AiLys Automation coûte 100 dollars CAD par mois en plus de n'importe quel forfait AiLys, et il est inclus dans le forfait Agency à 2 499 dollars par mois.",
          "Les cartes NFC sur le comptoir battent les codes QR pour la collecte d'avis parce que le geste correspond au paiement sans contact.",
          'Le concours est opéré par le client. AiLys livre uniquement la configuration, les termes légaux et les guides.',
          "Les photos pour l'automatisation GBP viennent toujours du client via l'app AiLys Automation, ce qui préserve les vraies données EXIF.",
          "Le générateur de termes légaux est un brouillon de départ pour la juridiction du client, pas un avis juridique. Les concours à fort enjeu nécessitent une révision par avocat.",
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
        alt="Carte complète des modules AiLys Automation avec NFC, réponses IA, moteur de concours, générateur légal, détection de faux avis et automatisation GBP"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
