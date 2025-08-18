import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { InsertMembershipApplication } from "@shared/schema";

export default function JoinUs() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    position: "",
    jerseySize: "",
    membershipType: "",
    agreeRules: false,
    dataConsent: false,
  });

  const applicationMutation = useMutation({
    mutationFn: async (data: InsertMembershipApplication) => {
      const response = await apiRequest("POST", "/api/membership-applications", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Application Submitted!",
        description: "We will contact you soon about your membership.",
      });
      setFormData({
        name: "",
        contact: "",
        position: "",
        jerseySize: "",
        membershipType: "",
        agreeRules: false,
        dataConsent: false,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/membership-applications"] });
    },
    onError: (error: any) => {
      toast({
        title: "Application Failed",
        description: error.message || "Please check your information and try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeRules || !formData.dataConsent) {
      toast({
        title: "Please accept all agreements",
        description: "You must agree to the rules and data consent to proceed.",
        variant: "destructive",
      });
      return;
    }

    applicationMutation.mutate({
      ...formData,
      agreeRules: formData.agreeRules ? "true" : "false",
      dataConsent: formData.dataConsent ? "true" : "false",
    });
  };

  return (
    <section id="join" className="py-32 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Join the Team</h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
            Ready to play real 5-on-5 and grow with a committed squad?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="font-bold text-2xl mb-4">Membership Options</h3>
              
              <div className="space-y-6">
                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">Regular Member</h4>
                  <p className="text-gray-400 mb-3">Best if you attend ≥2 times/month</p>
                  <p className="text-2xl font-bold text-accent">₩19,000/month</p>
                </div>

                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">Dormant Member</h4>
                  <p className="text-gray-400 mb-3">3-month blocks; guest rate applies when attending</p>
                  <p className="text-2xl font-bold text-accent">₩5,000/month</p>
                </div>

                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">Firefighter Cadet</h4>
                  <p className="text-gray-400 mb-3">Special program for emergency service trainees</p>
                  <p className="text-2xl font-bold text-green-500">Free</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h3 className="font-bold text-2xl mb-6">Application Form</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Name</Label>
                  <Input 
                    type="text" 
                    placeholder="Full Name"
                    className="bg-black border-gray-700 text-white mt-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="text-white">Phone/Email</Label>
                  <Input 
                    type="text" 
                    placeholder="Contact Information"
                    className="bg-black border-gray-700 text-white mt-2"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">Position</Label>
                  <select 
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none mt-2"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  >
                    <option value="">Select Position</option>
                    <option value="guard">Point Guard</option>
                    <option value="shooting">Shooting Guard</option>
                    <option value="forward">Small Forward</option>
                    <option value="power">Power Forward</option>
                    <option value="center">Center</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white">Jersey Size</Label>
                  <select 
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none mt-2"
                    value={formData.jerseySize}
                    onChange={(e) => setFormData({ ...formData, jerseySize: e.target.value })}
                    required
                  >
                    <option value="">Select Size</option>
                    <option value="s">Small</option>
                    <option value="m">Medium</option>
                    <option value="l">Large</option>
                    <option value="xl">X-Large</option>
                    <option value="xxl">XX-Large</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-white">Membership Type</Label>
                <div className="space-y-3 mt-2">
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="membership" 
                      value="regular" 
                      className="text-accent focus:ring-accent"
                      onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                      required
                    />
                    <span className="ml-3">Regular Member (₩19,000/month)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="membership" 
                      value="dormant" 
                      className="text-accent focus:ring-accent"
                      onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                      required
                    />
                    <span className="ml-3">Dormant Member (₩5,000/month)</span>
                  </label>
                  <label className="flex items-center">
                    <input 
                      type="radio" 
                      name="membership" 
                      value="firefighter" 
                      className="text-accent focus:ring-accent"
                      onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                      required
                    />
                    <span className="ml-3">Firefighter Cadet (Free)</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="rules"
                    checked={formData.agreeRules}
                    onCheckedChange={(checked) => setFormData({ ...formData, agreeRules: !!checked })}
                    className="border-gray-700"
                  />
                  <Label htmlFor="rules" className="text-white">Agree to Club Rules</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="consent"
                    checked={formData.dataConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, dataConsent: !!checked })}
                    className="border-gray-700"
                  />
                  <Label htmlFor="consent" className="text-white">Personal Data Consent</Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent text-white hover:bg-red-600 py-4 rounded-lg font-bold text-lg"
                disabled={applicationMutation.isPending}
              >
                {applicationMutation.isPending ? "Submitting..." : "Submit Application"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
