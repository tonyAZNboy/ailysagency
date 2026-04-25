import { 
  UtensilsCrossed, 
  Scissors, 
  Sparkles, 
  Heart, 
  Stethoscope, 
  ShoppingBag, 
  Dumbbell, 
  Car, 
  Home, 
  Briefcase, 
  Camera, 
  Palette, 
  GraduationCap, 
  Wrench,
  Coffee,
  Hotel,
  Dog
} from "lucide-react";

export interface IndustryFAQ {
  question: string;
  answerTemplate: string;
  placeholderFields?: string[];
}

export interface IndustryConfig {
  id: string;
  label: string;
  icon: typeof UtensilsCrossed;
  needsMenu: boolean;
  needsServices: boolean;
  needsPriceList: boolean;
  characteristics: string[];
  seoKeywords: string[];
  faqTemplates: IndustryFAQ[];
  widgetGreeting: string;
  commonQueries: string[];
  documentTypes: string[];
}

export const INDUSTRIES: Record<string, IndustryConfig> = {
  restaurant: {
    id: 'restaurant',
    label: 'Restaurant & Food Service',
    icon: UtensilsCrossed,
    needsMenu: true,
    needsServices: false,
    needsPriceList: false,
    characteristics: ['Food Quality', 'Service', 'Atmosphere', 'Value for Money', 'Cleanliness', 'Wait Time', 'Portion Size'],
    seoKeywords: ['restaurant', 'dining', 'food', 'cuisine', 'best restaurant', 'eat near me', 'dinner', 'lunch', 'brunch'],
    faqTemplates: [
      { question: "What are your hours?", answerTemplate: "We're open {hours}. Kitchen closes 30 minutes before closing.", placeholderFields: ['hours'] },
      { question: "Do you take reservations?", answerTemplate: "Yes! You can book online or call us at {phone}.", placeholderFields: ['phone'] },
      { question: "Do you have vegetarian options?", answerTemplate: "Absolutely! We have several vegetarian and vegan dishes on our menu." },
      { question: "Do you offer takeout or delivery?", answerTemplate: "Yes, we offer both takeout and delivery." },
      { question: "Is parking available?", answerTemplate: "Yes, we have {parking_info}.", placeholderFields: ['parking_info'] },
    ],
    widgetGreeting: "Welcome to {business_name}! How can I help you today? Ask about our menu, hours, or reservations.",
    commonQueries: ['menu', 'hours', 'reservations', 'parking', 'allergies', 'specials'],
    documentTypes: ['Menu PDF', 'Wine List', 'Catering Menu'],
  },
  
  cafe: {
    id: 'cafe',
    label: 'Café & Coffee Shop',
    icon: Coffee,
    needsMenu: true,
    needsServices: false,
    needsPriceList: false,
    characteristics: ['Coffee Quality', 'Atmosphere', 'Service', 'Food Options', 'WiFi', 'Seating'],
    seoKeywords: ['cafe', 'coffee shop', 'coffee near me', 'espresso', 'breakfast', 'pastries', 'wifi cafe'],
    faqTemplates: [
      { question: "Do you have WiFi?", answerTemplate: "Yes! Free WiFi is available for all customers." },
      { question: "What are your hours?", answerTemplate: "We're open {hours}.", placeholderFields: ['hours'] },
      { question: "Do you have non-dairy milk options?", answerTemplate: "Yes! We offer oat, almond, and soy milk at no extra charge." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about our menu, WiFi, or hours.",
    commonQueries: ['menu', 'hours', 'wifi', 'pastries', 'dairy-free'],
    documentTypes: ['Menu PDF', 'Drink Menu'],
  },

  nail_salon: {
    id: 'nail_salon',
    label: 'Nail Salon',
    icon: Sparkles,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Technicians', 'Nail Art Quality', 'Cleanliness', 'Hygiene', 'Design Options', 'Wait Time', 'Value'],
    seoKeywords: ['nail salon', 'manicure', 'pedicure', 'gel nails', 'acrylic nails', 'nail art', 'nails near me'],
    faqTemplates: [
      { question: "Do I need an appointment?", answerTemplate: "Walk-ins are welcome! But for best availability, we recommend booking ahead." },
      { question: "How much is a gel manicure?", answerTemplate: "Gel manicures start at {price}. Check our full price list for all services.", placeholderFields: ['price'] },
      { question: "How long does a pedicure take?", answerTemplate: "A standard pedicure takes about 45-60 minutes." },
      { question: "Do you use sanitary tools?", answerTemplate: "Absolutely! All our tools are sterilized between clients and we use disposable items when possible." },
    ],
    widgetGreeting: "Welcome to {business_name}! Book your appointment or ask about our services and prices.",
    commonQueries: ['prices', 'appointment', 'services', 'gel', 'walk-in', 'hours'],
    documentTypes: ['Price List', 'Service Menu'],
  },

  hair_salon: {
    id: 'hair_salon',
    label: 'Hair Salon & Barbershop',
    icon: Scissors,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Stylists', 'Cut Quality', 'Atmosphere', 'Cleanliness', 'Wait Time', 'Price', 'Communication'],
    seoKeywords: ['hair salon', 'haircut', 'barber', 'hair color', 'highlights', 'hair stylist', 'salon near me'],
    faqTemplates: [
      { question: "Do I need an appointment?", answerTemplate: "We recommend booking ahead, but walk-ins are welcome based on availability." },
      { question: "How much is a haircut?", answerTemplate: "Haircuts start at {price}. Prices vary based on stylist and service.", placeholderFields: ['price'] },
      { question: "Do you do color corrections?", answerTemplate: "Yes! Please book a consultation so we can assess your hair and provide an accurate quote." },
    ],
    widgetGreeting: "Welcome to {business_name}! Book your appointment or ask about our styling services.",
    commonQueries: ['prices', 'appointment', 'haircut', 'color', 'highlights', 'hours'],
    documentTypes: ['Price List', 'Service Menu'],
  },

  spa: {
    id: 'spa',
    label: 'Spa & Wellness',
    icon: Heart,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Therapists', 'Ambiance', 'Cleanliness', 'Relaxation', 'Service Quality', 'Value'],
    seoKeywords: ['spa', 'massage', 'wellness', 'facial', 'day spa', 'relaxation', 'spa near me'],
    faqTemplates: [
      { question: "What should I wear?", answerTemplate: "We provide robes and slippers. Wear whatever is comfortable to arrive." },
      { question: "How early should I arrive?", answerTemplate: "Please arrive 15-20 minutes early to check in and relax before your treatment." },
      { question: "Can I book couples treatments?", answerTemplate: "Yes! We have couples rooms available for massages and facials." },
    ],
    widgetGreeting: "Welcome to {business_name}! Book your relaxation session or ask about our treatments.",
    commonQueries: ['massage', 'facial', 'prices', 'couples', 'appointment', 'gift cards'],
    documentTypes: ['Service Menu', 'Price List', 'Package Deals'],
  },

  healthcare: {
    id: 'healthcare',
    label: 'Healthcare & Medical',
    icon: Stethoscope,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Doctors', 'Staff', 'Wait Time', 'Cleanliness', 'Communication', 'Care Quality'],
    seoKeywords: ['doctor', 'clinic', 'healthcare', 'medical', 'physician', 'doctor near me', 'appointment'],
    faqTemplates: [
      { question: "Do you accept insurance?", answerTemplate: "We accept most major insurance plans. Please call to verify your coverage." },
      { question: "How do I schedule an appointment?", answerTemplate: "You can book online, call us at {phone}, or use our patient portal.", placeholderFields: ['phone'] },
      { question: "What should I bring to my first visit?", answerTemplate: "Please bring your ID, insurance card, and any relevant medical records." },
    ],
    widgetGreeting: "Welcome to {business_name}! How can we help you today?",
    commonQueries: ['appointment', 'insurance', 'hours', 'services', 'location'],
    documentTypes: ['Patient Forms', 'Insurance Info'],
  },

  dental: {
    id: 'dental',
    label: 'Dental Practice',
    icon: Stethoscope,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Dentists', 'Staff', 'Wait Time', 'Pain Management', 'Cleanliness', 'Communication'],
    seoKeywords: ['dentist', 'dental', 'teeth cleaning', 'dental care', 'dentist near me', 'orthodontist'],
    faqTemplates: [
      { question: "Do you accept insurance?", answerTemplate: "We accept most major dental insurance plans. Call to verify coverage." },
      { question: "Do you offer payment plans?", answerTemplate: "Yes! We offer flexible payment options for treatments." },
      { question: "How often should I visit?", answerTemplate: "We recommend a cleaning and checkup every 6 months." },
    ],
    widgetGreeting: "Welcome to {business_name}! Book your appointment or ask about our dental services.",
    commonQueries: ['appointment', 'insurance', 'cleaning', 'emergency', 'hours'],
    documentTypes: ['Patient Forms', 'Insurance Info'],
  },

  retail: {
    id: 'retail',
    label: 'Retail Store',
    icon: ShoppingBag,
    needsMenu: false,
    needsServices: false,
    needsPriceList: false,
    characteristics: ['Product Quality', 'Selection', 'Staff', 'Prices', 'Store Layout', 'Returns'],
    seoKeywords: ['shop', 'store', 'retail', 'buy', 'shopping', 'products', 'store near me'],
    faqTemplates: [
      { question: "What are your hours?", answerTemplate: "We're open {hours}.", placeholderFields: ['hours'] },
      { question: "Do you offer gift wrapping?", answerTemplate: "Yes! Complimentary gift wrapping is available on request." },
      { question: "What is your return policy?", answerTemplate: "We accept returns within 30 days with original receipt." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about our products, hours, or policies.",
    commonQueries: ['hours', 'returns', 'products', 'location', 'gift cards'],
    documentTypes: ['Product Catalog'],
  },

  fitness: {
    id: 'fitness',
    label: 'Gym & Fitness Center',
    icon: Dumbbell,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Equipment', 'Cleanliness', 'Staff', 'Classes', 'Atmosphere', 'Value'],
    seoKeywords: ['gym', 'fitness', 'workout', 'gym near me', 'personal trainer', 'classes', 'membership'],
    faqTemplates: [
      { question: "Do you offer trial memberships?", answerTemplate: "Yes! We offer a free trial for new members." },
      { question: "What are your hours?", answerTemplate: "We're open {hours}.", placeholderFields: ['hours'] },
      { question: "Do you have personal trainers?", answerTemplate: "Yes! We have certified personal trainers available for one-on-one sessions." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about memberships, classes, or trainers.",
    commonQueries: ['membership', 'prices', 'classes', 'trainers', 'hours', 'trial'],
    documentTypes: ['Class Schedule', 'Membership Options', 'Price List'],
  },

  automotive: {
    id: 'automotive',
    label: 'Auto Repair & Service',
    icon: Car,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Mechanics', 'Quality', 'Pricing', 'Honesty', 'Speed', 'Communication'],
    seoKeywords: ['auto repair', 'mechanic', 'car service', 'oil change', 'auto shop near me', 'car repair'],
    faqTemplates: [
      { question: "Do you offer free estimates?", answerTemplate: "Yes! We provide free estimates for all repair work." },
      { question: "How long will my repair take?", answerTemplate: "Most repairs are completed same-day. We'll call with updates." },
      { question: "Do you offer loaner cars?", answerTemplate: "Yes, we have loaner vehicles available for longer repairs." },
    ],
    widgetGreeting: "Welcome to {business_name}! Get a quote or ask about our auto services.",
    commonQueries: ['estimate', 'oil change', 'appointment', 'hours', 'tires', 'brakes'],
    documentTypes: ['Service Menu', 'Price List'],
  },

  real_estate: {
    id: 'real_estate',
    label: 'Real Estate',
    icon: Home,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Agent Knowledge', 'Responsiveness', 'Negotiation', 'Market Knowledge', 'Communication'],
    seoKeywords: ['real estate', 'realtor', 'homes for sale', 'real estate agent', 'buy home', 'sell home'],
    faqTemplates: [
      { question: "How do I schedule a showing?", answerTemplate: "You can schedule online or call us at {phone}.", placeholderFields: ['phone'] },
      { question: "What areas do you serve?", answerTemplate: "We serve {service_areas}.", placeholderFields: ['service_areas'] },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about listings, showings, or market insights.",
    commonQueries: ['listings', 'showing', 'buy', 'sell', 'market', 'areas'],
    documentTypes: ['Buyer Guide', 'Seller Guide'],
  },

  professional_services: {
    id: 'professional_services',
    label: 'Professional Services',
    icon: Briefcase,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Expertise', 'Communication', 'Responsiveness', 'Value', 'Results'],
    seoKeywords: ['consultant', 'professional services', 'advisor', 'expert', 'consulting'],
    faqTemplates: [
      { question: "Do you offer free consultations?", answerTemplate: "Yes! We offer a complimentary initial consultation." },
      { question: "What are your rates?", answerTemplate: "Our rates vary by service. Contact us for a custom quote." },
    ],
    widgetGreeting: "Welcome to {business_name}! How can we help with your needs today?",
    commonQueries: ['consultation', 'services', 'rates', 'experience', 'contact'],
    documentTypes: ['Service Brochure', 'Case Studies'],
  },

  photography: {
    id: 'photography',
    label: 'Photography & Videography',
    icon: Camera,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Quality', 'Creativity', 'Professionalism', 'Communication', 'Value', 'Turnaround'],
    seoKeywords: ['photographer', 'photography', 'videographer', 'wedding photographer', 'portraits', 'photo shoot'],
    faqTemplates: [
      { question: "How do I book a session?", answerTemplate: "Contact us to check availability and secure your date with a deposit." },
      { question: "How long until I receive my photos?", answerTemplate: "Most sessions are delivered within 2-4 weeks." },
      { question: "Do you travel for shoots?", answerTemplate: "Yes! Travel fees may apply depending on location." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about sessions, packages, or availability.",
    commonQueries: ['booking', 'prices', 'packages', 'availability', 'prints'],
    documentTypes: ['Price List', 'Package Info', 'Portfolio'],
  },

  beauty: {
    id: 'beauty',
    label: 'Beauty & Cosmetics',
    icon: Palette,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Artists', 'Products', 'Technique', 'Cleanliness', 'Results', 'Value'],
    seoKeywords: ['makeup artist', 'beauty', 'cosmetics', 'lashes', 'brows', 'beauty services'],
    faqTemplates: [
      { question: "Do I need an appointment?", answerTemplate: "Yes, appointments are recommended to ensure availability." },
      { question: "What products do you use?", answerTemplate: "We use high-quality, professional-grade products." },
    ],
    widgetGreeting: "Welcome to {business_name}! Book your beauty appointment or ask about services.",
    commonQueries: ['appointment', 'prices', 'lashes', 'brows', 'makeup'],
    documentTypes: ['Service Menu', 'Price List'],
  },

  education: {
    id: 'education',
    label: 'Education & Tutoring',
    icon: GraduationCap,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Teachers', 'Curriculum', 'Results', 'Environment', 'Communication', 'Value'],
    seoKeywords: ['tutoring', 'education', 'learning', 'classes', 'tutor near me', 'lessons'],
    faqTemplates: [
      { question: "What subjects do you offer?", answerTemplate: "We offer tutoring in {subjects}.", placeholderFields: ['subjects'] },
      { question: "How do sessions work?", answerTemplate: "Sessions can be in-person or online, based on your preference." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about classes, tutoring, or enrollment.",
    commonQueries: ['subjects', 'prices', 'schedule', 'enrollment', 'online'],
    documentTypes: ['Course Catalog', 'Price List', 'Schedule'],
  },

  home_services: {
    id: 'home_services',
    label: 'Home Services & Repair',
    icon: Wrench,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Quality', 'Reliability', 'Pricing', 'Cleanliness', 'Communication', 'Timeliness'],
    seoKeywords: ['plumber', 'electrician', 'handyman', 'home repair', 'contractor', 'home services'],
    faqTemplates: [
      { question: "Do you offer free estimates?", answerTemplate: "Yes! We provide free estimates for most jobs." },
      { question: "Are you licensed and insured?", answerTemplate: "Yes, we are fully licensed and insured." },
      { question: "What areas do you serve?", answerTemplate: "We serve {service_areas}.", placeholderFields: ['service_areas'] },
    ],
    widgetGreeting: "Welcome to {business_name}! Get a quote or ask about our services.",
    commonQueries: ['estimate', 'services', 'availability', 'emergency', 'areas'],
    documentTypes: ['Service List', 'Price Guide'],
  },

  hotel: {
    id: 'hotel',
    label: 'Hotel & Hospitality',
    icon: Hotel,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Rooms', 'Cleanliness', 'Staff', 'Amenities', 'Location', 'Value'],
    seoKeywords: ['hotel', 'accommodation', 'rooms', 'stay', 'hotel near me', 'booking'],
    faqTemplates: [
      { question: "What time is check-in/check-out?", answerTemplate: "Check-in is at {checkin_time}, check-out is at {checkout_time}.", placeholderFields: ['checkin_time', 'checkout_time'] },
      { question: "Is breakfast included?", answerTemplate: "Breakfast is included with select room packages." },
      { question: "Do you have parking?", answerTemplate: "Yes, we offer {parking_info}.", placeholderFields: ['parking_info'] },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about rooms, amenities, or reservations.",
    commonQueries: ['rooms', 'rates', 'amenities', 'parking', 'checkin', 'pool'],
    documentTypes: ['Room Brochure', 'Amenities Guide'],
  },

  pet_services: {
    id: 'pet_services',
    label: 'Pet Services & Grooming',
    icon: Dog,
    needsMenu: false,
    needsServices: true,
    needsPriceList: true,
    characteristics: ['Care Quality', 'Staff', 'Cleanliness', 'Safety', 'Communication', 'Value'],
    seoKeywords: ['pet grooming', 'dog groomer', 'pet care', 'pet boarding', 'dog daycare', 'groomer near me'],
    faqTemplates: [
      { question: "Do I need an appointment?", answerTemplate: "Appointments are recommended but walk-ins may be available." },
      { question: "What vaccinations are required?", answerTemplate: "We require up-to-date rabies and distemper vaccinations." },
      { question: "How long does grooming take?", answerTemplate: "Most grooming sessions take 2-3 hours depending on the service." },
    ],
    widgetGreeting: "Welcome to {business_name}! Ask about grooming, boarding, or appointments.",
    commonQueries: ['grooming', 'prices', 'boarding', 'appointment', 'vaccines'],
    documentTypes: ['Service Menu', 'Price List', 'Vaccination Policy'],
  },

  other: {
    id: 'other',
    label: 'Other Business',
    icon: Briefcase,
    needsMenu: false,
    needsServices: true,
    needsPriceList: false,
    characteristics: ['Service Quality', 'Staff', 'Value', 'Communication', 'Reliability'],
    seoKeywords: ['business', 'services', 'local business'],
    faqTemplates: [
      { question: "What are your hours?", answerTemplate: "We're open {hours}.", placeholderFields: ['hours'] },
      { question: "How can I contact you?", answerTemplate: "Call us at {phone} or email {email}.", placeholderFields: ['phone', 'email'] },
    ],
    widgetGreeting: "Welcome to {business_name}! How can we help you today?",
    commonQueries: ['hours', 'services', 'contact', 'location'],
    documentTypes: ['Service Info', 'Brochure'],
  },
};

export const INDUSTRY_LIST = Object.values(INDUSTRIES);

export function getIndustryById(id: string): IndustryConfig | undefined {
  return INDUSTRIES[id];
}

export function getIndustryDocumentPrompt(industry: IndustryConfig): string {
  if (industry.needsMenu) {
    return "Upload your menu (PDF or image)";
  }
  if (industry.needsPriceList) {
    return "Upload your price list or service menu";
  }
  if (industry.needsServices) {
    return "Upload your service catalog or brochure";
  }
  return "Upload any documents your AI should know about";
}
