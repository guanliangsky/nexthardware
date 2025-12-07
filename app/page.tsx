import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CommunityHighlights from "@/components/CommunityHighlights";
import ThreePillars from "@/components/ThreePillars";
import Events from "@/components/Events";
import CommunityShowcase from "@/components/CommunityShowcase";
import Newsletter from "@/components/Newsletter";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <CommunityShowcase />
      <Stats />
      <CommunityHighlights />
      <ThreePillars />
      <Events />
      <Join />
      <Newsletter />
      <Contact />
      <Footer />
    </main>
  );
}

