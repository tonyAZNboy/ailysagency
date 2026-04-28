import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/config/app";

/**
 * Conditions de service AiLys Agency, version FR-CA.
 * Rendu par TermsOfService.tsx quand useLang().lang === "fr".
 */

export function TermsContentFr({ currentYear }: { currentYear: number }) {
  return (
    <div className="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les présentes Conditions de service (« Conditions ») régissent votre accès et utilisation du site web d'AiLys Agency à <strong>ailysagency.ca</strong> ainsi que tout mandat de consultation conclu avec AiLys Agency (« AiLys », « nous », « notre »). En accédant au site ou en signant un contrat de consultation, vous acceptez d'être lié par ces Conditions.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. À propos d'AiLys Agency</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          AiLys Agency est une agence québécoise de réputation en recherche IA. Nous offrons des services de consultation qui aident les commerces locaux et les marques à se faire citer dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews et Bing Copilot. Notre travail couvre :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>SEO technique et travail on-page</li>
          <li>Gestion de Google Business Profile, construction de citations et cohérence NAP</li>
          <li>Déploiement de schema AEO (Answer Engine Optimization)</li>
          <li>Travail d'autorité d'entité GEO (Generative Engine Optimization) sur Wikidata et données structurées</li>
          <li>Production de contenu E-E-A-T (Experience, Expertise, Authoritativeness, Trust)</li>
          <li>Mesure et rapports de visibilité IA et trafic IA</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Les ajouts optionnels comprennent le système de réputation Reviuzy (livré via notre produit jumeau Reviuzy SaaS), Domain Shield, Domain Speed Boost et un stratège dédié. Chaque ajout est régi par ces Conditions ainsi que les conditions spécifiques communiquées à l'inscription.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Plans, tarifs et annulation</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous offrons quatre plans mensuels : Starter (300 $ CAD), Core (600 $ CAD), Growth (1 200 $ CAD) et Agency (2 500 $ CAD). Les plans sont mois par mois. Vous pouvez annuler en donnant un préavis écrit de deux semaines (un courriel suffit) avant le prochain cycle de facturation. Nous n'exigeons pas de contrat à long terme et il n'y a aucune reprise sur le schema, les citations ou le contenu livrés avant l'annulation.
        </p>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Une garantie de satisfaction de 30 jours s'applique à chaque plan. Si, dans les 30 premiers jours, nous n'avons pas livré un schema, une citation ou un contenu mesurable convenu dans votre document de démarrage, nous remboursons le premier mois en totalité. La garantie couvre le plan de base ; les ajouts sont remboursés au prorata.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          Les prix sont en dollars canadiens. Les taxes (TPS/TVQ ou TVA applicable) sont ajoutées à la facture. Nous ne calculons pas au prorata les ajouts ou retraits en milieu de cycle ; les changements prennent effet à la prochaine date de facturation.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Le programme Clients fondateurs</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les dix premiers clients qui signent un contrat de consultation reçoivent un rabais de 50 % sur leur niveau de plan (Starter, Core, Growth ou Agency) pour la durée de vie de l'abonnement, verrouillé à l'inscription. Les Clients fondateurs reçoivent aussi une livraison prioritaire (audit en 12 heures, schema en semaine 1), un accès direct au stratège et une étude de cas publiée sur consentement avec droit d'approbation sur chaque métrique, nom et citation. La garantie de satisfaction de 30 jours s'applique. Pour postuler, lancez un audit de visibilité IA gratuit à <Link to="/audit" className="text-primary underline">/audit</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Responsabilités du client</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Pour que nous puissions livrer le travail convenu, vous acceptez :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>De fournir des informations commerciales exactes (nom, adresse, téléphone, heures, catégorie) et de nous tenir informés des changements</li>
          <li>D'accorder les accès requis pour effectuer le travail (accès propriétaire à Google Business Profile, accès au CMS ou à l'hébergement du site, accès aux comptes sociaux pertinents)</li>
          <li>D'approuver les schemas, brouillons de contenu et soumissions de citations dans un délai raisonnable (nous demandons une réponse dans les 5 jours ouvrables ; des délais plus longs peuvent ralentir la livraison)</li>
          <li>De ne pas engager une autre agence pour faire le même travail en parallèle sans nous le dire ; le travail conflictuel peut annuler la garantie de satisfaction</li>
          <li>De payer les factures dans les 14 jours suivant la réception</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Travail assisté par IA</h2>
        <p className="text-muted-foreground leading-relaxed">
          Certaines parties de notre livraison sont accélérées par notre moteur AI interne (que nous désignons génériquement comme « le moteur AiLys » dans nos communications client). Les sorties assistées par IA incluent les brouillons de schema, les briefs de contenu, les brouillons de réponses aux avis et le scoring de visibilité IA. Chaque sortie assistée par IA est révisée par un stratège humain avant d'être livrée ou publiée. Vous conservez les droits d'approbation finale sur tout contenu publié sous votre nom. Nous ne sommes pas responsables des conséquences résultant de la publication de contenu assisté par IA que vous avez approuvé sans révision.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Propriété intellectuelle</h2>
        <p className="text-muted-foreground leading-relaxed">
          Le nom AiLys Agency, le logo, les documents méthodologiques et les termes propriétaires (Share of Model, moteur AiLys, score AiLys) sont notre propriété intellectuelle. Les schemas, contenus, citations et rapports que nous produisons pour vous deviennent votre propriété au moment de la livraison ; vous pouvez continuer à les utiliser après la fin du contrat. Nous conservons le droit d'utiliser votre engagement (anonymisé, sauf si vous optez pour une étude de cas publiée) dans nos références internes et notre matériel marketing agrégé.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Confidentialité</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les deux parties gardent confidentielles les informations confidentielles. Nous ne partagerons pas vos données de performance commerciale, votre trafic, vos listes de clients ou vos documents internes avec des tiers sans votre consentement écrit. Nous pouvons partager des données de référence anonymisées et agrégées (par exemple, le taux médian de citations parmi les cliniques dentaires Core) là où aucun client individuel ne peut être identifié.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. Limitation de responsabilité</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous ne garantissons pas un classement de recherche spécifique, des citations dans les moteurs IA, des comptes de trafic ou des conversions. Les moteurs de recherche IA sont des systèmes tiers avec leurs propres algorithmes ; les résultats dépendent de facteurs hors de notre contrôle. Notre responsabilité totale pour toute réclamation découlant de ces Conditions ou de nos services est limitée aux frais que vous nous avez payés au cours des trois mois précédant la réclamation. Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Vie privée et protection des données</h2>
        <p className="text-muted-foreground leading-relaxed">
          Notre traitement des données personnelles est régi par notre <Link to="/privacy" className="text-primary underline">Politique de confidentialité</Link>. Nous nous conformons à la Loi 25 (Quebec), à la LPRPDE (fédéral canadien) et, le cas échéant, au RGPD (UE/UK) et au CCPA (Californie). L'utilisation des témoins sur le site web est régie par notre <Link to="/cookies" className="text-primary underline">Politique sur les témoins</Link>.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">11. Droit applicable et litiges</h2>
        <p className="text-muted-foreground leading-relaxed">
          Ces Conditions sont régies par les lois de la province de Quebec et les lois fédérales du Canada qui s'y appliquent. Tout litige découlant de ces Conditions ou des services sera porté devant les tribunaux du district judiciaire de Montreal, Quebec, à moins que les lois impératives de protection du consommateur de votre juridiction d'origine n'exigent autrement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">12. Modifications de ces conditions</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous pouvons mettre à jour ces Conditions lorsque notre service ou la loi change. Les modifications matérielles sont communiquées par courriel au moins 30 jours avant leur entrée en vigueur. L'utilisation continue du site web ou du service après la date d'entrée en vigueur constitue l'acceptation des Conditions mises à jour.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">13. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour les questions sur ces Conditions, sur le service, ou pour donner le préavis d'annulation à la section 3 :
        </p>
        <div className="mt-3 p-4 rounded-lg border border-border/40 bg-card/30">
          <p className="text-foreground font-medium">AiLys Agency</p>
          <p className="text-muted-foreground text-sm">Montreal, Quebec, Canada</p>
          <p className="text-muted-foreground text-sm">
            Courriel : <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a>
          </p>
        </div>
      </section>

      <p className="text-xs text-muted-foreground/60 pt-8 border-t border-border/30">
        © {currentYear} AiLys Agency. Tous droits réservés.
      </p>
    </div>
  );
}
