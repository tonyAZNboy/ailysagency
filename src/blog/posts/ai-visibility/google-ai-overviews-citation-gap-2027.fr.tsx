/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const metaFr: BlogPostMeta = {
  slug: 'google-ai-overviews-citation-gap-2027',
  title: "Google AI Overviews : l'écart de citation se referme en 2027",
  metaDescription:
    "Les AI Overviews de Google répondent maintenant à 14 % des requêtes sans clic. D'ici 2027, ce chiffre dépasse 30 %. Ce que cela signifie si votre entreprise locale dépend de Google.",
  tldr:
    "Les Google AI Overviews répondent actuellement à environ 14 % des requêtes sans clic, et les projections internes des partenaires Google placent ce chiffre à plus de 30 % d'ici la mi-2027. Les entreprises locales absentes des listes de citations AIO perdent un tiers de leur trafic de découverte. Densité de citations, complétude du schema et vélocité des avis décident qui est cité.",
  category: 'ai-visibility',
  tags: ['google', 'ai overviews', 'future'],
  publishedDate: '2026-04-28',
  updatedDate: '2026-04-28',
  author: AUTHORS.research,
  readTimeMinutes: 5,
  images: {
    hero: '/blog-images/google-ai-overviews-citation-gap-2027/hero.webp',
    mid: '/blog-images/google-ai-overviews-citation-gap-2027/mid.webp',
    end: '/blog-images/google-ai-overviews-citation-gap-2027/end.webp',
  },
  faqItems: [
    {
      question: "Que veut dire « requête zéro clic » pour mon entreprise locale ?",
      answer:
        "Une requête zéro clic est une recherche où Google répond dans sa propre interface et l'utilisateur ne clique jamais vers un site source. Les AI Overviews comptent actuellement pour environ 14 % de toutes les requêtes répondues ainsi. Pour une entreprise locale, cela veut dire qu'un tiers de votre futur trafic de découverte dépend de votre présence dans la liste de citations de l'AI Overview, pas de votre classement dans les liens bleus en dessous.",
    },
    {
      question: "Comment se faire citer dans une Google AI Overview ?",
      answer:
        "Trois signaux dominent. La densité de citations sur des sources à haute DA, avec un poids supplémentaire pour les propriétés Google (YouTube, avis Maps, fiches Knowledge Graph). La complétude du schema, parce que les AIO ont besoin de données structurées pour extraire une réponse propre. Et la vélocité d'avis, où les entreprises qui ajoutent 5 avis ou plus par mois surperforment des entreprises plus anciennes avec plus d'avis au total. Le déploiement combiné est ce qui vous met dans la case de citation.",
    },
    {
      question: "Pourquoi la vélocité des avis compte-t-elle plus que le total ?",
      answer:
        "Google interprète la vélocité d'avis comme un signal de fraîcheur. Une entreprise qui ajoute 5 avis ce mois-ci se lit comme « entreprise active avec information actuelle », alors qu'une entreprise avec 500 avis cumulés et rien dans les 90 derniers jours se lit comme dépassée. Les AIO favorisent la fraîcheur parce que l'utilisateur pose une question sur le présent. Mettez en place un concours d'avis mensuel ou un flux de demande en boutique qui maintient la vélocité au-dessus de 5 par emplacement par mois.",
    },
    {
      question: "Le local pack et les AI Overviews vont-ils vraiment fusionner ?",
      answer:
        "Oui, c'est la trajectoire. La séparation actuelle entre 10 liens bleus, Map pack et AI Overviews est une mise en page transitoire. Les feuilles de route partenaires Google internes pointent vers une interface unifiée à logique IA d'abord, où les AIO remontent les résultats locaux en ligne avec les citations. Les entreprises qui livrent déjà les quatre schemas centraux avec relations d'entités complètes sont positionnées pour la fusion. Les autres ne le sont pas.",
    },
    {
      question: "Quoi faire ce trimestre pour préparer 2027 ?",
      answer:
        "Quatre mouvements. Livrer les quatre schemas centraux (LocalBusiness, FAQ, Review, Service) avec relations d'entités complètes. Mener un concours d'avis mensuel pour maintenir la vélocité au-dessus de 5 avis par emplacement par mois. Bâtir une présence Wikidata pour apparaître dans le Knowledge Graph de Google. Publier chaque trimestre du contenu « état actuel » que les AIO peuvent citer comme récent. Faits ensemble, ces mouvements composent et font monter vos chances de citation AIO en 90 jours.",
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'la-requete-zero-clic-est-arrivee-la-plupart-des-entreprises-locales-ne-sont-pas-pretes', text: "La requête zéro clic est arrivée. La plupart des entreprises locales ne sont pas prêtes." },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function ContentFr() {
  return (
    <>
      <h2 id="la-requete-zero-clic-est-arrivee-la-plupart-des-entreprises-locales-ne-sont-pas-pretes">
        La requête zéro clic est arrivée. La plupart des entreprises locales ne sont pas prêtes.
      </h2>
      <p>
        Les Google AI Overviews répondent actuellement à environ 14 % de toutes les requêtes sans envoyer un seul clic vers un site source. Les projections internes que nous avons vues chez des partenaires Google placent ce chiffre à plus de 30 % d'ici la mi-2027.
      </p>
      <p>
        Si 30 % des requêtes « dentiste près de moi Montréal » obtiennent leur réponse à l'intérieur de l'interface Google sans clic, l'entreprise locale qui n'apparaît pas dans la liste de citations de l'AI Overview a perdu un tiers de son trafic de découverte.
      </p>

      <StatHighlight
        stats={[
          { value: '14 %', label: 'Requêtes répondues sans clic aujourd\'hui' },
          { value: '30 %+', label: 'Part zéro clic projetée mi-2027' },
          { value: '5/mois', label: 'Seuil de vélocité par emplacement' },
        ]}
      />

      <h3>Qui est cité dans les AI Overviews</h3>
      <p>La logique de citation des AIO diffère du classement de recherche classique. Trois signaux pondérés dominent :</p>
      <p>
        <strong>Densité de citations sur des sources à haute DA</strong> : similaire à ChatGPT, mais Google donne plus de poids à ses propres propriétés (YouTube, avis Maps, fiches du Knowledge Graph).
      </p>
      <p>
        <strong>Complétude du schema</strong> : les AIO doivent extraire des réponses structurées. Si votre site ne leur fournit pas un balisage Schema.org propre, Google synthétise depuis un concurrent qui le fait.
      </p>
      <p>
        <strong>Vélocité des avis</strong> : voilà le signal surprise. Les entreprises qui ajoutent 5 avis ou plus par mois surperforment des entreprises plus anciennes avec plus d'avis au total. Google interprète la vélocité d'avis comme « entreprise active avec de l'information à jour ».
      </p>

      <CalloutBox type="info" title="La vélocité bat le volume">
        <p>
          Nous voyons cela chaque semaine dans les journaux de citations. Une entreprise avec 60 avis dont 5 ajoutés ce mois-ci surclasse régulièrement une entreprise avec 400 avis et rien dans les 90 derniers jours. Les AIO lisent la fraîcheur, pas le total brut. Bâtissez une cadence mensuelle qui maintient la vélocité au-dessus du seuil.
        </p>
      </CalloutBox>

      <h3>Ce qui change d'ici 2027</h3>
      <p>Trois choses à attendre :</p>
      <ul>
        <li>La liste de citations AIO passe de 3 à 5 sources à 8 à 10. Plus de places égalent plus d'opportunités, mais seulement pour les entreprises préparées.</li>
        <li>Le local pack et les AIO fusionnent. La séparation actuelle entre « 10 liens bleus, Map pack et AIO » s'effondre en une interface unifiée à logique IA d'abord.</li>
        <li>Le schema devient plus strict. Google déprécie le balisage lâche et exige plus de relations entre entités (Service vers LocalBusiness vers Review).</li>
      </ul>

      <InlineCTA variant="audit" />

      <h3>Le travail qui vous met à l'abri</h3>
      <p>Nous recommandons à chaque client Core et Growth de :</p>
      <ul>
        <li>Livrer les quatre schemas centraux (LocalBusiness, FAQ, Review, Service) avec relations d'entités complètes</li>
        <li>Mener un concours d'avis mensuel pour maintenir la vélocité au-dessus de 5 avis par emplacement par mois</li>
        <li>Bâtir une présence Wikidata pour apparaître dans le Knowledge Graph de Google</li>
        <li>Publier chaque trimestre du contenu « état actuel » que les AIO peuvent citer comme récent</li>
      </ul>
      <p>
        C'est exactement ce que le forfait Agency livre comme ensemble clé en main. Reviuzy SaaS gère la vélocité d'avis. Notre équipe gère le schema et le travail Wikidata.
      </p>

      <CalloutBox type="tip" title="La cadence trimestrielle pose le rythme">
        <p>
          Publiez un article « état actuel » par trimestre sur votre service principal dans votre ville principale. Titrez-le avec l'année et l'angle de changement (« [Service] à [ville] en [année] : ce qui a changé »). Les AIO pondèrent fortement la date de publication, donc un dépôt trimestriel maintient un article frais dans la fenêtre d'index en permanence.
        </p>
      </CalloutBox>

      <p>
        Si vous voulez voir votre score de préparation AIO actuel, lancez l'audit.
      </p>
    </>
  )
}
