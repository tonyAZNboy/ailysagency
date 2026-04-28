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
import { meta } from './utm-strategy-multi-location-business'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "Stratégie UTM pour un commerce multi-emplacements, la convention qui tient",
  metaDescription:
    "La convention UTM qui fonctionne pour les commerces locaux multi-emplacements. utm_source pour le moteur IA, utm_medium pour la surface, utm_campaign pour l'identifiant d'emplacement. Configurable en un après-midi.",
  tldr: "Un commerce multi-emplacements a besoin d'une convention UTM qui survit aux changements d'emplacements et au trafic des moteurs IA. Le schéma qui marche : utm_source=ai (ou chatgpt, perplexity, claude, gemini, googleaio, bingcopilot), utm_medium=chat ou search ou aio, et utm_campaign égal à l'identifiant d'emplacement. Documentez-le une fois, appliquez-le sur chaque lien que vous publiez, et le tableau de bord GA4 lit la performance par emplacement et le trafic IA dans la même vue.",
  faqItems: [
    {
      question: "Quelle convention UTM marche le mieux pour un commerce multi-emplacements?",
      answer:
        "Utilisez utm_source pour l'origine du trafic (ai, chatgpt, perplexity, claude, gemini, googleaio, bingcopilot ou le nom du canal pour les sources non IA), utm_medium pour la surface (chat, search, aio, social, email), et utm_campaign pour l'identifiant d'emplacement (montreal-centre-ville, laval, quebec). Cette convention survit aux changements d'emplacements parce que le champ campagne reste stable par emplacement, et elle s'aligne sur le groupe de canaux trafic IA dont GA4 a besoin pour séparer les clics IA du Direct.",
    },
    {
      question: "Pourquoi utm_campaign tient-il l'identifiant d'emplacement et pas le nom de campagne?",
      answer:
        "Parce que l'emplacement est la dimension qui change le calcul de conversion, pas le nom de campagne. Un commerce multi-emplacements doit savoir quelle succursale a gagné le clic, l'appel et la réservation. Mettre l'identifiant d'emplacement dans utm_campaign permet à GA4 de regrouper chaque clic vers une succursale précise sur tous les canaux et tous les moteurs IA. Le nom de campagne classique va dans utm_content ou un paramètre personnalisé, où le volume est plus bas et la segmentation est secondaire.",
    },
    {
      question: "Devrais-je utiliser un utm_source différent par moteur IA ou une seule valeur partagée?",
      answer:
        "Les deux. Utilisez un utm_source=ai partagé pour les rapports de haut niveau qui comparent le trafic IA aux autres canaux, puis ajoutez des valeurs utm_source granulaires par moteur pour la vue d'analyse fine. La plupart des commerçants opèrent une source stable par moteur : utm_source=chatgpt, utm_source=perplexity, utm_source=claude, utm_source=gemini, utm_source=googleaio, utm_source=bingcopilot. Le seau ai agrégé est un canal dérivé, pas une convention UTM séparée.",
    },
    {
      question: "Comment marquer les liens dans les citations ChatGPT ou Perplexity?",
      answer:
        "Vous ne pouvez pas marquer les liens que vous ne contrôlez pas directement. La façon de capter le trafic des moteurs IA est de marquer en UTM les liens dans le contenu que les moteurs IA citent, alors quand un moteur fait surgir votre page ou votre citation, le clic qui arrive porte vos balises. Jumelez ça avec le groupe de canaux GA4 qui capte les hôtes des moteurs IA comme repli référent. La combinaison capte à la fois les clics balisés et préservés et les clics non balisés mais lisibles par référent.",
    },
    {
      question: "Comment déployer une convention UTM sur 10 emplacements sans rien casser?",
      answer:
        "Documentez la convention dans un seul tableur, partagez-le avec l'équipe la même semaine, bâtissez une bibliothèque UTM avec les liens prébalisés par emplacement, et posez une étiquette de redirection sur chaque lien court pour que les différences de casse ne fragmentent pas les données. Vérifiez les dimensions source et medium GA4 une semaine après le lancement pour confirmer que les valeurs sont propres. La plupart des déploiements multi-emplacements prennent un après-midi pour la configuration et une semaine pour la validation.",
    },
    {
      question: "Google Tag Manager interfère-t-il avec le passage d'UTM pour le trafic IA?",
      answer:
        "Pas quand il est bien configuré. GTM ne supprime pas les UTM par défaut. L'interférence vient des étiquettes de redirection personnalisées ou des scripts tiers qui réécrivent l'URL avant que GA4 ingère le hit. Vérifiez le conteneur GTM pour toute étiquette de redirection ou réécriture, documentez l'ordre d'exécution, et assurez-vous que les UTM passent jusqu'à l'événement page_view. L'erreur classique, c'est une étiquette de redirection qui se déclenche avant l'étiquette analytique et fait tomber les paramètres.",
    },
  ],
  headings: [
    { id: 'pourquoi-multi-emplacements-a-son-cadre-utm', text: 'Pourquoi multi-emplacements a son propre cadre UTM' },
    { id: 'la-convention-a-trois-champs', text: 'La convention à trois champs : source, medium, campagne' },
    { id: 'utm-source-le-moteur-ia-et-le-canal', text: 'utm_source, le moteur IA et le canal' },
    { id: 'utm-medium-la-surface-pas-le-format', text: 'utm_medium, la surface et pas le format' },
    { id: 'utm-campaign-l-identifiant-d-emplacement', text: "utm_campaign, l'identifiant d'emplacement et pourquoi il ne change jamais" },
    { id: 'deployer-la-convention-sur-les-emplacements', text: 'Déployer la convention sur les emplacements' },
    { id: 'erreurs-courantes-et-comment-les-eviter', text: 'Erreurs courantes et comment les éviter' },
    { id: 'lire-le-rapport-ga4-apres-le-lancement', text: 'Lire le rapport GA4 après le lancement' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Un commerce multi-emplacements a un problème UTM que les opérateurs à un seul emplacement ne rencontrent jamais. La convention nom-de-campagne-comme-utm qui marche pour une seule succursale s'effondre quand dix emplacements roulent la même campagne avec des taux de conversion différents par succursale. La solution, c'est une convention UTM bâtie sur trois champs : utm_source pour le moteur IA ou l'origine du canal, utm_medium pour la surface (chat, search, aio), et utm_campaign pour l'identifiant d'emplacement. Documentez-la une fois, appliquez-la sur chaque lien, et le tableau de bord GA4 lit la performance par emplacement et le trafic IA dans la même vue.
      </p>

      <StatHighlight
        stats={[
          { value: '3 champs', label: 'Source, medium, campagne pour la convention' },
          { value: '1 après-midi', label: 'Temps de déploiement type sur les emplacements' },
          { value: '1 semaine', label: 'Fenêtre de validation dans GA4 après lancement' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-multi-emplacements-a-son-cadre-utm">Pourquoi multi-emplacements a son propre cadre UTM</h2>
      <p>
        Un commerce à un seul emplacement utilise UTM pour attribuer la campagne qui a généré la conversion. Le schéma classique ressemble à utm_source=facebook, utm_medium=cpc, utm_campaign=vente-printemps. Pour un seul emplacement, ça suffit. Les données arrivent dans GA4, le rapport campagne montre la vente du printemps, l'opérateur décide s'il renouvelle la dépense.
      </p>
      <p>
        Un commerce multi-emplacements brise ce schéma dès la première semaine. Dix emplacements roulent la même vente du printemps, mais seulement trois convertissent au taux qui justifie la dépense. Le propriétaire doit voir quelle succursale a gagné le clic, l'appel et la réservation, pas juste quelle campagne a généré le trafic. Le nom de campagne ne porte pas cette information, et le forcer à faire double emploi (utm_campaign=vente-printemps-laval) rend les données bruyantes et difficiles à agréger.
      </p>
      <p>
        Le schéma plus propre, c'est de retourner l'attribution. Mettez l'identifiant d'emplacement dans utm_campaign comme segmentation principale. Mettez le nom de campagne dans utm_content où il vit sans polluer la dimension d'en-tête. Mettez le canal et la surface dans utm_source et utm_medium où ils appartiennent toujours. Le résultat, c'est une vue GA4 qui montre la performance par emplacement directement, et un rapport campagne qui agrège correctement sur les succursales.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>L'identifiant d'emplacement doit être une chaîne stable, pas une étiquette qui pourrait changer. Utilisez un schéma slug comme montreal-centre-ville, laval-centre, quebec-saint-roch. Les chaînes stables survivent aux changements de marque, aux renumérotations de succursales et au nettoyage de fautes. Les étiquettes qui ressemblent à des noms d'affichage brisent l'analytique chaque fois que l'équipe marketing reformule le site.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit UTM sur votre configuration multi-emplacements actuelle? L'audit AI Visibility gratuit en 24 heures inclut maintenant une vérification UTM et de groupe de canaux." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="la-convention-a-trois-champs">La convention à trois champs : source, medium, campagne</h2>
      <p>
        La convention a trois champs qui tiennent trois réponses. utm_source répond d'où vient le clic. utm_medium répond de quel type de surface vient le clic. utm_campaign répond quel est l'emplacement de destination. Les quatrième et cinquième champs UTM, utm_content et utm_term, tiennent le nom de campagne et la variante de mot-clé quand ça compte, mais ils ne font pas partie de la convention principale.
      </p>
      <p>
        Pour le trafic IA, la convention s'adapte proprement. utm_source porte le nom du moteur IA, utm_medium porte la surface (chat pour ChatGPT, search pour Perplexity, aio pour Google AIO), et utm_campaign porte toujours l'identifiant d'emplacement. Le seau ai agrégé est un canal dérivé dans GA4, calculé sur une regex sur les valeurs utm_source, pas une convention UTM séparée.
      </p>

      <h3>La convention en un tableau</h3>
      <ul>
        <li>Valeurs utm_source : ai, chatgpt, perplexity, claude, gemini, googleaio, bingcopilot, google, facebook, instagram, email, partner</li>
        <li>Valeurs utm_medium : chat, search, aio, organic, cpc, social, email, referral, qr</li>
        <li>Valeurs utm_campaign : identifiants d'emplacement seulement (montreal-centre-ville, laval, quebec, sherbrooke, gatineau)</li>
        <li>Valeurs utm_content : nom de campagne optionnel (vente-printemps, promo-ete, fetes-2026)</li>
        <li>Valeurs utm_term : variante de mot-clé optionnelle (consultation-gratuite, reservation-jour-meme)</li>
      </ul>

      <SectionDivider />

      <h2 id="utm-source-le-moteur-ia-et-le-canal">utm_source, le moteur IA et le canal</h2>
      <p>
        utm_source porte l'origine du clic. Pour le trafic non IA, les valeurs sont les noms de canaux standards : google, facebook, instagram, email, partner, referral. Pour le trafic IA, les valeurs sont les noms de moteurs IA : chatgpt, perplexity, claude, gemini, googleaio, bingcopilot. Les valeurs restent en minuscules, sans tiret bas, et constantes dans l'équipe.
      </p>
      <p>
        Le seau ai agrégé est bâti par-dessus, pas à la place, des valeurs spécifiques par moteur. Dans GA4, définissez une règle de groupe de canaux personnalisée qui mappe utm_source correspondant à la regex chatgpt|perplexity|claude|gemini|googleaio|bingcopilot vers le canal AI Engines. Gardez les valeurs spécifiques par moteur dans la dimension source pour la vue d'analyse fine, et utilisez le canal personnalisé pour la vue récapitulative.
      </p>
      <p>
        Les opérateurs demandent parfois s'ils devraient utiliser utm_source=ai comme valeur unique, en laissant tomber la granularité par moteur. La réponse, c'est non. La tranche par moteur est la différence entre savoir que le trafic IA existe et savoir quel moteur fait bouger l'aiguille. Sans cette tranche, la stratégie UTM répond à moitié à la question.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>La sensibilité à la casse est un piège caché. utm_source=ChatGPT et utm_source=chatgpt sont deux valeurs différentes dans GA4, et elles fragmentent le rapport sauf si vous normalisez. La solution, c'est une étiquette dans Google Tag Manager qui met chaque UTM en minuscules avant que le hit analytique parte. Faites-le la première semaine ou le jeu de données aura besoin de nettoyage pour toujours.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="utm-medium-la-surface-pas-le-format">utm_medium, la surface et pas le format</h2>
      <p>
        utm_medium décrit la surface du clic. Pour le trafic IA, les valeurs qui marchent sont chat (ChatGPT, Claude, surface chat Gemini), search (Perplexity, résultats de recherche IA) et aio (Google AI Overviews, réponses inline Bing Copilot). Pour le trafic non IA, les valeurs suivent les définitions de canaux par défaut GA4 : organic, cpc, social, email, referral, qr.
      </p>
      <p>
        Le champ medium est l'endroit où la plupart des équipes multi-emplacements surchargent. La tentation, c'est de mettre le format dans medium (banniere, publication, story, ad), ce qui fragmente les données et brise les règles de groupement de canaux par défaut GA4. Le format va dans utm_content. Le medium reste la catégorie de surface que le groupement de canaux lit.
      </p>
      <p>
        Pour le trafic IA précisément, la valeur medium permet au groupe de canaux de séparer les surfaces chat (où l'intention de conversion est conversationnelle et la visite courte) des surfaces AI Overview (où l'intention est de recherche et la visite plus longue). Les deux surfaces convertissent différemment, et la dimension medium est ce qui fait surgir la différence dans le rapport.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quelle valeur devrait tenir l'identifiant d'emplacement dans une convention UTM multi-emplacements?"
        options={[
          "utm_source, parce que l'emplacement est la source de la conversion",
          'utm_medium, parce que medium est le champ de segmentation',
          "utm_campaign, parce que campagne est la dimension d'en-tête et l'emplacement est la segmentation principale",
          'utm_content, parce que content est où vont les valeurs descriptives',
        ]}
        correctIndex={2}
        explanation="utm_campaign est la dimension d'en-tête dans les rapports GA4, et pour un commerce multi-emplacements la réponse d'en-tête est quelle succursale a gagné le clic. Mettre l'identifiant d'emplacement dans utm_campaign garde la vue GA4 d'abord par emplacement sur chaque canal et chaque moteur IA, avec le nom de campagne qui passe à utm_content où il vit sans polluer l'en-tête."
      />

      <SectionDivider />

      <h2 id="utm-campaign-l-identifiant-d-emplacement">utm_campaign, l'identifiant d'emplacement et pourquoi il ne change jamais</h2>
      <p>
        utm_campaign porte l'identifiant d'emplacement. La chaîne est stable, en minuscules, avec tirets, et jamais réutilisée pour un autre emplacement. Une chaîne de cliniques à cinq emplacements pourrait utiliser des valeurs utm_campaign comme saint-jean, brossard, longueuil, repentigny, terrebonne. Une franchise à vingt succursales ajoute le préfixe ville où il y a collision : montreal-plateau, montreal-rosemont, laval, gatineau, sherbrooke.
      </p>
      <p>
        L'identifiant d'emplacement ne change jamais une fois la convention en place. Les renommages brisent le rapport, parce que GA4 ne peut pas fusionner rétroactivement l'ancienne valeur et la nouvelle dans un seul segment sans une reconstruction de dimension personnalisée. La discipline, c'est de choisir une chaîne stable, de la documenter dans la bibliothèque UTM, et de ne jamais l'éditer à nouveau. Si un emplacement ferme ou déménage, documentez le changement comme une note à côté de la valeur, n'éditez pas la valeur.
      </p>
      <p>
        Le nom de campagne va dans utm_content. Une vente du printemps qui roule sur tous les emplacements pourrait baliser des liens avec utm_campaign=montreal-centre-ville et utm_content=vente-printemps-2026. La vue GA4 montre alors la vente du printemps par emplacement dans un rapport, et la performance d'entonnoir par emplacement dans un autre, sans fragmenter les données de campagne.
      </p>

      <img
        src={meta.images.mid}
        alt="Tableau de convention UTM montrant utm_source pour les moteurs IA, utm_medium pour chat search aio et utm_campaign comme identifiant d'emplacement"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="deployer-la-convention-sur-les-emplacements">Déployer la convention sur les emplacements</h2>
      <p>
        Le déploiement a quatre étapes et prend un après-midi pour la configuration. D'abord, documentez la convention dans un seul tableur avec les valeurs pour chaque champ UTM et la liste d'identifiants d'emplacements. Partagez ce document avec l'équipe et gelez les modifications sauf pour les ajouts quand un nouvel emplacement ouvre.
      </p>
      <p>
        Ensuite, bâtissez une bibliothèque de liens UTM qui prébalise chaque destination publique par emplacement. La bibliothèque vit dans une feuille partagée ou dans un constructeur UTM que l'équipe utilise pour le nouveau contenu. Les liens prébalisés couvrent la page d'accueil, les pages d'emplacement, le flux de réservation, la page contact et les pages de campagne.
      </p>
      <p>
        Troisièmement, installez une étiquette de normalisation dans Google Tag Manager qui met chaque valeur UTM en minuscules avant que le hit analytique parte. Cette étiquette empêche la fragmentation par casse pour toujours. Mettez-la au-dessus de toutes les autres étiquettes dans l'ordre GTM pour qu'elle s'exécute en premier.
      </p>
      <p>
        Quatrièmement, vérifiez les dimensions source et medium GA4 une semaine après le lancement. Confirmez que les valeurs sont propres, pas de majuscules égarées, pas de fautes, pas de chaînes orphelines venues d'une erreur de copier-coller. La plupart des déploiements multi-emplacements prennent un après-midi pour la configuration et une semaine pour la validation. Après validation, le rapport reste propre indéfiniment tant que la convention tient.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le moyen le plus rapide de valider après lancement, c'est de rouler une petite campagne test avec un lien connu et d'observer la vue temps réel GA4. Le lien devrait apparaître dans les dimensions source, medium, campagne exactement comme documenté. Si les valeurs s'affichent autrement que dans le lien source, il y a une redirection ou réécriture quelque part dans le chemin qui doit être corrigée avant de monter le déploiement à l'échelle.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="erreurs-courantes-et-comment-les-eviter">Erreurs courantes et comment les éviter</h2>
      <p>
        Erreur un, surcharger utm_medium avec des valeurs de format (banniere, publication, ad) qui devraient vivre dans utm_content. La solution, c'est de garder medium comme catégorie de surface et de laisser le groupement de canaux par défaut GA4 le consommer proprement. Erreur deux, changer l'identifiant d'emplacement dans le temps. La solution, c'est de geler l'identifiant au lancement et de documenter tout renommage comme note de côté, jamais comme édition.
      </p>
      <p>
        Erreur trois, manquer l'étiquette de normalisation de casse. La solution, c'est l'étiquette GTM en minuscules installée la première semaine. Erreur quatre, laisser le nom de campagne couler dans utm_campaign sur tous les emplacements. La solution, c'est garder la discipline qu'utm_campaign égale l'identifiant d'emplacement, point final. Erreur cinq, oublier de définir le groupe de canaux AI Engines dans GA4. La solution, c'est bâtir le groupe de canaux le jour un du déploiement, avec la regex qui capte les six sources de moteurs IA.
      </p>
      <p>
        Pour la configuration du groupe de canaux GA4 elle-même, le schéma qui marche est documenté dans le compagnon <InternalLink to="/blog/track-chatgpt-traffic-in-ga4" title="Suivre le trafic ChatGPT dans GA4" description="La règle de groupe de canaux et la liste d'hôtes référents" />. Les deux articles lus ensemble couvrent la pile d'attribution complète pour un commerce multi-emplacements qui sert le Québec ou les marchés pancanadiens. Pour la définition sous-jacente du trafic IA que cette convention capte, voir <InternalLink to="/glossary/ai-traffic" title="Trafic IA, entrée du glossaire" description="La définition AiLys pour l'attribution des clics de moteurs IA" />, et lancez une base avec l'<InternalLink to="/audit" title="Audit AI Visibility" description="La vérification 24 heures qui inclut la révision UTM et groupe de canaux" /> gratuit.
      </p>

      <InlineCTA variant="pricing" text="Vous voulez la bibliothèque UTM, le groupe de canaux GA4 et l'audit d'attribution multi-emplacements livrés pour vous? Voyez les forfaits AiLys pour commerces locaux." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="lire-le-rapport-ga4-apres-le-lancement">Lire le rapport GA4 après le lancement</h2>
      <p>
        Après le lancement, la vue GA4 répond à trois questions sur une seule page. Quel emplacement a gagné le clic, en lisant utm_campaign comme dimension d'en-tête. Quel canal a généré le clic, en lisant le groupe de canaux personnalisé bâti par-dessus utm_source. Quelle surface a généré la conversion, en lisant utm_medium comme dimension secondaire.
      </p>
      <p>
        Pour le trafic IA précisément, le rapport montre le total du canal AI Engines, puis la ventilation par moteur (chatgpt, perplexity, claude, gemini, googleaio, bingcopilot), puis l'attribution par emplacement depuis utm_campaign. Un commerce multi-emplacements à dix succursales peut voir dans un seul panneau que ChatGPT a généré 14 pour cent des réservations du mois dernier, que les emplacements de Laval et Sherbrooke ont gagné la plus grande part, et que la surface chat a converti à 3,2 pour cent contre 2,1 pour cent pour la surface AI Overview.
      </p>
      <p>
        La même convention nourrit le tableau de bord Looker Studio, le rapport de chemin de conversion et l'analyse de cohorte. Une convention UTM propre est la fondation de chaque question analytique en aval. L'inverse est aussi vrai : une convention UTM bruyante force chaque question analytique en étape de nettoyage qui gaspille des heures et érode la confiance dans les données.
      </p>

      <InlineCTA variant="book" text="Vous voulez une visite guidée de 60 minutes de votre configuration UTM et GA4 multi-emplacements? Doc stratégique livrée." buttonText="Réserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "utm_source porte le nom du moteur IA ou l'origine du canal, en minuscules et constant.",
          'utm_medium porte la surface (chat, search, aio, social, email), pas le format.',
          "utm_campaign porte l'identifiant d'emplacement, gelé au lancement et jamais édité.",
          "utm_content porte le nom de campagne quand ça compte, en gardant la dimension d'en-tête propre.",
          "Installez une étiquette GTM en minuscules la première semaine pour empêcher la fragmentation de casse pour toujours.",
          "Jumelez la convention UTM avec un groupe de canaux GA4 AI Engines pour capter à la fois le trafic IA balisé et le trafic IA basé sur le référent.",
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
        alt="Carte récapitulative de convention UTM multi-emplacements montrant la règle à trois champs et la configuration du groupe de canaux AI Engines"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
