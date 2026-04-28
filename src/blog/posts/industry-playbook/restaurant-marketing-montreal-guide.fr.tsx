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
import { meta } from './restaurant-marketing-montreal-guide'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Marketing de restaurant à Montréal, le guide 2026 pour déménager et croître',
  metaDescription:
    "Un guide pratique 2026 pour le marketing d'un restaurant à Montréal. Modifications GBP le jour du déménagement, liste de priorités pour le nettoyage des citations, délais Apple Maps, affichage bilingue Street View et cadence d'avis.",
  tldr:
    "Le marketing de restaurant à Montréal en 2026 gagne sur cinq couches empilées dans le bon ordre. Modifiez la fiche Google Business Profile existante le jour du déménagement au lieu de la supprimer pour la refaire, demandez la revérification, poussez le nouveau NAP vers les six citations principales en sept jours, surveillez la fenêtre plus lente d'Apple Maps Connect, confirmez l'affichage bilingue sur Street View et lancez une cadence d'avis bilingues qui livre quatre à six avis frais par mois. Les restaurants qui suivent cette séquence retrouvent généralement la visibilité du local pack en 30 jours après un déménagement et dépassent les concurrents de quartier qui repartent à zéro.",
  faqItems: [
    {
      question: 'Pourquoi mon restaurant est-il invisible sur Google Maps après un déménagement?',
      answer:
        "La plupart des cas d'invisibilité après un déménagement viennent d'une de trois erreurs. La première et la plus fréquente est de supprimer l'ancienne fiche Google Business Profile et d'en créer une nouvelle, ce qui efface l'historique d'avis, les photos et l'autorité de catégorie. Le bon mouvement est de modifier la fiche existante avec la nouvelle adresse, de demander la revérification et d'attendre la fin de la fenêtre de révision. La deuxième est de laisser les citations NAP périmées sur Pages Jaunes, Yelp et les plateformes de réservation pendant des semaines, ce qui signale une entité incohérente aux moteurs de récupération. La troisième est d'oublier Apple Maps Connect, qui se met à jour sur un cycle plus lent et cache discrètement le restaurant aux requêtes Siri jusqu'à la mise à jour.",
    },
    {
      question: 'Faut-il supprimer ma vieille fiche GBP et en créer une nouvelle quand je déménage mon restaurant?',
      answer:
        "Non. Supprimer la vieille fiche efface l'historique d'avis, l'autorité photo, la confiance de catégorie et l'ancre Maps qui a pris des années à se bâtir. Modifiez plutôt la fiche existante. Mettez à jour l'adresse, demandez la revérification par carte postale ou par appel vidéo en direct, puis attendez la fin de la fenêtre de révision avant de pousser les mises à jour de citations partout ailleurs. Le chemin modifier-revérifier garde chaque signal qui classe déjà le restaurant. Le chemin supprimer-rebâtir force le restaurant à repartir de zéro dans les scores de récupération, ce qui peut prendre un trimestre complet à récupérer même avec une cadence d'avis solide.",
    },
    {
      question: 'Combien de temps prend Apple Maps pour se mettre à jour après un déménagement de restaurant?',
      answer:
        "Apple Maps Connect prend généralement dix à vingt jours ouvrables pour refléter un changement d'adresse vérifié, alors que Google Business Profile montre habituellement la nouvelle adresse en trois à sept jours après revérification. L'écart crée une fenêtre où les requêtes Siri envoient encore les clients à l'ancienne adresse, même si Google les envoie correctement. Soumettez la mise à jour Apple Maps le même jour que la modification GBP, puis vérifiez les requêtes Siri chaque semaine pendant deux semaines jusqu'à ce que la nouvelle adresse apparaisse. Les restaurants qui ignorent Apple Maps perdent environ quinze à vingt pour cent du trafic piéton vocal pendant l'écart.",
    },
    {
      question: 'À quelle vitesse faut-il mettre à jour les citations après un déménagement de restaurant à Montréal?',
      answer:
        "En sept jours. La liste de priorités est courte. Pages Jaunes Canada, 411.ca, Yelp Montréal, la plateforme de réservation utilisée le plus (OpenTable, Resy ou Tock), les plateformes de livraison (Uber Eats, DoorDash, SkipTheDishes) et le widget de réservation sur le site du restaurant. Mettre à jour ces six surfaces dans la même semaine empêche les moteurs de récupération de lire l'entité comme incohérente. Au-delà de sept jours, l'incohérence fait baisser les scores de confiance et le local pack favorise temporairement les concurrents aux profils plus propres.",
    },
    {
      question: "L'affichage bilingue sur Street View affecte-t-il vraiment le classement d'un restaurant à Montréal?",
      answer:
        "Oui, indirectement. Google lit l'imagerie Street View comme une couche de confirmation pour le nom et l'adresse de l'entreprise. Un restaurant à Montréal dont la nouvelle devanture montre un affichage bilingue sur le dernier passage Street View se lit comme une entité locale cohérente qui sert les deux moitiés de la ville. Après un déménagement, demandez un rafraîchissement de capture Street View via le programme Local Guides ou attendez le prochain passage de voiture, mais en attendant téléversez des photos extérieures de qualité depuis l'angle de la rue pour que la nouvelle enseigne s'ancre rapidement. L'affichage bilingue sur la devanture est aussi une exigence réglementaire au Québec en vertu de la Charte de la langue française.",
    },
    {
      question: "Quelle est la bonne cadence d'avis pour un restaurant à Montréal après un déménagement?",
      answer:
        "Quatre à six avis Google frais par mois, avec un mélange bilingue qui reflète la répartition de la clientèle. Un bistro du Plateau dont environ soixante-dix pour cent de la clientèle est francophone et trente pour cent anglophone devrait viser trois à quatre avis FR et un à deux avis EN par mois. Après un déménagement, demandez aux clients qui reviennent, en personne ou par courriel de suivi, de mentionner la nouvelle adresse dans leur avis, ce qui donne aux moteurs de récupération un signal de confirmation supplémentaire. Évitez les rafales d'avis ponctuelles. Une cadence stable se lit plus proprement que des pointes dans chaque jeu de données québécois que nous avons audité.",
    },
  ],
  headings: [
    { id: 'pourquoi-demenagement-casse-visibilite', text: 'Pourquoi un déménagement casse la visibilité d\'un restaurant sur Maps' },
    { id: 'gbp-modifier-pas-supprimer', text: 'GBP, modifier sans supprimer la vieille fiche' },
    { id: 'reverification-et-fenetre-revision', text: 'Revérification et fenêtre de révision' },
    { id: 'liste-priorite-citations-montreal', text: 'Liste de priorités pour les citations à Montréal' },
    { id: 'apple-maps-cycle-lent', text: 'Apple Maps Connect, le cycle de mise à jour plus lent' },
    { id: 'affichage-bilingue-street-view', text: 'Affichage bilingue sur Street View' },
    { id: 'cadence-avis-apres-demenagement', text: 'Cadence d\'avis après le déménagement' },
    { id: 'plan-recuperation-30-jours', text: 'Un plan de récupération de visibilité de 30 jours après un déménagement' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le marketing de restaurant à Montréal en 2026 change le jour où le restaurant déménage. La façon la plus rapide de disparaître de Google Maps après un déménagement est de supprimer l'ancien Google Business Profile et d'en bâtir un nouveau. Le bon mouvement est de modifier la fiche existante sur place, de demander la revérification, de pousser le nouveau NAP vers les six citations principales en sept jours, de soumettre la mise à jour Apple Maps Connect le même jour, de rafraîchir les photos extérieures qui montrent l'affichage bilingue et de lancer une cadence d'avis bilingues qui livre quatre à six avis frais par mois. Les restaurants qui suivent cette séquence retrouvent habituellement la visibilité du local pack en 30 jours. Ceux qui suppriment et rebâtissent perdent typiquement un trimestre complet en récupération.
      </p>

      <StatHighlight
        stats={[
          { value: '7 jours', label: 'Fenêtre pour pousser le nouveau NAP sur les six citations principales' },
          { value: '10-20', label: 'Jours ouvrables pour qu\'Apple Maps reflète le changement' },
          { value: '4-6', label: 'Avis bilingues frais par mois après le déménagement' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-demenagement-casse-visibilite">Pourquoi un déménagement casse la visibilité d'un restaurant sur Maps</h2>
      <p>
        Un déménagement de restaurant déclenche deux problèmes simultanés pour les moteurs de récupération. Le premier est un événement d'incohérence d'entité. Google, Apple, Pages Jaunes, Yelp, les plateformes de réservation, les applications de livraison et le site du restaurant portent tous l'adresse de l'entreprise. Quand une surface tient la nouvelle adresse et qu'une autre montre encore l'ancienne, les modèles de récupération lisent l'entité comme ambigüe et baissent le score de confiance sur chaque surface jusqu'à la résolution. Le second est un écart de fraîcheur sur Street View. La photo extérieure et la capture panoramique doivent toutes deux se rafraîchir avant que le local pack ne traite le restaurant comme ancré à sa nouvelle adresse physique.
      </p>
      <p>
        La plupart des propriétaires paniquent et suppriment l'ancien Google Business Profile pour repartir à neuf. Cette seule décision est ce qui coûte le plus de terrain. La vieille fiche porte chaque avis, chaque photo, chaque entrée Q et R, chaque attribution de réservation et chaque signal d'autorité de catégorie accumulés au fil des années. L'effacer force le restaurant à partir d'un profil froid dans un quartier compétitif de Montréal, ce qui se récupère rarement en un seul trimestre même avec une cadence d'avis agressive.
      </p>
      <p>
        La récupération est simple quand elle est séquencée. Modifiez la fiche existante, demandez la revérification, poussez le nouveau NAP vers les citations en sept jours, soumettez la mise à jour Apple Maps Connect le même jour, rafraîchissez les photos extérieures avec l'affichage bilingue et lancez une cadence d'avis bilingues. Cinq couches, exécutées dans la même quinzaine, ramènent le restaurant à la visibilité du local pack en 30 jours dans la majorité des cas.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>La cadence d'avis bilingues n'est pas un signal mou. Google lit un mélange d'avis FR et EN sur un restaurant à Montréal comme la preuve que les deux moitiés du marché local sont servies. Après un déménagement, le mélange bilingue porte encore plus de poids parce qu'il confirme que l'entité est le même restaurant à une nouvelle adresse. Voyez l'audit en version longue sur <InternalLink to="/glossary/nap" title="Glossaire cohérence NAP" description="Les six surfaces de citation qu'un restaurant à Montréal doit garder synchronisées après un déménagement" /> pour la liste complète.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir à quoi ressemble votre restaurant dans Google Maps et la recherche IA après le déménagement? Lancez l'audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="gbp-modifier-pas-supprimer">GBP, modifier sans supprimer la vieille fiche</h2>
      <p>
        Ouvrez la fiche Google Business Profile existante, cliquez sur modifier, changez l'adresse pour la nouvelle rue et enregistrez. Ne supprimez pas la fiche. N'en créez pas de nouvelle. Le chemin de modification déclenche une fenêtre de révision Google qui prend trois à sept jours. Pendant cette fenêtre, Google décide si la nouvelle adresse est cohérente avec les autres signaux (photos Street View, base de données de citations, pied de page du site) et revérifie la fiche par l'option choisie.
      </p>
      <p>
        Choisissez la méthode de revérification qui correspond à votre situation. La carte postale prend cinq à quatorze jours ouvrables. L'appel vidéo en direct avec un représentant Google prend un à trois jours ouvrables mais exige de promener la caméra autour des nouveaux locaux en montrant l'enseigne, la cuisine, la salle à manger et le numéro civique. Pour un déménagement de restaurant à Montréal, la vidéo en direct est le chemin plus rapide et celui que la plupart des propriétaires choisissent quand le nouvel espace est prêt avant la fin de semaine de bascule.
      </p>
      <p>
        Pendant que Google révise le changement, n'inondez pas la fiche de nouvelles publications ou photos. Deux mises à jour qui signalent le déménagement suffisent. Une photo en vedette de la nouvelle devanture en angle de rue et une seule publication Google qui annonce la nouvelle adresse en français et en anglais. Plus d'activité pendant la fenêtre de révision se lit comme suspect aux modèles de confiance Google et peut prolonger le délai de vérification.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Évitez l'erreur la plus fréquente du jour du déménagement. Si un représentant Google vous dit de marquer l'ancienne fiche comme fermée définitivement et d'en créer une nouvelle, repoussez. Ce conseil est parfois donné par des agents de soutien qui ne sont pas spécialisés en Maps. Le bon chemin pour une relocalisation est le flux modifier et revérifier, qui préserve l'historique de la fiche. Fermée définitivement plus une nouvelle fiche brûle l'historique d'avis et l'autorité de catégorie pour rien.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="reverification-et-fenetre-revision">Revérification et fenêtre de révision</h2>
      <p>
        La fenêtre de révision Google après une modification d'adresse se ferme habituellement en sept jours ouvrables. Pendant ces jours, trois choses doivent être vraies sur le site et les surfaces de citation. La nouvelle adresse paraît dans le pied de page du site et la page contact. Les données structurées sur la page d'accueil utilisent le schema LocalBusiness avec la nouvelle adresse. Le widget de réservation pointe à la nouvelle adresse. Si l'une des trois contredit la modification GBP, Google prolonge la fenêtre de révision ou annule la modification jusqu'à la résolution du conflit.
      </p>
      <p>
        Pendant que la revérification roule, mettez en place une redirection 301 sur toute URL spécifique au lieu qui mentionne l'ancien quartier ou la rue. Un bistro du Plateau qui déménage au Mile End devrait rediriger toute URL contenant l'ancien nom de quartier vers la version du nouveau, avec le contenu mis à jour pour mentionner la nouvelle rue. Les moteurs de recherche traitent la redirection plus la correspondance de contenu comme un signal propre de continuité d'entité, ce qui accélère la récupération du local pack.
      </p>
      <p>
        Une fois que Google confirme la modification, la fiche revient au local pack à la nouvelle adresse. Le premier signal que la revérification a passé est habituellement un petit rebond d'impressions sur le tableau de bord d'aperçu Google Business Profile. Si les impressions restent à plat pendant dix jours après la modification, ouvrez un cas d'aide et demandez une révision manuelle. La plupart des cas se règlent en trois à cinq jours ouvrables supplémentaires quand les citations NAP de soutien paraissent cohérentes.
      </p>

      <InlineCTA variant="pricing" text="Besoin d'un nettoyage GBP géré le jour du déménagement avec poussées de citations et Apple Maps Connect en parallèle? Voyez les forfaits AiLys à partir de 300 dollars CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="liste-priorite-citations-montreal">Liste de priorités pour les citations à Montréal</h2>
      <p>
        La liste de priorités de citations pour un déménagement de restaurant à Montréal est courte et pondérée par impact de récupération, pas par taille de répertoire. Six surfaces comptent le plus dans les sept premiers jours après le déménagement.
      </p>

      <ol>
        <li>Google Business Profile, modifier et revérifier (la fondation, tout le reste reflète ça).</li>
        <li>Pages Jaunes Canada, le répertoire francophone canadien à plus haute autorité.</li>
        <li>Yelp Montréal, fortement pondéré par Apple Maps et les plateformes de réservation.</li>
        <li>La plateforme de réservation en usage actif (OpenTable, Resy ou Tock).</li>
        <li>Les plateformes de livraison en usage actif (Uber Eats, DoorDash, SkipTheDishes).</li>
        <li>411.ca, secondaire mais pondéré sur les requêtes bilingues du local pack.</li>
      </ol>

      <p>
        Chaque surface utilise un flux de mise à jour différent. Pages Jaunes accepte un formulaire de changement en ligne avec un délai de traitement de 24 à 72 heures. Yelp exige une connexion propriétaire pour pousser le changement et demande parfois une facture de service à la nouvelle adresse comme preuve. Les plateformes de réservation laissent habituellement l'opérateur mettre à jour l'adresse directement dans le tableau de bord, mais le changement ne se propage pas aux widgets intégrés sur les sites partenaires avant plusieurs jours. Les plateformes de livraison ont le cycle interne le plus lent et peuvent exiger un billet de soutien pour rafraîchir l'adresse de cuisine utilisée pour le routage des livreurs.
      </p>
      <p>
        La liste d'audit complète vit sur <InternalLink to="/audit/gbp" title="Audit GBP et citations gratuit en 24 heures" description="Audit du jour du déménagement couvrant GBP, Apple Maps, Pages Jaunes, Yelp, réservation et livraison" /> et la version par industrie est sur <InternalLink to="/industries/restaurants" title="Playbook industrie restaurants" description="La séquence complète de déménagement avec délais et instructions par plateforme" />.
      </p>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Un bistro à Montréal déménage de trois rues. Le propriétaire veut la nouvelle adresse en ligne sur Maps le plus vite possible tout en gardant chaque avis Google. Quelle séquence est la bonne?"
        options={[
          'Supprimer la vieille fiche GBP, en créer une nouvelle, puis soumettre les citations',
          'Modifier la fiche GBP existante, demander la revérification vidéo, pousser les citations en sept jours, soumettre Apple Maps le même jour',
          'Attendre deux semaines que le déménagement se stabilise, puis mettre à jour GBP et citations ensemble',
          'Mettre à jour seulement le pied de page du site et laisser Google trouver le changement automatiquement',
        ]}
        correctIndex={1}
        explanation="La séquence modifier-revérifier-pousser préserve l'historique d'avis et l'autorité de catégorie tout en résolvant le conflit d'entité entre surfaces en sept jours. Supprimer et rebâtir efface l'équité de la fiche. Attendre deux semaines laisse le conflit de citations se durcir. Compter sur Google pour trouver le changement passivement peut prendre des mois."
      />

      <SectionDivider />

      <h2 id="apple-maps-cycle-lent">Apple Maps Connect, le cycle de mise à jour plus lent</h2>
      <p>
        Apple Maps Connect roule sur un cycle deux à trois fois plus lent que Google Business Profile. Un changement d'adresse vérifié prend typiquement dix à vingt jours ouvrables pour se refléter sur Apple Maps, ce qui veut dire que les requêtes Siri envoient encore les clients à l'ancienne adresse longtemps après que Google a fait le ménage. L'erreur que la plupart des restaurants à Montréal font est de soumettre la mise à jour Apple Maps une semaine ou deux après Google. Soumettre les deux le même jour rétrécit l'écart au minimum et protège le trafic piéton vocal qu'Apple génère encore en grand volume à Montréal.
      </p>
      <p>
        Ouvrez Apple Business Connect, repérez la fiche existante, soumettez le changement d'adresse avec les mêmes documents de soutien utilisés pour Google. Apple valide souvent par un appel téléphonique au numéro publié, alors assurez-vous que la nouvelle ligne est active avant de soumettre. En attendant, lancez un test hebdomadaire de requête Siri depuis un iPhone propre dans trois arrondissements de Montréal pour confirmer que le changement se propage. Le premier signe qu'Apple a mis à jour est habituellement que Siri arrête de diriger l'utilisateur vers l'ancienne rue et commence à nommer le nouveau quartier.
      </p>
      <p>
        Apple Maps Connect alimente aussi les données de réservation Apple Pay, l'intégration partenariat Yelp et les recommandations locales Apple Watch. Un restaurant à Montréal avec une fiche Apple Maps périmée perd du terrain sur les quatre surfaces simultanément. Le correctif est la même soumission, mais le décalage de propagation veut dire que les restaurants qui soumettent Apple Maps en dernier perdent environ quinze à vingt pour cent du trafic vocal pendant l'écart.
      </p>

      <img
        src={meta.images.mid}
        alt="Calendrier côte à côte comparant les fenêtres de mise à jour de Google Business Profile et Apple Maps Connect après un déménagement de restaurant à Montréal"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="affichage-bilingue-street-view">Affichage bilingue sur Street View</h2>
      <p>
        L'affichage bilingue sur Street View compte pour deux raisons à Montréal. La première est réglementaire. La loi québécoise en vertu de la Charte de la langue française exige que l'affichage commercial public soit principalement en français, le français devant être au moins deux fois plus présent que toute autre langue. Un restaurant qui ouvre avec un affichage uniquement anglophone déclenche un risque de plainte réglementaire et une légère pénalité au local pack quand Google détecte l'incohérence entre les photos de devanture et les attentes du marché bilingue.
      </p>
      <p>
        La seconde est la récupération. Google lit l'imagerie Street View comme une couche de confirmation pour le nom et l'adresse de l'entreprise. Quand le dernier passage Street View montre clairement le nouvel affichage, le local pack traite le restaurant comme ancré à son lieu physique. En attendant ce passage (qui peut prendre six à neuf mois), le contournement est de téléverser des photos extérieures de qualité depuis l'angle de la rue directement dans Google Business Profile et Apple Maps. Les photos avec métadonnées EXIF intactes portent plus de poids que les images de banque parce qu'elles se lisent comme une expérience de première main de la nouvelle adresse.
      </p>
      <p>
        Trois prises de vue extérieures couvrent les bases. Une photo grand-angle de rue qui montre la devanture en contexte, une plus serrée de l'enseigne avec le numéro civique visible et une prise intérieure d'entrée à travers la porte ouverte. Téléversez les trois dans les deux premières semaines après le déménagement et demandez aux dix prochains Local Guides qui visitent d'ajouter leurs propres photos via l'application Maps. Les signaux de fraîcheur combinés raccourcissent le temps pendant lequel le restaurant paraît instable aux modèles de récupération.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Si la nouvelle enseigne n'est pas installée le jour du déménagement, planifiez l'installation pour la semaine deux et l'approche Local Guide pour la semaine trois. Un restaurant qui ouvre avec une affiche en papier dans la fenêtre pendant deux semaines se lit à la récupération comme une entité instable. Une enseigne bilingue permanente en place au deuxième week-end est le plancher pour les déménagements de restaurants à Montréal qui tiennent leur position dans le local pack proprement.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="cadence-avis-apres-demenagement">Cadence d'avis après le déménagement</h2>
      <p>
        La cadence d'avis est le signal opérationnel qui tient la position du local pack une fois le déménagement techniquement résolu. Visez quatre à six avis Google frais par mois avec un mélange bilingue qui reflète la répartition de la clientèle. Un bistro sur Saint-Laurent dont environ soixante-dix pour cent des clients sont francophones et trente pour cent anglophones devrait viser trois à quatre avis FR et un à deux avis EN par mois. Le mélange bilingue est ce qui dit à Google que le restaurant continue à servir les deux moitiés du marché local après le déménagement.
      </p>
      <p>
        Demandez aux clients qui reviennent de mentionner la nouvelle adresse dans leur avis. Une ligne aussi simple que « Heureux qu'ils soient restés sur le Plateau, à seulement deux rues à l'est sur le boulevard Saint-Joseph » donne aux moteurs de récupération un signal de confirmation supplémentaire que l'entité à la nouvelle adresse est le même restaurant. Le premier mois après le déménagement est le moment de plus haut levier pour semer ces avis qui mentionnent l'adresse, parce que la fiche résout encore le changement d'adresse dans le graphe d'entités.
      </p>
      <p>
        Lancez la demande d'avis 24 heures après le repas, par courriel ou texto, dans la langue préférée du client. Évitez les demandes en lot qui violent les conditions d'avis Google. Une cadence stable se lit plus proprement que des pointes dans chaque jeu de données québécois que nous avons audité. Pour la plateforme qui automatise la cadence bilingue et achemine la demande à la bonne surface, voyez <InternalLink to="/blog/reviuzy-review-automation-guide" title="Guide d'automatisation d'avis Reviuzy" description="Le flux de suivi à 24 heures qui livre quatre à six avis bilingues frais par mois" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier la séquence de récupération post-déménagement sur votre restaurant, sans pitch, document stratégique remis quand même?" buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="plan-recuperation-30-jours">Un plan de récupération de visibilité de 30 jours après un déménagement</h2>
      <p>
        Jours un à trois, modifiez la fiche Google Business Profile existante, soumettez Apple Maps Connect le même jour, mettez à jour le pied de page du site et le schema LocalBusiness, et soumettez la revérification par appel vidéo en direct si disponible. Jours quatre à sept, poussez la nouvelle adresse vers Pages Jaunes Canada, Yelp Montréal, la plateforme de réservation active, les plateformes de livraison et 411.ca. Confirmez que chaque citation reflète le nouveau NAP avant de passer à la suivante.
      </p>
      <p>
        Jours huit à quatorze, téléversez trois photos extérieures avec métadonnées EXIF intactes, publiez une seule publication Google en français et en anglais qui annonce le déménagement et lancez un test de requête Siri depuis trois arrondissements de Montréal pour confirmer la progression Apple Maps. Jours quinze à vingt-et-un, lancez la cadence d'avis bilingues avec un suivi à 24 heures auprès des clients récents leur demandant de mentionner la nouvelle adresse. Jours vingt-deux à trente, auditez la position du local pack pour la requête cuisine principale plus quartier et notez tout retard Apple Maps restant pour suivi en semaine cinq.
      </p>
      <p>
        Les restaurants à Montréal qui suivent ce plan de 30 jours retrouvent typiquement leur position dans le local pack d'avant le déménagement dans le premier mois et la dépassent dans le deuxième. Le gain vient du signal combiné de fraîcheur des nouvelles photos Street View, de la cohérence des citations et de la cadence d'avis bilingues empilée sur l'historique de fiche préservé. Les restaurants qui ratent le plan ont presque toujours raté une des surfaces de citation ou ont soumis Apple Maps trop tard. Les deux écarts sont récupérables, mais coûtent un mois de plus de visibilité partielle.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Modifiez la fiche GBP existante, ne supprimez pas pour rebâtir. L\'historique de fiche porte chaque avis, photo et signal de catégorie qui classent le restaurant.',
          'Poussez le nouveau NAP vers les six surfaces de citation principales en sept jours. Google, Pages Jaunes, Yelp, réservation, livraison et 411.ca.',
          'Soumettez Apple Maps Connect le même jour que Google. Le cycle Apple est deux à trois fois plus lent et cache discrètement le restaurant à Siri jusqu\'à la mise à jour.',
          'Confirmez l\'affichage bilingue sur la devanture et téléversez trois photos extérieures avec EXIF intact en attendant le prochain passage Street View.',
          'Lancez une cadence d\'avis bilingues à quatre à six avis frais par mois, en demandant aux clients qui reviennent de mentionner la nouvelle adresse.',
          'Les restaurants qui suivent cette séquence de 30 jours retrouvent typiquement leur position du local pack d\'avant le déménagement dans le premier mois.',
        ]}
      />

      <h2 id="faq">Questions fréquentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Équipe d'un restaurant à Montréal célébrant la récupération du local pack après la séquence de déménagement de 30 jours"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
