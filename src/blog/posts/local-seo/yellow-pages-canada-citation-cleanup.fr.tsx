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
import { meta } from './yellow-pages-canada-citation-cleanup'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'Nettoyage des citations Yellow Pages Canada, Yelp et Pages Jaunes au Québec',
  metaDescription:
    'Un restaurant québécois doit-il être inscrit sur Yelp et sur Yellow Pages Canada (yellowpages.ca, pagesjaunes.ca)? La réponse honnête, les règles NAP et le plan de nettoyage.',
  tldr:
    "Oui, un restaurant québécois devrait être inscrit sur Yelp, sur Yellow Pages Canada (yellowpages.ca), et sur Pages Jaunes (pagesjaunes.ca, la marque française de Yellow Pages Canada détenue par la même société mère). Le piège est la cohérence NAP : même nom, même adresse avec les bons accents, même format de téléphone, mêmes horaires, sur chaque annuaire. Les écarts entre ces trois citations coûtent plus cher que d'en sauter une.",
  faqItems: [
    {
      question: "Un restaurant québécois doit-il s'inscrire à la fois sur Yelp et Yellow Pages?",
      answer:
        "Oui, les deux. Yelp tire une part significative du trafic de recherche pré-achat et alimente Apple Maps, Siri et Alexa avec les données locales. Yellow Pages Canada (yellowpages.ca) est l'un des dix annuaires d'entreprises avec la plus haute autorité au Canada et alimente plusieurs agrégateurs secondaires. La même chose s'applique à Pages Jaunes (pagesjaunes.ca), la marque française de Yellow Pages Canada sous la même société mère. Le coût est dans la cohérence NAP, pas dans le choix d'un annuaire plutôt qu'un autre.",
    },
    {
      question: "Yellow Pages Canada et Pages Jaunes sont-elles la même entreprise?",
      answer:
        "Oui, en quelque sorte. Yellow Pages Canada (la société mère souvent abrégée YP) exploite à la fois yellowpages.ca et pagesjaunes.ca. Les deux domaines partagent une grande partie de la même base de données de fiches en arrière-plan, mais les marques publiques sont séparées pour le marché bilingue : yellowpages.ca sert l'audience anglo-canadienne, pagesjaunes.ca sert le Québec et les autres poches francophones. Les deux devraient apparaître sur la liste de citations locales d'un commerce québécois, avec la surface de fiche ciblée pour la bonne langue.",
    },
    {
      question: "Quelle est l'importance de Yelp pour les commerces locaux au Québec en 2026?",
      answer:
        "Moins importante qu'il y a cinq ans, encore significative. Le trafic Yelp a baissé au Québec par rapport à Google Maps et Apple Maps, mais Yelp alimente encore Apple Maps, Siri et Alexa avec les données de restaurants et de services. Pour les restaurants spécifiquement, Yelp alimente aussi OpenTable et plusieurs agrégateurs de réservation. Une fiche Yelp propre avec des photos à jour, des horaires et des réponses aux avis vaut l'entretien, même si le trafic Yelp direct est modeste.",
    },
    {
      question: "Si ma fiche Yellow Pages a un mauvais NAP et que je ne peux pas la modifier, que faire?",
      answer:
        "La plupart des fiches Yellow Pages héritées sont modifiables sans frais par le portail YP. La modification gratuite couvre le nom, l'adresse, le téléphone, les horaires et le site web. Certaines fiches héritées dupliquées par scraping exigent une revendication manuelle, que YP traite en 5 à 10 jours ouvrables. Si le doublon est sur yellowpages.ca et l'original propre sur pagesjaunes.ca, demandez au soutien YP de fusionner les dossiers plutôt que de modifier le doublon, sinon le mauvais NAP continue d'apparaître.",
    },
    {
      question: "L'incohérence NAP entre ces annuaires nuit-elle vraiment au classement?",
      answer:
        "Oui, à la fois pour le pack local Google et pour la résolution d'entité par les moteurs IA. Google lit la cohérence des citations comme un signal de confiance, et le Québec ajoute la couche bilingue où les écarts d'accents (Sainte-Catherine vs Sainte Catherine) divisent l'entité. Les moteurs IA (ChatGPT, Perplexity, Claude, Gemini) tirent de ces annuaires lors de la récupération et traitent les NAP contradictoires comme plusieurs entités jusqu'à ce qu'ils les concilient, affaiblissant les citations sur toutes les variantes. Le coût s'accumule dans le graphe de citations.",
    },
    {
      question: "Combien de temps prend un nettoyage NAP sur 50 annuaires?",
      answer:
        "Quatre à six semaines de travail opérateur. La semaine 1 verrouille le NAP canonique. Les semaines 2 et 3 corrigent les dix premiers annuaires par autorité de domaine (Google Business Profile, Yelp, Yellow Pages Canada, Pages Jaunes, Apple Business Connect, Bing Places, Facebook, Foursquare, TomTom, HERE). Les semaines 4 à 6 corrigent la longue traîne d'agrégateurs secondaires. AiLys livre ce nettoyage dans le livrable du palier Core sur un échéancier de 6 semaines.",
    },
  ],
  headings: [
    { id: 'la-reponse-honnete-inscrivez-vous-aux-deux', text: 'La réponse honnête, inscrivez-vous aux deux' },
    { id: 'yellow-pages-et-pages-jaunes-meme-societe', text: 'Yellow Pages et Pages Jaunes, même société mère' },
    { id: 'pourquoi-yelp-compte-encore-au-quebec', text: 'Pourquoi Yelp compte encore au Québec' },
    { id: 'le-nap-canonique', text: 'Le NAP canonique' },
    { id: 'l-echeancier-de-nettoyage-de-six-semaines', text: "L'échéancier de nettoyage de six semaines" },
    { id: 'fiches-bilingues-et-regles-d-accents', text: "Fiches bilingues et règles d'accents" },
    { id: 'mesurer-l-impact-pack-local-et-moteurs-ia', text: "Mesurer l'impact sur le pack local et les moteurs IA" },
    { id: 'erreurs-frequentes-de-nettoyage', text: 'Erreurs fréquentes de nettoyage' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Un propriétaire de restaurant québécois nous a demandé la semaine dernière si l'inscription sur Yelp et Yellow Pages valait l'effort, étant donné la domination de Google Maps dans la découverte de restaurants en 2026. La réponse honnête est oui, inscrivez-vous aux deux. Ajoutez Pages Jaunes aussi. Le travail n'est pas dans le choix d'un annuaire plutôt qu'un autre, le travail est dans la cohérence NAP entre les trois en même temps. Ce guide couvre le pourquoi, le NAP canonique et l'échéancier de nettoyage de six semaines pour un restaurant québécois qui jongle avec Yelp, yellowpages.ca et pagesjaunes.ca.
      </p>

      <StatHighlight
        stats={[
          { value: '3', label: 'Citations à entretenir : Yelp, Yellow Pages, Pages Jaunes' },
          { value: '6 semaines', label: 'Échéancier AiLys pour un nettoyage NAP de 50 annuaires' },
          { value: 'EN et FR', label: 'Surface de fiches bilingues pour les restaurants québécois' },
        ]}
      />

      <SectionDivider />

      <h2 id="la-reponse-honnete-inscrivez-vous-aux-deux">La réponse honnête, inscrivez-vous aux deux</h2>
      <p>
        Yelp tire encore une part significative du trafic de recherche pré-achat pour les restaurants, même en 2026 où Google Maps domine le haut du pack local. La raison est en aval : Yelp alimente Apple Maps, Siri, Alexa, OpenTable et plusieurs agrégateurs de réservation avec les données de restaurants, les horaires, les photos et les résumés d'avis. Un restaurant québécois qui ignore Yelp abandonne l'écosystème Apple sans économie, puisque l'entretien d'une fiche Yelp est modeste après la configuration initiale.
      </p>
      <p>
        Yellow Pages Canada (yellowpages.ca) est l'un des dix annuaires d'entreprises avec la plus haute autorité au Canada par autorité de domaine et profil de liens entrants. Plusieurs agrégateurs secondaires (411.ca, Cylex, Hotfrog, FindOpen) extraient Yellow Pages comme source principale pour les fiches canadiennes, ce qui fait qu'une fiche YP propre se répand vers des dizaines de citations secondaires automatiquement. Sauter Yellow Pages coûte au commerce ces citations en aval et le signal de confiance qui les accompagne.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Pour la définition de base de NAP et pourquoi cela compte, voyez <InternalLink to="/glossary/nap" title="Entrée glossaire NAP" description="Cohérence Nom, Adresse, Téléphone entre les citations locales" />. Le travail de nettoyage suppose que vous comprenez déjà la discipline du dossier canonique, mais l'entrée glossaire rattrape les lecteurs en deux minutes.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez un audit gratuit qui scanne Yelp, Yellow Pages Canada, Pages Jaunes, GBP et 47 autres annuaires pour les écarts NAP? Lancez l'audit AiLys de 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="yellow-pages-et-pages-jaunes-meme-societe">Yellow Pages et Pages Jaunes, même société mère</h2>
      <p>
        Pages Jaunes (pagesjaunes.ca) est la marque française de Yellow Pages Canada, détenue par la même société mère souvent abrégée YP. Les deux domaines publics partagent une grande partie de la base de données de fiches en arrière-plan, mais le partage de marque existe pour servir le marché bilingue : yellowpages.ca pour le Canada anglais, pagesjaunes.ca pour le Québec et les autres poches francophones. Le partage est réel, la surface SEO est réelle, et un commerce local québécois devrait revendiquer les deux fiches même si la société mère est la même.
      </p>
      <p>
        Pourquoi les deux? Deux raisons. D'abord, l'expérience de recherche utilisateur diffère entre les deux domaines. Une recherche en français sur pagesjaunes.ca rapporte des fiches en français avec les graphies québécoises de noms de rue, des étiquettes de catégories en français et des extraits d'avis en français. La même requête sur yellowpages.ca rapporte la version anglophone. Ensuite, les profils de liens entrants des deux domaines diffèrent, et Google lit les deux comme des sources de citation distinctes pour le score de confiance. Le signal de confiance combiné d'une fiche propre sur les deux est plus élevé que sur l'un ou l'autre seul.
      </p>

      <h3>Ce qui change entre les deux fiches</h3>
      <ul>
        <li>Nom du commerce : même nom légal sur les deux, mais la description et le slogan peuvent être propres à chaque langue</li>
        <li>Adresse : adresse civique identique, mais la graphie sur pagesjaunes.ca doit porter les accents québécois (rue Sainte-Catherine, boulevard René-Lévesque avec les bons accents)</li>
        <li>Téléphone : numéro de téléphone identique, format identique</li>
        <li>Horaires : horaires identiques, mais les libellés de jour sont auto-traduits par la plateforme</li>
        <li>Catégories : choisissez la correspondance la plus proche dans chaque langue, pas toujours une traduction littérale (la taxonomie de catégories YP diffère entre les deux domaines)</li>
      </ul>

      <SectionDivider />

      <h2 id="pourquoi-yelp-compte-encore-au-quebec">Pourquoi Yelp compte encore au Québec</h2>
      <p>
        Le trafic direct Yelp au Québec a baissé par rapport à Google Maps et Apple Maps au cours des cinq dernières années. La lecture honnête est que Yelp n'est plus une surface de recherche pré-achat dans le top trois pour les utilisateurs québécois en soi. Ce qu'il fait encore est d'alimenter les plateformes en aval qui comptent : Apple Maps lit beaucoup les données Yelp, les requêtes vocales Siri tirent d'Apple Maps et donc de Yelp, Alexa tire de Yelp pour les requêtes de restaurants, et OpenTable plus plusieurs agrégateurs de réservation se synchronisent avec les données de fiche Yelp.
      </p>
      <p>
        Pour un restaurant québécois, ce flux en aval est la valeur. Une fiche Yelp propre avec des photos à jour, des horaires exacts, la bonne catégorie (italien, vietnamien, bistro français) et des réponses aux avis récents se répand vers Apple Maps et les agrégateurs de réservation automatiquement. Sauter Yelp laisse ces surfaces en aval avec des données périmées ou manquantes, ce qui coûte plus cher que l'entretien de la fiche Yelp.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>L'exception où Yelp est ignoré : les commerces avec un long historique d'avis Yelp falsifiés ou militarisés que la plateforme a refusé de retirer. Dans ce cas étroit, doubler la mise sur GBP, Apple Business Connect et Yellow Pages tout en laissant la fiche Yelp tourner en entretien minimal est la décision pragmatique. Les nouveaux avis apparaissent encore, mais l'opérateur cesse de mettre du temps dans une surface d'avis hostile.</p>
      </CalloutBox>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Un propriétaire de restaurant québécois demande si Pages Jaunes et Yellow Pages Canada sont la même entreprise. Quelle est la bonne réponse?"
        options={[
          'Non, ce sont des annuaires concurrents détenus par des sociétés mères différentes',
          'Oui, les deux sont exploités par Yellow Pages Canada, avec des domaines distincts pour les audiences anglaise et française',
          'Non, Pages Jaunes est un annuaire basé en France sans lien avec Yellow Pages Canada',
          'Oui, mais ils fusionnent en un seul domaine en 2026',
        ]}
        correctIndex={1}
        explanation="Yellow Pages Canada (la société mère souvent abrégée YP) exploite à la fois yellowpages.ca et pagesjaunes.ca. Les deux domaines partagent une grande partie de la base en arrière-plan, mais les marques publiques sont séparées pour le marché bilingue. Un commerce local québécois devrait revendiquer les deux fiches."
      />

      <SectionDivider />

      <h2 id="le-nap-canonique">Le NAP canonique</h2>
      <p>
        Avant de toucher à un annuaire, verrouillez le NAP canonique. C'est la source unique de vérité que chaque citation va refléter. Le dossier couvre sept champs, pas trois : nom, adresse avec accents, téléphone avec format, horaires, URL du site, catégorie principale et description courte. Traitez le dossier comme un contrat avec votre futur soi. Une fois verrouillé, aucune modification d'annuaire ne s'écarte du dossier sans le mettre à jour d'abord.
      </p>

      <h3>Les champs du dossier canonique et la discipline</h3>
      <ul>
        <li>Nom : nom légal tel qu'enregistré au Registraire des entreprises du Québec, sans abréviations, sans slogans accolés</li>
        <li>Adresse : adresse civique complète avec les bons accents québécois (rue Sainte-Catherine, boulevard René-Lévesque avec les accents intacts), numéro de suite formaté de façon constante, nom de ville et code postal au format Postes Canada standard</li>
        <li>Téléphone : un seul format de téléphone utilisé partout (514 555 0100 avec espaces, ou 514-555-0100 avec traits d'union, mais pas les deux entre les fiches)</li>
        <li>Horaires : horaires standards 7 jours incluant les horaires des fêtes notés pour les 12 prochains mois</li>
        <li>Site web : URL canonique avec ou sans le préfixe www, mais cohérente partout; sans paramètres UTM dans l'URL de la fiche</li>
        <li>Catégorie principale : correspondance la plus proche sur chaque plateforme, mappée depuis la catégorie principale GBP</li>
        <li>Description courte : 250 caractères, rédigée à la main pour chaque langue (EN et FR-CA), sans traduction automatique</li>
      </ul>

      <p>
        Verrouillez le dossier dans une feuille de calcul ou un document Notion et traitez-le comme la source canonique pour les 50 annuaires. AiLys livre le dossier canonique comme premier livrable au palier Core, avant tout travail de citation. Le nettoyage n'est bon que dans la mesure du dossier canonique qui le précède.
      </p>

      <InlineCTA variant="pricing" text="Voyez les paliers AiLys qui incluent la construction du dossier NAP canonique, le nettoyage des citations et le travail bilingue d'annuaire." buttonText="Voir les forfaits" />

      <SectionDivider />

      <h2 id="l-echeancier-de-nettoyage-de-six-semaines">L'échéancier de nettoyage de six semaines</h2>
      <p>
        Un nettoyage de 50 annuaires tourne sur un échéancier de six semaines avec un opérateur appuyé par un stratège. L'échéancier place en avant les annuaires à plus haute autorité pour que la hausse du signal de confiance commence tôt.
      </p>

      <h3>Plan semaine par semaine</h3>
      <ol>
        <li>Semaine 1 : Verrouillez le NAP canonique. Auditez les citations existantes sur les 50 annuaires cibles. Construisez la liste d'écarts groupée par nom, adresse, téléphone, horaires, site web.</li>
        <li>Semaine 2 : Corrigez Google Business Profile, Apple Business Connect, Bing Places. Ces trois alimentent les principaux écosystèmes de cartes et les moteurs IA. Confirmez que les catégories GBP et la catégorie principale correspondent au dossier canonique.</li>
        <li>Semaine 3 : Corrigez Yelp, Yellow Pages Canada (yellowpages.ca), Pages Jaunes (pagesjaunes.ca), Facebook. Ces quatre couvrent la surface bilingue et alimentent les agrégateurs en aval.</li>
        <li>Semaine 4 : Corrigez Foursquare, TomTom, HERE, OpenTable (pour les restaurants), et les agrégateurs de données GPS qui alimentent les systèmes de navigation automobile.</li>
        <li>Semaine 5 : Corrigez les 20 annuaires suivants par autorité de domaine canadienne, dont 411.ca, Cylex, Hotfrog, FindOpen, Canada411.</li>
        <li>Semaine 6 : Corrigez la longue traîne et lancez un scan de vérification. Le scan de vérification sonde chaque citation à nouveau pour confirmer que la correction tient et pour attraper les retours en arrière des extracteurs automatiques.</li>
      </ol>

      <p>
        L'échéancier de six semaines est réaliste pour un opérateur qui travaille deux heures par jour sur le nettoyage. La compression à quatre semaines est possible mais ajoute des heures supplémentaires et augmente le taux d'erreur. L'étirement à huit semaines convient si l'opérateur mène le nettoyage en parallèle d'autres travaux. Pour les opérateurs multi-emplacements, multipliez l'échéancier par emplacement et ajoutez une semaine de coordination à la fin.
      </p>

      <img
        src={meta.images.mid}
        alt="Diagramme de Gantt du nettoyage NAP en six semaines pour un restaurant québécois couvrant Yelp, Yellow Pages, Pages Jaunes, GBP, Apple Business Connect"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="fiches-bilingues-et-regles-d-accents">Fiches bilingues et règles d'accents</h2>
      <p>
        Le Québec ajoute une couche bilingue que le reste de l'Amérique du Nord n'a pas. Les noms de rue comme rue Sainte-Catherine, boulevard René-Lévesque, avenue du Mont-Royal et rue Saint-Denis doivent porter leurs accents sur chaque citation. Une fiche qui laisse tomber les accents sur yellowpages.ca mais qui les garde sur pagesjaunes.ca crée un partage d'entité dans Google et dans les moteurs IA. Les deux variantes sont lues comme des commerces distincts jusqu'à ce que le moteur les concilie, ce qui prend des semaines et affaiblit le signal de confiance entre-temps.
      </p>
      <p>
        La discipline est simple : choisissez une seule forme canonique avec accents et utilisez-la partout, y compris sur les annuaires en anglais. yellowpages.ca accepte les accents français dans le champ d'adresse sans difficulté, Yelp les accepte, GBP les accepte, Apple Business Connect les accepte. Bing Places retire parfois les accents lors de la normalisation, alors vérifiez la fiche après soumission. Facebook accepte les accents mais son validateur d'adresse signale parfois des adresses québécoises valides; dans ce cas, sauvegardez la fiche manuellement au-delà du validateur.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Pour le guide d'industrie restaurant spécifiquement, voyez <InternalLink to="/industries/restaurants" title="Guide industrie restauration" description="SEO local et AI Visibility pour les restaurants et la restauration au Québec" />. Le guide couvre le schéma de menu, l'intégration OpenTable, la cadence photo et la pile de citations Yelp plus Yellow Pages plus Pages Jaunes comme un flux coordonné.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="mesurer-l-impact-pack-local-et-moteurs-ia">Mesurer l'impact sur le pack local et les moteurs IA</h2>
      <p>
        La bonne mesure tourne sur deux surfaces en parallèle. Côté pack local, suivez la part de voix sur une grille verrouillée de requêtes à forte intention (meilleur restaurant italien Plateau, livraison de sushi Mile End, restaurant familial Laval, brunch Vieux-Port) sur la fenêtre de nettoyage de six semaines. Un nettoyage NAP propre fait habituellement grimper la part de voix dans le pack local de 8 à 15 points sur le premier trimestre, avec la majorité de la hausse aux semaines 6 à 10 après la fin du nettoyage.
      </p>
      <p>
        Côté moteurs IA, lancez une sonde hebdomadaire sur ChatGPT, Perplexity, Claude, Gemini, Bing Copilot et Google AIO sur le même ensemble de requêtes. Suivez la part de citations, le pourcentage de requêtes où le commerce est nommé dans la réponse IA avec une attribution propre. AiLys mène cette sonde automatiquement dans l'audit AI Visibility. Pour le pôle d'audit, voyez <InternalLink to="/audit" title="Audit AI Visibility gratuit" description="Inclut le scan des citations NAP, la sonde GBP et la part de citations des moteurs IA" />.
      </p>

      <SectionDivider />

      <h2 id="erreurs-frequentes-de-nettoyage">Erreurs fréquentes de nettoyage</h2>
      <p>
        Trois schémas font dérailler les nettoyages NAP chez la plupart des commerces locaux. Chacun coûte du temps et de la confiance de citation.
      </p>

      <ol>
        <li>Modifier les fiches en double au lieu de les fusionner. Si une fiche Yellow Pages a un doublon issu de données extraites, demandez au soutien YP de fusionner les dossiers plutôt que de corriger l'un et d'ignorer l'autre. Corriger le mauvais doublon laisse le mauvais NAP en ligne.</li>
        <li>Utiliser la traduction automatique pour la description française. La description de 250 caractères sur pagesjaunes.ca devrait être rédigée à la main en français du Québec, pas traduite depuis la description anglaise. La traduction automatique brise la discipline de graphie régionale que Google lit.</li>
        <li>Sauter le scan de vérification à la semaine 6. Plusieurs extracteurs réécrivent les fiches avec des données périmées dans les 30 jours suivant le nettoyage. Le scan de vérification attrape les retours en arrière et déclenche une correction de second passage avant que le mauvais NAP ne se propage à nouveau dans le graphe de citations.</li>
      </ol>

      <p>
        AiLys livre le nettoyage avec la construction du dossier canonique, les descriptions bilingues rédigées à la main, la discipline fusionner-pas-modifier sur les fiches en double, et le scan de vérification de la semaine 6. Pour les opérateurs au palier Starter, le nettoyage est livré en mandat ponctuel à 1 499 dollars CAD pour une portée de 50 annuaires.
      </p>

      <InlineCTA variant="book" text="Vous voulez une revue de 60 minutes du nettoyage des citations Yelp, Yellow Pages Canada et Pages Jaunes pour votre commerce québécois? Sans pitch." buttonText="Réserver un appel" />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          "Oui, inscrivez-vous sur Yelp et Yellow Pages. Ajoutez Pages Jaunes (pagesjaunes.ca) pour le Québec, la marque française de Yellow Pages Canada sous la même société mère.",
          "La cohérence NAP entre les trois compte plus que le choix d'un annuaire. Verrouillez un dossier canonique avant tout nettoyage.",
          "Un nettoyage de 50 annuaires tourne sur un échéancier de six semaines avec un opérateur qui travaille deux heures par jour.",
          "Les accents québécois sur les noms de rue français doivent être identiques sur toutes les citations. Un écart crée un partage d'entité dans Google et les moteurs IA.",
          "Lancez un scan de vérification à la semaine 6 pour attraper les retours en arrière des extracteurs avant que le mauvais NAP ne se propage.",
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
        alt="Résultats de scan de vérification montrant les NAP appariés sur Yelp, Yellow Pages, Pages Jaunes, GBP et Apple Business Connect pour un restaurant québécois"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
