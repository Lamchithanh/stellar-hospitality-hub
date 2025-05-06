
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Star, Calendar, Users, Wifi, Bath, Flower2, Utensils, Dumbbell, Info, Clock, Car } from "lucide-react";

// Mock data for hotel details
const hotels = {
  1: {
    id: 1,
    name: "Stellar Resort & Spa",
    description: "Experience luxury redefined at our flagship resort, where modern elegance meets unparalleled service.",
    location: "New York City, NY",
    address: "123 Broadway St, New York, NY 10001",
    rating: 4.8,
    price: 250,
    checkIn: "3:00 PM",
    checkOut: "11:00 AM",
    images: [
      "https://source.unsplash.com/random/800x600/?hotel,luxury,room",
      "https://source.unsplash.com/random/800x600/?hotel,luxury,lobby",
      "https://source.unsplash.com/random/800x600/?hotel,luxury,pool",
      "https://source.unsplash.com/random/800x600/?hotel,luxury,spa",
    ],
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Swimming Pool", icon: Bath },
      { name: "Spa", icon: Flower2 },
      { name: "Restaurant", icon: Utensils },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "24/7 Service", icon: Clock },
      { name: "Valet Parking", icon: Car },
    ],
    rooms: [
      {
        id: 101,
        name: "Deluxe King Room",
        price: 250,
        capacity: 2,
        description: "Spacious room with king-sized bed, city view, and luxury amenities.",
        image: "https://source.unsplash.com/random/300x200/?hotel,room,king",
      },
      {
        id: 102,
        name: "Executive Suite",
        price: 400,
        capacity: 2,
        description: "Premium suite with separate living area, king-sized bed, and panoramic views.",
        image: "https://source.unsplash.com/random/300x200/?hotel,suite",
      },
      {
        id: 103,
        name: "Family Suite",
        price: 500,
        capacity: 4,
        description: "Perfect for families with two bedrooms, living area, and family-friendly amenities.",
        image: "https://source.unsplash.com/random/300x200/?hotel,family,room",
      },
    ],
    reviews: [
      {
        id: 1,
        user: "John Smith",
        rating: 5,
        date: "March 15, 2025",
        comment: "Exceptional service and beautiful property. The spa was a highlight of our stay.",
      },
      {
        id: 2,
        user: "Jane Doe",
        rating: 4,
        date: "February 28, 2025",
        comment: "Luxurious rooms and great location. The only downside was the crowded pool area.",
      },
      {
        id: 3,
        user: "Michael Johnson",
        rating: 5,
        date: "January 10, 2025",
        comment: "One of the best hotels I've ever stayed in. The staff went above and beyond.",
      },
    ],
  },
  // More hotel data...
};

const HotelDetail = () => {
  const { id } = useParams<{ id: string }>();
  const hotel = hotels[Number(id) as keyof typeof hotels];

  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Hotel not found</h2>
            <p className="mb-6">The hotel you're looking for doesn't exist or has been removed.</p>
            <Link to="/hotels">
              <Button>Back to Hotels</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {/* Hotel Header */}
        <div className="bg-background">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2">
                  <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-muted-foreground">{hotel.address}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-400 mr-1 fill-yellow-400" />
                  <span className="font-semibold">{hotel.rating}</span>
                </div>
                <div>
                  <span className="font-bold text-xl">${hotel.price}</span>
                  <span className="text-muted-foreground"> / night</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Image Gallery */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {hotel.images.map((image, index) => (
              <div key={index} className={`${index === 0 ? "col-span-1 md:col-span-2 lg:col-span-2 row-span-2" : ""} overflow-hidden rounded-lg h-64`}>
                <img src={image} alt={`${hotel.name} - ${index}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
        
        {/* Hotel Info Tabs */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About</h2>
                    <p className="text-muted-foreground">{hotel.description}</p>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Location</h2>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Map will be displayed here</p>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                  <div className="bg-secondary rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold">Hotel Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Check-in</p>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <p>{hotel.checkIn}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Check-out</p>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2" />
                          <p>{hotel.checkOut}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secondary rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Book This Hotel</h3>
                    <Link to={`/booking/${hotel.id}`}>
                      <Button className="w-full">Book Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="rooms">
              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Available Rooms</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className="border rounded-lg overflow-hidden">
                      <img src={room.image} alt={room.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <Users className="h-4 w-4 mr-1" />
                          <span>Up to {room.capacity} guests</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">{room.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="font-bold">${room.price}</span>
                            <span className="text-muted-foreground text-sm"> / night</span>
                          </div>
                          <Link to={`/booking/${hotel.id}?room=${room.id}`}>
                            <Button size="sm">Select</Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="amenities">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Amenities</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center p-4 border rounded-lg">
                      <amenity.icon className="h-6 w-6 mr-3" />
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reviews">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Guest Reviews</h2>
                {hotel.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{review.user}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1 fill-yellow-400" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Call to Action */}
        <div className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to experience luxury?</h2>
            <p className="mb-6 max-w-2xl mx-auto">Book your stay now and enjoy our world-class amenities and exceptional service.</p>
            <Link to={`/booking/${hotel.id}`}>
              <Button size="lg" variant="secondary">Book Now</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HotelDetail;
