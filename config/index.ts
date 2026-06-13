import {
  CraftItem,
  TimelineItem,
} from '@/components/AjayPortfolio';
import { WorkItem } from '@/components/WorkRow/WorkRow';

export const WORKS: WorkItem[] = [
  {
    title: "Astra Wealth",
    sub: "Groww · B2B wealth platform",
    period: "2024 — present",
    detail:
      "Built Groww's first B2B app from zero. Owned auth and portfolio modules end to end. Shipped MVP in 2 months. Architected a config-driven CMS via Strapi, a feature-flag framework, and astra-ui-sdk for B2B and B2B2C surfaces. 700+ test cases, 77% branch coverage.",
    tags: ["Next.js", "React Native", "RTK Query", "Strapi"],
  },
  {
    title: "No-code insurance platform",
    sub: "UniBlox · low-code delivery",
    period: "Nov 2023 — Apr 2024",
    detail:
      "Built two monorepos (B2B and B2B2C) from scratch. Reduced app load time by 20% and improved performance by 30%. Active contributor to architecture and coding standards across 14 microfrontends.",
    tags: ["Module Federation", "Monorepo", "Microfrontends"],
  },
  {
    title: "Digital asset management",
    sub: "Naehas Inc · enterprise SaaS",
    period: "Jan 2022 — Oct 2023",
    detail:
      "Migrated a monolith iframe app to a microfrontend architecture using module federation. Led the React to React TypeScript migration. Cut dev time by 40% and reduced bundle size 15–20% across 3 MFEs. Owned one MFE, co-owned the container and design system.",
    tags: ["TypeScript", "Module Federation", "Redux", "Saga"],
  },
  {
    title: "ReactPlay",
    sub: "Open source · community",
    period: "Feb 2023 — Nov 2023",
    detail:
      "Core open source contributor. Reviewed 40+ pull requests. Built interactive React demos used by thousands of learners. Named top performer in the Namaste React bootcamp among 100 engineers.",
    tags: ["React", "Open Source"],
  },
];


export const CRAFT: CraftItem[] = [
  {
    icon: "ti-layout-2",
    name: "Component systems",
    desc: "Design tokens first. I build libraries teams actually adopt, not ones that sit in a Storybook no one opens.",
  },
  {
    icon: "ti-bolt",
    name: "Web performance",
    desc: "CLS, TTI, and bundle budgets fixed before they become tickets. Client-side caching and service workers are default, not afterthoughts.",
  },
  {
    icon: "ti-sitemap",
    name: "Microfrontend architecture",
    desc: "Module federation and monorepos at scale. Migrated monoliths, designed containers 14 teams deployed into.",
  },
  {
    icon: "ti-test-pipe",
    name: "TDD & reliability",
    desc: "700+ test cases written on Astra Wealth alone. Critical financial flows don't ship without branch coverage.",
  },
  {
    icon: "ti-device-mobile",
    name: "React Native",
    desc: "Learnt and shipped in production on Astra Wealth. Set codebase standards for the mobile team from day one.",
  },
  {
    icon: "ti-code",
    name: "CI/CD & DX",
    desc: "GitHub Actions pipelines, coding standard enforcement, architectural reviews. Bad DX means everything downstream suffers.",
  },
];

export const TIMELINE: TimelineItem[] = [
  {
    period: "2024 — present",
    co: "Groww",
    role: "Software Engineer 2",
    note: "Astra Wealth (B2B) and Groww MF web/app. Repository gatekeeper, HLD/LLD author, React Native contributor.",
  },
  {
    period: "Nov 2023 — Apr 2024",
    co: "UniBlox",
    role: "Frontend Engineer",
    note: "No-code insurance platform. Two monorepos, 14 MFEs, 30% performance uplift.",
  },
  {
    period: "Feb — Oct 2023",
    co: "Naehas Inc",
    role: "Software Engineer",
    note: "MFE migration lead. 40% dev-time reduction. Client-side caching, service workers.",
  },
  {
    period: "Jan 2022 — Feb 2023",
    co: "Naehas Inc",
    role: "Associate Software Engineer",
    note: "Built the DAM tool UI MFE. First touch with module federation and TypeScript migration.",
  },
];