"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import ProfileEditorModal from "./ProfileEditorModel";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";
import { ArrowLeft } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";


interface Props {
  open: boolean;
  onClose: () => void;
  user: any;
  targetRole: string | null;
  onSave?: (data: any) => void;
}

const careerGoals = [
  "Software Engineer",
  "Product Manager",
  "Data Scientist",
  "Designer",
  "Entrepreneur",
];

const areasOfInterest = [
  "AI/ML",
  "Web Development",
  "UI/UX",
  "Cloud",
  "Cybersecurity",
  "Product",
];

const languagesList = ["English", "Hindi", "Gujarati", "Marathi", "Tamil"];
const careerStages = ["Student", "Graduate", "Mid-level", "Senior"];

export default function EditProfileDrawer({
  open,
  onClose,
  user,
  targetRole,
  onSave,
}: Props) {
  const [fullName, setFullName] = useState("");
  const [email] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [careerGoal, setCareerGoal] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [language, setLanguage] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [careerStage, setCareerStage] = useState("");
  const [availability, setAvailability] = useState<string[]>([]);
  const [photoEditorOpen, setPhotoEditorOpen] = useState(false);
  const [photoEditorImage, setPhotoEditorImage] = useState("/default_pfp.png");
  const [isSaving, setIsSaving] = useState(false);
  const { setUser, makeAuthenticatedRequest, getCurrentUser } = useAuthenticatedUser();

  // Initialize state from user data when component opens or user changes
  useEffect(() => {
    if (open && user) {
      // Initialize full name
      const name = user?.firstName && user?.lastName 
        ? `${user.firstName} ${user.lastName}`.trim()
        : user?.name || user?.firstName || "";
      setFullName(name);
      
      // Initialize phone
      setPhone(user?.phone || user?.mobile_number || "");
      
      // Initialize career goal from targetRole prop or user data
      setCareerGoal(targetRole || user?.career_goal || "");
      
      // Initialize interests (if available in user data)
      setInterests(user?.interests || []);
      
      // Initialize languages (if available in user data)
      setSelectedLanguages(user?.languages || []);
      
      // Initialize career stage (if available in user data)
      setCareerStage(user?.career_stage || "");
      
      // Initialize profile picture
      setPhotoEditorImage(user?.profile_picture_url || "/default_pfp.png");
    }
  }, [open, user, targetRole]);

  function toggleAvailability(slot: string) {
    setAvailability((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  }

  function handleInterestToggle(area: string) {
    setInterests((prev) =>
      prev.includes(area)
        ? prev.filter((i) => i !== area)
        : prev.length < 3
          ? [...prev, area]
          : prev
    );
  }

  function handleLanguageSelect(val: string) {
    if (!val) return;
    if (!selectedLanguages.includes(val) && selectedLanguages.length < 3) {
      setSelectedLanguages((prev) => [...prev, val]);
    }
    // clear the select back to default
    setLanguage("");
  }

  function removeLanguage(lang: string) {
    setSelectedLanguages((prev) => prev.filter((l) => l !== lang));
  }

  // Helper function to convert blob URL to base64 data URL
  async function blobToBase64(blobUrl: string): Promise<string> {
    // If it's already a data URL, return it
    if (blobUrl.startsWith("data:")) {
      return blobUrl;
    }
    
    // If it's a default image path, return null
    if (blobUrl === "/default_pfp.png" || !blobUrl) {
      return "";
    }

    try {
      // Fetch the blob
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      
      // Convert to base64
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          resolve(base64String);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error converting blob to base64:", error);
      // If conversion fails, return empty string (will be treated as null)
      return "";
    }
  }

  async function handleSave() {
    if (isSaving) return;
    
    setIsSaving(true);
    try {
      // Split full name into first and last name
      const nameParts = fullName.trim().split(/\s+/);
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      // Convert profile image blob URL to base64 if needed
      let profileImageUrl: string | null = null;
      if (photoEditorImage && photoEditorImage !== "/default_pfp.png") {
        try {
          profileImageUrl = await Promise.race([
            blobToBase64(photoEditorImage),
            new Promise<string>((_, reject) => 
              setTimeout(() => reject(new Error("Image conversion timeout")), 10000)
            )
          ]);
          // If conversion failed, set to null
          if (!profileImageUrl || profileImageUrl === photoEditorImage) {
            profileImageUrl = null;
          }
        } catch (error) {
          console.error("Error converting image to base64:", error);
          // Continue without image if conversion fails
          profileImageUrl = null;
        }
      } else if (photoEditorImage === "/default_pfp.png") {
        // Explicitly set to null to clear profile picture
        profileImageUrl = null;
      }

      // Prepare user update data - only include fields that have values
      const userUpdateData: any = {};
      
      if (firstName) {
        userUpdateData.first_name = firstName;
      }
      
      if (lastName) {
        userUpdateData.last_name = lastName;
      }
      
      if (phone && phone.trim()) {
        userUpdateData.phone = phone.trim();
      } else if (phone === "") {
        // Allow clearing phone by sending null
        userUpdateData.phone = null;
      }
      
      // Always include profile_image_url if it was set (even if null to clear it)
      if (profileImageUrl !== undefined) {
        userUpdateData.profile_image_url = profileImageUrl;
      }

      // Prepare mentee profile update data - only include fields that have values
      // Note: careerGoal is used for "Target Role" in the UI
      const menteeProfileUpdateData: any = {};
      
      // Only include fields that have actual values (not empty strings)
      if (careerGoal && careerGoal.trim()) {
        menteeProfileUpdateData.target_role = careerGoal.trim();
      }
      
      if (selectedLanguages.length > 0) {
        menteeProfileUpdateData.preferred_language = selectedLanguages.join(", ");
      }
      
      if (careerStage && careerStage.trim()) {
        menteeProfileUpdateData.career_stage = careerStage.trim();
      }

      // Update user info (only if there's data to update)
      if (Object.keys(userUpdateData).length > 0) {
        const userResponse = await makeAuthenticatedRequest("/auth/me", {
          method: "PUT",
          body: JSON.stringify(userUpdateData),
        });

        if (!userResponse.ok) {
          const errorText = await userResponse.text();
          let errorMessage = "Failed to update user profile";
          try {
            const errorData = JSON.parse(errorText);
            errorMessage = errorData.detail || errorData.message || errorMessage;
          } catch {
            errorMessage = errorText || errorMessage;
          }
          throw new Error(errorMessage);
        }
      }

      // Update mentee profile (only if there's data to update)
      if (Object.keys(menteeProfileUpdateData).length > 0) {
        const menteeResponse = await makeAuthenticatedRequest("/mentee/profile", {
          method: "PUT",
          body: JSON.stringify(menteeProfileUpdateData),
        });

        if (!menteeResponse.ok) {
          const errorData = await menteeResponse.json().catch(() => ({ detail: "Failed to update mentee profile" }));
          throw new Error(errorData.detail || "Failed to update mentee profile");
        }
      }

      // Refresh user data
      await getCurrentUser();

      // Call onSave callback if provided
      onSave?.({
        fullName,
        email,
        phone,
        careerGoal,
        interests,
        language: selectedLanguages,
        careerStage,
        availability,
      });

      onClose();
    } catch (error) {
      console.error("Error saving profile:", error);
      alert(error instanceof Error ? error.message : "Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  if (!open) return null;

  return (
    <>
      {photoEditorOpen && (
        <ProfileEditorModal
          open={photoEditorOpen}
          onClose={() => setPhotoEditorOpen(false)}
          imageSrc={photoEditorImage}
          DefaultSvg={null}
          onDelete={() => {
            setPhotoEditorImage("/default_pfp.png");
            setUser(user ? { ...user, profile_picture_url: undefined } : user);
          }}
          onSave={(img) => {
            setPhotoEditorImage(img);
            setPhotoEditorOpen(false);
            // Update user context so all components get the new photo
            setUser(user ? { ...user, profile_picture_url: img } : user);
          }}
        />
      )}

      <div className="fixed inset-0 z-[2000] flex">
        <div className="fixed inset-0 bg-black bg-opacity-40" onClick={onClose} />

        {/* Drawer */}
        <div
          className="ml-auto h-full shadow-xl p-8 overflow-y-auto relative bg-[#F8F9FB]"
          style={{ width: "770px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 ">
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100 transition"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold">Edit Profile</h2>
          </div>
          <div className="py-5 text-[16px] font-[600] text-[#525252]">
            Update details to get better mentor matches
          </div>

          {/* Profile Photo + Name + Target Role */}
          <label
            className="block mb-4 pb-2 px-4"
            style={{
              fontFamily: "Mulish",
              fontWeight: 700,
              fontSize: "16px",
            }}
          >
            Profile Photo
          </label>

          <div className="flex gap-6 items-start mb-10">
            {/* Profile Photo Container */}
            <div className="relative" style={{ width: 152, height: 152 }}>
              {/* Circular Photo */}
              <div
                className="rounded-full overflow-hidden shadow-md"
                style={{
                  width: "152px",
                  height: "152px",
                  border: "3px solid white",
                  background: photoEditorImage && photoEditorImage !== "/default_pfp.png" ? "transparent" : "#e5e5e5",
                  boxShadow: "0px 4px 14px #9F9D9D40",
                }}
              >

                {photoEditorImage && photoEditorImage !== "/default_pfp.png" ? (
                  <Image
                    src={photoEditorImage}
                    alt="Profile"
                    width={152}
                    height={152}
                    className="object-cover rounded-full"
                  />
                ) : null}
              </div>

              {/* Edit Button — responsive on edge */}
              <button
                onClick={() => setPhotoEditorOpen(true)}
                className="absolute -bottom-2 -right-2"
                style={{
                  width: "45.829px",
                  height: "45.829px",
                  borderRadius: "999px",
                  background: "#0073CF",
                  border: "3.06px solid white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  boxShadow: "0px 4px 14px #9F9D9D40",
                }}
              >
                {/* Pencil Icon */}
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.8457 0.260909C12.0128 0.0938488 12.2394 0 12.4757 0C12.712 0 12.9386 0.0938488 13.1057 0.260909L16.6702 3.8254C16.8373 3.99251 16.9311 4.21913 16.9311 4.45542C16.9311 4.69172 16.8373 4.91834 16.6702 5.08545L5.08564 16.67C4.91856 16.8372 4.69193 16.9311 4.45561 16.9311H0.891123C0.654782 16.9311 0.428122 16.8373 0.261004 16.6701C0.0938858 16.503 0 16.2764 0 16.04V12.4755C5.04709e-05 12.2392 0.0939694 12.0126 0.261099 11.8455L9.17233 2.93428L11.8457 0.260909ZM9.80235 4.82435L1.78225 12.8444V15.1489H4.08669L12.1068 7.12879L9.80235 4.82435ZM13.3668 5.86874L14.7802 4.45542L12.4757 2.15098L11.0624 3.5643L13.3668 5.86874Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>

            {/* Name + Target Role (Vertical Stacked) */}
            <div className="flex flex-col gap-4 -mt-[47px] px-5" style={{ width: "100%" }}>
              {/* Name */}
              <div>
                <label
                  className="block mb-1 pb-2"
                  style={{
                    fontFamily: "Mulish",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  Full Name
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  style={{ fontFamily: "Mulish", fontWeight: 600 }}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Target Role */}
              <div>
                <label
                  className="block mb-1 pb-2"
                  style={{
                    fontFamily: "Mulish",
                    fontWeight: 700,
                    fontSize: "16px",
                  }}
                >
                  Target Role
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  style={{ fontFamily: "Mulish", fontWeight: 600 }}
                  value={careerGoal}
                  onChange={(e) => setCareerGoal(e.target.value)}
                  placeholder="e.g., Product Manager, Software Engineer, Data Scientist"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="mb-6 relative p space-y-2">
            <label
              className="block mb-1 pb-2"
              style={{ fontFamily: "Mulish", fontWeight: 700 }}
            >
              Email
            </label>
            <input
              disabled
              className="w-full px-3 py-2 rounded-md"
              style={{
                fontFamily: "Mulish",
                fontWeight: 600,
                background: "#F0F8FF",
                border: "1px solid #0073CF",
              }}
              value={email}
            />
            {/* Verified SVG (right corner) */}
            <div
              style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}
            >

            </div>
          </div>

          {/* Phone */}
          <div className="mb-6 space-y-2">
            <label
              className="block mb-1 pb-2"
              style={{ fontFamily: "Mulish", fontWeight: 700 }}
            >
              Phone Number
            </label>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              style={{ fontFamily: "Mulish", fontWeight: 600 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          {/* Areas of Interest */}
          <div className="mb-8 space-y-2">
            <label
              className="block "
              style={{ fontFamily: "Mulish", fontWeight: 700 }}
            >
              <span>Choose Areas of Interest (max 3)</span>
              <span style={{ marginLeft: 8 }} className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">
                {interests.length}/3 selected
              </span>
            </label>
            <div className="flex flex-wrap gap-2 mt-3">
              {areasOfInterest.map((area) => (
                <button
                  key={area}
                  className={`border rounded-full ${interests.includes(area)
                      ? "bg-[#0073CF] text-white border-[#0073CF]"
                      : "bg-white text-gray-700 border-gray-300"
                    }`}
                  style={{
                    width: "199px",
                    height: "40px",
                    borderRadius: "30px",
                    padding: "10px 20px 10px 20px",
                    fontFamily: "Mulish",
                    fontWeight: 600,
                  }}
                  onClick={() => handleInterestToggle(area)}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Primary Career Goal */}
          <div className="mb-8 space-y-2">
            <label
              className="block mb-2 pb-2"
              style={{ fontFamily: "Mulish", fontWeight: 700 }}
            >
              Select Primary Career Goal
            </label>

            {/* Added input before the tags */}
            <input
              placeholder="Type your goal or select one below"
              className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md"
              style={{ fontFamily: "Mulish", fontWeight: 600 }}
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
            />

            <div className="flex flex-wrap gap-2">
              {careerGoals.map((goal) => (
                <button
                  key={goal}
                  className={`border rounded-full ${careerGoal === goal
                      ? "bg-[#0073CF] text-white border-[#0073CF]"
                      : "bg-white text-gray-700 border-gray-300"
                    }`}
                  style={{
                    width: "199px",
                    height: "40px",
                    borderRadius: "30px",
                    padding: "10px 20px 10px 20px",
                    fontFamily: "Mulish",
                    fontWeight: 600,
                  }}
                  onClick={() => setCareerGoal(goal)}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
          {/* Languages + Career Stage */}
          <div className="flex gap-6 mb-8 ">
            {/* Languages */}
            <div className="w-1/2 space-y-2">
              <label
                className="block mb-1 pb-2"
                style={{ fontFamily: "Mulish", fontWeight: 700 }}
              >
                Languages You Speak
              </label>

              <Select
                onValueChange={(val) => handleLanguageSelect(val)}
              >
                <SelectTrigger
                  className="
        w-full px-3 py-2 rounded-md 
        border border-gray-300 
        bg-white
        text-gray-700
        font-[600] font-[Mulish]
        shadow-sm 
        hover:border-[#0073CF]
        focus:ring-2 focus:ring-[#0073CF]/40
      "
                >
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>

                <SelectContent className="font-[Mulish] font-[600] z-[3000] bg-white border shadow-lg rounded-md">

                  {languagesList.map((l) => (
                    <SelectItem
                      key={l}
                      value={l}
                      className="cursor-pointer hover:bg-blue-100 focus:bg-blue-100"
                    >
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Selected Pills */}
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedLanguages.map((lang) => (
                  <div
                    key={lang}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2 cursor-pointer"
                    onClick={() => removeLanguage(lang)}
                  >
                    {lang} ×
                  </div>
                ))}
              </div>

              <p className="text-sm mt-2 text-gray-500">If you want to change the preference, drag i</p>
            </div>


            {/* Career Stage */}
            <div className="w-1/2 space-y-2">
              <label
                className="block mb-1 pb-2"
                style={{ fontFamily: "Mulish", fontWeight: 700 }}
              >
                Current Career Stage
              </label>

              <Select
                onValueChange={setCareerStage}
                defaultValue={careerStage}
              >
                <SelectTrigger
                  className="
        w-full px-3 py-2 rounded-md 
        border border-gray-300 
        bg-white 
        text-gray-700
        font-[600] font-[Mulish]
        shadow-sm
        hover:border-[#0073CF]
        focus:ring-2 focus:ring-[#0073CF]/40
      "
                >
                  <SelectValue placeholder="Select Stage" />
                </SelectTrigger>

                <SelectContent className="font-[Mulish] font-[600] z-[3000] bg-white border shadow-lg rounded-md">

                  {careerStages.map((s) => (
                    <SelectItem
                      key={s}
                      value={s}
                      className="cursor-pointer hover:bg-blue-100 focus:bg-blue-100"
                    >
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

          </div>

          {/* Availability */}
          <div className="mb-10 space-y-2">
            <label
              className="block mb-2 pb-2"
              style={{ fontFamily: "Mulish", fontWeight: 700 }}
            >
              Availability Preference
            </label>

            <div className="flex gap-6">
              {["Morning", "Afternoon", "Evening"].map((slot) => (
                <label
                  key={slot}
                  className="flex items-center gap-2 cursor-pointer"
                  style={{ fontFamily: "Mulish", fontWeight: 600 }}
                >
                  <input
                    type="checkbox"
                    checked={availability.includes(slot)}
                    onChange={() => toggleAvailability(slot)}
                    className="w-5 h-5 text-blue-500"
                  />
                  {slot}
                </label>
              ))}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-between items-center mt-12">
            <button
              className="px-6 py-3 border border-gray-400 rounded-full"
              style={{
                fontFamily: "Mulish",
                fontWeight: 700,
              }}
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="px-6 py-3 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: "#0073CF",
                fontFamily: "Mulish",
                fontWeight: 700,
              }}
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
