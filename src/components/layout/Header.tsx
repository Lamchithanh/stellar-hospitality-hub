import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Sun, Moon, Crown } from "lucide-react";
import { useTheme } from "next-themes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Stellar Hospitality</span>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Hotel</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/hotels" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Our Hotels</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our luxury hotels across various locations.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/rooms" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Rooms & Suites</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Explore our comfortable and elegant accommodation options.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Restaurant</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 md:w-[400px] lg:grid-cols-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/restaurants" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Our Restaurants</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Discover our fine dining establishments.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link to="/menus" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Menus</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Browse our exquisite menus and cuisines.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/services">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      Services
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/membership">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                      <Crown className="h-4 w-4 mr-1 text-amber-400" />
                      Thành Viên VIP
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <div className="flex gap-2">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 bg-background border-t animate-in slide-in-from-top-5">
          <div className="flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Home</Button>
            </Link>
            <div className="border-t pt-4">
              <h2 className="font-medium mb-2">Hotel</h2>
              <div className="flex flex-col gap-2 pl-2">
                <Link to="/hotels" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Our Hotels</Button>
                </Link>
                <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Rooms & Suites</Button>
                </Link>
              </div>
            </div>
            <div className="border-t pt-4">
              <h2 className="font-medium mb-2">Restaurant</h2>
              <div className="flex flex-col gap-2 pl-2">
                <Link to="/restaurants" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Our Restaurants</Button>
                </Link>
                <Link to="/menus" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Menus</Button>
                </Link>
              </div>
            </div>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">Services</Button>
            </Link>
            <Link to="/membership" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start">
                <Crown className="h-4 w-4 mr-2 text-amber-400" />
                Thành Viên VIP
              </Button>
            </Link>
            <div className="border-t pt-4 flex flex-col gap-2">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full">Register</Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
