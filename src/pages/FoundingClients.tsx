// Founding Clients application page.
//
// Dedicated page for local business owners to apply for the AiLys Agency
// Founding Clients Program: the first 10 cohort gets 50% off their plan
// forever, priority shipping, direct strategist access, and an opt-in
// published case study with right of approval over every metric, name, and
// quote. The discount is locked for the lifetime of the subscription.
//
// Routes:
//   /founding-clients, /:lang/founding-clients (EN canonical)
//   /clients-fondateurs, /:lang/clients-fondateurs (FR-CA)
//   /cho-chu-doanh-nghiep, /:lang/cho-chu-doanh-nghiep (VI)
//
// All copy lives in the COPY object below so EN/FR-CA/VI render natively
// without any translation API call (project rule, hand-authored only).
//
// Form submits to /api/founding-clients-apply (Cloudflare Pages Function
// with gov-grade input validation, honeypot, disposable-email reject).

import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { NetworkBackground } from "@/components/backgrounds/NetworkBackground";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLang } from "@/i18n/LangContext";
import { SUPPORTED_LANGS, type SupportedLang } from "@/i18n/index";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  CheckCircle2,
  Send,
  Sparkles,
  AlertCircle,
  Shield,
  Users,
  Megaphone,
  Calendar,
  Lock,
} from "lucide-react";

// ── Cohort + pricing constants ──────────────────────────────────────────────
const TOTAL_SLOTS = 10;
const SLOTS_TAKEN = 0; // bump when a founding client signs
const SLOTS_REMAINING = TOTAL_SLOTS - SLOTS_TAKEN;

const TIERS = [
  { id: "starter", regular: 300, founding: 150 },
  { id: "core", regular: 600, founding: 300 },
  { id: "growth", regular: 1200, founding: 600 },
  { id: "agency", regular: 2500, founding: 1250 },
] as const;

const VERTICALS = [
  "dentist",
  "lawyer",
  "restaurant",
  "contractor",
  "clinic",
  "real_estate",
  "hotel",
  "nail_salon",
  "other",
] as const;

// ── Copy in EN / FR-CA / VI (hand-authored, no API) ─────────────────────────
const COPY = {
  en: {
    metaTitle: "Apply for a Founding Spot · AiLys Agency",
    metaDescription:
      "First 10 local businesses to sign get 50% off their AiLys plan forever, priority shipping, direct strategist access, and an opt-in case study. No credit card to apply.",
    eyebrow: "Founding clients program",
    headline1: "We're new.",
    headline2: "That's the offer.",
    subheading:
      "AiLys Agency is bilingual EN and FR-CA, built for local businesses inside the AI search era. The first 10 owners who sign keep 50% off their plan forever. The discount stays locked for the lifetime of the subscription. Apply below in under 3 minutes.",
    spotsLeft: "spots left",
    pitchP1:
      "AiLys Agency was founded in 2026. We have run the methodology on our own site and on a small private cohort, but we have not earned the case-study volume to compete with $5,000+/mo agencies on social proof alone. So we are doing the honest thing: discount our work in exchange for being early and shipping fast.",
    pitchP2:
      "If your AI citations lift, we publish your story with attribution. You approve every word, every metric, every name. You can opt out and keep the discount. Real numbers, real attribution, real trust earned over 90 days.",
    benefitsHeading: "What you get",
    benefits: [
      { icon: "sparkles", title: "50% off your plan forever", body: "Lock half-price on Starter, Core, Growth, or Agency. Renewal price never increases. The discount stays for the lifetime of the subscription." },
      { icon: "users", title: "Direct strategist access", body: "Same strategist throughout your engagement. Slack channel for fast questions. Monthly 60-minute strategy review built into the plan." },
      { icon: "megaphone", title: "Published case study, opt-in", body: "If your AI citations lift, we publish your story with full right of approval. Opt out at any time and keep the discount." },
      { icon: "calendar", title: "Priority shipping queue", body: "Audit delivered in 12 hours instead of 24. Schema deployment in week 1 instead of week 2. Citation building starts day 1." },
    ],
    pricingHeading: "Your founding-client price, locked forever",
    pricingNote: "Standard pricing applies to new clients after the 10th founding signs. Your discount stays locked for as long as you keep the plan.",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "Regular",
    pricingFounding: "Founding",
    pricingPerMo: "/mo CAD",
    pricingSavings: "you save",
    termsHeading: "The fine print, in plain language",
    terms: [
      { label: "50% discount", body: "Applies to your plan tier (Starter, Core, Growth, or Agency) for the lifetime of your subscription. Locked in." },
      { label: "Case study", body: "100% opt-in. We publish only with your written consent and your right of approval over every metric, name, and quote. You can opt out at any time and keep the discount." },
      { label: "If results don't land", body: "30-day satisfaction guarantee applies. Full refund if you decide AiLys is not working for you. Honest is the only marketing we have." },
      { label: "Why 10 spots", body: "We have one strategist running founding accounts directly. 10 is the maximum carry without quality drop. We will hire and reopen the program when ready." },
      { label: "When the program closes", body: "Standard pricing applies to all new clients after the 10th founding client signs. Your founding discount stays locked." },
    ],
    formTitle: "Apply for a founding spot",
    formDescription: "Tell us about your business. We review weekly and respond within 48 hours. No credit card to apply.",
    fieldName: "Your name",
    fieldEmail: "Email",
    fieldPhone: "Phone (optional)",
    fieldBusinessName: "Business name",
    fieldWebsite: "Website",
    fieldGbpUrl: "Google Business Profile URL (optional)",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "City and province or state",
    fieldLocationPlaceholder: "Montreal, QC",
    fieldVertical: "Industry",
    verticals: {
      dentist: "Dental clinic",
      lawyer: "Law firm",
      restaurant: "Restaurant",
      contractor: "Contractor",
      clinic: "Medical clinic",
      real_estate: "Real estate",
      hotel: "Hotel",
      nail_salon: "Nail salon",
      other: "Other",
    },
    fieldTier: "Plan you are considering",
    tierOptions: { starter: "Starter ($300/mo)", core: "Core ($600/mo)", growth: "Growth ($1,200/mo)", agency: "Agency ($2,500/mo)", undecided: "Undecided, want to discuss" },
    fieldCurrentSeo: "What SEO or marketing have you done so far?",
    fieldCurrentSeoPlaceholder: "Worked with another agency, DIY, just GBP, nothing yet, etc.",
    fieldMotivation: "Why this program, why now?",
    fieldMotivationPlaceholder: "What is the result that would make this work for you?",
    errorName: "Please enter your name (at least 2 characters)",
    errorEmail: "Please enter a valid email",
    errorBusinessName: "Please enter your business name",
    errorWebsite: "Please enter a valid website URL starting with http",
    submit: "Submit application",
    submitting: "Submitting...",
    legal: "By submitting, you agree to our terms and privacy policy. We will only contact you about your application.",
    toastSuccessTitle: "Application received",
    toastErrorTitle: "Something went wrong",
    successHeading: "Thanks. You are in the review queue.",
    successBody: "We review founding-client applications weekly and respond within 48 hours. You will get an email from a real strategist with next steps. No automated drip campaign.",
    faqHeading: "Common questions",
    faqs: [
      { q: "Is there a catch?", a: "No. We discount the plan because we are new and want fast first cases. The 30-day satisfaction guarantee is real. The case study is opt-in. The discount stays locked for the lifetime of the subscription." },
      { q: "Do I need to commit to a long contract?", a: "No. All AiLys plans are month-to-month with two weeks notice to cancel. Founding clients keep the same flexibility." },
      { q: "What if I do not want a case study published?", a: "Opt out. Keep the discount. The case study is 100% optional and you have right of approval over every metric, name, and quote." },
      { q: "How do I know I will get value at half price?", a: "Same scope, same strategist, same priority queue. The only difference is the price. The 30-day satisfaction guarantee covers you if AiLys is not working." },
      { q: "What if AiLys raises standard prices later?", a: "Your founding-client price stays at 50% off whatever your tier costs at signup. We will not retroactively raise it." },
      { q: "Can I refer another business?", a: "Yes. Each founding spot is one signed business. If you refer a second one and they sign before the 10th spot fills, both get the founding deal." },
    ],
    canonicalUrl: "https://www.ailysagency.ca/contact",
    apiLang: "en",
  },
  fr: {
    metaTitle: "Postuler pour une place de fondateur · AiLys Agency",
    metaDescription:
      "Les 10 premiers commerces locaux qui signent obtiennent 50 % de rabais à vie sur leur forfait AiLys, livraison prioritaire, accès direct au stratège et une étude de cas optionnelle. Aucune carte de crédit pour postuler.",
    eyebrow: "Programme clients fondateurs",
    headline1: "On est nouveaux.",
    headline2: "C'est l'offre.",
    subheading:
      "AiLys Agency est bilingue EN et FR-CA, bâtie pour les commerces locaux dans l'ère de la recherche IA. Les 10 premiers propriétaires qui signent gardent 50 % de rabais à vie sur leur forfait. Le rabais reste verrouillé pour la durée de l'abonnement. Postulez ci-dessous en moins de 3 minutes.",
    spotsLeft: "places restantes",
    pitchP1:
      "AiLys Agency a été fondée en 2026. On a exécuté la méthodologie sur notre propre site et sur une petite cohorte privée, mais on n'a pas encore le volume d'études de cas pour rivaliser avec les agences à 5 000 $+/mois sur la preuve sociale seule. Alors on fait la chose honnête : on rabaisse le travail en échange d'arriver tôt et de livrer vite.",
    pitchP2:
      "Si vos citations IA augmentent, on publie votre histoire avec attribution. Vous approuvez chaque mot, chaque chiffre, chaque nom. Vous pouvez vous retirer et garder le rabais. Vrais chiffres, vraie attribution, vraie confiance bâtie en 90 jours.",
    benefitsHeading: "Ce que vous obtenez",
    benefits: [
      { icon: "sparkles", title: "50 % de rabais à vie sur votre forfait", body: "Verrouillez la moitié du prix sur Starter, Core, Growth ou Agency. Le prix de renouvellement n'augmente jamais. Le rabais reste pour la durée de l'abonnement." },
      { icon: "users", title: "Accès direct au stratège", body: "Même stratège tout au long de votre engagement. Canal Slack pour les questions rapides. Revue stratégique mensuelle de 60 minutes incluse au forfait." },
      { icon: "megaphone", title: "Étude de cas publiée, optionnelle", body: "Si vos citations IA augmentent, on publie votre histoire avec votre droit d'approbation complet. Retirez-vous en tout temps et gardez le rabais." },
      { icon: "calendar", title: "File de livraison prioritaire", body: "Audit livré en 12 heures au lieu de 24. Déploiement schema dès la semaine 1 au lieu de la semaine 2. Construction de citations dès le jour 1." },
    ],
    pricingHeading: "Votre prix de client fondateur, verrouillé à vie",
    pricingNote: "Le tarif standard s'applique aux nouveaux clients après la signature du 10e fondateur. Votre rabais reste verrouillé tant que vous gardez le forfait.",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "Régulier",
    pricingFounding: "Fondateur",
    pricingPerMo: " $ CAD/mois",
    pricingSavings: "économie",
    termsHeading: "Les petits caractères, en langage clair",
    terms: [
      { label: "Rabais 50 %", body: "S'applique à votre forfait (Starter, Core, Growth ou Agency) pour la durée de votre abonnement. Verrouillé." },
      { label: "Étude de cas", body: "100 % optionnel. On publie seulement avec votre consentement écrit et votre droit d'approbation sur chaque chiffre, nom et citation. Vous pouvez vous retirer en tout temps et garder le rabais." },
      { label: "Si les résultats n'arrivent pas", body: "La garantie satisfaction 30 jours s'applique. Remboursement complet si vous décidez qu'AiLys ne fonctionne pas. L'honnêteté est le seul marketing qu'on a." },
      { label: "Pourquoi 10 places", body: "On a un stratège qui gère les comptes fondateurs directement. 10 est le maximum sans baisse de qualité. On embauchera et rouvrira le programme quand prêt." },
      { label: "Quand le programme ferme", body: "Le tarif standard s'applique aux nouveaux clients après la signature du 10e fondateur. Votre rabais reste verrouillé." },
    ],
    formTitle: "Postuler pour une place de fondateur",
    formDescription: "Parlez-nous de votre commerce. On révise les candidatures hebdomadairement et répond en 48 heures. Aucune carte de crédit pour postuler.",
    fieldName: "Votre nom",
    fieldEmail: "Courriel",
    fieldPhone: "Téléphone (optionnel)",
    fieldBusinessName: "Nom de l'entreprise",
    fieldWebsite: "Site web",
    fieldGbpUrl: "URL de la fiche Google Business Profile (optionnel)",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "Ville et province",
    fieldLocationPlaceholder: "Montréal, QC",
    fieldVertical: "Secteur",
    verticals: {
      dentist: "Clinique dentaire",
      lawyer: "Cabinet d'avocats",
      restaurant: "Restaurant",
      contractor: "Entrepreneur en construction",
      clinic: "Clinique médicale",
      real_estate: "Immobilier",
      hotel: "Hôtel",
      nail_salon: "Salon de manucure",
      other: "Autre",
    },
    fieldTier: "Forfait considéré",
    tierOptions: { starter: "Starter (300 $/mois)", core: "Core (600 $/mois)", growth: "Growth (1 200 $/mois)", agency: "Agency (2 500 $/mois)", undecided: "Indécis, veux discuter" },
    fieldCurrentSeo: "Quel SEO ou marketing avez-vous fait jusqu'ici?",
    fieldCurrentSeoPlaceholder: "Travaillé avec une autre agence, en autonomie, juste GBP, rien encore, etc.",
    fieldMotivation: "Pourquoi ce programme, pourquoi maintenant?",
    fieldMotivationPlaceholder: "Quel résultat ferait que ça marche pour vous?",
    errorName: "Entrez votre nom (au moins 2 caractères)",
    errorEmail: "Entrez un courriel valide",
    errorBusinessName: "Entrez le nom de votre entreprise",
    errorWebsite: "Entrez une URL valide commençant par http",
    submit: "Soumettre la candidature",
    submitting: "Envoi en cours...",
    legal: "En soumettant, vous acceptez nos conditions et notre politique de confidentialité. On vous contactera seulement au sujet de votre candidature.",
    toastSuccessTitle: "Candidature reçue",
    toastErrorTitle: "Une erreur est survenue",
    successHeading: "Merci. Vous êtes dans la file de révision.",
    successBody: "On révise les candidatures fondateurs hebdomadairement et répond en 48 heures. Vous recevrez un courriel d'un vrai stratège avec les prochaines étapes. Aucune campagne courriel automatisée.",
    faqHeading: "Questions fréquentes",
    faqs: [
      { q: "Y a-t-il un piège?", a: "Non. On rabaisse le forfait parce qu'on est nouveau et qu'on veut nos premiers cas rapides. La garantie satisfaction 30 jours est réelle. L'étude de cas est optionnelle. Le rabais reste verrouillé pour la durée de l'abonnement." },
      { q: "Dois-je m'engager dans un long contrat?", a: "Non. Tous les forfaits AiLys sont au mois avec deux semaines de préavis pour annuler. Les clients fondateurs gardent la même flexibilité." },
      { q: "Et si je ne veux pas qu'on publie une étude de cas?", a: "Retirez-vous. Gardez le rabais. L'étude de cas est 100 % optionnelle et vous avez le droit d'approbation sur chaque chiffre, nom et citation." },
      { q: "Comment savoir que j'aurai de la valeur à moitié prix?", a: "Même portée, même stratège, même file prioritaire. La seule différence est le prix. La garantie satisfaction 30 jours vous couvre si AiLys ne fonctionne pas." },
      { q: "Et si AiLys augmente le tarif standard plus tard?", a: "Votre prix de fondateur reste à 50 % de ce que coûte votre forfait à la signature. On ne l'augmentera pas rétroactivement." },
      { q: "Puis-je référer une autre entreprise?", a: "Oui. Chaque place fondateur est une entreprise signée. Si vous référez une deuxième et qu'elle signe avant la 10e place, les deux obtiennent l'entente fondateur." },
    ],
    canonicalUrl: "https://www.ailysagency.ca/contacte",
    apiLang: "fr",
  },
  vi: {
    metaTitle: "Đăng ký vị trí khách hàng sáng lập · AiLys Agency",
    metaDescription:
      "10 doanh nghiệp địa phương đầu tiên ký kết được giảm 50% gói dịch vụ AiLys mãi mãi, ưu tiên triển khai, tiếp cận trực tiếp chiến lược gia và tùy chọn nghiên cứu trường hợp. Không cần thẻ tín dụng để đăng ký.",
    eyebrow: "Chương trình khách hàng sáng lập",
    headline1: "Chúng tôi mới ra mắt.",
    headline2: "Đó là lời đề nghị.",
    subheading:
      "AiLys Agency song ngữ EN và FR-CA, được xây dựng cho doanh nghiệp địa phương trong kỷ nguyên tìm kiếm AI. 10 chủ doanh nghiệp đầu tiên ký kết được giữ giảm 50% gói dịch vụ mãi mãi. Mức giảm giá được khóa trong suốt thời hạn đăng ký. Đăng ký bên dưới chỉ trong 3 phút.",
    spotsLeft: "vị trí còn lại",
    pitchP1:
      "AiLys Agency được thành lập năm 2026. Chúng tôi đã chạy phương pháp trên trang của chính mình và trên một nhóm khách hàng riêng nhỏ, nhưng chưa đủ khối lượng nghiên cứu trường hợp để cạnh tranh với các đại lý 5 000 $/tháng chỉ bằng bằng chứng xã hội. Vì vậy chúng tôi làm điều trung thực: giảm giá để được tham gia sớm và triển khai nhanh.",
    pitchP2:
      "Nếu các trích dẫn AI của bạn tăng, chúng tôi xuất bản câu chuyện của bạn có ghi nguồn. Bạn duyệt từng chữ, từng số liệu, từng tên. Bạn có thể từ chối và giữ nguyên mức giảm. Số liệu thật, ghi nguồn thật, niềm tin thật được xây dựng trong 90 ngày.",
    benefitsHeading: "Bạn nhận được gì",
    benefits: [
      { icon: "sparkles", title: "Giảm 50% gói dịch vụ mãi mãi", body: "Khóa nửa giá trên Starter, Core, Growth hoặc Agency. Giá gia hạn không bao giờ tăng. Mức giảm giữ nguyên trong suốt thời hạn đăng ký." },
      { icon: "users", title: "Tiếp cận trực tiếp chiến lược gia", body: "Cùng một chiến lược gia trong toàn bộ thời gian hợp tác. Kênh Slack để hỏi nhanh. Buổi đánh giá chiến lược 60 phút hàng tháng có sẵn trong gói." },
      { icon: "megaphone", title: "Nghiên cứu trường hợp được xuất bản, tùy chọn", body: "Nếu các trích dẫn AI tăng, chúng tôi xuất bản câu chuyện của bạn với quyền duyệt đầy đủ. Từ chối bất cứ lúc nào và giữ nguyên mức giảm." },
      { icon: "calendar", title: "Hàng đợi triển khai ưu tiên", body: "Báo cáo audit giao trong 12 giờ thay vì 24 giờ. Triển khai schema vào tuần 1 thay vì tuần 2. Xây dựng trích dẫn bắt đầu từ ngày 1." },
    ],
    pricingHeading: "Giá khách hàng sáng lập của bạn, khóa mãi mãi",
    pricingNote: "Giá tiêu chuẩn áp dụng cho khách hàng mới sau khi khách hàng sáng lập thứ 10 ký kết. Mức giảm của bạn được khóa miễn là bạn giữ gói.",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "Tiêu chuẩn",
    pricingFounding: "Sáng lập",
    pricingPerMo: " CAD/tháng",
    pricingSavings: "tiết kiệm",
    termsHeading: "Điều khoản chi tiết, bằng ngôn ngữ đơn giản",
    terms: [
      { label: "Giảm giá 50%", body: "Áp dụng cho gói (Starter, Core, Growth hoặc Agency) trong suốt thời hạn đăng ký. Khóa cố định." },
      { label: "Nghiên cứu trường hợp", body: "100% tùy chọn. Chỉ xuất bản khi bạn đồng ý bằng văn bản và có quyền duyệt từng số liệu, tên và trích dẫn. Bạn có thể từ chối bất cứ lúc nào và giữ nguyên mức giảm." },
      { label: "Nếu kết quả không đến", body: "Bảo đảm hài lòng 30 ngày áp dụng. Hoàn tiền đầy đủ nếu bạn quyết định AiLys không phù hợp. Trung thực là cách tiếp thị duy nhất chúng tôi có." },
      { label: "Tại sao chỉ 10 vị trí", body: "Chúng tôi có một chiến lược gia phụ trách trực tiếp tài khoản sáng lập. 10 là tối đa có thể đảm bảo không giảm chất lượng. Chúng tôi sẽ tuyển và mở lại chương trình khi sẵn sàng." },
      { label: "Khi chương trình đóng", body: "Giá tiêu chuẩn áp dụng cho khách hàng mới sau khi khách hàng sáng lập thứ 10 ký kết. Mức giảm sáng lập của bạn vẫn khóa." },
    ],
    formTitle: "Đăng ký vị trí khách hàng sáng lập",
    formDescription: "Cho chúng tôi biết về doanh nghiệp của bạn. Chúng tôi xem xét hàng tuần và phản hồi trong vòng 48 giờ. Không cần thẻ tín dụng để đăng ký.",
    fieldName: "Tên của bạn",
    fieldEmail: "Email",
    fieldPhone: "Số điện thoại (tùy chọn)",
    fieldBusinessName: "Tên doanh nghiệp",
    fieldWebsite: "Trang web",
    fieldGbpUrl: "URL Google Business Profile (tùy chọn)",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "Thành phố và tỉnh",
    fieldLocationPlaceholder: "Montreal, QC",
    fieldVertical: "Lĩnh vực",
    verticals: {
      dentist: "Phòng nha",
      lawyer: "Văn phòng luật",
      restaurant: "Nhà hàng",
      contractor: "Nhà thầu",
      clinic: "Phòng khám",
      real_estate: "Bất động sản",
      hotel: "Khách sạn",
      nail_salon: "Tiệm nail",
      other: "Khác",
    },
    fieldTier: "Gói đang cân nhắc",
    tierOptions: { starter: "Starter (300 $ CAD/tháng)", core: "Core (600 $ CAD/tháng)", growth: "Growth (1 200 $ CAD/tháng)", agency: "Agency (2 500 $ CAD/tháng)", undecided: "Chưa quyết, muốn trao đổi" },
    fieldCurrentSeo: "Bạn đã làm SEO hoặc marketing nào cho đến nay?",
    fieldCurrentSeoPlaceholder: "Đã làm với đại lý khác, tự làm, chỉ GBP, chưa làm gì, v.v.",
    fieldMotivation: "Tại sao chương trình này, tại sao bây giờ?",
    fieldMotivationPlaceholder: "Kết quả nào sẽ làm chương trình này hiệu quả với bạn?",
    errorName: "Vui lòng nhập tên (ít nhất 2 ký tự)",
    errorEmail: "Vui lòng nhập email hợp lệ",
    errorBusinessName: "Vui lòng nhập tên doanh nghiệp",
    errorWebsite: "Vui lòng nhập URL hợp lệ bắt đầu bằng http",
    submit: "Gửi đơn đăng ký",
    submitting: "Đang gửi...",
    legal: "Bằng cách gửi, bạn đồng ý với điều khoản và chính sách bảo mật của chúng tôi. Chúng tôi chỉ liên hệ về đơn đăng ký của bạn.",
    toastSuccessTitle: "Đã nhận đơn đăng ký",
    toastErrorTitle: "Có lỗi xảy ra",
    successHeading: "Cảm ơn bạn. Bạn đã ở trong hàng đợi xem xét.",
    successBody: "Chúng tôi xem xét đơn đăng ký khách hàng sáng lập hàng tuần và phản hồi trong vòng 48 giờ. Bạn sẽ nhận được email từ một chiến lược gia thực sự với các bước tiếp theo. Không có chiến dịch email tự động.",
    faqHeading: "Câu hỏi thường gặp",
    faqs: [
      { q: "Có bẫy gì không?", a: "Không. Chúng tôi giảm giá gói vì mới ra mắt và muốn có các trường hợp đầu tiên nhanh chóng. Bảo đảm hài lòng 30 ngày là thật. Nghiên cứu trường hợp là tùy chọn. Mức giảm được khóa trong suốt thời hạn đăng ký." },
      { q: "Tôi có cần cam kết hợp đồng dài hạn không?", a: "Không. Tất cả gói AiLys đều theo tháng với thông báo hủy trước hai tuần. Khách hàng sáng lập giữ cùng sự linh hoạt." },
      { q: "Nếu tôi không muốn xuất bản nghiên cứu trường hợp thì sao?", a: "Hãy từ chối. Giữ nguyên mức giảm. Nghiên cứu trường hợp là 100% tùy chọn và bạn có quyền duyệt từng số liệu, tên và trích dẫn." },
      { q: "Làm sao tôi biết sẽ nhận được giá trị với nửa giá?", a: "Cùng phạm vi, cùng chiến lược gia, cùng hàng đợi ưu tiên. Khác biệt duy nhất là giá. Bảo đảm hài lòng 30 ngày bao bọc bạn nếu AiLys không phù hợp." },
      { q: "Nếu sau này AiLys tăng giá tiêu chuẩn?", a: "Giá khách hàng sáng lập của bạn vẫn ở mức 50% so với chi phí gói khi đăng ký. Chúng tôi sẽ không tăng nó hồi tố." },
      { q: "Tôi có thể giới thiệu doanh nghiệp khác không?", a: "Có. Mỗi vị trí sáng lập là một doanh nghiệp đã ký. Nếu bạn giới thiệu doanh nghiệp thứ hai và họ ký trước khi vị trí thứ 10 lấp đầy, cả hai đều nhận được thỏa thuận sáng lập." },
    ],
    canonicalUrl: "https://www.ailysagency.ca/lien-he",
    apiLang: "vi",
  },
  es: {
    metaTitle: "Solicita una plaza fundadora · AiLys Agency",
    metaDescription:
      "Las primeras 10 empresas locales que firmen obtienen 50% de descuento en su plan AiLys de por vida, atención prioritaria, acceso directo al estratega y un caso de estudio opcional. Sin tarjeta de crédito para postular.",
    eyebrow: "Programa de clientes fundadores",
    headline1: "Somos nuevos.",
    headline2: "Esa es la oferta.",
    subheading:
      "AiLys Agency es bilingüe EN y FR-CA, construida para empresas locales en la era de la búsqueda con IA. Los primeros 10 dueños que firmen conservan 50% de descuento en su plan para siempre. El descuento queda fijo durante toda la vigencia de la suscripción. Postula abajo en menos de 3 minutos.",
    spotsLeft: "plazas restantes",
    pitchP1:
      "AiLys Agency fue fundada en 2026. Hemos aplicado la metodología en nuestro propio sitio y en una pequeña cohorte privada, pero todavía no acumulamos suficientes casos de estudio para competir solo con prueba social contra agencias de 5 000 $/mes. Por eso hacemos lo honesto: descontamos nuestro trabajo a cambio de entrar temprano y avanzar rápido.",
    pitchP2:
      "Si tus citaciones de IA suben, publicamos tu historia con atribución. Tú apruebas cada palabra, cada métrica, cada nombre. Puedes optar por no participar y conservar el descuento. Cifras reales, atribución real, confianza real ganada en 90 días.",
    benefitsHeading: "Lo que recibes",
    benefits: [
      { icon: "sparkles", title: "50% de descuento de por vida", body: "Bloquea la mitad del precio en Starter, Core, Growth o Agency. El precio de renovación nunca sube. El descuento se mantiene durante toda la vigencia de la suscripción." },
      { icon: "users", title: "Acceso directo al estratega", body: "El mismo estratega durante todo el contrato. Canal de Slack para consultas rápidas. Revisión estratégica mensual de 60 minutos incluida en el plan." },
      { icon: "megaphone", title: "Caso de estudio opcional", body: "Si tus citaciones de IA suben, publicamos tu historia con derecho de aprobación total. Puedes retirarte cuando quieras y conservar el descuento." },
      { icon: "calendar", title: "Cola de implementación prioritaria", body: "Auditoría entregada en 12 horas en lugar de 24. Despliegue de schema en la semana 1 en lugar de la 2. Construcción de citaciones desde el día 1." },
    ],
    pricingHeading: "Tu precio fundador, fijo para siempre",
    pricingNote: "El precio estándar se aplica a los nuevos clientes después de que firme el cliente fundador número 10. Tu descuento queda fijo mientras conserves el plan.",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "Estándar",
    pricingFounding: "Fundador",
    pricingPerMo: " $ CAD/mes",
    pricingSavings: "ahorras",
    termsHeading: "La letra pequeña, en lenguaje claro",
    terms: [
      { label: "Descuento del 50%", body: "Se aplica a tu plan (Starter, Core, Growth o Agency) durante toda la vigencia de tu suscripción. Bloqueado." },
      { label: "Caso de estudio", body: "100% opcional. Solo publicamos con tu consentimiento por escrito y con tu derecho de aprobación sobre cada métrica, nombre y cita. Puedes retirarte cuando quieras y conservar el descuento." },
      { label: "Si los resultados no llegan", body: "Garantía de satisfacción de 30 días. Reembolso completo si decides que AiLys no te funciona. La honestidad es el único marketing que tenemos." },
      { label: "Por qué solo 10 plazas", body: "Tenemos un único estratega manejando directamente las cuentas fundadoras. 10 es el máximo sin bajar la calidad. Contrataremos y reabriremos el programa cuando estemos listos." },
      { label: "Cuando el programa cierre", body: "El precio estándar se aplica a todos los nuevos clientes después de que firme el cliente fundador número 10. Tu descuento fundador queda fijo." },
    ],
    formTitle: "Postula a una plaza fundadora",
    formDescription: "Cuéntanos sobre tu negocio. Revisamos las solicitudes cada semana y respondemos en 48 horas. Sin tarjeta de crédito para postular.",
    fieldName: "Tu nombre",
    fieldEmail: "Correo electrónico",
    fieldPhone: "Teléfono (opcional)",
    fieldBusinessName: "Nombre del negocio",
    fieldWebsite: "Sitio web",
    fieldGbpUrl: "URL de Google Business Profile (opcional)",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "Ciudad y provincia o estado",
    fieldLocationPlaceholder: "Montreal, QC",
    fieldVertical: "Sector",
    verticals: {
      dentist: "Clínica dental",
      lawyer: "Bufete de abogados",
      restaurant: "Restaurante",
      contractor: "Contratista",
      clinic: "Clínica médica",
      real_estate: "Inmobiliaria",
      hotel: "Hotel",
      nail_salon: "Salón de uñas",
      other: "Otro",
    },
    fieldTier: "Plan que estás considerando",
    tierOptions: { starter: "Starter (300 $ CAD/mes)", core: "Core (600 $ CAD/mes)", growth: "Growth (1 200 $ CAD/mes)", agency: "Agency (2 500 $ CAD/mes)", undecided: "Indeciso, quiero conversar" },
    fieldCurrentSeo: "¿Qué SEO o marketing has hecho hasta ahora?",
    fieldCurrentSeoPlaceholder: "Trabajé con otra agencia, lo hago yo, solo GBP, nada todavía, etc.",
    fieldMotivation: "¿Por qué este programa, por qué ahora?",
    fieldMotivationPlaceholder: "¿Cuál es el resultado que haría que esto funcione para ti?",
    errorName: "Por favor ingresa tu nombre (al menos 2 caracteres)",
    errorEmail: "Por favor ingresa un correo válido",
    errorBusinessName: "Por favor ingresa el nombre del negocio",
    errorWebsite: "Por favor ingresa una URL válida que empiece con http",
    submit: "Enviar solicitud",
    submitting: "Enviando...",
    legal: "Al enviar, aceptas nuestros términos y política de privacidad. Solo te contactaremos sobre tu solicitud.",
    toastSuccessTitle: "Solicitud recibida",
    toastErrorTitle: "Algo salió mal",
    successHeading: "Gracias. Estás en la cola de revisión.",
    successBody: "Revisamos las solicitudes de clientes fundadores cada semana y respondemos en 48 horas. Recibirás un correo de un estratega real con los próximos pasos. Sin campañas automáticas.",
    faqHeading: "Preguntas frecuentes",
    faqs: [
      { q: "¿Hay alguna trampa?", a: "No. Descontamos el plan porque somos nuevos y queremos primeros casos rápido. La garantía de satisfacción de 30 días es real. El caso de estudio es opcional. El descuento queda fijo durante toda la vigencia de la suscripción." },
      { q: "¿Necesito comprometerme con un contrato largo?", a: "No. Todos los planes AiLys son mensuales con dos semanas de aviso para cancelar. Los clientes fundadores conservan la misma flexibilidad." },
      { q: "¿Y si no quiero que se publique un caso de estudio?", a: "Retírate. Conserva el descuento. El caso de estudio es 100% opcional y tú apruebas cada métrica, nombre y cita." },
      { q: "¿Cómo sé que recibiré valor a mitad de precio?", a: "Mismo alcance, mismo estratega, misma cola prioritaria. La única diferencia es el precio. La garantía de 30 días te cubre si AiLys no funciona para ti." },
      { q: "¿Y si AiLys sube los precios estándar más adelante?", a: "Tu precio fundador se mantiene en 50% sobre lo que costaba tu plan al firmar. No lo subiremos retroactivamente." },
      { q: "¿Puedo referir otra empresa?", a: "Sí. Cada plaza fundadora es una empresa firmada. Si refieres una segunda y firma antes de que se llene la décima plaza, ambas reciben el trato fundador." },
    ],
    canonicalUrl: "https://www.ailysagency.ca/es/contact",
    apiLang: "es",
  },
  ar: {
    metaTitle: "تقدّم بطلب لمقعد عميل مؤسس · AiLys Agency",
    metaDescription:
      "أول 10 شركات محلية توقّع تحصل على خصم 50% على باقة AiLys مدى الحياة، أولوية في التنفيذ، تواصل مباشر مع الاستراتيجي، ودراسة حالة اختيارية. لا حاجة لبطاقة ائتمان للتقديم.",
    eyebrow: "برنامج العملاء المؤسسين",
    headline1: "نحن جدد.",
    headline2: "هذا هو العرض.",
    subheading:
      "AiLys Agency وكالة ثنائية اللغة EN وFR-CA، مصممة للأعمال المحلية في عصر البحث بالذكاء الاصطناعي. أول 10 أصحاب أعمال يوقّعون يحتفظون بخصم 50% على باقتهم إلى الأبد. الخصم مثبت طوال مدة الاشتراك. قدّم طلبك أدناه في أقل من 3 دقائق.",
    spotsLeft: "مقاعد متبقية",
    pitchP1:
      "تأسست AiLys Agency سنة 2026. شغّلنا المنهجية على موقعنا الخاص وعلى مجموعة عملاء صغيرة، لكن لم نراكم بعد ما يكفي من دراسات الحالة لمنافسة الوكالات بـ 5 000 $/شهر بالأدلة الاجتماعية وحدها. لذا نفعل الشيء الصادق: نخفض السعر مقابل الانضمام مبكرًا والعمل بسرعة.",
    pitchP2:
      "إذا ارتفعت اقتباسات الذكاء الاصطناعي لديك، ننشر قصتك مع الإسناد. أنت توافق على كل كلمة وكل رقم وكل اسم. يمكنك الانسحاب والاحتفاظ بالخصم. أرقام حقيقية، إسناد حقيقي، ثقة حقيقية تُكتسب خلال 90 يومًا.",
    benefitsHeading: "ما تحصل عليه",
    benefits: [
      { icon: "sparkles", title: "خصم 50% على الباقة مدى الحياة", body: "ثبّت نصف السعر على Starter أو Core أو Growth أو Agency. سعر التجديد لا يرتفع أبدًا. الخصم يبقى طوال مدة الاشتراك." },
      { icon: "users", title: "تواصل مباشر مع الاستراتيجي", body: "نفس الاستراتيجي خلال كامل التعاقد. قناة Slack للأسئلة السريعة. مراجعة استراتيجية شهرية بمدة 60 دقيقة ضمن الباقة." },
      { icon: "megaphone", title: "دراسة حالة اختيارية", body: "إذا ارتفعت اقتباسات الذكاء الاصطناعي، ننشر قصتك مع حق الموافقة الكامل. يمكنك الانسحاب في أي وقت والاحتفاظ بالخصم." },
      { icon: "calendar", title: "أولوية في طابور التنفيذ", body: "تسليم التدقيق في 12 ساعة بدلًا من 24. نشر الـ schema في الأسبوع الأول بدلًا من الثاني. بناء الاقتباسات يبدأ من اليوم الأول." },
    ],
    pricingHeading: "سعرك كعميل مؤسس، مثبّت إلى الأبد",
    pricingNote: "السعر القياسي يُطبَّق على العملاء الجدد بعد توقيع العميل المؤسس العاشر. خصمك يبقى مثبتًا طالما احتفظت بالباقة.",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "قياسي",
    pricingFounding: "مؤسس",
    pricingPerMo: " $ CAD/شهر",
    pricingSavings: "توفّر",
    termsHeading: "التفاصيل، بلغة بسيطة",
    terms: [
      { label: "خصم 50%", body: "يُطبَّق على باقتك (Starter أو Core أو Growth أو Agency) طوال مدة اشتراكك. مثبّت." },
      { label: "دراسة الحالة", body: "اختيارية 100%. ننشر فقط بموافقتك الخطية وحقك بمراجعة كل رقم واسم واقتباس. يمكنك الانسحاب في أي وقت والاحتفاظ بالخصم." },
      { label: "إذا لم تتحقق النتائج", body: "ضمان رضا 30 يومًا. استرداد كامل إذا قررت أن AiLys لا تناسبك. الصدق هو التسويق الوحيد الذي نملكه." },
      { label: "لماذا 10 مقاعد فقط", body: "لدينا استراتيجي واحد يدير حسابات المؤسسين مباشرة. 10 هو الحد الأقصى دون انخفاض الجودة. سنوظّف ونعيد فتح البرنامج عندما نكون جاهزين." },
      { label: "عند إغلاق البرنامج", body: "السعر القياسي يُطبَّق على جميع العملاء الجدد بعد توقيع العميل المؤسس العاشر. خصمك المؤسس يبقى مثبّتًا." },
    ],
    formTitle: "تقدّم لمقعد عميل مؤسس",
    formDescription: "حدّثنا عن عملك. نراجع الطلبات أسبوعيًا ونردّ خلال 48 ساعة. لا حاجة لبطاقة ائتمان للتقديم.",
    fieldName: "اسمك",
    fieldEmail: "البريد الإلكتروني",
    fieldPhone: "الهاتف (اختياري)",
    fieldBusinessName: "اسم العمل",
    fieldWebsite: "الموقع الإلكتروني",
    fieldGbpUrl: "رابط Google Business Profile (اختياري)",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "المدينة والمقاطعة أو الولاية",
    fieldLocationPlaceholder: "Montreal, QC",
    fieldVertical: "القطاع",
    verticals: {
      dentist: "عيادة أسنان",
      lawyer: "مكتب محاماة",
      restaurant: "مطعم",
      contractor: "مقاول",
      clinic: "عيادة طبية",
      real_estate: "عقارات",
      hotel: "فندق",
      nail_salon: "صالون أظافر",
      other: "أخرى",
    },
    fieldTier: "الباقة التي تفكّر فيها",
    tierOptions: { starter: "Starter (300 $ CAD/شهر)", core: "Core (600 $ CAD/شهر)", growth: "Growth (1 200 $ CAD/شهر)", agency: "Agency (2 500 $ CAD/شهر)", undecided: "غير محدد، أريد المناقشة" },
    fieldCurrentSeo: "ما الذي قمت به في السيو أو التسويق حتى الآن؟",
    fieldCurrentSeoPlaceholder: "عملت مع وكالة أخرى، أعمل بنفسي، GBP فقط، لم أبدأ بعد، إلخ.",
    fieldMotivation: "لماذا هذا البرنامج، ولماذا الآن؟",
    fieldMotivationPlaceholder: "ما النتيجة التي ستجعل هذا البرنامج يعمل لك؟",
    errorName: "يرجى إدخال اسمك (حرفان على الأقل)",
    errorEmail: "يرجى إدخال بريد إلكتروني صالح",
    errorBusinessName: "يرجى إدخال اسم العمل",
    errorWebsite: "يرجى إدخال رابط صالح يبدأ بـ http",
    submit: "إرسال الطلب",
    submitting: "جارٍ الإرسال...",
    legal: "بالإرسال، أنت توافق على شروطنا وسياسة الخصوصية. سنتواصل معك فقط بشأن طلبك.",
    toastSuccessTitle: "تم استلام الطلب",
    toastErrorTitle: "حدث خطأ ما",
    successHeading: "شكرًا. أنت في طابور المراجعة.",
    successBody: "نراجع طلبات العملاء المؤسسين أسبوعيًا ونردّ خلال 48 ساعة. ستتلقى بريدًا إلكترونيًا من استراتيجي حقيقي يحتوي الخطوات التالية. لا توجد حملات بريد آلية.",
    faqHeading: "الأسئلة الشائعة",
    faqs: [
      { q: "هل هناك أي شرط مخفي؟", a: "لا. نخفض الباقة لأننا جدد ونريد قصص نجاح أولى بسرعة. ضمان الرضا لـ 30 يومًا حقيقي. دراسة الحالة اختيارية. الخصم مثبّت طوال مدة الاشتراك." },
      { q: "هل أحتاج إلى الالتزام بعقد طويل؟", a: "لا. كل باقات AiLys شهرية مع إشعار إلغاء قبل أسبوعين. العملاء المؤسسون يحتفظون بنفس المرونة." },
      { q: "ماذا لو لم أرغب بنشر دراسة الحالة؟", a: "انسحب. احتفظ بالخصم. دراسة الحالة اختيارية 100% ولديك حق الموافقة على كل رقم واسم واقتباس." },
      { q: "كيف أعرف أنني سأحصل على القيمة بنصف السعر؟", a: "نفس النطاق، نفس الاستراتيجي، نفس الطابور المُسبَق. الفرق الوحيد هو السعر. ضمان الـ 30 يومًا يحميك إذا لم تناسبك AiLys." },
      { q: "ماذا لو رفعت AiLys أسعارها القياسية لاحقًا؟", a: "سعرك كعميل مؤسس يبقى عند 50% مما تكلفته باقتك عند التوقيع. لن نرفعه بأثر رجعي." },
      { q: "هل يمكنني إحالة شركة أخرى؟", a: "نعم. كل مقعد مؤسس هو شركة موقّعة. إذا أحلت شركة ثانية ووقّعت قبل امتلاء المقعد العاشر، كلاهما يحصل على عرض المؤسس." },
    ],
    canonicalUrl: "https://www.ailysagency.ca/ar/contact",
    apiLang: "ar",
  },
  zh: {
    metaTitle: "申请创始客户席位 · AiLys Agency",
    metaDescription:
      "前 10 家签约的本地企业可享 AiLys 套餐 50% 终身折扣、优先交付、直接对接战略师，并可选发布案例研究。申请无需信用卡。",
    eyebrow: "创始客户计划",
    headline1: "我们刚起步。",
    headline2: "这就是优惠。",
    subheading:
      "AiLys Agency 是 EN 与 FR-CA 双语机构，为 AI 搜索时代的本地企业打造。前 10 位签约的企业主享受套餐 50% 终身折扣。订阅期间折扣始终锁定。在下方 3 分钟内完成申请。",
    spotsLeft: "席位剩余",
    pitchP1:
      "AiLys Agency 成立于 2026 年。我们已在自有站点和一小批私有客户上验证方法论，但案例量尚不足以仅凭社会证明与每月 5 000 $ 的代理同台。所以我们做诚实的事：用折扣换取早期加入与快速交付。",
    pitchP2:
      "如果你的 AI 引用上升，我们将带署名发布你的故事。每个字、每项指标、每个名字都由你逐项审定。你可以选择不公开，折扣仍然保留。真实的数据、真实的署名、90 天内积累的真实信任。",
    benefitsHeading: "你将获得",
    benefits: [
      { icon: "sparkles", title: "套餐 50% 终身折扣", body: "在 Starter、Core、Growth 或 Agency 上锁定半价。续费价格永不上调。订阅期间折扣始终保留。" },
      { icon: "users", title: "战略师直接对接", body: "整段合作由同一位战略师负责。Slack 频道用于快速沟通。每月 60 分钟战略复盘已包含在套餐中。" },
      { icon: "megaphone", title: "案例研究可选发布", body: "如果 AI 引用上升，我们将在你拥有完整审定权的前提下发布故事。可随时退出，折扣仍然保留。" },
      { icon: "calendar", title: "优先交付通道", body: "审计 12 小时内交付，而非 24 小时。Schema 部署在第 1 周完成，而非第 2 周。引用建设从第 1 天开始。" },
    ],
    pricingHeading: "你的创始客户价格，永久锁定",
    pricingNote: "第 10 位创始客户签约后，标准价格适用于新客户。只要保留套餐，你的折扣始终锁定。",
    pricingTierLabels: { starter: "Starter", core: "Core", growth: "Growth", agency: "Agency" },
    pricingRegular: "标准",
    pricingFounding: "创始",
    pricingPerMo: " $ CAD/月",
    pricingSavings: "你节省",
    termsHeading: "细则，以平实语言呈现",
    terms: [
      { label: "50% 折扣", body: "适用于你的套餐（Starter、Core、Growth 或 Agency），覆盖整个订阅周期。锁定不变。" },
      { label: "案例研究", body: "100% 自愿。仅在你书面同意且对每项指标、姓名与引述拥有审定权的前提下发布。可随时退出并保留折扣。" },
      { label: "若结果未达预期", body: "30 天满意保证。若你认为 AiLys 不适合你，可全额退款。诚实是我们唯一的营销方式。" },
      { label: "为什么只有 10 个席位", body: "我们由一位战略师直接管理创始账户。10 是不降低质量的最大承载。准备就绪后我们会扩员并重启该计划。" },
      { label: "计划关闭后", body: "第 10 位创始客户签约后，标准价格适用于所有新客户。你的创始折扣保持锁定。" },
    ],
    formTitle: "申请创始客户席位",
    formDescription: "告诉我们你的业务情况。我们每周审核，48 小时内回复。申请无需信用卡。",
    fieldName: "你的姓名",
    fieldEmail: "邮箱",
    fieldPhone: "电话（可选）",
    fieldBusinessName: "企业名称",
    fieldWebsite: "网站",
    fieldGbpUrl: "Google Business Profile 链接（可选）",
    fieldGbpUrlPlaceholder: "https://maps.google.com/...",
    fieldLocation: "城市与省份或州",
    fieldLocationPlaceholder: "Montreal, QC",
    fieldVertical: "行业",
    verticals: {
      dentist: "牙科诊所",
      lawyer: "律师事务所",
      restaurant: "餐厅",
      contractor: "建筑承包商",
      clinic: "医疗诊所",
      real_estate: "房地产",
      hotel: "酒店",
      nail_salon: "美甲沙龙",
      other: "其他",
    },
    fieldTier: "正在考虑的套餐",
    tierOptions: { starter: "Starter (300 $ CAD/月)", core: "Core (600 $ CAD/月)", growth: "Growth (1 200 $ CAD/月)", agency: "Agency (2 500 $ CAD/月)", undecided: "未定，想先沟通" },
    fieldCurrentSeo: "目前为止你做过哪些 SEO 或营销？",
    fieldCurrentSeoPlaceholder: "与其他代理合作过、自己做、仅 GBP、尚未开始，等等。",
    fieldMotivation: "为什么选择此计划，为什么是现在？",
    fieldMotivationPlaceholder: "什么样的结果会让此计划对你有效？",
    errorName: "请输入姓名（至少 2 个字符）",
    errorEmail: "请输入有效邮箱",
    errorBusinessName: "请输入企业名称",
    errorWebsite: "请输入以 http 开头的有效网址",
    submit: "提交申请",
    submitting: "提交中...",
    legal: "提交即表示你同意我们的条款与隐私政策。我们仅就你的申请与你联系。",
    toastSuccessTitle: "申请已收到",
    toastErrorTitle: "出错了",
    successHeading: "感谢你。你已进入审核队列。",
    successBody: "我们每周审核创始客户申请并在 48 小时内回复。你将收到由真实战略师发出的邮件，附带后续步骤。没有自动邮件营销。",
    faqHeading: "常见问题",
    faqs: [
      { q: "是否有隐藏条件？", a: "没有。我们打折是因为机构刚起步，希望快速积累首批案例。30 天满意保证是真实的。案例研究可选。订阅期间折扣始终锁定。" },
      { q: "需要签长期合同吗？", a: "不需要。所有 AiLys 套餐均按月签订，提前两周通知即可取消。创始客户享有同样的灵活性。" },
      { q: "如果我不希望发布案例研究？", a: "选择不公开，保留折扣。案例研究 100% 自愿，你对每项指标、姓名与引述拥有审定权。" },
      { q: "我怎样确认半价能获得相应价值？", a: "范围相同、战略师相同、优先通道相同。唯一的差别是价格。30 天满意保证在 AiLys 不适合你时为你兜底。" },
      { q: "若 AiLys 后续上调标准价格？", a: "你的创始客户价格仍维持在签约时套餐价的 50%。我们不会回溯上调。" },
      { q: "我可以推荐其他企业吗？", a: "可以。每个创始席位对应一家签约企业。如果你推荐的第二家在第 10 个席位填满前签约，两家都享受创始优惠。" },
    ],
    canonicalUrl: "https://www.ailysagency.ca/zh/contact",
    apiLang: "zh",
  },
} as const;

type CopyShape = (typeof COPY)[keyof typeof COPY];

function pickCopy(lang: string): CopyShape {
  if (lang === "fr") return COPY.fr;
  if (lang === "vi") return COPY.vi;
  if (lang === "es") return COPY.es;
  if (lang === "ar") return COPY.ar;
  if (lang === "zh") return COPY.zh;
  return COPY.en;
}

const ICON_MAP = {
  sparkles: <Sparkles className="w-5 h-5" />,
  users: <Users className="w-5 h-5" />,
  megaphone: <Megaphone className="w-5 h-5" />,
  calendar: <Calendar className="w-5 h-5" />,
};

export default function FoundingClients() {
  const { lang, setLang } = useLang();
  const { lang: urlLang } = useParams<{ lang?: string }>();
  const { pathname } = useLocation();
  const { toast } = useToast();

  // Resolve effective locale from (1) URL :lang prefix, (2) path slug
  // (/clients-fondateurs implies fr, /cho-chu-doanh-nghiep implies vi),
  // (3) lang context. Sync the context so the rest of the site picks it up.
  const effectiveLang = useMemo(() => {
    // URL :lang prefix wins (e.g. /es/contact, /ar/contact, /zh/contact).
    // Normalise to lowercase so /AR/contact still resolves correctly.
    const normalisedUrlLang = urlLang?.toLowerCase();
    if (normalisedUrlLang && SUPPORTED_LANGS.includes(normalisedUrlLang as SupportedLang)) {
      return normalisedUrlLang;
    }
    // Localised slug fallbacks (no lang prefix). FR and VI before bare /contact
    // because both share the "/contact" stem.
    if (pathname.includes("/contacte")) return "fr";
    if (pathname.includes("/lien-he")) return "vi";
    if (pathname.includes("/contact")) return "en";
    return lang;
  }, [urlLang, pathname, lang]);

  useEffect(() => {
    if (effectiveLang !== lang && SUPPORTED_LANGS.includes(effectiveLang as SupportedLang)) {
      setLang(effectiveLang as SupportedLang);
    }
  }, [effectiveLang, lang, setLang]);

  const c = pickCopy(effectiveLang);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [website, setWebsite] = useState("");
  const [gbpUrl, setGbpUrl] = useState("");
  const [location, setLocation] = useState("");
  const [vertical, setVertical] = useState<string>("dentist");
  const [tier, setTier] = useState<string>("starter");
  const [currentSeo, setCurrentSeo] = useState("");
  const [motivation, setMotivation] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-force-dark", "true");
    root.classList.add("dark");
    return () => {
      root.removeAttribute("data-force-dark");
      const stored = localStorage.getItem("theme");
      if (stored === "light") root.classList.remove("dark");
    };
  }, []);

  const validation = useMemo(() => {
    const errors: string[] = [];
    if (name.trim().length < 2) errors.push(c.errorName);
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email.trim())) errors.push(c.errorEmail);
    if (businessName.trim().length < 2) errors.push(c.errorBusinessName);
    if (!/^https?:\/\//i.test(website.trim())) errors.push(c.errorWebsite);
    return errors;
  }, [name, email, businessName, website, c]);

  const submit = async () => {
    if (validation.length > 0 || honeypot.length > 0) return;
    setSubmitting(true);
    try {
      const resp = await fetch("/api/founding-clients-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          businessName: businessName.trim(),
          website: website.trim(),
          gbpUrl: gbpUrl.trim() || undefined,
          location: location.trim() || undefined,
          vertical,
          tier,
          currentSeo: currentSeo.trim() || undefined,
          motivation: motivation.trim() || undefined,
          honeypot,
          lang: c.apiLang,
          source: "founding-clients",
        }),
      });
      if (!resp.ok) {
        const j = await resp.json().catch(() => ({}));
        toast({ title: c.toastErrorTitle, description: j.error ?? "", variant: "destructive" });
        return;
      }
      setSubmitted(true);
      toast({ title: c.toastSuccessTitle });
    } catch (err) {
      toast({ title: c.toastErrorTitle, description: (err as Error).message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (n: number) => {
    if (effectiveLang === "fr") return n.toLocaleString("fr-CA").replace(/,/g, " ");
    if (effectiveLang === "vi") return n.toLocaleString("vi-VN");
    return n.toLocaleString("en-US");
  };

  return (
    <>
      <Helmet>
        <title>{c.metaTitle}</title>
        <meta name="description" content={c.metaDescription} />
        <link rel="canonical" href={c.canonicalUrl} />
        <meta property="og:title" content={c.metaTitle} />
        <meta property="og:description" content={c.metaDescription} />
        <meta property="og:url" content={c.canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index,follow" />
        {/* hreflang trio */}
        <link rel="alternate" hrefLang="en" href="https://www.ailysagency.ca/contact" />
        <link rel="alternate" hrefLang="fr-CA" href="https://www.ailysagency.ca/contacte" />
        <link rel="alternate" hrefLang="vi" href="https://www.ailysagency.ca/lien-he" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ailysagency.ca/contact" />
        {/* JSON-LD: Offer schema for the founding-client deal */}
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Offer",
          name: c.metaTitle,
          description: c.metaDescription,
          url: c.canonicalUrl,
          seller: { "@type": "Organization", name: "AiLys Agency", url: "https://www.ailysagency.ca" },
          eligibleQuantity: { "@type": "QuantitativeValue", maxValue: TOTAL_SLOTS, value: SLOTS_REMAINING, unitText: "founding spots" },
          priceSpecification: TIERS.map((t) => ({
            "@type": "UnitPriceSpecification",
            name: t.id,
            price: t.founding,
            priceCurrency: "CAD",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "MON" },
          })),
        })}</script>
      </Helmet>

      <NetworkBackground
        backgroundColor="#050505"
        nodeColor="#A78BFA"
        lineColor="#22D3EE"
        nodeCount={28}
        mobileNodeCount={16}
        connectionDistance={140}
        mouseInfluenceRadius={200}
        mouseInfluenceStrength={0.15}
      />

      <div className="min-h-screen overflow-x-hidden">
        <Navbar />
        <main className="pt-24 pb-24">
          {/* Hero */}
          <section className="relative px-4 max-w-4xl mx-auto text-center mb-12">
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-400/30 bg-violet-500/[0.06] backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-violet-300" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet-200">
                  {c.eyebrow}
                </span>
              </div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.18em] font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
                {SLOTS_REMAINING} / {TOTAL_SLOTS} {c.spotsLeft}
              </span>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
              {c.headline1}
              <br />
              <span className="italic bg-gradient-to-r from-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent">
                {c.headline2}
              </span>
            </h1>
            <p className="text-lg text-white/75 leading-relaxed max-w-2xl mx-auto">
              {c.subheading}
            </p>
          </section>

          {/* Pitch */}
          <section className="px-4 max-w-3xl mx-auto mb-16 space-y-4">
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">{c.pitchP1}</p>
            <p className="text-base sm:text-lg text-white/70 leading-relaxed">{c.pitchP2}</p>
          </section>

          {/* Benefits grid */}
          <section className="px-4 max-w-5xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl mb-6 text-center">{c.benefitsHeading}</h2>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
              {c.benefits.map((b, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/[0.04] via-secondary/[0.03] to-transparent backdrop-blur-md p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/15 text-primary mb-4">
                    {ICON_MAP[b.icon as keyof typeof ICON_MAP]}
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl mb-2 leading-tight">{b.title}</h3>
                  <p className="text-sm text-white/65 leading-relaxed">{b.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Pricing comparison */}
          <section className="px-4 max-w-5xl mx-auto mb-16">
            <h2 className="font-display text-3xl sm:text-4xl mb-2 text-center">{c.pricingHeading}</h2>
            <p className="text-sm text-white/55 text-center max-w-2xl mx-auto mb-8">{c.pricingNote}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {TIERS.map((t) => {
                const tierKey = t.id as keyof typeof c.pricingTierLabels;
                const savings = t.regular - t.founding;
                return (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-cyan-400/30 bg-gradient-to-b from-cyan-500/[0.05] to-transparent backdrop-blur-md p-5 text-center"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 mb-3">
                      {c.pricingTierLabels[tierKey]}
                    </div>
                    <div className="text-xs text-white/40 line-through mb-1">
                      {c.pricingRegular}: ${formatPrice(t.regular)}{c.pricingPerMo}
                    </div>
                    <div className="font-display text-3xl sm:text-4xl text-cyan-300 leading-none mb-1">
                      ${formatPrice(t.founding)}
                    </div>
                    <div className="text-[11px] text-white/55">{c.pricingPerMo}</div>
                    <div className="mt-3 inline-block text-[10px] font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      {c.pricingFounding} · {c.pricingSavings} ${formatPrice(savings)}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Transparent terms */}
          <section className="px-4 max-w-3xl mx-auto mb-16">
            <div className="rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <Lock className="w-5 h-5 text-primary/70 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="font-display text-xl sm:text-2xl mb-3 leading-tight">
                    {c.termsHeading}
                  </h2>
                  <ul className="space-y-2 text-sm text-white/65 leading-relaxed">
                    {c.terms.map((t, i) => (
                      <li key={i}>
                        <strong className="text-white/90">{t.label}:</strong> {t.body}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Application form */}
          <section className="px-4 max-w-3xl mx-auto mb-16" id="apply">
            {submitted ? (
              <Card className="border-emerald-500/40">
                <CardContent className="py-12 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                  <h2 className="font-display text-3xl">{c.successHeading}</h2>
                  <p className="text-white/65 max-w-lg mx-auto leading-relaxed">{c.successBody}</p>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">{c.formTitle}</CardTitle>
                  <CardDescription>{c.formDescription}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  {/* Honeypot */}
                  <input
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="absolute opacity-0 pointer-events-none w-0 h-0"
                    aria-hidden
                  />

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="name">{c.fieldName} *</Label>
                      <Input id="name" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} autoComplete="name" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">{c.fieldEmail} *</Label>
                      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={254} autoComplete="email" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="phone">{c.fieldPhone}</Label>
                      <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={50} autoComplete="tel" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="businessName">{c.fieldBusinessName} *</Label>
                      <Input id="businessName" value={businessName} onChange={(e) => setBusinessName(e.target.value)} maxLength={200} autoComplete="organization" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="website">{c.fieldWebsite} *</Label>
                      <Input id="website" type="url" placeholder="https://..." value={website} onChange={(e) => setWebsite(e.target.value)} maxLength={500} autoComplete="url" />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="gbpUrl">{c.fieldGbpUrl}</Label>
                      <Input id="gbpUrl" type="url" placeholder={c.fieldGbpUrlPlaceholder} value={gbpUrl} onChange={(e) => setGbpUrl(e.target.value)} maxLength={500} />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label htmlFor="location">{c.fieldLocation}</Label>
                      <Input id="location" placeholder={c.fieldLocationPlaceholder} value={location} onChange={(e) => setLocation(e.target.value)} maxLength={200} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="vertical">{c.fieldVertical}</Label>
                      <select
                        id="vertical"
                        value={vertical}
                        onChange={(e) => setVertical(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                      >
                        {VERTICALS.map((v) => (
                          <option key={v} value={v}>{c.verticals[v as keyof typeof c.verticals]}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="tier">{c.fieldTier}</Label>
                    <select
                      id="tier"
                      value={tier}
                      onChange={(e) => setTier(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {(["starter", "core", "growth", "agency", "undecided"] as const).map((k) => (
                        <option key={k} value={k}>{c.tierOptions[k]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="currentSeo">{c.fieldCurrentSeo}</Label>
                    <Textarea id="currentSeo" placeholder={c.fieldCurrentSeoPlaceholder} value={currentSeo} onChange={(e) => setCurrentSeo(e.target.value)} maxLength={1500} rows={3} />
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="motivation">{c.fieldMotivation}</Label>
                    <Textarea id="motivation" placeholder={c.fieldMotivationPlaceholder} value={motivation} onChange={(e) => setMotivation(e.target.value)} maxLength={1500} rows={4} />
                  </div>

                  {validation.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="w-4 h-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside text-sm">
                          {validation.map((err) => <li key={err}>{err}</li>)}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button onClick={submit} disabled={submitting || validation.length > 0} className="w-full" size="lg">
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {c.submitting}</>
                    ) : (
                      <><Send className="w-4 h-4 mr-2" /> {c.submit}</>
                    )}
                  </Button>

                  <p className="text-[11px] text-white/45 text-center flex items-center justify-center gap-1">
                    <Shield className="w-3 h-3" /> {c.legal}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* FAQ */}
          <section className="px-4 max-w-3xl mx-auto">
            <h2 className="font-display text-3xl sm:text-4xl mb-6 text-center">{c.faqHeading}</h2>
            <div className="space-y-3">
              {c.faqs.map((faq, i) => (
                <details key={i} className="group rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 open:border-primary/30">
                  <summary className="cursor-pointer font-semibold text-white/90 flex items-start justify-between gap-4">
                    <span>{faq.q}</span>
                    <span className="text-primary group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
