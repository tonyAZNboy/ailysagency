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
import { meta } from './negative-review-response-templates'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Gabarits de réponse aux avis négatifs, le playbook 24 heures",
  metaDescription:
    "À quelle vitesse répondre à un avis Google négatif et que dire? Six gabarits éprouvés, la règle des 24 heures et le flux bilingue Québec pour les fiches mixtes.",
  tldr: "Répondez à un avis Google négatif dans les 24 heures. La première réponse est publique, axée sur l'empathie, et signée par un propriétaire ou gérant nommé. Une seconde touche est privée, dans la langue utilisée par le client, et offre un vrai chemin de récupération de service. Au Québec, livrez la réponse publique de façon bilingue quand l'auditoire est mixte pour que les lecteurs francophones et anglophones voient la réponse. Les gabarits ci-dessous couvrent les six motifs qui expliquent la majorité des avis négatifs.",
  faqItems: [
    {
      question: 'À quelle vitesse répondre à un avis négatif sur Google?',
      answer:
        "Dans les 24 heures. La première heure est la fenêtre la plus sécuritaire parce que la cliente lit encore la fiche et la majorité des prospects qui visitent le profil pendant cette période voient la réponse à côté de la plainte. Après 24 heures, la réponse aide encore la fiche, mais elle ne fait plus bouger la personne qui a écrit l'avis. Les fiches Québec devraient livrer la réponse publique de façon bilingue quand l'auditoire est mixte pour que francophones et anglophones voient la réponse.",
    },
    {
      question: "Faut-il répondre en public ou en privé à un avis négatif?",
      answer:
        "Les deux. La réponse publique gagne la confiance des prospects qui lisent le profil plus tard, donc elle reste empathique d'abord, nomme le propriétaire ou la gérante qui signe et n'argumente jamais les faits. La touche privée se fait par téléphone ou courriel et porte la vraie récupération de service : remboursement, reprise de rendez-vous ou appel d'un membre senior de l'équipe. Cette séparation évite les disputes publiques et donne quand même une vraie correction au client mécontent.",
    },
    {
      question: 'Peut-on contester ou faire retirer un faux avis négatif?',
      answer:
        "Oui quand l'avis enfreint la politique de Google. Les motifs les plus clairs sont les avis qui contiennent du langage grossier, des attaques personnelles, du contenu hors sujet, un conflit d'intérêts venant d'un concurrent ou des affirmations sur un service que l'entreprise n'offre pas. Déposez la contestation par l'interface Google Business Profile, joignez des captures d'écran et une courte référence de politique, et attendez un délai de 3 à 7 jours. Pendant que la contestation est ouverte, postez une réponse publique calme pour que les prospects voient que la fiche est surveillée.",
    },
    {
      question: "Faut-il nommer le client dans la réponse publique?",
      answer:
        "Utilisez le prénom seulement quand le client a signé avec son prénom. Évitez de le faire quand l'avis est anonyme. Nommer un client en public quand il n'a pas signé donne une impression de surveillance et coûte de la confiance auprès des prospects. La signature du propriétaire ou de la gérante sur la réponse est le nom plus important. Elle marque l'imputabilité et donne un visage à la réponse pour les futurs clients.",
    },
    {
      question: "Comment garder la qualité des réponses quand le volume monte?",
      answer:
        "Bâtissez une pile de six gabarits qui couvrent les motifs les plus fréquents : longue attente, surprise sur la facture, conflit avec un employé, qualité du produit ou de la nourriture, propreté et différend sur le résultat. Chaque gabarit fait moins de 90 mots, laisse de l'espace pour le détail spécifique et finit par une offre de suivi privé. Le module Reviuzy automatise l'acheminement et rappelle au propriétaire nommé dans la fenêtre de 24 heures pour que rien ne tombe quand le calendrier devient chargé.",
    },
  ],
  headings: [
    { id: 'pourquoi-la-fenetre-24h-compte', text: "Pourquoi la fenêtre de 24 heures compte plus que la plupart le pensent" },
    { id: 'la-separation-public-prive', text: "La séparation public et privé, à quoi sert chaque réponse" },
    { id: 'six-gabarits-qui-couvrent-la-plupart', text: 'Six gabarits qui couvrent la plupart des motifs d\'avis négatifs' },
    { id: 'flux-bilingue-quebec', text: 'Le flux bilingue Québec pour les fiches à auditoire mixte' },
    { id: 'quand-contester-un-faux-avis', text: 'Quand contester un faux avis et comment déposer le dossier' },
    { id: 'erreurs-qui-empirent-la-situation', text: 'Les erreurs qui empirent un mauvais avis' },
    { id: 'batir-l-habitude-de-reponse', text: "Bâtir l'habitude de réponse pour qu'elle survive à une semaine chargée" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Répondez à un avis négatif sur Google dans les 24 heures. La réponse est publique, axée sur l'empathie d'abord, et signée par un propriétaire ou gérant nommé. Une seconde touche se fait en privé, dans la langue utilisée par le client, et porte la vraie récupération de service. C'est tout le playbook en trois phrases. Le reste du guide donne les gabarits, le flux bilingue Québec et l'habitude opérationnelle qui garde le travail constant quand le calendrier se remplit. Chaque gabarit est éprouvé sur les fiches clientes d'AiLys et reste à l'intérieur de la politique d'avis Google.
      </p>

      <StatHighlight
        stats={[
          { value: '24 heures', label: 'Fenêtre maximum pour la réponse publique à un avis négatif' },
          { value: '6 gabarits', label: 'Couvrent la majorité des motifs d\'avis négatifs' },
          { value: 'EN et FR', label: 'Standard de réponse publique bilingue pour les fiches Québec' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-la-fenetre-24h-compte">Pourquoi la fenêtre de 24 heures compte plus que la plupart le pensent</h2>
      <p>
        Les 24 premières heures après la publication d'un avis négatif sont la période où le plus de prospects voient la plainte sans réponse à côté. Google Business Profile remonte l'activité récente dans le local pack et sur la carte de fiche, ce qui veut dire qu'un nouvel avis une étoile sans réponse est un tueur d'impressions quotidien pour chaque nouveau visiteur. Le client qui a écrit l'avis est aussi encore actif dans son courriel et reste plus réceptif à une réponse réfléchie pendant ce premier jour. Attendez trois jours et la réponse aide encore la fiche, mais elle ne fait plus bouger le client.
      </p>
      <p>
        La règle des 24 heures a aussi un plancher plus souple. Beaucoup d'entreprises locales du Québec roulent avec un ou deux gérants qui traitent les avis en surplus du reste de la journée. Une fenêtre de 24 heures est atteignable pour eux, alors qu'une fenêtre d'une heure ne l'est pas. La cible honnête est assez rapide pour rejoindre les prospects qui visitent la fiche dans la même journée, assez lente pour permettre au gérant d'écrire une réponse qui ne sonne pas précipitée.
      </p>
      <p>
        La vitesse de réponse est aussi une entrée documentée du classement Google. Les fiches qui répondent à plus de 80 % des avis dans la semaine dépassent celles sans habitude de réponse, même à moyennes égales. La discipline de 24 heures sur les négatifs pousse le taux global de réponse parce qu'elle force une vérification quotidienne, et la vérification quotidienne attrape aussi les positifs.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Les habitudes de réponse les plus rapides que nous voyons chez les clients AiLys roulent sur une notification de boîte partagée plus un propriétaire nommé. Soit le propriétaire reçoit une notification poussée sur son téléphone, soit un gérant a la tâche explicite de vérifier la fiche chaque matin avant l'ouverture. Voyez l'<InternalLink to="/audit" title="AI Visibility Audit gratuit" description="Inclut un test du taux de réponse aux avis sur votre fiche et les cinq premiers concurrents" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir votre taux actuel de réponse aux avis comparé aux concurrents du local pack? Lancez l'audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-separation-public-prive">La séparation public et privé, à quoi sert chaque réponse</h2>
      <p>
        Un avis négatif demande deux réponses, pas une. La réponse publique vit sur Google, est lue par chaque futur prospect qui parcourt le profil et gagne la confiance d'inconnus qui n'ont jamais parlé à l'entreprise. C'est la surface marketing. La réponse privée se fait par téléphone ou courriel, porte la vraie récupération de service et reste invisible au public. C'est la surface client. Mélanger les deux crée une dispute publique ou une réponse publique passive sans vraie correction en arrière.
      </p>
      <p>
        La réponse publique a quatre tâches dans cet ordre. Reconnaître l'expérience sans argumenter les faits. Présenter des excuses pour l'écart entre l'attente et le résultat. Nommer le propriétaire ou le gérant qui signe la réponse. Offrir un canal privé pour le reste de la conversation. La cinquième tâche optionnelle est une phrase qui recadre la fiche pour les futurs prospects, mais seulement quand cela peut se faire sans sonner défensif. La plupart du temps, les quatre tâches suffisent.
      </p>
      <p>
        La réponse privée fait la vraie réparation. Le téléphone bat le courriel quand la plainte est opérationnelle parce que le ton se lit plus vite par appel. Le courriel bat le téléphone quand la plainte touche la facturation ou la documentation écrite parce que les pièces justificatives peuvent être jointes. Le propriétaire nommé ou un gérant senior fait la touche, pas une adresse de soutien générique, parce que le client veut être entendu par quelqu'un qui peut régler le problème.
      </p>

      <SectionDivider />

      <h2 id="six-gabarits-qui-couvrent-la-plupart">Six gabarits qui couvrent la plupart des motifs d'avis négatifs</h2>
      <p>
        La majorité des avis négatifs entrent dans six motifs. Une pile de six gabarits couvre le volume pour toute entreprise locale et laisse de l'espace pour le détail spécifique qui rend chaque réponse personnelle. Gardez chaque gabarit sous 90 mots. Signez avec le prénom du propriétaire ou de la gérante. Déposez le gabarit dans la boîte de réponse, puis modifiez deux ou trois phrases avec le détail tiré de l'avis.
      </p>

      <h3>Gabarit 1, la longue attente</h3>
      <p>
        Bonjour, merci d'avoir pris le temps d'écrire cet avis. Attendre plus longtemps que prévu est une vraie frustration et je comprends la déception. Nous révisons l'horaire de la journée de votre visite pour repérer ce qui nous a ralentis. J'aimerais corriger la situation, et j'aimerais aussi entendre ce qui aiderait le plus. S'il vous plaît, appelez-moi à l'accueil et demandez-moi par mon prénom. Cordialement, Marie, propriétaire.
      </p>

      <h3>Gabarit 2, la surprise sur la facture</h3>
      <p>
        Bonjour, merci pour le commentaire. Les surprises sur une facture sont exactement ce que nous voulons éviter, et je suis désolé que l'explication à la fin de la visite n'ait pas correspondu à votre attente au départ. J'aimerais passer en revue les postes de la facture avec vous et regarder ce que nous pouvons ajuster. Veuillez m'écrire directement à l'adresse courriel de notre profil et je répondrai la même journée. Cordialement, Daniel, gérant.
      </p>

      <h3>Gabarit 3, le conflit avec un employé</h3>
      <p>
        Bonjour, merci de partager ceci. La façon dont vous décrivez l'interaction n'est pas celle que nous voulons faire vivre quand quelqu'un nous quitte, et je suis désolée. Je fais un suivi avec le membre de l'équipe pour comprendre la situation des deux côtés. J'aimerais aussi vous entendre directement pour qu'on corrige le tir. Appelez l'accueil et demandez-moi par mon prénom. Cordialement, Sophie, propriétaire.
      </p>

      <h3>Gabarit 4, la qualité du produit ou de la nourriture</h3>
      <p>
        Bonjour, merci pour le commentaire honnête. Nous tenons notre qualité à un standard clair et ce que vous décrivez est en deçà. J'aimerais vous inviter à revenir pour vous montrer le résultat que nous attendons de nous-mêmes, et j'aimerais aussi rembourser la visite. Veuillez m'écrire à l'adresse courriel de notre profil et j'organiserai les deux. Cordialement, Patrick, propriétaire.
      </p>

      <h3>Gabarit 5, la propreté</h3>
      <p>
        Bonjour, merci de soulever ce point. La propreté est la première chose que nous vérifions chaque matin et nous ne la réussirons pas en devinant, donc le détail que vous partagez est vraiment utile. J'ai parcouru le plancher avec l'équipe ce matin pour repérer l'écart. J'aimerais vous inviter à revenir à nos frais pour que vous voyiez le standard que nous attendons de nous-mêmes. Appelez l'accueil et demandez-moi. Cordialement, Anne, gérante.
      </p>

      <h3>Gabarit 6, le différend sur le résultat</h3>
      <p>
        Bonjour, merci d'avoir pris le temps d'écrire. Le résultat que vous décrivez n'est pas celui que nous planifions, et je veux comprendre la situation au complet avant de tirer une conclusion. Veuillez m'appeler au bureau et demander à me parler directement pour que nous révisions le dossier ensemble et discutions de la prochaine étape. Je bloquerai le temps cette semaine. Cordialement, Dr Tremblay, propriétaire.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Modifiez deux ou trois phrases dans chaque gabarit avant de publier. Le détail est ce qui rend une réponse humaine plutôt que pré-mâchée. La modification la plus risquée est la sur-modification : gardez intactes la clause d'empathie, la clause d'excuses et la clause de canal privé dans chaque réponse. Ces trois pièces sont porteuses.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Une cliente de longue date laisse un avis une étoile sur une surprise de facturation. Le propriétaire a une documentation propre montrant que le frais était correct. Quelle est la meilleure réponse publique?"
        options={[
          'Publier la documentation dans la réponse publique pour que les futurs lecteurs voient les faits',
          'Sauter la réponse publique et appeler la cliente directement',
          "Reconnaître la surprise en public, présenter des excuses pour l'écart d'attente et offrir un canal privé pour réviser les postes de la facture",
          'Signaler l\'avis comme faux par le portail de contestation et attendre son retrait',
        ]}
        correctIndex={2}
        explanation="La réponse publique est la surface marketing, pas la surface légale. Publier la documentation en public se lit comme défensif même quand la documentation est correcte. Reconnaissez l'expérience, offrez un canal privé et réglez le détail de facturation un à un, là où les pièces justificatives appartiennent."
      />

      <SectionDivider />

      <h2 id="flux-bilingue-quebec">Le flux bilingue Québec pour les fiches à auditoire mixte</h2>
      <p>
        Les fiches locales du Québec servent un auditoire bilingue même quand l'avis original est dans une seule langue. Une cliente qui laisse un avis en français se fait quand même lire par des prospects anglophones qui parcourent la fiche plus tard, et un client qui laisse un avis en anglais se fait lire par des prospects francophones. Le flux qui respecte les deux auditoires consiste à répondre publiquement dans la langue utilisée par le client, puis à ajouter une courte phrase bilingue à la fin pointant vers le même canal privé pour les deux auditoires.
      </p>
      <p>
        La phrase bilingue reste courte, huit à douze mots dans chaque langue, et pointe vers un numéro de téléphone ou un courriel qui gère les deux. Ne traduisez pas le corps de la réponse. Le client a écrit dans sa langue, et la réponse devrait respecter ce choix. La fermeture bilingue est pour les futurs lecteurs, pas pour le client original.
      </p>
      <p>
        Le français du Québec en particulier demande des réponses écrites à la main. Les API de traduction enlèvent la voix régionale que les propriétaires locaux utilisent au quotidien, et les clients entendent la différence en deux secondes. Gardez les réponses françaises dans la voix que votre équipe emploie au téléphone, avec les mots locaux (courriel, fin de semaine) et un rythme court. La même discipline s'applique aux gabarits ci-dessus quand ils sont portés en français.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Évitez le module de traduction automatique intégré à la boîte de réponse aux avis dans certains outils tiers. La sortie sonne comme du français étranger pour la clientèle québécoise, et la perte de confiance sur une réponse publique est difficile à récupérer. Écrivez les réponses françaises à la main, ou bâtissez les gabarits dans les deux langues dès le départ.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Exemple côte à côte de réponse publique bilingue sur une fiche Google Business Profile québécoise avec texte principal en français et fermeture en anglais"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="quand-contester-un-faux-avis">Quand contester un faux avis et comment déposer le dossier</h2>
      <p>
        Tous les avis négatifs ne méritent pas une réponse. Une petite part des avis enfreignent la politique de Google et devraient être contestés. Les motifs les plus clairs sont le langage grossier, les attaques personnelles nommant un membre du personnel, le contenu hors sujet (un avis qui parle d'une autre entreprise), le conflit d'intérêts venant d'un concurrent et les affirmations sur un service que l'entreprise n'offre pas. Les fiches du Québec voient aussi à l'occasion des plaintes linguistiques qui ne sont pas des avis sur l'entreprise et qui devraient être signalées comme hors sujet.
      </p>
      <p>
        Déposez la contestation par l'interface Google Business Profile. Prenez des captures d'écran de l'avis avant de déposer. Écrivez une courte référence de politique (une ou deux phrases) qui explique quelle règle l'avis enfreint. Attendez un délai de 3 à 7 jours sur la contestation. Pendant que la contestation est ouverte, postez une réponse publique calme qui ne pointe pas la violation de politique. Les futurs lecteurs devraient voir que la fiche est surveillée même avant que Google retire l'avis.
      </p>
      <p>
        Le taux de succès des contestations chez les clients AiLys tourne autour des deux tiers quand la référence de politique est claire, plus bas quand le dossier repose sur des faits que le commentateur conteste. La leçon est de déposer seulement sur les motifs les plus clairs. Une contestation refusée n'est pas la fin du monde, mais l'investissement de temps s'accumule sur plusieurs avis si l'équipe dépose des dossiers faibles.
      </p>

      <InlineCTA variant="pricing" text="Vous voulez un programme géré d'avis avec piles de gabarits, réponses bilingues et contestations gérées à l'interne? Voyez les forfaits AiLys." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="erreurs-qui-empirent-la-situation">Les erreurs qui empirent un mauvais avis</h2>
      <p>
        Le moyen le plus rapide de rendre un avis une étoile plus dommageable est d'argumenter les faits en public. Même quand les faits favorisent l'entreprise, l'argument public se lit comme défensif, et les prospects qui parcourent la fiche retiennent le ton, pas la vérité. Le deuxième moyen le plus rapide est de répondre avec un gabarit générique qui ne nomme aucun propriétaire et n'offre aucun canal privé. Le troisième est d'attendre deux semaines et de répondre avec une excuse périmée que personne ne lit.
      </p>
      <ol>
        <li>Ne collez pas de documentation, de contrats ou de factures dans une réponse publique. Déplacez cette conversation vers les canaux privés.</li>
        <li>Ne nommez pas le client s'il n'a pas signé. Écrivez à un inconnu qui lira l'avis plus tard.</li>
        <li>Ne demandez pas au client de retirer l'avis. La demande devient souvent le prochain avis négatif.</li>
        <li>Ne répondez pas en colère. Prenez 10 minutes, écrivez un brouillon, éloignez-vous, puis publiez.</li>
        <li>Ne laissez pas la réponse sonner comme générée par machine. Modifiez au moins deux phrases pour coller à la plainte précise.</li>
      </ol>

      <SectionDivider />

      <h2 id="batir-l-habitude-de-reponse">Bâtir l'habitude de réponse pour qu'elle survive à une semaine chargée</h2>
      <p>
        La fenêtre de 24 heures ne tient que lorsque l'habitude de réponse est intégrée à la journée, pas ajoutée après l'arrivée d'une plainte. L'habitude a trois pièces. Une vérification quotidienne à une heure fixe, idéalement en début de matinée avant l'ouverture du plancher. Un propriétaire ou gérant nommé qui possède la réponse, avec un nom de relève pour les semaines de vacances. Une pile de gabarits stockée là où le propriétaire nommé peut coller sur un téléphone ou un portable en deux minutes.
      </p>
      <p>
        Le module Reviuzy à l'intérieur de la pile AiLys gère l'acheminement automatiquement. Les nouveaux avis déclenchent une notification au propriétaire nommé avec le nom du client (quand signé), la note et la langue détectée. Le propriétaire peut répondre depuis le panneau directement avec la pile de gabarits préchargée. Pour les propriétaires qui préfèrent l'interface Google native, réglez la même règle de notification à l'intérieur de Google Business Profile et stockez les gabarits dans une note partagée.
      </p>
      <p>
        Auditez le taux de réponse chaque trimestre. Tirez les 90 derniers jours d'avis et comptez la part qui a reçu une réponse publique dans les 24 heures. Tout ce qui est sous 80 % sur les négatifs est un problème d'habitude, pas un problème d'outillage. Le correctif est habituellement la pièce du propriétaire nommé, parce que la plupart des fiches sans propriétaire clair défilent vers personne et le calendrier gagne. Pour le programme d'avis plus large, voyez l'<InternalLink to="/glossary/review-velocity" title="entrée du glossaire sur la cadence d'avis" description="Fenêtre de fraîcheur, taux de réponse et le reste du vocabulaire du programme d'avis" />.
      </p>

      <InternalLink
        to="/industries"
        title="Playbooks d'industrie"
        description="Voyez les versions dentiste, juriste, restaurant et clinique du flux de réponse aux avis négatifs."
      />

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 60 minutes de la pile de gabarits et du portail de contestation sur votre fiche? Réservez un appel stratégique, sans pitch." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Répondez aux avis négatifs dans les 24 heures. Le premier jour est celui où prospects et client original sont encore actifs.',
          'Séparez le travail entre réponse publique (surface marketing) et touche privée (récupération de service). Ne mélangez pas.',
          'Bâtissez une pile de six gabarits couvrant attente, facture, conflit, qualité, propreté et différend de résultat.',
          'Au Québec, répondez dans la langue utilisée par le client, puis ajoutez une courte fermeture bilingue pour les futurs lecteurs.',
          'Contestez les faux avis seulement sur des motifs de politique clairs et postez une réponse publique calme pendant la contestation.',
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
        alt="Gérante révisant le rapport de taux de réponse sur une fiche Google Business Profile québécoise avec la fenêtre de 24 heures mise en évidence"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
