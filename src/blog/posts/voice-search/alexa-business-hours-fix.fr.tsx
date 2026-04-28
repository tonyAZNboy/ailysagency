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
import { meta } from './alexa-business-hours-fix'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Pourquoi Alexa donne les mauvaises heures de mon entreprise, et comment corriger",
  metaDescription:
    "Alexa tire les heures d'ouverture de Yelp et Yext, pas de Google Business Profile. Voici la marche à suivre exacte pour les propriétaires québécois, en français et en anglais.",
  tldr: "Alexa ne lit pas Google Business Profile pour les heures d'ouverture. Amazon licencie ses données auprès de Yelp et Yext, plus quelques flux secondaires, et superpose les métadonnées des Skills Alexa. Pour corriger les mauvaises heures, réclamez votre fiche Yelp, synchronisez les heures, réclamez Yext (parfois payant), puis soumettez une mise à jour Alexa Local Listing. Au Québec, il faut aussi vérifier la requête en anglais et en français parce que les clients alternent entre les deux.",
  faqItems: [
    {
      question: "Pourquoi Alexa donne-t-il les mauvaises heures de mon entreprise?",
      answer:
        "Alexa ne tire pas les heures de Google Business Profile. Amazon licencie les données locales chez Yelp et Yext comme flux principaux, plus un petit panier de partenaires secondaires. Si votre fiche Yelp affiche encore les heures d'avant la rénovation, ou si votre fiche Yext n'a jamais été réclamée, Alexa lit la valeur périmée. La correction consiste à réclamer et synchroniser les deux flux, puis à soumettre une mise à jour Alexa Local Listing pour que le changement se propage en moins de deux semaines.",
    },
    {
      question: "Alexa utilise-t-il les données de Google Business Profile?",
      answer:
        "Non, pas directement. Alexa s'appuie sur Yelp et Yext comme sources principales, puis enrichit avec les métadonnées des Skills Alexa quand un Skill est publié. Google Business Profile est excellent pour Maps et la recherche, mais Amazon ne licencie pas les données Google. C'est pour ça qu'une clinique avec des heures GBP parfaites peut quand même entendre Alexa réciter l'horaire d'hier. Les deux écosystèmes ne partagent pas de flux.",
    },
    {
      question: "Combien de temps Alexa met-il à mettre à jour mes heures après que je corrige Yelp?",
      answer:
        "Yelp pousse les données structurées vers Alexa à une cadence de rafraîchissement de 7 à 14 jours. Yext peut pousser plus vite, parfois en 48 heures, quand le palier payant Yext Listings est actif. La correction la plus rapide qu'on mesure chez nos clients québécois est de 9 jours entre la réclamation Yelp et la lecture des bonnes heures par Alexa. Les cas les plus lents traînent au-delà d'un mois quand seul le pied de page du site est mis à jour et que les flux tiers ne reçoivent jamais la correction.",
    },
    {
      question: "Les propriétaires québécois ont-ils besoin d'une configuration Alexa bilingue?",
      answer:
        "Oui. Les clients au Québec interrogent Alexa en anglais et en français, surtout à Montréal, Laval et Gatineau. Alexa prend en charge le français canadien comme langue principale depuis fin 2024. Refaites la même requête sur les heures et les services dans les deux langues après chaque correction pour confirmer que la réponse est juste partout. Un écart bilingue est une perte silencieuse parce qu'Alexa va simplement ignorer la requête plutôt que de deviner.",
    },
    {
      question: "Quand vaut-il la peine de payer pour Yext plutôt que de réclamer les fiches manuellement?",
      answer:
        "Yext Listings coûte environ 199 à 999 dollars CAD par emplacement par année selon le palier. Payez-le quand vous avez plusieurs emplacements, des changements d'heures fréquents (saisonniers ou jours fériés), ou quand vous avez déjà perdu quelques semaines à courir après les réclamations manuelles. Pour une clinique à un seul emplacement avec des heures stables, la réclamation gratuite Yelp plus une soumission manuelle Alexa Local Listing donne le même résultat en trois semaines à coût zéro.",
    },
  ],
  headings: [
    { id: 'pourquoi-alexa-se-trompe', text: "Pourquoi Alexa se trompe d'heures au départ" },
    { id: 'le-pipeline-yelp-yext-alexa', text: 'Le pipeline de données, de Yelp et Yext vers Alexa' },
    { id: 'reclamer-et-corriger-yelp', text: 'Réclamer et corriger Yelp en premier, le levier le plus fort' },
    { id: 'reclamer-yext-et-decider-paye', text: 'Réclamer Yext et décider du palier payant' },
    { id: 'soumettre-mise-a-jour-alexa', text: 'Soumettre une mise à jour Alexa Local Listing pour accélérer' },
    { id: 'couverture-bilingue-quebec', text: 'Couverture bilingue au Québec, le test EN et FR' },
    { id: 'plan-30-jours-alexa-quebec', text: "Un plan de 30 jours pour nettoyer Alexa pour un propriétaire québécois" },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Alexa qui annonce les mauvaises heures d'ouverture est l'une des défaillances de recherche vocale les plus frustrantes pour un propriétaire local. Les clients arrivent devant une clinique fermée à 8 h parce qu'Alexa a dit que vous ouvriez à 7 h. La cause n'est presque jamais Google Business Profile. Amazon ne licencie pas les données Google. Alexa tire ses heures de Yelp et Yext comme flux principaux, avec les métadonnées des Skills Alexa par-dessus quand un Skill est publié. Ce guide trace la marche à suivre exacte, les vérifications bilingues nécessaires au Québec, et le plan de 30 jours qui rend la réponse correcte en anglais et en français.
      </p>

      <StatHighlight
        stats={[
          { value: '7-14 j', label: 'Cadence de rafraîchissement Yelp vers Alexa' },
          { value: '~48 h', label: 'Vitesse de poussée Yext sur le palier payant' },
          { value: 'EN + FR', label: 'Couverture des requêtes québécoises requise pour Alexa' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-alexa-se-trompe">Pourquoi Alexa se trompe d'heures au départ</h2>
      <p>
        Alexa fonctionne sur une couche de données locales différente de Google Maps ou Apple Maps. Amazon n'exploite pas de produit Maps, donc il ne maintient pas son propre index local. Alexa licencie plutôt les données d'entreprise auprès de Yelp et Yext, avec des flux plus petits de Foursquare et de partenaires sous licence pour combler les trous par catégorie. Quand un client demande à un Echo vos heures, Alexa interroge cet index sous licence en premier, lit la valeur trouvée, et n'enrichit avec un Skill Alexa que si vous en avez publié un.
      </p>
      <p>
        Cette architecture crée un mode d'échec familier. Vous mettez à jour Google Business Profile après une rénovation. Le pied de page du site suit le lendemain. La fiche Yelp, jamais réclamée par l'ancien propriétaire, indique encore 7 h à 21 h parce que c'était l'horaire il y a trois ans. Alexa lit la valeur Yelp, pas la valeur GBP, et vous l'apprenez seulement quand un client laisse une étoile parce que la porte était fermée alors qu'Alexa promettait l'inverse.
      </p>
      <p>
        La correction est mécanique, pas mystérieuse. Réclamer Yelp. Synchroniser les heures. Réclamer Yext. Décider si le palier payant Listings vaut la dépense. Soumettre une mise à jour Alexa Local Listing pour accélérer la propagation. Refaire les tests bilingues. Puis auditer le mois suivant parce que les heures saisonnières et les jours fériés font dériver les données si personne ne surveille les flux.
      </p>

      <CalloutBox type="info" translatedLabel="Bon à savoir">
        <p>Le signal le plus rapide que votre problème d'heures Alexa est un problème Yelp est de poser la même question à Siri tout de suite après. Si Siri lit les bonnes heures et qu'Alexa lit les mauvaises, l'écart vient presque toujours de Yelp parce que Siri s'appuie sur Apple Maps Connect et Alexa s'appuie sur Yelp. Même adresse, deux flux différents.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit gratuit en 24 heures qui teste Alexa, Siri et Google Assistant sur la même requête d'heures en EN et FR? Lancez l'audit vocal AiLys." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="le-pipeline-yelp-yext-alexa">Le pipeline de données, de Yelp et Yext vers Alexa</h2>
      <p>
        Yelp est le plus grand flux sous licence pour les réponses locales d'Alexa. Le partenariat Yelp Fusion alimente le nom d'entreprise, l'adresse, les heures, les catégories et les agrégats d'avis dans l'index Alexa à un rythme que nous mesurons à 7 à 14 jours. Yext est en parallèle un réseau de fiches structurées qui pousse vers Alexa, Bing Places, Apple Maps et environ 60 autres surfaces en aval. Une fiche Yext réclamée peut mettre à jour Alexa en moins de 48 heures quand le palier payant Listings est actif.
      </p>
      <p>
        Les métadonnées des Skills Alexa s'ajoutent au-dessus. Si vous avez publié un Skill Alexa pour votre entreprise, le manifeste du Skill peut déclarer des heures, des services et un numéro de téléphone qui surchargent les flux sous licence pour les invocations spécifiques au Skill. La plupart des propriétaires locaux n'ont pas besoin d'un Skill juste pour les heures, les flux sous licence font le travail. Les Skills deviennent utiles pour un parcours vocal personnalisé comme la prise de rendez-vous, la commande au menu ou la confirmation de visite.
      </p>
      <p>
        La hiérarchie au moment de la requête est à peu près : métadonnées de Skill en premier si un Skill est publié et correspond à la requête, flux Yext en deuxième quand la fiche est vérifiée, flux Yelp en troisième pour la grande masse sous licence, puis un repli sur des données récupérées du web pour les entreprises qui n'ont rien fait de tout cela. Monter dans la hiérarchie est tout l'enjeu de la marche à suivre ci-dessous.
      </p>

      <SectionDivider />

      <h2 id="reclamer-et-corriger-yelp">Réclamer et corriger Yelp en premier, le levier le plus fort</h2>
      <p>
        Yelp est gratuit à réclamer et le changement se propage en aval vers Alexa en deux semaines. Allez sur biz.yelp.com, cherchez l'entreprise et lancez la réclamation. La vérification se fait par rappel téléphonique ou courriel à l'adresse listée. Une fois vérifié, mettez à jour les heures, les heures spéciales pour les fériés, les services, les photos et la courte description bilingue. Les propriétaires québécois devraient écrire la description en français et ajouter une variante anglaise dans le même champ quand Yelp le permet.
      </p>
      <p>
        L'étape non évidente est le champ des heures spéciales. Alexa lit les heures spéciales quand la date correspond, ce qui est exactement ce que vous voulez pour Noël, la Saint-Jean-Baptiste, l'Action de grâce et toute fermeture planifiée. La plupart des cliniques ne remplissent jamais les heures spéciales, alors le 24 juin Alexa lit l'horaire normal du mercredi et les clients arrivent devant une porte fermée. Inscrivez chaque jour férié des douze prochains mois en une seule séance après la réclamation.
      </p>

      <h3>La liste de vérification de la réclamation Yelp</h3>
      <ul>
        <li>Vérifier la propriété par rappel ou courriel</li>
        <li>Synchroniser les heures normales avec le pied de page du site et GBP exactement</li>
        <li>Remplir les heures spéciales pour les douze prochains mois de fériés et fermetures</li>
        <li>Ajouter une courte description bilingue EN et FR si la clientèle est bilingue</li>
        <li>Téléverser au moins trois photos extérieures et intérieures pour confirmer l'identité du lieu</li>
        <li>Régler les catégories principale et secondaire qui existent dans la taxonomie Yelp</li>
      </ul>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>Si vous ne trouvez pas votre entreprise sur Yelp pendant la réclamation, ne créez pas de doublon. Cherchez d'abord par numéro de téléphone, puis par anciens noms d'entreprise s'il y a eu un changement de marque. Les fiches en double sur Yelp divisent le flux de données vers Alexa et créent exactement le genre de problème d'heures périmées que vous essayez de corriger.</p>
      </CalloutBox>

      <InternalLink
        to="/glossary/voice-search"
        title="Glossaire de la recherche vocale"
        description="Définitions claires pour Alexa, Siri, Yelp Fusion, Yext et le reste du vocabulaire du classement vocal."
      />

      <SectionDivider />

      <h2 id="reclamer-yext-et-decider-paye">Réclamer Yext et décider du palier payant</h2>
      <p>
        Yext est le second flux qu'Alexa lit. Le produit Yext Listings est un palier payant qui pousse une seule source de vérité vers Alexa, Bing Places, Apple Maps, Foursquare et le reste du réseau en parallèle. Le prix se situe environ entre 199 et 999 dollars CAD par emplacement par année selon le forfait, le nombre de champs gérés et le niveau de soutien. La réclamation Yext gratuite vous donne quand même une fiche, mais ne pousse pas vers Alexa aussi vite et limite le nombre de champs sous votre contrôle.
      </p>
      <p>
        Pour une clinique à un seul emplacement avec des heures stables, la réclamation gratuite Yelp plus une soumission manuelle Alexa Local Listing livre les bonnes heures en trois semaines à coût zéro. Yext Listings vaut la dépense quand vous avez deux emplacements ou plus, des heures saisonnières fréquentes, ou un changement de nom de marque en cours. Le calcul sur un groupe dentaire de 5 cliniques avec Yext à 499 dollars par emplacement, c'est environ 2 495 dollars par année, récupérés la première fois qu'une fermeture du samedi n'envoie pas un client se buter à une porte verrouillée.
      </p>

      <QuickQuiz
        translatedLabel="Vérif rapide"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Votre Echo lit les mauvaises heures d'ouverture pour votre clinique. Vous avez déjà mis à jour Google Business Profile la semaine dernière. Quelle est la correction unique la plus rapide pour qu'Alexa soit juste?"
        options={[
          'Mettre à jour le pied de page du site une fois de plus',
          "Ouvrir un billet de soutien chez Google",
          'Réclamer et mettre à jour la fiche Yelp, puis soumettre une mise à jour Alexa Local Listing',
          "Redémarrer l'Echo et reposer la question",
        ]}
        correctIndex={2}
        explanation="Alexa licencie ses données locales chez Yelp et Yext, pas chez Google. Mettre à jour GBP ne se propage pas vers Alexa. Réclamer Yelp, synchroniser les heures et soumettre une mise à jour Alexa Local Listing est la marche à suivre canonique. Yelp pousse vers Alexa en 7 à 14 jours et la soumission manuelle peut raccourcir ce délai."
      />

      <SectionDivider />

      <h2 id="soumettre-mise-a-jour-alexa">Soumettre une mise à jour Alexa Local Listing pour accélérer</h2>
      <p>
        Amazon offre un parcours de soumission manuel sur developer.amazon.com sous les outils Alexa Local Listings. Le parcours permet de soumettre directement à l'équipe Alexa des heures corrigées, l'adresse, le téléphone et la catégorie, ce qui accélère la propagation au-delà de la cadence de rafraîchissement Yelp standard. La soumission est gratuite et est généralement traitée en 5 à 10 jours ouvrables quand les pièces justificatives sont propres.
      </p>
      <p>
        Envoyez trois pièces justificatives avec la soumission. Une capture d'écran de la fiche Yelp corrigée montrant les nouvelles heures, la capture correspondante du pied de page du site, et une photo récente de l'enseigne extérieure avec les mêmes heures affichées. Les modérateurs Alexa rejettent les soumissions sans preuve concordante entre les surfaces, parce qu'ils sont prudents sur les réponses vocales de la même façon qu'Apple est prudent avec les réponses parlées de Siri.
      </p>

      <img
        src={meta.images.mid}
        alt="Schéma du pipeline de données locales d'Alexa montrant Yelp, Yext et les Skills Alexa comme les trois flux d'entrée"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Si vous gérez une marque multi-emplacements, ne soumettez pas une seule mise à jour Local Listing pour tous les emplacements à la fois. Soumettez-en une par emplacement avec des preuves spécifiques. Les soumissions groupées sont systématiquement rejetées parce qu'Amazon ne peut pas faire correspondre un seul numéro de téléphone ou une seule adresse à plusieurs emplacements, et le rejet retarde toute la fournée de deux semaines de plus.</p>
      </CalloutBox>

      <InlineCTA variant="book" text="Vous voulez un tour guidé de 30 minutes de la marche à suivre Alexa sur vos fiches précises? Réservez un appel stratégique, sans pitch, le playbook reste à vous." buttonText="Réserver un appel" />

      <SectionDivider />

      <h2 id="couverture-bilingue-quebec">Couverture bilingue au Québec, le test EN et FR</h2>
      <p>
        Alexa prend en charge le français canadien comme langue principale depuis la fin de 2024. Les clients à Montréal, Laval, Gatineau et Québec alternent entre les requêtes EN et FR selon la configuration de la maison, parfois dans le même foyer. Après chaque correction Yelp ou Yext, refaites la même requête de test dans les deux langues. Demandez « Alexa, what time does <span lang="en">[nom de l'entreprise]</span> open? » en anglais, puis demandez « Alexa, à quelle heure ouvre <span lang="fr">[nom de l'entreprise]</span>? » en français.
      </p>
      <p>
        Les deux réponses devraient correspondre. Si seule la réponse anglaise est juste, les métadonnées bilingues sur la fiche Yelp ou Yext sont incomplètes. Si les deux réponses sont fausses, le flux sous-jacent ne s'est pas encore rafraîchi et il faut attendre la pleine cadence Yelp avant de soumettre une mise à jour Local Listing. Si seule la réponse française est fausse, vérifiez la description Yelp pour les accents et les apostrophes qu'Alexa interprète mal quand ils sont saisis en ASCII droit.
      </p>

      <CalloutBox type="tip" translatedLabel="Truc d'opérateur">
        <p>L'écart bilingue le plus rapide qu'on ferme dans nos audits québécois, c'est le champ des heures spéciales sur Yelp. Les propriétaires le remplissent en anglais seulement, et Alexa retombe silencieusement aux heures normales quand le client demande en français un jour férié. Remplir les heures spéciales avec des étiquettes FR-CA en plus des EN ferme l'écart bilingue en un seul cycle de rafraîchissement.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="plan-30-jours-alexa-quebec">Un plan de 30 jours pour nettoyer Alexa pour un propriétaire québécois</h2>
      <p>
        Jours 1 à 5, réclamez et remplissez complètement la fiche Yelp. Vérifiez par rappel téléphonique, synchronisez les heures normales, remplissez les heures spéciales pour les douze prochains mois, ajoutez les descriptions EN et FR, téléversez les photos extérieures et intérieures. Jours 6 à 10, réclamez Yext et décidez si le palier payant Listings convient au nombre d'emplacements et à la volatilité saisonnière de vos heures. Jours 11 à 15, soumettez la mise à jour Alexa Local Listing avec trois pièces justificatives concordantes par emplacement.
      </p>
      <p>
        Jours 16 à 25, exécutez les tests vocaux bilingues depuis un Echo propre dans trois pièces différentes ou un appareil emprunté hors du cabinet. Notez toute réponse qui contredit la source de vérité corrigée. Jours 26 à 30, auditez toute la pile une dernière fois. Confirmez que la fiche Yelp, la fiche Yext, le Google Business Profile et le pied de page du site affichent des heures identiques, puis planifiez un audit récurrent trimestriel pour que la dérive saisonnière n'annule pas la correction en silence.
      </p>
      <p>
        La plupart des propriétaires qui suivent ce plan entendent les bonnes heures Alexa en trois semaines. Les cas lents sont généralement des fiches Yelp en double que le propriétaire ignorait, ou une réclamation gratuite Yext qui n'a jamais poussé parce qu'un champ clé a échoué la validation. Un programme géré comme le module de fiches vocales AiLys exécute l'audit chaque semaine et livre les corrections bilingues dans le même contrat. Voyez la page <InternalLink to="/industries" title="playbooks pour cliniques" /> pour la version dentaire de ce plan, ou l'<InternalLink to="/audit" title="audit AI Visibility gratuit en 24 heures" /> pour voir quelles fiches vocales fuient en ce moment.
      </p>

      <InlineCTA variant="pricing" text="Besoin d'un programme géré qui livre la réclamation Yelp, la poussée Yext et le moniteur bilingue Alexa? Voyez les forfaits AiLys pour entreprises locales." buttonText="Voir les forfaits" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Alexa ne lit pas Google Business Profile. Les flux sous licence sont Yelp et Yext.',
          "Réclamez Yelp en premier, synchronisez les heures normales et spéciales, et Yelp pousse vers Alexa en 7 à 14 jours.",
          "Yext Listings est payant, plus rapide (environ 48 heures), et vaut la dépense pour le multi-emplacements ou le saisonnier.",
          "Soumettez une mise à jour Alexa Local Listing avec preuves concordantes pour raccourcir la propagation.",
          "Les propriétaires québécois doivent refaire la même requête en EN et en FR après chaque correction pour confirmer la couverture bilingue.",
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
        alt="Propriétaire consultant les tableaux de bord Yelp, Yext et Alexa Local Listings côte à côte après une synchronisation des heures réussie"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
