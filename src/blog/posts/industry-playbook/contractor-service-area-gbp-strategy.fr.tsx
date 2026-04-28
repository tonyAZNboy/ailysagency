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
import { meta } from './contractor-service-area-gbp-strategy'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Stratégie GBP pour entrepreneurs en zone de service, un seul profil pour plusieurs villes',
  metaDescription:
    "Les entrepreneurs ont-ils besoin d'un GBP par zone de service? Non. Un profil Service Area Business par entité légale, adresse cachée, plusieurs villes déclarées. Règles RBQ Québec incluses.",
  tldr: "Les entrepreneurs qui se déplacent chez le client gèrent un seul profil Google Business Profile par entité légale, déclarent jusqu'à vingt zones de service et masquent l'adresse municipale. Créer un second GBP pour une autre ville est une violation de politique qui mène à la suspension du profil. L'angle québécois ajoute une exigence de licence RBQ (Régie du bâtiment du Québec) qui doit apparaître dans la description de l'entreprise et dans le pied de page du site pour alimenter les signaux E-E-A-T sur les moteurs IA.",
  faqItems: [
    {
      question: "Les entrepreneurs ont-ils besoin d'un GBP distinct pour chaque zone de service?",
      answer:
        "Non. La politique de Google est claire : un seul Google Business Profile par entité légale. Un entrepreneur qui se déplace chez le client crée un seul profil Service Area Business, masque l'adresse municipale et déclare jusqu'à vingt zones de service dans cette unique fiche. Créer un second GBP pour une autre ville déclenche la détection de doublons et entraîne une suspension qui peut effacer six à douze mois de travail de classement en un seul cycle de modération.",
    },
    {
      question: "Qu'est-ce qu'un Service Area Business sur Google Business Profile?",
      answer:
        "Un Service Area Business ou SAB est un type de profil pour les entreprises qui se déplacent chez le client plutôt que de l'accueillir en magasin. Plombiers, électriciens, couvreurs, paysagistes, peintres et entrepreneurs généraux sont typiquement admissibles. Le profil masque l'adresse municipale et affiche plutôt la liste des villes, quartiers ou codes postaux desservis. Google classe les SAB dans le pack local de toute ville incluse dans la zone de service déclarée, pondéré par la proximité de l'adresse cachée et les signaux de citations.",
    },
    {
      question: "Combien de zones de service un entrepreneur peut-il déclarer sur un seul GBP?",
      answer:
        "Jusqu'à vingt zones de service par profil. Chaque zone peut être une ville, une MRC, un code postal ou un polygone personnalisé jusqu'à environ deux heures de route depuis l'adresse cachée. La pratique honnête, c'est de déclarer uniquement les villes que vous desservez réellement, pas toutes les villes accessibles en voiture. La sur-déclaration dilue le signal de proximité et réduit le classement dans les villes qui comptent vraiment. Les entrepreneurs québécois déclarent typiquement une ville principale plus huit à douze villes adjacentes, pas les vingt cases.",
    },
    {
      question: "Le Québec exige-t-il une licence RBQ pour les entrepreneurs sur GBP?",
      answer:
        "Oui pour la plupart des métiers de la construction. La Régie du bâtiment du Québec délivre des licences pour les entrepreneurs généraux, électriciens, plombiers, couvreurs et plusieurs autres métiers. Le numéro RBQ devrait apparaître dans la description GBP, dans le pied de page du site, sur chaque soumission, et à l'intérieur du schéma LocalBusiness comme identifiant. Les moteurs IA comme ChatGPT et Perplexity citent maintenant plus souvent les entrepreneurs licenciés RBQ que les non licenciés parce que la créance se lit comme un signal de confiance vérifiable.",
    },
    {
      question: "Faut-il masquer l'adresse municipale sur le GBP d'un entrepreneur?",
      answer:
        "Oui si l'entrepreneur n'accueille pas la clientèle à cette adresse. L'adresse doit quand même être saisie pendant la vérification pour que Google envoie une carte postale ou fasse une vérification vidéo, mais le visage public de la fiche masque l'adresse et n'affiche que la carte des zones de service. Les propriétaires qui laissent l'adresse visible sur un profil SAB se font parfois marquer pour fausse représentation, surtout si l'adresse est résidentielle. Le masquage de l'adresse est la version conforme à la politique.",
    },
  ],
  headings: [
    { id: 'pourquoi-un-gbp-par-entite-legale-pas-par-ville', text: 'Pourquoi un GBP par entité légale, pas un par ville' },
    { id: 'qu-est-ce-qu-un-service-area-business', text: "Qu'est-ce qu'un Service Area Business sur GBP" },
    { id: 'comment-declarer-les-zones-de-service', text: 'Comment déclarer les zones de service correctement' },
    { id: 'l-angle-de-la-licence-rbq-quebec', text: "L'angle de la licence RBQ Québec" },
    { id: 'classer-dans-des-villes-sans-pignon-sur-rue', text: 'Se classer dans des villes sans pignon sur rue' },
    { id: 'violations-courantes-qui-mement-a-la-suspension', text: 'Violations courantes qui mènent à la suspension' },
    { id: 'un-deploiement-de-90-jours-pour-le-quebec', text: 'Un déploiement de 90 jours pour le Québec' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les entrepreneurs posent la même question à chaque appel d'intégration. Devrais-je créer un Google Business Profile par ville desservie, ou un profil pour toute la compagnie? La réponse honnête, c'est un profil par entité légale, avec l'adresse municipale masquée et jusqu'à vingt zones de service déclarées dans cette seule fiche. Créer un second GBP pour une autre ville n'est pas une astuce de croissance, c'est une violation de politique, et les files de modération de Google la repèrent. Voici la stratégie GBP pour entrepreneurs en zone de service qui tient au Québec, incluant les signaux de licence RBQ que les moteurs IA récompensent maintenant.
      </p>

      <StatHighlight
        stats={[
          { value: '1', label: 'GBP par entité légale, jamais par ville' },
          { value: '20', label: 'Zones de service maximales par profil' },
          { value: 'RBQ', label: 'Licence québécoise qui alimente la confiance des moteurs IA' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-un-gbp-par-entite-legale-pas-par-ville">Pourquoi un GBP par entité légale, pas un par ville</h2>
      <p>
        La politique de Google est explicite. Une entreprise obtient un seul Google Business Profile par entité légale à une adresse vérifiée. Un entrepreneur qui opère comme une seule compagnie incorporée ne peut pas légalement gérer un second GBP pour la prochaine ville, même si cette ville est à deux heures de route. La détection de doublons fonctionne avec le numéro de téléphone, le nom d'entreprise et le courriel de l'opérateur, et elle attrape les doublons rapidement. La suspension arrive typiquement en trente à soixante jours après la mise en ligne du second profil, et la fiche suspendue perd chaque avis, chaque photo et chaque citation bâtie au fil des années.
      </p>
      <p>
        L'exception est réelle. Un entrepreneur qui exploite deux entités légales distinctes, avec incorporation séparée, numéros de téléphone séparés, adresses séparées et personnel séparé, peut gérer un GBP par entité. Ce sont deux entreprises, pas une entreprise avec deux profils. La grande majorité des petits et moyens entrepreneurs sont une seule entité, donc la règle qui s'applique est un profil, plusieurs zones de service, adresse cachée.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le coût d'une suspension n'est pas abstrait. Nous voyons des entrepreneurs perdre 80 à 200 avis et douze mois d'élan de classement à cause d'un seul drapeau de doublon. La récupération via le processus d'appel GBP prend deux à quatre mois quand elle réussit, et plusieurs appels échouent. Ne gérez pas un second profil pour une autre ville.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit en 24 heures de la configuration GBP de votre entreprise, incluant la couverture des zones de service et le schéma RBQ? L'audit AI Visibility gratuit couvre tout." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="qu-est-ce-qu-un-service-area-business">Qu'est-ce qu'un Service Area Business sur GBP</h2>
      <p>
        Un Service Area Business, ou SAB, est le type de profil GBP pour les opérateurs qui se déplacent chez le client plutôt que de l'accueillir en magasin. Plombiers, électriciens, couvreurs, paysagistes, peintres, compagnies de déneigement, spécialistes de fondation, entrepreneurs généraux, techniciens CVC et la plupart des entrepreneurs spécialisés se qualifient. Le test simple : est-ce que le client vient à vous, ou est-ce que vous allez chez le client? Si la réponse est la deuxième, vous êtes un SAB.
      </p>
      <p>
        Le profil SAB fait trois choses différemment d'un profil avec pignon sur rue. Premièrement, il masque l'adresse municipale du public. Le client voit plutôt une carte de la zone de service. Deuxièmement, il exige des déclarations de zones de service, jusqu'à vingt villes, MRC, codes postaux ou polygones personnalisés. Troisièmement, il se classe dans le pack local de toute ville incluse dans la zone de service déclarée, pondéré par la proximité de l'adresse cachée et les signaux de citations. Ce troisième comportement est ce qui permet à un seul profil de couvrir toute une région métropolitaine.
      </p>

      <h3>Métiers admissibles au SAB</h3>
      <ul>
        <li>Entrepreneurs généraux et spécialistes en rénovation</li>
        <li>Plombiers, électriciens, techniciens CVC</li>
        <li>Couvreurs, installateurs de revêtement, spécialistes de fondation</li>
        <li>Paysagistes, déneigement, services d'élagage</li>
        <li>Peintres, installateurs de revêtements de sol, finisseurs de gypse</li>
        <li>Constructeurs de piscines, de patios, installateurs de clôtures</li>
      </ul>

      <SectionDivider />

      <h2 id="comment-declarer-les-zones-de-service">Comment déclarer les zones de service correctement</h2>
      <p>
        L'éditeur de zones de service dans GBP accepte jusqu'à vingt entrées. Chaque entrée peut être un nom de ville, une MRC, un code postal ou un polygone personnalisé tracé sur la carte. La pratique honnête, c'est de déclarer uniquement les villes que vous desservez réellement, pondérées vers les villes où vous avez complété des chantiers dans les douze derniers mois. La sur-déclaration dilue le signal de proximité et réduit le classement dans les villes qui comptent. Un entrepreneur québécois basé à Longueuil avec des chantiers actifs sur la Rive-Sud déclare typiquement Longueuil, Boucherville, Saint-Hubert, Brossard, Saint-Lambert, Greenfield Park et quelques municipalités adjacentes, pas toutes les villes de la Montérégie.
      </p>
      <p>
        Le temps de route compte aussi. Google récompense les zones de service dans un rayon d'environ deux heures de l'adresse cachée. Au-delà, l'algorithme commence à diluer le signal de proximité même quand la zone est techniquement dans la liste déclarée. Un entrepreneur qui déclare Québec et Montréal sur le même profil verra un classement faible dans les deux, parce que le signal de proximité est moyenné sur un écart déraisonnable.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>La liste de zones de service la plus propre, c'est de six à douze entrées qui correspondent à votre vrai journal de chantiers des douze derniers mois. Tirez les adresses clients de votre logiciel de facturation, placez-les sur une carte et déclarez le grappage. Cette liste serrée bat une liste de vingt entrées chaque fois.</p>
      </CalloutBox>

      <h3>Formats de déclaration de zone de service</h3>
      <ul>
        <li>Nom de ville, le plus courant et le plus facile à vérifier</li>
        <li>Code postal, utile pour les zones urbaines denses avec ciblage par sous-quartier</li>
        <li>MRC ou municipalité régionale de comté, utile pour la couverture du Québec rural</li>
        <li>Polygone personnalisé, tracé sur la carte pour des frontières de service non standard</li>
      </ul>

      <SectionDivider />

      <h2 id="l-angle-de-la-licence-rbq-quebec">L'angle de la licence RBQ Québec</h2>
      <p>
        Les métiers de la construction au Québec sont régulés par la Régie du bâtiment du Québec, abrégée RBQ. Les entrepreneurs généraux, électriciens, plombiers, couvreurs, spécialistes de fondation et plusieurs autres métiers exigent une licence RBQ pour opérer légalement. Le numéro de licence est une créance vérifiable, et les moteurs IA ont appris à pondérer les créances vérifiables plus haut que l'expertise auto-déclarée quand ils classent les réponses d'entrepreneurs aux requêtes des utilisateurs.
      </p>
      <p>
        Faites apparaître le numéro RBQ à quatre endroits pour alimenter le signal de confiance autant en SEO classique qu'en AI Visibility. Premièrement, dans la description d'entreprise GBP, sous la forme RBQ suivi du numéro à huit chiffres. Deuxièmement, dans le pied de page du site, visible sur chaque page. Troisièmement, sur chaque soumission et facture, ce qui alimente le signal de confiance au niveau des documents que certains moteurs IA tirent des PDF en cache. Quatrièmement, à l'intérieur du schéma LocalBusiness comme identifiant, ce qui alimente directement Google AI Overviews et Perplexity.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Un entrepreneur général incorpore une compagnie au Québec et dessert Longueuil, Boucherville et Brossard. Combien de profils GBP devrait-il gérer?"
        options={[
          'Trois, un par ville',
          'Deux, un pour Longueuil et un combiné pour les deux autres',
          'Un seul, avec les trois déclarées comme zones de service',
          'Un par quartier dans chaque ville',
        ]}
        correctIndex={2}
        explanation="Une entité légale obtient un seul GBP. L'entrepreneur déclare Longueuil, Boucherville et Brossard comme zones de service dans le profil unique, masque l'adresse municipale et inscrit le numéro RBQ dans la description. Créer un second profil pour l'une de ces villes déclenche la détection de doublons."
      />

      <SectionDivider />

      <h2 id="classer-dans-des-villes-sans-pignon-sur-rue">Se classer dans des villes sans pignon sur rue</h2>
      <p>
        Le mécanisme qui permet à un seul SAB de se classer dans plusieurs villes sans pignon sur rue dans chacune, c'est la pondération de proximité combinée à la profondeur des citations. Google pondère la proximité de l'adresse cachée comme signal primaire, mais il pondère aussi la profondeur des citations, la vélocité des avis, la couverture photo et les pages de destination par zone de service comme signaux secondaires. Un entrepreneur avec des signaux secondaires forts peut dépasser un concurrent à proximité plus proche mais avec des citations et avis plus minces.
      </p>
      <p>
        C'est pourquoi le travail au niveau des pages compte. Bâtissez une page de destination dédiée pour chaque zone de service déclarée sur votre site. Plombier à Longueuil, Plumber in Boucherville, Plombier à Brossard. Chaque page couvre les mêmes services avec un texte spécifique à la ville, des témoignages spécifiques à la ville et des références de citations spécifiques à la ville. Les moteurs IA traitent chaque page de destination comme une surface de classement séparée, et ils citent la page qui nomme la ville dans l'URL et le titre. <InternalLink to="/glossary/gbp" title="Entrée glossaire GBP" description="Mécanique des profils Service Area Business expliquée" /> couvre l'équilibre proximité contre citations plus en profondeur.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Les pages de zones de service bilingues doublent la surface. Un entrepreneur québécois qui livre les versions anglaise et française du Québec de chaque page de zone de service couvre les deux surfaces de classement. Google classe EN et FR-CA comme cibles AI Overview séparées, ce qui veut dire qu'un ensemble bilingue peut récolter des citations des deux côtés du clivage linguistique.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Voyez comment AiLys Core livre les pages GBP et de zones de service bilingues pour entrepreneurs à 799 dollars CAD par mois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="violations-courantes-qui-mement-a-la-suspension">Violations courantes qui mènent à la suspension</h2>
      <p>
        Cinq erreurs reviennent souvent dans les suspensions d'entrepreneurs québécois. Les nommer aide les propriétaires à les éviter.
      </p>
      <ol>
        <li>Gérer un second profil GBP pour une autre ville sous la même entité légale</li>
        <li>Laisser l'adresse municipale visible sur le profil public quand l'adresse est résidentielle</li>
        <li>Bourrer le nom d'entreprise avec des mots-clés ou noms de villes qui ne sont pas sur les papiers d'incorporation légale</li>
        <li>Déclarer des zones de service incluant des villes hors d'un rayon de route raisonnable depuis l'adresse cachée</li>
        <li>Utiliser un bureau virtuel ou une boîte postale comme adresse de vérification sans le divulguer</li>
      </ol>
      <p>
        La première compte pour la majorité des suspensions d'entrepreneurs que nous auditons. La solution n'est pas de trouver une astuce, c'est de consolider en un seul profil et de reconstruire les déclarations de zones de service correctement. La deuxième plus courante, c'est le problème de visibilité d'adresse, une correction d'un seul clic dans le tableau de bord GBP que plusieurs propriétaires ne font jamais.
      </p>

      <SectionDivider />

      <h2 id="un-deploiement-de-90-jours-pour-le-quebec">Un déploiement de 90 jours pour le Québec</h2>
      <p>
        Jours un à quinze, auditez le profil existant et consolidez les doublons. Masquez l'adresse municipale si elle est actuellement visible. Déclarez six à douze zones de service basées sur les douze derniers mois d'emplacements de chantiers. Ajoutez le numéro RBQ à la description d'entreprise sous la forme RBQ suivi du numéro de licence à huit chiffres.
      </p>
      <p>
        Jours seize à quarante-cinq, bâtissez les pages de destination bilingues pour les trois à cinq zones de service principales. Ajoutez le schéma LocalBusiness avec le numéro RBQ comme identifiant. Lancez une vérification de cohérence NAP sur les principaux annuaires canadiens : Pages Jaunes, 411.ca, Cylex, ProfileCanada et les annuaires spécialisés comme RBQ Constructo et HouzzPro pour le Québec. <InternalLink to="/audit/gbp" title="Outil d'audit GBP" description="Lancez l'audit GBP gratuit en 24 heures" /> couvre la liste de vérification complète.
      </p>
      <p>
        Jours quarante-six à quatre-vingt-dix, livrez des publications GBP hebdomadaires en EN et FR-CA, demandez des avis pour les douze derniers mois de chantiers complétés avec une cible d'un avis par dix chantiers, et téléversez des photos de chaque zone de service déclarée pour alimenter le signal de photo géolocalisée. Au jour quatre-vingt-dix, le profil affiche typiquement des améliorations de classement dans trois à cinq des zones de service déclarées, avec les premières citations AI Overview sur les requêtes d'entrepreneurs licenciés RBQ au Québec. Le <InternalLink to="/industries/contractors" title="Cahier de jeu pour entrepreneurs" description="Méthodologie SEO et AI Visibility pour entrepreneurs québécois" /> couvre chaque étape en détail prêt à exécuter.
      </p>

      <img
        src={meta.images.mid}
        alt="Carte de déclaration de zone de service GBP montrant six à douze villes québécoises adjacentes dans un rayon de deux heures de route"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier votre stratégie GBP par zone de service à travers le Québec? Doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Un GBP par entité légale. Jamais un par ville. Les doublons mènent à la suspension en trente à soixante jours.',
          'Déclarez six à douze zones de service basées sur les douze derniers mois de chantiers, pas toutes les villes accessibles en voiture.',
          "Masquez l'adresse municipale sur le profil public si vous n'y accueillez pas la clientèle.",
          'Affichez la licence RBQ dans la description, le pied de page, les soumissions et le schéma LocalBusiness.',
          'Bâtissez des pages de zones de service bilingues EN et FR-CA pour couvrir les deux surfaces de classement au Québec.',
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
        alt="Matrice de décision montrant un seul profil GBP avec plusieurs zones de service déclarées contre le motif de profil dupliqué suspendu"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
