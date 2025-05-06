
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden h-[80vh]">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
          {/* Background image */}
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Luxury hotel lobby" 
            className="object-cover object-center w-full h-full"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
              Experience Luxury Like Never Before
            </h1>
            <p className="text-white/90 md:text-xl max-w-[700px] mx-auto">
              Discover our world-class hotels and restaurants offering unforgettable experiences with impeccable service.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link to="/hotels">
                <Button size="lg" className="px-8">Book a Room</Button>
              </Link>
              <Link to="/restaurants">
                <Button size="lg" variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-8">
                  Reserve a Table
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
