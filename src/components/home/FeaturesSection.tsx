
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      title: "Luxury Accommodations",
      description: "Experience the pinnacle of comfort in our elegantly designed rooms and suites with premium amenities.",
      icon: "🏨"
    },
    {
      title: "Fine Dining",
      description: "Indulge in exquisite culinary creations prepared by our world-class chefs using the finest ingredients.",
      icon: "🍽️"
    },
    {
      title: "Wellness & Spa",
      description: "Rejuvenate your body and mind with our comprehensive spa treatments and wellness programs.",
      icon: "💆"
    },
    {
      title: "Exclusive Events",
      description: "Host memorable events in our sophisticated venues with personalized planning services.",
      icon: "🎉"
    }
  ];
  
  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Exceptional Services
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
            We offer a range of premium services designed to make your stay or dining experience truly unforgettable.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border bg-card hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
