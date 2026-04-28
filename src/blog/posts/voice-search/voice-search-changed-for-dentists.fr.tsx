/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  SectionDivider,
} from '../../components/shared'
import { meta } from './voice-search-changed-for-dentists'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'La recherche vocale vient de changer pour les dentistes, et la plupart des cliniques vont passer à côté',
  metaDescription:
    "Les recommandations locales d'Apple ont changé dans iOS 18.2. Les patients qui demandent à Siri entendent maintenant des noms différents. Voici ce qui a changé et comment gagner cette nouvelle couche.",
  tldr: "Apple a changé discrètement la pondération des recommandations locales dans iOS 18.2 à la fin de 2025. Trois choses ont bougé en même temps : les fiches vérifiées Apple Maps Connect priment sur les fournisseurs tiers, les avis récents pèsent plus que le total, et les mots-clés de service dans les avis se propagent au classement vocal. La plupart des cliniques dentaires ne revendiquent jamais Apple Maps Connect et passeront à côté.",
  faqItems: [
    {
      question: "Comment revendiquer une fiche Apple Maps Connect pour une clinique dentaire?",
      answer:
        "Allez sur mapsconnect.apple.com, connectez-vous avec un Apple ID, cherchez votre clinique et complétez le flux de vérification. Le processus accepte un appel de rappel ou une carte postale pour la vérification. Une fois vérifiées, vos heures, services et coordonnées circulent dans les réponses vocales de Siri. La plupart des cliniques sautent l'étape parce que c'est Google Business Profile qui paie les factures, ce qui rend la revendication encore plus payante aujourd'hui.",
    },
    {
      question: "Combien d'avis Google récents faut-il par mois pour un cabinet dentaire?",
      answer:
        "Visez au moins 4 à 6 nouveaux avis par mois. La pondération iOS 18.2 d'Apple favorise désormais les cliniques avec une activité récente régulière, plutôt que les cliniques avec de gros totaux historiques sans flux actuel. Une clinique avec 80 avis dont 5 dans les 30 derniers jours bat maintenant une clinique avec 400 avis sans activité récente dans le classement vocal.",
    },
    {
      question: "Les avis pour la recherche vocale ont-ils besoin de mots-clés précis chez les dentistes?",
      answer:
        "Oui. Les mots-clés spécifiques aux services présents dans les avis se propagent désormais au classement vocal. Une clinique avec plusieurs avis mentionnant « pédiatrique » sera retournée pour les requêtes vocales « dentiste pour enfants ». Des avis qui disent tous « excellent dentiste » ne différencient pas votre fiche pour la voix. Le correctif est une relance d'avis qui demande au patient de mentionner le service précis reçu : nettoyage, blanchiment, pédiatrique ou urgence.",
    },
    {
      question: "Quel volume de recherche vocale les cabinets dentaires reçoivent-ils de Siri par rapport à Google?",
      answer:
        "Les requêtes vocales par Siri acheminent maintenant 30 à 40 % de l'intention « dentiste près de moi » au Québec, surtout chez les patients de moins de 40 ans. Le reste se partage entre Google Assistant et Alexa. Ignorer Apple Maps Connect vous rend déjà invisible pour environ 25 % des requêtes vocales sur les dentistes au Québec, avant même que les effets de récence et de mots-clés ne s'additionnent.",
    },
    {
      question: "À quelle fréquence faut-il auditer sa fiche Apple Maps Connect?",
      answer:
        "Au moins une fois par trimestre. Apple déploie ses changements de pondération des recommandations locales sans annonce publique (le changement iOS 18.2 n'a pas été annoncé), donc un audit trimestriel détecte la dérive des catégories de service, des heures et du statut de vérification avant que le classement vocal ne s'érode. Doublez l'audit d'une vérification du rythme d'avis et d'un balayage de diversité des mots-clés sur les 30 derniers jours.",
    },
  ],
  headings: [
    { id: 'dis-siri-trouve-un-dentiste-pres-de-moi', text: '« Dis Siri, trouve un dentiste près de moi » donne des réponses différentes qu\'il y a six mois.' },
    { id: 'ce-que-nous-faisons-pour-les-clients-dentaires', text: 'Ce que nous faisons pour les clients dentaires' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <h2 id="dis-siri-trouve-un-dentiste-pres-de-moi">« Dis Siri, trouve un dentiste près de moi » donne des réponses différentes qu'il y a six mois.</h2>
      <p>
        Apple a modifié la pondération des recommandations locales dans iOS 18.2 à la fin de 2025. Le changement n'a pas été annoncé. Nous l'avons détecté parce que nous menons des tests hebdomadaires de requêtes vocales dans 30 secteurs.
      </p>

      <StatHighlight
        stats={[
          { value: '~25 %', label: "Des requêtes vocales sur les dentistes au Québec perdues sans Apple Maps Connect" },
          { value: '30-40 %', label: "De l'intention « dentiste près de moi » acheminée via Siri au Québec" },
          { value: '4-6', label: 'Nouveaux avis par mois nécessaires pour rester dans le classement vocal' },
        ]}
      />

      <h3>Ce qui a changé</h3>
      <p>Trois choses ont bougé en même temps.</p>
      <p>
        <strong>Un</strong> : Siri puise désormais davantage dans les fiches vérifiées d'Apple Maps Connect que dans les partenaires de données tiers. Si vous n'avez pas revendiqué et vérifié votre fiche Apple Maps, vous êtes maintenant invisible pour environ 25 % des requêtes vocales sur les dentistes au Québec.
      </p>
      <p>
        <strong>Deux</strong> : les avis récents pèsent plus que le total. Une clinique avec 80 avis dont 5 dans les 30 derniers jours bat maintenant une clinique avec 400 avis sans activité récente. Apple combat les « cimetières d'avis ».
      </p>
      <p>
        <strong>Trois</strong> : les mots-clés spécifiques aux services présents dans les avis se propagent désormais dans le classement vocal. Une clinique avec plusieurs avis mentionnant « pédiatrique » sera retournée pour les requêtes vocales « dentiste pour enfants ». Sans la densité de mots-clés, vous ne sortez pas.
      </p>

      <CalloutBox type="warning" translatedLabel="Avertissement">
        <p>Apple déploie ces changements de pondération sans annonce. La seule façon de les détecter est un test hebdomadaire structuré de requêtes vocales sur les secteurs qui vous intéressent. Si votre dernier audit Apple Maps Connect remonte à plus d'un trimestre, présumez que la dérive vous a déjà coûté des placements.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Comparaison de deux fiches de cliniques dentaires, l'une avec des avis récents réguliers et l'autre avec un cimetière d'avis"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h3>Pourquoi la plupart des dentistes vont passer à côté</h3>
      <p>
        Apple Maps Connect est le canal le moins attrayant du SEO local. La plupart des cliniques ne revendiquent jamais leur fiche parce que c'est Google Business Profile qui paie les factures. Mais les requêtes vocales via Siri acheminent maintenant 30 à 40 % de l'intention « dentiste près de moi » au Québec, surtout chez les patients de moins de 40 ans.
      </p>
      <p>Trois implications :</p>
      <ul>
        <li>Votre rythme mensuel d'avis compte plus que votre total. Si vous ne générez pas 4 à 6 nouveaux avis par mois, vous sortez peu à peu du classement vocal.</li>
        <li>Vos avis ont besoin de variété de mots-clés. Une série d'avis disant tous « excellent dentiste » ne fait rien pour le vocal. Les avis qui mentionnent des services précis (nettoyage, blanchiment, pédiatrique, urgence) gagnent différentes requêtes vocales.</li>
        <li>Apple Maps Connect a besoin d'un audit trimestriel au minimum.</li>
      </ul>

      <SectionDivider />

      <h2 id="ce-que-nous-faisons-pour-les-clients-dentaires">Ce que nous faisons pour les clients dentaires</h2>
      <p>
        Au forfait Core, nous menons un audit trimestriel d'Apple Maps Connect en parallèle du travail GBP. Nos relances d'avis orientent les patients à mentionner le service qu'ils ont réellement utilisé. Le forfait Agency mène un concours mensuel d'avis avec des prompts conçus pour diversifier les mots-clés de service.
      </p>
      <p>
        L'AI Visibility Audit gratuit couvre les requêtes vocales Siri pour votre nom d'entreprise. Ça vaut les 90 secondes.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <img
        src={meta.images.end}
        alt="Propriétaire de clinique dentaire examinant les changements de classement vocal à travers Siri, Google et Alexa"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
