import { useState } from "react";
import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu, X, Sun, Moon, Crown, Search, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { BedDouble, Droplets, Utensils, PartyPopper } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthButtons, setShowAuthButtons] = useState(false);
  const [showSearchDialog, setShowSearchDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý tìm kiếm ở đây
    console.log("Searching for:", searchQuery);
    setShowSearchDialog(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">Stellar Hospitality</span>
        </Link>
        
        {isMobile ? (
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-none border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
              {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu" className="rounded-none border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:border-b-2 data-[active]:border-primary hover:border-b-2 hover:border-primary/50">
                      Trang chủ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-none hover:border-b-2 hover:border-primary/50">Khách sạn</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-0 p-0 w-[400px] lg:grid-cols-2 border">
                      <li className="border-r border-b dark:border-gray-800">
                        <NavigationMenuLink asChild>
                          <Link to="/hotels" className="block select-none space-y-1 p-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground hover:border-l-4 hover:border-primary">
                            <div className="text-sm font-medium leading-none mb-2">Khách sạn của chúng tôi</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Khám phá các khách sạn sang trọng của chúng tôi.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="border-b dark:border-gray-800">
                        <NavigationMenuLink asChild>
                          <Link to="/rooms" className="block select-none space-y-1 p-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground hover:border-l-4 hover:border-primary">
                            <div className="text-sm font-medium leading-none mb-2">Phòng & Suite</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Khám phá không gian lưu trú tiện nghi và sang trọng.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="rounded-none hover:border-b-2 hover:border-primary/50">Nhà hàng</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-0 p-0 w-[400px] lg:grid-cols-2 border">
                      <li className="border-r border-b dark:border-gray-800">
                        <NavigationMenuLink asChild>
                          <Link to="/restaurants" className="block select-none space-y-1 p-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground hover:border-l-4 hover:border-primary">
                            <div className="text-sm font-medium leading-none mb-2">Nhà hàng của chúng tôi</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Khám phá ẩm thực đẳng cấp tại nhà hàng của chúng tôi.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li className="border-b dark:border-gray-800">
                        <NavigationMenuLink asChild>
                          <Link to="/menus" className="block select-none space-y-1 p-5 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground hover:border-l-4 hover:border-primary">
                            <div className="text-sm font-medium leading-none mb-2">Thực đơn</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Khám phá thực đơn tinh tế và các món ăn đặc sắc.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/services">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:border-b-2 data-[active]:border-primary hover:border-b-2 hover:border-primary/50">
                      Dịch vụ
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="/membership">
                    <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-none bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:border-b-2 data-[active]:border-primary hover:border-b-2 hover:border-primary/50">
                      <Crown className="h-4 w-4 mr-1 text-amber-400" />
                      Thành Viên VIP
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme" className="rounded-none border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-300">
                {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Search" 
                className="rounded-none border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-300"
                onClick={() => setShowSearchDialog(true)}
              >
                <Search className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>

            {/* Nút Auth ẩn hiện */}
            <div 
              className="relative" 
              onMouseEnter={() => setShowAuthButtons(true)}
              onMouseLeave={() => setShowAuthButtons(false)}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-none border border-transparent hover:border-gray-200 dark:hover:border-gray-800 transition-all duration-300"
              >
                <User className="h-[1.2rem] w-[1.2rem]" />
              </Button>
              
              {/* Auth buttons khi hover */}
              <div 
                className={`absolute right-0 mt-1 bg-white dark:bg-slate-800 border dark:border-gray-800 shadow-md w-40 flex flex-col transition-all duration-300 origin-top ${
                  showAuthButtons ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
                }`}
              >
                <Link to="/login" className="w-full">
                  <Button variant="ghost" className="w-full justify-start rounded-none hover:bg-accent px-4 py-2 h-10">
                    Đăng nhập
                  </Button>
                </Link>
                <div className="border-t dark:border-gray-700"></div>
                <Link to="/register" className="w-full">
                  <Button variant="ghost" className="w-full justify-start rounded-none hover:bg-accent px-4 py-2 h-10">
                    Đăng ký
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {isMobile && isMenuOpen && (
        <div className="fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-0 bg-background border-t animate-in slide-in-from-top-5">
          <div className="flex flex-col">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 px-6 py-4 h-auto">Trang chủ</Button>
            </Link>
            <div className="border-b border-gray-200 dark:border-gray-800">
              <Button variant="ghost" className="w-full justify-between rounded-none px-6 py-4 h-auto">
                <span>Khách sạn</span>
                <span>+</span>
              </Button>
              <div className="flex flex-col">
                <Link to="/hotels" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-none border-t border-gray-100 dark:border-gray-900 px-6 py-3 h-auto bg-slate-50 dark:bg-slate-900">Khách sạn của chúng tôi</Button>
                </Link>
                <Link to="/rooms" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-none border-t border-gray-100 dark:border-gray-900 px-6 py-3 h-auto bg-slate-50 dark:bg-slate-900">Phòng & Suite</Button>
                </Link>
              </div>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-800">
              <Button variant="ghost" className="w-full justify-between rounded-none px-6 py-4 h-auto">
                <span>Nhà hàng</span>
                <span>+</span>
              </Button>
              <div className="flex flex-col">
                <Link to="/restaurants" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-none border-t border-gray-100 dark:border-gray-900 px-6 py-3 h-auto bg-slate-50 dark:bg-slate-900">Nhà hàng của chúng tôi</Button>
                </Link>
                <Link to="/menus" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start rounded-none border-t border-gray-100 dark:border-gray-900 px-6 py-3 h-auto bg-slate-50 dark:bg-slate-900">Thực đơn</Button>
                </Link>
              </div>
            </div>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 px-6 py-4 h-auto">Dịch vụ</Button>
            </Link>
            <Link to="/membership" onClick={() => setIsMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start rounded-none border-b border-gray-200 dark:border-gray-800 px-6 py-4 h-auto">
                <Crown className="h-4 w-4 mr-2 text-amber-400" />
                Thành Viên VIP
              </Button>
            </Link>
            <div className="p-6 space-y-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full rounded-none">Đăng nhập</Button>
              </Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full rounded-none bg-primary hover:bg-primary/90">Đăng ký</Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Search Dialog */}
      <Dialog open={showSearchDialog} onOpenChange={setShowSearchDialog}>
        <DialogContent className="sm:max-w-[600px] p-0 rounded-none border">
          <DialogHeader className="p-6 pb-0 border-b dark:border-gray-800">
            <DialogTitle className="font-bold text-2xl">Tìm kiếm</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSearch} className="p-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Nhập từ khóa tìm kiếm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-12 py-6 rounded-none border-gray-200 dark:border-gray-800 text-lg focus:border-primary" 
              />
              <Button type="submit" className="absolute right-0 inset-y-0 rounded-none px-6 bg-primary hover:bg-primary/90">
                Tìm kiếm
              </Button>
            </div>

            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-medium border-b pb-2 dark:border-gray-800">Danh mục phổ biến</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link to="/rooms" onClick={() => setShowSearchDialog(false)}>
                  <div className="border dark:border-gray-800 hover:border-primary dark:hover:border-primary p-4 text-center transition-colors">
                    <BedDouble className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Phòng & Suite</div>
                  </div>
                </Link>
                <Link to="/services/1" onClick={() => setShowSearchDialog(false)}>
                  <div className="border dark:border-gray-800 hover:border-primary dark:hover:border-primary p-4 text-center transition-colors">
                    <Droplets className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Spa & Làm đẹp</div>
                  </div>
                </Link>
                <Link to="/restaurants" onClick={() => setShowSearchDialog(false)}>
                  <div className="border dark:border-gray-800 hover:border-primary dark:hover:border-primary p-4 text-center transition-colors">
                    <Utensils className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Nhà hàng</div>
                  </div>
                </Link>
                <Link to="/services/4" onClick={() => setShowSearchDialog(false)}>
                  <div className="border dark:border-gray-800 hover:border-primary dark:hover:border-primary p-4 text-center transition-colors">
                    <PartyPopper className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="text-sm font-medium">Sự kiện</div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium border-b pb-2 dark:border-gray-800 mb-3">Tìm kiếm phổ biến</h3>
              <div className="flex flex-wrap gap-2">
                {["Phòng biển", "Spa cao cấp", "Ẩm thực Á", "Tour du lịch", "Khuyến mãi mùa hè", "Hồ bơi"].map((term, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 border dark:border-gray-800 hover:bg-accent cursor-pointer transition-colors"
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
