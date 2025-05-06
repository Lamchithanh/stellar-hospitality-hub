
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
import { MapPin, Star, Utensils } from "lucide-react";

// Mock data for restaurant listings
const restaurants = [
  {
    id: 1,
    name: "Stellar Fine Dining",
    location: "New York City, NY",
    rating: 4.7,
    priceRange: "$$$$",
    cuisine: "Fine Dining",
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,fine",
    features: ["Private Rooms", "Wine Selection", "Valet Parking"],
  },
  {
    id: 2,
    name: "Stellar Bistro",
    location: "San Francisco, CA",
    rating: 4.5,
    priceRange: "$$$",
    cuisine: "French",
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,bistro",
    features: ["Outdoor Seating", "Live Music", "Vegetarian Options"],
  },
  {
    id: 3,
    name: "Stellar Steakhouse",
    location: "Los Angeles, CA",
    rating: 4.8,
    priceRange: "$$$$",
    cuisine: "Steakhouse",
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,steak",
    features: ["Private Rooms", "Full Bar", "Premium Steaks"],
  },
  {
    id: 4,
    name: "Stellar Seafood",
    location: "Miami, FL",
    rating: 4.6,
    priceRange: "$$$",
    cuisine: "Seafood",
    imageUrl: "https://source.unsplash.com/random/300x200/?restaurant,seafood",
    features: ["Ocean View", "Fresh Catch", "Outdoor Seating"],
  },
];

const RestaurantListing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    privateRooms: false,
    outdoorSeating: false,
    liveMusic: false,
    vegetarianOptions: false,
  });

  // Filter restaurants based on search query and filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Filter by search query
    if (searchQuery && !restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !restaurant.location.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by features
    if (filters.privateRooms && !restaurant.features.includes("Private Rooms")) return false;
    if (filters.outdoorSeating && !restaurant.features.includes("Outdoor Seating")) return false;
    if (filters.liveMusic && !restaurant.features.includes("Live Music")) return false;
    if (filters.vegetarianOptions && !restaurant.features.includes("Vegetarian Options")) return false;

    return true;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-8">Our Restaurants</h1>
        
        {/* Search and filters section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-4">
            <Input
              placeholder="Search by restaurant name, location or cuisine"
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
                  <h3 className="font-medium">Features</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="privateRooms"
                        checked={filters.privateRooms}
                        onCheckedChange={(checked) => setFilters({...filters, privateRooms: checked})}
                      />
                      <Label htmlFor="privateRooms">Private Rooms</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="outdoorSeating"
                        checked={filters.outdoorSeating}
                        onCheckedChange={(checked) => setFilters({...filters, outdoorSeating: checked})}
                      />
                      <Label htmlFor="outdoorSeating">Outdoor Seating</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="liveMusic"
                        checked={filters.liveMusic}
                        onCheckedChange={(checked) => setFilters({...filters, liveMusic: checked})}
                      />
                      <Label htmlFor="liveMusic">Live Music</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="vegetarianOptions"
                        checked={filters.vegetarianOptions}
                        onCheckedChange={(checked) => setFilters({...filters, vegetarianOptions: checked})}
                      />
                      <Label htmlFor="vegetarianOptions">Vegetarian Options</Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <Card key={restaurant.id} className="overflow-hidden flex flex-col">
                  <div className="h-48 relative">
                    <img 
                      src={restaurant.imageUrl} 
                      alt={restaurant.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{restaurant.location}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="text-muted-foreground">
                        {restaurant.priceRange} • {restaurant.cuisine}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.features.map((feature, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-secondary px-2 py-1 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to={`/restaurants/${restaurant.id}`} className="w-full">
                      <Button variant="default" className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-8">
                <Utensils className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">No restaurants found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setFilters({
                      privateRooms: false,
                      outdoorSeating: false,
                      liveMusic: false,
                      vegetarianOptions: false,
                    });
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

export default RestaurantListing;
