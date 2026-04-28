/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const metaFr: BlogPostMeta = {
  slug: 'perplexity-citations-30-day-playbook',
  title: "Citations Perplexity : le plan d'action sur 30 jours",
  metaDescription:
    "Perplexity a doublé d'année en année. Il cite différemment de ChatGPT. Voici le plan exact sur 30 jours que nous menons pour nos clients afin d'obtenir leur première citation.",
  tldr:
    "Perplexity priorise la fraîcheur, la diversité des sources et les données structurées avant l'autorité de domaine brute, ce qui en fait le LLM le plus accessible pour les entreprises locales. Suivez une séquence de 30 jours : auditez le schema, publiez un article « état actuel », décrochez trois citations diversifiées, puis corrigez votre empreinte Wikipedia.",
  category: 'ai-visibility',
  tags: ['perplexity', 'geo', 'citations', '30-day plan'],
  publishedDate: '2026-03-14',
  updatedDate: '2026-03-14',
  author: AUTHORS.strategy,
  readTimeMinutes: 7,
  images: {
    hero: '/blog-images/perplexity-citations-30-day-playbook/hero.webp',
    mid: '/blog-images/perplexity-citations-30-day-playbook/mid.webp',
    end: '/blog-images/perplexity-citations-30-day-playbook/end.webp',
  },
  faqItems: [
    {
      question: 'Combien de temps avant que mon entreprise apparaisse comme citation Perplexity ?',
      answer:
        "La plupart des clients qui suivent ce plan de 30 jours voient leur première mention citée entre le jour 25 et le jour 45. Le signal compose, parce que Perplexity pondère la fraîcheur et la diversité des sources, donc chaque déploiement de schema, chaque nouveau contenu et chaque référence tierce s'additionne. Si vos données structurées sont déjà propres, la première citation peut tomber dès le jour 14.",
    },
    {
      question: 'Quels types de schema comptent le plus pour les citations Perplexity ?',
      answer:
        "Quatre types de schema portent l'essentiel pour les entreprises locales : LocalBusiness avec adresse complète, heures et modes de paiement. FAQPage répondant à chaque question fréquente. Review avec aggregateRating et au moins trois avis individuels balisés. Service avec une entité par service offert. Sans ces quatre types déployés proprement, du contenu supplémentaire décroche rarement des citations à lui seul.",
    },
    {
      question: 'Perplexity pondère-t-il vraiment fortement les signaux Reddit ?',
      answer:
        "Oui. Reddit est l'une des sources de citation à plus fort effet de levier que Perplexity remonte, surtout pour les requêtes locales. Soumettre un billet ou un commentaire de fond sur un sous-reddit local (sans langage promotionnel, expertise réelle visible) apparaît régulièrement dans les réponses Perplexity en quelques jours. Le signal recherché, c'est « cette entité existe dans de vraies conversations sur le web ouvert ».",
    },
    {
      question: 'Faut-il un article Wikipedia pour être cité par Perplexity ?',
      answer:
        "Non. La plupart des entreprises locales ne qualifient pas pour un article Wikipedia indépendant et ne qualifieront jamais. Ce que vous pouvez faire, c'est être référencé dans des articles Wikipedia existants quand c'est pertinent : pages de ville, pages « liste de » et survols sectoriels. Proposez l'ajout avec une source tierce vérifiable. Les mentions Wikipedia prennent deux à quatre semaines à se stabiliser et deviennent un signal de classement Perplexity à long terme.",
    },
    {
      question: 'En quoi Perplexity diffère-t-il de ChatGPT pour les citations ?',
      answer:
        "ChatGPT s'appuie fortement sur l'autorité de domaine brute et la profondeur de contenu historique. Perplexity pondère plus agressivement la fraîcheur, la diversité des sources et les données structurées. C'est pourquoi un nouveau billet « état actuel » sur un site local de DA moyen peut surpasser un article vieux de cinq ans sur un site national de plus haute autorité dans les réponses Perplexity. Le seuil de classement est plus bas, et c'est pourquoi nous traitons Perplexity comme le LLM le plus facile à percer en premier.",
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'lalgorithme-de-citation-de-perplexity-est-different-voici-ce-qui-fonctionne', text: "L'algorithme de citation de Perplexity est différent. Voici ce qui fonctionne." },
    { id: 'a-quoi-ressemble-une-premiere-citation', text: "À quoi ressemble une « première citation »" },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function ContentFr() {
  return (
    <>
      <h2 id="lalgorithme-de-citation-de-perplexity-est-different-voici-ce-qui-fonctionne">
        L'algorithme de citation de Perplexity est différent. Voici ce qui fonctionne.
      </h2>
      <p>
        Perplexity priorise la fraîcheur, la diversité des sources et les données structurées avant l'autorité de domaine brute. Cela en fait le LLM le plus accessible pour les entreprises locales, à condition de savoir quoi optimiser.
      </p>

      <StatHighlight
        stats={[
          { value: '2x', label: 'Croissance annuelle de Perplexity' },
          { value: '4', label: 'Types de schema qui font la différence' },
          { value: '30 jours', label: "De l'audit à la première citation" },
        ]}
      />

      <h3>Jour 1 à 7 : auditez vos données structurées</h3>
      <p>Perplexity favorise fortement les sites au balisage schema propre. Les quatre types de schema qui comptent en local :</p>
      <ul>
        <li>LocalBusiness (avec adresse complète, heures, modes de paiement)</li>
        <li>FAQPage (chaque question courante répondue avec un schema concret)</li>
        <li>Review (aggregateRating et au moins 3 avis individuels balisés)</li>
        <li>Service (une entité Service par service que vous offrez)</li>
      </ul>
      <p>
        Sans ces quatre éléments en place, aucun volume de contenu ne suffira. Nous déployons cela comme une opération unique au forfait Core. Le faire vous-même est possible mais fastidieux. Deux heures par page en moyenne.
      </p>

      <CalloutBox type="tip" title="Où valider">
        <p>
          Passez chaque page dans le Rich Results Test de Google et le validateur Schema.org avant de livrer. Un seul champ requis manquant fait sauter l'ensemble du bloc schema de l'index Perplexity, même si le reste est correct.
        </p>
      </CalloutBox>

      <h3>Jour 8 à 14 : publiez un article « état actuel »</h3>
      <p>
        Perplexity priorise la fraîcheur. Un billet de blogue intitulé « [Votre service] à [votre ville] en 2026 : ce qui a changé » publié dans les 30 derniers jours est pondéré plus haut que du contenu plus vieux, même si votre DA est plus faible.
      </p>
      <p>La structure qui fonctionne :</p>
      <ul>
        <li>Ouvrir avec une statistique précise sur votre secteur dans votre ville</li>
        <li>Trois sections en puces : ce qui a changé, qui est touché, quoi faire</li>
        <li>Conclure avec une phrase claire « nous [faisons ceci] » avec la localisation</li>
      </ul>
      <p>
        Publiez sur votre domaine. Soumettez-le au sous-reddit local pertinent. Perplexity accorde un poids important aux signaux Reddit.
      </p>

      <InlineCTA variant="audit" />

      <h3>Jour 15 à 21 : décrochez trois citations diversifiées</h3>
      <p>
        La diversité des sources compte plus que la quantité. Trois domaines différents valent mieux que dix liens du même site. Cibles que nous utilisons :
      </p>
      <ul>
        <li>Journal local (une citation, même dans un article sans rapport)</li>
        <li>Annuaire sectoriel (revendiquer et compléter la fiche)</li>
        <li>Forum de niche ou subreddit (réponse de fond, pas promotionnelle)</li>
      </ul>
      <p>
        Si vous ne décrochez pas de citation dans un journal, un passage en invité sur un balado sectoriel fonctionne. Le signal que Perplexity veut, c'est « cette entité est référencée dans la diversité des sources du web ».
      </p>

      <h3>Jour 22 à 30 : corrigez votre empreinte Wikipedia</h3>
      <p>
        Vous ne qualifiez probablement pas pour un article Wikipedia. La plupart des entreprises locales non plus. Mais vous pouvez être référencé dans des articles Wikipedia existants quand c'est pertinent.
      </p>
      <p>
        Trouvez les articles Wikipedia sur votre ville ou votre secteur. Cherchez les pages « liste de [choses] » ou « [ville] [secteur] ». Si votre entreprise est réellement assez notable pour figurer dans ces listes, proposez l'ajout avec une source tierce vérifiable. Les mentions Wikipedia prennent 2 à 4 semaines à se stabiliser et deviennent un signal de classement Perplexity à long terme.
      </p>

      <CalloutBox type="info" title="Mettez en place le suivi hebdomadaire">
        <p>
          Lancez chaque lundi une requête Perplexity « meilleur [votre service] à [votre ville] ». Notez si vous apparaissez, quelles sources sont citées et la fraîcheur de chaque URL citée. Cette cadence hebdomadaire détecte la dérive avant qu'elle ne devienne un problème de classement.
        </p>
      </CalloutBox>

      <h2 id="a-quoi-ressemble-une-premiere-citation">À quoi ressemble une « première citation »</h2>
      <p>
        Lancez une requête Perplexity « meilleur [votre service] à [votre ville] » chaque semaine. La plupart des clients voient leur première mention citée entre le jour 25 et le jour 45. Le travail compose.
      </p>
      <p>
        Nous menons ce plan exact pour les clients des forfaits Core et Growth. Les audits sont gratuits. Dites-nous votre service et votre ville, nous vous indiquons quel jour de la séquence vous manque.
      </p>
    </>
  )
}
