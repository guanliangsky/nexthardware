// Server Component - Better performance, smaller bundle
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import CommunityHighlights from "@/components/CommunityHighlights";
import ThreePillars from "@/components/ThreePillars";
import Events from "@/components/Events";
import CompanyLogos from "@/components/CompanyLogos";
import Volunteering from "@/components/Volunteering";
import Newsletter from "@/components/Newsletter";
import Join from "@/components/Join";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

// Lazy load below-fold components for better initial page load
const CommunityShowcase = dynamic(() => import("@/components/CommunityShowcase"), {
  loading: () => <div className="py-20" />,
});
const FeaturedProjects = dynamic(() => import("@/components/FeaturedProjects"), {
  loading: () => <div className="py-20" />,
});
const Testimonials = dynamic(() => import("@/components/Testimonials"), {
  loading: () => <div className="py-20" />,
});
const Timeline = dynamic(() => import("@/components/Timeline"), {
  loading: () => <div className="py-20" />,
});
const PressMentions = dynamic(() => import("@/components/PressMentions"), {
  loading: () => <div className="py-20" />,
});
const MemberSpotlights = dynamic(() => import("@/components/MemberSpotlights"), {
  loading: () => <div className="py-20" />,
});

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <CompanyLogos />
      <CommunityHighlights />
      <ThreePillars />
      <Volunteering />
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

