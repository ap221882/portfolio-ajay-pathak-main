"use client";

import Hero from '@/components/Hero';
import RolesSection from '@/components/RolesSection';

const Main = () => {
  return (
    <>
      <Hero />
      <section id="roles" className="h-screen overflow-hidden mt-36">
        <RolesSection />
      </section>
    </>
  );
};

export default Main;
