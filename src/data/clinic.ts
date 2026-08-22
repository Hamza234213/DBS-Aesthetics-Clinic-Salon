export const clinicInfo = {
  name: "DBS Aesthetics Clinic & Salon",
  footername: "DBS Aesthetics",
  footersubname: "Clinic & Salon",
  tagline: "Luxury skincare, advanced aesthetics and expert salon care in Karachi",
  phone: "0333-3378862",
  landline: "021-33485322",
  whatsapp: "0333-3378862",
  address1: "13-C Khayaban-e-Saadi, phase 7, opposite to TM roots pharmacy, Phase 7 Ext Karachi, 75500, Pakistan",
  address2: "Plot no 30c, 2nd floor, Phase 5 Ext, Badar Commercial Street 6, Karachi",
  googleMapsUrl: "https://maps.google.com/?q=13-C+Khayaban-e-Saadi+Phase+7+Karachi",
  hours: "11:00 AM – 8:00 PM",
contactvision: "We believe great aesthetics begin with honest advice and personalized care. Every treatment is carefully selected to suit your features, goals, and individual needs. From advanced treatments to detailed consultations, we focus on comfort, safety, and natural-looking results. Our dedicated aftercare ensures you feel supported and confident throughout your entire journey",

  theme: {
    primary: "#c9ac6a",
    background: "#232323",
    muted: "#6f6759",
    card: "#2d2d2d",
    text: "#f7f2e9",
  },
  footerabout:
    "A trusted destination for advanced aesthetics and luxury salon services in Karachi.",
  about:
    "DBS Aesthetic Clinic & Salon by Zaini is a trusted beauty and skincare destination in Karachi, offering a perfect blend of advanced aesthetic treatments and professional salon services under one roof. Our major services include laser hair removal, HydraFacial and skin rejuvenation treatments, along with expert hair styling and makeovers. Under the guidance of our Doctors, renowned for his artistry and dedication, we focus on delivering safe, personalized, and result-driven treatments. With certified experts, modern technology, strict hygiene standards, and honest consultations, we ensure every client feels confident and cared for. At DBS, your satisfaction and trust are our guarantee.",
  homepageAbout: 
  "Discover the pinnacle of beauty at our Aesthetic Skin Clinic and Salon. With advanced treatments and expert care, we unlock your radiant potential embark on a transfromative journey to rejuvenation and confidence with us.",
    vision:
    "To be the most trusted luxury aesthetics and salon destination in Pakistan, setting new standards for personalized care, medical safety, and visible transformations.",
  mission:
    "To deliver thoughtful, result-driven treatments with medical precision, premium hospitality, and a client-first experience that builds lasting confidence.",
  socials: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    whatsapp: "https://wa.me/923333378862?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment.",
  },
};

export const featuredTreatments = [
  {
    title: "Hydra Facial",
    description: "Deep cleansing and hydration for radiant, glowing skin.",
    duration: "60 mins",
    image: "/hydra.png"
  },
  {
    title: "Laser Hair Removal",
    description: "Permanent hair reduction with advanced laser technology.",
    duration: "45-90 mins",
    image: "/laser.png"
  },
  {
    title: "Luxury Hair Styling",
    description: "Professional haircuts, styling, and color transformations.",
    duration: "60-90 mins",
    image: "/hairstyle.png"
  },
    {
    slug: "skin-treatments",
    title: "Skin Treatments",
     duration: "60 mins",
    description: "Rejuvenation and corrective skin treatments for visible radiance.",
    image: "/image2.png",
  },
  {
    slug: "body-treatments",
    title: "Body Treatments",
     duration: "60-75 mins",
    description: "Body contouring and sculpting solutions with a luxurious finish.",
    image: "/skintreatment.png",
  },
  {
    slug: "salon-services",
    title: "Salon Services",
     duration: "45-90 mins",
    description: "Hair styling, makeovers and grooming experiences in a private setting.",
    image: "/image1.png",
  },
];

export const treatmentCategories = [
  {
    slug: "facial-treatments",
    title: "Facial Treatments",
    description: "Advanced facials, skin resurfacing and glow-focused therapies.",
    image: "/skincare.png",
  },
  {
    slug: "hair-treatments",
    title: "Hair Treatments",
    description: "Repair, restore and sculpt with premium scalp and hair therapies.",
    image: "/patchyhair.png",
  },
  {
    slug: "laser-treatments",
    title: "Laser Treatments",
    description: "Medical-grade laser services for skin correction and hair reduction.",
    image: "/laser.png",
  },
  {
    slug: "skin-treatments",
    title: "Skin Treatments",
    description: "Rejuvenation and corrective skin treatments for visible radiance.",
    image: "/image2.png",
  },
  {
    slug: "body-treatments",
    title: "Body Treatments",
    description: "Body contouring and sculpting solutions with a luxurious finish.",
    image: "/skintreatment.png",
  },
  {
    slug: "salon-services",
    title: "Salon Services",
    description: "Hair styling, makeovers and grooming experiences in a private setting.",
    image: "/image1.png",
  },
];

// ===== SERVICES WITH PRICES =====
export const servicesWithPrices = {
  laserHairRemoval: {
    category: "Laser Hair Removal",
    description: "Permanent reduction for smooth, hair-free skin.",
    treatments: [
      { name: "Full Body Laser (Unlimited Sessions)", packagePrice: 75000, individualPrice: 8000 },
      { name: "Hand & Foot Laser (8 Sessions)", packagePrice: 35000, individualPrice: 8000 },
      { name: "Face & Neck Laser (6 Sessions)", packagePrice: 20000, individualPrice: 4500 },
      { name: "Underarm Laser (6 Sessions)", packagePrice: 25000, individualPrice: 5000 },
      { name: "Bikini Laser (6 Sessions)", packagePrice: 25000, individualPrice: 5000 },
    ]
  },
  hifuTreatments: {
    category: "HIFU Treatments",
    description: "Lift, tighten, and rejuvenate with high-intensity focused ultrasound.",
    treatments: [
      { name: "Body HIFU", price: 65000 },
      { name: "Face, Chin & Neck", price: 40000 },
      { name: "Face & Chin", price: 30000 },
    ]
  },
  hydraFacials: {
    category: "Hydra Facials",
    description: "Deep-cleansing, hydrating, and glow-boosting facial treatments.",
    treatments: [
      { name: "Glow Hydra Facial", price: 10000 },
      { name: "Hydra Signature Facial (Cocktail)", price: 6000 },
      { name: "Hydra Facial Black Beauty", price: 11000 },
      { name: "Vampire Hydra Facial", price: 12000 },
      { name: "Standard Hydra Facial", price: 5000 },
    ]
  },
  skinWhiteningDrips: {
    category: "Skin Whitening Drips",
    description: "Intravenous glutathione and vitamin infusions for bright, even-toned skin.",
    treatments: [
      { name: "Whitening Drips (per session)", priceRange: "12,000 – 50,000" },
      { name: "Whitening Skin Black (All Sessions Package)", price: 80000 },
    ]
  },
  eyebrowLipTints: {
    category: "Eyebrow & Lip Tints",
    description: "Semi-permanent color enhancement for brows and lips.",
    treatments: [
      { name: "Eyebrows Tint", price: 8000 },
      { name: "Lip Tint", price: 8000 },
    ]
  },
  hairTreatments: {
    category: "Hair Treatments",
    description: "Repair, restore and strengthen with premium scalp and hair therapies.",
    treatments: [
      { name: "Deep Conditioning", price: 1600 },
      { name: "Oil Massage", price: 1000 },
      { name: "Oil Massage with Shampoo", price: 2500 },
      { name: "Protein Treatment", price: 3000 },
      { name: "Pro Keratin", price: 4000 },
      { name: "Glamour Conditioner", price: 2500 },
    ]
  }
};

// ===== FLAT SERVICE LIST FOR DISPLAY =====
export const allServices = [
  // Laser Hair Removal
  ...servicesWithPrices.laserHairRemoval.treatments.map(t => ({
    category: "Laser Hair Removal",
    categoryDescription: "Permanent reduction for smooth, hair-free skin.",
    name: t.name,
    packagePrice: t.packagePrice ? `PKR ${t.packagePrice.toLocaleString()}` : null,
    individualPrice: t.individualPrice ? `PKR ${t.individualPrice.toLocaleString()}` : null,
    price: null,
    priceRange: null,
  })),
  // HIFU Treatments
  ...servicesWithPrices.hifuTreatments.treatments.map(t => ({
    category: "HIFU Treatments",
    categoryDescription: "Lift, tighten, and rejuvenate with high-intensity focused ultrasound.",
    name: t.name,
    packagePrice: null,
    individualPrice: null,
    price: `PKR ${t.price.toLocaleString()}`,
    priceRange: null,
  })),
  // Hydra Facials
  ...servicesWithPrices.hydraFacials.treatments.map(t => ({
    category: "Hydra Facials",
    categoryDescription: "Deep-cleansing, hydrating, and glow-boosting facial treatments.",
    name: t.name,
    packagePrice: null,
    individualPrice: null,
    price: `PKR ${t.price.toLocaleString()}`,
    priceRange: null,
  })),
  // Skin Whitening Drips
  ...servicesWithPrices.skinWhiteningDrips.treatments.map(t => ({
    category: "Skin Whitening Drips",
    categoryDescription: "Intravenous glutathione and vitamin infusions for bright, even-toned skin.",
    name: t.name,
    packagePrice: null,
    individualPrice: null,
    price: t.price ? `PKR ${t.price.toLocaleString()}` : null,
    priceRange: t.priceRange || null,
  })),
  // Eyebrow & Lip Tints
  ...servicesWithPrices.eyebrowLipTints.treatments.map(t => ({
    category: "Eyebrow & Lip Tints",
    categoryDescription: "Semi-permanent color enhancement for brows and lips.",
    name: t.name,
    packagePrice: null,
    individualPrice: null,
    price: `PKR ${t.price.toLocaleString()}`,
    priceRange: null,
  })),
  // Hair Treatments
  ...servicesWithPrices.hairTreatments.treatments.map(t => ({
    category: "Hair Treatments",
    categoryDescription: "Repair, restore and strengthen with premium scalp and hair therapies.",
    name: t.name,
    packagePrice: null,
    individualPrice: null,
    price: `PKR ${t.price.toLocaleString()}`,
    priceRange: null,
  })),
];

export const servicePages = [
 {
  slug: "facial-treatments",
  title: "Facial Treatments",
  intro: "Elevated facial therapies designed to refresh, sculpt and reveal your healthiest glow.",
  overview: "Our facial treatments blend advanced skincare technology with expert touch to target dullness, congestion, dehydration and uneven texture.",
  benefits: ["Deep hydration", "Visible glow", "Gentle resurfacing", "Customised for all skin types"],
  process: ["Personal consultation", "Skin analysis", "Treatment application", "Aftercare guidance"],
  duration: "45-90 minutes",
  recovery: "No downtime",
  suitableFor: ["Busy professionals", "Brides", "First-time clients", "Sensitive skin"],
  faqs: [
    { question: "Is the facial treatment painful?", answer: "Most treatments are soothing and comfortable with no significant discomfort." },
    { question: "How often should I book?", answer: "A monthly session is ideal for maintenance and long-term glow." },
  ],
  gallery: ["/prp.png", "/prp2.png"],
},
  {
    slug: "hair-treatments",
    title: "Hair Treatments",
    intro: "Clinical scalp care and restorative therapies for healthier, stronger hair.",
    overview: "From strengthening treatments to premium hair repairs, our hair services focus on visible softness, vitality and manageability.",
    benefits: ["Strengthening care", "Improved shine", "Reduced breakage", "Stress-free styling"],
    process: ["Hair and scalp assessment", "Treatment selection", "Application and styling", "Maintenance plan"],
    duration: "45-75 minutes",
    recovery: "Minimal downtime",
    suitableFor: ["Hair thinning", "Dry hair", "Post-styling damage", "Event-ready hair"],
    faqs: [
      { question: "Can I combine scalp care with styling?", answer: "Yes, many clients pair a treatment with a beauty finish or blowout." },
    ],
    gallery: ["/prgf.png", "/prgf2.png"],
  },
  {
    slug: "laser-treatments",
    title: "Laser Treatments",
    intro: "Medical-grade laser care for precision, comfort and lasting confidence.",
    overview: "Our laser services focus on safe skin correction and hair reduction with an expert-led approach tailored to your needs.",
    benefits: ["Targeted treatment", "Long-term results", "Professional oversight", "Comfort-first sessions"],
    process: ["Medical consultation", "Patch test", "Laser session", "Follow-up care"],
    duration: "20-60 minutes",
    recovery: "1-3 days depending on treatment",
    suitableFor: ["Hair reduction", "Pigmentation concerns", "Skin resurfacing", "Tattoo clarification"],
    faqs: [
      { question: "Are laser treatments safe?", answer: "Yes, treatments are performed by qualified professionals under clinical standards." },
    ],
    gallery: ["/laser1.png", "/laser2.png"],
  },
  {
    slug: "skin-treatments",
    title: "Skin Treatments",
    intro: "Result-focused skin therapies designed to improve tone, texture and resilience.",
    overview: "Our skin treatments combine science-led formulations and luxury care to support glowing, healthy skin.",
    benefits: ["Refined pores", "Even complexion", "Reduced redness", "Boosted hydration"],
    process: ["Consultation", "Treatment prep", "Therapy session", "Recovery guidance"],
    duration: "30-60 minutes",
    recovery: "Minimal to 24 hours",
    suitableFor: ["Dull skin", "Texture concerns", "Acne-prone skin", "Sensitive skin"],
    faqs: [
      { question: "Can I book a treatment if I am pregnant?", answer: "We recommend discussing your medical history during consultation before booking." },
    ],
    gallery: ["/skin1.png", "/skin2.png"],
  },
  {
    slug: "body-treatments",
    title: "Body Treatments",
    intro: "Sculpting, contouring and body-enhancement experiences with a luxe approach.",
    overview: "Our body treatments support inch-loss, sculpting and smoothness goals while prioritizing comfort and confidence.",
    benefits: ["Body contouring", "Firming support", "Minimal downtime", "Tailored sessions"],
    process: ["Goal discussion", "Body assessment", "Treatment session", "Progress planning"],
    duration: "30-90 minutes",
    recovery: "1-2 days",
    suitableFor: ["Body sculpting", "Postpartum confidence", "Wellness goals", "Special occasions"],
    faqs: [
      { question: "Will there be downtime?", answer: "Most sessions have minimal downtime and allow a comfortable return to daily life." },
    ],
    gallery: ["/chest.png", "/chest2.png"],
  },
  {
    slug: "salon-services",
    title: "Salon Services",
    intro: "Private salon care with polished styling, expert finishing and elevated convenience.",
    overview: "From precision haircuts to expressive makeovers, our salon experience blends artistry with hospitality.",
    benefits: ["Signature styling", "Premium finish", "Private experience", "Flexible appointments"],
    process: ["Style consultation", "Cut and finish", "Final styling", "Aftercare tips"],
    duration: "60-90 minutes",
    recovery: "Immediate",
    suitableFor: ["Everyday polish", "Events", "Brides", "Professional styling"],
    faqs: [
      { question: "Can I book a same-day appointment?", answer: "Yes, availability varies, so we recommend contacting the team directly for urgent scheduling." },
    ],
    gallery: ["/tint1.png", "/tint2.png"],
  },
];

export const testimonials = [
  {
    name: "Ayesha",
    title: "Glow treatment client",
    quote: "The team explained every step clearly and the results felt safe, polished and genuinely transformative.",
  },
  {
    name: "Rabia",
    title: "Salon & skincare client",
    quote: "I felt cared for from the first consultation through the final finish, and the experience was seamless.",
  },
  {
    name: "Ali",
    title: "Laser treatment client",
    quote: "The clinic felt premium, modern and highly professional. I would book again without hesitation.",
  },

];

export const faqs = [
  { question: "Do you offer consultation before treatment?", answer: "Yes, every treatment begins with a free private consultation and medical assessment." },
  { question: "What is your appointment process?", answer: "You can call, WhatsApp or complete our online booking form for a preferred date and treatment." },
  { question: "Are the treatments safe?", answer: "Our team follows strict hygiene standards and only recommends suitable treatments after assessment." },
  { question: "Do you accept online consultation requests?", answer: "Yes, we support online consultation requests and can guide you on the best next step." },
];

export const teamMembers = [
  {
    name: "Dr. Zaini",
    role: "Founder & Medical Aesthetic Specialist",
    image: "/image3.png",
    bio: "Known for a refined, artistic approach to skin and facial aesthetics.",
  },

];

export const stats = [
  { value: "10+", label: "Years of care" },
  { value: "4.9/5", label: "Client satisfaction" },
  { value: "40+", label: "Signature treatments" },
  { value: "24/7", label: "WhatsApp support" },
];

export const certifications = [
  "Certified aesthetic treatment protocols",
  "Laser safety & clinical hygiene standards",
  "Advanced skin consultation practice",
  "Trusted luxury salon service training",
];

export const galleryImages = [
  { src: "/image1.png", alt: "Luxury facial treatment room at DBS Aesthetics Clinic & Salon" },
  { src: "/hairstyle.png", alt: "Modern salon styling experience with premium finishing" },
  { src: "/image2.png", alt: "Advanced laser and skincare treatment environment" },
  { src: "/team.png", alt: "Professional team preparing a client for treatment" },
];