import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "YTech",
    category: "Webdesign",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    description: "Professionele website voor een toonaangevend elektrotechnisch installatiebedrijf.",
    year: "2024",
    tags: ["Webdesign", "Branding", "WordPress", "SEO"],
    longDescription: "YTech Elektrotechniek is een innovatief installatiebedrijf uit Vlaardingen dat woningbouw, utiliteit en renovatieprojecten door heel Nederland bedient. Wij ontwierpen en bouwden een professionele website die hun expertise, projecten en diensten helder en overtuigend presenteert aan aannemers, projectontwikkelaars en opdrachtgevers.",
    highlights: [
      "Heldere dienstenpagina's per sector (woningbouw, utiliteit, renovatie)",
      "SEO-geoptimaliseerd voor lokale en nationale vindbaarheid",
      "Mobielvriendelijk ontwerp afgestemd op het gele merkidentiteit van YTech"
    ],
    url: "https://ytech.nl",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
    ]
  },
  {
    id: 2,
    title: "Apex Systems",
    category: "Fintech",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    description: "High-performance dashboard design voor complexe data visualisatie.",
    year: "2024",
    tags: ["React", "D3.js", "TypeScript", "WebSockets"],
    longDescription: "Voor Apex Systems ontwikkelden we een geavanceerd analytics dashboard dat real-time financiële data verwerkt van duizenden bronnen tegelijkertijd. Het dark-first ontwerp minimaliseert cognitieve belasting tijdens lange werksessies, terwijl de interactieve grafieken complexe patronen direct inzichtelijk maken.",
    highlights: [
      "Real-time updates via WebSocket verbindingen",
      "Dark-first design voor minimale oogvermoeidheid",
      "Exporteer rapporten in PDF, CSV en Excel"
    ],
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop",
    ]
  },
  {
    id: 3,
    title: "Lumina",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
    description: "Een levendig en futuristisch digitaal platform voor creatieve talenten.",
    year: "2023",
    tags: ["Next.js", "Framer Motion", "Headless CMS", "Stripe"],
    longDescription: "Lumina biedt creatieve professionals een elegante plek om hun werk te presenteren en opdrachten te boeken. Het platform combineert een motion-rijke portfolioweergave met een naadloze boekingsflow en geïntegreerde betalingsverwerking. De headless CMS-architectuur laat talenten hun pagina zelfstandig beheren.",
    highlights: [
      "Portfoliowidgets met vloeiende overgangsanimaties",
      "Geïntegreerde boekings- en betalingsflow via Stripe",
      "SEO-geoptimaliseerde statische pagina's via Next.js SSG"
    ],
    images: [
      "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    ]
  },
  {
    id: 4,
    title: "Vanguard",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    description: "Minimalistisch fashion platform met focus op high-end visuals.",
    year: "2023",
    tags: ["Shopify", "GSAP", "Editorial Design", "Liquid"],
    longDescription: "Vanguard is een exclusief fashion platform waar het merk centraal staat boven het product. We ontwierpen een lookbook-gedreven winkelervaring waarbij editorial fotografie op volledig scherm de toon zet. De GSAP-gedreven paginaovergangen creëren een gevoel van een high-end modemagazine dat tot leven komt.",
    highlights: [
      "Full-screen editorial lookbook met smooth scroll",
      "Custom Shopify Liquid theme van nul opgebouwd",
      "Conversie 38% hoger dan het vorige platform"
    ],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop",
    ]
  }
];
