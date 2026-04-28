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
import { meta } from './medical-clinic-ai-visibility-guide'

export const metaFr: BlogPostMeta = {
  ...meta,
  title: 'AI Visibility pour cliniques médicales, comment obtenir des citations en 2026',
  metaDescription:
    'Le SEO local des cliniques médicales a changé. Voici le plan AI Visibility qui obtient des citations dans ChatGPT, Perplexity, Google AIO et Bing Copilot en 2026.',
  tldr: "Les cliniques médicales obtiennent des citations dans les moteurs IA en combinant un GBP vérifié, des fiches Healthgrades et provinciales avec un NAP propre, des signatures de médecins avec leurs accréditations, des photos originales de clinique avec EXIF, et un contenu FAQ structuré. La plupart des cliniques québécoises en ont une ou deux. Celles qui ont les cinq se font nommer.",
  faqItems: [
    {
      question: "Comment les cliniques médicales obtiennent-elles des citations dans les moteurs IA?",
      answer:
        "Les citations de cliniques médicales suivent cinq couches. Un Google Business Profile vérifié avec la bonne catégorie principale, un triplet NAP propre sur Healthgrades, RateMDs et les annuaires provinciaux, des signatures de médecins exposant les accréditations dans le schéma, des photos originales de clinique avec métadonnées EXIF, et des pages FAQ qui répondent à de vraies questions de patients. Les cliniques qui livrent quatre couches sur cinq apparaissent dans ChatGPT et Perplexity en environ 60 jours.",
    },
    {
      question: "Quelle est la meilleure catégorie principale GBP pour une clinique médicale?",
      answer:
        "Utilisez la catégorie principale la plus précise qui correspond à votre service. Une clinique familiale doit choisir Médecin de famille, pas Clinique médicale. Une clinique sans rendez-vous doit choisir Clinique sans rendez-vous. Une pratique spécialisée doit correspondre à la spécialité exacte (Dermatologue, Pédiatre, Endocrinologue). La mauvaise catégorie principale coupe le volume de requêtes vocales d'environ 40 %, parce que Google achemine la voix par récupération catégorie d'abord.",
    },
    {
      question: "Les moteurs IA citent-ils des contenus médicaux de cliniques locales ou seulement des grands sites?",
      answer:
        "Les deux, mais la logique de citation diffère. Les grands sites comme la Mayo Clinic ou la Cleveland Clinic gagnent les questions médicales générales. Les cliniques locales gagnent les requêtes ancrées dans un lieu, comme « clinique sans rendez-vous ouverte samedi à Laval » ou « pédiatre qui accepte de nouveaux patients à Québec ». La citation locale dépend de la complétude du GBP, de la cohérence NAP sur les annuaires de santé, et des signatures de médecins que le moteur peut vérifier dans un registre de licences.",
    },
    {
      question: "Comment ajouter des signatures de médecins auxquelles les moteurs IA font confiance?",
      answer:
        "Ajoutez un schéma Person sur la page bio de chaque clinicien. Incluez le nom, jobTitle, hasCredential avec le nom de l'organisme délivrant la licence (CMQ pour les médecins du Québec, équivalent pour les autres provinces), affiliation avec la clinique, et liens sameAs vers PubMed, ResearchGate ou le registre public du collège provincial. ChatGPT et Perplexity vérifient les accréditations avant de citer, et les signatures sans accréditations vérifiables sont filtrées des réponses médicales.",
    },
    {
      question: "Combien de temps faut-il pour que l'AI Visibility se mette en place pour une clinique?",
      answer:
        "La correction en 24 heures, c'est la catégorie GBP et la revendication Healthgrades ou RateMDs. La correction sur 30 jours, c'est le nettoyage NAP sur les quatre annuaires de santé centraux et le déploiement du schéma médecin. La correction sur 90 jours, c'est la photo originale de clinique avec EXIF, la FAQ pour les 30 questions les plus fréquentes, et un lien entrant d'une autorité régionale en santé ou d'une mention médiatique. Le taux de citation augmente généralement en deux vagues, autour des semaines 4 et 10.",
    },
  ],
  headings: [
    { id: 'pourquoi-les-cliniques-perdent-la-course-aux-citations-ia', text: 'Pourquoi la plupart des cliniques perdent la course aux citations IA' },
    { id: 'couche-1-google-business-profile-et-categories-medicales', text: 'Couche 1 : Google Business Profile et catégories médicales' },
    { id: 'couche-2-citations-d-annuaires-de-sante', text: 'Couche 2 : citations d\'annuaires de santé et propreté du NAP' },
    { id: 'couche-3-signatures-de-medecins-et-schema-d-accreditation', text: 'Couche 3 : signatures de médecins et schéma d\'accréditation' },
    { id: 'couche-4-photographie-de-clinique-et-marqueurs-d-experience', text: 'Couche 4 : photos originales de clinique et marqueurs d\'expérience' },
    { id: 'couche-5-faq-patients-et-contenu-structure', text: 'Couche 5 : pages FAQ patients et contenu structuré' },
    { id: 'le-plan-ai-visibility-clinique-medicale-en-90-jours', text: 'Le plan AI Visibility clinique médicale en 90 jours' },
    { id: 'faq', text: 'Questions fréquentes' },
  ],
}

export function ContentFr() {
  return (
    <article>
      <p>
        Le SEO local des cliniques médicales est passé du classement de liens bleus aux citations dans les moteurs IA. Les patients posent maintenant à ChatGPT, Perplexity, Google AIO et Bing Copilot des questions comme « meilleure clinique sans rendez-vous ouverte samedi à Laval » ou « pédiatre qui accepte de nouveaux patients près de chez moi », et les moteurs répondent avec trois cliniques nommées. Si la vôtre n'en fait pas partie, le patient ne visite jamais votre site. Cinq couches déterminent qui se fait nommer, et la plupart des cliniques en livrent une ou deux.
      </p>

      <StatHighlight
        stats={[
          { value: '5 couches', label: 'Décident qui est nommé dans les réponses IA cliniques' },
          { value: '~60 jours', label: 'Pour qu\'une pile propre apparaisse dans les citations' },
          { value: '~40 %', label: 'Volume de requêtes vocales perdu par une mauvaise catégorie GBP' },
        ]}
      />

      <SectionDivider />

      <h2 id="pourquoi-les-cliniques-perdent-la-course-aux-citations-ia">Pourquoi la plupart des cliniques perdent la course aux citations IA</h2>
      <p>
        Le plan SEO médical classique (longs articles, maillage interne, backlinks larges) a été conçu pour un moteur qui classait des sites Web. Les moteurs IA récupèrent. Ils tirent une courte liste d'entités nommées pour une requête, évaluent chaque entité contre un graphe de citations, et renvoient les trois premières. Une clinique avec un site parfait mais un GBP mal configuré et un Healthgrades abandonné perd contre une clinique au site plus rugueux mais à la pile d'entités propre.
      </p>
      <p>
        Dans les cliniques québécoises auditées fin 2025, les écarts les plus fréquents étaient une catégorie GBP principale générique (Clinique médicale au lieu de Médecin de famille), une fiche Healthgrades périmée avec un téléphone qui ne correspondait plus, et zéro schéma médecin sur les pages bio. Chaque écart coûte à peu près la même chose : une chute de la part de citation de 15 à 25 % dans nos données de sondage internes.
      </p>

      <CalloutBox type="info" translatedLabel="Le saviez-vous?">
        <p>Les moteurs IA n'indexent pas votre site comme Googlebot. Ils construisent un index de récupération à partir d'un graphe de citations à plusieurs couches. Si votre clinique apparaît de manière constante dans ce graphe, vous êtes nommée. Si elle apparaît de manière incohérente ou partielle, le moteur choisit l'option plus propre.</p>
      </CalloutBox>

      <InlineCTA variant="audit" text="Vous voulez voir laquelle des cinq couches manque à votre clinique? Lancez l'AI Visibility Audit gratuit en 24 heures." buttonText="Lancer l'audit gratuit" />

      <SectionDivider />

      <h2 id="couche-1-google-business-profile-et-categories-medicales">Couche 1 : Google Business Profile et catégories médicales</h2>
      <p>
        Votre GBP est la colonne vertébrale de votre AI Visibility. La plus coûteuse erreur que l'on observe est l'usage de « Clinique médicale » comme catégorie principale alors qu'une catégorie plus précise existe. Médecin de famille, Clinique sans rendez-vous, Dermatologue, Pédiatre, Endocrinologue, Podiatre, Psychologue. Choisissez la précise. Les requêtes vocales transitent par une récupération catégorie d'abord, et une catégorie générique coupe le volume vocal d'environ 40 %.
      </p>
      <p>
        Au-delà de la catégorie principale, remplissez chaque attribut pertinent. Langues parlées (français, anglais, espagnol, mandarin, arabe). Entrée accessible en fauteuil roulant. Bouton acceptation de nouveaux patients. Lien de prise de rendez-vous en ligne. Assurances acceptées. Ces attributs alimentent l'algorithme de requêtes contraintes qui propulse « pédiatre qui accepte de nouveaux patients près de moi » et autres recherches longue traîne.
      </p>

      <h3>Les cinq attributs GBP qui font bouger les citations cliniques</h3>
      <ol>
        <li>Catégorie principale au niveau de spécificité maximal</li>
        <li>Catégories secondaires pour les sous-spécialités (jusqu'à 9)</li>
        <li>Langues parlées sur chaque profil de médecin</li>
        <li>Bouton acceptation de nouveaux patients activé, statut à jour</li>
        <li>URL de prise de rendez-vous direct sur le domaine de la clinique (sans redirection tierce)</li>
      </ol>

      <SectionDivider />

      <h2 id="couche-2-citations-d-annuaires-de-sante">Couche 2 : citations d'annuaires de santé et propreté du NAP</h2>
      <p>
        Après le GBP, les moteurs IA puisent dans une liste serrée d'annuaires de santé. Pour le Québec et le Canada, les cibles à fort poids sont Healthgrades, RateMDs, le registre public du Collège des médecins du Québec, le moteur de recherche provincial relié à la RAMQ quand il s'applique, et Bonjour Sante pour la première ligne. Ajoutez Doctolib et Maple si la clinique offre des consultations virtuelles. Une mention sur Healthgrades pèse plus que dix sur de petits annuaires, parce que le graphe de citations pondère l'autorité de domaine.
      </p>
      <p>
        La cohérence NAP (nom, adresse, téléphone) est le signal sous-estimé. La couche de récupération évalue la cohérence du nom au niveau de l'entité. Un seul triplet NAP incohérent coupe les chances de citation de moitié. Les cliniques avec trois formats de téléphone différents sur Healthgrades, RateMDs et GBP apparaissent environ deux fois moins souvent que celles avec un téléphone canonique unique. <InternalLink to="/services/local-seo" title="SEO local et nettoyage des citations" description="Comment AiLys mène l'audit NAP sur les annuaires de santé" /> gère l'audit et la réécriture sur les quatre cibles.
      </p>

      <CalloutBox type="tip" translatedLabel="Conseil">
        <p>Le format du téléphone compte : choisissez un format canonique (par exemple +1 514 555 0123 avec espaces, sans parenthèses) et reproduisez-le partout. La couche de récupération traite (514) 555-0123, 514-555-0123 et 514.555.0123 comme trois entités téléphoniques distinctes, même si les humains les lisent comme un seul numéro. Choisissez-en un et appliquez-le à chaque annuaire.</p>
      </CalloutBox>

      <img
        src={meta.images.mid}
        alt="Tableau d'audit NAP montrant quatre annuaires de santé avec des formats de téléphone incohérents pour une seule clinique"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />

      <SectionDivider />

      <h2 id="couche-3-signatures-de-medecins-et-schema-d-accreditation">Couche 3 : signatures de médecins et schéma d'accréditation</h2>
      <p>
        Le contenu médical est traité comme « Your Money or Your Life » par chaque moteur IA. La pénalité pour les affirmations médicales non vérifiées est sévère : le moteur refuse de citer la source. La correction passe par les signatures de médecins avec un schéma d'accréditation. Ajoutez un schéma Person sur chaque page bio de clinicien. Incluez name, jobTitle, hasCredential avec l'organisme délivrant la licence, affiliation avec l'Organization clinique, et liens sameAs vers PubMed, ResearchGate ou le registre public du collège provincial.
      </p>
      <p>
        Pour le Québec, le registre public du Collège des médecins du Québec est la cible sameAs la plus importante. ChatGPT et Perplexity recoupent le nom et le numéro de licence du médecin avec le registre public avant de citer. Une page bio sans lien de licence vérifiable est écartée des réponses médicales, même si le GBP de la clinique et Healthgrades sont parfaits.
      </p>

      <h3>Champs de schéma médecin minimums</h3>
      <ul>
        <li>name et additionalName pour les accents et variantes latines</li>
        <li>jobTitle en langage simple (« Médecin de famille », « Pédiatre »)</li>
        <li>medicalSpecialty avec le vocabulaire contrôlé</li>
        <li>hasCredential avec credentialCategory « licence » et recognizedBy le collège provincial</li>
        <li>affiliation reliant à l'Organization de la clinique</li>
        <li>sameAs avec l'URL du profil dans le registre public</li>
      </ul>

      <QuickQuiz
        translatedLabel="Quiz éclair"
        translatedCorrect="Bonne réponse!"
        translatedNotQuite="Pas tout à fait."
        question="Quelle cible sameAs compte le plus pour le schéma médecin d'une clinique du Québec?"
        options={[
          'Une URL de profil LinkedIn',
          'Le registre public du Collège des médecins du Québec',
          'Une fiche Healthgrades',
          'Une page Instagram de la clinique',
        ]}
        correctIndex={1}
        explanation="ChatGPT et Perplexity recoupent le nom et le numéro de licence du médecin avec le registre public provincial avant de citer du contenu médical. Une page bio sans lien de licence vérifiable est filtrée des réponses médicales, même si le GBP et Healthgrades sont parfaits."
      />

      <SectionDivider />

      <h2 id="couche-4-photographie-de-clinique-et-marqueurs-d-experience">Couche 4 : photos originales de clinique et marqueurs d'expérience</h2>
      <p>
        Les photos de banque nuisent aux citations cliniques. Les moteurs IA pénalisent désormais activement les pages médicales qui semblent générées ou mises en scène. La correction passe par la photo originale de l'intérieur de la clinique, du comptoir d'accueil, des salles d'examen et des médecins. Les photos doivent porter des métadonnées EXIF : modèle d'appareil, date de capture, coordonnées GPS dans le quartier de la clinique. Les moteurs traitent l'EXIF comme un marqueur d'expérience.
      </p>
      <p>
        Les pages de témoignages de patients avec prénoms et dates aident aussi, à condition que les témoignages soient réels et que la clinique documente le consentement du patient. Une page avec trois témoignages prénommés, une photo de l'auteur quand le consentement est donné, et une date de visite documentée hausse mesurablement le taux de citation dans notre cohorte de 60 jours. Les carrousels génériques « ce que disent nos patients » sans nom ni date n'apportent rien.
      </p>

      <CalloutBox type="warning" translatedLabel="Attention">
        <p>Le retrait de l'EXIF au téléversement est un comportement par défaut fréquent sur WordPress et Wix. Auditez la médiathèque après chaque mise à jour de thème, parce que la compression des extensions réécrit l'EXIF en silence et le marqueur d'expérience disparaît. La correction passe par un seul pipeline de téléversement qui préserve la date de capture et le GPS pour les photos de clinique seulement.</p>
      </CalloutBox>

      <SectionDivider />

      <h2 id="couche-5-faq-patients-et-contenu-structure">Couche 5 : pages FAQ patients et contenu structuré</h2>
      <p>
        Les moteurs IA citent le contenu structuré à des taux beaucoup plus élevés que la prose en paragraphes seulement. Construisez une page FAQ patients qui répond aux 30 questions les plus fréquentes pour votre spécialité. Pour une clinique familiale, cela inclut « acceptez-vous de nouveaux patients », « comment prendre rendez-vous le jour même », « offrez-vous la téléconsultation », « quels sont vos frais de non-présentation », « acceptez-vous les sans rendez-vous après 17 h », « la clinique est-elle accessible en fauteuil roulant ». Encadrez chaque question-réponse dans un schéma FAQPage.
      </p>
      <p>
        Combinez la FAQ avec un schéma Service pour chaque service clinique offert (examen annuel, visite de bien-être enfant, dépistage en santé mentale, vaccination, intervention mineure). Le moteur recoupe le schéma Service avec la liste de services du GBP. Quand les deux concordent, la clinique apparaît dans les requêtes spécifiques au service comme « test ITSS sans rendez-vous Montréal » ou « évaluation TDAH pédiatre Québec ».
      </p>

      <InlineCTA variant="pricing" text="Voyez les quatre forfaits AiLys pensés pour les cliniques, citations et schémas inclus à partir de Core." buttonText="Voir les forfaits" />

      <SectionDivider />

      <KeyTakeaway
        translatedLabel="À retenir"
        points={[
          'Choisissez la catégorie principale GBP la plus précise. Médecin de famille bat Clinique médicale.',
          'Auditez quatre annuaires de santé chaque trimestre : Healthgrades, RateMDs, le registre public du collège provincial, et Bonjour Sante.',
          "Ajoutez un schéma Person avec hasCredential et un sameAs vers le registre public du Collège des médecins du Québec.",
          'Remplacez les photos de banque par des photos originales de clinique portant des métadonnées EXIF.',
          "Bâtissez une FAQ de 30 questions avec schéma FAQPage et un schéma Service pour chaque offre clinique.",
        ]}
      />

      <h2 id="le-plan-ai-visibility-clinique-medicale-en-90-jours">Le plan AI Visibility clinique médicale en 90 jours</h2>
      <p>
        Le plan se livre en trois vagues. Jours 1 à 7, on corrige les catégories GBP, les attributs et l'URL de prise de rendez-vous direct. Jours 8 à 30, on audite et on réécrit le NAP sur les quatre annuaires de santé et on déploie le schéma médecin sur chaque page bio. Jours 31 à 90, on produit la photographie originale de clinique, on bâtit la FAQ patients, et on gagne un lien entrant d'une autorité régionale en santé ou d'une mention médiatique. La plupart des cliniques voient le taux de citation grimper en deux vagues : une petite hausse vers la semaine 4 (GBP et NAP) et une plus grande vers la semaine 10 (schéma et FAQ).
      </p>
      <p>
        AiLys exécute ce plan dans les forfaits Core et Growth. Ou vous pouvez le faire vous-même avec le livrable d'audit fourni par notre <InternalLink to="/audit" title="Audit AI Visibility gratuit en 24 heures" description="L'audit clinique nomme les écarts dans les cinq couches" /> sondage. L'audit nomme chaque écart dans les cinq couches et liste les cibles d'annuaires exactes pour votre spécialité. Pour le contexte pilier sur la métrique rapportée par l'audit, voyez le guide <InternalLink to="/blog/share-of-model-metric-explained" title="Share of Model expliqué" description="La métrique de part de citations pour la recherche IA" />.
      </p>

      <InlineCTA variant="book" text="Vous voulez un appel stratégique de 60 minutes pour cartographier les cinq couches à votre spécialité? Réservez sans pitch, doc stratégique conservée." buttonText="Réserver un appel" />

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
        alt="Couverture du livrable d'audit AI Visibility clinique médicale avec vérifications GBP, NAP, schéma médecin et FAQ"
        className="w-full rounded-xl my-6"
        loading="lazy"
      />
    </article>
  )
}
