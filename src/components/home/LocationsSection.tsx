
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LocationsSection() {
  const locations = [
    {
      id: 1,
      name: "Stellar Grand Paris",
      image: "https://images.unsplash.com/photo-1499856871958-5b9357976b82?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Experience luxury in the heart of Paris with breathtaking views of the Eiffel Tower.",
      type: "hotel"
    },
    {
      id: 2,
      name: "Stellar Resort Bali",
      image: "https://images.unsplash.com/photo-1582610116397-edb318620f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Escape to our beachfront paradise with private villas and infinity pools.",
      type: "hotel"
    },
    {
      id: 3,
      name: "Stellar Bistro New York",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      description: "Michelin-starred dining experience with innovative American cuisine in Manhattan.",
      type: "restaurant"
    },
    {
      id: 4,
      name: "Stellar Sushi Tokyo",
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2025&q=80",
      description: "Traditional Japanese culinary artistry with modern twists in Ginza district.",
      type: "restaurant"
    }
  ];
  
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Our Locations
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
            Explore our collection of luxury hotels and restaurants in iconic destinations around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="overflow-hidden border-0 shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-md">
                  {location.type === "hotel" ? "Hotel" : "Restaurant"}
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-2">{location.name}</h3>
                <p className="text-muted-foreground text-sm mb-4">{location.description}</p>
                <Link to={location.type === "hotel" ? `/hotel/${location.id}` : `/restaurant/${location.id}`}>
                  <Button variant="outline" size="sm" className="w-full">
                    {location.type === "hotel" ? "View Hotel" : "View Restaurant"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link to={"/locations"}>
            <Button variant="outline">View All Locations</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
