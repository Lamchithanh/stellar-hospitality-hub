import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Check, ArrowLeft, Clock, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Các type cho component
export interface BookingFormProps {
  type: 'service' | 'food' | 'room'; // Loại đặt lịch
  title: string; // Tiêu đề form (tên dịch vụ, món ăn, loại phòng)
  subtitle?: string; // Mô tả thêm
  image?: string; // Ảnh đại diện
  price?: string; // Giá tiền
  options?: { name: string; price?: string }[]; // Các lựa chọn (loại dịch vụ, món ăn kèm theo)
  availableTimes?: string[]; // Các khung giờ có sẵn
  returnUrl: string; // URL quay lại trang trước
}

// Thời gian mặc định cho đặt lịch
const defaultTimes = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const successVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: { 
      type: "spring", 
      stiffness: 80,
      duration: 0.5
    }
  }
};

export function BookingForm({
  type,
  title,
  subtitle,
  image,
  price,
  options = [],
  availableTimes = defaultTimes,
  returnUrl
}: BookingFormProps) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    option: "",
    quantity: "1",
    notes: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Giả lập API call
    try {
      // Thực tế sẽ gọi API đặt lịch/đặt hàng ở đây
      console.log("Form data submitted:", formData);
      
      // Giả lập thời gian chờ API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Hiển thị thành công
      setIsSuccess(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      // Thực tế sẽ hiển thị thông báo lỗi
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    switch (type) {
      case 'service': return `Đặt lịch ${title}`;
      case 'food': return `Đặt món ${title}`;
      case 'room': return `Đặt phòng ${title}`;
      default: return `Đặt ${title}`;
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'service': return 'Xác nhận đặt lịch';
      case 'food': return 'Xác nhận đặt món';
      case 'room': return 'Xác nhận đặt phòng';
      default: return 'Xác nhận';
    }
  };

  const getSuccessMessage = () => {
    switch (type) {
      case 'service': return 'Đặt lịch thành công!';
      case 'food': return 'Đặt món thành công!';
      case 'room': return 'Đặt phòng thành công!';
      default: return 'Đặt thành công!';
    }
  };

  if (isSuccess) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={successVariants}
        >
          <Card className="rounded-none border shadow-lg dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
            <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>
            <CardContent className="p-12 text-center">
              <motion.div 
                className="w-24 h-24 mx-auto mb-8 relative"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.2
                }}
              >
                <div className="absolute inset-0 bg-green-100 dark:bg-green-900/30 rounded-full animate-ping opacity-25"></div>
                <div className="relative bg-green-100 dark:bg-green-900/30 w-full h-full rounded-full flex items-center justify-center">
                  <Check className="h-12 w-12 text-green-600 dark:text-green-400" />
                </div>
              </motion.div>
              
              <motion.h2 
                className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {getSuccessMessage()}
              </motion.h2>
              
              <motion.p 
                className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Cảm ơn bạn đã lựa chọn dịch vụ của chúng tôi. Chúng tôi sẽ liên hệ với bạn 
                trong thời gian sớm nhất để xác nhận thông tin của bạn.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Button 
                  variant="outline" 
                  className="rounded-none border shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => navigate(returnUrl)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
                <Button 
                  className="rounded-none bg-primary hover:bg-primary/90 shadow-sm hover:shadow-md transition-all duration-300"
                  onClick={() => navigate("/")}
                >
                  Về trang chủ
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Card className="rounded-none border shadow-lg dark:bg-slate-800/50 backdrop-blur-sm overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-primary/50"></div>
          <CardHeader className="border-b dark:border-gray-800 p-6 bg-slate-50/50 dark:bg-slate-900/20">
            <div className="flex items-center mb-3">
              <Button 
                variant="ghost" 
                size="sm" 
                className="rounded-none p-0 mr-3 hover:bg-transparent group"
                onClick={() => navigate(returnUrl)}
              >
                <ArrowLeft className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </Button>
              <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">{getFormTitle()}</CardTitle>
            </div>
            <CardDescription className="text-base">{subtitle}</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="p-6 md:p-8 space-y-8">
              {/* Thông tin đặt lịch/mua hàng */}
              {(image || price) && (
                <motion.div variants={itemVariants} className="border dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex flex-col sm:flex-row">
                    {image && (
                      <div className="w-full sm:w-1/3 max-w-[240px]">
                        <div className="relative h-full">
                          <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                        </div>
                      </div>
                    )}
                    <div className="flex-grow p-5 bg-slate-50 dark:bg-slate-900/20">
                      <h3 className="font-semibold text-xl mb-1">{title}</h3>
                      {price && <p className="text-primary font-bold text-2xl mt-2">{price}</p>}
                      {type === 'service' && (
                        <div className="flex items-center mt-2 text-muted-foreground text-sm">
                          <Clock className="h-4 w-4 mr-1 text-primary" />
                          <span>Thời gian đặt lịch: 09:00 - 18:00</span>
                        </div>
                      )}
                      {type === 'room' && (
                        <div className="flex items-center mt-2 text-muted-foreground text-sm">
                          <Info className="h-4 w-4 mr-1 text-primary" />
                          <span>Nhận phòng từ 14:00, Trả phòng trước 12:00</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Thông tin khách hàng */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b dark:border-gray-800 flex items-center">
                  <div className="w-1 h-5 bg-primary mr-2"></div>
                  Thông tin cá nhân
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 group">
                    <Label htmlFor="name" className="text-base group-focus-within:text-primary transition-colors">Họ và tên</Label>
                    <Input 
                      id="name" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Nhập họ và tên của bạn" 
                      className="rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <Label htmlFor="phone" className="text-base group-focus-within:text-primary transition-colors">Số điện thoại</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Nhập số điện thoại của bạn" 
                      className="rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 mt-6 group">
                  <Label htmlFor="email" className="text-base group-focus-within:text-primary transition-colors">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email" 
                    placeholder="example@email.com" 
                    className="rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              {/* Thông tin đặt lịch/đặt hàng */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b dark:border-gray-800 flex items-center">
                  <div className="w-1 h-5 bg-primary mr-2"></div>
                  Thông tin đặt {type === 'service' ? 'lịch' : type === 'food' ? 'món' : 'phòng'}
                </h3>

                {/* Hiện các lựa chọn nếu có */}
                {options.length > 0 && (
                  <div className="space-y-2 mb-6 group">
                    <Label htmlFor="option" className="text-base group-focus-within:text-primary transition-colors">
                      {type === 'service' ? 'Dịch vụ' : type === 'food' ? 'Món ăn' : 'Loại phòng'}
                    </Label>
                    <Select
                      value={formData.option}
                      onValueChange={(value) => handleSelectChange("option", value)}
                      required
                    >
                      <SelectTrigger id="option" className="rounded-none h-[52px] text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300">
                        <SelectValue placeholder={`Chọn ${type === 'service' ? 'dịch vụ' : type === 'food' ? 'món ăn' : 'loại phòng'}`} />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-gray-200 dark:border-gray-800">
                        {options.map((option, index) => (
                          <SelectItem 
                            key={index} 
                            value={option.name}
                            className="rounded-none text-base py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <div className="flex justify-between w-full">
                              <span>{option.name}</span>
                              {option.price && <span className="font-medium text-primary">{option.price}</span>}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {type !== 'food' && (
                    <>
                      <div className="space-y-2 group">
                        <Label htmlFor="date" className="text-base group-focus-within:text-primary transition-colors">Ngày</Label>
                        <Input 
                          id="date" 
                          name="date"
                          value={formData.date}
                          onChange={handleInputChange}
                          type="date" 
                          className="rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2 group">
                        <Label htmlFor="time" className="text-base group-focus-within:text-primary transition-colors">Thời gian</Label>
                        <Select
                          value={formData.time}
                          onValueChange={(value) => handleSelectChange("time", value)}
                          required
                        >
                          <SelectTrigger id="time" className="rounded-none h-[52px] text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300">
                            <SelectValue placeholder="Chọn thời gian" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-gray-200 dark:border-gray-800">
                            {availableTimes.map((time) => (
                              <SelectItem 
                                key={time} 
                                value={time}
                                className="rounded-none text-base py-3 hover:bg-slate-100 dark:hover:bg-slate-800"
                              >
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                  
                  {type === 'food' && (
                    <div className="space-y-2 group">
                      <Label htmlFor="quantity" className="text-base group-focus-within:text-primary transition-colors">Số lượng</Label>
                      <Input 
                        id="quantity" 
                        name="quantity"
                        type="number"
                        min="1"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                        required
                      />
                    </div>
                  )}
                </div>
                
                <div className="space-y-2 mt-6 group">
                  <Label htmlFor="notes" className="text-base group-focus-within:text-primary transition-colors">Ghi chú</Label>
                  <Textarea 
                    id="notes" 
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Nhập yêu cầu đặc biệt hoặc ghi chú khác (nếu có)" 
                    className="rounded-none min-h-[100px] text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                  />
                </div>
              </motion.div>
            </CardContent>
            
            <CardFooter className="flex flex-col sm:flex-row justify-between border-t dark:border-gray-800 p-6 md:p-8 gap-4 bg-slate-50/50 dark:bg-slate-900/20">
              <motion.div variants={itemVariants}>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="rounded-none border w-full sm:w-auto shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-300"
                  onClick={() => navigate(returnUrl)}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Quay lại
                </Button>
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <Button 
                  type="submit" 
                  className="rounded-none bg-primary hover:bg-primary/90 min-w-[180px] w-full sm:w-auto shadow-md hover:shadow-lg transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                      <span>Đang xử lý...</span>
                    </div>
                  ) : (
                    <>
                      <Calendar className="h-4 w-4 mr-2" />
                      {getButtonText()}
                    </>
                  )}
                </Button>
              </motion.div>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  );
} 