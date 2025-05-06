import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  Calendar as CalendarIcon,
  Clock,
  Users,
  Utensils,
  Phone,
  CalendarDays,
  ChevronRight,
  CheckCircle,
  MapPin,
  Mail
} from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Dữ liệu mẫu cho nhà hàng (giống RestaurantDetail.tsx)
const restaurantDetails = {
  id: 1,
  name: "Stellar Fine Dining Hà Nội",
  location: "Hoàn Kiếm, Hà Nội",
  address: "88 Phố Lý Thường Kiệt, Hoàn Kiếm, Hà Nội",
  phone: "+84 24 3934 5678",
  imageUrl: "https://source.unsplash.com/random/1200x600/?restaurant,luxury,vietnamese",
  openHours: {
    weekday: "11:00 - 23:00",
    weekend: "10:00 - 24:00"
  }
};

const TableBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [bookingCompleted, setBookingCompleted] = useState(false);
  
  // Thông tin nhà hàng từ ID
  const restaurantId = parseInt(id || "1");
  const restaurant = {
    ...restaurantDetails,
    id: restaurantId
  };
  
  // Thông tin đặt bàn
  const [bookingInfo, setBookingInfo] = useState({
    date: new Date(),
    time: "",
    guests: "2",
    specialRequests: "",
    tablePreference: "standard" // standard, window, private, outdoor
  });
  
  // Thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: ""
  });

  // Xử lý thay đổi thông tin đặt bàn
  const handleBookingInfoChange = (field: string, value: string | Date) => {
    setBookingInfo(prev => ({ ...prev, [field]: value }));
  };

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  // Xử lý khi xác nhận đặt bàn
  const handleBookingSubmit = () => {
    setBookingCompleted(true);
    toast({
      title: "Đặt bàn thành công!",
      description: "Đơn đặt bàn của bạn đã được xác nhận. Chúng tôi sẽ liên hệ lại sớm.",
    });
    
    // Tự động chuyển sang trang xác nhận sau 1 giây
    setTimeout(() => {
      setActiveStep(2);
    }, 1000);
  };

  // Xử lý khi người dùng muốn quay lại trang nhà hàng
  const handleBackToRestaurants = () => {
    navigate("/restaurants");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-2 mb-4 text-sm font-medium tracking-wide text-primary rounded-none">
              STELLAR HOSPITALITY
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Đặt Bàn
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hoàn tất quá trình đặt bàn của bạn tại {restaurant.name}
            </p>
          </motion.div>
        </section>

        {/* Các bước đặt bàn */}
        <div className="relative mb-10">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-none flex items-center justify-center border-2 ${activeStep >= 1 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                1
              </div>
              <span className="mt-2 text-sm">Thông tin</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-muted-foreground/30 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" 
                style={{ width: `${activeStep > 1 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-none flex items-center justify-center border-2 ${activeStep >= 2 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                2
              </div>
              <span className="mt-2 text-sm">Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Nội dung các bước */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột thông tin/form */}
          <div className="lg:col-span-8">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none shadow-lg">
                  <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 rounded-none">
                    <CardHeader className="border-b border-slate-200 dark:border-slate-700 p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-[2px] bg-primary"></div>
                        <CardTitle>Thông tin đặt bàn</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      {/* Thông tin nhà hàng */}
                      <div className="flex items-center p-4 bg-muted/20 hover:bg-primary/5 transition-colors rounded-none mb-6">
                        <div className="w-20 h-20 overflow-hidden mr-4">
                          <img
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                          <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                          <div className="flex items-center mt-2 text-sm">
                            <Clock className="h-4 w-4 mr-1 text-primary" />
                            <span>Thứ 2 - Thứ 6: {restaurant.openHours.weekday}</span>
                          </div>
                          <div className="flex items-center mt-1 text-sm">
                            <Clock className="h-4 w-4 mr-1 text-primary" />
                            <span>Thứ 7 - CN: {restaurant.openHours.weekend}</span>
                          </div>
                        </div>
                      </div>

                      {/* Ngày và giờ đặt bàn */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="date" className="text-sm font-medium flex items-center gap-2">
                            <CalendarDays className="h-4 w-4 text-primary" />
                            Ngày đặt bàn
                          </Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="w-full justify-start text-left font-normal rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {bookingInfo.date ? (
                                  format(bookingInfo.date, "dd MMMM, yyyy", { locale: vi })
                                ) : (
                                  <span>Chọn ngày</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 rounded-none border-0 shadow-lg">
                              <Calendar
                                mode="single"
                                selected={bookingInfo.date}
                                onSelect={(date) => date && handleBookingInfoChange("date", date)}
                                initialFocus
                                disabled={(date) => date < new Date()}
                                className="rounded-none"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="time" className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            Giờ đặt bàn
                          </Label>
                          <Select 
                            value={bookingInfo.time} 
                            onValueChange={(value) => handleBookingInfoChange("time", value)}
                          >
                            <SelectTrigger id="time" className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                              <SelectValue placeholder="Chọn giờ đặt bàn" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none border-0 shadow-lg">
                              <SelectItem value="11:00">11:00</SelectItem>
                              <SelectItem value="12:00">12:00</SelectItem>
                              <SelectItem value="13:00">13:00</SelectItem>
                              <SelectItem value="18:00">18:00</SelectItem>
                              <SelectItem value="19:00">19:00</SelectItem>
                              <SelectItem value="20:00">20:00</SelectItem>
                              <SelectItem value="21:00">21:00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Số lượng khách và loại bàn */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="guests" className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4 text-primary" />
                            Số lượng khách
                          </Label>
                          <Select 
                            value={bookingInfo.guests} 
                            onValueChange={(value) => handleBookingInfoChange("guests", value)}
                          >
                            <SelectTrigger id="guests" className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                              <SelectValue placeholder="Chọn số lượng khách" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none border-0 shadow-lg">
                              <SelectItem value="1">1 người</SelectItem>
                              <SelectItem value="2">2 người</SelectItem>
                              <SelectItem value="3">3 người</SelectItem>
                              <SelectItem value="4">4 người</SelectItem>
                              <SelectItem value="5">5 người</SelectItem>
                              <SelectItem value="6">6 người</SelectItem>
                              <SelectItem value="7">7 người</SelectItem>
                              <SelectItem value="8">8 người</SelectItem>
                              <SelectItem value="more">Hơn 8 người</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tablePreference" className="text-sm font-medium flex items-center gap-2">
                            <Utensils className="h-4 w-4 text-primary" />
                            Loại bàn ưu tiên
                          </Label>
                          <Select 
                            value={bookingInfo.tablePreference} 
                            onValueChange={(value) => handleBookingInfoChange("tablePreference", value)}
                          >
                            <SelectTrigger id="tablePreference" className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800">
                              <SelectValue placeholder="Chọn loại bàn" />
                            </SelectTrigger>
                            <SelectContent className="rounded-none border-0 shadow-lg">
                              <SelectItem value="standard">Bàn tiêu chuẩn</SelectItem>
                              <SelectItem value="window">Bàn cạnh cửa sổ</SelectItem>
                              <SelectItem value="private">Phòng riêng</SelectItem>
                              <SelectItem value="outdoor">Khu vực ngoài trời</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Ghi chú đặc biệt */}
                      <div className="space-y-2">
                        <Label htmlFor="specialRequests" className="text-sm font-medium flex items-center gap-2">
                          <ChevronRight className="h-4 w-4 text-primary" />
                          Yêu cầu đặc biệt
                        </Label>
                        <Textarea
                          id="specialRequests"
                          value={bookingInfo.specialRequests}
                          onChange={(e) => handleBookingInfoChange("specialRequests", e.target.value)}
                          placeholder="Yêu cầu đặc biệt về bàn, thực đơn, hoặc các dịch vụ khác"
                          className="resize-none rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 focus:ring-primary"
                          rows={3}
                        />
                      </div>

                      {/* Thông tin liên hệ */}
                      <div className="space-y-4 mt-8 border-t border-slate-200 dark:border-slate-700 pt-6">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-[2px] bg-primary"></div>
                          <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName" className="text-sm font-medium flex items-center gap-2">
                              <Users className="h-4 w-4 text-primary" />
                              Họ và tên
                            </Label>
                            <Input
                              id="fullName"
                              name="fullName"
                              value={customerInfo.fullName}
                              onChange={handleCustomerInfoChange}
                              placeholder="Nguyễn Văn A"
                              className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 focus:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium flex items-center gap-2">
                              <Phone className="h-4 w-4 text-primary" />
                              Số điện thoại
                            </Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={customerInfo.phone}
                              onChange={handleCustomerInfoChange}
                              placeholder="0912345678"
                              className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 focus:ring-primary"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium flex items-center gap-2">
                              <Mail className="h-4 w-4 text-primary" />
                              Email
                            </Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={handleCustomerInfoChange}
                              placeholder="example@email.com"
                              className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 focus:ring-primary"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-primary to-primary/80 p-0.5 rounded-none mt-6">
                        <Button 
                          className="w-full backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none" 
                          size="lg"
                          onClick={handleBookingSubmit}
                          disabled={bookingCompleted || !bookingInfo.time || !customerInfo.fullName || !customerInfo.phone}
                        >
                          {bookingCompleted ? "Đang xử lý..." : "Xác nhận đặt bàn"}
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="rounded-none bg-green-100 p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center dark:bg-green-900/20">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Đặt bàn thành công!</h2>
                <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                  Cảm ơn bạn đã đặt bàn tại {restaurant.name}. Chúng tôi sẽ liên hệ với bạn để xác nhận đơn đặt bàn.
                </p>
                <div className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 p-6 rounded-none border-0 shadow-lg max-w-md mx-auto mb-8">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <div className="w-4 h-[2px] bg-primary"></div>
                    Chi tiết đặt bàn:
                  </h3>
                  <div className="text-left space-y-4">
                    <div className="flex p-3 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <CalendarDays className="h-5 w-5 mr-3 text-primary" />
                      <span>
                        {format(bookingInfo.date, "EEEE, dd MMMM, yyyy", { locale: vi })} lúc {bookingInfo.time}
                      </span>
                    </div>
                    <div className="flex p-3 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <Users className="h-5 w-5 mr-3 text-primary" />
                      <span>{bookingInfo.guests} người</span>
                    </div>
                    <div className="flex p-3 bg-muted/20 hover:bg-primary/5 transition-colors">
                      <MapPin className="h-5 w-5 mr-3 text-primary" />
                      <span>{restaurant.address}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button 
                    variant="outline" 
                    className="rounded-none bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={handleBackToRestaurants}
                  >
                    Quay lại danh sách nhà hàng
                  </Button>
                  <div className="bg-gradient-to-r from-primary to-primary/80 p-0.5 rounded-none">
                    <Button 
                      className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border-0 rounded-none"
                      onClick={() => navigate("/")}
                    >
                      Về trang chủ
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Cột thông tin nhà hàng */}
          <div className="lg:col-span-4">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-gradient-to-r from-primary/20 to-transparent p-0.5 rounded-none shadow-lg sticky top-4">
                  <Card className="backdrop-blur-sm bg-white/90 dark:bg-slate-900/90 border-0 rounded-none">
                    <CardHeader className="border-b border-slate-200 dark:border-slate-700 p-6">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-[2px] bg-primary"></div>
                        <CardTitle className="flex items-center">
                          <Utensils className="mr-2 h-5 w-5 text-primary" />
                          Thông tin nhà hàng
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="w-full h-48 overflow-hidden">
                        <img 
                          src={restaurant.imageUrl} 
                          alt={restaurant.name}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </div>
                      
                      <div className="space-y-5 mt-4">
                        <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                          <MapPin className="h-5 w-5 text-primary mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium mb-1">Địa chỉ</h4>
                            <p className="text-muted-foreground">{restaurant.address}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                          <Phone className="h-5 w-5 text-primary mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium mb-1">Điện thoại</h4>
                            <p className="text-muted-foreground">{restaurant.phone}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start p-4 bg-muted/20 hover:bg-primary/5 transition-colors">
                          <Clock className="h-5 w-5 text-primary mt-0.5 mr-3" />
                          <div>
                            <h4 className="font-medium mb-1">Giờ mở cửa</h4>
                            <p className="text-muted-foreground">Thứ Hai - Thứ Sáu: {restaurant.openHours.weekday}</p>
                            <p className="text-muted-foreground">Thứ Bảy - Chủ Nhật: {restaurant.openHours.weekend}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 mt-4 backdrop-blur-sm bg-primary/10 rounded-none">
                        <p className="text-sm text-muted-foreground">
                          Vui lòng đến đúng giờ đặt bàn. Nếu có thay đổi, hãy liên hệ với nhà hàng trước ít nhất 2 giờ.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TableBooking; 