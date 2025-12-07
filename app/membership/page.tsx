"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslations } from "@/lib/useTranslations";
import { supabase } from "@/lib/supabaseClient";

interface Member {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  position: string | null;
  registeredAt: string;
}

export default function MembershipPage() {
  const { locale } = useLanguage();
  const t = useTranslations(locale);
  const router = useRouter();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCompleteProfile, setShowCompleteProfile] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateMessage, setUpdateMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [profileData, setProfileData] = useState({
    phone: "",
    company: "",
    position: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Supabase Auth session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !session) {
          router.push("/auth");
          return;
        }

        const { user } = session;
        const email = user.email;

        if (!email) {
          router.push("/auth");
          return;
        }

        // Get member info from community_members table
        const { data: memberData, error: memberError } = await supabase
          .from("community_members")
          .select("id, name, email, phone, company, position, registered_at")
          .eq("email", email.toLowerCase().trim())
          .limit(1)
          .single();

        if (memberError || !memberData) {
          // If member not found in community_members, use Supabase Auth user data
          setMember({
            id: 0,
            name: user.user_metadata?.full_name || user.user_metadata?.name || email.split("@")[0],
            email: email,
            phone: null,
            company: null,
            position: null,
            registeredAt: user.created_at || new Date().toISOString(),
          });
        } else {
          const memberInfo = {
            id: memberData.id,
            name: memberData.name,
            email: memberData.email,
            phone: memberData.phone,
            company: memberData.company,
            position: memberData.position,
            registeredAt: memberData.registered_at,
          };
          setMember(memberInfo);

          // Check if profile needs completion (missing company or position)
          if (!memberData.company || !memberData.position) {
            setShowCompleteProfile(true);
            setProfileData({
              phone: memberData.phone || "",
              company: memberData.company || "",
              position: memberData.position || "",
            });
          }
        }

        setLoading(false);
      } catch (err) {
        console.error("Auth check error:", err);
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);

  // Check if profile needs completion after member is loaded
  useEffect(() => {
    if (member && (!member.company || !member.position)) {
      setShowCompleteProfile(true);
      setProfileData({
        phone: member.phone || "",
        company: member.company || "",
        position: member.position || "",
      });
    }
  }, [member]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    setUpdateMessage(null);

    // Validate required fields
    if (!profileData.company || !profileData.company.trim()) {
      setUpdateMessage({ type: "error", text: t.auth.companyRequired || "Company is required" });
      setUpdating(false);
      return;
    }

    if (!profileData.position || !profileData.position.trim()) {
      setUpdateMessage({ type: "error", text: t.auth.positionRequired || "Position is required" });
      setUpdating(false);
      return;
    }

    try {
      const response = await fetch("/api/members/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone: profileData.phone || null,
          company: profileData.company.trim(),
          position: profileData.position.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setUpdateMessage({ type: "error", text: data.error || t.membership.updateError });
        setUpdating(false);
        return;
      }

      // Update local member state
      if (member) {
        setMember({
          ...member,
          phone: profileData.phone || null,
          company: profileData.company || null,
          position: profileData.position || null,
        });
      }

      setUpdateMessage({ type: "success", text: t.membership.updateSuccess });
      setUpdating(false);

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowCompleteProfile(false);
        setUpdateMessage(null);
      }, 2000);
    } catch (error) {
      console.error("Update profile error:", error);
      setUpdateMessage({ type: "error", text: t.membership.updateError });
      setUpdating(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (err) {
      console.error("Logout error:", err);
      router.push("/");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-slate-600">{t.auth.loading}</div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !member) {
    return (
      <main className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-600">{error || t.auth.notAuthenticated}</div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Complete Profile Modal */}
      {showCompleteProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-slate-900">{t.membership.completeProfile}</h2>
            </div>
            
            <p className="text-sm text-slate-600 mb-6">{t.membership.completeProfileDescription}</p>
            
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label htmlFor="profile-phone" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.phone} <span className="text-slate-500 text-xs font-normal">({t.auth.optional})</span>
                </label>
                <input
                  type="tel"
                  id="profile-phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                  placeholder={t.auth.phonePlaceholder}
                />
              </div>

              <div>
                <label htmlFor="profile-company" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.company} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="profile-company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                  placeholder={t.auth.companyPlaceholder}
                  required
                />
              </div>

              <div>
                <label htmlFor="profile-position" className="block text-sm font-semibold text-slate-900 mb-2">
                  {t.auth.position} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="profile-position"
                  value={profileData.position}
                  onChange={(e) => setProfileData({ ...profileData, position: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border-2 border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 text-slate-900 placeholder:text-slate-400"
                  placeholder={t.auth.positionPlaceholder}
                  required
                />
              </div>

              {updateMessage && (
                <div className={`p-4 rounded-md text-sm ${
                  updateMessage.type === 'success' 
                    ? 'bg-green-50 border border-green-200 text-green-700'
                    : 'bg-red-50 border border-red-200 text-red-700'
                }`}>
                  {updateMessage.text}
                </div>
              )}

              <button
                type="submit"
                disabled={updating || !profileData.company?.trim() || !profileData.position?.trim()}
                className="w-full px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? t.membership.updating : t.membership.save}
              </button>
            </form>
          </div>
        </div>
      )}

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-slate-900">
                {t.membership.title}
              </h1>
              <p className="text-slate-600">
                {t.membership.welcome}, {member.name}!
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors text-sm"
            >
              {t.auth.logout}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">
                {t.membership.profileInfo}
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600">{t.membership.name}</p>
                  <p className="text-slate-900 font-medium">{member.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">{t.membership.email}</p>
                  <p className="text-slate-900 font-medium">{member.email}</p>
                </div>
                {member.phone && (
                  <div>
                    <p className="text-sm text-slate-600">{t.membership.phone}</p>
                    <p className="text-slate-900 font-medium">{member.phone}</p>
                  </div>
                )}
                {member.company && (
                  <div>
                    <p className="text-sm text-slate-600">{t.membership.company}</p>
                    <p className="text-slate-900 font-medium">{member.company}</p>
                  </div>
                )}
                {member.position && (
                  <div>
                    <p className="text-sm text-slate-600">{t.membership.position}</p>
                    <p className="text-slate-900 font-medium">{member.position}</p>
                  </div>
                )}
                <div>
                  <p className="text-sm text-slate-600">{t.membership.memberSince}</p>
                  <p className="text-slate-900 font-medium">
                    {new Date(member.registeredAt).toLocaleDateString(locale === "zh" ? "zh-CN" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-slate-900">
                {t.membership.quickLinks}
              </h2>
              <div className="space-y-3">
                <a
                  href="https://discord.gg/d5dTjjVD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors text-center"
                >
                  {t.membership.joinDiscord}
                </a>
                <a
                  href="https://luma.com/NextHardware"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 transition-colors text-center"
                >
                  {t.membership.viewEvents}
                </a>
                <a
                  href="/#contact"
                  className="block px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-md hover:border-slate-400 transition-colors text-center"
                >
                  {t.membership.contactUs}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-900">
              {t.membership.communityResources}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-md border border-slate-200">
                <h3 className="font-semibold mb-2 text-slate-900">{t.membership.events}</h3>
                <p className="text-sm text-slate-600">{t.membership.eventsDescription}</p>
              </div>
              <div className="p-4 bg-white rounded-md border border-slate-200">
                <h3 className="font-semibold mb-2 text-slate-900">{t.membership.networking}</h3>
                <p className="text-sm text-slate-600">{t.membership.networkingDescription}</p>
              </div>
              <div className="p-4 bg-white rounded-md border border-slate-200">
                <h3 className="font-semibold mb-2 text-slate-900">{t.membership.projects}</h3>
                <p className="text-sm text-slate-600">{t.membership.projectsDescription}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

