import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PaymentMethods, PaymentMethod } from "@/components/booking/PaymentMethods";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, ChevronRight, CheckCircle, Clock, UserIcon, CreditCard, Home, Phone, Mail, CheckCheck } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

// Định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const Booking = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit_card");
  
  // Thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    specialRequests: "",
  });

  // Thông tin đặt phòng
  const [bookingInfo, setBookingInfo] = useState({
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 2)),
    adults: 2,
    children: 0,
    roomType: "deluxe",
    roomCount: 1,
  });

  // Tóm tắt đặt phòng và tính giá
  const bookingSummary = {
    roomPrice: 2500000, // Giá phòng mỗi đêm
    nights: Math.max(1, Math.round((bookingInfo.checkOut.getTime() - bookingInfo.checkIn.getTime()) / (1000 * 60 * 60 * 24))),
    tax: 0.1, // 10% thuế
    serviceCharge: 0.05, // 5% phí dịch vụ
  };

  // Tính tổng tiền
  const calculateTotal = () => {
    const subtotal = bookingSummary.roomPrice * bookingSummary.nights * bookingInfo.roomCount;
    const taxAmount = subtotal * bookingSummary.tax;
    const serviceAmount = subtotal * bookingSummary.serviceCharge;
    return subtotal + taxAmount + serviceAmount;
  };

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi xác nhận thanh toán
  const handlePaymentSubmit = () => {
    toast({
      title: "Thanh toán thành công!",
      description: "Đơn đặt phòng của bạn đã được xác nhận. Cảm ơn bạn đã chọn Stellar Hospitality.",
    });
    
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-12 flex-grow">
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10"
          >
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-2 mb-4 text-sm font-medium tracking-wide text-primary rounded-full">
              STELLAR HOSPITALITY
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Đặt Phòng & Trải Nghiệm
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Hoàn tất quá trình đặt phòng để bắt đầu hành trình trải nghiệm dịch vụ tuyệt vời tại Stellar Hospitality
            </p>
          </motion.div>
        </section>

        {/* Các bước đặt phòng */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mb-14"
        >
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm ${activeStep >= 1 ? "bg-primary/80 text-white" : "bg-white dark:bg-slate-800 border border-muted"}`}>
                {activeStep > 1 ? <CheckCheck className="h-5 w-5" /> : <UserIcon className="h-5 w-5" />}
              </div>
              <span className="mt-3 text-sm font-medium">Thông tin</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-muted-foreground/20 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-700" 
                style={{ width: `${activeStep > 1 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm ${activeStep >= 2 ? "bg-primary/80 text-white" : "bg-white dark:bg-slate-800 border border-muted"}`}>
                {activeStep > 2 ? <CheckCheck className="h-5 w-5" /> : <CreditCard className="h-5 w-5" />}
              </div>
              <span className="mt-3 text-sm font-medium">Thanh toán</span>
            </div>
            <div className="flex-1 h-0.5 mx-4 bg-muted-foreground/20 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-700" 
                style={{ width: `${activeStep > 2 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-md backdrop-blur-sm ${activeStep >= 3 ? "bg-primary/80 text-white" : "bg-white dark:bg-slate-800 border border-muted"}`}>
                {activeStep > 3 ? <CheckCheck className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
              </div>
              <span className="mt-3 text-sm font-medium">Xác nhận</span>
            </div>
          </div>
        </motion.div>

        {/* Nội dung các bước */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {activeStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg"
                >
                  <div className="border-b border-slate-200 dark:border-slate-800 p-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Thông tin đặt phòng
                    </h2>
                    <div className="w-16 h-0.5 bg-primary/50 mt-2"></div>
                  </div>
                  <div className="p-6 space-y-8">
                    <Tabs defaultValue="dates" className="w-full">
                      <TabsList className="grid grid-cols-2 mb-6 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-md">
                        <TabsTrigger value="dates" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-primary data-[state=active]:shadow-sm">
                          Ngày & Phòng
                        </TabsTrigger>
                        <TabsTrigger value="personal" className="rounded-md data-[state=active]:bg-white dark:data-[state=active]:bg-slate-950 data-[state=active]:text-primary data-[state=active]:shadow-sm">
                          Thông tin cá nhân
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="dates" className="space-y-6">
                        {/* Ngày nhận/trả phòng */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="check-in" className="text-sm font-medium">Ngày nhận phòng</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className="w-full justify-start text-left font-normal flex bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                  {format(bookingInfo.checkIn, "dd/MM/yyyy")}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={bookingInfo.checkIn}
                                  onSelect={(date) => date && setBookingInfo(prev => ({ ...prev, checkIn: date }))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="check-out" className="text-sm font-medium">Ngày trả phòng</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className="w-full justify-start text-left font-normal flex bg-transparent border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                  {format(bookingInfo.checkOut, "dd/MM/yyyy")}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0">
                                <Calendar
                                  mode="single"
                                  selected={bookingInfo.checkOut}
                                  onSelect={(date) => date && setBookingInfo(prev => ({ ...prev, checkOut: date }))}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                        </div>

                        {/* Số lượng người và phòng */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="adults" className="text-sm font-medium">Người lớn</Label>
                            <Select
                              value={bookingInfo.adults.toString()}
                              onValueChange={(value) => setBookingInfo(prev => ({ ...prev, adults: parseInt(value) }))}
                            >
                              <SelectTrigger id="adults" className="bg-transparent border-slate-200 dark:border-slate-700">
                                <SelectValue placeholder="Số người lớn" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>{num} người</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="children" className="text-sm font-medium">Trẻ em</Label>
                            <Select
                              value={bookingInfo.children.toString()}
                              onValueChange={(value) => setBookingInfo(prev => ({ ...prev, children: parseInt(value) }))}
                            >
                              <SelectTrigger id="children" className="bg-transparent border-slate-200 dark:border-slate-700">
                                <SelectValue placeholder="Số trẻ em" />
                              </SelectTrigger>
                              <SelectContent>
                                {[0, 1, 2, 3, 4].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>{num} trẻ em</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        {/* Loại phòng và số lượng */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="room-type" className="text-sm font-medium">Loại phòng</Label>
                            <Select
                              value={bookingInfo.roomType}
                              onValueChange={(value) => setBookingInfo(prev => ({ ...prev, roomType: value }))}
                            >
                              <SelectTrigger id="room-type" className="bg-transparent border-slate-200 dark:border-slate-700">
                                <SelectValue placeholder="Chọn loại phòng" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="deluxe">Phòng Deluxe</SelectItem>
                                <SelectItem value="premium">Phòng Premium</SelectItem>
                                <SelectItem value="junior-suite">Suite Junior</SelectItem>
                                <SelectItem value="family-suite">Suite Gia Đình</SelectItem>
                                <SelectItem value="beach-villa">Villa Bãi Biển</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="room-count" className="text-sm font-medium">Số lượng phòng</Label>
                            <Select
                              value={bookingInfo.roomCount.toString()}
                              onValueChange={(value) => setBookingInfo(prev => ({ ...prev, roomCount: parseInt(value) }))}
                            >
                              <SelectTrigger id="room-count" className="bg-transparent border-slate-200 dark:border-slate-700">
                                <SelectValue placeholder="Số phòng" />
                              </SelectTrigger>
                              <SelectContent>
                                {[1, 2, 3, 4, 5].map((num) => (
                                  <SelectItem key={num} value={num.toString()}>{num} phòng</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="personal" className="space-y-6">
                        {/* Thông tin cá nhân */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium">Họ</Label>
                            <Input
                              id="firstName"
                              name="firstName"
                              value={customerInfo.firstName}
                              onChange={handleCustomerInfoChange}
                              placeholder="Nguyễn"
                              className="bg-transparent border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium">Tên</Label>
                            <Input
                              id="lastName"
                              name="lastName"
                              value={customerInfo.lastName}
                              onChange={handleCustomerInfoChange}
                              placeholder="Văn A"
                              className="bg-transparent border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={handleCustomerInfoChange}
                              placeholder="example@gmail.com"
                              className="bg-transparent border-slate-200 dark:border-slate-700"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium">Số điện thoại</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={customerInfo.phone}
                              onChange={handleCustomerInfoChange}
                              placeholder="0912345678"
                              className="bg-transparent border-slate-200 dark:border-slate-700"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address" className="text-sm font-medium">Địa chỉ</Label>
                          <Input
                            id="address"
                            name="address"
                            value={customerInfo.address}
                            onChange={handleCustomerInfoChange}
                            placeholder="123 Đường ABC, Quận XYZ, TP HCM"
                            className="bg-transparent border-slate-200 dark:border-slate-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="specialRequests" className="text-sm font-medium">Yêu cầu đặc biệt</Label>
                          <Textarea
                            id="specialRequests"
                            name="specialRequests"
                            value={customerInfo.specialRequests}
                            onChange={handleCustomerInfoChange}
                            placeholder="Vui lòng nhập yêu cầu đặc biệt của bạn (nếu có)"
                            className="min-h-[100px] bg-transparent border-slate-200 dark:border-slate-700"
                          />
                        </div>
                      </TabsContent>
                    </Tabs>

                    <div className="pt-4 flex justify-end">
                      <Button 
                        className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border border-primary/20 rounded-none"
                        onClick={() => setActiveStep(2)}
                      >
                        Tiếp tục <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  <PaymentMethods
                    selectedMethod={paymentMethod}
                    onMethodChange={setPaymentMethod}
                    onSubmit={() => setActiveStep(3)}
                  />
                </motion.div>
              )}

              {activeStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg"
                >
                  <div className="border-b border-slate-200 dark:border-slate-800 p-6">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                      Xác nhận đặt phòng
                    </h2>
                    <div className="w-16 h-0.5 bg-primary/50 mt-2"></div>
                  </div>
                  <div className="p-6 space-y-8">
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-800 flex items-center justify-center">
                          <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-400">
                          Đơn đặt phòng đã được xác nhận!
                        </h3>
                      </div>
                      <p className="ml-13 text-green-700 dark:text-green-300">
                        Cảm ơn bạn đã chọn Stellar Hospitality. Chi tiết đơn đặt phòng đã được gửi đến email của bạn.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Home className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Thông tin đặt phòng</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm ml-10 border-l-2 border-primary/10 pl-4 py-2">
                        <div className="text-muted-foreground">Mã đặt phòng:</div>
                        <div className="font-medium">SH-{Math.floor(100000 + Math.random() * 900000)}</div>
                        
                        <div className="text-muted-foreground">Ngày nhận phòng:</div>
                        <div>{format(bookingInfo.checkIn, "dd/MM/yyyy")}</div>
                        
                        <div className="text-muted-foreground">Ngày trả phòng:</div>
                        <div>{format(bookingInfo.checkOut, "dd/MM/yyyy")}</div>
                        
                        <div className="text-muted-foreground">Loại phòng:</div>
                        <div>
                          {bookingInfo.roomType === "deluxe" && "Phòng Deluxe"}
                          {bookingInfo.roomType === "premium" && "Phòng Premium"}
                          {bookingInfo.roomType === "junior-suite" && "Suite Junior"}
                          {bookingInfo.roomType === "family-suite" && "Suite Gia Đình"}
                          {bookingInfo.roomType === "beach-villa" && "Villa Bãi Biển"}
                        </div>
                        
                        <div className="text-muted-foreground">Số lượng phòng:</div>
                        <div>{bookingInfo.roomCount} phòng</div>
                        
                        <div className="text-muted-foreground">Số đêm:</div>
                        <div>{bookingSummary.nights} đêm</div>
                        
                        <div className="text-muted-foreground">Người lớn:</div>
                        <div>{bookingInfo.adults} người</div>
                        
                        <div className="text-muted-foreground">Trẻ em:</div>
                        <div>{bookingInfo.children} người</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <UserIcon className="h-4 w-4 text-primary" />
                        </div>
                        <h3 className="text-lg font-semibold">Thông tin cá nhân</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm ml-10 border-l-2 border-primary/10 pl-4 py-2">
                        <div className="text-muted-foreground">Họ tên:</div>
                        <div>{customerInfo.firstName} {customerInfo.lastName}</div>
                        
                        <div className="text-muted-foreground">Email:</div>
                        <div className="flex items-center gap-1">
                          <Mail className="h-3 w-3 text-primary" />
                          {customerInfo.email}
                        </div>
                        
                        <div className="text-muted-foreground">Số điện thoại:</div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-primary" />
                          {customerInfo.phone}
                        </div>
                        
                        <div className="text-muted-foreground">Địa chỉ:</div>
                        <div>{customerInfo.address}</div>
                      </div>
                    </div>

                    <div className="pt-6 flex justify-center">
                      <Button 
                        className="backdrop-blur-sm bg-primary/80 hover:bg-primary/90 text-white border border-primary/20 rounded-none px-10 py-6"
                        onClick={handlePaymentSubmit}
                      >
                        Hoàn tất đặt phòng
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Tóm tắt đặt phòng và tổng thanh toán */}
          <div className="md:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="sticky top-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg">
                <div className="border-b border-slate-200 dark:border-slate-800 p-6">
                  <h2 className="text-xl font-bold">Tóm tắt đặt phòng</h2>
                  <div className="w-12 h-0.5 bg-primary/50 mt-2"></div>
                </div>
                <div className="p-6 space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-5 rounded-md border border-slate-200 dark:border-slate-700/50">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">{bookingInfo.roomType === "deluxe" ? "Phòng Deluxe" : 
                        bookingInfo.roomType === "premium" ? "Phòng Premium" : 
                        bookingInfo.roomType === "junior-suite" ? "Suite Junior" : 
                        bookingInfo.roomType === "family-suite" ? "Suite Gia Đình" : 
                        "Villa Bãi Biển"}</span>
                      <span className="text-primary font-medium">{formatCurrency(bookingSummary.roomPrice)} / đêm</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2 mb-1">
                      <Home className="h-3 w-3" />
                      {bookingInfo.roomCount} phòng x {bookingSummary.nights} đêm
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-2">
                      <UserIcon className="h-3 w-3" />
                      {bookingInfo.adults} người lớn, {bookingInfo.children} trẻ em
                    </div>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Tiền phòng</span>
                      <span>{formatCurrency(bookingSummary.roomPrice * bookingSummary.nights * bookingInfo.roomCount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thuế ({(bookingSummary.tax * 100).toFixed(0)}%)</span>
                      <span>{formatCurrency(bookingSummary.roomPrice * bookingSummary.nights * bookingInfo.roomCount * bookingSummary.tax)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phí dịch vụ ({(bookingSummary.serviceCharge * 100).toFixed(0)}%)</span>
                      <span>{formatCurrency(bookingSummary.roomPrice * bookingSummary.nights * bookingInfo.roomCount * bookingSummary.serviceCharge)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3 font-bold flex justify-between">
                      <span>Tổng cộng</span>
                      <span className="text-primary text-lg">{formatCurrency(calculateTotal())}</span>
                    </div>
                  </div>

                  <div className="bg-primary/5 p-4 rounded-md text-xs space-y-2 border border-primary/10">
                    <div className="flex gap-2 items-start">
                      <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium block mb-1">Chính sách hủy phòng:</span>
                        <p className="text-muted-foreground">Miễn phí hủy phòng trước 48 giờ. Phí 50% cho hủy phòng trong vòng 48 giờ.</p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <Clock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium block mb-1">Giờ nhận & trả phòng:</span>
                        <p className="text-muted-foreground">Nhận phòng: 14:00 - 22:00.<br />Trả phòng: trước 12:00.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking; 