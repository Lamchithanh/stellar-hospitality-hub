
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Join Our Loyalty Program
            </h2>
            <p className="mt-4 text-primary-foreground/90 max-w-[600px]">
              Become a member today and enjoy exclusive benefits, including room upgrades, dining discounts, and special offers at all our locations worldwide.
            </p>
            <div className="mt-8">
              <Link to="/membership">
                <Button size="lg" variant="secondary">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="lg:text-right">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">15%</h3>
                <p className="text-sm text-primary-foreground/80">Discount on room bookings</p>
              </div>
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">10%</h3>
                <p className="text-sm text-primary-foreground/80">Discount on dining</p>
              </div>
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">Early</h3>
                <p className="text-sm text-primary-foreground/80">Access to special offers</p>
              </div>
              <div className="bg-primary-foreground/10 p-6 rounded-lg">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-sm text-primary-foreground/80">Premium amenities</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
