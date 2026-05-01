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
import { meta } from './ailys-vs-rablab-creative-montreal'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: "AiLys vs Rablab, plateforme d'AI Visibility versus agence créative numerique a Montréal",
  metaDescription:
    "Comparaison honnete d'AiLys et Rablab pour les marques québécoises. Tarifs, AI Visibility, production créative, bilinguisme et ou chaque agence convient.",
  tldr: "Rablab est une agence créative numerique montréalaise reconnue pour le branding, la production créative, le contenu et le travail d'expérience numerique pour des clients de marques de taille moyenne et grande. AiLys est une plateforme québécoise d'AI Visibility avec quatre forfaits publiés de 300 a 2 499 dollars CAD, livraison bilingue EN et FR-CA a l'interne et un audit gratuit en 24 heures. Rablab convient aux marques qui ont besoin de production créative et de design d'expérience numerique. AiLys convient aux opérateurs qui ont besoin de travail de citations dans les moteurs IA et de GBP a un cout mensuel transparent.",
  faqItems: [
    {
      question: 'Comment AiLys se compare-t-elle a Rablab pour les marques montrealaises?',
      answer:
        "AiLys est une plateforme d'AI Visibility a prix fixe pour les commercants locaux avec quatre forfaits CAD publiés (300 a 2 499 dollars), livraison bilingue EN et FR-CA a l'interne et un audit gratuit en 24 heures. Rablab est une agence créative numerique montréalaise axee sur le branding, la production créative, le design d'expérience numerique et le travail de contenu pour des clients de marques de taille moyenne et grande. Les deux resolvent des problèmes différents : Rablab batit les marques et les actifs créatifs, AiLys livre du travail de citations dans les moteurs IA et de l'automatisation GBP. Elles se chevauchent rarement sur le même engagement.",
    },
    {
      question: "Rablab offre-t-elle des services d'AI Visibility comme AiLys?",
      answer:
        "Rablab est une agence dirigee par le créatif. Les livrables sont l'identité de marque, les campagnes créatives, la production de contenu, le design d'expérience numerique et le travail de narration. L'AI Visibility (citations dans ChatGPT, Perplexity, Claude, Gemini, Google AIO, Bing Copilot) n'est pas une ligne de service nommee chez Rablab. AiLys est concue pour la voie AI Visibility avec des interrogations hebdomadaires des principaux moteurs IA, l'évaluation de la part de citations par modèle et le travail de données structurees qui comble les écarts.",
    },
    {
      question: 'AiLys est-elle moins chere que Rablab?',
      answer:
        "AiLys publié quatre forfaits CAD (300 a 2 499 dollars par mois) avec des listes de livrables fixes. Rablab ne publié pas de tarifs. Les engagements d'agence créative sont typiquement par projet ou par retainer avec une tarification personnalisee qui reflete la portée de la production créative. La comparaison directe n'a pas vraiment de sens parce que les livrables différent : AiLys livre des audits AI Visibility et du travail GBP, Rablab livre des identités de marque et des campagnes créatives.",
    },
    {
      question: 'Une marque peut-elle utiliser AiLys et Rablab a la fois?',
      answer:
        "Oui. Une pile commune est Rablab (ou une autre agence créative) pour l'identité de marque, la production créative et l'expérience numerique, jumelee a AiLys pour la couche d'exécution AI Visibility. Le travail créatif faconne comment la marque a l'air et sonne. Le travail AI Visibility s'assure que la marque apparait quand les clients demandent aux moteurs IA au sujet de la catégorie. Les deux couches ne se chevauchent pas et peuvent rouler en parallele.",
    },
    {
      question: 'Comment se compare la livraison bilingue?',
      answer:
        "Les deux organisations sont basees a Montréal et servent les clients québécois en francais et en anglais. Rablab produit du contenu créatif bilingue pour les clients qui le requierent. AiLys livre chaque livrable bilingue EN et FR-CA a l'interne par defaut, avec du francais québécois rédigé a la main et aucune API de traduction a aucune etape. Pour les campagnes créatives, Rablab couvre la production bilingue. Pour le contenu de recherche locale (articles de blogue, publications GBP, citations, FAQ), AiLys couvre la production bilingue.",
    },
    {
      question: "Quand devrait-on choisir Rablab plutot qu'AiLys?",
      answer:
        "Choisissez Rablab quand le defi marketing est l'identité de marque, la production créative, la narration de contenu ou le design d'expérience numerique. Choisissez Rablab quand vous lancez une nouvelle marque, en rafraichissez une existante ou produisez une campagne créative qui a besoin d'identité visuelle, de rédaction, de photographie ou de travail video. Choisissez AiLys quand la priorite est les citations dans les moteurs IA, l'automatisation GBP et le travail de citations a un cout mensuel publié.",
    },
  ],
  headings: [
    { id: 'la-comparaison-honnete', text: 'La comparaison honnete' },
    { id: 'creatif-vs-ai-visibility', text: 'Production créative vs AI Visibility' },
    { id: 'tarifs-et-modele-d-engagement', text: "Tarifs et modèle d'engagement" },
    { id: 'quand-les-deux-sont-complementaires', text: 'Quand les deux sont complementaires' },
    { id: 'livraison-bilingue', text: 'Livraison bilingue' },
    { id: 'quand-rablab-est-le-bon-choix', text: 'Quand Rablab est le bon choix' },
    { id: 'comment-choisir', text: 'Comment choisir' },
    { id: 'faq', text: 'Questions frequentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les marques québécoises ont parfois Rablab et AiLys ensemble sur leur courte liste parce que les deux sont basees a Montréal et servent des clients sur le marché bilingue. Les deux resolvent des problèmes fondamentalement différents. Rablab est une agence numerique dirigee par le créatif. AiLys est une plateforme d'AI Visibility a prix fixe. La comparaison est plus une question de quel problème la marque a que de quelle agence est meilleure. Cette page présente les différences.
      </p>

      <StatHighlight
        stats={[
          { value: '300 a 2 499 $', label: 'Forfaits mensuels AiLys en CAD' },
          { value: 'Dirige par créatif', label: 'Focus Rablab : marque, contenu, expérience' },
          { value: 'AI Visibility', label: 'Focus AiLys : citations IA et GBP' },
        ]}
      />

      <SectionDivider />

      <h2 id="la-comparaison-honnete">La comparaison honnete</h2>
      <p>
        Rablab est une agence créative numerique montréalaise qui travaille principalement avec des clients de marques de taille moyenne et grande sur l'identité de marque, les campagnes créatives, la production de contenu et le design d'expérience numerique. Le travail est dirige par le créatif : identité visuelle, copie et ton de voix, photographie, video, expériences web interactives et narration de marque. Les engagements sont typiquement par projet ou par retainer avec la production créative au centre.
      </p>
      <p>
        AiLys est une plateforme d'AI Visibility batie au Québec avec quatre forfaits mensuels a prix fixe. La portée est la recherche locale et l'AI Visibility : audits sur ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot, optimisation GBP avec cadences automatisees de publications et de photos, travail de citations NAP, couches de schemas, pages FAQ et automatisation de reputation via le module Reviuzy.
      </p>
      <p>
        Rablab batit les marques. AiLys rend les marques trouvables dans la recherche IA. Les deux couches se composent quand utilisees ensemble mais ne dupliquent pas le travail.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour des comparaisons avec d'autres agences montrealaises et québécoises, voir <InternalLink to="/blog/ailys-vs-bloom-agence-montreal" title="AiLys vs Bloom" description="Marketing de performance Montréal versus AI Visibility" />, <InternalLink to="/blog/ailys-vs-adviso-conseil-numerique" title="AiLys vs Adviso" description="Plateforme d'AI Visibility versus consultance numerique d'entreprise" /> et <InternalLink to="/blog/ailys-vs-digitad-seo-quebec" title="AiLys vs Digitad" description="Comparaison des agences SEO au Québec pour les commercants locaux" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir ou votre marque se situe dans la recherche IA? L'audit AI Visibility gratuit sort en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="creatif-vs-ai-visibility">Production créative vs AI Visibility</h2>
      <p>
        Les livrables de Rablab sont des artefacts créatifs. Un système d'identité de marque. Un concept de campagne exécute sur les canaux. Une expérience numerique qui vit sur un site web ou une application. La sortie est visuelle, narrative et emotionnelle. La metrique est la reconnaissance de marque, les prix créatifs et la perception client qualitative.
      </p>
      <p>
        Les livrables d'AiLys sont techniques et structures. Scores AI Visibility par moteur. Part de citations par type de requete. Pourcentage de completude GBP. Statut de déploiement de schemas. Coherence NAP a travers les annuaires. La sortie est mesurable et quantitative. La metrique est si le commerce apparait dans les réponses des moteurs IA et a quelle frequence.
      </p>
      <p>
        Ce sont des catégories différentes de travail marketing. Le travail créatif faconne la perception de la marque. Le travail AI Visibility faconne la découverte de la marque. Une marque peut avoir un créatif eblouissant et zero AI Visibility, ou une AI Visibility forte et un créatif faible. Les marques les plus fortes investissent dans les deux.
      </p>

      <QuickQuiz
        translatedLabel="Quiz eclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout a fait."
        question="Quelle est la différence principale entre les livrables de Rablab et d'AiLys?"
        options={[
          'Rablab est moins chere qu\'AiLys a chaque palier',
          'Les deux livrent la même portée a des prix différents',
          "Rablab livre des artefacts créatifs, AiLys livre de l'exécution AI Visibility",
          'AiLys livre des campagnes créatives, Rablab livre de l\'AI Visibility',
        ]}
        correctIndex={2}
        explanation="Rablab est une agence dirigee par le créatif qui produit de l'identité de marque, du contenu et du travail d'expérience numerique. AiLys est une plateforme d'AI Visibility a prix fixe qui produit des audits, du travail GBP, des citations et des schemas. Les livrables tombent dans des catégories différentes de travail marketing."
      />

      <SectionDivider />

      <h2 id="tarifs-et-modele-d-engagement">Tarifs et modèle d'engagement</h2>
      <p>
        AiLys publié quatre forfaits CAD avec des listes de livrables fixes. Starter a 300 dollars, Core a 600 dollars, Growth a 1 200 dollars, Agency a 2 499 dollars par mois. Chaque palier a une portée publiée et l'opérateur connait le cout avant de signer.
      </p>
      <p>
        Rablab ne publié pas de tarifs publiquement. La tarification d'agence créative depend typiquement de la portée de la production créative : un projet d'identité de marque differe d'une campagne de contenu qui differe d'une construction d'expérience numerique. Les engagements sont côtés par projet ou par retainer.
      </p>
      <p>
        Pour les opérateurs avec un besoin défini d'AI Visibility et de GBP a un cout mensuel fixe, AiLys publié un palier qui convient. Pour les marques qui ont besoin de production créative avec portée personnalisee, Rablab côté par engagement. Les deux modèles de prix refletent des catégories de livrables différentes.
      </p>

      <SectionDivider />

      <h2 id="quand-les-deux-sont-complementaires">Quand les deux sont complementaires</h2>
      <p>
        Une marque qui se lance ou se relance a souvent besoin des deux couches. Rablab gère l'identité de marque, la campagne créative et l'expérience numerique. AiLys gère l'exécution AI Visibility : s'assurer que la marque apparait dans les réponses des moteurs IA, le GBP est optimise pour la découverte locale, les citations sont propres a travers les annuaires et le schema est déployé correctement.
      </p>
      <p>
        La separation est naturelle. Le travail créatif a besoin de stratèges seniors, designers, redacteurs et producteurs. Le travail AI Visibility a besoin de mesure pilotee par plateforme, de données structurees et de contenu axe exécution. Demander a une seule agence de couvrir les deux a un haut niveau est cher et rare. La specialisation a chaque couche est plus efficace.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme a deux couches montrant la couche de production créative Rablab et la couche d'exécution AI Visibility AiLys"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Pour un lancement ou rafraichissement de marque, la pile combinee est agence créative (Rablab ou comparable) plus plateforme d'AI Visibility (AiLys). Le cout total est typiquement plus bas que de demander a une seule agence de livrer les deux a haute qualite, et chaque partenaire se concentre sur ce qu'il fait le mieux.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="livraison-bilingue">Livraison bilingue</h2>
      <p>
        Les deux organisations sont basees a Montréal et servent les clients québécois bilingues. Rablab produit du contenu créatif en francais et en anglais pour les clients qui le requierent, avec de la rédaction native en francais québécois disponible pour les campagnes locales.
      </p>
      <p>
        AiLys livre chaque livrable bilingue EN et FR-CA a l'interne par defaut. Le flux est EN canonique d'abord, FR-CA rédigé a la main ensuite par une personne bilingue a l'interne. Aucune API de traduction a aucune etape. Le francais québécois avec ses idiomes régionaux (courriel, magasiner, fin de semaine) est preserve sur chaque piece de contenu.
      </p>
      <p>
        Pour les campagnes créatives et le travail de marque, Rablab couvre la production créative bilingue. Pour le contenu de recherche locale (articles de blogue, publications GBP, citations, FAQ, livrables d'audit), AiLys couvre la production bilingue comme defaut de palier.
      </p>

      <InlineCTA variant="pricing" text="Comparez les quatre forfaits AiLys côté a côté avec les listes de livrables, les cadences GBP et le cout mensuel publié." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="quand-rablab-est-le-bon-choix">Quand Rablab est le bon choix</h2>
      <p>
        Rablab est le bon choix dans trois scénarios.
      </p>

      <ol>
        <li>Le defi marketing est l'identité de marque. Lancer une nouvelle marque, en rafraichir une existante ou aligner l'identité visuelle a travers les canaux.</li>
        <li>Le livrable est de la production créative. Campagnes, series de contenu, photographie, video, expériences web interactives, narration de marque.</li>
        <li>Le travail a besoin de stratèges créatifs seniors, designers, redacteurs et producteurs travaillant sur une portée personnalisee. AiLys ne fournit pas de direction ou de production créative a cette portée.</li>
      </ol>

      <p>
        AiLys ne rivalise pas dans l'espace des agences créatives. Pour les marques dont le defi est la production créative, Rablab ou une agence créative comparable est le bon choix.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Evitez le faux dilemme. Une marque a besoin a la fois de travail créatif et d'exécution AI Visibility. Choisir l'un et sauter l'autre laisse un écart. La pile combinee d'agence créative plus plateforme d'AI Visibility livre plus que de demander a l'une de faire le travail de l'autre mal.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-choisir">Comment choisir</h2>
      <p>
        Une question décide quelle agence engager en premier : le besoin immediat est-il de la production créative (identité de marque, campagnes, contenu, expérience numerique) ou de l'exécution AI Visibility (citations dans les moteurs IA, GBP, schemas)? Le créatif va a Rablab. L'AI Visibility va a AiLys. La plupart des marques ont eventuellement besoin des deux, mais l'ordre depend de quel écart est plus grand maintenant.
      </p>
      <p>
        Si l'AI Visibility est l'écart immediat, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez les écarts de citations avant de signer quoi que ce soit" /> et examinez le livrable. L'audit est gratuit et prend 24 heures.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour determiner si vous avez besoin de travail créatif, d'AI Visibility ou des deux? Sans pitch, doc stratégique livree." buttonText="Reserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="A retenir"
        points={[
          "Rablab est une agence créative numerique montréalaise axee sur l'identité de marque, la production créative et l'expérience numerique. AiLys est une plateforme spécialisée d'AI Visibility pour les opérateurs locaux.",
          'AiLys publié quatre forfaits CAD (300 a 2 499 dollars). Rablab côté des engagements créatifs par projet ou retainer.',
          "Rablab livre des artefacts créatifs (identité de marque, campagnes, contenu, expérience numerique). AiLys livre de l'exécution AI Visibility (audits, GBP, citations, schemas).",
          "Les deux sont complementaires sur la pile marketing. Agence créative pour le travail de marque, plateforme d'AI Visibility pour la découverte dans les moteurs IA.",
          'Les deux sont bilingues EN et FR a Montréal. AiLys livre du bilingue systematique sur chaque piece de contenu par defaut.',
        ]}
      />

      <SectionDivider />

      <h2 id="faq">Questions frequentes</h2>
      {metaFr.faqItems.map((f, i) => (
        <details key={i} className="my-3 rounded-lg border border-white/10 bg-white/[0.02] p-4">
          <summary className="cursor-pointer font-semibold text-white/90">{f.question}</summary>
          <p className="mt-3 text-white/70 text-[0.95rem]">{f.answer}</p>
        </details>
      ))}

      <img
        src={meta.images.end}
        alt="Matrice de décision AiLys versus Rablab pour les marques montrealaises"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
