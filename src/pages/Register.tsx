import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { User, Mail, Lock, UserPlus } from "lucide-react";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle registration here
    console.log("Register attempt with:", fullName, email, password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-900/30">
      <Header />
      <main className="flex-grow flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="inline-block bg-primary/10 backdrop-blur-sm px-4 py-2 mb-4 text-sm font-medium tracking-wide text-primary rounded-full">
              STELLAR HOSPITALITY
            </div>
            <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
              Đăng Ký Tài Khoản
            </h1>
            <div className="w-16 h-0.5 bg-primary mx-auto"></div>
          </div>
          
          <Card className="backdrop-blur-sm bg-white/70 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-700/30 shadow-xl rounded-none">
            <CardHeader className="space-y-1 pb-2">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
                <div className="w-1.5 h-6 bg-primary mr-3"></div>
                Tạo tài khoản mới
              </CardTitle>
              <CardDescription className="text-center">
                Nhập thông tin chi tiết để tạo tài khoản của bạn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2 group">
                  <Label htmlFor="fullName" className="text-sm font-medium group-focus-within:text-primary transition-colors">Họ và tên</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <User className="h-5 w-5" />
                    </div>
                    <Input 
                      id="fullName" 
                      placeholder="Nguyễn Văn A" 
                      value={fullName} 
                      onChange={(e) => setFullName(e.target.value)}
                      required 
                      className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="text-sm font-medium group-focus-within:text-primary transition-colors">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Mail className="h-5 w-5" />
                    </div>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="email@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                      className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="space-y-2 group">
                  <Label htmlFor="password" className="text-sm font-medium group-focus-within:text-primary transition-colors">Mật khẩu</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                      <Lock className="h-5 w-5" />
                    </div>
                    <Input 
                      id="password" 
                      type="password" 
                      placeholder="••••••••" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                      className="pl-10 rounded-none py-6 text-base border-gray-300 dark:border-gray-700 focus:border-primary shadow-sm focus:shadow-md transition-all duration-300"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full rounded-none bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <UserPlus className="h-5 w-5 mr-2" />
                  Tạo tài khoản
                </Button>
              </form>

              <div className="mt-6 relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 bg-opacity-70 dark:bg-opacity-70 px-2 text-muted-foreground">
                    Hoặc đăng ký với
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <Button 
                  variant="outline" 
                  type="button"
                  className="rounded-none bg-transparent border-gray-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </Button>
                <Button 
                  variant="outline" 
                  type="button"
                  className="rounded-none bg-transparent border-gray-300 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <FaFacebook className="text-blue-600" />
                  <span>Facebook</span>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <p className="text-center text-sm text-muted-foreground">
                Đã có tài khoản?{" "}
                <Link to="/login" className="text-primary hover:text-primary/80 transition-colors font-medium">
                  Đăng nhập
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
