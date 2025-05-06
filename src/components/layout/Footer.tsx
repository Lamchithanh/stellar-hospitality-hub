
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Stellar Hospitality</h3>
            <p className="text-muted-foreground mb-4">
              Luxury accommodations and fine dining experiences across the globe.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Icons would go here */}
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
              <li><Link to="/hotels" className="text-muted-foreground hover:text-foreground transition-colors">Hotels</Link></li>
              <li><Link to="/restaurants" className="text-muted-foreground hover:text-foreground transition-colors">Restaurants</Link></li>
              <li><Link to="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Support</h4>
            <ul className="space-y-2">
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-base mb-4">Contact</h4>
            <address className="not-italic text-muted-foreground">
              <p>123 Luxury Avenue</p>
              <p>Prestige City, PC 12345</p>
              <p className="mt-2">Email: info@stellarhospitality.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Stellar Hospitality. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
