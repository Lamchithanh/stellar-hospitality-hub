
import { Card, CardContent } from "@/components/ui/card";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Emily Johnson",
      role: "Business Traveler",
      comment: "The attention to detail at Stellar Hotels is unmatched. From the moment I arrived, the staff made me feel like royalty. The room was immaculate and the dining experience was extraordinary.",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Michael Chang",
      role: "Food Enthusiast",
      comment: "Stellar Bistro offers the most exquisite culinary journey I've ever experienced. The chef's tasting menu with wine pairing was absolutely phenomenal. Worth every penny!",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    {
      id: 3,
      name: "Sophia Rodriguez",
      role: "Luxury Traveler",
      comment: "After staying at Stellar resorts around the world, I can confidently say they maintain exceptional quality and service at every location. The spa treatments are particularly outstanding.",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Guest Experiences
          </h2>
          <p className="mt-4 text-muted-foreground max-w-[700px] mx-auto">
            Don't just take our word for it. Here's what our valued guests have to say about their experiences with us.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border bg-card text-card-foreground">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-primary">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <blockquote className="italic mb-4">"{testimonial.comment}"</blockquote>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
