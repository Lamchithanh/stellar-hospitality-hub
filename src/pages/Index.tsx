import { Header } from "@/components/layout/Header"; 
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/home/HeroSection";
import { ExcellenceSection } from "@/components/home/ExcellenceSection";
import { LocationsGallery } from "@/components/home/LocationsGallery";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { LuxuryExperience } from "@/components/home/LuxuryExperience";
import { MembershipCTA } from "@/components/home/MembershipCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ExcellenceSection />
        <LocationsGallery />
        <LuxuryExperience />
        <TestimonialsCarousel />
        <MembershipCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
