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
import { meta } from './ailys-vs-bofu-marketing-quebec'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'AiLys vs Bofu Agence Marketing, performance Québec versus AI Visibility',
  metaDescription:
    "Comparaison honnête d'AiLys et Bofu Agence Marketing pour les entreprises québécoises. Tarifs, AI Visibility, focus conversion, bilinguisme et ou chaque agence gagne.",
  tldr: "Bofu Agence Marketing est une agence marketing québécoise basee dans les Laurentides, axee sur la conversion bas-de-l'entonnoir avec SEO/GEO, media payant (Google Ads, Meta, LinkedIn, Amazon Ads), implementation HubSpot CRM, automatisation marketing, branding et conception web. AiLys est une plateforme québécoise d'AI Visibility avec quatre forfaits publiés de 300 à 2 499 dollars CAD, livraison bilingue EN et FR-CA à l'interne et un audit gratuit en 24 heures. Bofu convient aux opérateurs qui veulent un partenaire de croissance omnicanal pilote par HubSpot avec focus conversion. AiLys convient aux opérateurs qui veulent du travail de citations dans les moteurs IA et du GBP à un coût mensuel transparent.",
  faqItems: [
    {
      question: 'Comment AiLys se compare-t-elle a Bofu Agence Marketing pour les entreprises québécoises?',
      answer:
        "AiLys est une plateforme d'AI Visibility a prix fixe avec quatre forfaits CAD publiés (300 à 2 499 dollars), livraison bilingue EN et FR-CA à l'interne et un audit gratuit en 24 heures. Bofu Agence Marketing est une agence de performance québécoise basee dans les Laurentides axee sur la conversion (le nom vient de « Bottom of Funnel »), avec des services en SEO/GEO, media payant sur Google Ads, Meta, LinkedIn et Amazon Ads, implementation HubSpot CRM (Gold Partner), automatisation marketing, branding et conception web. AiLys à une portée plus étroite mais moins chere a demarrer et plus rapide en onboarding pour le travail AI Visibility. Bofu couvre une pile axee conversion plus large.",
    },
    {
      question: "Bofu offre-t-elle des services d'AI Visibility comme AiLys?",
      answer:
        "Bofu liste le SEO et le GEO (générative engine optimization) comme services mais le centre de gravite est la conversion bas-de-l'entonnoir à travers le media payant, l'automatisation CRM et la performance e-commerce. L'AI Visibility (citations dans ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) n'est pas le focus principal de livrables chez Bofu. AiLys est concue pour cette voie, avec des interrogations hebdomadaires des principaux moteurs IA, l'évaluation de la part de citations par modèle et le travail de données structurees qui comble les écarts.",
    },
    {
      question: 'AiLys est-elle moins chere que Bofu?',
      answer:
        "AiLys publié quatre forfaits CAD : Starter à 300 dollars, Core à 600 dollars, Growth à 1 200 dollars, Agency à 2 499 dollars par mois. Bofu ne publié pas de tarifs ; les prix sont determines par engagement selon le mix de canaux (SEO, payant, CRM, web). Pour les opérateurs qui veulent un coût mensuel transparent specifiquement pour l'AI Visibility et le GBP, AiLys publié les chiffres. Pour les opérateurs qui ont besoin d'un engagement multi-canaux sur mesure avec intégration HubSpot, Bofu côté par portée.",
    },
    {
      question: 'Quelle agence est meilleure pour un commerce e-commerce ou B2B au Québec?',
      answer:
        "Bofu sert les clients B2B et e-commerce avec HubSpot CRM, Amazon Ads, courriel Klaviyo et optimisation du taux de conversion. Pour un commerce e-commerce québécois ou un SaaS B2B qui a besoin de croissance pilotee CRM et d'acquisition payante, Bofu correspond au focus conversion. Pour un commerce de service local (restaurant, dentiste, entrepreneur, clinique) qui a besoin de visibilite dans les moteurs IA et d'optimisation GBP, AiLys couvre cette voie avec tarification publiée.",
    },
    {
      question: 'Comment se compare la livraison bilingue?',
      answer:
        "Bofu sert les clients en français, anglais et espagnol. AiLys livre chaque livrable bilingue EN et FR-CA à l'interne par defaut, avec du français québécois rédigé à la main (courriel, magasiner, fin de semaine) et aucune API de traduction a aucune etape. Les deux agences sont capables en français et en anglais. La distinction AiLys est la livraison bilingue systematique sur chaque piece de contenu par defaut, avec l'espagnol presentement en repli vers EN jusqu'à ce que le déploiement de la deuxieme locale s'etende.",
    },
    {
      question: "Quand devrait-on choisir Bofu plutot qu'AiLys?",
      answer:
        "Choisissez Bofu quand la conversion (le bas de l'entonnoir) est le defi marketing principal, quand la pile marketing a besoin d'implementation HubSpot CRM et d'automatisation marketing sous une seule agence, quand la gestion de media payant sur Google Ads, Meta, LinkedIn et Amazon Ads est requise, ou quand la liste de livrables inclut conception web et branding en plus du SEO. Choisissez AiLys quand la priorite est les citations dans les moteurs IA, l'automatisation GBP et le travail de citations à un coût mensuel publié.",
    },
  ],
  headings: [
    { id: 'la-comparaison-honnete', text: 'La comparaison honnête' },
    { id: 'tarifs-et-modele-d-engagement', text: "Tarifs et modèle d'engagement" },
    { id: 'focus-conversion-vs-ai-visibility', text: 'Focus conversion vs AI Visibility' },
    { id: 'hubspot-et-integration-crm', text: 'HubSpot et intégration CRM' },
    { id: 'livraison-bilingue', text: 'Livraison bilingue' },
    { id: 'quand-bofu-est-le-bon-choix', text: 'Quand Bofu est le bon choix' },
    { id: 'comment-choisir', text: 'Comment choisir' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les opérateurs québécois qui regardent les agences de performance ont souvent Bofu Agence Marketing aux côtés d'AiLys sur leur courte liste parce que les deux sont québécoises et servent les clients bilingues. Les deux resolvent des problèmes différents. Bofu se concentre sur la conversion bas-de-l'entonnoir (le BoFu dans le nom) à travers le media payant, le CRM et le e-commerce. AiLys se concentre sur la visibilite dans les moteurs IA et la recherche locale. Cette page présente les différences honnetement.
      </p>

      <StatHighlight
        stats={[
          { value: '300 à 2 499 $', label: 'Forfaits mensuels AiLys en CAD' },
          { value: 'Bas-entonnoir', label: 'Coeur Bofu : conversion et CRM' },
          { value: 'Moteurs IA', label: 'Coeur AiLys : citations dans la recherche IA' },
        ]}
      />

      <SectionDivider />

      <h2 id="la-comparaison-honnete">La comparaison honnête</h2>
      <p>
        Bofu Agence Marketing est basee dans les Laurentides au Québec et sert les clients à travers le Canada. La portée est large : SEO et GEO, media payant sur Google Ads, Meta, LinkedIn et Amazon Ads, implementation HubSpot Gold Partner CRM, automatisation marketing, courriel marketing via Klaviyo, conception web, branding et optimisation UX. L'agence detient les certifications Google Partner, Meta, Shopify, Amazon Ads et LinkedIn. Le positionnement est performance et conversion, le nom de l'agence refletant le focus bas-de-l'entonnoir ou les prospects deviennent clients.
      </p>
      <p>
        AiLys est une plateforme d'AI Visibility bâtie au Québec avec quatre forfaits mensuels a prix fixe. La portée est volontairement étroite : audits AI Visibility sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, optimisation GBP avec cadences automatisees de publications et de photos, travail de citations NAP, couches de schemas, pages FAQ et automatisation de réputation via le module Reviuzy.
      </p>
      <p>
        Bofu construit le moteur de conversion. AiLys construit la couche de visibilite en recherche IA. Les deux resolvent des parties différentes de l'entonnoir d'acquisition client et peuvent cohabiter dans la même pile marketing.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour des comparaisons avec d'autres agences québécoises dans la même conversation, voir <InternalLink to="/blog/ailys-vs-bloom-agence-montreal" title="AiLys vs Bloom" description="Marketing de performance Montréal versus AI Visibility" />, <InternalLink to="/blog/ailys-vs-digitad-seo-quebec" title="AiLys vs Digitad" description="Comparaison des agences SEO au Québec pour les commerçants locaux" /> et <InternalLink to="/blog/ailys-vs-prostar-seo-canada" title="AiLys vs ProStar SEO" description="AI Visibility versus SEO local traditionnel au Canada" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir ou votre commerce se situe dans la recherche IA? L'audit AI Visibility gratuit sort en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="tarifs-et-modele-d-engagement">Tarifs et modèle d'engagement</h2>
      <p>
        AiLys publié quatre forfaits avec des listes de livrables fixes. Starter à 300 dollars CAD, Core à 600 dollars, Growth à 1 200 dollars, Agency à 2 499 dollars par mois. L'opérateur connait le coût et la portée avant tout appel de vente.
      </p>
      <p>
        Bofu ne publié pas de tarifs publiquement. Le modèle d'engagement est sur devis selon le mix de canaux selectionnes. Un engagement SEO seulement coute differemment d'une implementation HubSpot complete plus media payant plus conception web. La flexibilite correspond à la portée précisément mais exige un appel de vente pour connaitre le prix.
      </p>
      <p>
        Pour les opérateurs avec un budget défini et un besoin défini (AI Visibility, GBP, citations), AiLys publié un palier qui convient. Pour les opérateurs qui batissent une pile de performance multi-canaux et qui veulent une seule agence pour l'architecturer, le modèle de devis Bofu correspond.
      </p>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="A quoi le nom « Bofu » fait-il référence dans le positionnement de l'agence?"
        options={[
          'Un emplacement régional au Québec',
          "Bottom of Funnel, le stade de conversion dans l'entonnoir marketing",
          "Un type d'outil d'automatisation marketing",
          'Un idiome français québécois',
        ]}
        correctIndex={1}
        explanation="Bofu signifie Bottom of Funnel, le stade de conversion ou les prospects deviennent clients. Le nom de l'agence reflete son focus sur le marketing de performance axe conversion plutot que le travail de notoriete en haut d'entonnoir."
      />

      <SectionDivider />

      <h2 id="focus-conversion-vs-ai-visibility">Focus conversion vs AI Visibility</h2>
      <p>
        Bofu optimise pour le moment ou un prospect devient client : taux de conversion des pages d'atterrissage, sequences de nurture par courriel, ROAS du media payant, habilitation des ventes pilotee CRM. La metrique est les conversions, les clients acquis et les revenus par canal. C'est du travail bas-de-l'entonnoir, ou l'audience connait déjà la marque et la question est si elle achete.
      </p>
      <p>
        AiLys optimise pour le moment ou un client demande pour la première fois à un moteur IA au sujet d'une catégorie ou d'un commerce : apparaitre dans les réponses ChatGPT quand quelqu'un demande « meilleur dentiste a Laval », apparaitre dans les réponses Perplexity pour « cabinet d'avocats en droit familial au Québec », apparaitre dans Google AIO quand quelqu'un cherche un service. La metrique est la part de citations, le score AI Visibility et la présence dans les réponses generees par IA. C'est du travail de découverte haut-d'entonnoir, ou l'audience ne connait pas encore la marque et la question est si elle vous trouve.
      </p>
      <p>
        Les deux couches se composent. Une AI Visibility forte amene de nouveaux prospects vers la marque. Une conversion bas-d'entonnoir forte transforme ces prospects en clients. Un opérateur qui fait rouler AiLys pour la découverte et Bofu (ou n'importe quel spécialiste de conversion) pour le closing couvre les deux extremites de l'entonnoir.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme d'entonnoir montrant l'AI Visibility haut-d'entonnoir d'AiLys versus la conversion bas-d'entonnoir de Bofu"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="hubspot-et-integration-crm">HubSpot et intégration CRM</h2>
      <p>
        Bofu est un HubSpot Gold Partner, ce qui signifie une expertise certifiee en implementation HubSpot CRM, automatisation marketing, configuration de pipeline de vente et intégration de rapports. Pour les opérateurs qui font tourner leur entreprise sur HubSpot et qui ont besoin d'une agence qui peut etendre la plateforme, Bofu convient. La même chose s'applique a Klaviyo pour le courriel marketing.
      </p>
      <p>
        AiLys n'implemente pas de CRM. La plateforme s'intégré avec les rapports existants du client à travers les evenements GA4, l'attribution basee UTM pour le AI Traffic, et les rapports Reviuzy pour la velocite des avis. Le CRM, le courriel et le travail de pipeline de vente sont explicitement hors portée. Pour les opérateurs qui ont besoin d'implementation CRM, ce travail va a Bofu ou à un partenaire certifie HubSpot.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>La facon la plus simple de decider : si vous avez besoin de quelqu'un pour bâtir et gérer votre CRM, automatisation marketing et infrastructure de conversion, Bofu (ou un autre partenaire HubSpot) est le bon choix. Si vous avez besoin de quelqu'un pour vous assurer que votre commerce apparait dans la recherche IA et Google Maps, AiLys est le bon choix. Les deux peuvent rouler en parallele sans chevauchement.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="livraison-bilingue">Livraison bilingue</h2>
      <p>
        Bofu sert les clients en français, anglais et espagnol, ce qui est plus large que la plupart des agences québécoises. L'équipe des Laurentides fonctionne bilingue par defaut pour le marché québécois.
      </p>
      <p>
        AiLys livre chaque livrable bilingue EN et FR-CA à l'interne par defaut. Le flux est EN canonique d'abord, FR-CA rédigé à la main ensuite par une personne bilingue à l'interne. Aucune API de traduction a aucune etape. Le français québécois avec ses idiomes régionaux est preserve (courriel, magasiner, fin de semaine). L'espagnol est dans le schema typage mais retourne presentement vers EN jusqu'à ce que le déploiement de la deuxieme locale s'etende.
      </p>
      <p>
        Pour les opérateurs qui ont besoin specifiquement de contenu en espagnol (expansion sur le marché mexicain, clientele latino-americaine), la couverture en trois langues de Bofu peut compter. Pour les opérateurs concentres sur le marché québécois EN/FR, les deux agences sont capables dans ces deux langues.
      </p>

      <InlineCTA variant="pricing" text="Comparez les quatre forfaits AiLys côté à côté avec les listes de livrables, les cadences GBP et le coût mensuel publié." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="quand-bofu-est-le-bon-choix">Quand Bofu est le bon choix</h2>
      <p>
        Bofu est le bon choix dans trois scénarios.
      </p>

      <ol>
        <li>Le defi marketing est la conversion. Optimisation des pages d'atterrissage, ROAS du media payant, nurture pilote CRM et habilitation des ventes bas-d'entonnoir.</li>
        <li>La pile exige l'implementation HubSpot CRM ou l'automatisation courriel Klaviyo. AiLys n'implemente pas ces plateformes.</li>
        <li>La liste de livrables inclut conception web, branding et travail UX en plus du marketing. AiLys se concentre sur l'AI Visibility et le contenu, pas la production créative ou la construction web.</li>
      </ol>

      <p>
        AiLys oriente régulièrement les opérateurs avec des besoins bas-d'entonnoir et CRM vers les agences de performance comme Bofu. Les deux modèles sont complementaires quand l'opérateur a besoin à la fois d'AI Visibility (haut d'entonnoir) et d'infrastructure de conversion (bas d'entonnoir).
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Evitez le faux dilemme. Un commerce e-commerce québécois peut faire rouler AiLys au palier Core (600 dollars par mois) pour l'AI Visibility et le GBP tout en faisant rouler Bofu pour le HubSpot CRM et le media payant. Chaque agence se concentre sur sa voie la plus forte et l'opérateur paie seulement pour le travail que chacune livre.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-choisir">Comment choisir</h2>
      <p>
        Deux questions tranchent. Premierement, le defi marketing est-il haut d'entonnoir (découverte, AI Visibility, recherche locale) ou bas d'entonnoir (conversion, CRM, acquisition payante)? Le haut d'entonnoir est en territoire AiLys, le bas d'entonnoir est en territoire Bofu. Deuxiemement, la pile exige-t-elle HubSpot CRM, Klaviyo, conception web ou branding? Si oui, Bofu couvre ces portées. AiLys non.
      </p>
      <p>
        Si l'AI Visibility est la priorite, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez les écarts de citations avant de signer quoi que ce soit" /> et examinez le livrable avant de prendre une décision.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour determiner quelle agence (ou combinaison) convient à votre entonnoir? Sans pitch, doc stratégique livree." buttonText="Reserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="A retenir"
        points={[
          "Bofu Agence Marketing est une agence de performance québécoise axee sur la conversion bas-d'entonnoir, le CRM et le media payant. AiLys est une plateforme spécialisée d'AI Visibility pour la découverte haut-d'entonnoir.",
          'AiLys publié quatre forfaits CAD (300 à 2 499 dollars). Bofu côté par engagement selon le mix de canaux.',
          "Bofu couvre HubSpot CRM, courriel Klaviyo, media payant, conception web et branding. AiLys couvre les citations des moteurs IA, l'automatisation GBP, les citations et le schema FAQ.",
          "Les deux sont bilingues EN et FR. Bofu ajoute la capacite espagnole. AiLys livre du bilingue systematique sur chaque piece de contenu par defaut.",
          "Les deux sont complementaires sur l'entonnoir. AiLys pour la découverte, Bofu pour la conversion, sans chevauchement.",
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
        alt="Matrice de décision AiLys versus Bofu Agence Marketing pour les opérateurs québécois"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
