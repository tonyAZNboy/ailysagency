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
import { meta } from './bilingual-google-reviews-quebec'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Avis Google bilingues au Québec, le plan EN et FR",
  metaDescription:
    "Comment obtenir des avis Google bilingues EN et FR auprès des mêmes clients québécois. Cartes NFC à invitation bilingue, langue de service, discipline de réponse et la fracture régionale Montréal-régions.",
  tldr: "Les commerces locaux au Québec obtiennent des avis bilingues en demandant à chaque client dans la langue où il a été servi, en utilisant des cartes NFC d'avis bilingues, et en répondant dans la même langue que l'avis. Le partage est environ 50/50 EN et FR dans les quartiers mixtes de Montréal et penche fortement français à l'extérieur de Montréal. La vélocité d'avis bilingues est un facteur direct de classement dans le pack local et un signal fort pour la citation IA en 2026.",
  faqItems: [
    {
      question: "Comment obtenir des avis bilingues EN et FR des mêmes clients?",
      answer:
        "Demandez à chaque client dans la langue où vous l'avez servi. Si la visite s'est faite en français, l'invitation et la demande d'avis doivent être en français. Si la visite était en anglais, l'invitation doit être en anglais. Utilisez un outil de routage qui signe la demande avec le nom du membre du personnel et la langue de service. Placez une carte NFC bilingue au comptoir pour que le client choisisse sa langue sans friction. Répondez dans la même langue que l'avis, à chaque fois.",
    },
    {
      question: "Quelle est la répartition typique EN/FR des avis dans les commerces québécois?",
      answer:
        "Dans les quartiers mixtes de Montréal (Plateau, Mile End, Notre-Dame-de-Grâce, centre-ville), la répartition tourne autour de 50/50 EN et FR. Dans le Vieux-Montréal et l'Ouest-de-l'Île, l'anglais penche plus fort, souvent 60/40 EN. À l'extérieur de Montréal (Québec, Trois-Rivières, Sherbrooke, Saguenay), la balance penche fortement français, souvent 80/20 FR. Le cluster local fixe la cible réaliste. Vérifiez les cinq principaux concurrents avant de fixer votre propre cible mensuelle bilingue.",
    },
    {
      question: "Les avis Google bilingues aident-ils vraiment le classement dans le pack local?",
      answer:
        "Oui. Google lit la langue de l'avis comme un signal de pertinence pour les requêtes bilingues. Une clinique de la ville de Québec avec des avis en anglais et en français se classe à la fois pour english speaking dentist Quebec City et pour dentiste Québec, alors qu'une clinique avec des avis dans une seule langue se classe pour une de ces requêtes au mieux. Le signal d'avis bilingues alimente aussi les moteurs IA comme Google AIO et Perplexity, qui citent maintenant le texte des avis dans leurs réponses bilingues sur les commerces locaux.",
    },
    {
      question: "Faut-il toujours répondre à un avis en français en français?",
      answer:
        "Oui. Répondez dans la même langue que l'avis, toujours. Un avis en français répondu en anglais paraît négligent et érode la confiance du prochain client francophone qui lit la fiche. L'inverse est vrai pour les avis en anglais répondus en français. Une réponse bilingue (FR suivi de la traduction EN) est acceptable pour des plaintes à enjeux élevés, mais le réflexe par défaut est l'appariement à une seule langue. Le texte de réponse est aussi une surface de citation pour les moteurs IA, alors la concordance linguistique renforce le signal bilingue sur l'ensemble de la fiche.",
    },
    {
      question: "Quelle est la meilleure façon de demander un avis bilingue au comptoir?",
      answer:
        "Une carte NFC bilingue imprimée avec deux QR codes étiquetés FR et EN, placée au comptoir ou remise à la caisse. Le client tape ou scanne, atterrit sur la page d'avis Google dans sa langue, et le clavier détecte automatiquement. Le coût est sous 50 dollars CAD pour un paquet de cartes et les cartes durent des années. Évitez de demander à votre personnel de toujours demander dans une seule langue par défaut, c'est ce qui produit des profils d'avis déséquilibrés dans les marchés mixtes du Québec.",
    },
  ],
  headings: [
    { id: 'pourquoi-les-avis-bilingues-comptent-au-quebec', text: 'Pourquoi les avis bilingues comptent au Québec' },
    { id: 'la-regle-de-la-langue-de-service', text: 'La règle de la langue de service' },
    { id: 'cartes-nfc-et-invitations-au-comptoir', text: 'Cartes NFC et invitations au comptoir' },
    { id: 'discipline-de-reponse-meme-langue', text: 'Discipline de réponse, même langue à chaque fois' },
    { id: 'fracture-regionale-montreal-vs-regions', text: 'Fracture régionale, Montréal contre les régions' },
    { id: 'comment-les-avis-bilingues-alimentent-les-citations-ia', text: 'Comment les avis bilingues alimentent les citations IA' },
    { id: 'plan-de-30-jours-pour-construire-le-bilinguisme', text: 'Un plan de 30 jours pour construire le bilinguisme' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les commerces locaux au Québec posent la même question chaque trimestre. Comment obtenir des avis Google bilingues que les clients laissent vraiment, en anglais et en français, depuis le même commerce? La réponse est une discipline, pas un outil. Demandez à chaque client dans la langue où vous l'avez servi. Utilisez une carte NFC bilingue avec deux QR codes au comptoir. Répondez dans la même langue que l'avis. La répartition tombe près de 50/50 dans les quartiers mixtes de Montréal et penche fortement français à l'extérieur de Montréal, et ce signal bilingue alimente directement le classement dans le pack local et les citations IA en 2026.
      </p>

      <StatHighlight
        stats={[
          { value: '50/50', label: 'Partage EN/FR dans les quartiers mixtes de Montréal' },
          { value: '80/20 FR', label: 'Mélange typique à l\'extérieur de Montréal' },
          { value: '24 heures', label: 'Fenêtre pour envoyer la demande d\'avis bilingue' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-les-avis-bilingues-comptent-au-quebec">Pourquoi les avis bilingues comptent au Québec</h2>
      <p>
        Le Québec est un marché bilingue avec le français comme langue première pour la plupart des recherches locales et l'anglais comme seconde langue dans les quartiers mixtes, le centre-ville et les corridors touristiques. Un commerce local qui obtient des avis dans une seule langue se classe pour les requêtes dans cette langue et s'affaiblit pour l'autre. Google lit le mélange linguistique des avis comme un signal de pertinence pour les requêtes bilingues, ce qui compte parce que la même clinique, le même restaurant, la même boutique sert les deux communautés chaque jour.
      </p>
      <p>
        Le calcul est concret. Une clinique dentaire à Québec avec 80 avis à vie répartis 30 EN et 50 FR se classe à la fois pour english speaking dentist Quebec City et pour dentiste Québec. Une clinique avec 80 avis tous en français se classe bien pour la requête française et s'affaiblit pour l'anglaise. La même réalité physique, deux résultats de classement différents, décidés par l'équilibre linguistique des avis.
      </p>
      <p>
        Au-delà du pack local, les avis bilingues alimentent les moteurs IA. Google AIO, Perplexity et ChatGPT tirent le texte des avis dans leurs réponses bilingues sur les commerces locaux. Une clinique avec des avis français qui mentionnent détartrage et des avis anglais qui mentionnent cleaning fait surface pour les deux requêtes. La vélocité d'avis bilingues est l'un des signaux composés les moins chers qu'un commerce québécois puisse construire.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Le cluster local fixe la cible bilingue réaliste, pas une règle absolue. Vérifiez les cinq principaux concurrents du pack local. Comptez combien d'avis anglais et combien d'avis français chacun a sur la fenêtre des 90 derniers jours. Égalisez le mélange du cluster et battez la moyenne du cluster de 25 pour cent sur la vélocité mensuelle. C'est la base de travail pour toute catégorie québécoise.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Curieux de savoir comment votre profil d'avis bilingue se compare aux cinq principaux concurrents du pack local de votre catégorie? Lancez l'audit AI Visibility gratuit en 24 heures, comprend une vérification de l'équilibre linguistique des avis." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-regle-de-la-langue-de-service">La règle de la langue de service</h2>
      <p>
        La règle unique qui produit un profil d'avis bilingue en santé, c'est de demander à chaque client dans la langue où vous l'avez servi. Si la visite s'est faite en français, l'invitation et la demande d'avis doivent être en français. Si la visite était en anglais, l'invitation doit être en anglais. Le client ne change pas de langue juste parce que la demande d'avis arrive. Il aligne sur la langue de la visite, la langue dont il se souvient.
      </p>
      <p>
        Sur le plan opérationnel, ça veut dire que l'outil de routage a besoin d'une étiquette de langue sur chaque dossier client. La plupart des systèmes de rendez-vous capturent déjà la langue préférée pour les courriels de confirmation. Branchez ce champ sur la demande d'avis, signez la demande avec le nom du membre du personnel, et l'invitation arrive dans la bonne langue sans effort supplémentaire. Si la langue n'est pas captée à la prise de rendez-vous, la réception devrait demander une fois à l'accueil et étiqueter le dossier.
      </p>
      <p>
        Évitez le piège de tout demander en français par défaut en supposant que les anglophones traduiront eux-mêmes. Ils ne le feront pas. Ils sauteront simplement l'avis. Le même piège joue dans l'autre sens avec un routage en anglais seulement : les francophones laissent moins d'avis parce que l'invitation paraît étrangère. Le mélange bilingue s'effondre, le classement du pack local mollit, et l'opérateur se demande pourquoi les avis ont stagné.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne traduisez pas automatiquement les demandes d'avis. Une demande en français qui se lit comme une traduction depuis l'anglais (pas de graphies québécoises, rythme de phrase étrange, défauts de français de France comme l'absence de fin de semaine) signale au client que le commerce ne fonctionne pas vraiment en français. Rédigez l'invitation française à la main une fois, conservez-la, réutilisez-la. Cinq minutes économisent une année de confiance ramollie.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="cartes-nfc-et-invitations-au-comptoir">Cartes NFC et invitations au comptoir</h2>
      <p>
        L'outil physique à plus haut levier pour les avis bilingues est une carte NFC bilingue imprimée avec deux QR codes, un étiqueté FR et un étiqueté EN. Placez la carte au comptoir, sur la table du café ou à la caisse. Le client tape ou scanne, atterrit sur la page d'avis Google dans sa langue, et le clavier mobile détecte automatiquement. Le coût des cartes est sous 50 dollars CAD pour un paquet et les cartes durent des années.
      </p>
      <p>
        La discipline d'étiquetage compte. L'étiquette FR et l'étiquette EN doivent être de taille égale, de placement égal et de traitement de couleur égal. Une carte qui met FR en 18 points et EN en 10 points dans le coin se lit comme française d'abord et repousse les anglophones. Une carte qui fait l'inverse se lit comme anglaise d'abord dans un marché français, ce qui repousse les francophones. Conception symétrique, résultats symétriques.
      </p>

      <h3>Ce qui va sur une carte NFC d'avis bilingue</h3>
      <ul>
        <li>Nom du commerce en alphabet latin, exactement comme il apparaît sur la fiche Google Business Profile</li>
        <li>Deux QR codes étiquetés FR et EN, taille égale, côte à côte ou empilés</li>
        <li>Une courte invitation par langue, rédigée à la main, graphies françaises régionales respectées</li>
        <li>Optionnel : une ligne de remerciement dans les deux langues, sans langage incitatif</li>
        <li>Au verso : le nom ou les initiales du membre du personnel, ce qui rend l'invitation personnelle</li>
      </ul>

      <p>
        Le vocabulaire complet sur le travail de vélocité d'avis, dont le repère du cluster et le plan de construction sur 90 jours, vit dans le post de référence <InternalLink to="/blog/google-review-velocity-playbook" title="Plan de vélocité d'avis Google" description="Cibles mensuelles, pondération de récence et ratios qui font bouger le pack local" />. La couche bilingue se pose par-dessus cette base de vélocité.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Un client a été servi en français dans une clinique de Québec. La demande d'avis part en anglais par défaut. Que devient le taux d'avis?"
        options={[
          'Taux plus élevé, les demandes en anglais sont plus polies',
          'Même taux, la langue ne compte pas pour les invitations',
          "Taux plus bas, le client passe parce que la langue de l'invitation ne correspond pas à la visite",
          'Taux plus élevé, le client traduit et écrit en anglais par politesse',
        ]}
        correctIndex={2}
        explanation="Les clients répondent aux invitations qui correspondent à la langue de service. Une visite française suivie d'une demande en anglais paraît étrangère et la plupart des clients sautent simplement l'avis. La règle est simple : demandez dans la langue où vous les avez servis, à chaque fois."
      />

      <SectionDivider />

      <h2 id="discipline-de-reponse-meme-langue">Discipline de réponse, même langue à chaque fois</h2>
      <p>
        La règle de réponse, c'est l'appariement à une seule langue. Un avis en français répondu en français. Un avis en anglais répondu en anglais. Toujours. Un avis en français répondu en anglais paraît négligent et érode la confiance du prochain client francophone qui lit la fiche. L'inverse est vrai pour les avis en anglais répondus en français.
      </p>
      <p>
        Construisez une pile de gabarits bilingues. Quatre gabarits par langue, mappés à quatre scénarios : avis positif avec mention de service, avis positif avec commentaire générique, avis négatif avec affirmation factuellement corrigeable, avis négatif avec opinion. Chaque gabarit reste sous 100 mots et finit par une fermeture personnalisée qui nomme le membre du personnel. Les gabarits sont des points de départ, pas des scripts. Ajustez la fermeture personnelle à chaque fois, gardez le corps cohérent.
      </p>
      <p>
        Fenêtre de réponse : dans les 24 heures pour les avis négatifs, dans les 72 heures pour les positifs. Le texte de réponse devient partie de la surface de citation de la page pour les moteurs IA comme Google AIO et Perplexity, qui élèvent maintenant les schémas de réponse dans leurs résumés sur le commerce. La vélocité de réponse bilingue se lit comme un signal de qualité disant que le commerce fonctionne vraiment dans les deux langues, pas seulement le prétend.
      </p>

      <img
        src={meta.images.mid}
        alt="Gabarits de réponse côte à côte en anglais et en français pour un commerce local québécois avec la même signature de personnel"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <p>
        L'ensemble complet de scénarios de réponse, avec les gabarits pour les schémas d'avis négatifs, est couvert dans la référence <InternalLink to="/blog/negative-review-response-templates" title="Gabarits de réponse aux avis négatifs" description="Gabarits bilingues pour les quatre scénarios d'avis négatifs" />. La couche bilingue se dépose sur ces gabarits sans changer la structure.
      </p>

      <InlineCTA variant="pricing" text="Vous voulez un programme géré qui prend en charge les invitations bilingues, la conception de cartes NFC et la pile de gabarits de réponse bilingues à un palier mensuel fixe? Voyez les forfaits AiLys pour les commerces locaux du Québec." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="fracture-regionale-montreal-vs-regions">Fracture régionale, Montréal contre les régions</h2>
      <p>
        Le mélange bilingue change selon la géographie au Québec, et l'opérateur doit fixer la cible en conséquence. Dans les quartiers mixtes de Montréal (Plateau, Mile End, Notre-Dame-de-Grâce, centre-ville, parties de la Rive-Sud), la répartition tourne près de 50/50 EN et FR pour la plupart des catégories locales. Dans le Vieux-Montréal et l'Ouest-de-l'Île, l'anglais penche plus fort, souvent 60/40 EN, porté par le tourisme et la base anglophone locale.
      </p>
      <p>
        À l'extérieur de Montréal, la balance est nettement française. À Québec, la répartition tourne autour de 80/20 FR pour les catégories résidentielles (cliniques, ateliers de réparation, restaurants de quartier), et s'adoucit à 65/35 FR dans les corridors touristiques du quartier historique. À Trois-Rivières, Sherbrooke et Saguenay, le mélange est souvent 85/15 FR ou plus fort. En Gaspésie et sur la Côte-Nord, le français est plus près de 95/5.
      </p>
      <p>
        Fixez la cible au cluster local, pas à une moyenne nationale. Une clinique à Sherbrooke qui fixe une cible 50/50 passera une année à courir après des avis anglais que le marché local ne produit pas vraiment. Une boutique du Mile End qui fixe une cible 90/10 FR se coupe de la base anglophone qu'elle sert chaque jour. Le calcul honnête est d'égaliser le mélange du cluster et de battre la moyenne du cluster sur la vélocité mensuelle de 25 pour cent.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Pour les commerces multi-emplacements, fixez la cible bilingue par emplacement, jamais une moyenne pour toute la chaîne. Une chaîne de cafés avec des emplacements au Plateau, dans l'Ouest-de-l'Île et à Québec devrait faire rouler trois programmes d'avis bilingues différents, chacun calibré au cluster local. Imposer un ratio unique pour toute la chaîne mollit le classement partout.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-les-avis-bilingues-alimentent-les-citations-ia">Comment les avis bilingues alimentent les citations IA</h2>
      <p>
        Le texte d'avis n'est plus juste une note en étoiles. Les moteurs IA fouillent les mots à l'intérieur des avis pour répondre à des requêtes liées à des services précis. Quand les avis existent dans les deux langues, le même commerce fait surface pour les deux ensembles de requêtes bilingues en même temps. Une clinique avec des avis français qui mentionnent détartrage et des avis anglais qui mentionnent cleaning fait surface pour les deux requêtes sur Google AIO, Perplexity et ChatGPT.
      </p>
      <p>
        Façonnez la variété de mots-clés dans les deux langues. Après un rendez-vous en français, l'invitation devrait suggérer au client de mentionner le service par son nom français. Après un rendez-vous en anglais, l'invitation devrait suggérer le service par son nom anglais. Les deux formes nourrissent les moteurs IA, les deux formes s'accumulent sur l'année. Le travail est le même effort que la langue de l'invitation soit française ou anglaise, et la récompense est doublée.
      </p>
      <p>
        Pour la recherche vocale en particulier, les avis bilingues sont le signal le plus fort. Siri, Google Assistant et Amazon Alexa tirent le texte des avis dans leurs réponses vocales, et le profil d'avis bilingue permet au même commerce de faire surface pour des requêtes vocales dans les deux langues. Un client bilingue qui demande dis Siri trouve un dentiste près de moi obtient une surface différente que celui qui demande Hey Siri find a dentist near me, et les commerces avec des avis bilingues font surface dans les deux.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour concevoir le programme d'avis bilingue autour de votre cluster québécois précis, avec exemple de carte NFC et pile de gabarits? Sans pitch, livrable envoyé peu importe." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="plan-de-30-jours-pour-construire-le-bilinguisme">Un plan de 30 jours pour construire le bilinguisme</h2>
      <p>
        Jour 1 à 7, vérifier le cluster. Tirez les comptes d'avis EN et FR sur les cinq principaux concurrents du pack local. Documentez la répartition linguistique, la vélocité mensuelle par langue et le taux de réponse par langue. Fixez votre cible bilingue à la moyenne du cluster plus 25 pour cent sur la vélocité mensuelle, avec la répartition linguistique qui correspond au mélange du cluster.
      </p>
      <p>
        Jour 8 à 14, livrer l'invitation bilingue. Rédigez à la main les invitations de demande d'avis en français et en anglais, conservez-les dans l'outil de routage, étiquetez chaque dossier client avec la langue de service. Imprimez les cartes NFC bilingues et placez-les à chaque comptoir ou point de paiement.
      </p>
      <p>
        Jour 15 à 21, construire la pile de gabarits de réponse bilingues. Quatre scénarios par langue, chacun sous 100 mots, avec une fermeture personnalisée qui nomme le membre du personnel. Assignez la fenêtre de réponse quotidienne à un propriétaire nommé. Répondez dans les 24 heures sur les négatifs, 72 heures sur les positifs.
      </p>
      <p>
        Jour 22 à 30, vérifier l'équilibre linguistique. Tirez les avis des 30 derniers jours et vérifiez le mélange EN/FR contre la cible. Ajustez la rotation de l'invitation si le mélange est décalé. La plupart des programmes bilingues stagnants reviennent à l'équilibre dans cette fenêtre de 30 jours si la règle (demander dans la langue de service, répondre dans la même langue) est appliquée chaque jour.
      </p>

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Demandez à chaque client dans la langue où vous l'avez servi, à chaque fois, sans réflexe par défaut.",
          'Les cartes NFC bilingues avec deux QR codes étiquetés FR et EN sont l\'outil de comptoir à plus haut levier.',
          'Répondez dans la même langue que l\'avis, à chaque fois. Le texte de réponse alimente les citations IA.',
          'Le cluster local fixe la cible bilingue, pas une moyenne nationale. Égalisez le mélange du cluster.',
          'La vélocité d\'avis bilingues alimente le classement du pack local, les citations IA et la recherche vocale en même temps.',
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
        alt="Tableau de bord d'avis bilingues pour un commerce local québécois montrant la vélocité d'avis EN et FR sur un trimestre"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
