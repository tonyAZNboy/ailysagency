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
import { meta } from './private-feedback-funnel-google-rules'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Entonnoir de rétroaction privée et règles Google, ce que le filtrage d'avis est et n'est pas",
  metaDescription:
    "Les entonnoirs de rétroaction privée violent-ils les directives d'avis Google? La vraie réponse. Filtrer les clients heureux vers Google et les insatisfaits vers un formulaire privé est du gating, ce qui est interdit. Une demande universelle avant l'avis public est correcte.",
  tldr: "Les entonnoirs de rétroaction privée ne sont pas interdits. Le filtrage d'avis (review gating) est interdit. La ligne, c'est le filtre de satisfaction. Si vous demandez à chaque client la même question avec la même invite et le même chemin vers Google, vous menez une demande conforme. Si vous filtrez par satisfaction d'abord et que vous montrez le lien Google uniquement aux clients heureux, vous faites du filtrage d'avis et Google peut suspendre la fiche. Le motif conforme demande à chaque client un avis public et gère la récupération de service sur un canal séparé.",
  faqItems: [
    {
      question: "Les entonnoirs de rétroaction privée violent-ils les directives d'avis Google?",
      answer:
        "Pas en eux-mêmes. La violation, c'est le filtrage d'avis, qui est la pratique de filtrer les clients par satisfaction d'abord et de ne montrer le lien d'avis Google qu'aux clients heureux. Un formulaire de rétroaction privée est correct quand il fonctionne en parallèle de la demande publique, pas comme un filtre devant la demande publique. La version honnête demande à chaque client un avis Google et offre un canal de rétroaction privée comme chemin séparé pour les enjeux qui exigent une escalade interne.",
    },
    {
      question: "Qu'est-ce que le filtrage d'avis exactement?",
      answer:
        "Le filtrage d'avis (review gating) est tout processus qui filtre les clients par sentiment prévu avant de montrer le lien d'avis public. L'exemple classique : un sondage qui demande comment l'expérience s'est déroulée sur une échelle de cinq points, puis montre le lien d'avis Google seulement quand la réponse est quatre ou cinq, et montre un formulaire de plainte privé quand la réponse est de un à trois. Google interdit explicitement ce motif dans les politiques de contenu interdit et restreint. La pénalité va de l'avertissement à la suspension complète de la fiche en cas de récidive.",
    },
    {
      question: "Puis-je envoyer un sondage de rétroaction privée avant de demander un avis Google?",
      answer:
        "Oui si le sondage est universel et si le lien d'avis public suit peu importe la réponse. Le flux conforme demande à chaque client la même question, puis offre le lien d'avis public à chaque client peu importe sa réponse. Si la réponse est négative, vous pouvez aussi offrir un canal de récupération de service, mais le lien d'avis public doit rester visible. Le flux non conforme verrouille le lien d'avis public derrière un seuil de satisfaction.",
    },
    {
      question: "Comment Google détecte-t-il le filtrage d'avis en 2026?",
      answer:
        "Trois vecteurs. Premièrement, la détection automatisée de moyennes étoiles anormalement hautes combinées à un nombre faible d'avis négatifs déclenche des audits automatiques. Deuxièmement, les signalements de clients par le formulaire de rétroaction GBP nomment des outils et motifs de filtrage spécifiques. Troisièmement, les équipes de modération de Google testent les principales plateformes d'automatisation d'avis en s'inscrivant comme fausse entreprise et en observant le flux. Quand une plateforme démontre du filtrage, la plateforme elle-même peut être marquée et les entreprises qui l'utilisent peuvent être auditées en lot. La détection s'est nettement améliorée depuis 2023.",
    },
    {
      question: "Quelle est l'alternative conforme à un entonnoir de rétroaction privée?",
      answer:
        "Demandez à chaque client un avis Google avec la même invite, puis offrez un canal interne de rétroaction parallèle pour les enjeux qui exigent une escalade. Des outils comme Reviuzy mènent ce motif de demande universelle par défaut. Le client voit le lien d'avis Google d'abord, peut soumettre un avis public, et peut signaler séparément un enjeu de service par un autre bouton qui achemine vers l'opérateur. Les deux canaux fonctionnent en parallèle, pas en séquence, ce qui garde le flux conforme.",
    },
  ],
  headings: [
    { id: 'ce-que-google-interdit-vraiment-et-pourquoi', text: 'Ce que Google interdit vraiment et pourquoi la politique existe' },
    { id: 'filtrage-d-avis-vs-retroaction-privee', text: "Filtrage d'avis contre rétroaction privée, la ligne qui compte" },
    { id: 'exemples-de-flux-interdits', text: 'Exemples de flux interdits que nous auditons chaque semaine' },
    { id: 'le-motif-de-demande-universelle-conforme', text: 'Le motif de demande universelle conforme' },
    { id: 'comment-google-detecte-le-filtrage-en-2026', text: 'Comment Google détecte le filtrage en 2026' },
    { id: 'pourquoi-la-version-honnete-gagne-encore', text: 'Pourquoi la version honnête gagne encore sur le volume' },
    { id: 'liste-de-verification-pour-flux-d-avis-propres', text: "Liste de vérification pour flux d'avis propres" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les propriétaires posent la même question à chaque trimestre. Si un client a vécu une mauvaise expérience, puis-je l'envoyer vers un formulaire de rétroaction privée plutôt que vers la page d'avis Google? La réponse honnête, c'est non, pas comme un filtre. Le filtrage d'avis, c'est la pratique de trier les clients par satisfaction avant d'exposer le lien d'avis public, et Google l'interdit explicitement. La version légitime de la rétroaction privée, c'est un canal parallèle qui fonctionne à côté de la demande publique, pas devant elle. Cette pièce trace la ligne entre les entonnoirs de rétroaction privée conformes et le filtrage d'avis interdit, avec le texte de politique réel et les vecteurs de détection que Google utilise aujourd'hui.
      </p>

      <StatHighlight
        stats={[
          { value: 'Interdit', label: 'Filtrer les clients par satisfaction avant la demande Google' },
          { value: 'Permis', label: 'Demander à chaque client avec la même invite et le même lien' },
          { value: 'Parallèle', label: 'Canal de rétroaction privée à côté de la demande publique' },
        ]}
      />

      <SectionDivider />

      <h2 id="ce-que-google-interdit-vraiment-et-pourquoi">Ce que Google interdit vraiment et pourquoi la politique existe</h2>
      <p>
        La politique de contenu interdit et restreint de Google sur les avis est courte et directe. Les entreprises ne peuvent pas solliciter des avis de manière sélective auprès des clients en fonction du sentiment prévu. La politique utilise le terme review gating pour décrire la violation. La raison d'être de la politique, c'est que le filtrage produit une moyenne étoiles qui ne reflète pas la vraie expérience client, ce qui brise le signal de confiance public sur lequel tout l'écosystème de recherche locale repose. Une moyenne de quatre point neuf qui vient du filtrage des clients insatisfaits est pire qu'une moyenne de quatre point trois qui inclut tout le monde, parce que la première induit en erreur les futurs clients sur ce à quoi s'attendre.
      </p>
      <p>
        La politique s'applique peu importe que le filtre soit automatisé par un outil ou manuel par un humain. Un membre du personnel qui n'envoie des demandes d'avis qu'aux clients dont il se souvient comme heureux mène techniquement la même violation qu'un outil logiciel qui achemine automatiquement par score de satisfaction. Google applique le principe, pas le mécanisme.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>La pile de pénalités sur du filtrage détecté n'est pas symbolique. Google peut émettre un avertissement de contenu, retirer la fiche du pack local ou suspendre le GBP entièrement en cas de récidive ou d'infraction grave. La réinstallation prend de un à quatre mois quand elle réussit, et plusieurs appels échouent quand le motif de filtrage est documenté en captures d'écran.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit gratuit de votre flux de demande d'avis pour confirmer qu'il est conforme aux politiques? L'audit AI Visibility de 24 heures couvre les vérifications de flux de réputation." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="filtrage-d-avis-vs-retroaction-privee">Filtrage d'avis contre rétroaction privée, la ligne qui compte</h2>
      <p>
        La ligne qui compte, c'est le filtre de satisfaction. La rétroaction privée comme concept n'est pas interdite. Les hôtels envoient des sondages post-séjour. Les cliniques envoient des questionnaires d'expérience. Les restaurants posent des questions sur le repas. Aucun de ces cas n'est du filtrage. Le seuil de filtrage est franchi seulement quand le résultat du sondage décide si le client voit ou non le lien d'avis Google public. Si le lien est universel, le sondage est correct. Si le lien est conditionnel à un résultat de sondage positif, le sondage est du filtrage.
      </p>
      <p>
        Le modèle mental le plus propre, ce sont deux canaux parallèles. Canal A, c'est la demande d'avis public, envoyée à chaque client avec la même invite, le même lien, le même chemin vers Google. Canal B, c'est le canal de rétroaction interne, disponible à chaque client qui veut signaler un enjeu, sans incidence sur le déclenchement du canal A. Les deux canaux fonctionnent pour chaque client. Aucun canal ne filtre l'autre. C'est le motif conforme.
      </p>

      <h3>Ce qui sépare les deux motifs en pratique</h3>
      <ul>
        <li>Conforme : chaque client reçoit la même demande d'avis par courriel ou texto avec le lien Google visible</li>
        <li>Conforme : un canal de rétroaction interne séparé existe pour la récupération de service, accessible à tous les clients</li>
        <li>Conforme : les réponses de sondage négatives reçoivent quand même le lien d'avis Google dans le même flux</li>
        <li>Interdit : une question de satisfaction qui décide si on montre ou non le lien Google</li>
        <li>Interdit : un formulaire de rétroaction interne montré seulement aux clients qui ont sélectionné une à trois étoiles</li>
        <li>Interdit : un tri manuel où le personnel n'envoie de demandes qu'aux clients qu'il a aimés</li>
      </ul>

      <SectionDivider />

      <h2 id="exemples-de-flux-interdits">Exemples de flux interdits que nous auditons chaque semaine</h2>
      <p>
        Cinq motifs reviennent souvent dans les audits que nous faisons pour les nouveaux clients. Chacun est techniquement une violation de filtrage, peu importe que le propriétaire l'ait voulu ainsi ou non.
      </p>

      <ol>
        <li>L'invite cinq étoiles. Une page de destination demande comment s'est déroulée l'expérience sur une échelle de cinq points. Sélectionner quatre ou cinq révèle le lien d'avis Google. Sélectionner un à trois révèle un formulaire de plainte privé. C'est la violation manuelle et elle compte pour la majorité des actions d'application que nous voyons.</li>
        <li>La barrière du pouce. Un bouton qui demande si le client recommanderait l'entreprise. Oui dirige vers Google. Non dirige vers un formulaire courriel privé. Même violation, autre couche visuelle.</li>
        <li>Le tri manuel. Le personnel est formé à n'envoyer des demandes d'avis qu'aux clients qui ont payé la facture à temps, complété un sondage de suivi ou autrement montré un engagement positif. Le filtre est humain mais le principe est le même.</li>
        <li>La barrière du kiosque. Une tablette en magasin qui demande la satisfaction d'abord et ne montre le code QR Google qu'à une réponse positive. Ce motif est courant dans les bureaux dentaires et de chiropratique.</li>
        <li>Le routeur automatique. Un outil d'automatisation d'avis qui achemine les clients vers Google selon un classifieur de sentiment qui lit la première réponse du client. La classe la plus coûteuse de violation parce que le motif est difficile à auditer sans inspecter l'outil lui-même.</li>
      </ol>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Les mêmes flux sont conformes si vous retirez le conditionnel. Un sondage à cinq points qui se termine par le lien d'avis Google peu importe le score est correct. Un bouton de pouce qui montre toujours Google est correct. Un kiosque qui montre toujours le code QR est correct. La correction, c'est l'exposition universelle, pas la refonte visuelle.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Une clinique envoie un sondage post-visite. Les patients qui notent leur visite quatre ou cinq étoiles reçoivent un courriel avec le lien d'avis Google. Les patients qui notent trois ou moins reçoivent plutôt un formulaire de plainte privé. Est-ce conforme?"
        options={[
          'Oui, la clinique a le droit de filtrer à qui elle envoie le lien',
          'Oui, tant que les patients insatisfaits reçoivent un appel de suivi',
          'Non, c\'est du filtrage d\'avis et Google peut suspendre la fiche',
          'Seulement si la clinique divulgue le filtre dans la politique de confidentialité',
        ]}
        correctIndex={2}
        explanation="Le lien d'avis Google conditionnel à la satisfaction est la violation manuelle de filtrage. La conformité exige que chaque patient voie le lien d'avis Google peu importe sa note de visite, avec le formulaire de plainte privé qui fonctionne comme canal parallèle plutôt que comme remplacement."
      />

      <SectionDivider />

      <h2 id="le-motif-de-demande-universelle-conforme">Le motif de demande universelle conforme</h2>
      <p>
        Le motif de demande universelle est la version qui fonctionne à grande échelle et reste dans la politique. Le mécanisme est direct. Après chaque transaction, chaque client reçoit la même demande d'avis par le même canal avec la même invite et le même lien Google. Le message peut inclure une ligne distincte qui reconnaît que si l'expérience a manqué le but, le client peut aussi partager une rétroaction privée par un second canal. Le lien Google reste visible peu importe la situation.
      </p>
      <p>
        Ce motif produit des moyennes étoiles plus basses sur papier que le filtrage, parce que les clients insatisfaits sont aussi exposés au lien public. En pratique, le motif de demande universelle produit une vélocité d'avis plus élevée, de meilleurs signaux de récence et un score agrégé plus crédible que les moteurs IA pondèrent plus fortement quand ils font surgir des recommandations locales. <InternalLink to="/glossary/review-velocity" title="Entrée glossaire vélocité d'avis" description="Ce que la récence et la cadence signifient pour le classement" /> couvre le côté vélocité de l'équation, et <InternalLink to="/blog/reviuzy-review-automation-guide" title="Guide d'automatisation Reviuzy" description="Le flux de demande universelle conforme dans Reviuzy" /> détaille la configuration complète.
      </p>

      <h3>Composants du flux de demande universelle</h3>
      <ul>
        <li>Un événement déclencheur par client, typiquement la fermeture de facture ou la fin de visite</li>
        <li>Un modèle de message avec le lien d'avis Google visible et cliquable</li>
        <li>Un canal de rétroaction interne parallèle étiqueté clairement comme séparé</li>
        <li>Un rappel de suivi si la première demande ne reçoit pas de réponse après sept jours</li>
        <li>Une habitude de réponse côté opérateur, qui répond à chaque avis Google en moins de soixante-douze heures</li>
      </ul>

      <InlineCTA variant="pricing" text="Voyez comment Reviuzy automatise le motif de demande universelle et achemine la rétroaction négative vers les opérateurs sans bloquer le lien public. À partir du palier AiLys Growth." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="comment-google-detecte-le-filtrage-en-2026">Comment Google détecte le filtrage en 2026</h2>
      <p>
        La détection s'est nettement améliorée depuis 2023. Trois vecteurs gèrent l'essentiel du travail d'application. Le premier vecteur est automatisé. Les fiches avec des moyennes étoiles anormalement hautes combinées à un faible nombre d'avis négatifs déclenchent des audits algorithmiques. Un profil avec cent avis à une moyenne de quatre point neuf et zéro avis une étoile ou deux étoiles déclenche l'audit plus vite qu'un profil à quatre point cinq avec une distribution normale.
      </p>
      <p>
        Le deuxième vecteur, ce sont les signalements de clients. Le formulaire de rétroaction GBP permet aux clients de signaler une entreprise pour manipulation d'avis, et Google lit ces signalements à la lumière des signaux automatiques. Des signalements répétés contre la même fiche ou contre la même pile d'outils d'automatisation d'avis empilent les preuves rapidement. Le troisième vecteur, c'est l'équipe de modération de Google qui teste les principales plateformes d'avis en s'inscrivant comme fausse entreprise et en observant le flux que la plateforme produit. Quand une plateforme échoue ce test, Google peut marquer en lot les entreprises qui l'utilisent.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>L'auto-audit le plus rapide, c'est de regarder votre propre distribution étoiles. Si votre profil a plus de cinquante avis et zéro entrée d'une étoile ou deux étoiles, votre flux filtre probablement quelque part même si vous ne l'avez pas conçu ainsi. Une distribution normale montre 5 à 12 pour cent d'avis à faible étoile sur un profil avec un volume de demande sain.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="pourquoi-la-version-honnete-gagne-encore">Pourquoi la version honnête gagne encore sur le volume</h2>
      <p>
        Les opérateurs argumentent parfois que le filtrage vaut le risque parce que la moyenne étoiles plus haute fait gagner plus de conversions. Deux raisons rendent les calculs pires qu'ils n'en ont l'air. Premièrement, les moteurs IA lisent maintenant la distribution d'avis comme un signal de crédibilité. ChatGPT, Perplexity et Google AI Overviews citent tous plus souvent les entreprises avec des distributions réalistes que celles avec des cotes parfaites invraisemblables. Une moyenne de quatre point neuf avec zéro avis une étoile a l'air fausse aux moteurs, qui réduisent le poids de la citation. Deuxièmement, le risque de survie sur une suspension est asymétrique. Le gain du filtrage, c'est une bosse marginale d'étoiles. La perte, c'est un effacement complet de la fiche avec des mois de travail de récupération et plusieurs appels qui échouent purement.
      </p>
      <p>
        La version de demande universelle produit une moyenne de quatre point cinq à quatre point huit pour la plupart des catégories, ce qui est assez élevé pour convertir et assez crédible pour les moteurs IA. Le gain de volume vient du fait de demander à chaque client plutôt qu'aux seuls clients heureux, ce qui double ou triple la population de demande dans la plupart des entreprises de services que nous auditons. Un volume plus élevé avec une distribution réaliste bat un volume plus bas avec une distribution manipulée sur chaque mesure de long terme que nous suivons.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme comparant un flux d'avis filtré avec lien Google conditionnel et une demande universelle avec canal de rétroaction interne parallèle"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="liste-de-verification-pour-flux-d-avis-propres">Liste de vérification pour flux d'avis propres</h2>
      <p>
        Faites cette vérification en sept points sur le flux de demande d'avis existant. Toute réponse non veut dire que vous risquez un constat de filtrage.
      </p>
      <ol>
        <li>Chaque client reçoit-il une demande d'avis dans les sept jours suivant la transaction?</li>
        <li>Le lien d'avis Google est-il visible dans le premier message peu importe la satisfaction du client?</li>
        <li>Le message reste-t-il le même peu importe la réponse à un pré-sondage?</li>
        <li>Le canal de rétroaction interne est-il étiqueté clairement comme séparé, pas comme substitut?</li>
        <li>La formation du personnel évite-t-elle le filtrage manuel des clients qui reçoivent la demande?</li>
        <li>La distribution d'étoiles montre-t-elle de 5 à 12 pour cent d'avis à faible étoile sur les douze derniers mois?</li>
        <li>L'habitude de réponse répond-elle à chaque avis en moins de soixante-douze heures?</li>
      </ol>
      <p>
        Un flux qui passe les sept est conforme aux politiques et prêt pour le signal de crédibilité des moteurs IA. <InternalLink to="/audit" title="Audit gratuit de 24 heures" description="Inclut les vérifications de flux de réputation et l'analyse de distribution d'avis" /> mène les sept points automatiquement et fait surgir tout risque de filtrage dans le livrable. Le complément sur <InternalLink to="/blog/google-review-velocity-playbook" title="Cahier de jeu vélocité d'avis Google" description="Comment la récence et la cadence déplacent le pack local" /> couvre comment traduire des flux de demande propres en gains de classement. La voie honnête est la seule qui survit au prochain cycle de modération, et elle produit aussi de meilleurs résultats à long terme que le filtrage.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier un flux d'avis conforme pour votre entreprise? Sans pitch, doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Le filtrage d'avis est interdit. Les entonnoirs de rétroaction privée ne le sont pas. La ligne, c'est le filtre de satisfaction sur le lien d'avis public.",
          "Les flux conformes demandent à chaque client un avis Google avec la même invite et le même lien, peu importe le sentiment prévu.",
          'Les canaux internes parallèles sont corrects. Les canaux internes conditionnels qui remplacent le lien Google sont du filtrage.',
          "La détection Google s'est améliorée depuis 2023, avec des audits automatisés, des signalements clients et des tests au niveau plateforme.",
          'Les flux de demande universelle produisent un volume plus élevé, des distributions plus crédibles et de meilleurs taux de citation par les moteurs IA que le filtrage.',
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
        alt="Liste de vérification de conformité pour flux de demandes d'avis montrant l'audit en sept points et le motif de demande universelle"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
