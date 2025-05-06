
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Star, Hotel, Spa, Users } from "lucide-react";

// Mock data for hotel listings
const hotels = [
  {
    id: 1,
    name: "Stellar Resort & Spa",
    location: "New York City, NY",
    rating: 4.8,
    price: 250,
    imageUrl: "https://source.unsplash.com/random/300x200/?hotel,luxury",
    amenities: ["Pool", "Spa", "Gym", "Restaurant"],
  },
  {
    id: 2,
    name: "Stellar Boutique Hotel",
    location: "San Francisco, CA",
    rating: 4.6,
    price: 200,
    imageUrl: "https://source.unsplash.com/random/300x200/?hotel,boutique",
    amenities: ["Pool", "Restaurant", "Bar", "Free Wifi"],
  },
  {
    id: 3,
    name: "Stellar Grand Hotel",
    location: "Los Angeles, CA",
    rating: 4.7,
    price: 230,
    imageUrl: "https://source.unsplash.com/random/300x200/?hotel,grand",
    amenities: ["Spa", "Gym", "Restaurant", "Conference Room"],
  },
  {
    id: 4,
    name: "Stellar Ocean View",
    location: "Miami, FL",
    rating: 4.9,
    price: 300,
    imageUrl: "https://source.unsplash.com/random/300x200/?hotel,beach",
    amenities: ["Private Beach", "Pool", "Spa", "Restaurant"],
  },
];

const HotelListing = () => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    pool: false,
    spa: false,
    gym: false,
    restaurant: false,
  });

  // Filter hotels based on search query and filters
  const filteredHotels = hotels.filter((hotel) => {
    // Filter by search query
    if (searchQuery && !hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !hotel.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by price range
    if (hotel.price < priceRange[0] || hotel.price > priceRange[1]) {
      return false;
    }

    // Filter by amenities
    if (filters.pool && !hotel.amenities.includes("Pool")) return false;
    if (filters.spa && !hotel.amenities.includes("Spa")) return false;
    if (filters.gym && !hotel.amenities.includes("Gym")) return false;
    if (filters.restaurant && !hotel.amenities.includes("Restaurant")) return false;

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Our Hotels</h1>
        
        {/* Search and filters section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-4">
            <Input
              placeholder="Search by hotel name or location"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Price Range ($ per night)</h3>
                  <div className="space-y-2">
                    <Slider
                      value={priceRange}
                      min={0}
                      max={500}
                      step={10}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Amenities</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="pool"
                        checked={filters.pool}
                        onCheckedChange={(checked) => setFilters({...filters, pool: checked})}
                      />
                      <Label htmlFor="pool">Pool</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="spa"
                        checked={filters.spa}
                        onCheckedChange={(checked) => setFilters({...filters, spa: checked})}
                      />
                      <Label htmlFor="spa">Spa</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="gym"
                        checked={filters.gym}
                        onCheckedChange={(checked) => setFilters({...filters, gym: checked})}
                      />
                      <Label htmlFor="gym">Gym</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="restaurant"
                        checked={filters.restaurant}
                        onCheckedChange={(checked) => setFilters({...filters, restaurant: checked})}
                      />
                      <Label htmlFor="restaurant">Restaurant</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredHotels.length > 0 ? (
              filteredHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 relative">
                    <img 
                      src={hotel.imageUrl} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{hotel.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{hotel.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span>{hotel.rating}</span>
                      </div>
                      <div>
                        <span className="font-bold">${hotel.price}</span>
                        <span className="text-muted-foreground text-sm"> / night</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {hotel.amenities.map((amenity, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/hotels/${hotel.id}`} className="w-full">
                      <Button variant="default" className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-8">
                <Hotel className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No hotels found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setPriceRange([0, 500]);
                    setFilters({pool: false, spa: false, gym: false, restaurant: false});
                  }}
                >
                  Reset filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HotelListing;
