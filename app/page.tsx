"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CommunityHighlights from "@/components/CommunityHighlights";
import ThreePillars from "@/components/ThreePillars";
import Events from "@/components/Events";
import CommunityShowcase from "@/components/CommunityShowcase";
import Testimonials from "@/components/Testimonials";
import Timeline from "@/components/Timeline";
import PressMentions from "@/components/PressMentions";
import MemberSpotlights from "@/components/MemberSpotlights";
import CompanyLogos from "@/components/CompanyLogos";
import FeaturedProjects from "@/components/FeaturedProjects";
import Newsletter from "@/components/Newsletter";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <CompanyLogos />
      <CommunityHighlights />
      <ThreePillars />
      <Events />
      <CommunityShowcase />
      <FeaturedProjects />
      <Testimonials />
      <Timeline />
      <PressMentions />
      <MemberSpotlights />
      <Newsletter />
      <Join />
      <Contact />
      <Footer />
    </main>
  );
}

