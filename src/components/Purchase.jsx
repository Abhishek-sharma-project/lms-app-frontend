import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2, XCircle, Lock } from "lucide-react";
import { toast } from "sonner";
import { useWebhookMutation } from "@/features/api/purchaseApi";

const Purchase = () => {
  const [form, setForm] = useState({
    email: "",
    mobile: "",
    method: "card",
    upiId: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState(null);
  const [webhook, { isLoading }] = useWebhookMutation();
  const navigate = useNavigate();
  const location = useLocation();
  const { course, transactionId } = location.state || {};

  useEffect(() => {
    if (isLoading) {
      const timer = setInterval(
        () => setProgress((p) => Math.min(p + 10, 100)),
        800
      );
      return () => clearInterval(timer);
    }
  }, [isLoading]);

  const handlePurchase = async () => {
    if (!form.email || !form.mobile) {
      toast.error("Please fill all required fields!");
      return;
    }

    try {
      const response = await webhook(transactionId);
      const purchaseStatus = response?.data?.purchase?.status;
      const message = response?.data.message;
      setStatus(purchaseStatus);

      if (message === "Payment already processed") {
        toast.info("Payment already completed earlier");
      }
      if (purchaseStatus === "completed") {
        toast.success("Payment Successful");
        setTimeout(() => {
          navigate(-1);
        }, 4000);
      }
      if (purchaseStatus === "failed") {
        toast.error("Payment Failed");
      }
    } catch (error) {
      toast.error("Payment Verification Error");
      setStatus("failed");
    }
  };

  if (!course || !transactionId) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">
          No checkout session found. Go back and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center p-4 md:p-8">
      <div className="w-full max-w-4xl rounded-2xl flex flex-col md:flex-row overflow-hidden border border-gray-200 mt-15">
        <div className="md:w-1/2 p-6 flex flex-col bg-gray-100 dark:bg-gray-800 justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex flex-col items-center">
              <img
                src={course.courseThumbnail}
                alt="course"
                className="w-full md:w-4/5 h-40 md:h-48 rounded-lg object-cover shadow-sm mb-4 mx-auto"
              />
              <h3 className="font-semibold text-lg text-center">
                {course.courseTitle}
              </h3>
              <p className="text-gray-500 text-sm text-center mt-1">
                Instant access after successful payment
              </p>
              <div className="w-full mt-6 border-t pt-3 flex justify-between text-base font-semibold">
                <p>Total Amount</p>
                <p>₹{course.coursePrice}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center mb-6 gap-2">
            <Lock className="text-green-600 w-5 h-5" />
            <h2 className="text-lg font-semibold">Secure Payment Gateway</h2>
          </div>

          {/* user info */}
          <div className="grid grid-cols-1 gap-2 mb-6">
            <Input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <Input
              placeholder="Mobile"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            />
          </div>

          {/* payment method */}
          <p className="font-medium mb-2">Select Payment Method</p>
          <div className="flex gap-2 mb-6">
            {["card", "upi", "netbanking"].map((purchase) => (
              <Button
                key={purchase}
                variant={form.method === purchase ? "default" : "outline"}
                onClick={() => setForm({ ...form, method: purchase })}
                className="capitalize w-1/3 py-2 cursor-pointer"
              >
                {purchase}
              </Button>
            ))}
          </div>

          {/* conditional fields */}
          {form.method === "card" && (
            <div className="space-y-3 mb-5">
              <Input
                placeholder="Card Number"
                value={form.cardNumber}
                onChange={(e) =>
                  setForm({ ...form, cardNumber: e.target.value })
                }
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  placeholder="MM/YY"
                  value={form.expiry}
                  onChange={(e) => setForm({ ...form, expiry: e.target.value })}
                />
                <Input
                  placeholder="CVV"
                  type="password"
                  value={form.cvv}
                  onChange={(e) => setForm({ ...form, cvv: e.target.value })}
                />
              </div>
            </div>
          )}

          {form.method === "upi" && (
            <div className="mb-5">
              <Input
                placeholder="Enter UPI ID"
                value={form.upiId}
                onChange={(e) => setForm({ ...form, upiId: e.target.value })}
              />
            </div>
          )}

          {/* progress */}
          {isLoading && (
            <div className="text-center space-y-2 mb-5">
              <Loader2 className="animate-spin text-blue-600 w-6 h-6 mx-auto" />
              <p className="text-sm">Processing your payment securely...</p>
              <div className="w-full rounded-full h-2 overflow-hidden">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* status */}
          {status === "completed" && (
            <div className="flex flex-col items-center text-green-600 mb-4">
              <CheckCircle2 className="w-8 h-8 mb-1" />
              <p>Payment Successful</p>
            </div>
          )}

          {status === "failed" && (
            <div className="flex flex-col items-center text-red-500 mb-4">
              <XCircle className="w-8 h-8 mb-1" />
              <p>Payment Failed, Try Again</p>
            </div>
          )}

          {/* paurchase button */}
          {!isLoading && !status && (
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-lg py-4 rounded-xl shadow-md cursor-pointer"
              onClick={handlePurchase}
            >
              Pay ₹{course.coursePrice}
            </Button>
          )}

          <p className="text-xs text-center mt-4">
            Your payment information is encrypted and secure
          </p>
        </div>
      </div>
    </div>
  );
};

export default Purchase;
