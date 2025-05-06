import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet2, Landmark, QrCode, Key } from "lucide-react";

// Các phương thức thanh toán
export type PaymentMethod = "credit_card" | "banking" | "e_wallet" | "crypto" | "momo" | "zalopay";

// Props cho component PaymentMethods
interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  onSubmit: () => void;
}

export const PaymentMethods = ({ selectedMethod, onMethodChange, onSubmit }: PaymentMethodsProps) => {
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  const [bankInfo, setBankInfo] = useState({
    accountNumber: "",
    accountName: "",
    bankName: "",
  });

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankInfo((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Phương thức thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup
          value={selectedMethod}
          onValueChange={(value) => onMethodChange(value as PaymentMethod)}
          className="space-y-3"
        >
          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RadioGroupItem value="credit_card" id="credit_card" />
            <Label htmlFor="credit_card" className="flex items-center gap-2 cursor-pointer w-full">
              <CreditCard className="h-5 w-5 text-primary" />
              <span>Thẻ tín dụng/ghi nợ</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RadioGroupItem value="banking" id="banking" />
            <Label htmlFor="banking" className="flex items-center gap-2 cursor-pointer w-full">
              <Landmark className="h-5 w-5 text-primary" />
              <span>Chuyển khoản ngân hàng</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RadioGroupItem value="momo" id="momo" />
            <Label htmlFor="momo" className="flex items-center gap-2 cursor-pointer w-full">
              <QrCode className="h-5 w-5 text-primary" />
              <span>MoMo</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RadioGroupItem value="zalopay" id="zalopay" />
            <Label htmlFor="zalopay" className="flex items-center gap-2 cursor-pointer w-full">
              <Wallet2 className="h-5 w-5 text-primary" />
              <span>ZaloPay</span>
            </Label>
          </div>

          <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <RadioGroupItem value="crypto" id="crypto" />
            <Label htmlFor="crypto" className="flex items-center gap-2 cursor-pointer w-full">
              <Key className="h-5 w-5 text-primary" />
              <span>Cryptocurrency</span>
            </Label>
          </div>
        </RadioGroup>

        {/* Hiển thị thông tin thanh toán theo phương thức đã chọn */}
        {selectedMethod === "credit_card" && (
          <div className="space-y-4 mt-6 p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-medium">Thông tin thẻ</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="cardNumber">Số thẻ</Label>
                <Input 
                  id="cardNumber" 
                  name="cardNumber" 
                  placeholder="0000 0000 0000 0000" 
                  value={cardInfo.cardNumber}
                  onChange={handleCardInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="cardHolder">Tên chủ thẻ</Label>
                <Input 
                  id="cardHolder" 
                  name="cardHolder" 
                  placeholder="NGUYEN VAN A" 
                  value={cardInfo.cardHolder}
                  onChange={handleCardInfoChange}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate">Ngày hết hạn</Label>
                  <Input 
                    id="expiryDate" 
                    name="expiryDate" 
                    placeholder="MM/YY" 
                    value={cardInfo.expiryDate}
                    onChange={handleCardInfoChange}
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input 
                    id="cvv" 
                    name="cvv" 
                    placeholder="123" 
                    value={cardInfo.cvv}
                    onChange={handleCardInfoChange}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedMethod === "banking" && (
          <div className="space-y-4 mt-6 p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-medium">Thông tin chuyển khoản</h3>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="bankName">Ngân hàng</Label>
                <Input 
                  id="bankName" 
                  name="bankName" 
                  placeholder="Vietcombank" 
                  value={bankInfo.bankName}
                  onChange={handleBankInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="accountNumber">Số tài khoản</Label>
                <Input 
                  id="accountNumber" 
                  name="accountNumber" 
                  placeholder="0123456789" 
                  value={bankInfo.accountNumber}
                  onChange={handleBankInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="accountName">Tên chủ tài khoản</Label>
                <Input 
                  id="accountName" 
                  name="accountName" 
                  placeholder="NGUYEN VAN A" 
                  value={bankInfo.accountName}
                  onChange={handleBankInfoChange}
                />
              </div>
            </div>
          </div>
        )}

        {(selectedMethod === "momo" || selectedMethod === "zalopay") && (
          <div className="space-y-4 mt-6 p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-medium">Quét mã QR để thanh toán</h3>
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-md w-48 h-48 flex items-center justify-center">
                <QrCode className="h-40 w-40 text-primary" />
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Sử dụng ứng dụng {selectedMethod === "momo" ? "MoMo" : "ZaloPay"} để quét mã QR này
            </p>
          </div>
        )}

        {selectedMethod === "crypto" && (
          <div className="space-y-4 mt-6 p-4 border rounded-md bg-slate-50 dark:bg-slate-800/50">
            <h3 className="font-medium">Thanh toán bằng Cryptocurrency</h3>
            <div className="space-y-2">
              <p className="text-sm">Gửi thanh toán đến ví:</p>
              <div className="bg-white dark:bg-slate-900 p-2 rounded border text-sm font-mono break-all">
                0xD8dA6BF26964aF9D7eEd9e03E53415D37aA96045
              </div>
              <div className="flex justify-center mt-4">
                <div className="bg-white p-4 rounded-md w-32 h-32 flex items-center justify-center">
                  <QrCode className="h-24 w-24 text-primary" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Hỗ trợ: BTC, ETH, USDT, USDC
              </p>
            </div>
          </div>
        )}

        <div className="pt-4">
          <Button 
            className="w-full bg-gradient-to-r from-primary to-primary/80 hover:opacity-90 text-white"
            onClick={onSubmit}
          >
            Xác nhận thanh toán
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 