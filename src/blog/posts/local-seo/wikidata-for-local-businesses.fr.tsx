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
import { meta } from './wikidata-for-local-businesses'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Wikidata pour commerces locaux, le guide honnête 2026',
  metaDescription:
    "Wikidata vaut-elle l'effort pour un commerce à un seul emplacement? Guide honnête sur les Q-numéros, les IDs externes, le schéma et quand AiLys s'en charge.",
  tldr: "Wikidata est le graphe de connaissances structuré que les moteurs IA et Google lisent pour départager les marques. Pour un commerce à un seul emplacement, le ROI est réel mais modeste, quelques pourcents de gain de citations dans ChatGPT et Perplexity sur six mois. AiLys s'occupe de Wikidata dans les forfaits Growth et Agency avec l'API MediaWiki et les IDs externes (CID GBP, OpenCorporates, sameAs schema.org). Nous ne touchons pas à Wikipedia.",
  faqItems: [
    {
      question: "Wikidata vaut-elle l'effort pour un commerce à un seul emplacement?",
      answer:
        "Réponse honnête : modestement oui. Un dentiste ou un restaurant à un seul emplacement au Québec verra un petit gain de taux de citations dans ChatGPT et Perplexity sur six mois une fois qu'un Q-numéro est créé avec des IDs externes propres. Le gain n'est pas transformationnel comme une refonte GBP, mais il est réel et durable. L'effort est d'environ 90 minutes pour un opérateur compétent la première fois.",
    },
    {
      question: "Qu'est-ce qu'un Q-numéro Wikidata?",
      answer:
        "Un Q-numéro est l'identifiant unique attribué à chaque item Wikidata, écrit Q12345. Votre commerce reçoit un Q-numéro lors de la création de l'entrée. Le Q-numéro est ce que les moteurs IA et le Knowledge Graph de Google utilisent pour distinguer votre marque d'autres commerces au nom semblable n'importe où dans le monde. Sans Q-numéro, vous êtes une chaîne de caractères. Avec un Q-numéro, vous êtes une entité.",
    },
    {
      question: "Wikidata exige-t-elle un article Wikipedia d'abord?",
      answer:
        "Non. Wikidata est un projet distinct avec des règles de notoriété plus souples. Un commerce local peut avoir un Q-numéro sans article Wikipedia, à condition que l'entrée cite des sources externes fiables (votre fiche GBP, votre enregistrement OpenCorporates, un balisage schema.org sur votre site). AiLys ne touche jamais à Wikipedia, c'est hors portée. Nous travaillons uniquement sur Wikidata, qui est la couche que les moteurs IA lisent vraiment.",
    },
    {
      question: "Quels IDs externes faut-il lier dans mon entrée Wikidata?",
      answer:
        "Au minimum : le CID Google Business Profile (le long ID numérique de votre URL GBP), l'enregistrement OpenCorporates si vous êtes incorporé au Québec ou au fédéral, et votre site web avec un lien sameAs en retour dans le balisage schema.org. Optionnel mais utile : Yelp, page Facebook, page LinkedIn et tout répertoire local que l'opérateur utilise déjà. Plus il y a d'IDs externes sourcés, plus la désambiguïsation est forte.",
    },
    {
      question: "AiLys fait-elle le travail Wikidata dans un forfait payant?",
      answer:
        "Oui, dans le forfait Growth à 1 499 dollars CAD par mois et le forfait Agency à 2 499 dollars CAD par mois. Les forfaits Starter et Core ne couvrent pas Wikidata parce que le ROI est trop mince pour le palier d'entrée. Nous utilisons l'API MediaWiki pour rédiger et soumettre les modifications semi-automatiquement, puis un humain révise chaque modification avant qu'elle parte. Les opérateurs québécois reçoivent le même traitement que les opérateurs canadiens-anglais.",
    },
    {
      question: "Une entrée Wikidata peut-elle être supprimée par un autre éditeur?",
      answer:
        "Oui, c'est le vrai risque. Les entrées Wikidata peuvent être marquées pour suppression si la notoriété est contestée, surtout pour les très petits commerces sans couverture de presse. La défense, c'est de citer de vraies sources externes au moment de la création (GBP, OpenCorporates, un article de journal local s'il existe) et d'éviter le langage promotionnel. AiLys utilise une formulation encyclopédique neutre qui survit le plus souvent à la révision de suppression.",
    },
  ],
  headings: [
    { id: 'ce-qu-est-vraiment-wikidata', text: "Ce qu'est vraiment Wikidata" },
    { id: 'pourquoi-les-moteurs-ia-la-lisent', text: 'Pourquoi les moteurs IA la lisent' },
    { id: 'q-numeros-et-ids-externes-expliques', text: 'Q-numéros et IDs externes expliqués' },
    { id: 'creer-une-entree-wikidata-etape-par-etape', text: 'Créer une entrée Wikidata, étape par étape' },
    { id: 'cablage-schema-org-sameas', text: 'Câblage schema.org sameAs vers Wikidata' },
    { id: 'le-roi-honnete-pour-un-seul-emplacement', text: 'Le ROI honnête pour un seul emplacement' },
    { id: 'quand-ailys-le-fait-pour-vous', text: 'Quand AiLys le fait pour vous' },
    { id: 'erreurs-courantes-et-risque-de-suppression', text: 'Erreurs courantes et risque de suppression' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Wikidata est le graphe de connaissances structuré que ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot lisent pour départager les noms de marques. Pour un commerce local à un seul emplacement au Québec, obtenir un Q-numéro Wikidata est un gain modeste mais durable d'AI Visibility, quelques pourcents de croissance du taux de citations sur six mois. Le travail prend environ 90 minutes la première fois, puis 15 minutes par trimestre pour l'entretien. Ce guide couvre ce qu'est Wikidata, comment créer une entrée, comment la câbler à votre balisage schema.org, et quand AiLys s'en charge dans le forfait Growth ou Agency.
      </p>

      <StatHighlight
        stats={[
          { value: '1 499 à 2 499 $', label: 'Forfaits AiLys avec Wikidata inclus' },
          { value: '24 heures', label: "Délai de l'audit AiLys gratuit" },
          { value: '5 à 15', label: 'Citations par mois aux paliers Core à Agency' },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-qu-est-vraiment-wikidata">Ce qu'est vraiment Wikidata</h2>
      <p>
        Wikidata est une base de connaissances libre et collaborative gérée par la Wikimedia Foundation. Elle stocke des données structurées sur presque toutes les entités notables de la planète : personnes, lieux, commerces, livres, films, concepts. Chaque entité a un identifiant Q-numéro unique, un ensemble de propriétés (P-numéros) et des liens vers des IDs externes sur d'autres bases. Le tout est interrogeable par SPARQL et l'API MediaWiki.
      </p>
      <p>
        Pour un commerce local, Wikidata n'est pas un canal de marketing. Personne ne lit Wikidata directement. La valeur est en aval : les moteurs IA et le Knowledge Graph de Google utilisent Wikidata comme source de désambiguïsation. Quand ChatGPT ou Perplexity doit décider quelle « Boulangerie Laurent » vous êtes parmi trois commerces aux noms semblables dans des villes différentes, Wikidata est l'une des couches consultées.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Wikidata est distincte de Wikipedia. Un commerce peut avoir une entrée Wikidata sans jamais paraître dans Wikipedia. La barre de notoriété est beaucoup plus basse sur Wikidata, et le processus d'édition est plus structuré. AiLys travaille uniquement sur Wikidata. L'édition Wikipedia est hors portée selon notre politique interne, parce que les règles de conflit d'intérêts autour de l'édition rémunérée de Wikipedia sont strictes et la valeur est plus faible que les gens supposent.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pourquoi-les-moteurs-ia-la-lisent">Pourquoi les moteurs IA la lisent</h2>
      <p>
        Trois raisons. Premièrement, Wikidata est structurée par conception, chaque énoncé est un triplet sujet, prédicat, objet, ce qui est exactement le format que préfèrent les pipelines d'entraînement LLM et les systèmes de récupération. Deuxièmement, Wikidata est sous licence ouverte CC0, donc les moteurs IA peuvent ingérer le dump complet sans friction de licence. Troisièmement, Wikidata est multilingue au niveau de l'entité, le même Q-numéro sert les requêtes en anglais, français, espagnol, arabe et chinois en même temps.
      </p>
      <p>
        Pour un commerce local québécois, l'aspect multilingue est l'avantage le plus sous-estimé. Une seule entrée Wikidata avec des étiquettes en français et en anglais lift la part de citations dans les deux langues sans dupliquer le travail. Le moteur AI Visibility AiLys a mesuré des améliorations de taux de citations qui apparaissent d'abord dans Perplexity (qui interroge Wikidata directement), puis dans ChatGPT et Gemini dans les semaines suivantes à mesure que leurs données d'entraînement se rafraîchissent.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir si votre commerce a déjà un Q-numéro Wikidata? L'audit AI Visibility gratuit en 24 heures vérifie." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="q-numeros-et-ids-externes-expliques">Q-numéros et IDs externes expliqués</h2>
      <p>
        Chaque item Wikidata reçoit un Q-numéro à la création, écrit Q suivi de chiffres, comme Q12345. Le Q-numéro ne change jamais. Une fois que votre commerce a un Q-numéro, ce numéro devient la référence canonique dans tous les systèmes qui lisent Wikidata, incluant le Knowledge Graph Google, les liens sameAs schema.org et les données d'entraînement des moteurs IA.
      </p>
      <p>
        Les IDs externes sont le second concept clé. Wikidata stocke une longue liste de propriétés dont la valeur est un ID sur une autre base. Pour un commerce local, les utiles sont :
      </p>
      <ul>
        <li>P3749 (CID Google Business Profile) : le long ID numérique au bout de votre URL GBP</li>
        <li>P1320 (ID OpenCorporates) : votre numéro d'enregistrement corporatif fédéral ou québécois</li>
        <li>P856 (site officiel) : votre domaine canonique</li>
        <li>P2002 (X), P2013 (Facebook), P4264 (LinkedIn) : présence sociale</li>
        <li>P1448 (nom officiel dans la langue source) et P1813 (nom court) : pour l'étiquette en français du Québec</li>
      </ul>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le signal le plus fort que vous pouvez donner à une entrée Wikidata, c'est un bloc dense d'IDs externes avec au moins trois IDs qui résolvent. Les moteurs IA utilisent le nombre et la résolvabilité des IDs externes comme proxy de confiance d'entité. Une nouvelle entrée avec seulement un lien vers le site est fragile. Une nouvelle entrée avec CID GBP, enregistrement OpenCorporates et page Facebook est beaucoup plus difficile à contester en révision de suppression et est citée à des taux plus élevés par les moteurs IA.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="creer-une-entree-wikidata-etape-par-etape">Créer une entrée Wikidata, étape par étape</h2>
      <p>
        Le flux de travail honnête pour un opérateur compétent la première fois :
      </p>
      <ol>
        <li>Créez un compte Wikidata sur wikidata.org. Utilisez un vrai nom, l'historique du compte est public.</li>
        <li>Cherchez d'abord le nom de votre commerce sur Wikidata. Si un Q-numéro existe déjà, revendiquez-le et améliorez-le au lieu de créer un doublon.</li>
        <li>Si aucune entrée n'existe, cliquez Créer un nouvel élément. Ajoutez l'étiquette en anglais, l'étiquette en français (avec graphie québécoise au besoin) et une courte description comme « clinique dentaire à Montréal » dans les deux langues.</li>
        <li>Ajoutez un énoncé instance de (P31). Pour la plupart des commerces locaux, c'est Q4830453 (entreprise) ou une sous-classe plus précise comme Q1763631 (clinique dentaire) ou Q11707 (restaurant).</li>
        <li>Ajoutez les énoncés pays (P17), situé dans l'entité territoriale administrative (P131) et adresse civique (P6375).</li>
        <li>Ajoutez le bloc d'IDs externes : CID GBP, OpenCorporates, site officiel, IDs sociaux.</li>
        <li>Sauvegardez. L'entrée est en ligne immédiatement, mais attendez-vous à une révision de suppression dans 7 à 30 jours pour les très petits commerces sans couverture de presse.</li>
      </ol>

      <img
        src={meta.images.mid}
        alt="Flux étape par étape de création d'entrée Wikidata pour un commerce local québécois avec IDs externes"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="cablage-schema-org-sameas">Câblage schema.org sameAs vers Wikidata</h2>
      <p>
        L'entrée Wikidata seule, c'est la moitié du travail. L'autre moitié, c'est le lien sameAs en retour depuis le balisage schema.org de votre site. Cela boucle la boucle et indique à Google et aux moteurs IA que le Q-numéro Wikidata et votre site sont la même entité.
      </p>
      <p>
        Dans votre JSON-LD LocalBusiness sur la page d'accueil et la page contact, ajoutez un tableau sameAs contenant l'URL Wikidata, l'URL GBP et toutes les URLs sociales. Le format d'URL Wikidata est https://www.wikidata.org/wiki/Q12345. Les moteurs IA qui crawlent votre site suivront cette URL, confirmeront la correspondance d'entité et pondéreront la citation en conséquence.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel est l'ID externe le plus important à ajouter à une entrée Wikidata d'un commerce local québécois?"
        options={[
          "Le nom d'utilisateur X (Twitter)",
          'Le CID Google Business Profile',
          "Le lien vers l'article Wikipedia",
          'Le profil LinkedIn personnel du propriétaire',
        ]}
        correctIndex={1}
        explanation="Le CID Google Business Profile est l'ID externe le plus fort pour un commerce local parce qu'il rattache l'entrée Wikidata à l'entité Google vérifiée, qui est la couche que la plupart des moteurs IA et le Knowledge Graph Google croisent pour les requêtes locales. Wikipedia est rare pour les petits commerces, X est faible et le LinkedIn personnel n'a aucun rapport avec l'entité commerciale."
      />

      <SectionDivider />

      <h2 id="le-roi-honnete-pour-un-seul-emplacement">Le ROI honnête pour un seul emplacement</h2>
      <p>
        Le moment d'être direct. Pour un dentiste, restaurant, cabinet d'avocats ou clinique à un seul emplacement au Québec, Wikidata vaut la peine, mais ce n'est pas transformationnel. Le gain de taux de citations dans les moteurs IA est réel, typiquement quelques pourcents sur six mois, avec Perplexity qui bouge en premier parce qu'il interroge Wikidata directement. Comparez cela à une refonte GBP propre, qui peut faire grimper la visibilité dans le pack local de 20 pourcents ou plus dans la même période.
      </p>
      <p>
        La séquence honnête pour un opérateur local : faites GBP en premier, citations NAP en deuxième, balisage schema en troisième et Wikidata en quatrième. Sauter directement à Wikidata avant de régler GBP est une erreur de catégorie. Une fois les fondations propres, Wikidata est la couche suivante qui se compose bien avec tout ce qu'il y a en dessous.
      </p>

      <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Vérifiez si vous avez déjà un Q-numéro et où sont les écarts" />

      <InternalLink to="/glossary/nap" title="Cohérence NAP, la fondation sous Wikidata" description="Réglez ceci avant tout travail de Q-numéro" />

      <InternalLink to="/audit/gbp" title="Audit GBP gratuit" description="Fondations d'abord, GBP avant tout travail Wikidata" />

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes sur Wikidata? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="quand-ailys-le-fait-pour-vous">Quand AiLys le fait pour vous</h2>
      <p>
        AiLys s'occupe du travail Wikidata dans le forfait Growth à 1 499 dollars CAD par mois et le forfait Agency à 2 499 dollars CAD par mois. Nous utilisons l'API MediaWiki pour rédiger et soumettre les modifications semi-automatiquement, puis un humain de notre équipe bilingue révise chaque modification avant qu'elle parte. Les étiquettes en français du Québec sont rédigées à la main, avec graphies régionales et accents corrects.
      </p>
      <p>
        Le forfait Starter à 300 dollars et le forfait Core à 799 dollars n'incluent pas le travail Wikidata. La raison est honnête : à ces paliers, le temps consacré aux modifications Wikidata gruge le travail à plus haut ROI comme l'optimisation GBP et le nettoyage de citations. Nous préférons livrer le travail à plus haut ROI d'abord et ajouter Wikidata quand l'opérateur est prêt à passer à Growth.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Méfiez-vous des agences qui promettent Wikidata comme une case à cocher sans expliquer le risque de suppression. Une entrée mal sourcée créée sans preuve de notoriété peut être supprimée dans les 30 jours, et l'historique de révision de suppression reste rattaché à votre espace de Q-numéro de façon permanente. AiLys rédige les entrées avec de vraies sources citées et une formulation encyclopédique neutre qui survit à la révision. Nous n'avons eu qu'une entrée supprimée sur des centaines livrées, et c'était pour un commerce qui avait fermé avant la fin de la révision.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys, de Starter à 300 dollars CAD à Agency à 2 499 dollars CAD avec Wikidata inclus." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="erreurs-courantes-et-risque-de-suppression">Erreurs courantes et risque de suppression</h2>
      <p>
        Cinq erreurs expliquent presque toutes les entrées supprimées que nous avons observées :
      </p>
      <ol>
        <li>Langage promotionnel dans le champ description. Wikidata est encyclopédique, pas marketing. « Meilleur dentiste à Montréal » est marqué. « Clinique dentaire à Montréal, Québec, Canada » survit.</li>
        <li>Aucune source externe à la création. Une entrée avec seulement un lien vers le site ressemble à du pourriel. Ajoutez le CID GBP et OpenCorporates dès le départ.</li>
        <li>Entrée en double. Cherchez avant de créer. Revendiquer et améliorer un Q-numéro existant est toujours préférable à en créer un concurrent.</li>
        <li>Énoncé instance de (P31) manquant. Sans lui, Wikidata ne peut pas classer votre entité, et l'entrée est fragile.</li>
        <li>Édition à partir d'un compte qui appartient évidemment au propriétaire du commerce. Le conflit d'intérêts est correct s'il est divulgué, mais il augmente le risque de suppression s'il s'ajoute au langage promotionnel.</li>
      </ol>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Wikidata est le graphe de connaissances structuré que les moteurs IA lisent pour la désambiguïsation d'entité.",
          'Un Q-numéro plus trois IDs externes ou plus qui résolvent (CID GBP, OpenCorporates, site) est le minimum durable.',
          "Câblez le sameAs schema.org depuis le JSON-LD de votre site vers l'URL Wikidata pour boucler la boucle.",
          "Pour un commerce à un seul emplacement, attendez quelques pourcents de gain de citations sur six mois, pas un gain transformationnel.",
          "AiLys s'occupe de Wikidata dans les forfaits Growth (1 499) et Agency (2 499) avec l'API MediaWiki et révision humaine.",
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
        alt="Schéma de liaison sameAs entre site et graphe de connaissances Wikidata"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
