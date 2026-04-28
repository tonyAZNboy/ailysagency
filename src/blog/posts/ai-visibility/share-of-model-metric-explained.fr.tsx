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
import { meta } from './share-of-model-metric-explained'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Share of Model expliqué, la métrique de visibilité dans la recherche IA',
  metaDescription:
    "Le Share of Model est la métrique de part de citations pour la recherche IA. Voici la définition précise, la méthode de mesure et la façon dont AiLys la rapporte sur six moteurs IA.",
  tldr: "Le Share of Model est le pourcentage de réponses des moteurs IA qui nomment votre commerce pour un ensemble défini de requêtes sur une période définie. AiLys le mesure en lançant des sondes sur six moteurs IA nommés, en comptant les citations par moteur, en divisant le total des citations par le total des sondes pour la période, et en rapportant des scores par moteur et globaux.",
  faqItems: [
    {
      question: "Qu'est-ce que le Share of Model et comment le mesurer?",
      answer:
        "Le Share of Model est le pourcentage de réponses des moteurs IA qui citent votre commerce pour un ensemble défini de requêtes sur une période définie. Le moteur AI Visibility AiLys lance des sondes sur six moteurs IA nommés (ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot), compte les citations par moteur pour votre ensemble de requêtes, divise le total des citations par le total des sondes, et rapporte les scores par moteur et globaux. La plupart des commerces locaux démarrent près de zéro et grimpent à 5 à 15 pour cent en un trimestre.",
    },
    {
      question: "En quoi le Share of Model diffère-t-il du share of voice ou du share of search?",
      answer:
        "Le share of voice mesure les mentions dans les médias et les réseaux sociaux. Le share of search mesure le volume de recherches de marque par rapport au socle de la catégorie sur les moteurs classiques. Le Share of Model mesure les citations nommées dans les réponses d'IA générative. Les trois corrèlent dans le temps mais suivent des surfaces différentes. Les moteurs IA récupèrent depuis un graphe de citations en partie nourri par le share of voice et le share of search, mais la métrique de sortie est différente.",
    },
    {
      question: "Combien de sondes faut-il pour un Share of Model stable?",
      answer:
        "Pour une fenêtre de rapport de 30 jours, AiLys lance au moins 30 sondes par moteur par ensemble de requêtes, donc un ensemble de cinq requêtes contre six moteurs représente au minimum 900 sondes par mois. Des volumes plus petits produisent des chiffres bruyants qui bougent de 0 à 20 pour cent selon la variance de température des moteurs sous-jacents. Le plancher de 30 sondes par moteur est ce qui stabilise la moyenne mobile à l'intérieur de deux points de variance de rapport.",
    },
    {
      question: "Quels moteurs IA entrent dans le calcul du Share of Model?",
      answer:
        "AiLys rapporte le Share of Model sur six moteurs nommés : ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. L'agrégat est une moyenne simple des six scores par moteur, et non une moyenne pondérée, parce que la part de trafic entre moteurs varie selon l'industrie et la pondération introduit un débat que la moyenne simple évite. Les scores par moteur sont aussi rapportés pour que l'opérateur voie quel moteur mène ou traîne.",
    },
    {
      question: "À quelle vitesse peut-on faire grimper le Share of Model depuis zéro?",
      answer:
        "Une pile propre montre généralement deux vagues de hausse. La première autour de la semaine 4 grâce au nettoyage GBP et NAP, faisant grimper le Share of Model d'environ 3 à 5 points de pourcentage. La deuxième autour de la semaine 10 grâce aux schémas, à la FAQ et à la photographie originale, ajoutant 5 à 10 points. À la fin d'un plan de 90 jours, la plupart des commerces locaux se situent entre 8 et 18 pour cent de Share of Model sur leur ensemble de requêtes principal. Le leader de catégorie se situe à 30 pour cent ou plus.",
    },
  ],
  headings: [
    { id: 'ce-que-le-share-of-model-mesure-vraiment', text: 'Ce que le Share of Model mesure vraiment' },
    { id: 'comment-le-moteur-ailys-le-calcule', text: 'Comment le moteur AiLys le calcule' },
    { id: 'la-formule-etape-par-etape', text: 'La formule, étape par étape' },
    { id: 'combien-de-sondes-faut-il', text: 'Combien de sondes faut-il' },
    { id: 'lire-les-scores-par-moteur-vs-agreges', text: 'Lire les scores par moteur vs agrégés' },
    { id: 'share-of-model-vs-share-of-voice-vs-share-of-search', text: 'Share of Model vs share of voice vs share of search' },
    { id: 'comment-faire-grimper-le-share-of-model-depuis-zero', text: 'Comment faire grimper le Share of Model depuis zéro' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <img
        src={meta.images.hero}
        alt="Tableau de bord AiLys montrant les scores Share of Model sur six moteurs IA pour un commerce local du Québec"
        className="w-full rounded-xl my-6"
        loading="eager"
      />

      <p>
        Le Share of Model est la métrique qu'AiLys utilise pour quantifier si les moteurs IA nomment votre commerce dans leurs réponses. C'est le pourcentage de sondes dans les moteurs IA qui citent votre commerce pour un ensemble défini de requêtes sur une période définie. La plupart des commerces locaux démarrent près de zéro. Le leader de catégorie se situe à 30 pour cent ou plus. Faire grimper le Share of Model est le travail central du moteur AI Visibility, et la métrique est ce qui rend ce travail mesurable plutôt que qualitatif.
      </p>

      <StatHighlight
        stats={[
          { value: '6 moteurs', label: 'Moteurs IA sondés pour le Share of Model' },
          { value: '900+ sondes', label: 'Volume mensuel minimum sur le moteur AiLys' },
          { value: '30 %+', label: 'Share of Model détenu par le leader de catégorie' },
        ]}
      />

      <h2 id="ce-que-le-share-of-model-mesure-vraiment">Ce que le Share of Model mesure vraiment</h2>
      <p>
        Le Share of Model est une métrique de part de citations. Le numérateur est le nombre de réponses de moteurs IA qui nomment votre commerce dans un ensemble de sondes. Le dénominateur est le nombre total de sondes dans cet ensemble. Les deux sont bornés à une période définie, généralement 30 jours pour le Share of Model glissant et 90 jours pour le rapport de tendance.
      </p>
      <p>
        L'ensemble de sondes est la liste de requêtes qui vous tient à cœur. Pour une clinique dentaire au Québec, l'ensemble peut inclure « meilleur dentiste près de moi », « dentiste qui accepte de nouveaux patients à Laval », « dentiste d'urgence ouvert samedi à Montréal » et « dentiste pédiatrique à Québec ». L'ensemble est verrouillé pour la période de rapport afin que la comparaison entre périodes ait du sens. Ajouter ou retirer des requêtes en cours de période invalide la comparaison.
      </p>
      <p>
        Un Share of Model de 12 pour cent sur l'ensemble verrouillé signifie que sur l'ensemble des sondes lancées sur tous les moteurs pour la période, 12 pour cent des réponses ont nommé votre commerce. Les 88 pour cent restants ont nommé un concurrent, n'ont nommé aucun commerce précis, ou ont rendu une réponse générique.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le Share of Model n'est pas une position de classement. Les moteurs IA ne classent pas au sens classique, ils récupèrent une courte liste d'entités nommées et les présentent. Un commerce est nommé ou non dans une réponse donnée. Le Share of Model est le taux auquel votre commerce est nommé, ce qui est l'unité de mesure juste pour un système de réponse fondé sur la récupération.</p>
      </CalloutBox>

      <h2 id="comment-le-moteur-ailys-le-calcule">Comment le moteur AiLys le calcule</h2>
      <p>
        Le moteur AI Visibility AiLys lance des sondes selon un horaire fixe. Pour chaque commerce dans le moteur, l'opérateur définit un ensemble de 5 à 20 requêtes. Le moteur lance chaque requête contre six moteurs IA nommés : ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot. La sonde est conçue pour imiter la façon dont un vrai utilisateur formule la question, y compris le qualificatif de lieu lorsque c'est pertinent.
      </p>
      <p>
        Chaque réponse de sonde est analysée pour les commerces nommés. L'analyseur identifie les noms d'entités, les normalise contre la liste d'entités GBP, et incrémente le compteur de citations pour chaque commerce nommé. Plusieurs mentions dans une seule réponse comptent comme une citation, parce que la métrique est par sonde, pas par mention.
      </p>
      <p>
        À la fin de la période de rapport, le moteur divise le total des citations par le total des sondes pour chaque moteur. Les scores par moteur sont rapportés individuellement, et le Share of Model agrégé est une moyenne simple des six scores par moteur. Le rapport par moteur est important parce que la part de trafic entre moteurs varie selon l'industrie, et un opérateur peut avoir besoin de pondérer plus la hausse sur Bing Copilot que sur Claude selon l'industrie.
      </p>

      <h2 id="la-formule-etape-par-etape">La formule, étape par étape</h2>
      <p>
        Le Share of Model pour un seul moteur est simple.
      </p>

      <ol>
        <li>Définir l'ensemble de sondes : une liste de 5 à 20 requêtes que l'opérateur surveille.</li>
        <li>Verrouiller la période : une fenêtre glissante de 30 jours pour la métrique principale, 90 jours pour la tendance.</li>
        <li>Lancer les sondes : au moins 30 sondes par requête par moteur sur la période, donc un ensemble de 5 requêtes représente 150 sondes par moteur par période.</li>
        <li>Analyser les réponses : identifier et normaliser les commerces nommés dans chaque réponse.</li>
        <li>Compter les citations : additionner les sondes où votre commerce est nommé, sans égard à la position.</li>
        <li>Diviser : total des citations divisé par total des sondes égale le Share of Model par moteur en pourcentage.</li>
        <li>Agréger : moyenne simple des six scores par moteur produit le Share of Model principal.</li>
      </ol>

      <p>
        La formule est volontairement simple. AiLys ne pondère pas les moteurs par part de trafic, n'ajuste pas pour la position de la citation dans la réponse, et ne pénalise pas les mentions partielles. Chaque couche de pondération introduit un débat (quelle enquête de part de trafic, quelle courbe de poids de position), et la moyenne simple est ce qui rend le chiffre défendable entre opérateurs et industries.
      </p>

      <img
        src={meta.images.mid}
        alt="Exemple chiffré d'un ensemble de 5 requêtes évalué sur six moteurs IA avec scores par moteur et Share of Model agrégé"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="combien-de-sondes-faut-il">Combien de sondes faut-il</h2>
      <p>
        Le nombre de sondes est ce qui contrôle le bruit. Les moteurs IA présentent une variance de température dans leurs réponses, ce qui veut dire que la même sonde lancée deux fois peut renvoyer des commerces nommés différents. Avec dix sondes par moteur, la variance peut faire bouger le Share of Model de 10 points entre exécutions. Avec trente sondes par moteur, la variance se comprime à environ 2 points entre exécutions. Avec cent sondes, la variance descend sous 1 point.
      </p>
      <p>
        AiLys livre un plancher de 30 sondes par moteur en défaut, ce qui produit un Share of Model sur 30 jours avec environ 2 points de variance. Pour un rapport à enjeux élevés (présentations conseil, renouvellements d'agence), le moteur peut être configuré à 100 sondes par moteur, ce qui comprime la variance sous 1 point au prix d'une utilisation plus élevée du moteur côté AiLys.
      </p>
      <p>
        Le budget de sondes est la contrainte opérationnelle. Un ensemble de 5 requêtes contre six moteurs à 30 sondes chacune représente 900 sondes par mois. Un ensemble de 20 requêtes à 100 sondes chacune représente 12 000 sondes par mois. Le forfait Core livre par défaut le 5 requêtes à 30 sondes. Les forfaits Growth et Agency étendent l'ensemble et la densité au besoin.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Pour un premier rapport de Share of Model, démarrez avec un ensemble de 5 requêtes qui couvre les recherches à plus haute intention de votre catégorie. Une fois le Share of Model de référence établi, étendez à 10 ou 15 requêtes pour la deuxième période. Étendre trop vite à la première période crée un socle bruyant qui complique l'analyse de tendance.</p>
      </CalloutBox>

      <h2 id="lire-les-scores-par-moteur-vs-agreges">Lire les scores par moteur vs agrégés</h2>
      <p>
        Le Share of Model agrégé est le chiffre principal. Les scores par moteur disent à l'opérateur où le travail doit se concentrer. Un schéma fréquent en début de travail AI Visibility est un score Perplexity dans la mi-adolescence avec un score ChatGPT en bas chiffres uniques. Cet écart pointe habituellement vers une faiblesse du graphe de citations, parce que Perplexity pondère les signaux GBP et avis directs alors que ChatGPT pondère Wikidata et les citations à haute DA. L'écart dit à l'équipe de livrer du travail Wikidata ensuite, pas du travail GBP.
      </p>
      <p>
        Lire les scores par moteur exige de savoir ce que chaque moteur pondère le plus. Perplexity s'appuie sur GBP et Yelp. ChatGPT s'appuie sur Wikidata et les citations à haute DA. Claude s'appuie sur les marqueurs d'expérience de première main et les signatures d'auteur. Gemini s'appuie sur les signaux de l'écosystème Google et les données structurées. Google AIO s'appuie sur les mêmes signaux que Google classique plus le schéma FAQ. Bing Copilot s'appuie sur LinkedIn, Bing Places et les signaux de l'écosystème Microsoft. Le score par moteur nomme la faiblesse, le Share of Model agrégé nomme le résultat principal.
      </p>

      <InlineCTA variant="audit" text="Vous voulez voir votre Share of Model? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <h2 id="share-of-model-vs-share-of-voice-vs-share-of-search">Share of Model vs share of voice vs share of search</h2>
      <p>
        Le share of voice est le pourcentage de mentions médiatiques dans votre catégorie qui nomment votre commerce dans la presse et les réseaux sociaux. Le share of search est le pourcentage de recherches de marque par rapport au socle de la catégorie sur les moteurs classiques comme Google et Bing. Le Share of Model est le pourcentage de réponses des moteurs IA qui nomment votre commerce.
      </p>
      <p>
        Les trois corrèlent dans le temps. Un commerce qui fait grimper son share of voice par des campagnes de relations publiques et de médias gagnés finira par faire grimper son Share of Model, parce que les moteurs IA récupèrent en partie depuis les citations de presse et les entrées de graphe d'entités que le share of voice nourrit. Un commerce qui fait grimper son share of search par des campagnes de marque finira par faire grimper son Share of Model, parce que le volume de recherches de marque est un signal de notoriété Wikidata et Wikidata est une entrée du graphe de citations. Le décalage du share of voice au Share of Model est d'environ 90 jours. Du share of search au Share of Model, environ 60 jours.
      </p>
      <p>
        Le Share of Model est l'indicateur avancé qui compte le plus pour l'AI Visibility, parce qu'il mesure la surface de sortie qui intéresse les opérateurs : suis-je nommé dans la réponse ou non. Le share of voice et le share of search sont des intrants en amont.
      </p>

      <h2 id="comment-faire-grimper-le-share-of-model-depuis-zero">Comment faire grimper le Share of Model depuis zéro</h2>
      <p>
        Un plan propre de 90 jours fait habituellement grimper le Share of Model en deux vagues. La vague un se livre des semaines 1 à 4 : optimisation GBP, nettoyage NAP sur les principales cibles de citations, et corrections de catégories. La hausse de la vague un est d'environ 3 à 5 points de pourcentage sur le Share of Model agrégé, pondérée vers Perplexity et Google AIO parce que ces moteurs valorisent les signaux GBP.
      </p>
      <p>
        La vague deux se livre des semaines 5 à 12 : construction de schémas (FAQPage, Service, Person avec accréditations), photographie originale avec EXIF, et production de pages FAQ pour les 30 questions principales de patients ou clients. La hausse de la vague deux est d'environ 5 à 10 points de pourcentage sur l'agrégat, pondérée vers ChatGPT et Claude parce que ces moteurs valorisent les schémas et les marqueurs d'expérience. À la semaine 12, la plupart des commerces locaux se situent à 8 à 18 pour cent de Share of Model sur leur ensemble de sondes principal.
      </p>
      <p>
        AiLys rapporte le Share of Model sur chaque forfait payant et sur le livrable de l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Inclut la sonde Share of Model de référence sur six moteurs" /> gratuit. La définition complète vit sur la page <InternalLink to="/glossary/share-of-model" title="Entrée de glossaire Share of Model" description="Définition canonique, formule et cadence de rapport" />, et la page de méthodologie détaille l'horaire de sondes et la cadence de rapport.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Le Share of Model est le pourcentage de réponses de moteurs IA qui citent votre commerce pour un ensemble défini de requêtes sur une période définie.",
          'AiLys sonde six moteurs nommés : ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot.',
          "Minimum de 30 sondes par requête par moteur par période pour garder la variance sous 2 points.",
          'Les scores par moteur nomment la faiblesse, le Share of Model agrégé nomme le résultat principal.',
          'Un plan propre de 90 jours fait habituellement grimper le Share of Model de près de zéro à 8 à 18 pour cent sur l\'ensemble principal.',
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
        alt="Graphique de tendance Share of Model montrant le schéma de hausse en deux vagues sur un plan SEO local de 90 jours"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
