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
import { meta } from './ailys-bilingual-content-workflow'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Le flux de contenu bilingue AiLys, EN canonique et FR-CA à l\'interne',
  metaDescription:
    "Comment AiLys gère le contenu en français québécois en parallèle avec l'anglais. EN canonique d'abord, FR-CA rédigé à la main par une rédactrice bilingue à l'interne, sans API de traduction. Idiomes québécois et orthographes régionales préservés.",
  tldr: "Oui, AiLys gère le contenu en français québécois aussi bien que l'anglais, parce que chaque article et chaque livrable passe par un flux bilingue avec deux rédacteurs humains. La version anglaise est la première ébauche canonique, écrite pour l'index de recherche canadien et nord-américain plus large. La version en français québécois est la deuxième passe rédigée à la main par une personne bilingue à l'interne, qui garde les idiomes québécois (courriel, magasiner, fin de semaine), les orthographes régionales et la discipline de marque que la traduction machine brise. Aucune API de traduction à aucune étape.",
  faqItems: [
    {
      question: "AiLys gère-t-elle le contenu en français québécois aussi bien que l'anglais?",
      answer:
        "Oui. Chaque article de blogue, publication GBP, réécriture de citation et livrable d'audit sort en anglais et en français québécois la même semaine. L'équipe est bilingue à l'interne, la version anglaise est la première ébauche canonique, et la version en français québécois est rédigée à la main par une personne bilingue à l'interne avec les idiomes québécois et les orthographes régionales préservés. AiLys n'utilise pas d'API de traduction à aucune étape du flux.",
    },
    {
      question: "Pourquoi AiLys n'utilise-t-elle pas d'API de traduction pour le contenu en français québécois?",
      answer:
        "Trois raisons. Premièrement, le français québécois a des orthographes régionales (courriel au lieu de email, magasiner au lieu de shopping, fin de semaine au lieu de weekend) que les API de traduction défaussent vers le français de France. Deuxièmement, les noms de marque ont besoin d'une cohérence en alphabet latin (AiLys, Reviuzy, ChatGPT, Perplexity) que les API de traduction localisent parfois mal. Troisièmement, le rythme de phrase en français québécois rédigé à la main se lit comme natif aux yeux des commerçants locaux et des moteurs de recherche, alors que la sortie machine se lit comme étrangère et érode les signaux de classement avec le temps.",
    },
    {
      question: 'Combien de temps prend le flux bilingue par article?',
      answer:
        "Un article standard de 1 500 à 2 000 mots prend une journée de travail complète bout en bout. La première ébauche canonique anglaise prend environ trois heures incluant la recherche, le plan et la révision. La passe en français québécois prend environ deux heures parce que la structure est partagée et la rédactrice bilingue adapte la prose plutôt que de reconstruire l'article. Les deux versions sortent dans le même commit, avec les hreflang reliés dans les meta. Pour les contenus plus courts (publications GBP, mises à jour de FAQ, réécritures de citations), le flux prend 30 à 60 minutes au total.",
    },
    {
      question: "Qu'est-ce qui est adapté versus traduit dans la passe en français québécois?",
      answer:
        "Les titres, les exemples, les appels à l'action et les tournures idiomatiques sont adaptés. Le vocabulaire technique (UTM, GA4, GBP, Loi 25, AI Visibility) reste cohérent à travers les deux versions, avec la formulation québécoise appliquée à la prose de connexion. La devise reste en CAD avec le signe dollar à droite en français (300 dollars CAD) et à gauche en anglais (300 $ CAD). Les prix, les délais et les affirmations techniques restent identiques pour garder la posture d'audit cohérente à travers les langues.",
    },
    {
      question: 'AiLys peut-elle livrer un flux où le français québécois passe en premier si le public est surtout au Québec?',
      answer:
        "Oui. Pour les clients à audience québécoise d'abord, le flux s'inverse : le français québécois devient la première ébauche canonique, et la version anglaise est la deuxième passe rédigée à la main pour le reste du Canada. L'équipe est bilingue dans les deux directions et le seuil de qualité est le même. Le défaut est l'anglais d'abord parce que l'index de recherche plus large sert un public plus vaste, mais l'inversion québécoise est un changement d'une ligne dans le doc d'intégration client.",
    },
    {
      question: 'Comment AiLys vérifie-t-elle la qualité du français québécois avant publication?',
      answer:
        "Trois vérifications avant la publication. D'abord, un nettoyage automatique des tirets cadratins, des phrases de signature IA et des orthographes du français de France (le linter capte email au lieu de courriel, weekend au lieu de fin de semaine, shopping au lieu de magasiner). Ensuite, une révision humaine par la deuxième personne bilingue qui lit pour le rythme de phrase et la voix de marque. Troisièmement, un balayage final pour les hreflang et les meta tags. La barrière à trois étapes prend moins de 20 minutes par article et expédie zéro sortie d'API de traduction sur le site en ligne.",
    },
  ],
  headings: [
    { id: 'pourquoi-le-flux-bilingue-est-le-defaut-quebecois', text: 'Pourquoi le flux bilingue est le défaut québécois' },
    { id: 'le-schema-en-canonique-fr-ca-deuxieme', text: 'Le schéma EN canonique, FR-CA deuxième' },
    { id: 'la-regle-des-idiomes-quebecois', text: 'La règle des idiomes québécois, courriel et magasiner' },
    { id: 'pas-d-api-de-traduction-la-regle-stricte', text: "Pas d'API de traduction, la règle stricte et pourquoi" },
    { id: 'ce-qui-est-adapte-versus-traduit', text: 'Ce qui est adapté versus traduit dans la passe FR-CA' },
    { id: 'la-barriere-de-qualite-avant-publication', text: 'La barrière de qualité avant la publication' },
    { id: 'comment-le-flux-tient-la-cadence-truvizy', text: 'Comment le flux tient la cadence Truvizy' },
    { id: 'quand-inverser-vers-fr-ca-d-abord', text: "Quand inverser vers FR-CA d'abord pour un client uniquement québécois" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les commerçants locaux québécois posent la même question au premier appel de vente. Est-ce qu'AiLys gère le contenu en français québécois aussi bien que l'anglais? La réponse honnête, c'est oui, parce que chaque article et chaque livrable passe par un flux bilingue avec deux rédacteurs humains. La version anglaise est la première ébauche canonique, écrite pour l'index de recherche canadien et nord-américain plus large. La version en français québécois est la deuxième passe rédigée à la main par une personne bilingue à l'interne, qui garde les idiomes québécois, les orthographes régionales et la discipline de marque que la traduction machine brise. Aucune API de traduction à aucune étape.
      </p>

      <StatHighlight
        stats={[
          { value: '2 rédacteurs', label: 'Équipe bilingue à l\'interne pour chaque article' },
          { value: '1 journée', label: 'Temps bout en bout pour un article de 1 500 à 2 000 mots dans deux langues' },
          { value: '0 API', label: 'Aucune API de traduction à aucune étape du flux' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-le-flux-bilingue-est-le-defaut-quebecois">Pourquoi le flux bilingue est le défaut québécois</h2>
      <p>
        Le Québec est un marché bilingue avec le français comme langue principale pour la plupart des requêtes locales et l'anglais comme langue secondaire pour les publics anglophones du Canada et transfrontaliers. Un commerce local qui sort du contenu dans une seule langue perd la moitié de l'index de recherche, et un commerce qui sort du français traduit par machine perd la confiance de chaque lectrice ou lecteur québécois qui remarque le rythme étranger dans le premier paragraphe.
      </p>
      <p>
        AiLys sort chaque livrable dans les deux langues parce que le coût de sauter la deuxième langue s'accumule sur une année de production de contenu. L'article de blogue qui gagne une citation dans ChatGPT en anglais a besoin de la paire en français québécois pour gagner la citation correspondante dans les moteurs IA francophones. La publication GBP qui génère des réservations en anglais a besoin de la paire en français québécois pour le même gain de conversion sur le côté français de Google Maps.
      </p>
      <p>
        Le flux chez AiLys est bâti autour de deux rédacteurs humains, tous deux bilingues, avec un transfert clair entre l'ébauche canonique et la passe en deuxième langue. La structure est répétable à travers les articles de blogue, les publications GBP, les réécritures de citations, les pages FAQ, les livrables d'audit et l'interface de la plateforme elle-même. Le résultat, c'est un seul seuil de qualité dans deux langues, sans API de traduction et sans français de France qui se glisse dans le contenu québécois.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La ventilation complète de comment AiLys se compare aux agences traditionnelles sur cette dimension est couverte dans le compagnon <InternalLink to="/blog/ailys-vs-traditional-seo-agency" title="AiLys vs agence SEO traditionnelle" description="La comparaison québécoise sur les tarifs, la vitesse d'audit et la portée bilingue" />. Les deux articles lus ensemble couvrent la pile de contenu AiLys de bout en bout.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit gratuit qui inclut une révision du contenu en français québécois? L'audit AI Visibility en 24 heures arrive avec une vérification de préparation bilingue sans coût supplémentaire." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="le-schema-en-canonique-fr-ca-deuxieme">Le schéma EN canonique, FR-CA deuxième</h2>
      <p>
        Le défaut chez AiLys, c'est l'anglais en première canonique, le français québécois en deuxième passe. La rédactrice anglaise écrit l'article pour l'index de recherche canadien et nord-américain plus large, incluant tous les éléments structurels : plan H2, items de FAQ, liens internes, appels à l'action et meta description. La rédactrice francophone reprend l'ébauche canonique, adapte la prose pour les idiomes québécois et la voix de marque, et sort la version FR-CA dans le même commit.
      </p>
      <p>
        Le transfert se fait au niveau structurel, pas au niveau de la phrase. La rédactrice francophone lit l'article anglais en entier, intériorise l'argument et les appels à l'action, et écrit la version en français québécois comme une ébauche native parallèle. La structure reste partagée à travers les deux langues, mais la prose est rédigée à la main dans chaque langue avec le rythme d'une personne native.
      </p>
      <p>
        Les deux versions sortent dans le même commit, avec les hreflang reliés dans les meta et inscrits dans le système de blogue. La personne qui atterrit sur la version anglaise voit la version FR-CA dans le sélecteur de langue, et vice versa. Les moteurs de recherche de chaque côté voient deux pages canoniques parallèles, ce qui est la posture hreflang la plus propre pour un commerce local bilingue.
      </p>

      <h3>Le schéma à deux passes en un tableau</h3>
      <ul>
        <li>EN canonique : recherche, plan, ébauche complète, FAQ, appels à l'action, meta description, liens internes</li>
        <li>FR-CA deuxième passe : ébauche native parallèle adaptée pour les idiomes québécois, les orthographes régionales et la voix de marque</li>
        <li>Structure partagée : plan H2, nombre de FAQ, cibles de liens internes, intention du texte alt des images</li>
        <li>Éléments adaptés : idiomes, exemples, formulation des appels à l'action, placement de la devise</li>
        <li>Éléments tenus cohérents : vocabulaire technique tenu cohérent à travers les deux versions pour la posture d'audit</li>
      </ul>

      <SectionDivider />

      <h2 id="la-regle-des-idiomes-quebecois">La règle des idiomes québécois, courriel et magasiner</h2>
      <p>
        Le français québécois utilise des orthographes régionales et des idiomes que le français de France n'utilise pas. Les marqueurs classiques sont courriel au lieu de email, magasiner au lieu de shopping, fin de semaine au lieu de weekend, dépanneur pour magasin de proximité, stationnement pour parking. La liste est plus longue que les marqueurs que la plupart des opérateurs vérifient, et la discipline, c'est d'intérioriser l'habitude régionale plutôt que d'entretenir une liste de corrections manuelles.
      </p>
      <p>
        Les API de traduction défaussent vers le français de France parce que les données d'entraînement sont dominées par les sources hexagonales. La sortie se lit comme étrangère à une lectrice québécoise dans le premier paragraphe, ce qui érode la confiance et les signaux de classement sur le côté québécois de l'index de recherche. La solution, ce n'est pas une passe de post-traitement sur la sortie de l'API. La solution, c'est d'écrire le français québécois nativement, avec les idiomes intégrés dès la première ébauche.
      </p>
      <p>
        AiLys roule un linter automatique qui capte les marqueurs de français de France les plus courants (email, weekend, shopping, voiture dans le mauvais contexte, smartphone au lieu de téléphone intelligent en copie formelle) avant la publication. Le linter est un filet de sécurité, pas la discipline principale. La discipline principale, c'est d'embaucher des rédactrices et rédacteurs bilingues qui écrivent le français québécois comme défaut.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le signe le plus courant de traduction machine en français québécois, c'est le rythme verbe-nom du français de France. Une rédactrice québécoise native dit On vous rappelle dans la journée. Une API de traduction dit Nous vous rappellerons dans la journée. La première se lit comme native, la deuxième se lit comme un mémo d'affaires traduit. Cinq secondes de lecture vous dit laquelle a été expédiée, et les lectrices et lecteurs québécois remarquent à chaque fois.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pas-d-api-de-traduction-la-regle-stricte">Pas d'API de traduction, la règle stricte et pourquoi</h2>
      <p>
        La règle stricte chez AiLys, c'est aucune API de traduction à aucune étape du flux. Pas Anthropic, pas Google Translate, pas DeepL, pas OpenAI, pas aucun autre service de traduction machine. La règle couvre les articles de blogue, les publications GBP, les réécritures de citations, les livrables d'audit, les pages FAQ et l'interface de la plateforme elle-même. La règle est appliquée au niveau du flux et au niveau du linter, avec une vérification de pré-publication qui roule sur chaque commit.
      </p>
      <p>
        La raison de la règle stricte, c'est le coût cumulatif de la traduction machine dans un contexte de commerce local. Une seule expression en français de France dans un article québécois ne coûte rien isolément. Une année de production de contenu avec un taux de traduction machine de 5 pour cent s'accumule en une bibliothèque de contenu qui se lit comme étrangère aux lectrices et lecteurs locaux et se classe sous les compétiteurs rédigés à la main sur le côté québécois de l'index de recherche. L'inverse est aussi vrai sur le côté anglais, où un article québécois traduit se lit comme maladroit pour une lectrice de Toronto ou Vancouver.
      </p>
      <p>
        La règle est l'un des différenciateurs porteurs d'AiLys versus les agences traditionnelles qui sous-traitent la copie française. L'équipe bilingue à l'interne est le centre de coût qui permet à la règle de tenir à travers des centaines de livrables par trimestre sans briser le calendrier de production. Pour voir la posture bilingue en action à travers un livrable réel, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Inclut un échantillon de contenu en français québécois pour montrer le rythme et la discipline d'orthographe régionale" /> et révisez la section FR-CA du rapport en parallèle avec la section EN.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel est le sens par défaut du flux de contenu chez AiLys pour un client local québécois?"
        options={[
          'Français québécois canonique en premier, anglais en deuxième passe',
          'Anglais canonique en premier, français québécois rédigé à la main en deuxième passe sans API de traduction',
          'Une seule rédactrice bilingue rédige les deux versions en une seule passe',
          'Traduction machine sur le côté FR-CA avec une passe de nettoyage humaine',
        ]}
        correctIndex={1}
        explanation="Le défaut, c'est l'anglais canonique en premier parce que l'index de recherche canadien et nord-américain plus large sert un public plus vaste, avec la version en français québécois rédigée à la main en deuxième passe par une rédactrice bilingue à l'interne. Aucune API de traduction à aucune étape. Pour les clients québécois d'abord, le sens peut s'inverser sur demande, mais la règle de deux rédacteurs humains et la règle de zéro API tiennent dans les deux cas."
      />

      <SectionDivider />

      <h2 id="ce-qui-est-adapte-versus-traduit">Ce qui est adapté versus traduit dans la passe FR-CA</h2>
      <p>
        La passe en français québécois adapte plus qu'elle ne traduit. Les titres sont réécrits dans le rythme français natif, pas convertis mot pour mot. Les exemples sont localisés quand la version anglaise utilise un repère de Toronto ou Vancouver et que la version française se lit mieux avec une référence montréalaise ou de la ville de Québec. Les appels à l'action sont reformulés avec le rythme verbe-nom québécois. Les idiomes sont remplacés en bloc.
      </p>
      <p>
        Le vocabulaire technique reste cohérent à travers les deux versions. UTM, GA4, GBP, Loi 25, AI Visibility, Measurement Protocol, JSON-LD et les termes similaires gardent la même forme dans les deux langues. Les noms de marque restent en alphabet latin partout. Les prix, les délais et les affirmations techniques restent identiques pour garder la posture d'audit cohérente à travers les langues. Une lectrice qui compare les deux versions voit un sens parallèle avec un rythme natif dans chaque langue, pas une paire traduite.
      </p>
      <p>
        Le placement de la devise est l'un des petits détails qui signale la rédaction native. En anglais, le signe dollar va à gauche (300 $ CAD). En français, le signe ou le mot va à droite (300 dollars CAD ou 300 $ CAD). La convention est petite, mais la lectrice remarque quand c'est faux, et un moteur de recherche lit la cohérence comme un signal d'authenticité régionale avec le temps.
      </p>

      <img
        src={meta.images.mid}
        alt="Tableau adapté versus traduit montrant quels éléments restent cohérents à travers EN et FR-CA chez AiLys, incluant le placement de la devise et les règles d'idiomes"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="la-barriere-de-qualite-avant-publication">La barrière de qualité avant la publication</h2>
      <p>
        Trois vérifications contrôlent chaque article bilingue avant la publication. D'abord, un linter automatique balaye les deux versions pour les tirets cadratins, les phrases de signature IA et les orthographes du français de France sur le côté FR-CA. Le linter capte email au lieu de courriel, weekend au lieu de fin de semaine, shopping au lieu de magasiner, et les signes de traduction machine les plus courants. Le linter roule en moins de 30 secondes et bloque le commit si un drapeau se déclenche.
      </p>
      <p>
        Ensuite, la deuxième rédactrice bilingue lit la version FR-CA pour le rythme de phrase et la voix de marque. La révision est courte (environ 10 minutes pour un article de 1 500 mots) et capte ce que le linter automatique manque : rythme verbe-nom maladroit, dérive de voix de marque, structure de callout qui ne fait pas le parallèle avec la version EN. La personne qui révise approuve avec un seul commentaire dans le message de commit.
      </p>
      <p>
        Troisièmement, un balayage final vérifie les hreflang, la longueur de la meta description, la parité de schema FAQ et les cibles de liens internes. Le balayage roule comme hook pré-commit et confirme que les deux versions sont reliées correctement dans le système de blogue avant que le commit atterrisse. La barrière à trois étapes prend moins de 20 minutes par article et expédie zéro sortie d'API de traduction sur le site en ligne.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le moyen le plus rapide de vérifier qu'un article en français québécois passe le seuil de qualité AiLys, c'est de lire les trois premiers paragraphes à voix haute. Si le rythme sonne comme une conversation de café à Montréal, c'est sorti correctement. Si ça sonne comme un mémo d'affaires traduit, l'article a besoin d'une autre passe. Le test de la lecture à voix haute, c'est ce que chaque rédactrice AiLys roule avant de soumettre l'ébauche FR-CA pour révision.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-le-flux-tient-la-cadence-truvizy">Comment le flux tient la cadence Truvizy</h2>
      <p>
        Le flux bilingue sort à la cadence Truvizy d'un article tous les deux jours, avec les deux langues dans le même commit. La cadence est durable parce que le travail structurel (recherche, plan, conception de FAQ) se fait une seule fois pour les deux langues, et la deuxième rédactrice se concentre sur l'adaptation de la prose plutôt que de bâtir un article parallèle à partir de zéro. Un article de 1 500 à 2 000 mots prend une journée de travail bout en bout à travers les deux rédactrices.
      </p>
      <p>
        Pour les contenus plus courts (publications GBP, mises à jour de FAQ, réécritures de citations), le flux se compresse à 30 à 60 minutes au total. La rédactrice anglaise écrit le contenu court, la rédactrice francophone l'adapte en 15 minutes, et le linter plus la barrière de qualité prennent 10 minutes de plus. Le flux compressé, c'est ce qui permet à AiLys de sortir des publications GBP hebdomadaires en deux langues à l'échelle à travers des centaines de clients par trimestre.
      </p>
      <p>
        Pour les articles piliers plus longs (2 500 à 4 000 mots), le flux s'étend à deux jours de travail à travers les deux rédactrices, avec une passe de révision additionnelle pour la version FR-CA. Le coût de la révision additionnelle, c'est le coût d'avoir le rythme du français québécois long format correct à l'échelle. Les articles piliers qui se lisent natifs dans les deux langues gagnent plus de citations dans les deux écosystèmes de moteurs IA, ce qui est la métrique qui justifie l'investissement de temps.
      </p>

      <SectionDivider />

      <h2 id="quand-inverser-vers-fr-ca-d-abord">Quand inverser vers FR-CA d'abord pour un client uniquement québécois</h2>
      <p>
        Pour les clients dont l'audience est québécoise à 90 pour cent ou plus, le sens du flux s'inverse. Le français québécois devient la première ébauche canonique, et la version anglaise est la deuxième passe rédigée à la main pour le reste du Canada et les publics transfrontaliers. L'inversion est une préférence d'une ligne dans le doc d'intégration client, et l'équipe est bilingue dans les deux directions.
      </p>
      <p>
        L'inversion compte pour deux raisons. Premièrement, l'ébauche canonique fixe le ton, les exemples et les appels à l'action de l'article. Une ébauche canonique québécoise utilise les repères de Montréal et de la ville de Québec, les idiomes québécois et les prix CAD dans le rythme français natif. La deuxième passe anglaise adapte ces éléments pour le public plus large sans perdre la posture québécoise. Deuxièmement, les hreflang et l'URL canonique sur le côté québécois portent le poids SEO en premier, ce qui correspond à la distribution d'audience.
      </p>
      <p>
        Pour la plupart des clients AiLys, l'audience est bilingue avec une majorité québécoise mais une part anglophone significative, alors le défaut EN canonique tient. Pour les clients uniquement québécois (une clinique à Sherbrooke, un restaurant à Québec, un entrepreneur au Saguenay-Lac-Saint-Jean), l'inversion FR-CA canonique est le meilleur ajustement. Le choix est documenté dans le doc d'intégration et révisé chaque trimestre. Pour comparer la portée et les tarifs à travers les forfaits AiLys qui incluent le flux bilingue, voyez le compagnon <InternalLink to="/blog/ailys-pricing-tiers-explained-cad" title="Forfaits AiLys expliqués" description="Les quatre paliers de Starter à Agency, en CAD" /> et lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Inclut la révision de préparation du contenu bilingue" /> pour une base.
      </p>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys, qui incluent tous le flux de contenu bilingue sans coût supplémentaire. Starter à 300 dollars CAD jusqu'à Agency à 2 499 dollars CAD." buttonText="Voir les forfaits" />

      <SectionDivider />

      <p>
        Le flux bilingue est la colonne vertébrale opérationnelle de la production de contenu AiLys. Le schéma à deux rédacteurs, la règle de zéro API, la discipline des idiomes québécois et la barrière de qualité à trois étapes produisent ensemble une bibliothèque de contenu qui se lit native dans les deux langues et gagne des citations dans les deux écosystèmes de moteurs IA. Le coût est borné par la taille de l'équipe à l'interne, et le seuil de qualité tient à travers des centaines de livrables par trimestre sans que la traduction machine ne se glisse dans la production.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel de 60 minutes pour passer en revue le flux bilingue sur votre commerce et votre mélange d'audience? Doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "AiLys gère le contenu en français québécois aussi bien que l'anglais, avec deux rédacteurs humains et zéro API de traduction.",
          "Le flux par défaut, c'est l'anglais canonique en premier, le français québécois rédigé à la main en deuxième passe.",
          'Les idiomes québécois (courriel, magasiner, fin de semaine) et les orthographes régionales sont préservés, avec un linter automatique comme filet de sécurité.',
          "Le vocabulaire technique, les prix et les délais restent cohérents à travers les deux versions pour la posture d'audit.",
          "La barrière de qualité à trois étapes (linter, révision humaine, balayage hreflang) prend moins de 20 minutes par article et expédie zéro contenu traduit par machine sur le site en ligne.",
          "Pour les clients uniquement québécois, le flux s'inverse vers FR-CA d'abord et EN deuxième sur un changement de préférence d'une ligne.",
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
        alt="Carte récapitulative montrant le flux de contenu bilingue AiLys avec le schéma à deux passes, la règle de zéro API et la barrière de qualité à trois étapes"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
