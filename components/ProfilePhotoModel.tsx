"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
  DefaultSvg: React.ReactNode;
  onEdit?: () => void; // To open ProfileEditorModel
  onUpload?: (imageUrl: string) => void; // Callback when image is uploaded
  onDelete?: () => void; // Callback when image is deleted
  onSave?: (imageUrl: string) => void; // Callback when image is saved (from editor)
}

/* ---------------- SVG ICONS (clean + sharper + proper sizing) ---------------- */

export const SvgCamera = (
  <svg
    viewBox="0 0 23 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M13.3857 2.23926V4.01074H8.13379L8.08789 4.06152L6.23242 6.09375H1.92676V18.9062H18.9062V9.53125H20.6768V18.75C20.6768 19.2812 20.4899 19.7321 20.1113 20.1113C19.7329 20.4905 19.2818 20.6774 18.75 20.6768H2.08301C1.55196 20.6767 1.10112 20.4898 0.722656 20.1113C0.344284 19.7329 0.156938 19.2818 0.15625 18.75V6.25C0.15625 5.71893 0.343495 5.2682 0.722656 4.88965C1.05468 4.55819 1.44166 4.37346 1.88867 4.33203L2.08398 4.32324H5.43262L5.47949 4.27246L7.36035 2.23926H13.3857ZM10.416 7.96875C11.6787 7.9701 12.7462 8.41027 13.627 9.29102C14.5076 10.1717 14.9475 11.2382 14.9482 12.5C14.9489 13.7617 14.509 14.8286 13.627 15.71C12.7449 16.5914 11.678 17.0312 10.417 17.0312H10.416C9.15815 17.0339 8.09129 16.5942 7.20703 15.71C6.32294 14.8257 5.88373 13.7586 5.88574 12.5C5.88782 11.241 6.32773 10.1737 7.20801 9.29004C8.0878 8.4071 9.15404 7.96752 10.416 7.96875ZM10.417 9.73926C9.6475 9.73926 8.99059 10.0075 8.45703 10.541C7.92369 11.0745 7.65625 11.7307 7.65625 12.5C7.65625 13.2693 7.92369 13.9255 8.45703 14.459C8.99059 14.9925 9.6475 15.2607 10.417 15.2607C11.1863 15.2607 11.8425 14.9925 12.376 14.459C12.9094 13.9255 13.1768 13.2694 13.1768 12.5C13.1768 11.7306 12.9094 11.0745 12.376 10.541C11.8425 10.0075 11.1863 9.73933 10.417 9.73926ZM20.6768 0.15625V2.23926H22.7607V4.01074H20.6768V6.09375H18.9062V4.01074H16.8232V2.23926H18.9062V0.15625H20.6768Z"
      fill="black"
      stroke="white"
      strokeWidth="0.3125"
    />
  </svg>
);


const SvgEdit = (
  <svg
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M16.333 0.25C16.5761 0.25 16.8095 0.346706 16.9814 0.518555L21.6484 5.18457C21.8203 5.35645 21.916 5.58997 21.916 5.83301C21.916 6.07605 21.8202 6.30955 21.6484 6.48145L6.48145 21.6475C6.30958 21.8194 6.0761 21.916 5.83301 21.916H1.16699C0.923876 21.916 0.690463 21.8194 0.518555 21.6475C0.346831 21.4756 0.250066 21.2429 0.25 21V16.333L0.254883 16.2422C0.275837 16.0325 0.368218 15.8349 0.518555 15.6846L12.1855 4.01855L15.6855 0.518555C15.8574 0.346824 16.0901 0.250086 16.333 0.25ZM2.08301 16.7129V20.083H5.4541L16.2041 9.33301L16.0273 9.15625L13.0098 6.13965L12.833 5.96289L2.08301 16.7129ZM14.1299 4.66602L14.3066 4.84277L17.3232 7.86035L17.5 8.03711L19.7041 5.83301L19.5273 5.65625L16.5098 2.63965L16.333 2.46289L14.1299 4.66602Z"
      fill="black"
      stroke="white"
      strokeWidth="0.5"
    />
  </svg>
);

const SvgDelete = (
   <svg
    viewBox="0 0 27 27"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-6 h-6"
  >
    <path
      d="M7.6973 21.5527H19.3028V6.57227H7.6973V21.5527ZM11.25 9.17773C11.5232 9.17847 11.7446 9.26966 11.9258 9.4502C12.1065 9.63042 12.1973 9.85122 12.1973 10.125V18C12.1979 18.2729 12.1079 18.4947 11.9268 18.6758C11.7457 18.8568 11.5239 18.9473 11.25 18.9473L11.1494 18.9434C10.922 18.924 10.7326 18.8352 10.5742 18.6768C10.3932 18.4957 10.3028 18.2739 10.3028 18V10.125C10.3028 9.85283 10.3937 9.63133 10.5752 9.44922C10.7563 9.26764 10.9775 9.17709 11.25 9.17773ZM15.75 9.17773C16.0232 9.17847 16.2446 9.26966 16.4258 9.4502C16.6065 9.63042 16.6973 9.85122 16.6973 10.125V18C16.6979 18.2729 16.6079 18.4947 16.4268 18.6758C16.2457 18.8568 16.0239 18.9473 15.75 18.9473L15.6494 18.9434C15.422 18.924 15.2326 18.8352 15.0742 18.6768C14.8932 18.4957 14.8028 18.2739 14.8028 18V10.125C14.8028 9.85283 14.8937 9.63133 15.0752 9.44922C15.2563 9.26764 15.4775 9.17709 15.75 9.17773ZM5.80276 6.57227H5.62503C5.35125 6.57226 5.13045 6.4815 4.95023 6.30078C4.76969 6.11962 4.6785 5.89818 4.67776 5.625C4.67712 5.35242 4.76767 5.13128 4.94925 4.9502C5.13136 4.76871 5.35286 4.67774 5.62503 4.67773H10.3028V4.5C10.3028 4.22622 10.3935 4.00542 10.5742 3.8252C10.7554 3.64466 10.9768 3.55347 11.25 3.55273H15.75C16.0239 3.55273 16.2457 3.64316 16.4268 3.82422C16.6079 4.0053 16.6979 4.22709 16.6973 4.5V4.67773H21.375C21.6489 4.67773 21.8707 4.76816 22.0518 4.94922C22.2329 5.1303 22.3229 5.35209 22.3223 5.625C22.3216 5.89818 22.2306 6.11976 22.0498 6.30176C21.8698 6.48309 21.6494 6.57352 21.376 6.57227L21.1973 6.57129V21.375C21.1973 21.9463 20.9961 22.4309 20.5889 22.8389C20.1818 23.2467 19.697 23.448 19.125 23.4473H7.87503C7.30372 23.4473 6.81931 23.246 6.41214 22.8389C6.00506 22.4318 5.80351 21.9471 5.80276 21.375V6.57227Z"
      fill="black"
      stroke="white"
      strokeWidth="0.355"
    />
  </svg>
);

/* ---------------- COMPONENT ---------------- */

export default function ProfilePhotoModal({
  open,
  onClose,
  imageSrc,
  DefaultSvg,
  onEdit,
  onUpload,
  onDelete,
  onSave,
}: Props) {
  const [mounted, setMounted] = useState(false);
  const [localImage, setLocalImage] = useState<string | undefined>(imageSrc);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    setLocalImage(imageSrc);
  }, [imageSrc]);

  if (!mounted || !open) return null;

  // Upload handler
  function handleUpload() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result;
        if (typeof result === "string") {
          const imageUrl = result;
          setLocalImage(imageUrl);
          if (onUpload) {
            onUpload(imageUrl);
          }
        }
      };
      reader.onerror = () => {
        alert("Error reading file");
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // Delete handler
  function handleDelete() {
    setLocalImage(undefined);
    if (onDelete) {
      onDelete();
    }
  }

  // Handle edit - pass current image to editor
  function handleEdit() {
    if (onEdit && localImage) {
      onEdit();
    }
  }

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-[999]"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[1000]">
        <div
          className="bg-white shadow-xl rounded-xl relative"
          style={{ width: 797.5, height: 446 }}
        >
          {/* Header */}
          <div
            className="w-full h-12 bg-[#0073CF] flex justify-between items-center px-4 text-white rounded-t-xl"
            style={{
              fontFamily: "Mulish",
              fontWeight: 600,
              fontSize: 15,
              lineHeight: "140%",
            }}
          >
            <span>Profile Photo</span>
            <button onClick={onClose} className="text-xl font-bold">
              ×
            </button>
          </div>

          {/* Image preview */}
          <div className="absolute" style={{ top: 114, left: 292 }}>
            <div
              style={{
                width: 214,
                height: 214,
                borderRadius: 200,
                overflow: "hidden",
              }}
              className="bg-gray-200 flex items-center justify-center"
            >
              {localImage ? (
                <Image
                  src={localImage}
                  alt="Preview"
                  width={214}
                  height={214}
                  className="object-cover"
                />
              ) : (
                <div className="w-20 h-20 flex items-center justify-center">
                  {DefaultSvg}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div
            className="absolute bottom-0 w-full px-6 py-4 flex justify-between items-center"
            style={{
              borderTop: "1px solid #C7C7C7",
              fontFamily: "Mulish",
              fontWeight: 600,
              fontSize: 15,
            }}
          >
            {/* Left buttons */}
            <div className="flex gap-4">
              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleEdit}
                disabled={!localImage}
              >
                {SvgEdit}
                Edit Photo
              </button>

              <button
                className="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-200 transition bg-transparent"
                onClick={handleUpload}
              >
                {SvgCamera}
                Upload Photo
              </button>
            </div>

            {/* Delete button (transparent until hover) */}
            <button
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-transparent hover:bg-red-100 text-black transition"
              onClick={handleDelete}
            >
              {SvgDelete}
              Delete Photo
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
}
