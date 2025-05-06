import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { 
  CreditCard, 
  Banknote, 
  QrCode, 
  Phone, 
  Package, 
  MapPin, 
  Mail, 
  Calendar, 
  Clock, 
  ChevronRight, 
  ShoppingCart,
  Utensils,
  CheckCircle
} from "lucide-react";

// Dữ liệu mẫu các món ăn (copy từ MenuDetail.tsx)
const menuItems = [
  {
    id: 1,
    name: "Phở Bò Kobe Đặc Biệt",
    category: "Món Việt Hiện Đại",
    price: 350000,
    description: "Phở truyền thống được nâng tầm với thịt bò Kobe thượng hạng và nước dùng ninh xương trong 24 giờ.",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  },
  {
    id: 2,
    name: "Cơm Cháy Sốt Hải Sản",
    category: "Món Fusion",
    price: 280000,
    description: "Cơm cháy giòn rụm kết hợp với hải sản tươi ngon và sốt đặc biệt của bếp trưởng.",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80",
  }
];

// Định dạng tiền tệ Việt Nam
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
};

const FoodOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [orderCompleted, setOrderCompleted] = useState(false);
  
  // Thông tin món ăn từ ID
  const itemId = parseInt(id || "1");
  const menuItem = menuItems.find(item => item.id === itemId) || menuItems[0];
  
  // Thông tin đặt món
  const [orderInfo, setOrderInfo] = useState({
    quantity: 1,
    notes: "",
    deliveryOption: "delivery", // delivery hoặc pickup
    deliveryTime: "", // Thời gian giao hàng
  });
  
  // Thông tin khách hàng
  const [customerInfo, setCustomerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Hà Nội",
  });
  
  // Tính tổng tiền
  const calculateTotal = () => {
    const subtotal = menuItem.price * orderInfo.quantity;
    const deliveryFee = orderInfo.deliveryOption === "delivery" ? 30000 : 0;
    const tax = subtotal * 0.1; // 10% thuế
    return subtotal + deliveryFee + tax;
  };

  // Xử lý thay đổi thông tin khách hàng
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý thay đổi thông tin đặt món
  const handleOrderInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Xử lý khi xác nhận đặt món
  const handleOrderSubmit = () => {
    setOrderCompleted(true);
    toast({
      title: "Đặt món thành công!",
      description: "Đơn hàng của bạn đã được xác nhận và đang được xử lý.",
    });
    
    // Tự động chuyển sang trang xác nhận sau 1 giây
    setTimeout(() => {
      setActiveStep(3);
    }, 1000);
  };

  // Xử lý khi người dùng muốn quay lại trang menu
  const handleBackToMenu = () => {
    navigate("/menus");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900/30">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <section className="mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Đặt Món
            </h1>
            <div className="w-24 h-1 bg-primary mx-auto mb-4 rounded-full"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hoàn tất quá trình đặt món của bạn để thưởng thức ẩm thực tuyệt vời
            </p>
          </motion.div>
        </section>

        {/* Các bước đặt món */}
        <div className="relative mb-10">
          <div className="flex justify-between items-center">
            <div className={`flex flex-col items-center ${activeStep >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 1 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                1
              </div>
              <span className="mt-2 text-sm">Thông tin</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-muted-foreground/30 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" 
                style={{ width: `${activeStep > 1 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 2 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                2
              </div>
              <span className="mt-2 text-sm">Thanh toán</span>
            </div>
            <div className="flex-1 h-0.5 mx-2 bg-muted-foreground/30 relative">
              <div 
                className="absolute top-0 left-0 h-full bg-primary transition-all duration-500" 
                style={{ width: `${activeStep > 2 ? "100%" : "0%"}` }}
              />
            </div>
            <div className={`flex flex-col items-center ${activeStep >= 3 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${activeStep >= 3 ? "border-primary bg-primary/10" : "border-muted-foreground"}`}>
                3
              </div>
              <span className="mt-2 text-sm">Hoàn tất</span>
            </div>
          </div>
        </div>

        {/* Nội dung các bước */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cột thông tin/form */}
          <div className="md:col-span-2">
            {activeStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Thông tin đặt món</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Thông tin món ăn */}
                    <div className="flex items-center p-4 bg-primary/5 rounded-lg mb-6">
                      <div className="w-20 h-20 rounded-md overflow-hidden mr-4">
                        <img
                          src={menuItem.image}
                          alt={menuItem.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold text-lg">{menuItem.name}</h3>
                        <p className="text-sm text-muted-foreground">{menuItem.category}</p>
                        <div className="flex justify-between items-center mt-2">
                          <span className="font-medium text-primary">{formatCurrency(menuItem.price)}</span>
                          <div className="flex items-center">
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setOrderInfo(prev => ({ ...prev, quantity: Math.max(1, prev.quantity - 1) }))}
                            >
                              -
                            </Button>
                            <span className="mx-3 font-medium">{orderInfo.quantity}</span>
                            <Button 
                              variant="outline" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => setOrderInfo(prev => ({ ...prev, quantity: prev.quantity + 1 }))}
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Phương thức nhận món */}
                    <div className="space-y-4">
                      <Label>Phương thức nhận món</Label>
                      <RadioGroup 
                        defaultValue={orderInfo.deliveryOption}
                        onValueChange={(value) => setOrderInfo(prev => ({ ...prev, deliveryOption: value }))}
                        className="grid grid-cols-2 gap-4"
                      >
                        <Label
                          htmlFor="delivery"
                          className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                            orderInfo.deliveryOption === "delivery" 
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:bg-accent"
                          }`}
                        >
                          <RadioGroupItem value="delivery" id="delivery" className="sr-only" />
                          <Package className="h-6 w-6 mb-2" />
                          <div className="text-center">
                            <p className="font-medium">Giao hàng</p>
                            <p className="text-sm text-muted-foreground">Giao đến địa chỉ của bạn</p>
                          </div>
                        </Label>
                        <Label
                          htmlFor="pickup"
                          className={`flex flex-col items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                            orderInfo.deliveryOption === "pickup" 
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:bg-accent"
                          }`}
                        >
                          <RadioGroupItem value="pickup" id="pickup" className="sr-only" />
                          <MapPin className="h-6 w-6 mb-2" />
                          <div className="text-center">
                            <p className="font-medium">Tự đến lấy</p>
                            <p className="text-sm text-muted-foreground">Nhận tại nhà hàng</p>
                          </div>
                        </Label>
                      </RadioGroup>
                    </div>

                    {/* Thời gian giao/nhận hàng */}
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Thời gian {orderInfo.deliveryOption === "delivery" ? "giao hàng" : "nhận hàng"}</Label>
                      <Select
                        value={orderInfo.deliveryTime}
                        onValueChange={(value) => setOrderInfo(prev => ({ ...prev, deliveryTime: value }))}
                      >
                        <SelectTrigger id="deliveryTime">
                          <SelectValue placeholder="Chọn thời gian" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="asap">Càng sớm càng tốt</SelectItem>
                          <SelectItem value="30min">Trong vòng 30 phút</SelectItem>
                          <SelectItem value="1hour">Trong vòng 1 giờ</SelectItem>
                          <SelectItem value="2hour">Trong vòng 2 giờ</SelectItem>
                          <SelectItem value="custom">Chọn thời gian cụ thể</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Ghi chú đặc biệt */}
                    <div className="space-y-2">
                      <Label htmlFor="notes">Ghi chú đặc biệt</Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={orderInfo.notes}
                        onChange={handleOrderInfoChange}
                        placeholder="Yêu cầu đặc biệt về món ăn, gia vị, hoặc cách đóng gói..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    {/* Thông tin liên hệ */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">Thông tin liên hệ</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Họ và tên</Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={customerInfo.fullName}
                            onChange={handleCustomerInfoChange}
                            placeholder="Nguyễn Văn A"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Số điện thoại</Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={customerInfo.phone}
                            onChange={handleCustomerInfoChange}
                            placeholder="0912345678"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={handleCustomerInfoChange}
                            placeholder="example@email.com"
                          />
                        </div>
                        {orderInfo.deliveryOption === "delivery" && (
                          <>
                            <div className="space-y-2">
                              <Label htmlFor="address">Địa chỉ</Label>
                              <Input
                                id="address"
                                name="address"
                                value={customerInfo.address}
                                onChange={handleCustomerInfoChange}
                                placeholder="Số nhà, đường, phường/xã"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="city">Thành phố</Label>
                              <Select
                                value={customerInfo.city}
                                onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, city: value }))}
                              >
                                <SelectTrigger id="city">
                                  <SelectValue placeholder="Chọn thành phố" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Hà Nội">Hà Nội</SelectItem>
                                  <SelectItem value="TP HCM">TP HCM</SelectItem>
                                  <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                                  <SelectItem value="Hải Phòng">Hải Phòng</SelectItem>
                                  <SelectItem value="Cần Thơ">Cần Thơ</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <Button 
                      className="w-full mt-6 bg-gradient-to-r from-primary to-primary/80" 
                      size="lg"
                      onClick={() => setActiveStep(2)}
                    >
                      Tiếp tục thanh toán
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Phương thức thanh toán</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup 
                      defaultValue={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div>
                        <Label
                          htmlFor="credit_card"
                          className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                            paymentMethod === "credit_card" 
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:bg-accent"
                          }`}
                        >
                          <RadioGroupItem value="credit_card" id="credit_card" className="sr-only" />
                          <div className="flex items-center">
                            <CreditCard className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">Thẻ tín dụng/ghi nợ</p>
                              <p className="text-sm text-muted-foreground">Visa, Mastercard, JCB</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <Label
                          htmlFor="cash"
                          className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                            paymentMethod === "cash" 
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:bg-accent"
                          }`}
                        >
                          <RadioGroupItem value="cash" id="cash" className="sr-only" />
                          <div className="flex items-center">
                            <Banknote className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">Tiền mặt</p>
                              <p className="text-sm text-muted-foreground">Thanh toán khi nhận hàng</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                      <div>
                        <Label
                          htmlFor="qr_code"
                          className={`flex items-center justify-between rounded-md border-2 p-4 cursor-pointer ${
                            paymentMethod === "qr_code" 
                              ? "border-primary bg-primary/5" 
                              : "border-muted hover:bg-accent"
                          }`}
                        >
                          <RadioGroupItem value="qr_code" id="qr_code" className="sr-only" />
                          <div className="flex items-center">
                            <QrCode className="h-5 w-5 mr-3 text-primary" />
                            <div>
                              <p className="font-medium">QR Code</p>
                              <p className="text-sm text-muted-foreground">Quét mã QR qua ứng dụng ngân hàng</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    <div className="flex justify-between mt-8">
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveStep(1)}
                      >
                        Quay lại
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-primary to-primary/80" 
                        onClick={handleOrderSubmit}
                        disabled={orderCompleted}
                      >
                        {orderCompleted ? "Đang xử lý..." : "Hoàn tất đặt món"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {activeStep === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center py-10"
              >
                <div className="rounded-full bg-green-100 p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center dark:bg-green-900/20">
                  <CheckCircle className="h-12 w-12 text-green-600 dark:text-green-500" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Đặt món thành công!</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Cảm ơn bạn đã đặt món tại Stellar Hospitality. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất để xác nhận đơn hàng.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button variant="outline" onClick={handleBackToMenu}>
                    Quay lại thực đơn
                  </Button>
                  <Button className="bg-gradient-to-r from-primary to-primary/80" onClick={() => navigate("/")}>
                    Về trang chủ
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Cột tóm tắt đơn hàng */}
          <div className="md:col-span-1">
            {activeStep < 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="bg-white dark:bg-slate-800 shadow-md border-0 sticky top-4">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Tóm tắt đơn hàng
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between py-1">
                        <span className="font-medium">{menuItem.name}</span>
                        <span>x{orderInfo.quantity}</span>
                      </div>
                      <div className="flex justify-between text-muted-foreground text-sm py-1">
                        <span>Đơn giá</span>
                        <span>{formatCurrency(menuItem.price)}</span>
                      </div>
                      {orderInfo.deliveryOption === "delivery" && (
                        <div className="flex justify-between text-muted-foreground text-sm py-1">
                          <span>Phí giao hàng</span>
                          <span>{formatCurrency(30000)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-muted-foreground text-sm py-1">
                        <span>Thuế (10%)</span>
                        <span>{formatCurrency(menuItem.price * orderInfo.quantity * 0.1)}</span>
                      </div>
                      <div className="border-t border-border mt-2 pt-2">
                        <div className="flex justify-between font-bold py-1">
                          <span>Tổng cộng</span>
                          <span className="text-primary">{formatCurrency(calculateTotal())}</span>
                        </div>
                      </div>
                    </div>

                    {activeStep === 1 && (
                      <div className="pt-4 space-y-4">
                        <h3 className="font-semibold flex items-center">
                          <Utensils className="h-4 w-4 mr-2" />
                          Thông tin món ăn
                        </h3>
                        <p className="text-sm text-muted-foreground">{menuItem.description}</p>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>Thời gian phục vụ: 10:00 - 22:00</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>Thời gian chuẩn bị: ~20 phút</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-primary" />
                            <span>Hỗ trợ: 0912 345 678</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FoodOrder; 