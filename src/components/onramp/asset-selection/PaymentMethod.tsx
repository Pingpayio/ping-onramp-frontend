
import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaymentMethodProps {
  selectedMethod?: string;
  onMethodSelect?: (method: string) => void;
}

const PaymentMethod = ({ 
  selectedMethod = "card", 
  onMethodSelect = () => {} 
}: PaymentMethodProps) => {
  const [currentMethod, setCurrentMethod] = useState(selectedMethod);
  
  useEffect(() => {
    setCurrentMethod(selectedMethod);
  }, [selectedMethod]);

  const handleValueChange = (value: string) => {
    setCurrentMethod(value);
    onMethodSelect(value);
  };

  // Dynamic subtext based on the selected payment method
  const getMethodSubtext = (method: string) => {
    switch (method) {
      case 'card':
        return 'Debit or Credit Card (Available in most countries)';
      case 'ach':
        return 'Bank Transfer (ACH) - US only';
      case 'apple':
        return 'Apple Pay - Available on iOS devices';
      default:
        return '';
    }
  };

  return (
    <div className="flex flex-col">
      <label className="text-sm text-white mb-2">Payment Method</label>
      <Select value={currentMethod} onValueChange={handleValueChange}>
        <SelectTrigger 
          className="rounded-lg hover:shadow-sm transition-shadow bg-[#303030] border border-[rgba(255,255,255,0.18)] h-[42px] 
          text-white/60 flex items-center px-3
          focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:outline-none
          focus-visible:border-[#AF9EF9] focus-visible:border-[1.5px] hover:border-[#AF9EF9]/70"
        >
          <SelectValue placeholder="Select payment method" className="font-normal text-white/60" />
          {/* Removed the duplicate ChevronDown icon here */}
        </SelectTrigger>
        <SelectContent className="bg-[#303030] border-[#AF9EF9] text-white/60">
          <SelectItem value="card" className="text-white/60 text-sm font-normal hover:text-white hover:bg-white/5">Debit or Credit Card</SelectItem>
          <SelectItem value="ach" className="text-white/60 text-sm font-normal hover:text-white hover:bg-white/5">Bank Transfer (ACH)</SelectItem>
          <SelectItem value="apple" className="text-white/60 text-sm font-normal hover:text-white hover:bg-white/5">Apple Pay</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-xs text-white/40 mt-1">
        {getMethodSubtext(currentMethod)}
      </p>
    </div>
  );
};

export default PaymentMethod;
