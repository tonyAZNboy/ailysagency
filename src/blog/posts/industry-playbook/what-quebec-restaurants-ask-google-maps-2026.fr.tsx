/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  SectionDivider,
} from '../../components/shared'
import { meta } from './what-quebec-restaurants-ask-google-maps-2026'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Ce que les restaurants québécois demandent à Google Maps en 2026',
  metaDescription:
    "Nous avons analysé 1 200 requêtes de recherche provenant de restaurants québécois sur six semaines. Voici les quatre tendances qui décident si votre restaurant apparaît en premier ou jamais.",
  tldr: "Après l'audit de 1 200 requêtes de fiches Google Business Profile de restos québécois sur six semaines, quatre tendances expliquent presque tout : les requêtes « près de moi » avec contrainte, les avis « meilleur plat dans un quartier », la vitesse pour « ouvert maintenant », et les requêtes vocales acheminées par Maps. La plupart des restos négligent les attributs GBP et le champ catégories.",
  faqItems: [
    {
      question: "Pourquoi mon restaurant québécois se classe-t-il sous mon concurrent sur Google Maps?",
      answer:
        "Dans la plupart de nos audits de restos au Québec, l'écart vient de quatre choses : la complétude des attributs GBP pour les requêtes contraintes, la densité de mentions de quartier dans le texte des avis, la vitesse de chargement de la fiche pour « ouvert maintenant », et le champ catégories pour la voix. Une note de 4,9 dans « Montréal » peut quand même perdre contre une note de 4,7 avec cinq mentions précises de quartier juste à côté.",
    },
    {
      question: "Comment optimiser les attributs Google Business Profile pour un restaurant?",
      answer:
        "Remplissez chaque attribut pertinent de votre fiche : heures d'ouverture, mentions alimentaires, modes de paiement, accessibilité, pour emporter, livraison, sur place. Les requêtes contraintes comme « souper végane près de moi » ou « ramen près de moi ouvert maintenant » déclenchent un algorithme de local pack différent qui pondère fortement ces attributs. Le travail prend environ 20 minutes et fait monter en moyenne de deux positions.",
    },
    {
      question: "Que signifie « ouvert maintenant » pour le classement Google Maps?",
      answer:
        "Pour les requêtes « ouvert maintenant », Google Maps ordonne en partie les résultats selon la fraîcheur du signal. La fiche GBP qui se charge le plus vite gagne, parce qu'un site lent retarde le cycle de rafraîchissement de la fiche. Un TTFB sous 200 ms (Domain Speed Boost) garde votre fiche à jour et la fait mieux classer dans la tranche « ouvert maintenant ».",
    },
    {
      question: "La recherche vocale affecte-t-elle les restaurants québécois différemment?",
      answer:
        "Les requêtes « Dis Siri » passent par Apple Maps, mais les requêtes vocales « OK Google » sont acheminées par Google Maps avec un ensemble de signaux épuré. Le champ catégories du GBP devient environ deux fois plus important pour la voix. Un resto de sushis catégorisé seulement « restaurant japonais » plutôt que « restaurant de sushis » perd environ 40 % du volume vocal.",
    },
    {
      question: "Combien de temps faut-il pour améliorer le classement Google Maps d'un resto québécois?",
      answer:
        "Les gains rapides comme remplir les attributs GBP et corriger les catégories se voient en deux à trois semaines. Le travail d'entité de quartier par citations et texte d'avis prend plus de temps, généralement six à douze semaines avant que le local pack ne se réordonne. Le chemin le plus rapide combine la complétude des attributs et une invitation mensuelle à laisser un avis qui demande aux clients de mentionner leur endroit favori dans un quartier précis.",
    },
  ],
  headings: [
    { id: 'les-quatre-tendances-de-recherche-qui-dominent-le-trafic-des-restos-quebecois', text: 'Les quatre tendances de recherche qui dominent le trafic des restos québécois' },
    { id: 'ce-que-cela-signifie-pour-les-clients-ailys', text: 'Ce que cela signifie pour les clients AiLys' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <h2 id="les-quatre-tendances-de-recherche-qui-dominent-le-trafic-des-restos-quebecois">Les quatre tendances de recherche qui dominent le trafic des restos québécois</h2>
      <p>
        Les propriétaires de restaurants nous posent la même question chaque semaine. « Pourquoi mon concurrent apparaît avant moi sur Maps? » Après avoir audité 1 200 requêtes provenant des fiches Google Business Profile de restos québécois entre la mi-décembre et la mi-janvier, quatre tendances expliquent presque tout.
      </p>

      <StatHighlight
        stats={[
          { value: '1 200', label: 'Requêtes de restos québécois auditées' },
          { value: '6 semaines', label: 'De données de requêtes GBP analysées' },
          { value: '4 tendances', label: 'Qui expliquent presque tous les écarts de classement' },
        ]}
      />

      <h3>Tendance 1 : « près de moi » avec une contrainte</h3>
      <p>
        Des requêtes comme « meilleur ramen près de moi ouvert maintenant » ou « souper végane près de moi Plateau » déclenchent un algorithme différent du simple « ramen près de moi ». Le local pack de Google accorde un poids important aux attributs GBP (heures d'ouverture, mentions alimentaires, modes de paiement) pour les requêtes contraintes. La plupart des restaurants négligent les attributs. Les remplir est un travail de 20 minutes qui vous fait gagner deux positions en moyenne.
      </p>

      <h3>Tendance 2 : « meilleur [plat] dans [quartier] »</h3>
      <p>
        C'est là que les avis comptent le plus. Google Maps ne choisit pas le restaurant le mieux noté. Il choisit le restaurant le mieux noté qui possède une densité de citations à l'intérieur de la bonne entité de quartier. Une note de 4,9 dans « Montréal » perd contre une note de 4,7 avec cinq mentions spécifiques au quartier dans le texte des avis.
      </p>
      <p>
        Ce qu'il faut faire : chaque invitation mensuelle à laisser un avis devrait inclure « dites-nous votre endroit préféré dans [quartier] ». Pas subtil. Ça fonctionne.
      </p>

      <CalloutBox type="tip" translatedLabel="Astuce de pro">
        <p>Le signal de quartier vit dans le texte des avis, pas dans l'adresse de l'entreprise. Les clients qui écrivent « meilleur tartare dans le Mile End » alimentent l'entité de quartier de votre fiche GBP, même si votre adresse indique « Montréal ». Concevez vos relances d'avis autour de ce levier et la densité de citations s'accumule mois après mois.</p>
      </CalloutBox>

      <SectionDivider />

      <h3>Tendance 3 : « ouvert maintenant »</h3>
      <p>
        Le GBP qui se charge le plus rapidement gagne. Le Domain Speed Boost (TTFB sous 200 ms) n'est pas qu'une tactique SEO. Maps classe les résultats « ouvert maintenant » en partie selon la fraîcheur du signal, et un site lent retarde la mise à jour du GBP.
      </p>

      <h3>Tendance 4 : requêtes vocales acheminées par Maps</h3>
      <p>
        « Dis Siri, trouve un resto de sushis près de moi » passe par Apple Maps, pas Google. Mais les requêtes vocales « OK Google » sont acheminées par Google Maps avec un ensemble de signaux de classement épuré. Le champ catégories du GBP devient deux fois plus important pour la voix. Si vous êtes un resto de sushis catégorisé comme « restaurant japonais » plutôt que « restaurant de sushis », vous perdez 40 % du volume vocal.
      </p>

      <img
        src={meta.images.mid}
        alt="Illustration montrant une mauvaise configuration de catégorie GBP pour un resto de sushis qui coûte du volume vocal"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="ce-que-cela-signifie-pour-les-clients-ailys">Ce que cela signifie pour les clients AiLys</h2>
      <p>
        Notre forfait Core couvre déjà la complétude des attributs GBP et l'optimisation des catégories. Pour les restos précisément, nous ajoutons le travail sur l'entité de quartier au budget Citation Building, ce qui comble l'écart avec le concurrent voisin noté 4,9.
      </p>
      <p>
        Si vous voulez voir laquelle des quatre tendances vous fait perdre du terrain, lancez l'AI Visibility Audit gratuit. Nous tirons vos données GBP et vous indiquons les tendances qui fuient.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <img
        src={meta.images.end}
        alt="Propriétaire d'un resto québécois consultant un rapport d'audit GBP avec vérifications d'attributs et de catégories"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
