import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/config/app";

/**
 * Politique de confidentialité AiLys Agency, version FR-CA.
 * Rendu par PrivacyPolicy.tsx quand useLang().lang === "fr".
 */

export function PrivacyContentFr({ currentYear }: { currentYear: number }) {
  return (
    <div className="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Qui nous sommes</h2>
        <p className="text-muted-foreground leading-relaxed">
          AiLys Agency (« AiLys », « nous », « notre ») est une agence de consultation québécoise qui aide les commerces locaux et les marques à se faire citer dans les réponses de ChatGPT, Perplexity, Claude, Gemini, Google AI Overviews et Bing Copilot. La présente Politique de confidentialité explique comment nous collectons, utilisons, partageons et protégeons les renseignements personnels à travers le site web marketing à <strong>ailysagency.ca</strong>, l'audit gratuit de visibilité IA, nos mandats de consultation et l'ajout optionnel du système de réputation Reviuzy. La plateforme Reviuzy SaaS elle-même est un produit séparé avec sa propre politique de confidentialité à reviuzy.com.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Quelles données nous collectons</h2>

        <h3 className="text-xl font-medium mb-3">Du site web et de l'audit</h3>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Nom du commerce, URL du site web et catégorie commerciale que vous soumettez au formulaire d'audit de visibilité IA</li>
          <li>Votre nom, courriel et (optionnel) téléphone, lorsque vous nous contactez ou postulez au programme Clients fondateurs</li>
          <li>Données techniques : adresse IP, user agent, page de provenance, pages consultées, langue, et localisation approximative au niveau de la ville (à partir de votre IP)</li>
          <li>Données de témoins et de consentement (voir notre <Link to="/cookies" className="text-primary underline">Politique sur les témoins</Link>)</li>
        </ul>

        <h3 className="text-xl font-medium mb-3 mt-6">Pendant un mandat de consultation</h3>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Données de profil commercial (NAP : nom, adresse, téléphone), heures, catégories, photos, liste des services</li>
          <li>Jetons d'accès ou identifiants que vous nous accordez pour Google Business Profile, votre CMS ou hébergement de site, et autres comptes connectés (stockés chiffrés, utilisés uniquement pour effectuer le travail)</li>
          <li>Schemas, brouillons de contenu, soumissions de citations et rapports que nous produisons en votre nom</li>
          <li>Renseignements de facturation et taxes nécessaires à l'émission des factures et au paiement (traités par Stripe ; nous ne stockons pas les numéros de carte complets)</li>
          <li>Communications avec notre équipe (fils de courriels, documents de démarrage, historique Slack ou clavardage si vous optez pour un canal partagé)</li>
        </ul>

        <h3 className="text-xl font-medium mb-3 mt-6">De l'ajout Reviuzy (optionnel)</h3>
        <p className="text-muted-foreground leading-relaxed">
          Si vous activez le système de réputation Reviuzy, le flux de données est décrit dans la politique de confidentialité Reviuzy SaaS. Les données typiques incluent : jetons de plateformes d'avis, contenu d'avis, brouillons de réponses orientées client et métriques de tendances d'avis. AiLys Agency ne reçoit que des rapports agrégés ; les données d'avis brutes sont conservées par Reviuzy SaaS sous ses propres règles de rétention.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Pourquoi nous les collectons (base légale)</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous traitons les données personnelles sur les bases légales suivantes en vertu de la Loi 25, de la LPRPDE et de l'article 6 du RGPD :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Exécution d'un contrat :</strong> pour livrer le travail de consultation pour lequel vous avez souscrit (audit, schema, citations, contenu, rapports)</li>
          <li><strong>Intérêt légitime :</strong> pour exploiter, sécuriser et améliorer le site web ; pour vous envoyer des mises à jour transactionnelles concernant un mandat actif ; pour conserver des références agrégées et anonymisées</li>
          <li><strong>Consentement :</strong> pour les témoins d'analyse, les pixels marketing (Meta, LinkedIn), les infolettres marketing et toute publication d'étude de cas</li>
          <li><strong>Obligation légale :</strong> pour conserver les dossiers fiscaux (comptabilité Quebec/Canada), pour répondre aux demandes légitimes et pour respecter les règles anti-fraude</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Comment nous les utilisons</h2>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Pour exécuter l'audit gratuit de visibilité IA et vous envoyer le résultat par courriel</li>
          <li>Pour vous accueillir, exécuter le SEO technique, le schema AEO, le travail d'entité GEO, les citations et le contenu</li>
          <li>Pour exploiter le moteur AiLys : générer des brouillons de schema, des briefs de contenu, des brouillons de réponses aux avis et le scoring de visibilité IA (chaque sortie assistée par IA est révisée par un stratège humain avant la livraison)</li>
          <li>Pour produire des rapports mensuels (Share of Model, AI Visibility, AI Traffic, nombre de citations) et des tableaux de bord</li>
          <li>Pour envoyer des factures, percevoir les paiements et respecter nos obligations fiscales et comptables</li>
          <li>Pour répondre aux questions de soutien et améliorer notre méthodologie</li>
          <li>Pour conduire des références agrégées et anonymisées et (avec votre consentement écrit) des études de cas publiées</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Avec qui nous les partageons</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous partageons les données personnelles uniquement avec les fournisseurs nécessaires à la livraison du service. Chaque fournisseur est lié par une entente de traitement de données et n'est autorisé à utiliser les données que selon nos instructions :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Supabase</strong> (base de données, authentification, stockage) pour l'audit de visibilité IA, le centre admin et les données de mandat</li>
          <li><strong>Cloudflare</strong> (DNS, CDN, hébergement Pages) pour le site web marketing et les fonctions edge</li>
          <li><strong>Stripe</strong> pour le traitement des paiements</li>
          <li><strong>Anthropic</strong> (Claude API) et autres fournisseurs de moteurs IA utilisés par le moteur AiLys pour la génération de sorties assistées par IA</li>
          <li><strong>Google</strong> (Google Business Profile API, OAuth) lorsque vous nous accordez l'accès à votre profil commercial</li>
          <li>Outils de <strong>courriel et d'analyse</strong> (fournisseur de courriel transactionnel, analyse web) lorsque strictement nécessaires</li>
          <li>Pixels publicitaires <strong>Meta et LinkedIn</strong>, uniquement quand vous avez consenti aux témoins marketing</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Nous ne vendons pas de données personnelles. Nous ne partageons pas de listes de clients avec d'autres agences ou avec des tiers à des fins de marketing.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Où vivent les données</h2>
        <p className="text-muted-foreground leading-relaxed">
          La plupart des données sont stockées dans une infrastructure infonuagique en région canadienne ou américaine (Supabase, Cloudflare, Stripe). Certains sous-traitants (Anthropic, Meta, LinkedIn, Google) peuvent traiter les données aux États-Unis ou dans d'autres juridictions. Nous nous appuyons sur des clauses contractuelles types, des décisions d'adéquation et des engagements de sécurité des sous-traitants pour les transferts transfrontaliers, comme l'exigent l'article 17 de la Loi 25 et le chapitre V du RGPD.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Combien de temps nous les gardons</h2>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Soumissions d'audit de visibilité IA :</strong> 24 mois, puis supprimées ou anonymisées</li>
          <li><strong>Données de mandat actif :</strong> pour la durée de vie du mandat et 24 mois après l'annulation, afin de pouvoir répondre aux litiges et reproduire les rapports historiques</li>
          <li><strong>Jetons d'accès aux comptes connectés :</strong> révoqués dans les 7 jours suivant la fin du mandat</li>
          <li><strong>Factures et dossiers fiscaux :</strong> 7 ans (exigence comptable Quebec et Canada)</li>
          <li><strong>Références agrégées et anonymisées :</strong> conservées indéfiniment, sans identifiabilité individuelle</li>
          <li><strong>Dossiers de consentement marketing :</strong> 36 mois, ou jusqu'à ce que vous retiriez votre consentement</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Vos droits</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Sous la Loi 25, la LPRPDE, le RGPD et le CCPA, vous avez le droit de :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Accéder aux données personnelles que nous détenons à votre sujet et en recevoir une copie</li>
          <li>Rectifier les données inexactes ou incomplètes</li>
          <li>Demander la suppression de vos données quand elles ne sont plus nécessaires à la finalité de leur collecte (droit à l'oubli)</li>
          <li>Retirer le consentement aux fins d'analyse, de marketing ou tout autre traitement basé sur le consentement, à tout moment</li>
          <li>Vous opposer au traitement basé sur l'intérêt légitime</li>
          <li>Portabilité des données : recevoir vos données dans un format structuré et lisible par machine</li>
          <li>Déposer une plainte auprès de la Commission d'accès à l'information du Quebec, du Commissaire à la protection de la vie privée du Canada, ou de votre autorité de protection des données locale</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Pour exercer ces droits, écrivez-nous à <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> avec le sujet « Demande de confidentialité ». Nous répondons dans les 30 jours (délai statutaire de la Loi 25).
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">9. Sécurité</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous suivons des pratiques de sécurité de niveau gouvernemental sur chaque fonctionnalité : sécurité au niveau des lignes (RLS) sur toutes les tables multi-locataires, jetons d'ingestion hachés (jamais bruts), limitation de débit en fenêtre glissante sur tout point d'accès public, jetons d'accès chiffrés, journaux d'audit sur chaque action privilégiée, et un centre admin où chaque action est journalisée et réversible. Nous suivons le principe du moindre privilège et révisons les accès trimestriellement. Aucun système n'est parfaitement sécurisé ; en cas de violation affectant vos données, nous vous notifions ainsi que les autorités pertinentes dans les délais exigés par la Loi 25 et la LPRPDE.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">10. Enfants</h2>
        <p className="text-muted-foreground leading-relaxed">
          Notre service est conçu pour les commerces et n'est pas destiné aux enfants de moins de 14 ans. Nous ne collectons pas sciemment de données personnelles de mineurs. Si vous croyez qu'un mineur a soumis des données, contactez-nous et nous les supprimerons.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">11. Modifications de cette politique</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous mettons à jour cette Politique de confidentialité quand notre service ou la loi change. Les modifications matérielles sont communiquées par courriel au moins 30 jours avant leur entrée en vigueur, et nous mettons à jour la date « Dernière mise à jour » en haut de cette page.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">12. Contact et Responsable de la protection des renseignements</h2>
        <p className="text-muted-foreground leading-relaxed">
          La Loi 25 nous oblige à désigner une personne responsable de la protection des renseignements personnels. Pour toute question, demande ou plainte de confidentialité :
        </p>
        <div className="mt-3 p-4 rounded-lg border border-border/40 bg-card/30">
          <p className="text-foreground font-medium">AiLys Agency, Responsable de la protection des renseignements</p>
          <p className="text-muted-foreground text-sm">Montreal, Quebec, Canada</p>
          <p className="text-muted-foreground text-sm">
            Courriel : <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> (sujet : « Confidentialité »)
          </p>
        </div>
      </section>

      <p className="text-xs text-muted-foreground/60 pt-8 border-t border-border/30">
        © {currentYear} AiLys Agency. Tous droits réservés.
      </p>
    </div>
  );
}
