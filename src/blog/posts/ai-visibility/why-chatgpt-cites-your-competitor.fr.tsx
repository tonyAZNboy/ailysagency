/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import {
  CalloutBox,
  InlineCTA,
  StatHighlight,
  SectionDivider,
} from '../../components/shared'
import { meta } from './why-chatgpt-cites-your-competitor'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Pourquoi ChatGPT cite votre concurrent et pas vous',
  metaDescription:
    "Trois raisons pour lesquelles votre concurrent apparaît dans les réponses de ChatGPT alors que vous n'y êtes pas. La première se règle en 48 heures. Les deux autres prennent un trimestre.",
  tldr: "ChatGPT n'indexe pas, il récupère. Trois couches décident qui est nommé : les entrées Wikipedia et Wikidata, la densité de citations sur des cibles à haute DA comme Yelp et BBB, et les marqueurs d'expérience de première main comme les signatures d'auteur et les photos originales. La première se corrige en 48 heures, les deux autres demandent un trimestre.",
  faqItems: [
    {
      question: "Pourquoi ChatGPT nomme-t-il mon concurrent au lieu de moi?",
      answer:
        "ChatGPT puise dans un système de citations à plusieurs couches, pas dans un crawl en direct. Il vérifie d'abord le graphe d'entités Wikidata, pondère ensuite les citations par autorité de domaine sur des cibles comme Yelp et BBB, puis évalue les marqueurs d'expérience de première main comme les signatures d'auteur et les photos avec EXIF. Si votre concurrent gagne sur l'une de ces couches et que vous ne paraissez nulle part, vous tombez de la réponse.",
    },
    {
      question: "Comment obtenir une entrée Wikidata pour une entreprise locale?",
      answer:
        "Agrégez la documentation de soutien qui répond aux critères de notoriété de Wikidata : registres d'incorporation, profil BBB, mentions dans les médias, données GBP et fiches d'annuaires sectoriels. Avec dix ans d'historique d'exploitation et trois mentions médias, une entrée peut se mettre en place en environ une semaine. La plupart des entreprises locales n'ont ni l'un ni l'autre, alors le travail commence par concevoir d'abord les mentions médias et la présence dans les annuaires.",
    },
    {
      question: "Quelles citations à haute DA font vraiment bouger ChatGPT?",
      answer:
        "La liste est plus courte que ce que la plupart des agences prétendent : Yelp, BBB, Yellowpages, Crunchbase, Glassdoor pour le B2B, Healthgrades pour le médical, Avvo pour le droit, OpenTable pour les restos. Yelp seul atteint DA 92, et une mention y pèse plus que dix sur de petits annuaires. La cohérence du nom, de l'adresse, du téléphone et de la catégorie sur ces cibles est ce que la couche de récupération évalue réellement.",
    },
    {
      question: "Qu'est-ce que E-E-A-T et comment ChatGPT s'en sert?",
      answer:
        "E-E-A-T signifie Expérience, Expertise, Autorité et Fiabilité. ChatGPT pénalise désormais activement le contenu qui sent « généré par IA » et récompense celui qui sent « humain, sur place, avec preuves ». Les photos originales avec métadonnées EXIF, les signatures d'auteur sur le site et les citations réelles d'entrevues clients sont les signaux qui ont comblé l'écart le plus vite dans notre cohorte 2025.",
    },
    {
      question: "À quelle vitesse puis-je améliorer mon taux de citation ChatGPT?",
      answer:
        "La correction en 48 heures consiste à revendiquer Yelp, BBB et un annuaire sectoriel avec un nom, une adresse, un téléphone et une catégorie strictement identiques. Un seul triplet NAP incohérent coupe les chances de citation de moitié. La correction profonde (Wikidata, schéma de signature d'auteur, photos originales) prend un trimestre pour s'accumuler. Ajouter le seul schéma de signature d'auteur a relevé le taux de citation d'environ 25 % en 60 jours dans nos données internes.",
    },
  ],
  headings: [
    { id: 'vous-avez-cherche-votre-service', text: "Vous avez cherché votre service. Votre concurrent est apparu. Pas vous. Voici pourquoi." },
    { id: 'ce-que-vous-pouvez-faire-aujourd-hui', text: "Ce que vous pouvez faire aujourd'hui" },
  ],
}

export function ContentFr() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="Réponse ChatGPT listant une citation d'un concurrent local avec des sources à haute DA"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <h2 id="vous-avez-cherche-votre-service">Vous avez cherché votre service. Votre concurrent est apparu. Pas vous. Voici pourquoi.</h2>
      <p>
        ChatGPT n'effectue pas d'indexation. Il récupère. Quand quelqu'un demande « meilleur dentiste à Montréal qui accepte de nouveaux patients », ChatGPT puise dans un système de citations à plusieurs couches. Trois couches décident qui est nommé.
      </p>

      <StatHighlight
        stats={[
          { value: 'DA 92', label: "Poids de Yelp dans la couche de récupération" },
          { value: '~25 %', label: "Hausse du taux de citation grâce au schéma de signature d'auteur en 60 jours" },
          { value: '50 %', label: "Réduction des chances de citation par un triplet NAP incohérent" },
        ]}
      />

      <h3>Couche 1 : Wikipedia et Wikidata</h3>
      <p>
        Si votre concurrent possède une entrée Wikidata et pas vous, vous avez perdu avant même la question. Une entrée Wikidata prend une semaine à se mettre en place si vous comptez dix ans d'historique d'exploitation et trois mentions dans les médias. La plupart des entreprises locales n'ont ni l'un ni l'autre, mais cela peut s'organiser.
      </p>
      <p>
        Nous aidons nos clients à bâtir leur entrée Wikidata en agrégeant : registres d'incorporation, profil BBB, mentions dans les médias, données GBP, fiches d'annuaires sectoriels. Une fois ces éléments au seuil Wikidata, vous apparaissez dans le graphe d'entités que ChatGPT consulte.
      </p>

      <h3>Couche 2 : densité de citations à haute DA</h3>
      <p>
        ChatGPT pondère les citations selon l'autorité de domaine. Une mention sur Yelp (DA 92) pèse plus que dix mentions sur de petits annuaires. La liste des cibles de citation à haute DA qui font vraiment bouger les classements des LLM est plus courte que ce que la plupart des agences prétendent : Yelp, BBB, Yellowpages, Crunchbase, Glassdoor pour le B2B, Healthgrades pour le médical, Avvo pour le droit, OpenTable pour les restos.
      </p>
      <p>
        Si votre nom n'apparaît pas de manière constante sur toutes les cibles à haute DA pertinentes, vous êtes invisible pour la couche de récupération de ChatGPT.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>La cohérence NAP (nom, adresse, téléphone) est le plus gros signal sous-estimé. La couche de récupération évalue la cohérence du nom au niveau de l'entité, et un seul triplet NAP incohérent coupe les chances de citation de moitié. Auditez vos cinq principales cibles de citation chaque trimestre, pas chaque année.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Schéma des trois couches de citation utilisées par ChatGPT pour nommer une entreprise locale"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h3>Couche 3 : marqueurs d'expérience de première main</h3>
      <p>
        Le signal qui a comblé l'écart le plus vite dans notre cohorte de 2025 : photos originales avec métadonnées EXIF, signatures d'auteur sur votre site, citations réelles d'entrevues clients. La pondération E-E-A-T de ChatGPT pénalise désormais activement le contenu qui sent « généré par IA » et récompense celui qui sent « humain, sur place, avec preuves ».
      </p>
      <p>
        Nous ajoutons par défaut le schéma de signature d'auteur sur les sites clients au forfait Core. Une heure de travail, hausse du taux de citation d'environ 25 % sur 60 jours selon nos données internes.
      </p>

      <SectionDivider />

      <h2 id="ce-que-vous-pouvez-faire-aujourd-hui">Ce que vous pouvez faire aujourd'hui</h2>
      <p>
        La correction en 48 heures : revendiquez votre fiche Yelp, votre fiche BBB et une fiche d'annuaire sectoriel si ce n'est pas déjà fait. Assurez-vous que le nom, l'adresse, le téléphone et la catégorie correspondent exactement sur les trois. ChatGPT évalue la cohérence du nom à la couche entité. Un seul triplet NAP incohérent coupe vos chances de citation de moitié.
      </p>
      <p>
        La correction sur un trimestre : Wikidata, signatures d'auteur et photos originales. Nous faisons ce travail aux forfaits Core et Growth. Ou bien vous pouvez le faire vous-même avec notre plan de 90 jours fourni dans le livrable d'audit.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <img
        src={meta.images.end}
        alt="Couverture du livrable d'audit montrant le plan de citations sur 90 jours pour la visibilité dans la recherche IA"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
