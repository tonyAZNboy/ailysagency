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
import { meta } from './local-seo-for-montreal-dentists'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'SEO local pour dentistes à Montréal, le playbook pratique 2026',
  metaDescription:
    "Un playbook de SEO local fonctionnel pour une clinique dentaire à Montréal en 2026. GBP, Apple Maps, citations NAP, avis bilingues, AI Overviews et l'ordre d'exécution.",
  tldr: "La meilleure stratégie de SEO local pour une clinique dentaire à Montréal en 2026 est séquencée, pas dispersée. Réclamez et ajustez Google Business Profile et Apple Maps Connect, bâtissez des citations NAP cohérentes dans les répertoires québécois, lancez une cadence d'avis bilingue, publiez du contenu ancré aux quartiers et auditez les citations AI Overviews chaque mois. Dans cet ordre, le local pack bouge en un trimestre.",
  faqItems: [
    {
      question: 'Quelle est la meilleure stratégie de SEO local pour une clinique dentaire à Montréal?',
      answer:
        "Séquencez le travail. Commencez par réclamer et ajuster Google Business Profile et Apple Maps Connect avec des catégories bilingues. Bâtissez des citations NAP dans les principaux répertoires québécois. Mettez en place un système d'avis bilingue qui livre 4 à 6 avis frais par mois. Publiez une pièce ancrée à un quartier par mois. Auditez les citations AI Overviews et Siri chaque trimestre. Les propriétaires qui suivent cet ordre montent généralement de deux positions dans le local pack en 90 jours.",
    },
    {
      question: 'Combien de temps prend le SEO local pour une clinique dentaire à Montréal?',
      answer:
        "Les gains rapides comme corriger les catégories GBP, les heures et les descriptions bilingues se voient en deux à trois semaines. Le nettoyage des citations et la cadence d'avis bilingues bougent le local pack en 60 à 90 jours. Le contenu de quartier et le travail Wikidata composent sur six à douze mois. La réponse honnête est un trimestre pour un mouvement visible du local pack, deux trimestres pour les gains AI Overviews et vocaux.",
    },
    {
      question: 'Ma clinique dentaire à Montréal a-t-elle besoin de contenu en anglais et en français?',
      answer:
        "Oui. Environ 60 % des recherches dentaires à Montréal sont en français, le reste partagé entre l'anglais et les requêtes bilingues. Google traite EN et FR comme des surfaces de classement séparées avec leur propre local pack. Sans une version FR-CA de votre site, vous concédez la moitié de votre marché local par défaut. Le français québécois écrit à la main est la norme, la traduction automatique sonne hors marque et érode la confiance.",
    },
    {
      question: 'Combien d\'avis Google une clinique dentaire à Montréal a-t-elle besoin?',
      answer:
        "Visez 80 à 150 avis cumulés avec 4 à 6 avis frais par mois. Le total compte moins que la fraîcheur, puisque Apple et Google pondèrent maintenant les 60 derniers jours plus fortement. Une clinique avec 100 avis et une cadence stable dépasse une clinique avec 400 avis et zéro activité récente. La variété bilingue d'avis est un bris d'égalité entre concurrents voisins de notes égales.",
    },
    {
      question: 'Faut-il faire Google Ads ou se concentrer sur le SEO local d\'abord?',
      answer:
        "Le SEO local d'abord. Google Ads achète du trafic, le SEO local le compose. Une clinique à Montréal avec un GBP qui fuit paie un coût par clic gonflé, parce que la même requête retourne aussi le local pack et les AI Overviews au-dessus des annonces. Réparez d'abord les signaux organiques et carto, ensuite empilez les annonces pour capter la demande que le local pack ne satisfait pas. La plupart des cliniques coupent les dépenses publicitaires de 25 à 40 % après le premier trimestre.",
    },
  ],
  headings: [
    { id: 'pourquoi-montreal-est-different', text: 'Pourquoi Montréal diffère d\'un marché de SEO local nord-américain générique' },
    { id: 'gbp-et-apple-maps-bilingues', text: 'GBP et Apple Maps Connect, bilingues dès le premier jour' },
    { id: 'citations-nap-quebec', text: 'Citations NAP dans les répertoires qui bougent le classement québécois' },
    { id: 'cadence-avis-bilingues', text: 'Cadence d\'avis bilingues, le bris d\'égalité du local pack' },
    { id: 'contenu-ancre-aux-quartiers', text: 'Contenu ancré aux quartiers, l\'actif qui compose le plus longtemps' },
    { id: 'ai-overviews-et-recherche-vocale', text: 'AI Overviews, Siri et recherche vocale pour les requêtes dentaires à Montréal' },
    { id: 'plan-90-jours-cliniques-montreal', text: 'Un plan de déploiement de 90 jours pour les propriétaires de cliniques à Montréal' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="Carte de Montréal montrant les résultats du local pack pour une requête dentiste près de moi en 2026"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Le meilleur SEO local pour dentistes à Montréal en 2026 est un travail séquencé. Réclamez et ajustez Google Business Profile et Apple Maps Connect avec des catégories principales bilingues, bâtissez des citations NAP cohérentes dans les répertoires québécois, lancez un système d'avis bilingues qui livre 4 à 6 avis frais par mois, publiez du contenu ancré aux quartiers, et auditez les citations AI Overviews et Siri chaque trimestre. Dans cet ordre, une clinique à Montréal gagne typiquement deux positions dans le local pack en un trimestre.
      </p>

      <StatHighlight
        stats={[
          { value: '60 %', label: 'Des recherches dentaires à Montréal sont en français' },
          { value: '4-6', label: 'Avis frais par mois pour tenir le classement local pack' },
          { value: '90 jours', label: 'Fenêtre typique avant que le local pack se réordonne' },
        ]}
      />

      <h2 id="pourquoi-montreal-est-different">Pourquoi Montréal diffère d'un marché de SEO local nord-américain générique</h2>
      <p>
        Montréal est un marché bilingue avec des entités de quartier serrées et un secteur dentaire réglementé. Environ 60 % des recherches dentaires en ville se font en français, avec de fortes concentrations de requêtes uniquement FR à Rosemont, Villeray, Hochelaga et Saint-Léonard, et des requêtes plus anglophones à Westmount, NDG, Côte-des-Neiges et l'Ouest-de-l'Île. Google traite EN et FR comme des surfaces de classement séparées. Une clinique qui publie seulement en anglais cède la moitié de la ville par défaut.
      </p>
      <p>
        Les entités de quartier sont aussi plus serrées que dans la plupart des villes nord-américaines. Une patiente du Plateau réservera rarement une clinique à 15 minutes en voiture. Le local pack de Google reflète ça. La carte est tranchée par station de métro et par arrondissement, pas par rayon de 5 km. Une clinique qui gagne pour « dentiste Plateau » peut perdre pour « dentiste Mile End » deux rues plus loin parce que l'entité de quartier a changé.
      </p>
      <p>
        Au-dessus de ça, le Québec a son propre écosystème de répertoires. Pages Jaunes Canada, 411.ca, Yelp Montréal et DentistesQC pèsent beaucoup plus dans la récupération que les petits répertoires américains qu'une agence hors province pourrait pousser. Le premier travail d'un programme de SEO local pour dentiste à Montréal est de reconnaître ces différences puis de les attaquer dans l'ordre.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>L'Ordre des dentistes du Québec maintient un répertoire public des dentistes membres. Son poids de citation dans la récupération est élevé en raison de l'autorité réglementaire. Une clinique qui n'y figure pas proprement est invisible pour une tranche non négligeable des requêtes des moteurs IA sur qui exerce en ville.</p>
      </CalloutBox>

      <h2 id="gbp-et-apple-maps-bilingues">GBP et Apple Maps Connect, bilingues dès le premier jour</h2>
      <p>
        Commencez par Google Business Profile. Réglez la catégorie principale à « Dentiste » et ajoutez des catégories secondaires qui reflètent chaque service offert : « Dentiste pédiatrique », « Dentisterie esthétique », « Orthodontiste », « Service dentaire d'urgence ». Chaque catégorie achemine une tranche différente de trafic vocal et IA. Sauter les secondaires coûte environ 15 à 20 % du volume longue traîne dans nos tests internes.
      </p>
      <p>
        Écrivez la description GBP deux fois. Une fois en anglais, une fois en français québécois, à la main, les deux avec le quartier nommé explicitement. Réglez les langues sur les services et les attributs de la même façon. Téléversez une fournée fraîche de photos chaque 30 jours, avec les métadonnées EXIF intactes. Les photos avec métadonnées pèsent plus que les images de banque dans la récupération parce qu'elles se lisent comme une expérience de première main.
      </p>
      <p>
        Réclamez ensuite Apple Maps Connect. Vérifiez par rappel ou carte postale, réglez les mêmes descriptions bilingues, alignez les catégories et confirmez que le géocode pointe au bon endroit. Apple Maps Connect est le plus gros levier dormant pour les cliniques dentaires québécoises. La plupart ne le réclament jamais parce que Google paie les factures, ce qui rend la réclamation maintenant un travail asymétrique.
      </p>

      <InternalLink
        to="/audit/gbp"
        title="Auditez votre GBP et Apple Maps en 24 heures"
        description="Audit gratuit couvrant les champs bilingues, la correspondance de catégories et la cadence d'avis pour les cliniques dentaires à Montréal."
      />

      <h2 id="citations-nap-quebec">Citations NAP dans les répertoires qui bougent le classement québécois</h2>
      <p>
        NAP signifie nom, adresse, téléphone. La cohérence dans les répertoires à forte autorité est ce que la couche de récupération évalue. Pour un dentiste à Montréal, la liste prioritaire est courte : Pages Jaunes Canada, 411.ca, Yelp Québec, le registre public de l'Ordre des dentistes du Québec, vos listes de réseaux d'assurances, et un ou deux répertoires d'industrie comme DentistesQC ou RateMDs. Nettoyer ces six vaut plus que de s'éparpiller sur 60 petits répertoires.
      </p>
      <p>
        Un triplet NAP incohérent coupe les chances de citation de moitié sur la recherche classique et IA. Auditez d'abord le nom exact. « Clinique Dentaire Plateau » sur GBP, « Plateau Dental Clinic » sur Yelp et « Clinique Dent. Plateau » sur Pages Jaunes sont trois entités différentes pour un moteur de récupération. Choisissez un nom canonique et synchronisez. Un changement de numéro de suite dans l'immeuble veut dire que le même audit reprend, citation par citation.
      </p>
      <p>
        La cohérence du téléphone compte au Québec en particulier à cause des messages d'accueil bilingues. Le numéro de téléphone sur le GBP, le pied de page du site, la fiche Yelp et les cartes imprimées doivent correspondre exactement, formatage compris. Affichez « (514) 555 0123 » partout ou « 514-555-0123 » partout. Un formatage incohérent apparaît comme une discordance NAP dans certains moteurs, même si l'humain lit le même numéro.
      </p>

      <SectionDivider />

      <h2 id="cadence-avis-bilingues">Cadence d'avis bilingues, le bris d'égalité du local pack</h2>
      <p>
        Le bris d'égalité du local pack entre deux cliniques avec des profils GBP et de citations comparables est la cadence d'avis. Visez 4 à 6 avis frais par mois avec une variété bilingue. Une clinique qui obtient trois avis FR et trois avis EN dans un mois dépasse une clinique qui obtient six avis FR seulement, parce que Google lit le mélange bilingue comme un signal que les deux langues du marché local sont servies.
      </p>
      <p>
        Concevez les invitations à laisser un avis. Envoyez la demande dans les 24 heures suivant le rendez-vous. Demandez à la patiente de mentionner le service qu'elle a vraiment reçu : nettoyage, blanchiment, pédiatrique, urgence, traitement de canal. Les mots-clés de service dans les avis se propagent maintenant au classement vocal sur Siri et aux citations AI Overviews sur Google. L'éloge générique comme « excellente clinique » ne fait presque rien pour la différenciation.
      </p>
      <p>
        Utilisez un outil d'acheminement qui envoie la demande sur Google, Apple et Pages Jaunes en même temps, dans la langue préférée du patient. Le module Reviuzy dans la pile AiLys s'occupe de cet acheminement et garde la cadence honnête. Sans système automatisé, la plupart des cliniques tombent sous le plancher de 4 avis par mois en deux mois et perdent silencieusement des positions dans le local pack.
      </p>

      <img
        src={meta.images.mid}
        alt="Tableau de bord de cadence d'avis bilingues pour une clinique dentaire à Montréal montrant la cadence FR et EN"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <h2 id="contenu-ancre-aux-quartiers">Contenu ancré aux quartiers, l'actif qui compose le plus longtemps</h2>
      <p>
        Le contenu ancré aux quartiers est l'actif qui compose le plus longtemps. Publiez une pièce par mois qui nomme un quartier précis de Montréal et un service précis. « Dentiste pédiatrique à Rosemont, à quoi s'attendre lors de la première visite » bat « La dentisterie pédiatrique en bref » à chaque fois, parce que l'entité de quartier dans le contenu renforce le signal du local pack.
      </p>
      <p>
        Jumelez chaque pièce de quartier à une sœur en français québécois écrite à la main, pas traduite par machine. La version FR doit utiliser des tournures québécoises là où elles s'inscrivent naturellement. Les deux pièces doivent se lier en hreflang et renvoyer à la page d'accueil du service ancrée au GBP. C'est aussi la couche de contenu que les AI Overviews citent pour les requêtes spécifiques à un quartier.
      </p>
      <p>
        Évitez de remplir le site avec des pages d'emplacement minces pour chaque arrondissement. Google pénalise les pages porte d'entrée et les moteurs IA les rétrogradent. Trois ou quatre pièces de quartier bien construites par trimestre, avec photos originales et citations d'entrevues de patientes, dépassent 30 pages minces sorties d'un gabarit. La barre est la qualité, la cadence est régulière, et la composition se voit aux mois 4 à 12.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir où vous en êtes dans la recherche IA et la voix? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <h2 id="ai-overviews-et-recherche-vocale">AI Overviews, Siri et recherche vocale pour les requêtes dentaires à Montréal</h2>
      <p>
        Les AI Overviews et la recherche vocale sont les nouvelles couches que les programmes de SEO local classique manquent. Une clinique avec des signaux GBP forts et une densité de citations perd encore si Google AIO et Perplexity citent un concurrent. Deux contrôles font la différence. D'abord, la couche de contenu bilingue avec photographie originale et signatures d'auteur se lit comme une expérience de première main pour les moteurs IA. Ensuite, la citation d'autorité réglementaire, soit l'inscription à l'Ordre des dentistes du Québec, ancre la confiance.
      </p>
      <p>
        Les requêtes vocales passent par Siri, Google Assistant et Alexa, chacun avec son propre classement. Siri lit Apple Maps Connect plus fortement, Google Assistant s'appuie sur les catégories GBP, Alexa tire de Yelp et de quelques flux sous licence. Auditez les requêtes vocales chaque trimestre depuis des appareils propres dans trois arrondissements différents. Nous avons vu des cliniques sortir entièrement des réponses vocales après un changement de catégorie dans Apple Maps que personne n'avait signalé.
      </p>
      <p>
        Suivez les citations AI Overviews chaque mois. Le moteur AI Visibility d'AiLys tire les citations sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, puis les associe aux requêtes qui amènent des rendez-vous. Voyez la page <InternalLink to="/services/ai-visibility" title="service AI Visibility" /> pour le diagnostic qui détaille quels moteurs citent la clinique versus le concurrent voisin.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Séquencez le travail, ne le dispersez pas. GBP et Apple Maps en premier, puis citations, puis avis bilingues, puis contenu, puis audits IA.',
          'Le bilinguisme n\'est pas négociable à Montréal. Le contenu en français québécois est écrit à la main, jamais par machine.',
          'Les entités de quartier sont serrées. Une clinique qui gagne au Plateau peut perdre au Mile End deux rues plus loin.',
          'Le classement AI Overviews et vocal sont des audits séparés, exécutez-les chaque trimestre par tests structurés.',
        ]}
      />

      <SectionDivider />

      <h2 id="plan-90-jours-cliniques-montreal">Un plan de déploiement de 90 jours pour les propriétaires de cliniques à Montréal</h2>
      <p>
        Jours 1 à 14, réclamez et ajustez Google Business Profile et Apple Maps Connect avec champs bilingues, auditez les catégories, rafraîchissez les photos avec EXIF et confirmez le géocode. Jours 15 à 30, corrigez le NAP dans les six répertoires québécois prioritaires. Jours 31 à 60, lancez le système d'avis bilingue avec une invitation à 24 heures et la variété de mots-clés de service. Jours 61 à 75, publiez deux pièces de contenu ancrées au quartier avec sœurs FR à la main.
      </p>
      <p>
        Jours 76 à 90, exécutez des tests structurés sur AI Overviews et requêtes vocales sur ChatGPT, Perplexity, Google AIO et Siri depuis des appareils propres dans trois arrondissements. Corrigez l'écart le plus large, puis planifiez le prochain audit trimestriel. La plupart des cliniques à Montréal qui suivent ce déploiement montent dans le top trois du local pack pour leur service principal dans l'arrondissement au mois quatre. La barre est l'exécution régulière, pas l'effort héroïque.
      </p>
      <p>
        Pour la version dentiste de l'audit AI Overviews et le flux de nettoyage des citations, voyez le hub <InternalLink to="/industries" title="playbooks d'industrie" />. Les propriétaires qui veulent sauter la phase de construction peuvent lancer l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" /> d'abord, puis réserver un appel stratégique de 60 minutes pour dimensionner le programme contre le profil GBP et avis actuel de la clinique.
      </p>

      <SectionDivider />

      <h2 id="faq">Questions fréquentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-xl border border-white/10 bg-white/[0.02] p-4">
          <summary className="font-semibold text-white/90 cursor-pointer">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem] leading-relaxed">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Propriétaire de clinique dentaire à Montréal consultant un plan de déploiement SEO local sur 90 jours avec audits GBP et AI Overviews"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
