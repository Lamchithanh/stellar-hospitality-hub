import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import HotelListing from "./pages/HotelListing";
import HotelDetail from "./pages/HotelDetail";
import RestaurantListing from "./pages/RestaurantListing";
import RestaurantDetail from "./pages/RestaurantDetail";
import Rooms from "./pages/Rooms";
import RoomDetail from "./pages/RoomDetail";
import Menus from "./pages/Menus";
import MenuDetail from "./pages/MenuDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Booking from "./pages/Booking";
import FoodOrder from "./pages/FoodOrder";
import TableBooking from "./pages/TableBooking";
import Membership from "./pages/Membership";
import Locations from "./pages/Locations";
import { BookingForm } from "./components/booking/BookingForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light" attribute="class">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/hotels" element={<HotelListing />} />
            <Route path="/hotels/:id" element={<HotelDetail />} />
            <Route path="/restaurants" element={<RestaurantListing />} />
            <Route path="/restaurants/:id" element={<RestaurantDetail />} />
            <Route path="/rooms" element={<Rooms />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/menus" element={<Menus />} />
            <Route path="/menus/:id" element={<MenuDetail />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/service-booking/:id" element={<BookingWrapper type="service" />} />
            <Route path="/room-booking/:id" element={<BookingWrapper type="room" />} />
            <Route path="/food-booking/:id" element={<BookingWrapper type="food" />} />
            <Route path="/food-order/:id" element={<FoodOrder />} />
            <Route path="/table-booking/:id" element={<TableBooking />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/locations" element={<Locations />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

// Wrapper component để render BookingForm với các thuộc tính cần thiết
import { useLocation, useParams } from "react-router-dom";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";

const BookingWrapper = ({ type }: { type: 'service' | 'room' | 'food' }) => {
  const { id } = useParams();
  const location = useLocation();
  const state = location.state || {}; 
  const serviceInfo = state.serviceInfo || {};
  
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <BookingForm 
        type={type}
        title={serviceInfo.title || ""}
        subtitle={serviceInfo.subtitle}
        image={serviceInfo.image}
        options={serviceInfo.options || []}
        returnUrl={serviceInfo.returnUrl || `/services/${id}`}
      />
      <Footer />
    </div>
  );
};

export default App;
