export const cities = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Pune",
  "Kolkata",
  "Jaipur",
  "Chandigarh",
  "Goa",
];

export const offers = [
  {
    id: "seven-day",
    title: "Lowest price on 7 day rentals",
    subtitle: "Flat 15% off when you book a full week",
    code: "WEEK15",
    accent: "from-brand-500 to-brand-700",
  },
  {
    id: "goa-subscription",
    title: "Goa subscriptions from ₹19,999/mo",
    subtitle: "Keep the car for a month, insurance included",
    code: "GOA30",
    accent: "from-ink-800 to-ink-950",
  },
  {
    id: "weekday-drop",
    title: "Weekday prices dropped again",
    subtitle: "Up to 10% off Monday to Thursday pickups",
    code: "WEEKDAY10",
    accent: "from-amber-500 to-orange-600",
  },
  {
    id: "first-trip",
    title: "₹500 off your first Revv trip",
    subtitle: "New users only, valid on all cars",
    code: "FIRST500",
    accent: "from-emerald-500 to-teal-700",
  },
];

export const coupons = {
  WEEK15: { type: "percent", value: 15, label: "15% off week-long rentals" },
  GOA30: { type: "percent", value: 12, label: "12% subscription discount" },
  WEEKDAY10: { type: "percent", value: 10, label: "10% weekday discount" },
  FIRST500: { type: "flat", value: 500, label: "₹500 off your first trip" },
};

export const steps = [
  {
    id: 1,
    title: "Pick your city and dates",
    body: "Tell us where you are and how long you need the car. Prices update instantly.",
  },
  {
    id: 2,
    title: "Choose a car and a plan",
    body: "Filter by budget, seats or gearbox, then pick a daily kilometre plan that fits your trip.",
  },
  {
    id: 3,
    title: "Upload documents once",
    body: "Licence and ID get verified in minutes. Returning customers skip this step entirely.",
  },
  {
    id: 4,
    title: "Unlock and drive away",
    body: "Collect from a hub or get the car delivered to your door. No queues, no paperwork.",
  },
];

export const perks = [
  {
    icon: "ShieldCheck",
    title: "Insurance on every trip",
    body: "Zero-depreciation cover is bundled into the price, not sold as an upsell at the counter.",
  },
  {
    icon: "Sparkles",
    title: "Sanitised before handover",
    body: "Every car is deep-cleaned and photo-verified between bookings, inside and out.",
  },
  {
    icon: "Wrench",
    title: "Roadside help, 24x7",
    body: "One tap in the app brings help anywhere in India, including a replacement car.",
  },
  {
    icon: "BadgeIndianRupee",
    title: "No hidden charges",
    body: "The price you see includes taxes. Fuel and tolls are the only extras, as they should be.",
  },
  {
    icon: "Car",
    title: "Largest owned fleet",
    body: "Over 4,000 company-owned cars, so the car you booked is the car you get.",
  },
  {
    icon: "Clock",
    title: "Hourly to monthly",
    body: "Book for two hours or two months. The longer you keep it, the cheaper each day gets.",
  },
];

export const stats = [
  { value: 4302, prefix: "₹", label: "Average price per day", suffix: "" },
  { value: 4000, prefix: "", label: "Cars in the fleet", suffix: "+" },
  { value: 61, prefix: "₹", label: "Cheapest hourly rate", suffix: "/hr" },
  { value: 4.4, label: "Average customer rating", suffix: "/5", decimals: 1 },
];

export const testimonials = [
  {
    name: "Ananya Iyer",
    city: "Bengaluru",
    rating: 5,
    body: "Booked a Creta for a Coorg weekend at 11pm and had it at my gate by 7am. The car was spotless and the fuel policy was exactly what the app said it would be.",
  },
  {
    name: "Rohit Menon",
    city: "Mumbai",
    rating: 5,
    body: "I have been on the monthly subscription for eight months now. Cheaper than owning once you count insurance and servicing, and I can swap the car whenever I want.",
  },
  {
    name: "Sneha Kulkarni",
    city: "Pune",
    rating: 4,
    body: "Returned the car two hours late and was charged exactly the hourly rate shown in the terms. No arguments, no surprise deductions from the deposit.",
  },
  {
    name: "Karthik Reddy",
    city: "Hyderabad",
    rating: 5,
    body: "The Thar was the highlight of our trip. Pickup took under ten minutes because my documents were already verified from a previous booking.",
  },
  {
    name: "Meera Nair",
    city: "Delhi NCR",
    rating: 5,
    body: "Had a flat on the Yamuna Expressway. Support answered in under a minute and a technician reached us in forty. That alone made me a repeat customer.",
  },
  {
    name: "Aditya Sharma",
    city: "Jaipur",
    rating: 4,
    body: "Good fleet and honest pricing. Would like more automatic hatchbacks in the city, but everything else has been smooth across five bookings.",
  },
];

export const journey = [
  { year: "2015", body: "Revv is founded in Gurugram with a fleet of 50 cars." },
  { year: "2017", body: "Subscriptions launch, letting customers keep a car for months." },
  { year: "2019", body: "Doorstep delivery rolls out across eight cities." },
  { year: "2021", body: "Contactless pickup and in-app unlocking go live nationwide." },
  { year: "2023", body: "Fleet crosses 4,000 company-owned cars." },
  { year: "2025", body: "Revv operates in 20+ cities with a 4.4 average rating." },
];

export const faqs = [
  {
    category: "Booking",
    question: "What is the minimum age to rent a Revv car?",
    answer:
      "You must be at least 21 years old and hold a driving licence for Light Motor Vehicles that is at least one year old on the day your trip starts.",
  },
  {
    category: "Booking",
    question: "Which documents do I need to carry?",
    answer:
      "An original government ID (Aadhaar, Passport or PAN) and your original driving licence. Photocopies and digital images are not accepted at handover.",
  },
  {
    category: "Booking",
    question: "How much is the security deposit?",
    answer:
      "Between ₹3,000 and ₹5,000 depending on the car, blocked at pickup and refunded within 7 working days of return after deducting any tolls, fines or damages.",
  },
  {
    category: "Booking",
    question: "Can I book a car for just a few hours?",
    answer:
      "Yes. Hourly rentals start at ₹61 per hour with a minimum booking of two hours. Hourly plans include a fixed kilometre allowance shown at checkout.",
  },
  {
    category: "Booking",
    question: "Can someone else drive the car?",
    answer:
      "Only drivers registered on the booking may drive. You can add a second driver during checkout at no extra cost, provided they meet the same licence criteria.",
  },
  {
    category: "On the road",
    question: "Is there a speed limit?",
    answer:
      "Revv allows up to 125 km/hr. In a few cities cars carry speed governors set to 80 km/hr as per government directives. Always follow local speed limits.",
  },
  {
    category: "On the road",
    question: "Can I take the car outstation?",
    answer:
      "Yes, all cars are permitted for outstation travel across India. Interstate permits are already in place, so you only pay the tolls and any state entry fees.",
  },
  {
    category: "On the road",
    question: "Are there any restricted areas?",
    answer:
      "Leh, Ladakh, Spiti Valley and the Kaza and Nako regions are off limits. You are fully liable for any damage incurred if the car is taken there.",
  },
  {
    category: "On the road",
    question: "What happens if the car breaks down?",
    answer:
      "Call the 24x7 helpline from the app. Roadside assistance is included on every booking and a replacement car is arranged if the fault cannot be fixed on the spot.",
  },
  {
    category: "On the road",
    question: "Who pays for tolls and fuel?",
    answer:
      "You do. Cars are handed over with a set fuel level and must be returned at the same level. Tolls and FASTag charges are settled against your deposit.",
  },
  {
    category: "Payments",
    question: "What does the rental price include?",
    answer:
      "The daily rate, GST, insurance with zero depreciation cover, roadside assistance and your chosen kilometre allowance. Fuel and tolls are extra.",
  },
  {
    category: "Payments",
    question: "What if I exceed the kilometre limit?",
    answer:
      "Extra kilometres are billed at the per-kilometre rate shown on the car's page, typically between ₹6 and ₹16 depending on the model.",
  },
  {
    category: "Payments",
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes. Cancellations more than 24 hours before pickup are free. Within 24 hours a nominal fee applies. Extensions are subject to availability and charged at the standard rate.",
  },
  {
    category: "Payments",
    question: "What if I return the car late?",
    answer:
      "Late returns are charged at 1.5 times the hourly rate for the first three hours, after which a full extra day is billed. Tell us in advance and we will extend instead.",
  },
  {
    category: "Insurance",
    question: "Am I covered in an accident?",
    answer:
      "Every booking includes comprehensive insurance with zero depreciation. You pay a fixed damage excess, capped well below the deposit for most cars.",
  },
  {
    category: "Insurance",
    question: "Is the car sanitised between bookings?",
    answer:
      "Yes. Each car is deep-cleaned, disinfected at every touch point and photo-verified by our team before it reaches you.",
  },
];

export const faqCategories = [...new Set(faqs.map((f) => f.category))];

export const footerLinks = [
  {
    title: "Rentals",
    links: [
      { label: "Self drive cars", to: "/cars" },
      { label: "Hourly rentals", to: "/cars?sort=price-asc" },
      { label: "Outstation trips", to: "/cars?segment=SUV" },
      { label: "Airport pickup", to: "/cars?segment=Sedan" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Revv", to: "/about" },
      { label: "Our journey", to: "/about#journey" },
      { label: "Careers", to: "/about#careers" },
      { label: "Press", to: "/about#press" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQs", to: "/faq" },
      { label: "Booking help", to: "/faq?category=Booking" },
      { label: "Payments", to: "/faq?category=Payments" },
      { label: "Insurance", to: "/faq?category=Insurance" },
    ],
  },
];
