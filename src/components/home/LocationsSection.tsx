import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

export function LocationsSection() {
  // Locations data with enhanced descriptions and features
  const locations = [
    {
      id: 1,
      name: "Stellar Grand Paris",
      subtitle: "A Parisian Masterpiece",
      image: "https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Experience luxury in the heart of Paris with breathtaking views of the Eiffel Tower.",
      features: ["5-Star Rating", "Rooftop Restaurant", "Luxury Spa"],
      type: "hotel"
    },
    {
      id: 2,
      name: "Stellar Resort Bali",
      subtitle: "Tropical Paradise Retreat",
      image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Escape to our beachfront paradise with private villas and infinity pools overlooking the Indian Ocean.",
      features: ["Private Villas", "Beachfront", "Infinity Pools"],
      type: "hotel"
    },
    {
      id: 3,
      name: "Stellar Alpine Lodge",
      subtitle: "Mountain Luxury Redefined",
      image: "https://images.unsplash.com/photo-1548704806-0c20f7ea6474?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      description: "Nestled in the Swiss Alps, our lodge offers premium ski-in/ski-out access with panoramic mountain views.",
      features: ["Ski-in/Ski-out", "Mountain Views", "Gourmet Dining"],
      type: "hotel"
    },
    {
      id: 4,
      name: "Stellar Bistro New York",
      subtitle: "Manhattan's Culinary Gem",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Michelin-starred dining experience with innovative American cuisine in the heart of Manhattan.",
      features: ["Michelin Star", "Rooftop Terrace", "Celebrity Chef"],
      type: "restaurant"
    },
    {
      id: 5,
      name: "Stellar Sushi Tokyo",
      subtitle: "Authentic Japanese Elegance",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      description: "Traditional Japanese culinary artistry with modern twists in Tokyo's prestigious Ginza district.",
      features: ["Omakase Menu", "Sake Bar", "Private Dining"],
      type: "restaurant"
    },
    {
      id: 6,
      name: "Stellar Santorini Villas",
      subtitle: "Aegean Sea Paradise",
      image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
      description: "Cliffside luxury villas offering unparalleled views of Santorini's iconic caldera and Aegean sunsets.",
      features: ["Private Pools", "Caldera Views", "Butler Service"],
      type: "hotel"
    }
  ];

  // Filter state for showing hotels, restaurants or all
  const [filter, setFilter] = useState("all");
  
  const filteredLocations = filter === "all" 
    ? locations 
    : locations.filter(location => location.type === filter);
  
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/40 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Our Locations
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-[800px] mx-auto text-lg">
            Discover our collection of luxury hotels and fine dining establishments in iconic destinations around the world.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center gap-4 mb-10"
        >
          <Button 
            variant={filter === "all" ? "default" : "outline"} 
            onClick={() => setFilter("all")}
            className="rounded-full px-6"
          >
            All Locations
          </Button>
          <Button 
            variant={filter === "hotel" ? "default" : "outline"} 
            onClick={() => setFilter("hotel")}
            className="rounded-full px-6"
          >
            Hotels
          </Button>
          <Button 
            variant={filter === "restaurant" ? "default" : "outline"} 
            onClick={() => setFilter("restaurant")}
            className="rounded-full px-6"
          >
            Restaurants
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLocations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 h-full bg-white dark:bg-slate-800 group">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 right-3">
                    <span className={`
                      text-xs font-medium px-3 py-1 rounded-full 
                      ${location.type === "hotel" 
                        ? "bg-amber-500 text-white" 
                        : "bg-emerald-500 text-white"}
                    `}>
                      {location.type === "hotel" ? "Hotel & Resort" : "Restaurant"}
                    </span>
                  </div>
                  
                  {/* Features tags */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 transform translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {location.features.map((feature, i) => (
                      <span key={i} className="bg-white/90 text-slate-900 text-xs px-2 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors duration-300">
                      {location.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{location.subtitle}</p>
                  </div>
                  <p className="text-muted-foreground text-sm mb-5">{location.description}</p>
                  <Link to={location.type === "hotel" ? `/hotels/${location.id}` : `/restaurants/${location.id}`}>
                    <Button className="w-full group overflow-hidden relative">
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                        Explore {location.type === "hotel" ? "Property" : "Restaurant"}
                      </span>
                      <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center mt-12"
        >
          <Link to="/locations">
            <Button variant="outline" size="lg" className="group relative overflow-hidden rounded-full px-8 hover:border-primary">
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                View All Destinations
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
