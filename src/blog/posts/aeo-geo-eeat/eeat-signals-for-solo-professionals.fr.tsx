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
import { meta } from './eeat-signals-for-solo-professionals'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Signaux E-E-A-T pour professionnels solo, la liste de preuves 2026',
  metaDescription:
    "Comment un avocat, dentiste, comptable ou physiothérapeute solo prouve E-E-A-T à Google et aux moteurs IA en 2026. Ancrages d'ordre professionnel québécois et schema livré en une semaine.",
  tldr:
    "Les professionnels solo prouvent E-E-A-T avec quatre signaux ancrés. L'expérience comme langage d'études de cas et compte d'années explicite sur la signature. L'expertise comme diplômes et certifications inscrits à côté du nom. L'autorité comme un numéro Q Wikidata avec un lien profond vers la fiche de l'ordre professionnel québécois pertinent. La fiabilité comme cohérence NAP sur les six citations principales, avis frais chaque mois et schema LocalBusiness plus Person propre. Les pratiques solo qui livrent ces quatre signaux la même semaine grimpent typiquement de deux positions dans le local pack et doublent leur part de citations dans les moteurs IA en un trimestre.",
  faqItems: [
    {
      question: 'Comment prouver E-E-A-T comme professionnel solo?',
      answer:
        "Ancrez quatre signaux la même semaine. L'expérience se montre par un compte d'années explicite sur chaque signature plus trois paragraphes d'études de cas qui nomment la situation cliente, l'action posée et le résultat. L'expertise est votre diplôme, votre certification et votre numéro de membre d'ordre professionnel inscrits à côté du nom sur la page d'accueil et la page à propos. L'autorité est un numéro Q Wikidata qui lie la pratique à l'ordre québécois pertinent. La fiabilité est la cohérence NAP sur les six citations principales, des avis clients mensuels et un schema LocalBusiness plus Person propre. Les pratiques solo qui livrent les quatre signaux ensemble doublent typiquement leur part de citations IA en un trimestre.",
    },
    {
      question: 'Google pondère-t-il vraiment un professionnel solo différemment d\'une clinique de vingt employés?',
      answer:
        "Oui, mais pas comme la plupart des propriétaires le supposent. Google lit une pratique solo comme une seule entité Person en couche sur une entité LocalBusiness, alors qu'une clinique est une entité LocalBusiness avec plusieurs entités Person liées dessous. La pratique solo peut surclasser une plus grosse clinique sur E-E-A-T quand l'entité Person est entièrement bâtie. Ça veut dire que le compte d'années sur la signature, le numéro Q Wikidata, le lien vers la fiche de l'ordre et le langage d'études de cas renforcent tous une seule personne nommée. Une clinique qui n'assigne pas chaque service à un professionnel nommé perd souvent la course aux citations IA au profit d'une pratique solo bien bâtie de la même rue.",
    },
    {
      question: 'Qu\'est-ce qu\'un numéro Q Wikidata et pourquoi un avocat ou dentiste solo en a besoin?',
      answer:
        "Un numéro Q Wikidata est l'identifiant unique que le graphe de connaissance ouvert assigne à une entité du monde réel. Une fois que vous avez un Q pour le professionnel solo et un pour la pratique, chaque moteur IA qui interroge Wikidata résout l'entité proprement au lieu de deviner. ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot utilisent tous Wikidata comme ancre de citation. Un professionnel solo sans numéro Q est invisible à cette couche d'ancrage. En bâtir un prend un après-midi plus une période de patrouille d'une semaine pour que la communauté Wikidata confirme que l'entité est notable et bien sourcée.",
    },
    {
      question: 'Quelle page d\'ordre professionnel québécois faut-il lier depuis mon site?',
      answer:
        "Liez l'ordre qui régit votre pratique et liez la page profonde pour votre fiche, pas la page d'accueil de l'ordre. Un avocat québécois lie l'entrée du Tableau de l'Ordre sur le site du Barreau du Québec. Un dentiste lie la fiche personnelle dans le registre public de l'Ordre des dentistes du Québec. Un comptable lie la fiche du répertoire des membres CPA Québec. Un physiothérapeute lie la fiche du tableau public de l'OPPQ. Le lien profond est ce que les moteurs IA utilisent pour confirmer que la pratique est licenciée et en règle. Le lien vers la page d'accueil ne porte pas le même poids de preuve.",
    },
    {
      question: 'À quelle vitesse un nettoyage E-E-A-T fait-il bouger le local pack et la part de citations IA?',
      answer:
        "Une pratique solo qui livre les quatre ancrages E-E-A-T la même semaine voit typiquement deux mouvements. La position dans le local pack monte d'une à deux places en 60 à 90 jours, surtout grâce à la cohérence NAP et à la cadence d'avis qui composent avec les nouveaux signaux d'autorité. La part de citations dans les moteurs IA double habituellement dans le même trimestre, parce que le numéro Q Wikidata et le lien profond vers l'ordre donnent aux moteurs une entité propre à résoudre. Le motif est constant chez les avocats, dentistes, comptables et physiothérapeutes solo dans notre jeu de données québécois.",
    },
    {
      question: 'Faut-il publier sous son propre nom pour prouver l\'expérience?',
      answer:
        "Oui. Les signatures d'auteur sont le signal d'expérience le moins cher qu'une pratique solo puisse livrer. Chaque billet de blogue, chaque entrée FAQ longue forme, chaque page d'étude de cas doit porter le professionnel nommé avec une formule de compte d'années et un lien profond vers la page à propos. La page à propos elle-même doit porter le numéro de membre d'ordre, l'année d'admission et la pile de certifications. Le texte générique sous le nom de la pratique se lit comme une expérience faible aux yeux des moteurs IA et des évaluateurs qualité Google. Les professionnels solo qui passent d'une signature de marque à une signature personnelle voient souvent une hausse de part de citations à la prochaine sonde mensuelle.",
    },
  ],
  headings: [
    { id: 'pourquoi-solo-different-cliniques', text: 'Pourquoi les professionnels solo ont besoin d\'E-E-A-T autrement que les cliniques' },
    { id: 'experience-signature-et-compte-annees', text: 'Expérience, signature et compte d\'années' },
    { id: 'expertise-diplomes-certifications-ordres', text: 'Expertise, diplômes, certifications et ordres québécois' },
    { id: 'autorite-wikidata-et-lien-profond-ordre', text: 'Autorité, Wikidata et le lien profond vers l\'ordre' },
    { id: 'fiabilite-nap-avis-et-schema', text: 'Fiabilité, NAP, avis et schema' },
    { id: 'la-semaine-de-nettoyage-eeat-solo', text: 'La semaine de nettoyage E-E-A-T pour solo' },
    { id: 'comment-moteurs-ia-resolvent-entite-solo', text: 'Comment les moteurs IA résolvent une entité solo' },
    { id: 'mesurer-le-gain-eeat-apres-le-nettoyage', text: 'Mesurer le gain E-E-A-T après le nettoyage' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les avocats, dentistes, comptables et physiothérapeutes solo prouvent E-E-A-T à Google et aux moteurs IA par quatre signaux ancrés livrés la même semaine. L'expérience est le compte d'années sur la signature plus trois paragraphes d'études de cas. L'expertise est le diplôme, la certification et le numéro de membre d'ordre inscrits à côté du nom. L'autorité est un numéro Q Wikidata avec un lien profond vers la fiche de l'ordre, pas la page d'accueil de l'ordre. La fiabilité est la cohérence NAP sur les six citations principales, des avis frais chaque mois et un schema LocalBusiness plus Person propre. Les pratiques solo qui livrent les quatre ancrages la même semaine grimpent typiquement d'une à deux positions dans le local pack en 90 jours et doublent leur part de citations IA en un trimestre.
      </p>

      <StatHighlight
        stats={[
          { value: '4 ancrages', label: 'Expérience, expertise, autorité, fiabilité' },
          { value: '90 jours', label: 'Mouvement typique du local pack après le nettoyage' },
          { value: '1 semaine', label: 'Délai pour livrer les quatre signaux à l\'échelle solo' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-solo-different-cliniques">Pourquoi les professionnels solo ont besoin d'E-E-A-T autrement que les cliniques</h2>
      <p>
        Une pratique solo se lit chez Google et les moteurs IA comme une seule entité Person en couche sur une entité LocalBusiness. Une clinique est une entité LocalBusiness avec plusieurs entités Person liées dessous. Cette différence structurelle compte parce que la pratique solo peut surclasser une clinique plus grosse sur E-E-A-T quand la seule entité Person est entièrement bâtie. Le compte d'années sur la signature, le numéro Q Wikidata, le lien vers la fiche de l'ordre et le langage d'études de cas renforcent tous une seule personne nommée. Une clinique qui n'a pas assigné chaque service à un professionnel nommé perd souvent la course aux citations IA face à une pratique solo bien bâtie de la même rue.
      </p>
      <p>
        Le Québec ajoute une seconde couche. Chaque profession réglementée dans la province est régie par un ordre. Le Barreau du Québec pour les avocats, l'Ordre des dentistes du Québec pour les dentistes, CPA Québec pour les comptables, l'Ordre professionnel de la physiothérapie du Québec pour les physiothérapeutes. Chaque ordre tient un tableau public avec une page profonde par membre. Cette page profonde est le signal d'autorité le moins cher qu'un professionnel solo québécois puisse acheter. Elle existe déjà. Le travail consiste à la lier correctement et à faire en sorte que les moteurs IA la résolvent.
      </p>
      <p>
        Les quatre piliers E-E-A-T coûtent plus cher à livrer pour une clinique parce que chaque professionnel nommé exige une construction séparée. Ils coûtent moins cher pour une pratique solo parce qu'une seule entité Person porte tout le poids. C'est pourquoi les pratiques solo qui exécutent la semaine de nettoyage voient un mouvement plus rapide que les chaînes de cliniques qui exécutent la même liste sur dix biographies de personnel.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Les quatre piliers E-E-A-T sont définis dans les Quality Rater Guidelines de Google et sont maintenant hérités par chaque moteur IA qui tire de l'index Google. Voyez la version simple sur <InternalLink to="/glossary/e-e-a-t" title="Glossaire E-E-A-T" description="Ce que veulent dire expérience, expertise, autorité et fiabilité pour les propriétaires locaux" /> et la version longue sur <InternalLink to="/blog/aeo-geo-eeat-explained-for-local-owners" title="AEO, GEO et E-E-A-T expliqués" description="Le plan de 90 jours qui séquence les trois couches" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir quel ancrage E-E-A-T manque sur votre site solo? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="experience-signature-et-compte-annees">Expérience, signature et compte d'années</h2>
      <p>
        L'expérience est le moins cher des quatre piliers à livrer et celui que la plupart des pratiques solo sautent. Le travail a deux parties. D'abord, chaque billet de blogue, chaque page FAQ, chaque page d'étude de cas doit porter une signature d'auteur nommée qui inclut une formule de compte d'années. Une avocate avec seize années de droit familial l'écrit sur la signature. Un dentiste avec onze années en dentisterie pédiatrique l'écrit. Un CPA avec huit années d'audit l'écrit. Le nombre est concret, le rôle est concret et les moteurs IA le soulèvent directement dans les citations.
      </p>
      <p>
        Ensuite, la page à propos doit porter trois paragraphes d'études de cas. Chaque paragraphe nomme la situation cliente en langage clair, nomme l'action posée par le professionnel et nomme le résultat. Pas de mesures inventées, pas de formulations vagues. Un vrai compte rendu d'un dossier de divorce clos en neuf mois, un vrai compte rendu d'un sauvetage de canal complexe, un vrai compte rendu d'une défense d'audit qui a récupéré un crédit d'impôt. Trois études de cas honnêtes sur la page à propos battent trente paragraphes de service génériques chaque fois, parce que les extraits LLM préfèrent les récits concrets aux textes marketing.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Écrivez la formule de compte d'années de la même manière sur chaque page. Un dentiste avec onze ans écrit « Onze années de dentisterie pédiatrique à Montréal » sur la page d'accueil, la page à propos, la signature, la description GBP et l'en-tête LinkedIn. La répétition entre les surfaces est ce que les moteurs IA utilisent pour confirmer que la déclaration d'expérience est réelle et pas seulement une ligne marketing.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="expertise-diplomes-certifications-ordres">Expertise, diplômes, certifications et ordres québécois</h2>
      <p>
        L'expertise est la couche de credentialing formel. Diplômes, certifications et fiche de l'ordre professionnel québécois. La page à propos devrait lister le diplôme avec l'institution et l'année. Faculté de droit de McGill 2009 se lit plus proprement que « Diplôme de droit d'une université canadienne ». Faculté de médecine dentaire de l'Université de Montréal 2014. HEC Montréal MSc en comptabilité 2017. Le nom de l'institution et l'année donnent au moteur IA une entité à résoudre contre Wikidata et les rôles d'anciens.
      </p>
      <p>
        Le numéro de membre de l'ordre est l'ancrage d'expertise le plus important au Québec. Un avocat publie le numéro de membre du Barreau. Un dentiste publie le numéro de membre de l'Ordre des dentistes. Un CPA publie le numéro de permis CPA. Un physiothérapeute publie le numéro de permis OPPQ. Le numéro ancre la pratique à une autorité réglementaire et les moteurs IA utilisent cette ancre pour confirmer que la pratique est licenciée et en règle. Cacher le numéro derrière un pied de page en petit caractère coûte de la part de citations sans raison.
      </p>
      <p>
        Les certifications s'empilent par-dessus. Un avocat qui est aussi notaire l'écrit. Une dentiste avec une certification Invisalign Diamond l'écrit. Un CPA qui est aussi titulaire de la charte CFA l'écrit. Chaque certification est une entité de plus que les moteurs IA peuvent résoudre et une raison de plus de citer la pratique au-dessus d'un profil plus mince de la même rue.
      </p>

      <SectionDivider />

      <h2 id="autorite-wikidata-et-lien-profond-ordre">Autorité, Wikidata et le lien profond vers l'ordre</h2>
      <p>
        L'autorité est la couche que la plupart des professionnels solo n'atteignent jamais parce qu'ils la confondent avec l'expertise. L'autorité est ce que d'autres sources de bonne réputation disent de la pratique, pas ce que la pratique dit d'elle-même. Les deux mouvements les moins chers à l'échelle solo sont un numéro Q Wikidata pour le professionnel nommé et un lien profond vers la fiche de l'ordre professionnel québécois.
      </p>
      <p>
        Wikidata est le graphe de connaissance ouvert que les moteurs IA utilisent comme ancre de citation. Un numéro Q est l'identifiant unique que le graphe assigne à une entité du monde réel. Bâtir un Q pour le professionnel solo et un second pour la pratique prend un après-midi plus une période de patrouille d'une semaine pour que la communauté confirme que l'entité est notable et bien sourcée. La barre de notabilité est réelle mais raisonnable. Un professionnel solo avec cinq années de pratique, une vraie adresse, une vraie fiche d'ordre et au moins une citation tierce la passe habituellement. Voyez la version longue sur <InternalLink to="/blog/wikidata-for-local-businesses" title="Wikidata pour les entreprises locales" description="La stratégie de soumission, sourçage et patrouille qui met un Q en ligne" />.
      </p>
      <p>
        Le lien profond vers l'ordre est le second mouvement. Un avocat québécois lie l'entrée du Tableau de l'Ordre sur le site du Barreau. Un dentiste lie la fiche personnelle dans le registre public de l'Ordre des dentistes. Un CPA lie la fiche du répertoire des membres CPA Québec. Un physiothérapeute lie la fiche du tableau public de l'OPPQ. Liez la page profonde de la fiche, pas la page d'accueil de l'ordre. Le lien profond est ce que les moteurs IA utilisent pour confirmer la licence. Le lien d'accueil ne porte pas le même poids de preuve.
      </p>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Une dentiste solo à Montréal veut hausser l'autorité auprès des moteurs IA en une semaine. Quelle combinaison livre le plus de poids par heure de travail?"
        options={[
          'Acheter dix listes de répertoire de basse qualité sur des réseaux de citations à l\'étranger',
          'Publier un numéro Q Wikidata avec un lien profond vers la fiche de l\'Ordre des dentistes',
          'Lancer une campagne Google Ads payée sur le nom de marque',
          'Ajouter une bande de logos de presse sans vraie couverture de presse derrière',
        ]}
        correctIndex={1}
        explanation="Le numéro Q Wikidata avec le lien profond vers la fiche publique de l'Ordre des dentistes donne aux moteurs IA deux ancres d'autorité propres qui résolvent vers de vraies sources tierces. Les autres options n'ajoutent aucun poids de citation ou nuisent activement aux scores de confiance."
      />

      <InlineCTA variant="pricing" text="Besoin d'un nettoyage E-E-A-T géré qui livre Wikidata, le lien profond vers l'ordre et la pile schema la même semaine? Voyez les forfaits AiLys à partir de 300 dollars CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="fiabilite-nap-avis-et-schema">Fiabilité, NAP, avis et schema</h2>
      <p>
        La fiabilité est la couche opérationnelle. Trois signaux portent la majorité du poids à l'échelle solo. La cohérence NAP sur les six citations principales, la cadence mensuelle d'avis clients et une pile schema propre avec types LocalBusiness et Person liés ensemble. Chaque signal est bon marché tout seul. Le gain de confiance vient de livrer les trois en même temps pour que les moteurs IA voient un profil cohérent dans une seule passe d'exploration.
      </p>
      <p>
        NAP veut dire nom, adresse, téléphone. La cohérence entre Google Business Profile, Apple Maps Connect, Pages Jaunes Canada, la fiche de l'ordre professionnel québécois, la page LinkedIn et le site de la pratique est le plancher. Une dérive sur l'une de ces six surfaces fait baisser les scores de confiance dans les modèles de récupération qui comparent les tuples d'entités entre sources d'exploration. La liste de vérification complète vit sur <InternalLink to="/glossary/nap" title="Glossaire cohérence NAP" description="Les six surfaces de citation qu'une pratique solo québécoise doit garder synchronisées" />.
      </p>
      <p>
        Les avis sont le second signal de fiabilité. Visez deux à quatre avis frais par mois avec variété bilingue. Les pratiques solo au Québec qui tirent trois avis FR et deux EN par mois surclassent les pratiques qui tirent sept avis dans une seule langue. Le mélange bilingue se lit aux moteurs IA comme la preuve que les deux moitiés du marché local sont servies.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne courez pas après une rafale unique de cinquante avis en une semaine. Les moteurs IA et Google signalent tous deux la pointe de vélocité comme suspecte et le score de confiance peut baisser au lieu de monter. Trois à cinq avis stables par mois pendant six mois battent une rafale de cinquante avis suivie du silence dans chaque jeu de données québécois que nous avons audité.</p>
      </CalloutBox>

      <p>
        Le schema est le troisième signal de fiabilité. La pile minimale pour une pratique solo est une entité LocalBusiness avec heures, adresse, téléphone et zone de service, une entité Person pour le professionnel nommé avec liens sameAs vers Wikidata et la fiche de l'ordre, une entité FAQPage avec cinq à sept questions et une Review aggregateRating qui reflète le compte d'avis Google. Sans ces quatre types schema livrés proprement, le reste du travail E-E-A-T perd du gain parce que les moteurs IA ne peuvent pas résoudre les entités en un seul profil cohérent.
      </p>

      <SectionDivider />

      <h2 id="la-semaine-de-nettoyage-eeat-solo">La semaine de nettoyage E-E-A-T pour solo</h2>
      <p>
        Les quatre ancrages se livrent en une semaine si le travail est séquencé. Jours un et deux, refaites la page à propos avec la formule de compte d'années, le diplôme avec institution et année, le numéro de l'ordre québécois et trois paragraphes d'études de cas honnêtes. Jour trois, bâtissez le numéro Q Wikidata pour le professionnel nommé et soumettez-le à la patrouille. Jour quatre, auditez le NAP sur les six citations principales et corrigez la dérive. Jour cinq, écrivez le lien profond vers la fiche de l'ordre dans la page d'accueil, la page à propos et le pied de page.
      </p>
      <p>
        Jour six, livrez la pile schema. LocalBusiness, Person, FAQPage et Review aggregateRating. Jour sept, lancez la cadence d'avis mensuelle avec un message de suivi à 24 heures qui demande au client un avis bilingue nommant le service précis reçu. La semaine se termine avec les quatre ancrages E-E-A-T en ligne et une sonde AI Visibility mesurable planifiée pour le jour trente.
      </p>
      <p>
        Les pratiques solo qui essaient de livrer les ancrages sur un trimestre au lieu d'une semaine voient un mouvement plus lent, parce que les moteurs IA explorent les surfaces selon des horaires différents et un profil partiel se lit comme un signal partiel. Livrer les quatre ancrages la même semaine est ce qui fait lire la pratique comme un profil E-E-A-T cohérent à la prochaine exploration. Voyez les playbooks d'industrie sur <InternalLink to="/industries" title="Playbooks d'industrie AiLys" description="Listes E-E-A-T séquencées par profession" /> pour la variante par métier.
      </p>

      <img
        src={meta.images.mid}
        alt="Calendrier de nettoyage E-E-A-T sur sept jours pour un professionnel solo québécois montrant page à propos, Wikidata, audit NAP, lien vers l'ordre, schema et cadence d'avis"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="comment-moteurs-ia-resolvent-entite-solo">Comment les moteurs IA résolvent une entité solo</h2>
      <p>
        ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot résolvent une entité de professionnel solo à travers trois couches. D'abord, les données structurées sur le site de la pratique (schema LocalBusiness plus Person). Ensuite, les ancres tierces (numéro Q Wikidata, fiche de l'ordre professionnel québécois, répertoires de haute autorité). Enfin, les signaux non structurés (avis, comptes d'années sur signatures, langage d'études de cas, couverture bilingue). Les moteurs pondèrent les trois couches différemment, mais un profil fort paraît cohérent dans les trois.
      </p>
      <p>
        Le mode d'échec qui coûte le plus de part de citations aux pratiques solo est la contradiction entre couches. Le schema dit une adresse. Google Business Profile en dit une autre. La fiche de l'ordre québécois en dit une troisième. Le numéro Q Wikidata est manquant. Dans ce scénario, chaque moteur IA dégrade la confiance de l'entité et cite un concurrent au profil plus mince mais cohérent. Régler les contradictions importe plus qu'élargir la surface. Un profil cohérent à quatre ancrages bat un profil tentaculaire mais contradictoire à dix ancrages chaque fois.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Lancez la sonde AI Visibility avant la semaine de nettoyage et de nouveau au jour trente. L'écart avant-après est la preuve la plus claire que le travail à quatre ancrages a bougé la part de citations. Les pratiques solo dans notre jeu de données voient typiquement la part de citations doubler dès le premier cycle de sonde après le nettoyage.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier les quatre ancrages E-E-A-T sur votre pratique solo, sans pitch, document stratégique remis quand même?" buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="mesurer-le-gain-eeat-apres-le-nettoyage">Mesurer le gain E-E-A-T après le nettoyage</h2>
      <p>
        Trois mesures suivent le gain après la semaine de nettoyage. La part de citations dans les moteurs IA sur la requête de catégorie de pratique en ville, la position dans le local pack pour la requête service principal plus ville et la cadence d'avis sur les 60 jours glissants. Le moteur AI Visibility d'AiLys exécute la sonde de part de citations sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot une fois par mois et lie le résultat au professionnel nommé et à l'entité de pratique.
      </p>
      <p>
        Le motif attendu après une semaine de nettoyage E-E-A-T propre est une montée d'une à deux positions dans le local pack en 60 à 90 jours, une part de citations qui double dans la sonde IA en un trimestre et une cadence d'avis qui se stabilise à trois à cinq avis frais par mois. Les pratiques solo qui ratent le motif ont presque toujours raté un des quatre ancrages. L'écart le plus fréquent est le numéro Q Wikidata, parce qu'il exige une période de patrouille d'une semaine que les propriétaires oublient de planifier. Le second écart le plus fréquent est le lien profond vers l'ordre, parce que les propriétaires lient la page d'accueil de l'ordre au lieu de la page personnelle.
      </p>
      <p>
        Pour une exécution gérée de la semaine de nettoyage avec la pile schema bâtie et la patrouille Wikidata prise en charge, voyez le livrable <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voir les écarts de citation avant de signer quoi que ce soit" />, puis réservez l'appel stratégique pour la variante par profession.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'E-E-A-T pour un professionnel solo, c\'est quatre ancrages livrés la même semaine. En sauter un casse la cohérence du profil.',
          'L\'expérience est le compte d\'années sur la signature plus trois paragraphes d\'études de cas sur la page à propos. Les récits concrets battent le texte générique.',
          'L\'autorité est un numéro Q Wikidata avec un lien profond vers la fiche de l\'ordre québécois, pas la page d\'accueil de l\'ordre.',
          'La fiabilité est la cohérence NAP sur les six citations principales, des avis bilingues mensuels et un schema LocalBusiness plus Person propre.',
          'Les pratiques solo qui livrent les quatre ancrages ensemble grimpent typiquement d\'une à deux positions dans le local pack en 90 jours et doublent leur part de citations IA en un trimestre.',
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
        alt="Professionnel solo québécois examinant le gain de part de citations AI Visibility sur un tableau de bord après la semaine de nettoyage E-E-A-T à quatre ancrages"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
