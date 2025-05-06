import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin } from "lucide-react";

// Dữ liệu mẫu cho các điểm đến
const locations = [
  {
    id: 1,
    name: "Stellar Saigon",
    location: "Thành phố Hồ Chí Minh",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Khách sạn & Spa",
    rating: 4.9
  },
  {
    id: 2,
    name: "Stellar Hanoi",
    location: "Hà Nội",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Khách sạn & Nhà hàng",
    rating: 4.8
  },
  {
    id: 3,
    name: "Stellar Danang",
    location: "Đà Nẵng",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2049&q=80",
    category: "Resort & Spa",
    rating: 4.9
  },
  {
    id: 4,
    name: "Stellar Bistro",
    location: "Hồ Chí Minh",
    type: "restaurant",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Nhà hàng Fine-dining",
    rating: 4.7
  },
  {
    id: 5,
    name: "Stellar Nha Trang",
    location: "Nha Trang",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Beach Resort",
    rating: 4.8
  },
  {
    id: 6,
    name: "Stellar Huế",
    location: "Huế",
    type: "hotel",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Boutique Hotel",
    rating: 4.7
  }
];

export function LocationsGallery() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  // Lọc địa điểm
  const filteredLocations = activeFilter === "all" 
    ? locations 
    : locations.filter(item => item.type === activeFilter);
  
  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/30 relative">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[800px] mx-auto text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
            Điểm Đến Sang Trọng
          </h2>
          <div className="w-20 h-[2px] bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground text-lg max-w-[600px] mx-auto">
            Khám phá các khách sạn và nhà hàng của chúng tôi tại những địa điểm đẹp nhất Việt Nam, nơi sự sang trọng gặp gỡ di sản văn hóa.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="flex justify-center mb-12 space-x-3"
        >
          <Button 
            variant={activeFilter === "all" ? "default" : "outline"} 
            onClick={() => setActiveFilter("all")}
            className="rounded-none border-zinc-300 dark:border-zinc-700 min-w-[120px]"
          >
            Tất cả
          </Button>
          <Button 
            variant={activeFilter === "hotel" ? "default" : "outline"} 
            onClick={() => setActiveFilter("hotel")}
            className="rounded-none border-zinc-300 dark:border-zinc-700 min-w-[120px]"
          >
            Khách sạn
          </Button>
          <Button 
            variant={activeFilter === "restaurant" ? "default" : "outline"} 
            onClick={() => setActiveFilter("restaurant")}
            className="rounded-none border-zinc-300 dark:border-zinc-700 min-w-[120px]"
          >
            Nhà hàng
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
              <div className="group h-full bg-white dark:bg-zinc-800/50 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex justify-between items-end">
                        <div>
                          <span className="bg-white/90 text-black text-xs px-3 py-1 inline-block">
                            {location.category}
                          </span>
                          <h3 className="text-xl font-bold text-white mt-2">{location.name}</h3>
                          <div className="flex items-center text-white/90 text-sm mt-1">
                            <MapPin className="h-3.5 w-3.5 mr-1" />
                            <span>{location.location}</span>
                          </div>
                        </div>
                        <div className="bg-white px-2 py-1 text-sm font-semibold text-black rounded-sm">
                          {location.rating}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Link 
                    to={location.type === "hotel" ? `/hotels/${location.id}` : `/restaurants/${location.id}`}
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                  >
                    Khám phá ngay
                    <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
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
            <Button variant="outline" className="rounded-none border-zinc-300 dark:border-zinc-700 min-w-[200px]">
              Xem tất cả điểm đến
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 