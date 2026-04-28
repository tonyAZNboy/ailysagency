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
import { meta } from './gemini-local-results-ranking'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Comment se classer dans les résultats locaux Gemini, les facteurs 2026',
  metaDescription:
    "Comment les commerces locaux apparaissent dans les réponses locales de Gemini. Les cinq couches de classement (attributs GBP, densité schémas, fraîcheur EXIF, profondeur du graphe de citations, cohérence NAP) avec l'ordre pour les corriger.",
  tldr: "Les résultats locaux Gemini tirent leurs données de Google Business Profile, du web public et du graphe de données structurées que Google maintient autour de chaque commerce. Les cinq couches de classement qui font bouger les citations Gemini sont la complétude des attributs GBP, la densité des schémas sur le site public, la fraîcheur EXIF des photos, la profondeur du graphe de citations sur les annuaires tiers et la cohérence NAP. Les corriger dans cet ordre est le plan qui ferme l'écart de visibilité dans Gemini et les surfaces IA voisines.",
  faqItems: [
    {
      question: "Comment puis-je faire apparaître mon commerce dans les résultats locaux Gemini?",
      answer:
        "Gemini fait apparaître les commerces locaux en tirant les données de Google Business Profile, du web public et du graphe de données structurées que Google maintient. Cinq couches de classement bougent l'aiguille dans l'ordre de priorité : la complétude des attributs GBP (bascules booléennes pleinement remplies), la densité des schémas sur le site public (LocalBusiness, Service, FAQ, Review), la fraîcheur EXIF des photos, la profondeur du graphe de citations sur les annuaires tiers et la cohérence NAP. Les corriger dans cet ordre, et les citations Gemini suivent en deux à trois mois.",
    },
    {
      question: "Gemini utilise-t-il Google Business Profile de la même façon que Google Maps?",
      answer:
        "Gemini lit les mêmes données Google Business Profile, mais il pondère les signaux différemment. Maps pondère fortement la proximité, les avis et la correspondance de catégorie. Gemini pondère davantage la complétude des attributs, la fraîcheur des photos et le graphe de citations environnant, parce qu'il compose une réponse générative plutôt que de classer une liste. Un profil fort dans Maps peut quand même être invisible dans Gemini si les attributs et les citations tierces sont minces.",
    },
    {
      question: "Combien de temps avant de voir les citations Gemini après les correctifs?",
      answer:
        "Dans nos cas de référence, les premières citations Gemini arrivent 8 à 10 semaines après le travail de complétude des attributs GBP et la première poussée de densité de schémas. La fraîcheur EXIF des photos s'accumule sur des mois parce que Gemini pondère la cadence des photos fraîches, pas le total. La profondeur du graphe de citations et la cohérence NAP sont des signaux plus lents qui bougent sur un trimestre ou deux pendant que les annuaires tiers réindexent.",
    },
    {
      question: "Quels types de schémas comptent le plus pour la visibilité locale Gemini?",
      answer:
        "LocalBusiness est la fondation, avec le bon sous-type (Dentist, Restaurant, AutoRepair). Les entrées Service avec areaServed et la propriété priceRange ajoutent de la profondeur. Le schéma FAQ attaché à la bonne page améliore l'extraction de snippets. Le schéma Review avec la note agrégée et les propriétés d'avis individuels alimente le signal de confiance. La densité combinée de ces schémas sur le site public, plus que n'importe lequel pris seul, est ce qui bouge le taux de citations Gemini.",
    },
    {
      question: "Pourquoi la fraîcheur EXIF des photos est-elle un signal de classement Gemini?",
      answer:
        "Gemini favorise les endroits qui prouvent une opération continue. Les photos fraîches avec de vraies données EXIF (date récente, coordonnées GPS qui correspondent à l'adresse du commerce, signature de caméra qui ne ressemble pas à une banque d'images) sont la preuve de vie la moins chère que le moteur peut lire à grande échelle. Les photos de banque, les photos volées et les photos avec EXIF effacé se lisent comme un signal dégradé. Deux photos fraîches par semaine avec EXIF intact battent vingt photos de banque téléversées une seule fois.",
    },
  ],
  headings: [
    { id: 'comment-gemini-construit-une-reponse-locale', text: 'Comment Gemini construit une réponse locale' },
    { id: 'les-cinq-couches-dans-l-ordre', text: "Les cinq couches de classement, dans l'ordre" },
    { id: 'completude-des-attributs-gbp', text: 'Couche un, complétude des attributs GBP' },
    { id: 'densite-des-schemas', text: 'Couche deux, densité des schémas sur le site public' },
    { id: 'fraicheur-exif-des-photos', text: 'Couche trois, fraîcheur EXIF des photos' },
    { id: 'profondeur-du-graphe-de-citations', text: 'Couche quatre, profondeur du graphe de citations' },
    { id: 'coherence-nap-entre-annuaires', text: 'Couche cinq, cohérence NAP entre annuaires' },
    { id: 'plan-90-jours-pour-fermer-l-ecart', text: 'Plan 90 jours pour fermer l’écart' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les résultats locaux Gemini tirent leurs données de trois sources : Google Business Profile (voir l'<InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Définition complète de Google Business Profile et signaux de classement associés" /> pour la surface), le web public et le graphe de données structurées que Google maintient autour de chaque commerce. Le moteur compose une réponse générative plutôt que de classer une liste, ce qui veut dire que les signaux de SEO local classique comptent, mais avec une pondération différente. Les cinq couches de classement qui font bouger les citations Gemini sont la complétude des attributs GBP, la densité des schémas sur le site public, la fraîcheur EXIF des photos, la profondeur du graphe de citations sur les annuaires tiers et la cohérence NAP. Cette page parcourt les couches dans l'ordre de priorité, avec la séquence pour les corriger et la cadence à attendre.
      </p>

      <StatHighlight
        stats={[
          { value: '5 couches', label: 'Facteurs qui font bouger les citations Gemini' },
          { value: '8 à 10 semaines', label: 'Premières citations après GBP plus schémas' },
          { value: '2 photos / semaine', label: 'Cadence minimum pour le signal de fraîcheur EXIF' },
        ]}
      />

      <SectionDivider />

      <h2 id="comment-gemini-construit-une-reponse-locale">Comment Gemini construit une réponse locale</h2>
      <p>
        La recherche locale Google classique classe une liste. Le pack de cartes ramène trois commerces, l'utilisateur en choisit un, et le clic suit. Gemini compose une réponse. L'utilisateur demande « meilleur dentiste près de moi avec heures du samedi et stationnement gratuit », et Gemini répond par un paragraphe qui nomme deux ou trois commerces, résume pourquoi chacun convient, et renvoie vers la fiche GBP ou le site public. L'étape de composition est le moment où le SEO local devient de l'AI Visibility, parce que le moteur choisit maintenant ce qu'il dit du commerce, pas seulement s'il le mentionne.
      </p>
      <p>
        La composition s'appuie sur les données que le moteur peut extraire et vérifier. Les attributs GBP alimentent le filtre d'éligibilité (heures du samedi, stationnement). Les schémas sur le site public alimentent la description et les signaux de confiance. L'EXIF des photos alimente la preuve d'opération. Le graphe de citations alimente la corroboration que le commerce existe sur plusieurs sources. La cohérence NAP alimente la désambiguïsation entre ce commerce et un autre au nom similaire de l'autre côté de la ville. Une faille dans une seule des couches réduit la chance que Gemini compose le commerce dans la réponse.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour comprendre le contexte de comment les moteurs IA choisissent qui citer, voir <InternalLink to="/glossary/share-of-model" title="Entrée glossaire Share of Model" description="La métrique qu'AiLys utilise pour suivre la part de citations dans ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot" />. La part de citations Gemini suit la même forme que les autres moteurs, avec un poids supplémentaire sur les attributs GBP et la fraîcheur des photos.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir où en est votre commerce dans la recherche IA? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="les-cinq-couches-dans-l-ordre">Les cinq couches de classement, dans l'ordre</h2>
      <p>
        L'ordre compte parce que chaque couche alimente la suivante. Remplir les attributs GBP en premier donne au moteur un filtre d'éligibilité propre. Ajouter la densité de schémas en deuxième lui donne une source publique pour corroborer les données GBP. La fraîcheur EXIF en troisième lui donne la preuve d'opération. La profondeur du graphe de citations en quatrième lui donne la corroboration tierce. La cohérence NAP en dernier nettoie la désambiguïsation. Sauter l'ordre, corriger le NAP en premier alors que les attributs GBP sont remplis à 30 pour cent, gaspille l'effort parce que le moteur ne franchit jamais le filtre d'éligibilité pour lire le graphe de citations.
      </p>
      <p>
        L'ordre épouse aussi la courbe de coût. Le travail des attributs GBP est rapide et peu coûteux (quelques heures dans le tableau de bord). La densité de schémas est un effort moyen (un ou deux jours de développeur pour un petit site). La fraîcheur EXIF est un effort faible mais continu (deux photos par semaine venant du téléphone du client). La profondeur du graphe de citations est un effort moyen à élevé (réécritures NAP sur vingt à cinquante annuaires). La cohérence NAP est le signal lent qui bouge sur un trimestre pendant que les annuaires réindexent. Faire les couches faciles en premier construit la dynamique.
      </p>

      <h3>Les cinq couches en un tableau</h3>
      <ul>
        <li>Couche 1, complétude des attributs GBP : bascules booléennes pleinement remplies, catégories primaire et secondaires, liste de services, heures incluant les jours fériés</li>
        <li>Couche 2, densité de schémas : LocalBusiness avec le bon sous-type, entrées Service, schéma FAQ, agrégat Review</li>
        <li>Couche 3, fraîcheur EXIF des photos : deux photos par semaine au minimum, vrais EXIF, GPS qui correspond à l'adresse du commerce</li>
        <li>Couche 4, profondeur du graphe de citations : fiches NAP cohérentes sur vingt à cinquante annuaires pertinents pour l'industrie</li>
        <li>Couche 5, cohérence NAP : nom, adresse et format de téléphone identiques sur chaque surface publique</li>
      </ul>

      <SectionDivider />

      <h2 id="completude-des-attributs-gbp">Couche un, complétude des attributs GBP</h2>
      <p>
        Les attributs GBP sont les bascules booléennes du profil (accessible en fauteuil roulant, Wi-Fi gratuit, terrasse, accepte les réservations, heures du samedi, stationnement gratuit). La plupart des profils remplissent 30 à 50 pour cent des attributs disponibles, parce que le tableau de bord cache la longue liste sous des sous-menus et la plupart des commerçants s'arrêtent aux évidents. Le moteur lit chaque bascule. Celles qui ne sont pas remplies sont des failles silencieuses qui excluent le commerce des requêtes qui filtrent sur ces attributs.
      </p>
      <p>
        Voir l'<InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Définition complète de Google Business Profile et signaux de classement associés" /> pour la liste complète d'attributs par type de commerce. Le raccourci est d'ouvrir le profil en mode édition, parcourir chaque sous-menu, et activer chaque attribut qui s'applique. C'est deux à trois heures de travail pour un commerce mono-emplacement, et c'est la seule action à plus fort levier de la liste, parce que chaque couche suivante corrobore un filtre d'attribut qui n'existe pas si les bascules sont vides.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le module Reviuzy fait remonter les écarts dans le tableau de bord avec des correctifs en un seul tap. Si l'opérateur a déjà Reviuzy, l'audit d'attributs est un seul écran qui montre les bascules non remplies par emplacement et permet au commerçant de les corriger en lot. Sans Reviuzy, le même audit est une marche manuelle dans chaque sous-menu du tableau de bord GBP.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="densite-des-schemas">Couche deux, densité des schémas sur le site public</h2>
      <p>
        La densité des schémas sur le site public est la deuxième couche parce qu'elle donne à Gemini une source publique pour corroborer les données GBP. L'ensemble minimum pour un commerce local est LocalBusiness avec le bon sous-type (Dentist, Restaurant, AutoRepair, MedicalClinic), des entrées Service avec areaServed et priceRange, le schéma FAQ attaché à la section FAQ, et l'agrégat Review avec la note et le nombre d'avis. Chaque entrée de schéma est un paragraphe structuré que le moteur peut lire sans analyser la prose.
      </p>
      <p>
        La densité compte plus que n'importe quel schéma pris seul. Un site qui a seulement LocalBusiness est mince. Un site qui a LocalBusiness, trois entrées Service, un bloc FAQ et l'agrégat Review est dense. Le moteur traite la densité comme un signal de confiance, parce qu'un site qui livre des données structurées sur chaque entité pertinente est un site dont l'auteur a compris la surface technique, ce qui corrèle avec le sérieux opérationnel. Ce n'est pas une particularité Gemini. C'est ainsi que tout moteur IA moderne lit le web public.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quelle couche un commerce local doit-il corriger EN PREMIER pour commencer à apparaître dans les résultats locaux Gemini?"
        options={[
          'La cohérence NAP entre tous les annuaires',
          'La complétude des attributs GBP sur le profil',
          'Le nombre de backlinks venant de domaines autoritaires',
          'La distribution de communiqués de presse',
        ]}
        correctIndex={1}
        explanation="La complétude des attributs GBP est la première couche parce qu'elle alimente le filtre d'éligibilité. Tant que les bascules booléennes ne sont pas pleinement remplies, les requêtes qui filtrent sur les attributs (heures du samedi, stationnement gratuit, accessibilité) excluent silencieusement le commerce. Chaque couche suivante corrobore un filtre d'attribut qui n'existe pas si les bascules sont vides."
      />

      <SectionDivider />

      <h2 id="fraicheur-exif-des-photos">Couche trois, fraîcheur EXIF des photos</h2>
      <p>
        La fraîcheur EXIF des photos est le signal de preuve d'opération. Un profil avec douze photos téléversées il y a trois ans se lit comme statique. Un profil avec deux photos fraîches par semaine, chaque semaine, se lit comme un commerce en activité. Le moteur préfère les commerces en activité pour toute requête locale, parce que l'intention de l'utilisateur est presque toujours au présent (« ouvert maintenant », « cette fin de semaine », « aujourd'hui »). Les données EXIF sont la preuve la moins chère que le moteur peut vérifier à grande échelle, parce qu'elles portent un horodatage, des coordonnées GPS et une signature de caméra qui doivent toutes s'aligner.
      </p>
      <p>
        La cadence à maintenir est de deux photos par semaine au minimum, avec de la variété entre intérieur, extérieur, plats ou produits, équipe et façade. Les photos doivent venir d'un vrai appareil sur place, pas d'une banque d'images et pas d'un JPEG sans métadonnées. L'app Reviuzy sur le téléphone du client applique cette règle en captant via la caméra native et en poussant le fichier avec EXIF intact. Les photos de banque et les photos volées sont détectables par Google et elles érodent plutôt que construisent le signal de fraîcheur.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma des métadonnées EXIF avec horodatage, coordonnées GPS et signature de caméra qui alimentent le signal de fraîcheur Gemini"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="profondeur-du-graphe-de-citations">Couche quatre, profondeur du graphe de citations</h2>
      <p>
        La profondeur du graphe de citations est la corroboration tierce. Gemini lit le web public et traite un commerce qui apparaît sur vingt à cinquante annuaires pertinents pour l'industrie avec un NAP cohérent comme plus réel qu'un qui apparaît sur trois. La profondeur compte plus que le volume. Vingt annuaires choisis et pertinents battent cent annuaires de faible pertinence. Pour une clinique québécoise, l'ensemble pertinent inclut le répertoire du collège médical provincial, la chambre de commerce locale, RDV Santé et les principaux annuaires canadiens (Pages Jaunes, Yelp Canada, Apple Business Connect, Bing Places). Pour un restaurant, l'ensemble inclut OpenTable, Tourisme Québec, Tripadvisor et les guides gastronomiques locaux.
      </p>
      <p>
        Le travail pour bâtir le graphe de citations est de réécrire le NAP sur chaque annuaire, de réclamer toute fiche non réclamée, et d'ajouter le commerce aux annuaires manquants. C'est un projet de deux à trois mois pour un emplacement unique, et il porte ses fruits à mesure que les annuaires réindexent. Les premières citations Gemini arrivent avant que le graphe complet soit bâti, parce que le moteur lit d'abord les annuaires de plus haute autorité, mais le plein effet s'accumule sur un trimestre.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Évitez les fermes de citations et les agrégateurs de liens. Ce sont les raccourcis qui ressemblent à du progrès dans le tableur mais qui envoient le mauvais signal au moteur. Un profil lié depuis quarante fermes de liens se lit comme manipulé. Un profil lié depuis vingt annuaires pertinents se lit comme réel. Le raccourci pas cher est la route lente, parce que le moteur dévalue le profil lié à des fermes et l'opérateur paie une seconde fois pour nettoyer.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="coherence-nap-entre-annuaires">Couche cinq, cohérence NAP entre annuaires</h2>
      <p>
        La cohérence NAP est la couche de désambiguïsation. Sur chaque annuaire, chaque profil social, chaque page publique, le nom, l'adresse et le téléphone du commerce doivent correspondre. Correspondre veut dire littéralement identique : le même format de numéro de bureau, le même format de téléphone, la même graphie du nom du commerce. Le moteur fait correspondre entre les surfaces avec une comparaison de chaînes, et toute dérive entre surfaces (123 Rue Saint-Denis sur un site, 123 St-Denis Street sur un autre) alimente un problème de résolution d'entité que le moteur résout en dévaluant les deux surfaces.
      </p>
      <p>
        Le travail d'audit est simple. Lister chaque surface publique qui nomme le commerce. Choisir le format NAP canonique. Réécrire chaque surface pour qu'elle corresponde. Soumettre les corrections via le flux d'édition de chaque annuaire, qui est parfois immédiat et parfois une file d'approbation de 30 jours. La surface lente est celle que le moteur respecte, parce que les corrections lentes sont plus difficiles à truquer. C'est pourquoi la cohérence NAP est le signal lent qui bouge sur un trimestre ou deux, et pourquoi elle vient en dernier dans l'ordre de priorité même si elle ressemble à une fondation.
      </p>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys qui livrent le travail de correction des cinq couches, de Starter à 300 dollars CAD à Agency à 2 500 dollars CAD." buttonText="Voir les forfaits" />

      <InlineCTA variant="book" text="Vous voulez un audit guidé de 60 minutes qui note les cinq couches pour votre commerce? Sans pitch, fiche d'évaluation livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="plan-90-jours-pour-fermer-l-ecart">Plan 90 jours pour fermer l'écart</h2>
      <p>
        Semaines un et deux : complétude des attributs GBP sur chaque sous-menu. C'est la couche la plus rapide, la moins chère et à plus fort levier. Semaines trois et quatre : densité des schémas sur le site public, avec un développeur qui pousse LocalBusiness avec le bon sous-type, trois entrées Service, le schéma FAQ et l'agrégat Review. Semaines cinq à douze : fraîcheur EXIF des photos sur une cadence de deux par semaine, avec des photos qui viennent de l'appareil du client. Semaines six à dix en parallèle : profondeur du graphe de citations, avec réécritures NAP sur vingt annuaires pertinents. Semaines huit à douze en parallèle : audit et corrections de cohérence NAP.
      </p>
      <p>
        Les premières citations Gemini arrivent typiquement en semaine huit à dix dans nos cas de référence, après le travail d'attributs GBP et la première poussée de schémas. Le plein effet s'accumule en semaine douze et au-delà, à mesure que le graphe de citations et les corrections NAP se réindexent. Au-delà de 90 jours, la cadence d'entretien est la mise en ligne de photos, la révision mensuelle des attributs et l'audit NAP trimestriel. Les cinq couches ne sont pas une correction unique. C'est une posture continue.
      </p>

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Les résultats locaux Gemini tirent leurs données de GBP, du web public et du graphe de données structurées Google. Les cinq couches font bouger les citations.',
          "L'ordre est complétude des attributs GBP, puis densité des schémas, puis fraîcheur EXIF, puis profondeur du graphe de citations, puis cohérence NAP.",
          "La complétude des attributs GBP est l'action de plus fort levier en premier parce que chaque couche suivante corrobore un filtre d'attribut.",
          "La fraîcheur EXIF des photos exige deux photos par semaine au minimum, depuis l'appareil du client, avec métadonnées intactes.",
          'Les premières citations arrivent en 8 à 10 semaines. Le plein effet s’accumule sur un trimestre à mesure que le graphe de citations se réindexe.',
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
        alt="Chronologie du plan 90 jours pour corriger les cinq couches de classement local Gemini par ordre de priorité"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
