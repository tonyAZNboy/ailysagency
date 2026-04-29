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
import { meta } from './law-firm-seo-quebec-playbook'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "SEO pour cabinets d'avocats au Québec, le playbook AI Overviews et pack local 2026",
  metaDescription:
    "Comment les cabinets en droit familial et en immigration au Québec se classent dans les AI Overviews, le pack local et Perplexity. Crédentials du Barreau, pages bilingues, schéma Attorney et travail de citations.",
  tldr: "Les cabinets en droit familial et en immigration au Québec se classent dans les AI Overviews quand quatre signaux s'empilent : la crédence Ordre des avocats du Québec branchée sur le schéma Attorney, des pages d'atterrissage bilingues avec piliers EN et FR pour chaque domaine de pratique, des citations cohérentes en NAP sur Avvo, Lawyer.com, Lexology et LegalDirectories.com, et des pages FAQ structurées qui répondent aux questions longues que les clients tapent vraiment. Dans cet ordre, un cabinet québécois gagne typiquement des citations AI Overview sur trois à cinq requêtes par domaine de pratique en un trimestre.",
  faqItems: [
    {
      question: "Comment les cabinets en droit familial au Québec se classent-ils dans les AI Overviews?",
      answer:
        "Les cabinets en droit familial au Québec gagnent des citations AI Overview quand quatre signaux s'alignent. Premièrement, le cabinet a la crédence Ordre des avocats du Québec référencée dans le schéma Attorney et visible sur chaque page biographique d'avocat. Deuxièmement, des pages d'atterrissage bilingues couvrent chaque domaine de pratique avec des piliers EN et FR-CA en parallèle. Troisièmement, les citations sur Avvo, Lawyer.com, Lexology et LegalDirectories.com portent toutes le même NAP. Quatrièmement, des pages FAQ répondent aux questions longues en langage clair. Les moteurs IA citent les cabinets qui se lisent comme faisant autorité, à jour et conformes localement, ce qui est exactement ce que démontrent ces quatre signaux.",
    },
    {
      question: "La crédence du Barreau du Québec compte-t-elle pour le SEO?",
      answer:
        "Oui, de deux façons. Le numéro de membre du Barreau ancre les signaux de confiance E-E-A-T, surtout pour les Google AI Overviews et Perplexity qui citent tous deux les annuaires juridiques tirant des dossiers du Barreau. La crédence est aussi une exigence stricte pour ProBono Avocat, JuriBistro et plusieurs autres annuaires juridiques québécois qui alimentent le graphe de citations. Les cabinets sans la crédence affichée dans le schéma Attorney perdent les citations AI Overview au profit des cabinets qui font ressortir le numéro proprement sur chaque page biographique.",
    },
    {
      question: "Les cabinets d'avocats québécois ont-ils besoin de pages d'atterrissage en anglais et en français?",
      answer:
        "Oui. Les recherches en droit familial et en immigration à Montréal se partagent à peu près 55 % en français et 45 % en anglais, l'immigration penchant légèrement plus en anglais et le droit familial penchant légèrement plus en français. Google classe l'EN et le FR comme deux surfaces séparées avec leurs propres AI Overviews. Un cabinet qui publie seulement en anglais rate environ la moitié du marché local et cède les citations AI Overview sur les requêtes FR au prochain cabinet avec une couverture bilingue. Le français québécois est obligatoire, rédigé à la main, avec les graphies régionales.",
    },
    {
      question: "Quels annuaires juridiques comptent le plus pour les citations AI Overview au Québec?",
      answer:
        "Dans nos sondes hebdomadaires AI Overview pour le droit familial et l'immigration à Montréal, les annuaires qui apparaissent le plus souvent comme sources citées sont Lexology, LegalDirectories.com, Avvo, Lawyer.com et l'annuaire JuriBistro géré par CAIJ. L'annuaire des avocats du Barreau du Québec lui-même est la source la plus fiable quand un cabinet a la crédence affichée. Les cabinets cités par deux ou plus de ces annuaires avec un NAP cohérent gagnent leur place dans les AI Overview plus vite que ceux qui s'appuient seulement sur Google Business Profile.",
    },
    {
      question: "Combien de temps avant qu'un cabinet québécois voie des citations AI Overview après le lancement du playbook?",
      answer:
        "Les gains rapides sur le schéma de crédence et la couverture bilingue se voient en deux à trois semaines. Le nettoyage des citations sur les cinq annuaires prioritaires prend 60 à 90 jours parce que les files de modération roulent à la semaine. La première citation AI Overview tombe généralement au deuxième mois, et la part de citation stable sur trois à cinq requêtes par domaine de pratique tombe au troisième mois. La patience compte parce que les requêtes juridiques ont des seuils de confiance plus hauts que les requêtes en commerce de détail ou en hôtellerie.",
    },
  ],
  headings: [
    { id: 'pourquoi-cabinets-quebec-playbook-different', text: "Pourquoi les cabinets québécois ont besoin d'un autre playbook SEO" },
    { id: 'credence-barreau-et-schema-attorney', text: 'Crédence Ordre des avocats du Québec et schéma Attorney' },
    { id: 'pages-bilingues-par-domaine-de-pratique', text: "Pages d'atterrissage bilingues par domaine de pratique, EN et FR-CA" },
    { id: 'coherence-nap-annuaires-juridiques', text: 'Cohérence NAP sur Avvo, Lawyer.com, Lexology, JuriBistro' },
    { id: 'patrons-citation-ai-overviews-juridique', text: 'Patrons de citation AI Overviews pour les requêtes juridiques au Québec' },
    { id: 'pages-faq-longues-traines-familial-immigration', text: "Pages FAQ qui répondent aux questions longues en familial et immigration" },
    { id: 'plan-90-jours-cabinet-quebec', text: "Un plan de 90 jours pour un cabinet d'avocats québécois" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le droit familial et l'immigration sont les deux domaines de pratique les plus volumineux dans les AI Overviews au Québec, et ce sont aussi les deux où la plupart des cabinets laissent des citations sur la table. La correction n'est pas plus de contenu, ce sont des signaux de confiance structurés que les moteurs IA peuvent vérifier en un coup d'œil. La crédence Ordre des avocats du Québec branchée sur le schéma Attorney, des pages d'atterrissage bilingues par domaine de pratique, des citations NAP cohérentes sur Avvo, Lawyer.com, Lexology et LegalDirectories.com, et des pages FAQ qui répondent aux questions que les clients tapent vraiment. Voici le playbook SEO 2026 pour les cabinets d'avocats au Québec.
      </p>

      <StatHighlight
        stats={[
          { value: '55 / 45', label: 'Partage FR / EN des recherches en droit familial à Montréal' },
          { value: '5', label: 'Annuaires prioritaires qui font bouger les citations AI Overview' },
          { value: '60-90 j', label: 'Fenêtre vers la part de citation par domaine de pratique' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-cabinets-quebec-playbook-different">Pourquoi les cabinets québécois ont besoin d'un autre playbook SEO</h2>
      <p>
        Les conseils SEO juridiques écrits pour les États-Unis ou l'Ontario ne se transposent pas proprement au Québec. Trois facteurs locaux changent la donne. L'Ordre des avocats du Québec est le seul organisme de crédence, et les moteurs IA ont appris à faire confiance à l'annuaire du Barreau au-dessus des sites de listage génériques. Le Québec est un marché bilingue où les requêtes françaises dépassent les anglaises en droit familial, et la division linguistique n'est pas un problème de traduction mais une surface de classement séparée. Le droit civil diffère de la common law en vocabulaire et en procédure, donc les questions longues que les clients tapent sont différentes de celles que vise un cabinet de Toronto.
      </p>
      <p>
        Cette réalité régionale fait qu'un cabinet québécois doit bâtir un schéma Attorney avec crédence, pas juste un schéma LocalBusiness générique. Elle fait que les pages d'atterrissage doivent exister en EN et FR-CA avec une structure parallèle et un texte rédigé à la main. Elle fait que le travail de citations vise une liste d'annuaires consciente du Québec, pas une liste nord-américaine générique. Les moteurs IA notent l'autorité par la cohérence entre sources, et l'ensemble de sources au Québec est plus serré et plus précis que celui que présument la plupart des playbooks d'agences nationales.
      </p>
      <p>
        La bonne nouvelle est que les signaux propres au Québec sont plus faciles à livrer qu'on le croit. L'annuaire du Barreau est gratuit à maintenir. Les pages d'atterrissage bilingues sont un travail mécanique une fois la liste des domaines de pratique fixée. Les cinq annuaires prioritaires couvrent le graphe de citations que les moteurs IA sondent vraiment. Les pages FAQ structurées peuvent se rédiger en deux séances par domaine de pratique. Le travail est séquencé, pas exotique.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Le levier le plus grand qu'on mesure pour les citations AI Overview des cabinets québécois, c'est le schéma Attorney avec un numéro de membre du Barreau vérifié. Les cabinets qui font ressortir la crédence proprement en JSON-LD sur chaque page biographique d'avocat gagnent des citations environ deux fois plus souvent que ceux qui enterrent la crédence dans un pied de page ou la sautent. Les moteurs IA traitent le schéma avec crédence comme un chemin de vérification de confiance, pas un macaron de vanité.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit gratuit en 24 heures du schéma Attorney, de la couverture bilingue et de la part de citation AI Overview de votre cabinet? Lancez l'audit AiLys." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="credence-barreau-et-schema-attorney">Crédence Ordre des avocats du Québec et schéma Attorney</h2>
      <p>
        Chaque avocat dans un cabinet québécois a un numéro de membre du Barreau. Ce numéro est l'ancre de confiance pour les moteurs IA. La correction consiste à brancher le numéro dans un schéma Attorney sur chaque page biographique d'avocat, avec le type de crédence réglé sur ProfessionalService et l'appartenance encodée comme une référence Organization vers l'entité Barreau du Québec sur Wikidata. Combiné avec un schéma LocalBusiness sur la page du cabinet, ceci donne à Google, Perplexity et Bing Copilot les signaux de confiance structurés qu'ils cherchent.
      </p>
      <p>
        L'implémentation est directe en JSON-LD. Sur une page biographique, livrez un bloc de schéma Attorney avec name, image, jobTitle, alumniOf et un tableau memberOf qui référence le Barreau du Québec. Sur la page du cabinet, livrez un bloc de schéma LocalBusiness ou LegalService avec le NAP du cabinet, les heures d'ouverture, areaServed, et un tableau department qui référence chaque avocat. Les moteurs IA analysent les relations et notent l'autorité selon les renvois croisés, pas les blocs individuels seuls.
      </p>

      <h3>La liste de vérification du schéma Attorney</h3>
      <ul>
        <li>Pages biographiques d'avocat livrent Attorney ou Person avec l'appartenance au Barreau encodée</li>
        <li>Page du cabinet livre LegalService avec NAP, heures et areaServed</li>
        <li>Chaque biographie renvoie au cabinet via worksFor et le cabinet renvoie à chaque avocat via department</li>
        <li>Pages de domaine de pratique livrent Service avec provider qui pointe vers le cabinet</li>
        <li>Pages FAQ livrent FAQPage avec des paires question-réponse spécifiques au domaine de pratique</li>
        <li>Schéma de fil d'Ariane sur chaque page pour que les moteurs IA cartographient l'architecture du cabinet</li>
      </ul>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Si vous héritez d'un site de cabinet sans aucun schéma, ne collez pas un bloc LocalBusiness générique en pensant avoir terminé. Le schéma Attorney avec crédence du Barreau est le mouvement asymétrique parce que la plupart des cabinets concurrents ne l'ont pas encore fait. Six heures de travail de données structurées surclassent généralement six mois de production de contenu non structuré pour les citations AI Overview sur les requêtes juridiques.</p>
      </CalloutBox>

      <InternalLink
        to="/glossary/schema"
        title="Glossaire des données structurées et du schéma"
        description="Définitions claires pour Attorney, LegalService, FAQPage et le reste du vocabulaire de schéma que les moteurs IA analysent."
      />

      <SectionDivider />

      <h2 id="pages-bilingues-par-domaine-de-pratique">Pages d'atterrissage bilingues par domaine de pratique, EN et FR-CA</h2>
      <p>
        Le droit familial à Montréal voit environ 55 % de requêtes françaises pour 45 % anglaises, avec des balancements saisonniers autour de la rentrée de septembre et de la saison des impôts. L'immigration voit l'inverse avec environ 45 % de français et 55 % d'anglais, pondéré par le pays d'origine de la population immigrante. L'implication est la même pour les deux : chaque page d'atterrissage par domaine de pratique a besoin d'un jumeau FR-CA avec une structure parallèle et un texte rédigé à la main.
      </p>
      <p>
        Les pages piliers devraient couvrir les domaines que le cabinet plaide vraiment : divorce, garde d'enfants, pension alimentaire, séparation de conjoints de fait, contrats de mariage pour le familial. Résidence permanente, parrainage, demandes de réfugié, permis de travail, permis d'études pour l'immigration. Chaque pilier devrait avoir une page de 1 500 à 2 500 mots en EN et une page parallèle FR-CA avec la même structure de titres, les mêmes liens internes, et un français québécois rédigé à la main. Les pages ne devraient pas être des traductions automatiques parce que les moteurs IA détectent les artefacts de traduction et abaissent le poids de la source.
      </p>
      <p>
        Le maillage interne compte autant que le contenu. Le pilier divorce en anglais devrait pointer vers le pilier divorce en français via une balise hreflang et un sélecteur de langue visible. Chaque pilier devrait pointer vers deux ou trois pages FAQ sur le même domaine de pratique. Les pages biographiques devraient pointer vers les domaines que chaque avocat couvre. Cette architecture d'information est ce qui donne aux moteurs IA le graphe de citations qu'ils récompensent.
      </p>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Un cabinet en droit familial à Montréal publie seulement des pages d'atterrissage en anglais et obtient un fort classement dans le pack local sur les requêtes EN. Quel est le plus grand angle mort dans sa part de citation AI Overview?"
        options={[
          'Les pages sont trop longues pour être indexées par Google',
          'Le cabinet cède environ la moitié du volume FR-CA aux cabinets avec couverture bilingue',
          "Il faut ajouter plus de photos d'avocats sur les pages biographiques",
          "Il faut payer Google Ads pour combler l'écart",
        ]}
        correctIndex={1}
        explanation="Les recherches en droit familial à Montréal se partagent à peu près 55 % français et 45 % anglais. Un cabinet avec des pages EN seulement ne peut pas gagner de citations AI Overview sur les requêtes FR parce que le moteur IA n'a rien à citer. Des pages d'atterrissage bilingues avec un français québécois rédigé à la main ferment l'écart, et Google Ads ne remplace pas la couverture organique FR."
      />

      <SectionDivider />

      <h2 id="coherence-nap-annuaires-juridiques">Cohérence NAP sur Avvo, Lawyer.com, Lexology, JuriBistro</h2>
      <p>
        Les moteurs IA recoupent l'identité d'entreprise sur plusieurs annuaires avant de citer une source. Pour les cabinets québécois, la liste prioritaire est serrée : Avvo pour le graphe juridique large, Lawyer.com pour la reconnaissance internationale, Lexology pour le signal de confiance éditorial, LegalDirectories.com pour la densité de citations, et JuriBistro de CAIJ pour l'autorité propre au Québec. L'annuaire du Barreau du Québec lui-même est la source au sommet. Le NAP doit correspondre exactement entre les six surfaces.
      </p>
      <p>
        Les modes d'échec NAP sont prévisibles. Un numéro écrit 514-555-1234 sur le site mais 514.555.1234 sur Avvo et (514) 555-1234 sur Lawyer.com se lit comme trois numéros distincts pour un analyseur fragile. Une adresse écrite avec « Suite 500 » sur un annuaire, « Bureau 500 » sur un autre et « # 500 » sur un troisième se lit comme trois lieux différents. Auditez la liste de six sources une fois, normalisez vers une seule forme canonique, puis mettez à jour chaque annuaire dans la même semaine pour que le changement se propage sans versions concurrentes.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma du graphe de citations à six sources pour un cabinet québécois couvrant Barreau, Avvo, Lawyer.com, Lexology, LegalDirectories.com et JuriBistro"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le tueur silencieux pour les cabinets québécois est la variante NAP bilingue. Certains annuaires acceptent « Suite » et d'autres veulent « Bureau » pour l'accessibilité au Québec. Si vous laissez l'annuaire traduire automatiquement, vous vous retrouvez avec un NAP mixte qui rate la vérification entre sources. Choisissez un NAP canonique par langue, et appliquez la forme EN sur les annuaires EN et la forme FR sur les annuaires FR. Ne mélangez pas.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 60 minutes de l'audit de citations à six sources sur votre cabinet? Réservez un appel stratégique, sans pitch, le doc reste à vous." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="patrons-citation-ai-overviews-juridique">Patrons de citation AI Overviews pour les requêtes juridiques au Québec</h2>
      <p>
        Les Google AI Overviews sur les requêtes juridiques citent différemment des requêtes commerce. Le seuil de confiance est plus haut, donc les AI Overviews tendent à citer d'abord les annuaires (Barreau, Lexology, JuriBistro) puis les pages de cabinets individuelles. Un cabinet gagne la citation de second rang en étant le meilleur appariement côté annuaire, pas en écrivant le plus long billet de blogue. Perplexity se comporte de façon similaire avec un penchant un peu plus fort pour Wikipedia et les sources gouvernementales sur les questions de procédure.
      </p>
      <p>
        Le patron pour les requêtes en droit familial comme « comment déposer un divorce au Québec » est constant. La première source citée est généralement la page Justice du gouvernement du Québec. La deuxième est souvent une page du Barreau ou de JuriBistro. La troisième est une page de cabinet qui se classe parce que le cabinet a le schéma Attorney, la couverture bilingue et une page FAQ qui répond à la question de procédure en langage clair. Atteignez la troisième fente de citation et les AI Overviews envoient un trafic de recommandation qui vaut plus que la plupart des placements payants.
      </p>
      <p>
        Pour le droit de l'immigration, le patron glisse vers Immigration, Réfugiés et Citoyenneté Canada (IRCC) pour les réponses de procédure, puis vers les pages de cabinets pour les réponses stratégiques et propres au dossier. Un cabinet qui publie une page claire sur « quelle est la différence entre un permis d'études et un permis de travail au Québec » peut gagner la citation AI Overview pour cette requête longue en deux à trois mois si le schéma et la couverture bilingue sont propres.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Les AI Overviews se mettent à jour en continu mais avec un décalage notable de deux à quatre semaines entre la mise en ligne d'une page et le moment où elle peut gagner une citation. Ne paniquez pas si une page fraîche n'apparaît pas dans l'ensemble des citations AI Overview la même semaine. Attendez un mois complet, puis auditez le schéma et la couverture bilingue avant de présumer que la page est le problème.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pages-faq-longues-traines-familial-immigration">Pages FAQ qui répondent aux questions longues en familial et immigration</h2>
      <p>
        Les moteurs IA citent les pages FAQ de façon disproportionnée sur les requêtes juridiques parce que le format question-réponse correspond à la façon dont les utilisateurs formulent leurs requêtes vocales et conversationnelles. Bâtissez une page FAQ par domaine de pratique en EN, avec une page FAQ parallèle en FR-CA. Chaque page devrait répondre à 8 à 12 questions, chaque réponse de 60 à 120 mots, en langage clair sans jargon. Livrez un schéma FAQPage sur chaque page et liez du pilier de domaine de pratique vers la FAQ et inversement.
      </p>
      <p>
        Les questions devraient venir des notes d'accueil des clients, pas de variations inventées. Les questions courantes en droit familial incluent « comment la pension alimentaire est-elle calculée au Québec », « combien coûte un divorce au Québec », « combien de temps prend un divorce » et « ai-je besoin d'un avocat pour un divorce non contesté ». Les questions courantes en immigration incluent « quelle est la différence entre la sélection du Québec et le parrainage fédéral », « combien de temps prend le traitement de la RP au Québec » et « que se passe-t-il si mon permis de travail expire avant le renouvellement ». Les vraies questions gagnent de vraies citations.
      </p>
      <p>
        Mettez à jour les pages FAQ chaque trimestre. Les réponses de procédure changent quand le gouvernement du Québec publie de nouvelles directives ou quand IRCC met à jour les règles des programmes d'immigration. Les moteurs IA pénalisent le contenu de procédure périmé parce que le coût d'une mauvaise réponse est plus haut en juridique qu'en commerce. Un cycle de révision trimestriel garde le cabinet cité et empêche l'érosion lente qui survient quand la réponse de l'an dernier devient la désinformation de cette année.
      </p>

      <InternalLink
        to="/blog/aeo-geo-eeat-explained-for-local-owners"
        title="AEO, GEO et E-E-A-T expliqués pour les propriétaires locaux"
        description="La version en langage clair des signaux de confiance que les moteurs IA utilisent pour décider quelles sources citer."
      />

      <SectionDivider />

      <h2 id="plan-90-jours-cabinet-quebec">Un plan de 90 jours pour un cabinet d'avocats québécois</h2>
      <p>
        Jours 1 à 14, auditez le schéma. Implémentez le schéma Attorney avec la crédence du Barreau sur chaque page biographique. Implémentez le schéma LegalService sur la page du cabinet avec NAP, heures, areaServed et une référence department pour chaque avocat. Implémentez le schéma FAQPage sur les pages FAQ existantes ou créez un brouillon par domaine de pratique. Jours 15 à 45, bâtissez ou rebâtissez les piliers bilingues par domaine de pratique. Un pilier par domaine en EN et un jumeau FR-CA en parallèle, rédigé à la main, 1 500 à 2 500 mots chacun, avec liens internes et balises hreflang.
      </p>
      <p>
        Jours 46 à 75, exécutez l'audit de citations sur les six annuaires prioritaires. Normalisez le NAP vers une forme canonique EN et une forme canonique FR. Mettez à jour Avvo, Lawyer.com, Lexology, LegalDirectories.com, JuriBistro et l'annuaire du Barreau dans la même semaine. Suivez chaque changement dans une feuille pour que le prochain audit confirme que le changement a tenu. Jours 76 à 90, livrez une page FAQ par domaine de pratique qui répond à 8 à 12 vraies questions de clients, en EN et FR-CA, avec schéma FAQPage et liens internes du pilier.
      </p>
      <p>
        La plupart des cabinets québécois qui suivent ce plan voient la première citation AI Overview au deuxième mois et une part de citation stable sur trois à cinq requêtes par domaine à la fin du troisième mois. La barre est plus basse que les cabinets le pensent parce que la plupart des concurrents n'ont pas fait le travail de confiance structurée. Voyez la page <InternalLink to="/industries" title="playbooks pour cabinets juridiques" /> pour les versions familial et immigration spécifiques de ce plan, ou lancez l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" /> pour voir quels signaux fuient en ce moment.
      </p>

      <InlineCTA variant="pricing" text="Besoin d'un programme géré qui livre le schéma Attorney, les piliers bilingues, le nettoyage de citations et la construction FAQ? Voyez les forfaits AiLys pour cabinets juridiques." buttonText="Voir les forfaits" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "La crédence Ordre des avocats du Québec branchée sur le schéma Attorney est le levier asymétrique pour les AI Overview.",
          "Les pages d'atterrissage bilingues avec EN et FR-CA rédigés à la main ferment l'écart de couverture en familial et immigration.",
          'La cohérence NAP sur Avvo, Lawyer.com, Lexology, LegalDirectories.com et JuriBistro alimente le graphe de citations.',
          'Les pages FAQ avec schéma FAQPage gagnent des citations AI Overview disproportionnées sur les requêtes de procédure juridique.',
          "Les cabinets québécois qui livrent dans cet ordre gagnent typiquement des citations AI Overview sur trois à cinq requêtes par domaine en un trimestre.",
        ]}
      />

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
        alt="Associé d'un cabinet québécois consultant le rapport de citations AI Overview à côté de la crédence du Barreau et de l'audit de pages d'atterrissage bilingues"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
