"use client";

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ROLES = [
  {
    id: "engineer",
    title: "Engineer",
    subtitle: "Systems, frontend & performance.",
    href: "/engineer",
    accent: "from-sky-500 to-indigo-600",
  },
  // {
  //   id: "creator",
  //   title: "Creator",
  //   subtitle: "Audio stories & short reels.",
  //   href: "/creator",
  //   accent: "from-emerald-400 to-teal-500",
  // },
  {
    id: "writer",
    title: "Writer",
    subtitle: "Long-form essays & frontend explainers.",
    href: "/writer",
    accent: "from-rose-400 to-pink-500",
  },
];

export default function RolesSection() {
  return (
    <section className="relative max-w-7xl mx-auto py-20 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-white/2 to-transparent opacity-5 blur-3xl" />
      </div>

      <header className="mb-8">
        <h2 className="text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-zinc-300">
          Roles
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-2xl">
          Explore the different ways I work — click a card to dive deeper.
        </p>
      </header>

      <div className="flex justify-around">
        {ROLES.map((role, i) => (
          // <Link key={role.id} href={role.href} className="group">
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06, duration: 0.4, ease: "easeOut" }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="relative overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-b from-white/2 to-white/3 backdrop-blur-md p-6 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div
                  className={`inline-flex items-center gap-3 px-3 py-1 rounded-full bg-gradient-to-r ${role.accent} bg-clip-padding bg-opacity-10 text-sm font-medium`}
                >
                  <span className="w-2 h-2 rounded-full bg-white/80" />
                  <span className="text-sm text-zinc-200">{role.id}</span>
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-white">
                  {role.title}
                </h3>
                <p className="mt-3 text-sm text-zinc-400 max-w-[26ch]">
                  {role.subtitle}
                </p>
              </div>

              <div className="flex items-center">
                <span className="hidden md:inline-flex ml-4 h-14 w-14 items-center justify-center rounded-full border border-white/8 bg-white/3">
                  <ArrowRight className="h-5 w-5 text-zinc-200" />
                </span>
              </div>
            </div>

            {/* <div className="mt-6 flex items-center gap-3 text-sm text-zinc-300">
                <span className="underline decoration-zinc-600">Explore</span>
                <CornerDownRight className="h-4 w-4 text-zinc-300" />
              </div> */}

            <div className="absolute -bottom-6 -right-6 w-36 h-36 rounded-full bg-gradient-to-tr from-white/3 to-transparent opacity-5 blur-2xl" />
          </motion.div>
          // </Link>
        ))}
      </div>
    </section>
  );
}
