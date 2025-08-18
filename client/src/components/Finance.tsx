import { Button } from "@/components/ui/button";
import { DollarSign, CreditCard, BarChart3 } from "lucide-react";

export default function Finance() {
  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black text-black mb-6">Open Finance</h2>
          <p className="text-xl text-gray-600 font-light max-w-3xl mx-auto">
            Monthly income, expenses, and balance are published for members.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">Monthly Income</h3>
              <p className="text-3xl font-black text-green-600">₩850,000</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">Monthly Expenses</h3>
              <p className="text-3xl font-black text-red-600">₩740,000</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-bold text-2xl mb-2">Balance</h3>
              <p className="text-3xl font-black text-blue-600">₩110,000</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h4 className="font-bold text-xl mb-6">Expense Breakdown</h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Venue fees (weekly)</span>
                  <span className="font-medium">₩400,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Equipment & supplies</span>
                  <span className="font-medium">₩150,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Beverages</span>
                  <span className="font-medium">₩40,000</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Tournament fees</span>
                  <span className="font-medium">₩100,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Insurance</span>
                  <span className="font-medium">₩30,000</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-700">Miscellaneous</span>
                  <span className="font-medium">₩20,000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Button className="bg-accent text-white hover:bg-red-600 rounded-full px-8 py-3">
              View Monthly Report
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
