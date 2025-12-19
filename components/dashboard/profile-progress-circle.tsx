import { useState, useEffect } from "react";

import ProfilePhotoModal from "../ProfilePhotoModel";
import ProfileEditorModal from "../ProfileEditorModel";
import DeletePhotoModal from "../DeletePhotoModal";
import { useCallback } from "react";
import { useAuthenticatedUser } from "@/context/AuthenticatedUserProvider";

export const ProfileProgressCircle = ({ size = 120, progress = 30, imageSrc }) => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [localImage, setLocalImage] = useState(imageSrc);
  const { makeAuthenticatedRequest, getCurrentUser } = useAuthenticatedUser();

  // Sync localImage with imageSrc prop when it changes
  useEffect(() => {
    setLocalImage(imageSrc);
  }, [imageSrc]);

  // Save profile picture to backend
  const saveProfilePicture = useCallback(async (imageUrl: string | undefined) => {
    try {
      let profileImageUrl: string | null = null;
      
      if (imageUrl && imageUrl !== "/default_pfp.png") {
        // Helper function to convert blob URL to base64 data URL
        const blobToBase64 = async (blobUrl: string): Promise<string> => {
          // If it's already a data URL, return it
          if (blobUrl.startsWith("data:")) {
            return blobUrl;
          }
          
          // If it's a default image path, return empty string
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
            return "";
          }
        };

        profileImageUrl = await blobToBase64(imageUrl);
        if (!profileImageUrl) {
          profileImageUrl = null;
        }
      }

      const response = await makeAuthenticatedRequest("/auth/me", {
        method: "PUT",
        body: JSON.stringify({
          profile_image_url: profileImageUrl,
        }),
      });

      if (response.ok) {
        // Refresh user data to get updated profile picture
        await getCurrentUser();
      } else {
        console.error("Failed to save profile picture");
      }
    } catch (error) {
      console.error("Error saving profile picture:", error);
    }
  }, [makeAuthenticatedRequest, getCurrentUser]);

  // When edit is saved, update local image, save to backend, and close editor
  const handleSave = useCallback(async (img: string) => {
    setLocalImage(img);
    setEditOpen(false);
    // Save to backend
    await saveProfilePicture(img);
  }, [saveProfilePicture]);

  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const innerSize = size - strokeWidth * 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

 const DefaultSvg = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M27.0667 5.83398H12.9C10.6898 5.83398 8.57023 6.71196 7.00743 8.27476C5.44462 9.83756 4.56665 11.9572 4.56665 14.1673V25.834C4.56665 26.9283 4.7822 28.012 5.20099 29.023C5.61978 30.0341 6.23361 30.9527 7.00743 31.7265C8.57023 33.2893 10.6898 34.1673 12.9 34.1673H27.0667C28.161 34.1673 29.2446 33.9518 30.2557 33.533C31.2667 33.1142 32.1854 32.5004 32.9592 31.7265C33.733 30.9527 34.3469 30.0341 34.7656 29.023C35.1844 28.012 35.4 26.9283 35.4 25.834V14.1673C35.4 13.073 35.1844 11.9893 34.7656 10.9783C34.3469 9.96724 33.733 9.04858 32.9592 8.27476C32.1854 7.50094 31.2667 6.88711 30.2557 6.46832C29.2446 6.04953 28.161 5.83398 27.0667 5.83398Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.9834 28.3346L9.56673 23.0013C10.1665 22.4057 10.9536 22.0355 11.7949 21.9535C12.6361 21.8715 13.4799 22.0827 14.1834 22.5513C14.8869 23.0199 15.7306 23.2311 16.5719 23.1491C17.4132 23.0671 18.2003 22.697 18.8001 22.1013L22.6834 18.218C23.7992 17.0984 25.2766 16.4116 26.8518 16.2804C28.427 16.1491 29.9977 16.5818 31.2834 17.5013L35.4334 20.718M13.3167 16.9513C13.6801 16.9513 14.0398 16.8797 14.3755 16.7407C14.7112 16.6017 15.0162 16.3979 15.2731 16.141C15.53 15.8841 15.7338 15.5791 15.8728 15.2434C16.0118 14.9077 16.0834 14.548 16.0834 14.1846C16.0834 13.8213 16.0118 13.4615 15.8728 13.1259C15.7338 12.7902 15.53 12.4852 15.2731 12.2283C15.0162 11.9714 14.7112 11.7676 14.3755 11.6286C14.0398 11.4895 13.6801 11.418 13.3167 11.418C12.583 11.418 11.8793 11.7095 11.3604 12.2283C10.8416 12.7472 10.5501 13.4509 10.5501 14.1846C10.5501 14.9184 10.8416 15.6221 11.3604 16.141C11.8793 16.6598 12.583 16.9513 13.3167 16.9513Z"
      stroke="black"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);


  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Progress ring */}
      <svg width={size} height={size} className="absolute rotate-[-90deg]">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#3b82f6"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Center image or icon */}
      <div
        className="absolute inset-0 flex items-center justify-center rounded-full overflow-hidden"
        style={{ width: innerSize, height: innerSize, margin: strokeWidth, background: localImage && localImage !== "/default_pfp.png" ? "transparent" : "#D9D9D9" }}
      >
        {localImage && localImage !== "/default_pfp.png" ? (
          <img
            src={localImage}
            alt="Profile"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          DefaultSvg
        )}
      </div>

      {/* + button */}
      <button
        onClick={() => setOpen(true)}
        className="absolute bottom-0 right-0 bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-lg hover:bg-blue-600"
      >
        +
      </button>

      {/* Modal (portal) */}
      <ProfilePhotoModal
        open={open}
        onClose={() => setOpen(false)}
        imageSrc={localImage}
        DefaultSvg={DefaultSvg}
        onUpload={(imageUrl) => {
          setLocalImage(imageUrl);
          // After upload, automatically open editor
          setOpen(false);
          setEditOpen(true);
        }}
        onEdit={() => {
          setOpen(false);
          setEditOpen(true);
        }}
        onDelete={async () => {
          // Open delete confirmation modal instead of deleting directly
          setOpen(false);
          setDeleteOpen(true);
        }}
        onSave={(imageUrl) => {
          setLocalImage(imageUrl);
        }}
      />

      <ProfileEditorModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        imageSrc={localImage}
        DefaultSvg={DefaultSvg}
        onSave={handleSave}
        onDelete={async () => {
          // Open delete confirmation modal instead of deleting directly
          setEditOpen(false);
          setDeleteOpen(true);
        }}
      />

      <DeletePhotoModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        imageSrc={localImage}
        DefaultSvg={DefaultSvg}
        onDelete={async () => {
          setLocalImage(undefined);
          // Save deletion to backend
          await saveProfilePicture(undefined);
        }}
      />
    </div>
  );
};
