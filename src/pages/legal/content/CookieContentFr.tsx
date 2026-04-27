import { Link } from "react-router-dom";
import { APP_CONFIG } from "@/config/app";

/**
 * Politique sur les témoins AiLys Agency, version FR-CA.
 * Rendu par CookiePolicy.tsx quand useLang().lang === "fr".
 */

export function CookieContentFr({ currentYear }: { currentYear: number }) {
  return (
    <div className="prose prose-invert max-w-none space-y-8">
      <section>
        <h2 className="text-2xl font-semibold mb-4">1. Ce que sont les témoins</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les témoins (cookies) sont de petits fichiers texte stockés sur votre appareil quand vous visitez un site web. Nous utilisons aussi des technologies de navigateur comparables (localStorage, sessionStorage). Les deux sont couverts par la présente politique.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">2. Notre flux de consentement à deux choix</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Lors de votre première visite à ailysagency.ca, vous voyez une bannière avec deux boutons d'égale importance :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Tout accepter :</strong> les témoins fonctionnels, les témoins d'analyse et les pixels marketing sont chargés</li>
          <li><strong>Nécessaires seulement :</strong> seuls les témoins strictement requis pour faire fonctionner le site sont chargés ; pas d'analyse, pas de pixels marketing</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Les deux boutons ont la même taille, le même poids et le même emplacement, conformément aux règles de symétrie de la Loi 25 (Quebec) et de l'article 7 du RGPD. Il n'y a pas de panneau « Personnaliser » parce que le choix binaire est suffisamment granulaire pour les catégories de témoins que nous utilisons ; la présente page est la ventilation par catégorie pour les utilisateurs qui en veulent une. Vous pouvez changer votre décision à tout moment en effaçant les témoins du site dans votre navigateur, ce qui fait réapparaître la bannière.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">3. Catégories de témoins que nous utilisons</h2>

        <h3 className="text-xl font-medium mb-3">3a. Témoins nécessaires (toujours actifs)</h3>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Requis pour le fonctionnement du site. Ne peuvent pas être désactivés.
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Préférence de langue</strong> (localStorage) : retient la langue choisie (16 supportées)</li>
          <li><strong>Préférence de thème</strong> (localStorage) : retient le mode foncé/clair</li>
          <li><strong>Décision de consentement</strong> (localStorage) : retient votre choix pour que la bannière ne réapparaisse pas à chaque page</li>
          <li><strong>Sécurité Cloudflare</strong> (témoins) : mitigation de bots et limitation de débit en bordure</li>
        </ul>

        <h3 className="text-xl font-medium mb-3 mt-6">3b. Témoins d'analyse (chargés seulement sur « Tout accepter »)</h3>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous aident à comprendre comment le site est utilisé pour pouvoir l'améliorer. Données agrégées, sans profilage individuel.
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Pages vues, profondeur de défilement, temps sur page, page de provenance, type d'appareil, navigateur</li>
          <li>Événements de conversion : audit de visibilité IA soumis, formulaire de contact soumis</li>
        </ul>

        <h3 className="text-xl font-medium mb-3 mt-6">3c. Pixels marketing (chargés seulement sur « Tout accepter »)</h3>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Nous permettent d'afficher des annonces pertinentes sur des plateformes tierces et de mesurer la performance des campagnes.
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li><strong>Pixel Meta (Facebook et Instagram) :</strong> suivi de conversion et reciblage</li>
          <li><strong>LinkedIn Insight Tag :</strong> suivi de conversion et reciblage B2B</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-3">
          Nous ne chargeons pas Google Analytics, TikTok, X, ou aucun autre traceur non listé ci-dessus. Nous ne chargeons jamais de pixels marketing avant que vous ayez explicitement accepté.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">4. Services tiers qui posent des témoins</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-lg border border-border/40 bg-card/30">
            <p className="text-foreground font-medium">Cloudflare</p>
            <p className="text-muted-foreground text-sm">DNS, CDN et mitigation de bots. Pose des témoins nécessaires pour la sécurité et le routage.</p>
          </div>
          <div className="p-4 rounded-lg border border-border/40 bg-card/30">
            <p className="text-foreground font-medium">Supabase</p>
            <p className="text-muted-foreground text-sm">Authentification et base de données. Pose un témoin de session quand vous vous loguez à un portail client.</p>
          </div>
          <div className="p-4 rounded-lg border border-border/40 bg-card/30">
            <p className="text-foreground font-medium">Stripe</p>
            <p className="text-muted-foreground text-sm">Traitement des paiements. Peut poser des témoins de prévention de fraude sur les pages de paiement seulement.</p>
          </div>
          <div className="p-4 rounded-lg border border-border/40 bg-card/30">
            <p className="text-foreground font-medium">Meta et LinkedIn</p>
            <p className="text-muted-foreground text-sm">Pixels marketing. Chargés seulement après « Tout accepter ». Voir leurs pages respectives de confidentialité et de témoins pour la liste complète des témoins qu'ils posent.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">5. Comment gérer votre choix</h2>
        <p className="text-muted-foreground leading-relaxed mb-3">
          Vous pouvez changer votre consentement ou supprimer les témoins à tout moment :
        </p>
        <ul className="list-disc list-inside text-muted-foreground leading-relaxed space-y-1">
          <li>Effacer les témoins pour ailysagency.ca dans votre navigateur ; la bannière de consentement réapparaîtra à votre prochaine visite</li>
          <li>Utiliser les paramètres de confidentialité de votre navigateur pour bloquer entièrement les témoins tiers</li>
          <li>Écrire à <a href={`mailto:${APP_CONFIG.email}`} className="text-primary underline">{APP_CONFIG.email}</a> pour demander un dossier de toute décision de consentement que nous avons enregistrée</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">6. Do Not Track</h2>
        <p className="text-muted-foreground leading-relaxed">
          Les signaux « Do Not Track » des navigateurs ne sont pas interprétés de façon cohérente sur le web. Nous nous appuyons plutôt sur le flux de consentement à deux boutons explicite décrit à la section 2. Si votre navigateur envoie Global Privacy Control (GPC), nous le traitons comme une demande de défaut à « Nécessaires seulement » jusqu'à ce que vous optiez explicitement pour plus.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">7. Modifications de cette politique</h2>
        <p className="text-muted-foreground leading-relaxed">
          Nous mettons à jour cette Politique sur les témoins quand les technologies du site changent. Les modifications matérielles sont reflétées dans la date « Dernière mise à jour » et, là où c'est exigé, par une nouvelle demande de consentement.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
        <p className="text-muted-foreground leading-relaxed">
          Pour les questions sur les témoins ou pour exercer les droits de confidentialité décrits dans notre <Link to="/privacy" className="text-primary underline">Politique de confidentialité</Link> :
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
