"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Check, Info, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

const paymentSchema = z.object({
  cardName: z.string().min(1, "Name on card is required"),
  cardNumber: z
    .string()
    .min(19, "Invalid card number")
    .max(19, "Invalid card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().length(3, "CVC must be 3 digits"),
});

type Plan = {
  name: string;
  price: number;
};

interface PaymentModalProps {
  plan: Plan;
  isOpen: boolean;
  onClose: () => void;
}

export function PaymentModal({ plan, isOpen, onClose }: PaymentModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof paymentSchema>>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardName: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
    },
  });

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d]/g, "");
    let formattedValue = "";
    for (let i = 0; i < value.length; i += 4) {
      formattedValue += value.substring(i, i + 4) + " ";
    }
    e.target.value = formattedValue.trim().substring(0, 19);
    form.setValue("cardNumber", e.target.value, { shouldValidate: true });
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    if (value.length > 2) {
      value = value.substring(0, 2) + "/" + value.substring(2, 4);
    }
    e.target.value = value;
    form.setValue("expiryDate", e.target.value, { shouldValidate: true });
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^\d]/g, "").substring(0,3);
    form.setValue("cvc", e.target.value, { shouldValidate: true });
  };

  const onSubmit = (values: z.infer<typeof paymentSchema>) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    form.reset();
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-secondary text-foreground p-8">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl text-white flex justify-between items-center">
                Complete Your Membership
                <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-300 hover:text-white">
                  <X className="w-6 h-6" />
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div>
              <p className="text-gray-300 mb-2">
                You have selected the{" "}
                <span className="font-bold text-primary">{plan.name}</span> plan.
              </p>
              <p className="text-2xl font-bold text-white mb-6">
                Total: RM {plan.price}
              </p>
              <Alert className="bg-accent/20 border-accent/50 text-accent-foreground mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Demo Only</AlertTitle>
                <AlertDescription>
                  No real payment will be processed. You can use fake card details.
                </AlertDescription>
              </Alert>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="cardName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="0000 0000 0000 0000" onChange={handleCardNumberChange}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex space-x-4">
                    <FormField
                      control={form.control}
                      name="expiryDate"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="MM/YY" onChange={handleExpiryDateChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cvc"
                      render={({ field }) => (
                        <FormItem className="w-1/2">
                          <FormLabel>CVC</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123" onChange={handleCvcChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit" disabled={isProcessing} className="w-full mt-6 font-bold">
                    {isProcessing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Pay Now"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="mx-auto bg-green-500 rounded-full h-16 w-16 flex items-center justify-center">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-headline text-3xl text-white mt-4">
              Payment Successful!
            </h2>
            <p className="text-gray-200 mt-2">
              Welcome to WARAC! You'll receive a confirmation email shortly.
            </p>
            <Button onClick={handleClose} variant="outline" className="w-full mt-6 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-bold">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
