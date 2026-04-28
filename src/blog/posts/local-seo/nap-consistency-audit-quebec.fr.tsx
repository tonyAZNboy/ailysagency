/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  KeyTakeaway,
  InternalLink,
  SectionDivider,
} from '../../components/shared'
import { meta } from './nap-consistency-audit-quebec'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Audit de cohérence NAP pour les entreprises locales du Québec",
  metaDescription:
    "Un playbook d'audit de cohérence NAP pour les entreprises locales québécoises. Repérez chaque divergence dans 50 répertoires, fixez la fiche canonique et reconstruisez les signaux de confiance.",
  tldr:
    "Faites un audit de cohérence NAP en exportant chaque citation d'annuaire sous votre marque, en verrouillant une fiche NAP canonique, en normalisant les formats de téléphone et les noms de rue accentués, puis en corrigeant par ordre de priorité. Le Québec ajoute une couche bilingue : les noms de rue en français et les accents doivent correspondre exactement dans les 50 répertoires, sinon les moteurs IA séparent l'entité.",
  faqItems: [
    {
      question: "Comment corriger des NAP incohérents dans 50 répertoires?",
      answer:
        "Verrouillez une fiche canonique (Nom, Adresse, Téléphone dans leur forme finale), exportez chaque citation existante, regroupez les divergences en quatre catégories (nom, adresse, téléphone, heures), puis corrigez par ordre de priorité : la fiche d'établissement Google d'abord, puis les 10 principaux répertoires par autorité, ensuite la queue longue. Le Québec ajoute une couche bilingue : les noms de rue en français et les accents doivent correspondre exactement. La plupart des nettoyages sur 50 répertoires prennent 4 à 6 semaines de travail opérateur.",
    },
    {
      question: "Qu'est-ce qui compte comme une divergence NAP pour Google et les moteurs IA?",
      answer:
        "Tout ce qui brise l'appariement de l'entité. Format de téléphone différent (514-555-0100 vs (514) 555-0100), suffixe de rue différent (St. vs Saint), accents manquants ou faux sur les noms français (rue Berri vs rue Berri avec mauvais accent), nom abrégé sur une citation et nom légal complet sur une autre, numéro de suite sur certaines entrées et pas d'autres. Le moteur traite chaque variante comme une entité distincte tant qu'il ne peut pas les concilier, ce qui affaiblit le signal local pour toutes les variantes.",
    },
    {
      question: "Comment l'incohérence NAP nuit-elle spécifiquement aux commerces québécois?",
      answer:
        "Le Québec ajoute une couche bilingue que le reste de l'Amérique du Nord n'a pas. Des noms de rue comme rue Sainte-Catherine, boulevard René-Lévesque et avenue du Mont-Royal doivent porter leurs accents sur chaque citation, sinon le moteur les sépare. Le même commerce peut apparaître à la fois comme Sainte-Catherine et Sainte Catherine d'un répertoire à l'autre, et le signal de confiance se coupe en deux. Ajoutez les versions française et anglaise du nom légal et la complexité de l'audit double comparativement à un marché unilingue.",
    },
    {
      question: "Quels répertoires comptent le plus pour un audit NAP au Québec?",
      answer:
        "Commencez par la fiche d'établissement Google, Apple Business Connect, Bing Places et Yelp. Ensuite les répertoires propres au Québec : Pages Jaunes, 411.ca, Canada411 et la fiche de la Chambre de commerce de votre municipalité. Après cela, les verticales sectorielles (proches de la RAMQ pour les cliniques, Restaurants Canada pour les restos, fiches du Barreau du Québec pour les avocats). 50 répertoires est une cible raisonnable pour un commerce local québécois entièrement optimisé.",
    },
    {
      question: "Combien de temps prend un audit de cohérence NAP?",
      answer:
        "L'audit lui-même prend un à deux jours pour un seul emplacement. Les corrections prennent plus de temps parce que certains répertoires demandent une vérification humaine, des cartes postales ou des rappels téléphoniques avant d'accepter le changement. Prévoyez quatre à six semaines pour un nettoyage de 50 répertoires. Le forfait Core d'AiLys livre 5 citations par mois avec nettoyage NAP complet, Growth en livre 10, et Agency en livre 15 avec couverture bilingue français et anglais sur chaque citation.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-coherence-nap-decide-encore-du-rang-local', text: 'Pourquoi la cohérence NAP décide encore du rang local' },
    { id: 'verrouiller-la-fiche-canonique-avant-de-toucher-quoi-que-ce-soit', text: "Verrouiller la fiche canonique avant de toucher quoi que ce soit" },
    { id: 'exporter-chaque-citation-existante-version-quebec', text: 'Exporter chaque citation existante, version Québec' },
    { id: 'classer-les-divergences-en-quatre-paniers', text: 'Classer les divergences en quatre paniers' },
    { id: 'ordre-de-correction-fiche-google-d-abord-queue-longue-en-dernier', text: "Ordre de correction : fiche Google d'abord, queue longue en dernier" },
    { id: 'le-piege-bilingue-qui-ne-frappe-que-le-quebec', text: 'Le piège bilingue qui ne frappe que le Québec' },
    { id: 'maintenir-la-fiche-apres-le-nettoyage', text: 'Maintenir la fiche après le nettoyage' },
    { id: 'faq', text: 'Foire aux questions' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="Tableau de bord d'audit de cohérence NAP montrant des citations correspondantes et divergentes dans 50 répertoires québécois"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Pour corriger des NAP incohérents dans 50 répertoires, verrouillez une fiche NAP canonique (Nom, Adresse, Téléphone dans leur forme finale), exportez chaque citation existante sous votre marque, regroupez les divergences en quatre catégories, puis corrigez par ordre de priorité en commençant par la fiche d'établissement Google. Le Québec ajoute une couche bilingue : les noms de rue en français et les accents doivent correspondre exactement sur chaque citation, sinon les moteurs IA séparent l'entité en doublons et le signal de confiance s'effondre.
      </p>

      <StatHighlight
        stats={[
          { value: '50', label: "Cible de répertoires pour une entreprise locale québécoise entièrement nettoyée" },
          { value: '5 / 10 / 15', label: 'Citations par mois aux forfaits Core, Growth et Agency' },
          { value: '4 à 6 semaines', label: "Délai typique pour rattraper un retard de 50 répertoires" },
        ]}
      />

      <h2 id="pourquoi-la-coherence-nap-decide-encore-du-rang-local">Pourquoi la cohérence NAP décide encore du rang local</h2>
      <p>
        La cohérence NAP était le pilier du SEO local il y a dix ans, et elle l'est toujours. La raison tient à la façon dont Google, Apple, Bing et les principaux moteurs IA construisent les fiches d'entité. Chaque citation d'annuaire est un vote qui dit « ce commerce existe à cette adresse avec ce téléphone ». Si 47 votes sur 50 concordent et 3 divergent, le moteur traite le désaccord comme une ambiguïté, pas un bruit. Le signal de confiance pour l'entité baisse, et le rang dans le local pack baisse avec lui.
      </p>
      <p>
        Les 3 votes divergents n'ont pas besoin d'être complètement faux. Un format de téléphone différent, un accent manquant, une abréviation. Chacun fissure un peu l'appariement. Empilez cinq petites fissures dans 50 répertoires et le moteur commence à traiter votre commerce comme deux ou trois demi-entités, dont aucune ne classe aussi bien que l'original unifié.
      </p>
      <p>
        Les moteurs IA amplifient le coût. ChatGPT, Perplexity et Google AIO puisent tous dans la couche annuaire pour décider quel commerce local nommer dans une réponse. Un profil NAP fragmenté veut dire que le moteur ne peut pas nommer le commerce avec confiance, alors il nomme un concurrent avec des fiches plus propres. Voyez la <InternalLink to="/glossary/nap" title="Définition NAP" /> pour la définition complète.
      </p>

      <h2 id="verrouiller-la-fiche-canonique-avant-de-toucher-quoi-que-ce-soit">Verrouiller la fiche canonique avant de toucher quoi que ce soit</h2>
      <p>
        L'erreur la plus fréquente est de commencer le nettoyage avant de décider de la forme canonique. Les propriétaires se mettent à mettre à jour les répertoires un à la fois, chacun avec un format de téléphone ou un suffixe de rue légèrement différent, et l'audit se termine avec plus d'incohérence qu'au départ. Verrouillez la fiche d'abord, puis mettez à jour.
      </p>
      <p>
        La fiche canonique est un document avec cinq champs. Nom légal de l'entreprise dans sa forme finale exacte. Nom commercial (DBA) s'il diffère. Adresse complète avec numéro de suite, code postal et accents sur les noms de rue français. Numéro de téléphone dans un format unique (nous utilisons 514-555-0100 avec tirets, sans parenthèses, sans points). Heures d'ouverture dans le format que Google attend. Sauvegardez ce document, partagez-le avec quiconque modifie des citations, et n'en déviez jamais.
      </p>
      <p>
        Pour les commerces multi-emplacements, verrouillez une fiche canonique par emplacement. Ne laissez pas la « cohérence de marque » vous pousser vers un format d'heures unique qui cache les différences. Chaque emplacement est sa propre entité aux yeux de chaque moteur.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Décidez du format de téléphone avant de commencer. Nous standardisons à 514-555-0100 avec tirets parce que Google le parse proprement, chaque répertoire l'accepte et les moteurs IA l'extraient sans erreur de normalisation. Mélanger les parenthèses (514) 555-0100 avec le format à tirets 514-555-0100 dans 50 répertoires est la divergence NAP la plus fréquente que nous trouvons sur les audits québécois.</p>
      </CalloutBox>

      <h2 id="exporter-chaque-citation-existante-version-quebec">Exporter chaque citation existante, version Québec</h2>
      <p>
        Utilisez un agrégateur de citations (BrightLocal, Yext ou Whitespark fonctionnent tous, nous utilisons un pipeline hybride à AiLys) pour tirer chaque citation existante sous la marque. L'export devrait vous donner le nom du répertoire, le Nom, l'Adresse, le Téléphone et les Heures listés, et un score de confiance d'appariement. Pour les commerces québécois, tirez aussi de la couche annuaire francophone : Pages Jaunes, 411.ca, Canada411 en mode français, et la fiche de la Chambre de commerce municipale.
      </p>
      <p>
        Attendez-vous à trouver entre 30 et 70 citations sur un commerce moyennement établi, plus si le commerce est en place depuis une décennie. Les nouvelles entreprises avec des profils minces peuvent avoir 10 citations ou moins et ont besoin de construction plutôt que de nettoyage. La forme de l'audit change en conséquence.
      </p>
      <p>
        Comparez chaque citation à la fiche canonique. Étiquetez chaque champ qui diffère, même d'un seul caractère. La question des accents à elle seule représente habituellement 15 à 25 pour cent des divergences sur les audits québécois.
      </p>

      <h2 id="classer-les-divergences-en-quatre-paniers">Classer les divergences en quatre paniers</h2>
      <p>
        Chaque divergence tombe dans un de quatre paniers. Les trier ainsi accélère la file de corrections.
      </p>
      <ol>
        <li><strong>Divergences de nom</strong>. Abrégé ou complet, avec ou sans « Inc. », « SARL », « SENC », DBA contre nom légal, version française ou anglaise du même nom. Ce sont les corrections de plus haute priorité parce qu'elles brisent complètement l'appariement de l'entité.</li>
        <li><strong>Divergences d'adresse</strong>. Numéro de suite manquant ou faux, variantes de suffixe (Saint vs St., boulevard vs boul.), accents manquants sur les noms français, code postal avec ou sans espace. Les divergences d'adresse cassent le signal géographique, ce qui tue d'abord les requêtes « près de moi ».</li>
        <li><strong>Divergences de téléphone</strong>. Variantes de format (parenthèses contre tirets), code de pays présent ou absent, ancien numéro non retiré, télécopieur listé là où le numéro principal devrait être. Les divergences de téléphone perturbent les moteurs IA qui acheminent les clients à partir des chaînes de téléphone extraites.</li>
        <li><strong>Divergences d'heures</strong>. Heures d'ouverture différentes, heures fériées non concordantes, heures saisonnières restées sur les valeurs hors-saison. Les divergences d'heures tuent d'abord les requêtes « ouvert maintenant » et sont les plus faciles à maintenir avec la discipline de la fiche canonique.</li>
      </ol>

      <h2 id="ordre-de-correction-fiche-google-d-abord-queue-longue-en-dernier">Ordre de correction : fiche Google d'abord, queue longue en dernier</h2>
      <p>
        Corrigez par ordre de priorité. La fiche d'établissement Google d'abord, toujours. Apple Business Connect, Bing Places et Yelp ensuite. Puis les répertoires propres au Québec : Pages Jaunes, 411.ca, Canada411, la Chambre de commerce municipale. Ensuite les verticales sectorielles (Restaurants Canada, Barreau du Québec, fiches du Collège des médecins du Québec, associations d'entrepreneurs). La queue longue de petits répertoires en dernier.
      </p>
      <p>
        La raison est la propagation. La fiche d'établissement Google est la source de vérité pour la plupart des autres répertoires. Certains agrégateurs ingèrent les données GBP automatiquement, donc corriger la fiche Google d'abord nettoie 5 à 15 citations secondaires sans coût marginal. Si vous corrigez la queue longue en premier, vous risquez de devoir tout refaire après la propagation de la fiche Google.
      </p>
      <p>
        Certains répertoires demandent une vérification supplémentaire. Pages Jaunes demande parfois une carte postale, Bing Places déclenche parfois un rappel téléphonique, et Yelp peut prendre une semaine à publier un changement. Planifiez en conséquence. Voyez notre <InternalLink to="/audit/gbp" title="Audit GBP approfondi" /> pour le flux de vérification spécifique à la fiche.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Certains répertoires québécois listent les commerces en français et en anglais sans lien évident. Pages Jaunes et Yellow Pages Canada sont techniquement la même couche de données, mais la fiche française porte le nom de rue français (rue Saint-Joseph) et la fiche anglaise porte la forme anglicisée (St. Joseph St.). Mettez les deux à jour. Ne supposez pas que la version française se propage à la version anglaise.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="le-piege-bilingue-qui-ne-frappe-que-le-quebec">Le piège bilingue qui ne frappe que le Québec</h2>
      <p>
        Le Québec est le seul grand marché nord-américain avec une exigence NAP bilingue stricte. Une clinique sur la rue Sainte-Catherine apparaît dans les répertoires comme « rue Saint-Catherine », « rue Sainte-Catherine », « Saint-Catherine St. », « Sainte-Catherine Street » et la version sans accent « rue Sainte Catherine ». Chaque variante est techniquement la même adresse, mais chaque variante est une chaîne différente pour un moteur IA qui fait l'appariement d'entité.
      </p>
      <p>
        La correction est de choisir une forme et de l'imposer. Nous recommandons la forme canonique française avec accents complets, parce que la loi québécoise (Charte de la langue française) l'exige souvent pour les communications officielles, et les moteurs IA pondèrent la forme française comme primaire au Québec. Les répertoires anglophones peuvent porter le même nom de rue français avec les accents conservés (rue Sainte-Catherine, pas Saint-Catherine St.). La plupart des répertoires acceptent maintenant les accents Unicode sans casser la fiche.
      </p>
      <p>
        Pour les noms de commerce bilingues, listez le nom légal français comme primaire et le DBA anglais comme secondaire. Ne listez jamais le nom anglais comme primaire à moins que votre incorporation légale soit en anglais. L'ordre compte pour la fiche d'entité.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <h2 id="maintenir-la-fiche-apres-le-nettoyage">Maintenir la fiche après le nettoyage</h2>
      <p>
        Le nettoyage est le début, pas la fin. De nouvelles citations apparaissent chaque mois par les partenariats d'annuaires et l'ingestion d'agrégateurs. D'anciennes citations dérivent quand un répertoire met à jour son modèle de données. Sans entretien mensuel, un profil de 50 répertoires entièrement nettoyé perd typiquement la cohérence sur 5 à 10 citations par trimestre.
      </p>
      <p>
        L'entretien comporte trois volets. Premièrement, la fiche canonique reste sous gestion de versions. Tout changement (nouveau numéro de suite, nouveau téléphone, nouvelles heures) se propage d'une source unique vers les 50. Deuxièmement, la construction mensuelle de citations ajoute 5 à 15 nouvelles citations aux forfaits Core, Growth et Agency d'AiLys, toutes avec la fiche canonique. Troisièmement, un audit de dérive trimestriel relance l'export et signale tout répertoire qui ne correspond plus.
      </p>
      <p>
        Pour les commerces locaux québécois qui font ce travail à l'interne, prévoyez une demi-journée par trimestre pour l'audit de dérive. Pour les agences, le flux AiLys vit dans le tableau opérateur avec des déclencheurs de rappel quand une citation glisse hors cohérence.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Verrouillez la fiche NAP canonique avant de toucher tout répertoire.',
          'Standardisez le format de téléphone. Les tirets battent les parenthèses pour l\'extraction par les moteurs IA.',
          'Triez les divergences en quatre paniers : nom, adresse, téléphone, heures.',
          "Corrigez par ordre de priorité : fiche Google d'abord, les quatre principaux ensuite, répertoires québécois en troisième, queue longue en dernier.",
          'Le Québec demande des accents français préservés sur chaque citation, dans les répertoires francophones et anglophones.',
          'Maintenez le nettoyage avec une construction mensuelle et un audit de dérive trimestriel.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Foire aux questions</h2>
      <p>
        Vous voulez un audit NAP sur votre commerce québécois? La version gratuite revient en 24 heures et vous indique lequel des quatre paniers de divergences fuit. Le nettoyage se livre par le forfait Core et plus.
      </p>
      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes, sans pitch, document de stratégie envoyé peu importe?" buttonText="Réserver un appel" />
    </article>
  )
}
