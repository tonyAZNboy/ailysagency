/* eslint-disable react-refresh/only-export-components */
import type { BlogPostMeta } from '../../types'
import { CalloutBox, InlineCTA, StatHighlight, KeyTakeaway, InternalLink, SectionDivider, QuickQuiz } from '../../components/shared'
import { meta } from './how-ai-engines-refresh-citations'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'À quelle fréquence les moteurs IA rafraîchissent leurs citations, la réponse honnête',
  metaDescription:
    'Fréquence à laquelle ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot rafraîchissent les citations affichées. Fenêtres de rafraîchissement, cycles de récupération et impact sur votre plan AI Visibility.',
  tldr: "Les fenêtres de rafraîchissement varient selon le moteur. Perplexity rafraîchit en quelques heures à quelques jours pour les requêtes sensibles au temps, parce qu'il récupère en direct. Bing Copilot tire de l'index Bing en quasi-temps réel. Google AI Overviews rafraîchit de façon hebdomadaire à mensuelle au rythme de l'index Google. ChatGPT en mode navigation est en direct, mais la connaissance figée dans le modèle ne change qu'à la sortie d'un nouveau modèle, soit aux six à douze mois. Claude avec recherche web suit le même schéma. Le plan : pousser les mises à jour d'abord vers les récupérateurs en direct et traiter la connaissance figée comme une surface plus lente qui compose avec le temps.",
  faqItems: [
    {
      question: 'À quelle fréquence les moteurs IA rafraîchissent-ils leurs citations?',
      answer:
        "Cela dépend du moteur et de la requête. Perplexity rafraîchit en quelques heures à quelques jours parce qu'il récupère en direct pour la majorité des requêtes. Bing Copilot est lié à l'index Bing et reflète les pages fraîches en quasi-temps réel. Google AI Overviews rafraîchit chaque semaine ou chaque mois selon l'index Google. ChatGPT en mode navigation est en direct, mais la connaissance figée dans le modèle ne se met à jour qu'à la sortie d'un nouveau modèle (aux six à douze mois). Claude avec recherche web se comporte comme ChatGPT. Planifiez les rafraîchissements par moteur, pas comme un seul pipeline.",
    },
    {
      question: 'Quand je publie une nouvelle page, à quelle vitesse peut-elle apparaître dans les citations ChatGPT ou Perplexity?',
      answer:
        "Sur Perplexity, une nouvelle page peut être citée en quelques heures si elle est indexée par les fournisseurs de recherche sous-jacents et qu'elle correspond à une requête à forte intention. Sur ChatGPT en mode navigation, la même page peut apparaître la même journée. En mode figé (sans navigation), la page n'entre dans le modèle qu'à la prochaine coupe d'entraînement et à la sortie d'un nouveau modèle, soit aux six à douze mois. Sur Google AI Overviews, la nouvelle page apparaît habituellement une à quatre semaines après l'indexation et la pondération par Google.",
    },
    {
      question: 'Pourquoi ChatGPT cite-t-il des informations périmées sur mon commerce?',
      answer:
        "Deux raisons. D'abord, la connaissance figée dans le modèle a une date de coupe qui peut remonter à douze ou vingt-quatre mois, alors les vieux faits (anciens horaires, ancienne adresse, ancien propriétaire) persistent jusqu'au prochain modèle. Ensuite, même en mode navigation, le moteur récupère souvent à partir de citations à forte autorité (Wikipedia, Wikidata, articles de presse, annuaires) plutôt que de votre GBP, et ces sources peuvent aussi être périmées. La correction passe par la mise à jour des sources en amont (Wikidata, principales citations, GBP) afin que le prochain rafraîchissement tire les bons faits.",
    },
    {
      question: 'Bing Copilot se met-il vraiment à jour plus vite que Google AI Overviews?',
      answer:
        "Oui pour les requêtes sensibles au temps. Bing Copilot est étroitement lié à l'index Bing, et une page fraîche indexée par Bing peut être citée dans Copilot en quelques minutes. Google AI Overviews est plus lent parce que la couche de récupération AIO pondère des signaux au-delà de l'index brut (E-E-A-T, schéma FAQ, graphe de citations) et le signal de fraîcheur se compresse en cycle hebdomadaire à mensuel pour la plupart des requêtes locales. Pour les nouvelles de dernière heure ou les événements en direct, Google AIO peut rafraîchir le jour même, mais le socle pour les requêtes locales evergreen est nettement plus lent.",
    },
    {
      question: 'Faut-il pousser les rafraîchissements aux six moteurs IA en même temps?',
      answer:
        "Non. Rafraîchissez d'abord la surface qui récupère en direct (votre GBP, vos trois principales citations, Wikidata si applicable, votre propre site), puis laissez chaque moteur tirer à son rythme. L'ordre qui compte : GBP et NAP d'abord (Perplexity, Bing Copilot, Google AIO les lisent), schémas et FAQ ensuite (ChatGPT, Claude, Gemini les pondèrent), photographie originale et signatures en troisième (hausse E-E-A-T sur les six). Pousser aux six moteurs simultanément n'est pas une action que les opérateurs peuvent faire directement. Ils publient en amont, et les moteurs tirent à leur propre cadence.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-cadence-varie-par-moteur', text: 'Pourquoi la cadence de rafraîchissement varie par moteur' },
    { id: 'perplexity-heures-a-jours-recuperation-en-direct', text: 'Perplexity, quelques heures à quelques jours, récupération en direct' },
    { id: 'bing-copilot-lie-a-l-index-bing', text: "Bing Copilot, lié à l'index Bing" },
    { id: 'google-ai-overviews-hebdomadaire-a-mensuel', text: 'Google AI Overviews, hebdomadaire à mensuel' },
    { id: 'chatgpt-mode-navigation-vs-connaissance-figee', text: 'ChatGPT, mode navigation vs connaissance figée' },
    { id: 'claude-et-gemini-meme-schema', text: 'Claude et Gemini, même schéma' },
    { id: 'comment-cadencer-vos-publications', text: 'Comment cadencer vos publications' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        À quelle fréquence les moteurs IA rafraîchissent-ils leurs citations? C'est la question que pose chaque opérateur dès qu'il commence à surveiller son Share of Model. La réponse honnête : aucune cadence unique ne s'applique aux six moteurs. Perplexity récupère en direct pour la majorité des requêtes et rafraîchit en quelques heures. Bing Copilot tire d'un index quasi-temps réel. Google AI Overviews compresse en cycle hebdomadaire à mensuel. ChatGPT et Claude avec recherche web sont en direct, mais leur connaissance figée ne se met à jour qu'à la sortie d'un nouveau modèle, soit aux six à douze mois. Ce guide détaille chaque moteur et la cadence de publication qui correspond à la façon dont chacun tire ses sources.
      </p>

      <StatHighlight
        stats={[
          { value: 'Heures à jours', label: 'Fenêtre de rafraîchissement Perplexity' },
          { value: 'Hebdomadaire à mensuel', label: 'Cycle Google AI Overviews pour les requêtes locales evergreen' },
          { value: '6 à 12 mois', label: 'Cadence de mise à jour de la connaissance figée ChatGPT' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-la-cadence-varie-par-moteur">Pourquoi la cadence de rafraîchissement varie par moteur</h2>
      <p>
        Les moteurs IA ne partagent pas un seul pipeline de citations. Chaque moteur combine un modèle de base (les paramètres entraînés sur un corpus figé) avec une couche de récupération (accès en direct ou semi-direct à un index de recherche). Le mélange diffère par moteur. Perplexity est surtout récupération, donc rapide. ChatGPT est surtout modèle de base avec navigation optionnelle, donc lent en connaissance figée et rapide en navigation. Google AIO est un modèle de base enveloppé autour de l'index Google avec des signaux supplémentaires en surcouche, donc vitesse moyenne. La cadence visible est une fonction du mélange utilisé pour la requête posée.
      </p>
      <p>
        Pour un opérateur, l'effet pratique est que publier une nouvelle page ne rafraîchit pas les six moteurs en même temps. La page doit d'abord être ramassée par l'index sous-jacent (Bing, Google ou les sources Perplexity), puis pondérée, puis remontée. Chaque moteur a son propre cycle de captation, de pondération et de remontée.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le moteur AI Visibility AiLys rapporte le Share of Model par moteur précisément parce que chaque moteur rafraîchit à sa propre cadence. L'agrégat est le chiffre principal, mais la ventilation par moteur indique à l'opérateur quel moteur mène et lequel traîne sur la courbe de fraîcheur. Voir l'<InternalLink to="/glossary/share-of-model" title="Entrée de glossaire Share of Model" description="Définition canonique et rapport par moteur" /> pour la définition complète.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir comment les six moteurs citent actuellement votre commerce et à quel point les données sont périmées? Lancez l'audit AI Visibility gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="perplexity-heures-a-jours-recuperation-en-direct">Perplexity, quelques heures à quelques jours, récupération en direct</h2>
      <p>
        Perplexity est le moteur le plus rapide de l'ensemble. Il récupère en direct pour la plupart des requêtes, en pondérant les résultats frais de ses fournisseurs sources, et le panneau de citations sous chaque réponse reflète des pages indexées en quelques heures. Pour les requêtes sensibles au temps (horaires d'aujourd'hui, événement de la semaine, avis récent), Perplexity peut citer une page publiée le matin même. Pour les requêtes evergreen, Perplexity tire toujours frais, mais les pages à forte autorité ont tendance à dominer, donc une nouvelle page sur un site à autorité plus faible peut prendre une semaine ou deux à remonter malgré une indexation rapide.
      </p>
      <p>
        L'implication pratique : Perplexity est le premier moteur à refléter les corrections GBP fraîches, les réponses récentes aux avis et les nouveaux articles de blogue. Si vous corrigez vos horaires ou répondez à une question Q&R, Perplexity est habituellement le premier à citer la version corrigée. Le décalage se mesure en heures, pas en semaines.
      </p>

      <h2 id="bing-copilot-lie-a-l-index-bing">Bing Copilot, lié à l'index Bing</h2>
      <p>
        Bing Copilot est étroitement lié à l'index Bing. Une page que Bing explore et indexe peut être citée dans Copilot en quelques minutes pour la bonne requête, surtout quand elle correspond à une recherche locale à forte intention. Bing indexe le web ouvert à une cadence différente de Google : plus rapide pour certains sites, plus lente pour d'autres. L'équipe AiLys a vu des pages d'annuaire neuves citées dans Copilot dans l'heure suivant l'indexation, et nous avons aussi vu de vieilles pages persister dans les réponses Copilot pendant des semaines malgré une mise à jour sur le site source.
      </p>
      <p>
        Pour un commerçant local du Québec, le geste pratique consiste à vérifier la fiche sur Bing Places et à soumettre le sitemap dans Bing Webmaster Tools. Sans ces deux étapes, Bing explore plus lentement et les citations Copilot restent périmées. Avec elles, Copilot reflète les mises à jour en quelques jours.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Si vous n'avez de temps que pour une action côté Bing, revendiquez la fiche sur Bing Places. Copilot pondère la vérification Bing Places quand il choisit le commerce à nommer pour une requête locale, et l'étape prend environ dix minutes. Sans cela, Copilot a tendance à citer Yelp ou des pages d'annuaire plutôt que votre propre site.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="google-ai-overviews-hebdomadaire-a-mensuel">Google AI Overviews, hebdomadaire à mensuel</h2>
      <p>
        Google AI Overviews rafraîchit selon le même cycle que l'index Google sous-jacent pour la plupart des requêtes locales evergreen. La cadence principale est hebdomadaire à mensuelle. Une nouvelle page que Google a explorée, indexée et pondérée peut apparaître dans les réponses AIO en sept à dix jours pour les requêtes à forte intention, et en quatre à six semaines pour les requêtes à plus faible volume. Pour les nouvelles de dernière heure ou les événements en direct, AIO peut rafraîchir le jour même, mais le socle pour « meilleur dentiste près de moi » ou « avocat à Québec » est le cycle plus lent.
      </p>
      <p>
        Cette cadence plus lente est une caractéristique, pas un défaut, du design AIO. AIO pondère les signaux E-E-A-T, le schéma FAQ et le graphe de citations en surcouche de l'index brut, et ces signaux se stabilisent sur des semaines plutôt que des heures. Une page qui se classe bien aujourd'hui peut ne pas être citée dans AIO avant deux semaines parce que le poids du graphe n'a pas rattrapé. À l'inverse, une page citée aujourd'hui par AIO peut continuer d'être citée deux semaines après une mise à jour, parce que le poids ne tombe pas instantanément.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quel moteur IA rafraîchit ses citations le plus rapidement pour les requêtes locales sensibles au temps?"
        options={[
          'ChatGPT en mode figé (sans navigation)',
          'Perplexity, parce qu\'il récupère en direct depuis ses fournisseurs en quelques heures',
          'Google AI Overviews sur le cycle hebdomadaire standard',
          'Claude avec recherche web pour les requêtes locales de niche',
        ]}
        correctIndex={1}
        explanation="Perplexity récupère en direct pour la majorité des requêtes. Une page indexée dans l'heure peut être citée dans l'heure pour la bonne requête. ChatGPT en mode figé est le plus lent, avec une cadence liée à la sortie d'un nouveau modèle aux six à douze mois. Google AIO tourne en cycle hebdomadaire à mensuel pour les requêtes locales evergreen. Claude avec recherche web se comporte comme le mode navigation ChatGPT, rapide pour la partie en direct et lent pour la partie figée."
      />

      <SectionDivider />

      <h2 id="chatgpt-mode-navigation-vs-connaissance-figee">ChatGPT, mode navigation vs connaissance figée</h2>
      <p>
        ChatGPT a deux modes de récupération qui rafraîchissent à des échelles totalement différentes. Le mode navigation est de la récupération en direct, semblable à Perplexity, et une page fraîche peut être citée en quelques heures. La connaissance figée est le corpus d'entraînement du modèle, gelé à une date de coupe, et ne se met à jour qu'à la sortie d'un nouveau modèle. La cadence entre sorties chez les principaux fournisseurs est de six à douze mois, et la coupe d'entraînement précède habituellement la sortie de trois à neuf mois. Donc un fait sur votre commerce qui persiste dans la connaissance figée de ChatGPT peut remonter à douze ou vingt-quatre mois.
      </p>
      <p>
        L'implication pratique : une seule réponse ChatGPT peut mélanger des faits frais récupérés par navigation et des faits périmés figés dans le modèle. Les opérateurs voient ChatGPT citer leur site actuel (navigation) tout en mentionnant leurs anciens horaires (figé) dans la même réponse. La correction consiste à garder le graphe de citations en amont à jour (Wikidata, GBP, principales citations) afin que la prochaine passe d'entraînement ramasse les faits corrigés, et à structurer le site pour la récupération navigation (FAQ claire, schémas, mises à jour fraîches).
      </p>

      <img
        src={meta.images.mid}
        alt="Ligne du temps comparant les cycles de rafraîchissement en direct et les fenêtres de mise à jour de la connaissance figée"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Si un fait figé est faux (anciens horaires, ancienne adresse, ancien nom de propriétaire), la seule façon de corriger est de mettre à jour les sources en amont (Wikidata, GBP, trois principales citations) et d'attendre la prochaine sortie de modèle. Aucune API ne permet de demander à ChatGPT ou à Claude d'oublier un fait. Le décalage est réel, et le seul plan honnête est de mettre à jour les sources et d'attendre.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="claude-et-gemini-meme-schema">Claude et Gemini, même schéma</h2>
      <p>
        Claude avec recherche web se comporte beaucoup comme ChatGPT en mode navigation pour la partie en direct. Une page fraîche peut être citée en quelques heures lorsque Claude tire de la recherche web. La connaissance figée se met à jour à chaque sortie de modèle, sur une cadence similaire de six à douze mois. Claude pondère plus lourdement les marqueurs d'expérience de première main (signatures d'auteur, pages de méthodologie, photographie originale) que les autres moteurs, donc la fraîcheur de ces signaux compte autant que la fraîcheur de la page elle-même.
      </p>
      <p>
        Gemini est lié à l'écosystème Google et rafraîchit selon une cadence qui calque celle de Google AIO pour la récupération, avec une connaissance figée mise à jour à chaque sortie Gemini. Pour les requêtes locales, le profil de fraîcheur de Gemini se situe entre Perplexity (très rapide) et ChatGPT figé (très lent), plus proche de l'extrémité Google AIO du spectre.
      </p>

      <InlineCTA variant="pricing" text="Le moteur AI Visibility AiLys sonde les six moteurs sur une fenêtre glissante de 30 jours, donc les fenêtres de rafraîchissement par moteur sont visibles dans le rapport. Voyez les quatre forfaits AiLys à partir de 300 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="comment-cadencer-vos-publications">Comment cadencer vos publications</h2>
      <p>
        Connaître les fenêtres par moteur change la façon dont un opérateur cadence ses publications. L'ordre qui correspond à la façon dont les moteurs tirent leurs sources :
      </p>

      <ol>
        <li>Mettez à jour le GBP en premier. Horaires, adresse, attributs, photos. Perplexity, Google AIO et Bing Copilot lisent le GBP en priorité, et la mise à jour remonte en quelques jours.</li>
        <li>Mettez à jour les trois principales citations en deuxième. Yelp, Pages Jaunes, annuaires sectoriels. Elles nourrissent le poids Wikidata et le graphe de citations, qui font monter les moteurs plus lents (ChatGPT, Claude) au prochain cycle d'entraînement.</li>
        <li>Livrez FAQ et schémas en troisième. FAQPage, Service, Person avec accréditations. ChatGPT et Claude pondèrent fortement les schémas pour la récupération en mode navigation, donc les mises à jour remontent en quelques semaines.</li>
        <li>Livrez la photographie originale et les signatures en quatrième. Ce sont des signaux E-E-A-T que Google AIO et Claude pondèrent sur des mois. La hausse est lente et compose.</li>
      </ol>

      <p>
        L'erreur consiste à traiter la publication comme une poussée unique. Le bon modèle est des rafraîchissements en continu par moteur. Le GBP reçoit une vérification trimestrielle, les citations reçoivent un audit mensuel, les schémas sont revus quand la structure du site change, et la photographie originale se livre en lots tout au long de l'année. Le livrable de l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Socle par moteur et cadence de rafraîchissement" /> gratuit montre où chaque moteur se situe et à quel point chacun est périmé, afin que l'opérateur priorise le prochain rafraîchissement par moteur, pas par hypothèse.
      </p>
      <p>
        Pour la définition profonde de la métrique utilisée pour mesurer ces rafraîchissements, le guide <InternalLink to="/blog/share-of-model-metric-explained" title="Share of Model expliqué" description="La métrique de part de citations pour la recherche IA" /> détaille la formule et la cadence de rapport par moteur.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes de la façon dont chacun des six moteurs cite votre commerce et du rafraîchissement à pousser en premier? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Perplexity rafraîchit les citations en quelques heures à quelques jours parce qu\'il récupère en direct depuis ses fournisseurs.',
          'Bing Copilot est lié à l\'index Bing et reflète les pages fraîches en quasi-temps réel une fois explorées par Bing.',
          'Google AI Overviews rafraîchit en cycle hebdomadaire à mensuel pour les requêtes locales evergreen, plus vite pour les nouvelles de dernière heure.',
          'ChatGPT en mode navigation est en direct, mais la connaissance figée ne se met à jour qu\'à chaque sortie de modèle, aux six à douze mois.',
          'Le bon plan est des rafraîchissements continus par moteur, en commençant par le GBP et les principales citations, puis les schémas, puis la photographie originale.',
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
        alt="Synthèse de la cadence de rafraîchissement montrant les fenêtres par moteur, des heures à douze mois, sur une seule ligne du temps"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
