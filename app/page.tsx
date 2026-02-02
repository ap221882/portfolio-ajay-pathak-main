"use client";

import ContactCodeBlock from "@/components/ContactCodeBlock";
import Hero from "@/components/Hero";
import RolesSection from "@/components/RolesSection";

const Main = () => {
  return (
    <>
      <Hero />
      <section id="roles" className="h-screen overflow-hidden mt-36">
        <RolesSection />
        <ContactCodeBlock />
      </section>
    </>
  );
};

export default Main;
