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
    <section id="join" className="py-32 bg-black text-white relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-black mb-6">Join the Team</h2>
          <p className="text-xl text-gray-400 font-light max-w-3xl mx-auto">
            진정한 5대5 경기를 통해 헌신적인 팀과 함께 성장할 준비가 되셨나요?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-2xl p-8">
              <h3 className="font-bold text-2xl mb-4">회원 옵션</h3>
              
              <div className="space-y-6">
                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">정규 회원</h4>
                  <p className="text-gray-400 mb-3">월 2회 이상 참석 시 최적</p>
                  <p className="text-2xl font-bold text-accent">₩19,000/월</p>
                </div>

                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">휴면 회원</h4>
                  <p className="text-gray-400 mb-3">3개월 단위; 참석 시 게스트 요금 적용</p>
                  <p className="text-2xl font-bold text-accent">₩5,000/월</p>
                </div>

                <div className="border border-gray-700 rounded-xl p-6 hover:border-accent transition-colors">
                  <h4 className="font-bold text-lg mb-2">학교 재학생 혹은 합격자</h4>
                  <p className="text-gray-400 mb-3">응급 서비스 훈련생을 위한 특별 프로그램</p>
                  <p className="text-2xl font-bold text-green-500">무료</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-8">
            <h3 className="font-bold text-2xl mb-6">신청서</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">이름</Label>
                  <Input 
                    type="text" 
                    placeholder="성명"
                    className="bg-black border-gray-700 text-white mt-2"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label className="text-white">연락처</Label>
                  <Input 
                    type="text" 
                    placeholder="전화번호/이메일"
                    className="bg-black border-gray-700 text-white mt-2"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">포지션</Label>
                  <select 
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none mt-2"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    required
                  >
                    <option value="">포지션 선택</option>
                    <option value="guard">포인트 가드</option>
                    <option value="shooting">슈팅 가드</option>
                    <option value="forward">스몰 포워드</option>
                    <option value="power">파워 포워드</option>
                    <option value="center">센터</option>
                  </select>
                </div>
                <div>
                  <Label className="text-white">유니폼 사이즈</Label>
                  <select 
                    className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-accent focus:outline-none mt-2"
                    value={formData.jerseySize}
                    onChange={(e) => setFormData({ ...formData, jerseySize: e.target.value })}
                    required
                  >
                    <option value="">사이즈 선택</option>
                    <option value="s">소형 (S)</option>
                    <option value="m">중형 (M)</option>
                    <option value="l">대형 (L)</option>
                    <option value="xl">특대 (XL)</option>
                    <option value="xxl">특특대 (XXL)</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-white">회원 유형</Label>
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
                    <span className="ml-3">정규 회원 (₩19,000/월)</span>
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
                    <span className="ml-3">휴면 회원 (₩5,000/월)</span>
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
                    <span className="ml-3">학교 재학생 혹은 합격자 (무료)</span>
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
                  <Label htmlFor="rules" className="text-white">클럽 규칙에 동의</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="consent"
                    checked={formData.dataConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, dataConsent: !!checked })}
                    className="border-gray-700"
                  />
                  <Label htmlFor="consent" className="text-white">개인정보 수집 동의</Label>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-accent text-white hover:bg-red-600 py-4 rounded-lg font-bold text-lg"
                disabled={applicationMutation.isPending}
              >
                {applicationMutation.isPending ? "제출 중..." : "신청서 제출"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
