/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { AUTHORS } from '../../authors'
import { CalloutBox, InlineCTA, StatHighlight } from '../../components/shared'

export const metaFr: BlogPostMeta = {
  slug: 'aeo-geo-eeat-explained-for-local-owners',
  title: "AEO, GEO et E-E-A-T expliqués aux propriétaires d'entreprises locales",
  metaDescription:
    "Trois acronymes qui décident de votre avenir dans la recherche par IA. Voici la version en français clair avec ce qu'il faut faire pour chacun dans les 90 prochains jours.",
  tldr:
    "L'AEO consiste à structurer votre site pour qu'un moteur IA en tire une réponse propre et directe. Le GEO consiste à faire citer votre marque dans les réponses des IA génératives. E-E-A-T est la grille que les moteurs IA utilisent pour décider qui mérite les deux. Vous avez besoin des trois, avec un plan de 90 jours pour chacun.",
  category: 'aeo-geo-eeat',
  tags: ['aeo', 'geo', 'eeat', 'fundamentals'],
  publishedDate: '2026-04-09',
  updatedDate: '2026-04-09',
  author: AUTHORS.research,
  readTimeMinutes: 6,
  images: {
    hero: '/blog-images/aeo-geo-eeat-explained-for-local-owners/hero.webp',
    mid: '/blog-images/aeo-geo-eeat-explained-for-local-owners/mid.webp',
    end: '/blog-images/aeo-geo-eeat-explained-for-local-owners/end.webp',
  },
  faqItems: [
    {
      question: "L'AEO est-il la même chose que le SEO classique ?",
      answer:
        "Non. Le SEO classique optimise pour le classement dans une liste de liens bleus. L'AEO optimise pour devenir la réponse aspirée dans un moteur IA. Les travaux se recoupent par endroits (schema propre, pages rapides, paternité réelle), mais les livrables diffèrent. L'AEO s'appuie fortement sur le FAQ schema, des blocs scannables sous 300 mots sous des H2 et un balisage LocalBusiness riche en entités qui permet à un LLM d'extraire une seule réponse directe.",
    },
    {
      question: "Peut-on faire du GEO sans mentions presse tierces ?",
      answer:
        "Partiellement, mais pas totalement. Le GEO dépend d'une validation par des tiers. Le minimum que vous pouvez faire vous-même est la densité de citations à haute DA (Yelp, BBB, Crunchbase, annuaires sectoriels), la mise en place de Wikidata et une pièce de données originale que d'autres sites peuvent citer. Pour débloquer le palier supérieur du GEO, il faut au moins une mention tierce qui fait autorité. Les balados sectoriels et les publications spécialisées sont les portes d'entrée les plus accessibles si la presse grand public est hors d'atteinte.",
    },
    {
      question: "Pourquoi E-E-A-T est-il le signal à plus fort effet de levier en 2026 ?",
      answer:
        "Google a refondu ses lignes directrices d'évaluateurs qualité autour d'E-E-A-T en 2024. Chaque LLM qui utilise l'index de Google hérite de cette pondération. Cela veut dire qu'E-E-A-T compose à travers Google AI Overviews, Gemini et tout LLM tiers qui s'appuie sur les données de Google, c'est-à-dire la majorité. Un site fort en Experience, Expertise, Authoritativeness et Trust se fait citer davantage sur l'ensemble de la pile de recherche IA, pas une seule surface.",
    },
    {
      question: "Quel est le set minimal de schema dont une entreprise locale a besoin ?",
      answer:
        "Quatre types de schema forment la base : LocalBusiness entièrement rempli avec adresse, heures, modes de paiement et zone de service. FAQPage couvrant chaque question fréquente. Review avec aggregateRating et au moins trois avis individuels balisés. Service avec une entité par service offert, reliée à l'entité LocalBusiness. Sans ces quatre éléments livrés proprement, le travail AEO et GEO stagnent peu importe la qualité du contenu.",
    },
    {
      question: "Comment AEO, GEO et E-E-A-T s'articulent-ils dans un plan de 90 jours ?",
      answer:
        "Séquencez-les. Jours 1 à 30 : fondations AEO, livrer les quatre schemas centraux et 15 entrées FAQ par service. Jours 31 à 60 : poussée GEO, revendiquer et compléter vos 10 cibles de citation à haute DA et décrocher une mention tierce. Jours 61 à 90 : polissage E-E-A-T, ajouter des signatures d'auteur partout, livrer une recherche originale, déclarer prix et accréditations dans le schema et corriger les signaux techniques de confiance. Les trois couches se renforcent au lieu de se concurrencer.",
    },
  ],
  relatedSlugs: [],
  headings: [
    { id: 'trois-acronymes-francais-clair-quoi-faire', text: 'Trois acronymes. Français clair. Quoi faire.' },
    { id: 'comment-ils-sarticulent', text: "Comment ils s'articulent" },
  ],
  schemaType: 'BlogPosting',
  speakable: true,
}

export function ContentFr() {
  return (
    <>
      <h2 id="trois-acronymes-francais-clair-quoi-faire">
        Trois acronymes. Français clair. Quoi faire.
      </h2>
      <p>
        Chaque agence de recherche IA vous balance AEO, GEO et E-E-A-T dès le premier appel. La plupart des propriétaires hochent la tête et font semblant de suivre. Voici la version qu'on aurait aimé recevoir.
      </p>

      <StatHighlight
        stats={[
          { value: '4', label: 'Schemas centraux par entreprise locale' },
          { value: '15', label: 'Entrées FAQ par service' },
          { value: '90 jours', label: 'Pour exécuter le plan complet' },
        ]}
      />

      <h3>AEO : Answer Engine Optimization</h3>
      <p>L'AEO consiste à structurer votre site pour qu'un moteur IA puisse en tirer une réponse propre et directe.</p>
      <p>Les mouvements de base :</p>
      <ul>
        <li>FAQ schema sur vos pages de service (chaque question que vos clients posent)</li>
        <li>Review schema avec aggregateRating</li>
        <li>LocalBusiness schema entièrement rempli</li>
        <li>HowTo schema pour tout processus que vous expliquez</li>
        <li>Blocs scannables, sous 300 mots, sous des en-têtes H2</li>
      </ul>
      <p>
        Si un acheteur demande « combien coûte un traitement de canal à Montréal », c'est l'AEO qui fait que ChatGPT extrait « 800 $ à 1 500 $ » de votre site de clinique dentaire au lieu de résumer cinq concurrents.
      </p>
      <p>
        <strong>Plan sur 90 jours</strong> : déployer les quatre types de schema ci-dessus, rédiger 15 entrées FAQ par service.
      </p>

      <CalloutBox type="tip" title="Test du bloc sous 300 mots">
        <p>
          Chaque section H2 d'une page de service devrait répondre à une question en moins de 300 mots. Si une section dépasse, scindez-la. Les moteurs IA extraient des blocs uniques et scannables, pas de longs paragraphes mixtes. Le plafond de 300 mots est la fenêtre d'extraction pratique que nous voyons dans les journaux de citations.
        </p>
      </CalloutBox>

      <h3>GEO : Generative Engine Optimization</h3>
      <p>
        Le GEO consiste à faire citer votre marque dans les réponses des IA génératives (ChatGPT, Perplexity, Claude, Gemini).
      </p>
      <p>
        Ce n'est pas la même chose que le classement. ChatGPT peut donner une excellente réponse sur votre secteur sans jamais vous nommer. Le GEO, c'est le travail d'être nommé.
      </p>
      <p>Les mouvements de base :</p>
      <ul>
        <li>Empreinte Wikipedia et Wikidata</li>
        <li>Densité de citations à haute DA (Yelp, BBB, Crunchbase, annuaires sectoriels)</li>
        <li>Contenu tiers faisant autorité qui mentionne votre nom</li>
        <li>Données ou recherches originales que d'autres sites citent à leur tour</li>
      </ul>
      <p>
        Le GEO est plus difficile que l'AEO parce qu'il dépend d'une validation par des tiers. On ne peut pas le bâcler du jour au lendemain.
      </p>
      <p>
        <strong>Plan sur 90 jours</strong> : revendiquer et compléter vos 10 principales cibles de citation à haute DA, décrocher une mention tierce, mettre en place Wikidata.
      </p>

      <InlineCTA variant="audit" />

      <h3>E-E-A-T : Experience, Expertise, Authoritativeness, Trust</h3>
      <p>
        E-E-A-T est la grille de Google pour évaluer la qualité du contenu. Les moteurs IA s'en servent maintenant pour choisir quoi citer.
      </p>
      <p>Les quatre piliers :</p>
      <ul>
        <li><strong>Experience</strong> : preuves de première main. Photos originales avec données EXIF, entrevues clients réelles, vidéos sur place.</li>
        <li><strong>Expertise</strong> : qualifications. Biographies d'auteur avec compétences réelles, vocabulaire spécialisé utilisé correctement.</li>
        <li><strong>Authoritativeness</strong> : validation par des tiers. Mentions presse, reconnaissance par les pairs, prix, citations sectorielles.</li>
        <li><strong>Trust</strong> : honnêteté technique et commerciale. SSL, aucun lien brisé, prix transparents, vrais avis et non factices.</li>
      </ul>
      <p>
        E-E-A-T est le signal de recherche IA à plus fort impact en 2026. Google a refondu ses lignes directrices d'évaluateurs qualité autour en 2024. Chaque LLM qui utilise l'index de Google hérite de cette pondération.
      </p>
      <p>
        <strong>Plan sur 90 jours</strong> : ajouter des signatures d'auteur à tout le contenu de blogue, livrer une pièce de recherche originale, déclarer prix et accréditations dans le schema, corriger les signaux techniques de confiance (SSL, liens brisés).
      </p>

      <CalloutBox type="info" title="Le pilier Experience est le gain le plus facile">
        <p>
          La plupart des sites locaux sautent le pilier Experience. Ajoutez trois choses : photos originales avec données EXIF préservées, une courte entrevue client transcrite sur une page de service et au moins une vidéo sur place par emplacement. Ces trois mouvements suffisent à faire grimper la note E-E-A-T sur les audits que nous menons pour les clients.
        </p>
      </CalloutBox>

      <h2 id="comment-ils-sarticulent">Comment ils s'articulent</h2>
      <p>
        L'AEO fait de vous la réponse. Le GEO vous fait citer. E-E-A-T décide qui mérite les deux.
      </p>
      <p>
        Vous avez besoin des trois. La plupart des agences en vendent un et déclarent l'affaire close. Nous faisons les trois au forfait Core.
      </p>
      <p>
        Si vous voulez voir lequel des trois est votre plus fort et votre plus faible, lancez l'AI Visibility Audit. Nous notons chacun séparément pour que vous sachiez exactement par quoi commencer.
      </p>
    </>
  )
}
