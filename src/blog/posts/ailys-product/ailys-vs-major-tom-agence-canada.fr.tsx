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
import { meta } from './ailys-vs-major-tom-agence-canada'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'AiLys vs Major Tom, specialiste local Quebec versus agence numerique pancanadienne',
  metaDescription:
    "Comparaison honnete d'AiLys et Major Tom pour les entreprises canadiennes. Tarifs, AI Visibility, portee nationale, bilinguisme et ou chaque agence convient le mieux.",
  tldr: "Major Tom est une agence numerique pancanadienne avec des bureaux a Vancouver et New York, offrant strategie, creatif, developpement, media payant et SEO pour les marques de taille moyenne et les entreprises. AiLys est une plateforme quebecoise d'AI Visibility pour les commercants locaux avec des forfaits de 300 a 2 499 dollars CAD, une livraison bilingue EN et FR-CA a l'interne et un audit gratuit en 24 heures. Major Tom convient aux marques qui ont besoin d'un partenaire numerique complet avec portee nationale ou internationale. AiLys convient aux operateurs locaux qui ont besoin d'AI Visibility, GBP et citations livres rapidement a un cout previsible.",
  faqItems: [
    {
      question: 'Comment AiLys se compare-t-elle a Major Tom pour les commerces locaux au Canada?',
      answer:
        "AiLys est une plateforme d'AI Visibility a prix fixe pour les commercants locaux a partir de 300 dollars CAD par mois avec livraison bilingue EN et FR-CA. Major Tom est une agence numerique a service complet avec portee nationale et internationale, couvrant strategie, creatif, developpement, media payant et SEO sur des retainers personnalises. AiLys a une portee plus etroite mais est moins chere et plus rapide pour le travail d'AI Visibility locale. Major Tom couvre la surface numerique plus large pour les marques de taille moyenne et les entreprises.",
    },
    {
      question: 'AiLys est-elle moins chere que Major Tom?',
      answer:
        "Les forfaits AiLys vont de 300 a 2 499 dollars CAD par mois avec des listes de livrables publiees. Les retainers Major Tom sont sur devis et demarrent typiquement bien plus haut parce que la portee inclut strategie, creatif, developpement et gestion de media en plus du SEO. Pour le travail d'AI Visibility locale et de GBP, AiLys livre plus dans cette voie a un cout moindre. Pour la strategie numerique d'entreprise sur plusieurs canaux et marches, Major Tom livre une portee qu'AiLys ne couvre pas.",
    },
    {
      question: 'Major Tom sert-elle les clients quebecois en francais?',
      answer:
        "Major Tom a son siege a Vancouver avec un bureau a New York. L'agence sert les clients canadiens a l'echelle nationale mais l'equipe fonctionne principalement en anglais. La livraison de contenu en francais quebecois peut exiger des flux de traduction ou de la sous-traitance. AiLys livre chaque livrable bilingue EN et FR-CA a l'interne, avec du francais quebecois redige a la main et aucune API de traduction. Pour les operateurs quebecois qui ont besoin de contenu natif en francais, c'est une distinction significative.",
    },
    {
      question: 'AiLys peut-elle remplacer Major Tom pour un commerce multi-emplacements?',
      answer:
        "AiLys sert les commerces multi-emplacements au palier Agency (2 499 dollars CAD par mois) avec des tableaux de bord multi-emplacements, des rapports en marque blanche et l'optimisation GBP par emplacement. Major Tom sert les marques multi-emplacements avec une portee plus large : campagnes nationales, developpement web, strategie de marque et production creative en plus de l'optimisation locale. Si le besoin multi-emplacements est l'AI Visibility et le GBP a travers les emplacements, AiLys le couvre. Si le besoin inclut des campagnes de marque nationales et de la production creative, Major Tom couvre la surface plus large.",
    },
    {
      question: 'Quelle agence est meilleure pour un commerce a Toronto ou Vancouver?',
      answer:
        "Pour un commerce de service local a Toronto ou Vancouver qui a besoin d'AI Visibility, d'optimisation GBP et de travail de citations, AiLys livre a un cout moindre avec un onboarding plus rapide (audit de 24 heures versus decouverte de plusieurs semaines). Pour une marque a Toronto ou Vancouver qui a besoin de strategie numerique complete incluant developpement web, creatif, media payant et campagnes nationales, Major Tom est le partenaire local avec presence physique dans ces marches. La decision depend de la portee, pas de la geographie.",
    },
    {
      question: "Quand devrait-on choisir Major Tom plutot qu'AiLys?",
      answer:
        "Choisissez Major Tom quand le defi marketing s'etend au-dela de la recherche locale : campagnes de marque nationales, refontes de sites web, production creative, media payant a grande echelle et SEO d'entreprise sur plusieurs marches. Choisissez Major Tom quand le budget soutient un retainer a service complet (typiquement cinq chiffres par mois) et que le commerce a besoin de strategie, creatif et execution sous un meme toit. Choisissez Major Tom quand la priorite est le positionnement de marque et la transformation numerique plutot que l'AI Visibility locale.",
    },
  ],
  headings: [
    { id: 'la-comparaison-honnete', text: 'La comparaison honnete' },
    { id: 'tarifs-et-portee', text: 'Tarifs et portee' },
    { id: 'portee-nationale-vs-locale', text: 'Portee nationale vs locale' },
    { id: 'ai-visibility-vs-numerique-complet', text: 'AI Visibility vs numerique complet' },
    { id: 'livraison-bilingue-et-quebec', text: 'Livraison bilingue et Quebec' },
    { id: 'quand-major-tom-est-le-bon-choix', text: 'Quand Major Tom est le bon choix' },
    { id: 'comment-choisir', text: 'Comment choisir' },
    { id: 'faq', text: 'Questions frequentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Les proprietaires d'entreprises canadiens qui comparent les agences numeriques finissent par tomber sur Major Tom et AiLys. Les deux servent des profils d'operateurs fondamentalement differents, et les comparer tete a tete revient a comparer une ligne aerienne nationale a une navette regionale. Les deux vous amenent quelque part, mais les cartes de routes ne se chevauchent pas. Cette page detaille les differences sur la portee, les tarifs, la geographie et la livraison bilingue.
      </p>

      <StatHighlight
        stats={[
          { value: '300 a 2 499 $', label: 'Forfaits mensuels AiLys en CAD' },
          { value: 'National', label: 'Major Tom : strategie, creatif, dev, media, SEO' },
          { value: 'IA locale', label: 'AiLys : citations IA et GBP pour commercants locaux' },
        ]}
      />

      <SectionDivider />

      <h2 id="la-comparaison-honnete">La comparaison honnete</h2>
      <p>
        Major Tom est une agence numerique pancanadienne avec des bureaux a Vancouver et New York. La portee est d'entreprise : strategie de marque, production creative, developpement web, media payant, SEO et analytique pour les marques de taille moyenne et les grandes entreprises. La clientele inclut des detaillants nationaux, des entreprises SaaS et des marques multi-emplacements qui ont besoin d'un partenaire numerique complet.
      </p>
      <p>
        AiLys est une plateforme d'AI Visibility batie au Quebec avec quatre forfaits mensuels a prix fixe. La portee est la recherche locale : audits AI Visibility sur les principaux moteurs IA, optimisation GBP, travail de citations NAP, couches de schemas, pages FAQ et automatisation de reputation via le module Reviuzy. La clientele est composee de commerces de service locaux a travers le Quebec et le Canada.
      </p>
      <p>
        Major Tom construit des marques. AiLys construit de la presence en recherche locale. Les deux resolvent des problemes differents a des prix differents pour des tailles d'operateurs differentes. Un dentiste a Laval et une marque e-commerce nationale a Vancouver ne sont pas dans le meme cycle d'achat, et aucun des deux ne devrait utiliser l'agence de l'autre.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour des comparaisons avec des agences specifiquement quebecoises, voir <InternalLink to="/blog/ailys-vs-digitad-seo-quebec" title="AiLys vs Digitad" description="Comparaison des agences SEO au Quebec pour les commercants locaux" /> et <InternalLink to="/blog/ailys-vs-bloom-agence-montreal" title="AiLys vs Bloom" description="Marketing de performance Montreal versus AI Visibility" />.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir ou votre commerce se situe dans la recherche IA? L'audit AI Visibility gratuit sort en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="tarifs-et-portee">Tarifs et portee</h2>
      <p>
        AiLys publie quatre forfaits avec des listes de livrables fixes. Starter a 300 dollars CAD, Core a 600 dollars, Growth a 1 200 dollars, Agency a 2 499 dollars. Chaque palier livre un ensemble defini de livrables chaque mois, sans facturation a l'heure, sans derive de portee.
      </p>
      <p>
        Major Tom fonctionne sur des retainers personnalises qui refletent une portee d'entreprise. Les engagements demarrent typiquement dans les cinq chiffres par mois parce que la surface de livrables inclut la strategie, le creatif, le developpement et la gestion de media en plus du SEO. Les tarifs sont competitifs pour la portee offerte, mais la portee est d'un ordre de grandeur plus large qu'AiLys.
      </p>
      <p>
        Un commerce local avec un budget marketing mensuel de 1 000 dollars n'est pas un client Major Tom. Une marque nationale avec un budget numerique mensuel de 50 000 dollars n'est pas un client AiLys. La difference de prix est une fonction de la portee, pas de la valeur.
      </p>

      <QuickQuiz
        translatedLabel="Quiz eclair"
        translatedCorrect="Bonne reponse!"
        translatedNotQuite="Pas tout a fait."
        question="Quel type d'entreprise est le mieux servi par Major Tom versus AiLys?"
        options={[
          "Un dentiste a un seul emplacement qui a besoin de GBP et d'AI Visibility",
          "Une marque e-commerce nationale qui a besoin de strategie, creatif et media payant",
          "Un proprietaire de restaurant qui a besoin d'un audit AI Visibility en 24 heures",
          "Un entrepreneur qui a besoin de nettoyage de citations a 600 dollars par mois",
        ]}
        correctIndex={1}
        explanation="Major Tom sert les marques de taille moyenne et les entreprises qui ont besoin de strategie numerique complete incluant creatif, developpement et campagnes nationales. AiLys sert les operateurs locaux qui ont besoin d'AI Visibility, GBP et citations a un cout mensuel fixe."
      />

      <SectionDivider />

      <h2 id="portee-nationale-vs-locale">Portee nationale vs locale</h2>
      <p>
        Major Tom fonctionne a l'echelle nationale et internationale. L'agence gere des campagnes qui traversent plusieurs marches, plusieurs langues (pour le travail international) et plusieurs canaux. L'equipe est repartie entre Vancouver et New York. Le travail inclut des campagnes de marque, des constructions de sites web et des projets de transformation numerique qui prennent des mois a executer.
      </p>
      <p>
        AiLys fonctionne localement. Le focus est un seul emplacement de commerce (ou un ensemble d'emplacements au palier Agency) dans un marche geographique specifique. Le travail porte sur l'evaluation AI Visibility, l'optimisation GBP, le nettoyage de citations, le deploiement de schemas et la gestion de reputation. Le calendrier se compte en jours et en semaines, pas en mois et en trimestres.
      </p>
      <p>
        Un cabinet d'avocats a Sherbrooke et une chaine de vente au detail nationale au Canada ont des problemes differents. Le cabinet a besoin d'apparaitre quand quelqu'un demande a ChatGPT au sujet des avocats en droit familial a Sherbrooke. La chaine a besoin d'une campagne de marque nationale avec production creative et media payant. Chaque probleme a sa bonne agence.
      </p>

      <img
        src={meta.images.mid}
        alt="Carte montrant la couverture nationale de Major Tom versus le focus marche local d'AiLys"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="ai-visibility-vs-numerique-complet">AI Visibility vs numerique complet</h2>
      <p>
        AiLys interroge les principaux moteurs IA chaque semaine (quotidiennement au palier Agency), evalue la part de citations par modele et type de requete, et livre le travail de donnees structurees, schemas, GBP et FAQ qui comble les ecarts de citations. La metrique est si ChatGPT, Perplexity, Claude, Gemini, Google AIO et Bing Copilot nomment le commerce dans leurs reponses.
      </p>
      <p>
        Major Tom livre du numerique complet : strategie de marque qui definit le positionnement, production creative qui construit l'identite visuelle, developpement web qui livre la plateforme, media payant qui genere l'acquisition et SEO qui fait croitre la portee organique. L'AI Visibility n'est pas une ligne de service nommee chez Major Tom. Le travail SEO traditionnel chez Major Tom soutient indirectement les citations IA, mais la mesure et le ciblage se font chez AiLys.
      </p>
      <p>
        La distinction compte pour les operateurs qui ont deja perdu de l'AI Visibility face aux concurrents. Si le concurrent apparait dans ChatGPT et vous non, une agence a service complet finira par aider a travers l'amelioration SEO generale. AiLys aidera plus vite parce qu'elle mesure et cible le resultat specifique.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le moyen le plus rapide de savoir quelle agence vous convient : si le probleme principal est « mon concurrent apparait dans la recherche IA et pas moi », AiLys cible cet ecart directement. Si le probleme principal est « ma marque a besoin d'un nouveau site web, de creatif et d'une campagne nationale », Major Tom construit cette pile.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="livraison-bilingue-et-quebec">Livraison bilingue et Quebec</h2>
      <p>
        Major Tom a son siege a Vancouver avec un bureau a New York. L'agence sert les clients canadiens a l'echelle nationale en anglais. La livraison de contenu en francais quebecois peut impliquer des flux de traduction ou de la sous-traitance, ce qui est standard pour les agences basees hors du Quebec.
      </p>
      <p>
        AiLys est batie au Quebec et livre chaque livrable bilingue EN et FR-CA a l'interne. Articles de blogue, publications GBP, reecritures de citations, contenu FAQ, livrables d'audit et l'interface de la plateforme. Le flux utilise EN canonique d'abord, FR-CA redige a la main ensuite par une personne bilingue. Aucune API de traduction. Le francais quebecois avec ses idiomes regionaux est preserve.
      </p>
      <p>
        Pour les operateurs au Quebec qui servent les publics anglophone et francophone, le defaut bilingue chez AiLys elimine la surcharge de traduction. Pour les operateurs hors Quebec qui travaillent exclusivement en anglais, l'avantage bilingue n'est pas pertinent et le flux anglais de Major Tom est suffisant.
      </p>

      <InlineCTA variant="pricing" text="Comparez les quatre forfaits AiLys cote a cote avec les listes de livrables et les cadences de publications GBP." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="quand-major-tom-est-le-bon-choix">Quand Major Tom est le bon choix</h2>
      <p>
        Major Tom est le bon choix dans trois scenarios.
      </p>

      <ol>
        <li>Le commerce a besoin d'une strategie de marque lourde et d'une production creative au-dela de ce qui est inclus avec AiLys. La construction de site web est incluse dans chaque forfait AiLys (avec une clause de recuperation des frais de creation si le contrat est annule avant 6 mois), mais les campagnes de marque d'entreprise et la production creative originale a grande echelle vont a une agence a service complet comme Major Tom.</li>
        <li>La portee marketing est nationale ou internationale, couvrant plusieurs marches avec media payant, contenu et SEO a grande echelle. AiLys se concentre sur les marches locaux.</li>
        <li>Le budget soutient un retainer mensuel a cinq chiffres et l'operateur a besoin d'une seule relation d'agence pour la strategie, l'execution et l'analytique sur tous les canaux numeriques.</li>
      </ol>

      <p>
        AiLys ne rivalise pas dans l'espace numerique d'entreprise. Pour les operateurs dont le defi marketing est la transformation de marque et la portee nationale, Major Tom ou une agence a service complet comparable est le bon choix.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Evitez d'engager une agence d'entreprise pour un probleme local. Un commerce de service a un seul emplacement qui a besoin d'AI Visibility et de travail GBP va surpayer a des tarifs d'entreprise et attendre plus longtemps pour des livrables concus pour une echelle differente. Associez l'agence au probleme, pas au prestige.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="comment-choisir">Comment choisir</h2>
      <p>
        Deux questions tranchent. Premierement, le commerce est-il un service local ou une marque nationale? Les commerces de service locaux tirent plus de valeur d'AiLys. Les marques nationales tirent plus de valeur de Major Tom. Deuxiemement, l'operateur a-t-il besoin de creatif, de developpement et de strategie de marque, ou d'AI Visibility et de GBP? Le premier ensemble va a Major Tom. Le deuxieme ensemble va a AiLys.
      </p>
      <p>
        Si l'AI Visibility et la recherche locale sont la priorite, lancez l'<InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="Voyez les ecarts de citations avant de signer quoi que ce soit" /> et examinez le livrable avant de prendre une decision.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel strategique de 60 minutes pour determiner si vous avez besoin d'AI Visibility locale ou d'un partenaire numerique complet? Sans pitch, doc strategique livree." buttonText="Reserver un appel" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="A retenir"
        points={[
          "Major Tom est une agence numerique pancanadienne a service complet pour les marques de taille moyenne et les entreprises. AiLys est une plateforme specialisee d'AI Visibility pour les commercants locaux.",
          'Les forfaits AiLys vont de 300 a 2 499 dollars CAD avec portee fixe. Les retainers Major Tom sont sur devis a l\'echelle d\'entreprise.',
          "Major Tom livre strategie, creatif, developpement, media payant et SEO a l'echelle nationale. AiLys livre AI Visibility, GBP et citations localement.",
          "AiLys livre chaque livrable bilingue EN et FR-CA par defaut. Major Tom fonctionne principalement en anglais depuis Vancouver.",
          "Associez l'agence au probleme : construction de marque nationale va a Major Tom, AI Visibility locale va a AiLys.",
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
        alt="Matrice de decision AiLys versus Major Tom pour les operateurs d'entreprises canadiens"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
