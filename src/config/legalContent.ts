import type { SiteConfig } from '@/src/types';

export type LegalDocKind = 'privacy' | 'terms' | 'cancellation' | 'cookies';

export type LegalSection = {
  title?: string;
  paragraphs: string[];
};

/** Primary routes (English); aliases handled in App routing */
export const LEGAL_ROUTES: Record<LegalDocKind, string> = {
  privacy: '/privacy',
  terms: '/terms',
  cancellation: '/cancellation',
  cookies: '/cookies',
};

export function legalKindToPath(kind: LegalDocKind): string {
  return LEGAL_ROUTES[kind];
}

/** Recognize legal URLs (English + Spanish aliases). */
export function parseLegalFromPath(pathname: string): LegalDocKind | null {
  const p = pathname.replace(/\/$/, '') || '/';
  const routes: Record<string, LegalDocKind> = {
    '/privacy': 'privacy',
    '/privacidad': 'privacy',
    '/terms': 'terms',
    '/terminos': 'terms',
    '/cancellation': 'cancellation',
    '/cancelacion': 'cancellation',
    '/cookies': 'cookies',
    '/cookie-policy': 'cookies',
    '/politica-cookies': 'cookies',
  };
  return routes[p] ?? null;
}

/** Replace placeholders using `siteConfig` legal + brand + location */
export function interpolateLegalText(raw: string, site: SiteConfig): string {
  return raw
    .replaceAll('[NOMBRE_EMPRESA]', site.legal.legalName)
    .replaceAll('[NOMBRE_COMERCIAL]', site.brand.displayName)
    .replaceAll('[DIRECCION]', site.legal.registeredAddress)
    .replaceAll('[TIEMPO_CANCELACION]', site.legal.cancellationNotice)
    .replaceAll('[EMAIL]', site.legal.contactEmail)
    .replaceAll('[TELEFONO]', site.location.phone);
}

function interpolateSections(sections: LegalSection[], site: SiteConfig): LegalSection[] {
  return sections.map((s) => ({
    ...s,
    paragraphs: s.paragraphs.map((p) => interpolateLegalText(p, site)),
  }));
}

type Library = Record<
  SiteConfig['id'],
  Record<LegalDocKind, LegalSection[]>
>;

const NICHE_FALLBACK: SiteConfig['id'] = 'aromaVivo';

const LIBRARY: Library = {
  aromaVivo: {
    privacy: [
      {
        paragraphs: [
          'The data controller responsible for processing your personal data is [NOMBRE_EMPRESA], with registered address at [DIRECCION]. The public-facing trade name is [NOMBRE_COMERCIAL].',
          'This policy describes how we collect and use personal data when you visit our café website, contact us by email or phone, participate in tastings or events where sign-up applies, or use Wi-Fi or other digital services we may offer.',
        ],
      },
      {
        title: '1. Data we may collect',
        paragraphs: [
          'Identification and contact details such as name, telephone number, and email address.',
          'Reservation or event enquiries, dietary notes you voluntarily share, feedback, and correspondence with our team.',
          'Operational records related to your visits when relevant (e.g. catering or private booking coordination).',
          'Minimal technical information from your browsing session where needed for security and reliability (such as browser type and IP address in standard server logs).',
        ],
      },
      {
        title: '2. Purposes',
        paragraphs: [
          'To respond to enquiries, confirm reservations where applicable, and communicate about our products and opening hours.',
          'To comply with accounting, consumer, health-and-safety, or other legal obligations where relevant.',
          'To improve site security, prevent fraud or misuse, and maintain reliable digital services.',
        ],
      },
      {
        title: '3. Retention',
        paragraphs: [
          'We keep personal data only as long as needed for these purposes and applicable legal retention periods.',
        ],
      },
      {
        title: '4. Processors',
        paragraphs: [
          'We may rely on providers for hosting, email delivery, analytics (including Firebase / Google Analytics when enabled), and similar services. They process data on our instructions under appropriate safeguards.',
          'We do not sell your personal data for third-party marketing.',
        ],
      },
      {
        title: '5. Your rights',
        paragraphs: [
          'Depending on applicable law, you may request access, correction, deletion, restriction, portability, or object to certain processing by writing to [EMAIL]. You may also complain to your local supervisory authority.',
        ],
      },
    ],
    terms: [
      {
        paragraphs: [
          'These Terms govern use of the website operated by [NOMBRE_EMPRESA] ([NOMBRE_COMERCIAL]) and general rules for visiting our premises and engaging with our digital channels.',
        ],
      },
      {
        title: '1. Use of the site',
        paragraphs: [
          'You agree to use the site lawfully and not to disrupt its operation, upload malware, or misuse contact forms.',
        ],
      },
      {
        title: '2. Menus, pricing, and availability',
        paragraphs: [
          'Offerings and prices may change; the information on site is indicative. Final availability and pricing are confirmed at the venue unless otherwise stated in writing.',
        ],
      },
      {
        title: '3. Conduct at the venue',
        paragraphs: [
          'We may refuse service or ask visitors to leave where safety, hygiene, licensing rules, or respectful conduct require it.',
        ],
      },
      {
        title: '4. Liability',
        paragraphs: [
          'To the extent permitted by law, liability arising from use of the website is limited to direct damages proven. We do not guarantee uninterrupted availability of online services.',
        ],
      },
    ],
    cancellation: [
      {
        paragraphs: [
          '[NOMBRE_COMERCIAL], operated by [NOMBRE_EMPRESA], applies the following cancellation expectations for reservations or private bookings where advance booking applies.',
        ],
      },
      {
        title: '1. Notice',
        paragraphs: [
          'To cancel or reschedule without late consequences, please notify us at least [TIEMPO_CANCELACION], measured from the scheduled start time.',
        ],
      },
      {
        title: '2. Late changes',
        paragraphs: [
          'Late cancellations or no-shows may affect future booking privileges or deposits if explained when you confirmed the reservation.',
        ],
      },
      {
        title: '3. How to contact us',
        paragraphs: [
          'Email [EMAIL] or call [TELEFONO] with your name and booking details.',
        ],
      },
    ],
    cookies: [
      {
        paragraphs: [
          'This Cookie and Similar Technologies Policy explains how [NOMBRE_EMPRESA] (trading as [NOMBRE_COMERCIAL]) uses cookies and similar technologies on this website, including optional Google Firebase services (such as Analytics).',
        ],
      },
      {
        title: '1. What we use',
        paragraphs: [
          'Strictly necessary cookies to load pages and maintain basic functionality.',
          'If Firebase Authentication or similar tools are enabled for operational areas, session-related technologies may be used as described in our Privacy Policy.',
          'If Analytics is enabled, aggregated usage statistics may help us understand traffic—without selling your data for unrelated marketing.',
        ],
      },
      {
        title: '2. Your choices',
        paragraphs: [
          'You can manage cookies in your browser settings. Blocking all cookies may affect some features.',
        ],
      },
      {
        title: '3. Contact',
        paragraphs: [
          'Questions: [EMAIL]. See also our Privacy Policy.',
        ],
      },
    ],
  },

  tattoo: {
    privacy: [
      {
        paragraphs: [
          'The data controller responsible for processing your personal data is [NOMBRE_EMPRESA], with registered address at [DIRECCION]. For the purposes of this Policy, the trade name under which it operates publicly is [NOMBRE_COMERCIAL].',
          'This policy explains how we collect and process personal data submitted through our website, consultation forms, booking tools, and communications related to tattoo, piercing, and studio services.',
        ],
      },
      {
        title: '1. Data We May Collect',
        paragraphs: [
          'Identification and contact information such as full name, phone number, and email address.',
          'Booking and consultation details, including requested service, preferred artist, date, time, placement ideas, reference notes, and other information you voluntarily provide about your project.',
          'Operational records associated with your appointments, rescheduling requests, inquiries, and communications with the studio.',
          'Information relevant to the safe delivery of the service when voluntarily disclosed by you, such as allergies, skin sensitivities, medical considerations, or aftercare concerns.',
          'Minimal technical data generated by your visit to the site, such as IP address, browser type, and pages visited, where necessary for security and proper site operation.',
        ],
      },
      {
        title: '2. Purposes and Legal Basis',
        paragraphs: [
          'Managing consultation requests, bookings, confirmations, reschedules, waiting lists, and operational communications related to your appointment.',
          'Assessing project feasibility, artist availability, and the general suitability of a requested tattoo or piercing service before confirmation.',
          'Responding to inquiries submitted through forms, email, or studio communication channels.',
          'Maintaining records required for customer service, internal administration, legal compliance, and the defense of potential claims.',
          'Improving site security, preventing abusive or fraudulent use of booking tools, and ensuring the reliable operation of digital systems.',
        ],
      },
      {
        title: '3. Retention',
        paragraphs: [
          'We retain personal data only for as long as necessary to fulfill the purposes described above and to comply with applicable legal, accounting, health and safety, or record-keeping obligations. Certain appointment or consent-related records may be retained for longer where reasonably necessary to document the service provided or defend against claims.',
        ],
      },
      {
        title: '4. Recipients and Processors',
        paragraphs: [
          'We may use providers for web hosting, email delivery, booking infrastructure, analytics (including Firebase / Google Analytics where enabled), and similar operational services. Where such providers process personal data on our behalf, we require them to act under appropriate contractual safeguards.',
          'We do not sell personal data or disclose client information to third parties for their own independent marketing purposes.',
        ],
      },
      {
        title: '5. Your Rights',
        paragraphs: [
          'Subject to applicable law, you may request access, rectification, erasure, restriction of processing, portability, or objection by contacting [EMAIL] and providing reasonable proof of identity. You may also lodge a complaint with the competent supervisory authority if you believe your rights have been infringed.',
        ],
      },
    ],
    terms: [
      {
        paragraphs: [
          'These Terms govern access to and use of the website operated by [NOMBRE_EMPRESA] ([NOMBRE_COMERCIAL]) and the request, consultation, and booking of tattoo, piercing, and related studio services.',
        ],
      },
      {
        title: '1. Use of the Site',
        paragraphs: [
          'Users agree to use the site lawfully, in good faith, and without interfering with its availability or security. Fraudulent bookings, misuse of communication forms, malicious software, or automated abuse of the booking system are strictly prohibited.',
        ],
      },
      {
        title: '2. Consultations and Bookings',
        paragraphs: [
          'Submitting a booking or consultation request does not guarantee acceptance of the requested service. Studio confirmation may depend on artist availability, design suitability, placement considerations, age requirements, health and safety criteria, or any other relevant professional assessment.',
          'Published prices, durations, and availability are indicative unless expressly stated otherwise. Final pricing may vary depending on size, complexity, placement, artist selection, number of sessions required, and any custom design work approved during consultation.',
        ],
      },
      {
        title: '3. Client Responsibilities',
        paragraphs: [
          'Clients must provide truthful and complete information relevant to the requested service, including any allergies, skin conditions, medical concerns, medications, or healing issues that could affect the session.',
          'Where required by law or studio policy, proof of age or identity may be requested before the service is provided. We reserve the right to refuse or postpone any service where legal, safety, hygiene, or professional standards are not met.',
        ],
      },
      {
        title: '4. Payments and Deposits',
        paragraphs: [
          'This template does not integrate online card payments by default. Where deposits or payments are arranged separately (in person or via another channel), the conditions communicated at booking apply.',
        ],
      },
      {
        title: '5. Limitation of Liability',
        paragraphs: [
          'To the maximum extent permitted by law, our liability arising from use of the website is limited to direct damages duly proven. We do not guarantee uninterrupted availability of digital services.',
          'Tattooing and piercing involve inherent variations related to skin type, healing, aftercare compliance, lifestyle, and other factors outside the studio\'s reasonable control. Clients are responsible for following aftercare instructions and for disclosing relevant information before the session.',
        ],
      },
    ],
    cancellation: [
      {
        paragraphs: [
          '[NOMBRE_COMERCIAL], operated by [NOMBRE_EMPRESA], maintains a cancellation and rescheduling policy designed to protect artist time, custom design preparation, and the integrity of scheduled studio sessions.',
        ],
      },
      {
        title: '1. Minimum Notice Period',
        paragraphs: [
          'To cancel or reschedule an appointment without late-cancellation consequences, clients must notify the studio at least: [TIEMPO_CANCELACION].',
          'This notice period is calculated from the scheduled start time of the confirmed session.',
        ],
      },
      {
        title: '2. Late Cancellations, Deposits, and No-Shows',
        paragraphs: [
          'Cancellations made outside the required notice window may result in loss of deposit, partial charges, or restrictions on future booking privileges, depending on the specific booking conditions communicated for the session.',
          'No-shows or repeated last-minute reschedules may require a non-refundable deposit or full prepayment before a new appointment is accepted.',
        ],
      },
      {
        title: '3. How to Cancel or Reschedule',
        paragraphs: [
          'Contact the studio by email at [EMAIL] or by phone at [TELEFONO], including your full name and the original date and time of the appointment.',
        ],
      },
      {
        title: '4. Studio-Initiated Changes',
        paragraphs: [
          'In exceptional circumstances, the studio may need to reschedule an appointment due to artist illness, safety concerns, technical issues, or other operational reasons. In such cases, we will use reasonable efforts to offer an alternative date or apply any deposit in accordance with the agreed booking conditions.',
        ],
      },
    ],
    cookies: [
      {
        paragraphs: [
          'This Cookie and Similar Technologies Policy explains how [NOMBRE_EMPRESA] (trading as [NOMBRE_COMERCIAL]) uses cookies, local storage, and similar technologies on this website, in connection with services provided through Google Firebase (including optional Google Analytics) and related tools.',
        ],
      },
      {
        title: '1. What we use and why',
        paragraphs: [
          'Strictly necessary / functional: to keep the site working, load content, and (where used) maintain secure sessions with Firebase Authentication.',
          'Analytics and performance: if enabled, Google Analytics (via Firebase) may help us understand traffic in aggregate—not to sell data for unrelated third-party marketing.',
        ],
      },
      {
        title: '2. Your choices',
        paragraphs: [
          'You can control or delete cookies through your browser settings. Blocking all cookies may limit some features.',
          'Where applicable, you may use industry opt-out tools for interest-based advertising.',
        ],
      },
      {
        title: '3. More information',
        paragraphs: [
          'See our Privacy Policy for broader data practices. Contact [EMAIL] for questions about cookies or your rights.',
        ],
      },
    ],
  },
};

function pickNiche(id: SiteConfig['id']): SiteConfig['id'] {
  if (id in LIBRARY) return id;
  return NICHE_FALLBACK;
}

export function getLegalDocument(kind: LegalDocKind, site: SiteConfig): LegalSection[] {
  const niche = pickNiche(site.id);
  const sections = LIBRARY[niche][kind];
  return interpolateSections(sections, site);
}
