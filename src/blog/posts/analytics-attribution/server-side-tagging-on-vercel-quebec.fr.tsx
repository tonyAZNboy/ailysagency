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
import { meta } from './server-side-tagging-on-vercel-quebec'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Marquage côté serveur sur Vercel, le montage économique au Québec',
  metaDescription:
    "Le montage le plus économique de marquage côté serveur sur Vercel pour un commerce local québécois. Vercel Functions plus un proxy Cloudflare Workers plus un endpoint GA4 Measurement Protocol, conforme à la Loi 25.",
  tldr: "Le montage le plus économique de marquage côté serveur sur Vercel jumelle une Vercel Function avec un proxy Cloudflare Workers et un seul endpoint GA4 Measurement Protocol. Pour un commerce local québécois à faible trafic, la facture mensuelle se situe entre zéro et vingt dollars. Le montage passe aussi le test du consentement explicite de la Loi 25, parce que la fonction ne se déclenche qu'après que la bannière de consentement retourne oui, et la couche Cloudflare Workers retire l'IP au bord du réseau avant qu'aucune charge utile n'atteigne GA4.",
  faqItems: [
    {
      question: 'Quelle est la façon la plus économique de faire du marquage côté serveur sur Vercel?',
      answer:
        "Une Vercel Function jumelée à un proxy Cloudflare Workers et à un seul endpoint GA4 Measurement Protocol. La fonction reçoit l'événement de page du navigateur, la couche Workers retire l'IP au bord du réseau et fait suivre une charge utile propre, et GA4 ingère via le Measurement Protocol. Pour un commerce local québécois sous les 100 000 événements mensuels, la facture reste dans la fourchette de zéro à vingt dollars, souvent gratuite sur les forfaits hobby de Vercel et Cloudflare.",
    },
    {
      question: 'Ce montage respecte-t-il la Loi 25 au Québec?',
      answer:
        "Oui, quand la bannière de consentement contrôle l'appel. La Loi 25 exige un consentement explicite avant tout marquage, y compris côté serveur. La Vercel Function ne devrait se déclencher qu'après que la bannière de consentement enregistre une valeur oui dans le localStorage ou dans un témoin. La couche Cloudflare Workers retire l'IP et le user agent au bord avant de faire suivre à GA4, ce qui aligne la charge utile avec le principe de minimisation de la Loi 25 même après le consentement.",
    },
    {
      question: 'Pourquoi utiliser Cloudflare Workers comme proxy au lieu d\'appeler GA4 directement?',
      answer:
        "Trois raisons. Premièrement, la couche Workers retire l'IP au bord pour que GA4 ne voie jamais une IP de résident québécois, ce qui est la posture Loi 25 la plus propre. Deuxièmement, le forfait gratuit Workers couvre 100 000 requêtes par jour, ce qui absorbe le volume d'événements complet de la plupart des commerces locaux gratuitement. Troisièmement, la couche Workers ajoute un endroit pour injecter du hachage personnalisé ou du sel pour user_pseudo_id sans changer le code Vercel, ce qui garde le pipeline d'analytique portable.",
    },
    {
      question: 'Combien ça coûte par mois pour un commerce local québécois?',
      answer:
        "Pour un commerce à un seul emplacement avec moins de 50 000 pages vues mensuelles, le coût type est zéro. Vercel Hobby couvre les invocations de fonctions, le forfait gratuit Cloudflare Workers couvre le proxy, GA4 Measurement Protocol est gratuit. Pour un commerce multi-emplacements avec 100 000 à 500 000 événements mensuels, la facture se situe entre dix et vingt dollars quand les Vercel Functions dépassent le forfait gratuit. Le premier seuil payant est le quota de secondes de fonction Vercel, pas le côté Cloudflare.",
    },
    {
      question: 'Puis-je rouler ça sans Cloudflare et seulement avec Vercel?',
      answer:
        "Oui, mais la posture Loi 25 est plus faible. Sans la couche Cloudflare Workers, la Vercel Function voit l'IP de l'utilisateur avant de faire suivre à GA4. Vous pouvez retirer l'IP dans la fonction avant l'appel Measurement Protocol, ce qui marche, mais ça concentre la logique de consentement et de vie privée dans un seul runtime. La couche Cloudflare ajoute une redondance que les audits lisent favorablement. Si le budget est zéro et le trafic faible, Vercel seul est acceptable. Si la posture d'audit compte, le montage à deux couches vaut le coût supplémentaire de zéro.",
    },
    {
      question: "Le marquage côté serveur aide-t-il à l'attribution du trafic IA?",
      answer:
        "Oui. Le marquage côté serveur est ce qui rend l'attribution du trafic IA stable, parce que le marquage côté client se fait bloquer par les bloqueurs de pubs, les modes de confidentialité des navigateurs et la part croissante du trafic ChatGPT et Perplexity qui arrive sans référent. L'endpoint côté serveur capte la visite même quand le marqueur côté client est bloqué, et la convention UTM jumelée au groupe de canaux GA4 lit le trafic IA correctement. Les deux schémas marchent ensemble, pas en compétition.",
    },
  ],
  headings: [
    { id: 'pourquoi-le-marquage-cote-serveur-compte', text: 'Pourquoi le marquage côté serveur compte maintenant au Québec' },
    { id: 'le-montage-economique-a-trois-pieces', text: 'Le montage économique à trois pièces, Vercel plus Cloudflare plus GA4' },
    { id: 'la-piece-vercel-function', text: 'La pièce Vercel Function, ce qu\'elle fait et pourquoi' },
    { id: 'le-proxy-cloudflare-workers', text: 'Le proxy Cloudflare Workers, la couche de vie privée' },
    { id: 'controle-de-consentement-loi-25', text: 'Contrôle de consentement Loi 25, le oui explicite avant tout appel' },
    { id: 'cout-mensuel-pour-un-commerce-local-quebecois', text: 'Coût mensuel pour un commerce local québécois, les chiffres réalistes' },
    { id: 'deployer-le-montage-en-un-apres-midi', text: 'Déployer le montage en un après-midi' },
    { id: 'pieges-courants-et-comment-les-eviter', text: 'Pièges courants et comment les éviter' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les commerçants locaux québécois posent la même question d'analytique chaque mois. Quelle est la façon la plus économique de faire du marquage côté serveur sur Vercel qui respecte quand même la Loi 25 et capte quand même le trafic IA que les bloqueurs de pubs retirent du côté client? La réponse honnête, c'est une pile à trois pièces : une Vercel Function pour l'endpoint d'événements, un proxy Cloudflare Workers pour la couche de vie privée, et un seul endpoint GA4 Measurement Protocol pour la destination. La facture mensuelle totale pour un commerce local à faible trafic se situe entre zéro et vingt dollars.
      </p>

      <StatHighlight
        stats={[
          { value: '0 à 20 $', label: 'Coût mensuel pour un commerce local québécois à faible trafic' },
          { value: '3 pièces', label: 'Vercel Function, Cloudflare Workers, GA4 Measurement Protocol' },
          { value: 'Loi 25', label: 'Consentement explicite requis avant tout déclenchement' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-le-marquage-cote-serveur-compte">Pourquoi le marquage côté serveur compte maintenant au Québec</h2>
      <p>
        Le marquage côté serveur compte maintenant pour deux raisons qui frappent les commerces locaux québécois plus fort que le reste du Canada. La première, c'est la Loi 25, la loi québécoise sur la vie privée qui exige un consentement explicite avant tout marquage, avec des amendes qui montent selon la taille de l'entreprise. La deuxième, c'est le trafic IA, la part de visites qui arrive de ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot. Le trafic IA arrive de plus en plus sans référent, et le marqueur côté client se fait de plus en plus bloquer par les navigateurs de confidentialité et les extensions. La combinaison brise l'analytique classique pour l'opérateur qui ne roule qu'un conteneur Google Tag Manager sur la page.
      </p>
      <p>
        Le marquage côté serveur répond aux deux problèmes avec un seul montage. L'endpoint vit sur un domaine que vous contrôlez, ce qui rend plus difficile pour les bloqueurs de pubs de le marquer. La posture de vie privée siège sur le serveur, ce qui rend les audits Loi 25 plus propres parce que l'état de consentement est appliqué avant tout transfert vers GA4. Le coût est faible parce que le volume d'événements pour un commerce local entre dans les forfaits gratuits de chaque composante de la pile.
      </p>
      <p>
        Le montage économique n'est pas un contournement. C'est le montage de production qu'AiLys recommande pour les commerçants locaux québécois sous les 500 000 événements mensuels. Au-dessus de ce seuil, les calculs changent et un conteneur Google Tag Manager côté serveur sur Cloud Run devient plus efficace. Sous ce seuil, Vercel plus Cloudflare gagne sur le coût, la simplicité et la posture Loi 25.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>L'entrée complète <InternalLink to="/glossary/ai-traffic" title="Trafic IA, entrée du glossaire" description="La définition AiLys pour l'attribution des clics de moteurs IA" /> couvre la règle de groupe de canaux et la liste d'hôtes référents qui se jumelle à cette pile côté serveur. Lisez les deux ensemble pour le tableau complet d'attribution.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez savoir si votre marquage actuel passe la Loi 25 et capte le trafic IA correctement? L'audit AI Visibility gratuit en 24 heures inclut maintenant une vérification de préparation côté serveur." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="le-montage-economique-a-trois-pieces">Le montage économique à trois pièces, Vercel plus Cloudflare plus GA4</h2>
      <p>
        Le montage a trois pièces, chacune avec un seul travail. La Vercel Function reçoit la charge utile d'événement du navigateur après que la bannière de consentement enregistre une valeur oui. Le proxy Cloudflare Workers retire l'IP et le user agent au bord du réseau, puis fait suivre une charge utile propre. L'endpoint GA4 Measurement Protocol ingère la charge utile comme un hit côté serveur, dédoublonné contre le hit côté client si le même événement s'est aussi déclenché par gtag.
      </p>
      <p>
        Le flux de données roule dans cet ordre. Le navigateur déclenche un fetch vers l'endpoint Vercel avec l'état de consentement, l'URL de la page, les paramètres UTM, le user_pseudo_id d'un témoin première partie et le nom d'événement. La Vercel Function valide le consentement, hache le user_pseudo_id avec un sel côté serveur et fait suivre la charge utile à l'endpoint Cloudflare Workers. Cloudflare Workers retire l'IP et le user agent, ajoute un secret API Measurement Protocol et fait suivre à GA4. GA4 ingère le hit avec le client_id et le user_pseudo_id intacts.
      </p>

      <h3>Les pièces dans un tableau</h3>
      <ul>
        <li>Vercel Function : reçoit l'événement du navigateur, valide le consentement, hache user_pseudo_id, fait suivre à Workers</li>
        <li>Cloudflare Workers : retire l'IP et le user agent au bord, ajoute le secret API, fait suivre à GA4 Measurement Protocol</li>
        <li>GA4 Measurement Protocol : ingère le hit côté serveur, dédoublonne contre le côté client si applicable</li>
        <li>Bannière de consentement : enregistre le oui ou non explicite Loi 25 dans le localStorage ou un témoin première partie avant tout appel</li>
        <li>Témoin première partie : tient user_pseudo_id pour l'attribution intersession, lié au domaine du site</li>
      </ul>

      <SectionDivider />

      <h2 id="la-piece-vercel-function">La pièce Vercel Function, ce qu'elle fait et pourquoi</h2>
      <p>
        La Vercel Function est le point d'entrée pour chaque événement côté serveur. La fonction vit à un chemin comme /api/track sur le même domaine que le site, ce qui rend plus difficile pour les bloqueurs de pubs de la marquer qu'un endpoint tiers. La fonction reçoit une requête POST avec la charge utile d'événement, valide l'état de consentement et fait suivre au proxy Cloudflare Workers.
      </p>
      <p>
        La fonction fait trois choses et rien d'autre. D'abord, elle vérifie l'en-tête de consentement pour la valeur oui explicite Loi 25. Si le consentement manque ou est non, la fonction retourne un 204 sans transfert. Ensuite, elle hache le user_pseudo_id avec un sel côté serveur, ce qui empêche la valeur brute du témoin d'atteindre GA4. Troisièmement, elle fait suivre la charge utile à l'endpoint Cloudflare Workers avec un appel fetch, avec un délai de cinq secondes pour échouer fermé si Workers est inatteignable.
      </p>
      <p>
        La fonction reste sous les 100 lignes de code, roule dans le Vercel Edge Runtime pour une faible latence et n'utilise aucune dépendance au-delà des Web APIs standards. Le forfait Hobby de Vercel couvre 100 000 invocations par mois, ce qui dépasse ce que la plupart des commerces québécois à un emplacement génèrent. Le forfait Pro étend le quota à 1 000 000 d'invocations par mois à 20 dollars total, ce qui couvre le cas multi-emplacements.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Ne journalisez pas la charge utile brute dans les journaux de fonction Vercel. Vercel garde les journaux pendant plusieurs jours et traiter la charge utile comme transitoire est une erreur de minimisation Loi 25. Soit vous journalisez seulement le nom d'événement et l'état de consentement, soit vous ne journalisez rien. La même chose s'applique aux journaux Cloudflare Workers. Vérifiez la politique de rétention des journaux de chaque couche de la pile et documentez-la pour le registre Loi 25.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="le-proxy-cloudflare-workers">Le proxy Cloudflare Workers, la couche de vie privée</h2>
      <p>
        Le proxy Cloudflare Workers siège entre la Vercel Function et l'endpoint GA4 Measurement Protocol. Le Worker retire l'IP et le user agent au bord du réseau, ajoute le secret API GA4 comme en-tête côté serveur et fait suivre une charge utile propre à GA4. Le forfait gratuit couvre 100 000 requêtes par jour, ce qui absorbe le volume d'événements complet de la plupart des commerces locaux sans dépense.
      </p>
      <p>
        Le code du Worker reste sous les 50 lignes et roule au bord Cloudflare, ce qui veut dire que la latence vers GA4 est dominée par le côté ingestion GA4, pas par le proxy. Le Worker est idempotent, sans état, et ne journalise que le nom d'événement et l'état de consentement. Le retrait d'IP arrive au bord avant que la charge utile soit transférée, ce qui veut dire que GA4 ne voit jamais d'IP de résident québécois venir de cette pile. Cette posture est ce qui rend l'audit Loi 25 propre.
      </p>
      <p>
        Le Worker sert aussi d'endroit pour injecter du hachage personnalisé ou de la rotation de sel pour user_pseudo_id sans redéployer le côté Vercel. Si l'équipe vie privée fait tourner le sel chaque trimestre, la rotation vit dans les variables d'environnement du Worker, pas dans le code de la fonction Vercel. Cette séparation garde le pipeline d'analytique portable à travers les déploiements Vercel, les mises à jour de cadriciel et les changements d'équipe.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Que fait principalement le proxy Cloudflare Workers dans cette pile de marquage côté serveur?"
        options={[
          'Il roule la bannière de consentement et enregistre la valeur oui Loi 25',
          'Il retire l\'IP et le user agent au bord avant de faire suivre à GA4',
          "Il remplace l'endpoint GA4 Measurement Protocol par une base de données analytique personnalisée",
          'Il réécrit les paramètres UTM pour fusionner les données multi-emplacements en une seule campagne',
        ]}
        correctIndex={1}
        explanation="La couche Workers retire l'IP et le user agent au bord avant de faire suivre la charge utile à GA4. Cette étape est ce qui rend la posture Loi 25 propre, parce que GA4 ne voit jamais d'IP de résident québécois venir de cette pile. Le contrôle de consentement arrive plus tôt dans la Vercel Function, l'endpoint Measurement Protocol reste tel quel, et les paramètres UTM passent inchangés."
      />

      <SectionDivider />

      <h2 id="controle-de-consentement-loi-25">Contrôle de consentement Loi 25, le oui explicite avant tout appel</h2>
      <p>
        La Loi 25 exige un consentement explicite avant tout déclenchement de marquage. La bannière de consentement doit offrir un choix oui ou non clair, sans option présélectionnée, et le résultat doit être enregistré d'une façon que la pile côté serveur peut lire. L'implémentation classique, c'est un témoin première partie ou une clé localStorage avec une valeur oui ou non plus un horodatage.
      </p>
      <p>
        La Vercel Function lit l'état de consentement depuis l'en-tête de la requête à chaque appel. Si la valeur manque ou est non, la fonction retourne un 204 sans transfert. Si la valeur est oui, la fonction continue avec le hachage et le transfert. La vérification est la barrière qui garde la pile entière conforme à la Loi 25. Sans cette vérification, chaque autre pièce de la pile est sans pertinence pour la posture d'audit.
      </p>
      <p>
        La bannière de consentement elle-même vit du côté client, mais l'application vit du côté serveur. Cette séparation est ce qui fait tenir le montage en audit. Un utilisateur qui efface le témoin perd le consentement. Un utilisateur qui clique non n'atteint jamais la Vercel Function. Un utilisateur qui clique oui déclenche la pile complète avec les identifiants hachés et l'IP retirée au bord. La piste d'audit est propre et lisible en 90 secondes pour un inspecteur Loi 25.
      </p>

      <img
        src={meta.images.mid}
        alt="Séquence de contrôle de consentement Loi 25 montrant l'état de la bannière enregistré dans un témoin première partie et lu par la Vercel Function avant tout appel à Cloudflare Workers"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="cout-mensuel-pour-un-commerce-local-quebecois">Coût mensuel pour un commerce local québécois, les chiffres réalistes</h2>
      <p>
        Le coût mensuel dépend du volume d'événements. Pour un commerce à un seul emplacement avec moins de 50 000 pages vues mensuelles, le coût type est zéro. Vercel Hobby couvre 100 000 invocations de fonction par mois gratuitement. Le forfait gratuit Cloudflare Workers couvre 100 000 requêtes par jour, soit 3 000 000 de requêtes par mois, plus que ce dont tout commerce à un seul emplacement a besoin. GA4 Measurement Protocol est gratuit à tout volume.
      </p>
      <p>
        Pour un commerce multi-emplacements avec 100 000 à 500 000 événements mensuels, le coût se situe entre dix et vingt dollars. Le premier seuil payant est le forfait Vercel Pro à 20 dollars par mois, qui étend les invocations de fonction à 1 000 000 par mois. Le forfait gratuit Cloudflare Workers absorbe encore la charge du proxy à ce volume. GA4 reste gratuit. Au-dessus de 500 000 événements mensuels, les calculs changent et un conteneur Google Tag Manager côté serveur sur Cloud Run devient plus efficace en coût.
      </p>
      <p>
        Le coût est dominé par les secondes de fonction Vercel, pas par Cloudflare. C'est l'inverse de ce que la plupart des opérateurs s'attendent, parce que le côté Cloudflare a l'air de la pièce poids lourd. En pratique, le Worker roule en millisecondes, la Vercel Function roule en dizaines de millisecondes, et le quota de secondes de fonction est ce qui pousse la facture dans le forfait payant en premier. Connaître cette distinction rend la décision de mise à niveau propre quand le moment vient.
      </p>

      <SectionDivider />

      <h2 id="deployer-le-montage-en-un-apres-midi">Déployer le montage en un après-midi</h2>
      <p>
        Le déploiement prend un après-midi pour un commerce local. D'abord, écrivez la Vercel Function à /api/track avec la vérification de consentement, l'étape de hachage et le fetch vers Cloudflare. Déployez avec vercel deploy et vérifiez l'endpoint avec une commande curl depuis un terminal. Ensuite, écrivez le Cloudflare Worker avec le retrait d'IP, l'injection du secret API et le transfert à GA4. Déployez avec wrangler deploy et vérifiez avec la même chaîne curl.
      </p>
      <p>
        Troisièmement, mettez à jour la bannière de consentement pour enregistrer le oui ou non explicite Loi 25 dans un témoin première partie ou dans le localStorage. Quatrièmement, mettez à jour le script côté client pour faire un fetch vers l'endpoint Vercel après que le oui de consentement soit enregistré, avec la charge utile d'événement, les paramètres UTM et le user_pseudo_id du témoin. Cinquièmement, vérifiez que la vue temps réel GA4 montre les hits côté serveur, avec le champ IP vide et les dimensions source et medium remplies correctement à partir des paramètres UTM.
      </p>
      <p>
        Pour la convention UTM qui se jumelle à ce montage, voyez le compagnon <InternalLink to="/blog/utm-strategy-multi-location-business" title="Stratégie UTM pour un commerce multi-emplacements" description="La convention UTM à trois champs avec l'identifiant d'emplacement dans utm_campaign" />. Les deux articles lus ensemble couvrent la pile d'attribution côté serveur complète pour un commerce local québécois à un ou plusieurs emplacements.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le moyen le plus rapide de vérifier le montage, c'est d'ouvrir la vue temps réel GA4, de déclencher un événement test depuis la console du navigateur avec une balise UTM connue, et de regarder l'événement atterrir dans GA4 en moins de cinq secondes avec le champ IP vide. Si l'IP s'affiche, le retrait Cloudflare Workers manque. Si les dimensions source et medium sont fausses, le transfert UTM manque. Si rien ne s'affiche, la barrière de consentement bloque l'appel. Trois vérifications, trois corrections, fini.</p>
      </CalloutBox>

      <InlineCTA variant="pricing" text="Vous voulez cette pile côté serveur livrée pour vous avec le doc d'audit Loi 25 inclus? Voyez les forfaits AiLys pour commerces locaux québécois." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="pieges-courants-et-comment-les-eviter">Pièges courants et comment les éviter</h2>
      <p>
        Piège un, journaliser la charge utile brute dans les journaux de fonction. Vercel et Cloudflare gardent tous deux les journaux pendant plusieurs jours, et traiter cette rétention comme transitoire brise la minimisation Loi 25. Journalisez seulement le nom d'événement et l'état de consentement, ou rien. Piège deux, oublier de hacher user_pseudo_id avant le transfert. La valeur brute du témoin ne devrait jamais atteindre GA4. Hachez avec un sel côté serveur que le client ne voit jamais.
      </p>
      <p>
        Piège trois, manquer la barrière de consentement sur la Vercel Function. Sans la barrière, la pile entière se déclenche peu importe l'état de la bannière, ce qui échoue l'audit Loi 25 à la première inspection. Piège quatre, coder en dur le secret API GA4 dans le code du Worker au lieu d'utiliser des variables d'environnement. Le secret devrait tourner sur un horaire, et la rotation dans le code exige un redéploiement qui met le pipeline d'analytique hors ligne. Utilisez les secrets Wrangler et le gestionnaire de secrets du tableau de bord Cloudflare.
      </p>
      <p>
        Piège cinq, sauter le retrait d'IP au bord Cloudflare et le faire à l'intérieur de la Vercel Function à la place. Les deux marchent pour la Loi 25 dans l'esprit, mais la posture d'audit est plus propre quand l'IP n'atteint jamais la Vercel Function dans une charge utile transférée. La couche Cloudflare est l'endroit le moins cher pour faire le retrait, et la redondance des deux couches lit bien dans une inspection. Pour une base de comment AiLys configure le marquage côté serveur pour les clients québécois, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit 24 heures" description="Inclut la vérification de préparation au marquage côté serveur et la révision de la posture Loi 25" /> et révisez le livrable avant de signer quoi que ce soit.
      </p>

      <InlineCTA variant="book" text="Vous voulez une visite guidée de 60 minutes de votre pile de marquage actuelle avec une révision Loi 25? Doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Le montage de marquage côté serveur le plus économique sur Vercel, c\'est une Vercel Function plus un proxy Cloudflare Workers plus le GA4 Measurement Protocol.',
          'Le coût mensuel pour un commerce local québécois sous les 500 000 événements mensuels se situe entre zéro et vingt dollars.',
          'Le consentement explicite Loi 25 doit contrôler l\'appel à la Vercel Function. Pas de oui, pas de transfert, pas d\'exception.',
          "Cloudflare Workers retire l'IP et le user agent au bord avant de faire suivre à GA4, ce qui garde la posture d'audit Loi 25 propre.",
          'Hachez user_pseudo_id avec un sel côté serveur avant le transfert. La valeur brute du témoin ne devrait jamais atteindre GA4.',
          'Jumelez la pile côté serveur avec la convention UTM et le groupe de canaux GA4 AI Engines pour capter le trafic IA correctement.',
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
        alt="Carte récapitulative montrant les paliers de coût du marquage côté serveur pour un commerce local québécois et la liste de vérification d'audit Loi 25"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
