import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export function FeaturesSection() {
  const features = [
    {
      title: "Luxury Accommodations",
      description: "Experience the pinnacle of comfort in our elegantly designed rooms and suites with premium amenities for an unforgettable stay.",
      icon: "https://img.icons8.com/fluency/96/hotel-room.png",
      color: "bg-amber-50"
    },
    {
      title: "Fine Dining",
      description: "Indulge in exquisite culinary creations prepared by our world-class chefs using the finest locally-sourced and international ingredients.",
      icon: "https://img.icons8.com/fluency/96/dining-room.png",
      color: "bg-rose-50"
    },
    {
      title: "Wellness & Spa",
      description: "Rejuvenate your body and mind with our comprehensive spa treatments, thermal pools, and personalized wellness programs.",
      icon: "https://img.icons8.com/fluency/96/spa.png",
      color: "bg-blue-50"
    },
    {
      title: "Exclusive Events",
      description: "Host memorable events in our sophisticated venues with personalized planning services and state-of-the-art facilities.",
      icon: "https://img.icons8.com/fluency/96/confetti.png",
      color: "bg-purple-50"
    },
    {
      title: "Personal Concierge",
      description: "Enjoy dedicated concierge service available 24/7 to ensure every aspect of your stay exceeds your expectations.",
      icon: "https://img.icons8.com/fluency/96/concierge.png",
      color: "bg-emerald-50"
    },
    {
      title: "Bespoke Experiences",
      description: "Discover curated local adventures and exclusive experiences tailored to your preferences by our expert staff.",
      icon: "https://img.icons8.com/fluency/96/hot-air-balloon.png",
      color: "bg-orange-50"
    }
  ];
  
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container px-4 md:px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Exceptional Services
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="mt-4 text-muted-foreground max-w-[800px] mx-auto text-lg">
            We offer a curated selection of premium services designed to elevate your experience from the ordinary to the extraordinary.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="border bg-card h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className={`p-4 rounded-2xl ${feature.color} mb-5 w-16 h-16 flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}>
                    <img src={feature.icon} alt={feature.title} className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground flex-grow">
                    {feature.description}
                  </p>
                  <div className="mt-4">
                    <button className="text-primary font-medium flex items-center text-sm hover:underline">
                      Learn more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
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
          <button className="bg-gradient-to-r from-primary to-primary/80 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
            Discover All Services
          </button>
        </motion.div>
      </div>
    </section>
  );
}
