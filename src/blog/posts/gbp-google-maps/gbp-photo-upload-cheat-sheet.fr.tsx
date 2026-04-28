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
import { meta } from './gbp-photo-upload-cheat-sheet'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Aide-mémoire pour les photos GBP, à quelle fréquence et quoi publier",
  metaDescription:
    "Un aide-mémoire pour les photos GBP destiné aux propriétaires locaux. À quelle fréquence publier, quels sujets photographier, les spécifications de fichiers et la cadence que nous appliquons aux clients.",
  tldr:
    "Ajoutez de nouvelles photos GBP chaque semaine au minimum. AiLys livre 4, 8 ou 12 photos fraîches par mois aux forfaits Starter, Core ou Growth, et Agency. Priorisez les extérieurs, les intérieurs, l'équipe, les produits et les coulisses dans cet ordre. Géolocalisez chaque photo, donnez aux fichiers des noms descriptifs et gardez la taille sous 1 Mo.",
  faqItems: [
    {
      question: "À quelle fréquence devrais-je ajouter de nouvelles photos sur ma fiche d'établissement Google?",
      answer:
        "Chaque semaine au minimum absolu, idéalement deux à trois fois par semaine. La fiche d'établissement Google récompense la fraîcheur du signal, donc une fiche avec des dépôts hebdomadaires se classe plus haut dans le local pack qu'une fiche avec le même nombre total téléversé d'un coup. AiLys livre 4 photos par mois au forfait Starter, 8 au Core et 12 au Growth et à l'Agency.",
    },
    {
      question: "Quels types de photos publier sur la fiche d'établissement Google?",
      answer:
        "Priorisez cinq catégories. Des photos extérieures de la devanture sous une bonne lumière. Des intérieurs montrant l'espace que le client verra réellement. Des photos d'équipe qui humanisent l'entreprise. Des photos de produit ou de service qui montrent ce qu'on achètera. Des coulisses qui montrent le savoir-faire. Faites tourner les catégories pour qu'un visiteur qui parcourt la fiche ait un sentiment varié et non cinq photos identiques de hall d'entrée.",
    },
    {
      question: "Quelles sont les spécifications de fichier qui fonctionnent le mieux pour la fiche?",
      answer:
        "Visez au minimum 1080 par 1080 pixels, en JPG ou PNG, avec une taille sous 1 Mo. Google compresse tout ce qui dépasse, ce qui tue la couleur et le détail. Gardez le ratio près du carré pour la grille de photos, et fournissez toujours une version horizontale 1200 par 900 pour la photo de couverture. Évitez les filtres lourds. Les photos réelles et non retouchées surpassent les photos retravaillées au niveau de la confiance client.",
    },
    {
      question: "La géolocalisation des photos GBP aide-t-elle encore en 2026?",
      answer:
        "Oui. Les photos géolocalisées restent rattachées à l'entité de localisation précise que Google associe à votre adresse. Le signal est petit par photo, mais s'accumule sur une année de dépôts hebdomadaires. La plupart des téléphones modernes géolocalisent automatiquement quand les services de localisation sont actifs. Si vous téléversez depuis un ordinateur, utilisez un petit outil EXIF pour ajouter les coordonnées avant publication. L'habitude de deux minutes paie dans le local pack.",
    },
    {
      question: "Devrais-je répondre aux photos publiées par les clients sur ma fiche?",
      answer:
        "Oui, à chaque fois. Les photos téléversées par les utilisateurs influencent votre fiche que vous interveniez ou non, mais une réponse publique du propriétaire ajoute un signal de fraîcheur que Google lit comme une gestion active. Remerciez le client brièvement, ne mentionnez jamais les prix ou les promotions dans la réponse, et signalez toute photo qui dénature votre commerce avec l'outil de signalement. La réponse elle-même compte comme activité pour le classement.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-cadence-photo-importe-plus-que-le-volume', text: 'Pourquoi la cadence photo importe plus que le volume' },
    { id: 'les-cinq-categories-de-photos-qui-travaillent', text: 'Les cinq catégories de photos qui travaillent' },
    { id: 'specifications-de-fichier-et-nommage-version-rapide', text: 'Spécifications de fichier et nommage, version rapide' },
    { id: 'la-cadence-mensuelle-que-nous-livrons-aux-clients', text: 'La cadence mensuelle que nous livrons aux clients' },
    { id: 'erreurs-frequentes-qui-tuent-le-signal-photo', text: 'Erreurs fréquentes qui tuent le signal photo' },
    { id: 'comment-repondre-aux-photos-publiees-par-les-clients', text: 'Comment répondre aux photos publiées par les clients' },
    { id: 'mesurer-si-vos-photos-classent-vraiment', text: 'Mesurer si vos photos classent vraiment' },
    { id: 'faq', text: 'Foire aux questions' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Ajoutez de nouvelles photos à votre fiche d'établissement Google chaque semaine au minimum absolu. Deux à trois dépôts par semaine valent mieux. La fiche récompense la fraîcheur du signal, donc une fiche avec des dépôts hebdomadaires se classe plus haut dans le local pack que la même fiche avec toutes les photos téléversées d'un coup. Les cinq catégories prioritaires sont l'extérieur, l'intérieur, l'équipe, le produit ou service, et les coulisses.
      </p>

      <StatHighlight
        stats={[
          { value: '4 / 8 / 12', label: 'Photos par mois aux forfaits Starter, Core ou Growth, et Agency' },
          { value: '< 1 Mo', label: 'Taille de fichier idéale avant compression Google' },
          { value: '1080 px', label: 'Dimension minimale sur le côté le plus court pour un dépôt propre' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-la-cadence-photo-importe-plus-que-le-volume">Pourquoi la cadence photo importe plus que le volume</h2>
      <p>
        Deux fiches peuvent avoir le même nombre total de photos et se classer très différemment. La raison est la fraîcheur. La fiche d'établissement Google lit la cadence des photos comme une mesure indirecte de la gestion active du commerce. Une clinique avec 60 photos téléversées en un seul après-midi frénétique en août dernier paraît abandonnée en novembre. Une clinique avec 60 photos téléversées à raison de trois par semaine pendant cinq mois paraît vivante. Les deux ont 60 photos. Une seule classe.
      </p>
      <p>
        C'est la raison pour laquelle nous avons déplacé le travail client vers une cadence régulière plutôt que des dépôts en lot. Une photo téléversée aujourd'hui vaut plus que la même photo téléversée il y a six mois, parce que le signal de fraîcheur soulève la fiche entière dans les calculs de classement. La photo elle-même reste dans la galerie indéfiniment, mais son poids de classement décroît. Le réapprovisionnement hebdomadaire est ce qui maintient ce poids stable.
      </p>
      <p>
        Pour l'audit complet des attributs GBP qui s'agence à la cadence photo, consultez notre <InternalLink to="/audit/gbp" title="Audit GBP approfondi" description="Liste complète des attributs qui s'agence à la cadence photo" />.
      </p>

      <SectionDivider />

      <h2 id="les-cinq-categories-de-photos-qui-travaillent">Les cinq catégories de photos qui travaillent</h2>
      <p>
        Toutes les photos ne tirent pas le même poids. Après avoir géré la cadence pour des centaines de clients locaux, cinq catégories font systématiquement bouger l'aiguille. Priorisez celles-ci et vous manquerez rarement de sujets.
      </p>
      <ol>
        <li><strong>Extérieur</strong>. La devanture sous une bonne lumière, à différentes heures. Les acheteurs s'en servent pour confirmer qu'ils sont au bon endroit en arrivant.</li>
        <li><strong>Intérieur</strong>. L'espace réel que le client verra. Halls, salles à manger, salles de soins, planchers de vente. Les intérieurs sont la catégorie la plus cliquée pour les restaurants et les cliniques.</li>
        <li><strong>Équipe</strong>. De vraies personnes, prénoms en légende quand c'est permis. Les photos d'équipe construisent la confiance, surtout pour les services où l'acheteur engage une personne, pas un logo.</li>
        <li><strong>Produit ou service</strong>. La chose pour laquelle l'acheteur paiera. Assiettes, soins dentaires en cours, projet terminé par l'entrepreneur, coupe faite par le coiffeur.</li>
        <li><strong>Coulisses</strong>. Procédé, savoir-faire, cuisine, laboratoire, atelier. Ces photos remontent plus souvent dans Google AIO parce qu'elles montrent l'expertise, ce qui alimente le signal E-E-A-T.</li>
      </ol>
      <p>
        Faites tourner les catégories. Une fiche faite uniquement de photos d'intérieur ressemble à du contenu de banque d'images. Une fiche qui mêle les cinq catégories ressemble à un commerce actif.
      </p>

      <CalloutBox type="tip" translatedLabel="Astuce de pro">
        <p>La catégorie coulisses est la plus sous-exploitée. La plupart des propriétaires se sentent mal à l'aise de photographier leur cuisine ou leur labo. Passez par-dessus. Le contenu de coulisses gagne un signal de confiance disproportionné parce qu'il révèle une expertise que les photos marketing polies ne peuvent pas fabriquer.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Mini-quiz"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Pourquoi une fiche avec 60 photos déposées chaque semaine surpasse-t-elle une fiche avec 60 photos déposées d'un seul coup?"
        options={[
          'Les photos plus récentes sont meilleures',
          'GBP lit la cadence comme un signal de fraîcheur de gestion active',
          'Google ignore tout dépôt de plus de trois mois',
          'Les dépôts en lot sont pénalisés comme du pourriel',
        ]}
        correctIndex={1}
        explanation="GBP pondère ses calculs de classement sur la cadence, pas seulement le volume. Un goutte à goutte hebdomadaire signale une gestion active et soulève toute la fiche, alors qu'un lot unique paraît abandonné en quelques mois même avec le même nombre de photos."
      />

      <SectionDivider />

      <h2 id="specifications-de-fichier-et-nommage-version-rapide">Spécifications de fichier et nommage, version rapide</h2>
      <p>
        Trois règles couvrent la majorité de la question des spécifications. Dimension, taille et nommage. Pour la dimension, visez au moins 1080 pixels sur le côté le plus court. Google rejette tout ce qui est sous 720 et compresse tout ce qui dépasse 1920 sans gain visuel. Le carré 1080 par 1080 est le défaut le plus sûr. Les photos de couverture demandent une version horizontale 1200 par 900.
      </p>
      <p>
        Pour la taille, gardez sous 1 Mo. Le JPG à 80 pour cent de qualité tombe généralement dans cette plage. Le PNG fonctionne mais gonfle vite. Le WebP est supporté mais évitez-le pour les photos de couverture parce que certaines surfaces de Maps convertissent encore. Pour le nommage, utilisez des noms minuscules descriptifs avec tirets, comme exterieur-devanture-soir-montreal.jpg, pas IMG_3947.jpg. Le nom de fichier n'apparaît pas publiquement, mais il informe le texte alternatif que Google génère à l'interne pour la photo, ce qui alimente la recherche d'images.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Les métadonnées EXIF sont le petit bloc de données que votre appareil joint à la photo : date de prise, coordonnées GPS, modèle d'appareil, exposition. Google lit ces métadonnées et utilise les coordonnées GPS pour confirmer que la photo a bien été prise à l'adresse listée du commerce. Si vous retirez l'EXIF (ce que la plupart des outils d'export sur ordinateur font par défaut), le signal de géolocalisation disparaît.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les forfaits conçus pour les entreprises locales, à partir de 300 $/mois CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="la-cadence-mensuelle-que-nous-livrons-aux-clients">La cadence mensuelle que nous livrons aux clients</h2>
      <p>
        La cadence AiLys par forfait est structurée pour que le signal de fraîcheur reste régulier tout le mois et non concentré au début. Starter livre 4 photos par mois, environ une par semaine. Core en livre 8, deux par semaine. Growth en livre 12, trois par semaine. Agency livre 12 avec une résolution supérieure et une préparation de sujets de qualité éditoriale. Le total annuel compte moins que la régularité.
      </p>
      <p>
        La cadence interne la plus simple pour les propriétaires hors forfait est une session photo du dimanche. Bloquez 30 minutes, prenez 12 à 16 photos couvrant les cinq catégories, et planifiez-les pour le reste de la semaine. La plupart des applications photo modernes supportent la publication planifiée. Réglez l'horaire une fois et la cadence se gère seule.
      </p>
      <p>
        Voyez notre <InternalLink to="/industries/restaurants" title="Playbook GBP restaurants" description="Variante de cadence GBP adaptée aux restaurants québécois" /> pour la variante adaptée aux restos, et <InternalLink to="/industries/dentists" title="Playbook GBP dentistes" description="Variante de cadence GBP adaptée aux cliniques médicales" /> pour la variante adaptée aux cliniques.
      </p>

      <SectionDivider />

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne téléversez pas les 12 photos mensuelles le premier du mois. La fiche d'établissement Google lit les dépôts en lot comme de l'automatisation inactive, pas comme de l'activité fraîche. Étalez-les. Deux photos chaque mardi et vendredi sont un signal plus fort que 12 photos chaque premier du mois.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="erreurs-frequentes-qui-tuent-le-signal-photo">Erreurs fréquentes qui tuent le signal photo</h2>
      <p>
        Trois erreurs expliquent la majorité des programmes photo qui échouent. Premièrement, les filtres lourds ou les images générées par IA. Google détecte mieux les deux et le contenu généré par IA fait baisser la confiance de la fiche. Les photos réelles et non filtrées gagnent à tous les coups. Deuxièmement, les republications identiques. Téléverser deux fois la même prise dans un trimestre n'apporte rien au classement et paraît paresseux aux visiteurs qui parcourent la galerie. Troisièmement, les géolocalisations manquantes lors des dépôts depuis un ordinateur. Si votre rouleau de pellicule a les services de localisation actifs, les photos portent les métadonnées GPS. Si vous exportez depuis un ordinateur sans GPS, vous perdez la moitié du signal local.
      </p>
      <p>
        Une quatrième erreur mérite d'être signalée : ignorer les photos publiées par les clients. Les clients et visiteurs peuvent publier sur votre fiche des photos que vous n'avez pas approuvées. Le bon réflexe est d'engager les légitimes (un bref mot de remerciement compte comme activité) et de signaler les trompeuses avec l'outil de signalement de la fiche. Les photos d'utilisateurs ignorées classent quand même et façonnent la perception de votre commerce d'une façon que le propriétaire ne voit jamais.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <InternalLink to="/glossary/gbp" title="Définition de la fiche d'établissement Google" description="Définition et facteurs de classement GBP en 2026" />

      <SectionDivider />

      <h2 id="comment-repondre-aux-photos-publiees-par-les-clients">Comment répondre aux photos publiées par les clients</h2>
      <p>
        Les réponses du propriétaire aux photos clients ajoutent un signal de fraîcheur que Google lit comme une gestion active. Gardez les réponses courtes, trois phrases au maximum. Remerciez le client par son prénom quand il est visible, mentionnez ce que la photo montre, et évitez tout langage de prix ou de promotion. Une réponse comme « Merci pour la publication, Marc. Heureux que la tarte au citron vous ait plu » surpasse un générique « merci pour la photo » parce que la précision signale un engagement réel autant au client qu'à l'algorithme.
      </p>
      <p>
        Pour les photos qui dénaturent votre commerce, l'outil de signalement de la fiche est à un clic. Signalez les photos trompeuses dans les 48 heures. Ne répondez pas publiquement à une photo trompeuse par une plainte, cela retourne contre vous et baisse la confiance. Signalez-la et laissez la résolution se faire en privé.
      </p>

      <SectionDivider />

      <h2 id="mesurer-si-vos-photos-classent-vraiment">Mesurer si vos photos classent vraiment</h2>
      <p>
        Le tableau de bord GBP Insights rapporte les vues de photos par semaine. Suivez la tendance, pas le nombre absolu. Une cadence hebdomadaire devrait produire une courbe de vues qui monte régulièrement sur 90 jours. Si la courbe s'aplatit ou plonge, la cadence s'est cassée ou les catégories ont vieilli (souvent trop d'intérieurs, pas assez d'équipe ou de coulisses).
      </p>
      <p>
        Couplez la tendance des vues photo à la tendance du classement local pack sur vos trois principales requêtes d'acheteur. La corrélation la plus propre est une montée régulière des vues couplée à une hausse de une à trois positions dans le local pack en 60 jours. Si les photos montent mais que le classement reste plat, l'écart est habituellement ailleurs (citations, avis ou schéma). Lancez un <InternalLink to="/audit" title="Audit AI Visibility" /> pour trouver la vraie fuite.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "La cadence bat le volume. Un dépôt hebdomadaire surpasse un dépôt unique en lot des mêmes photos.",
          'Priorisez cinq catégories : extérieur, intérieur, équipe, produit, coulisses.',
          'Gardez la taille sous 1 Mo et la dimension à 1080 pixels minimum sur le côté le plus court.',
          'Géolocalisez chaque photo. Le signal est petit par dépôt mais s\'accumule sur une année.',
          "Répondez aux photos publiées par les clients. Les réponses du propriétaire comptent comme activité fraîche.",
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Foire aux questions</h2>
      <p>
        Vous voulez une cadence photo ajustée sur votre fiche? Le forfait Core d'AiLys livre huit photos par mois, deux par semaine, avec des invites de sujet et la géolocalisation prises en charge. Lancez d'abord un audit gratuit pour voir si les photos sont vraiment votre goulot.
      </p>
      <InlineCTA variant="pricing" text="Voyez les forfaits conçus pour les entreprises locales, à partir de 300 $/mois CAD." buttonText="Voir les forfaits" />
    </article>
  )
}
