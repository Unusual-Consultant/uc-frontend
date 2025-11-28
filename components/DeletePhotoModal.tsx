"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  imageSrc?: string;
  DefaultSvg: React.ReactNode;
  onDelete: () => void;
}

export default function DeletePhotoModal({
  open,
  onClose,
  imageSrc,
  DefaultSvg,
  onDelete,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted || !open) return null;

  const handleDelete = () => {
    onDelete();
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div
        className="bg-white rounded-lg shadow-lg relative flex flex-col"
        style={{
          width: 796,
          height: 445,
          position: 'absolute',
          top: '50%',
          left: '50%',
          opacity: 1,
          transform: 'translate(-50%, -50%)',
          maxWidth: '100vw',
        }}
      >
        {/* Blue header bar */}
        <div
          className="w-full h-12 bg-[#0073CF] flex justify-between items-center px-4 text-white rounded-t-lg"
          style={{
            fontFamily: "Mulish",
            fontWeight: 600,
            fontSize: 15,
            lineHeight: "140%",
          }}
        >
          <span>Delete Photo</span>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:opacity-80 transition"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* White area with centered photo */}
        <div className="flex-1 flex items-center justify-center bg-white p-6">
          {imageSrc && imageSrc !== "/default_pfp.png" ? (
            <div
              style={{
                width: 214,
                height: 214,
                borderRadius: "50%",
                overflow: "hidden",
              }}
              className="bg-gray-200 flex items-center justify-center"
            >
              <Image
                src={imageSrc}
                alt="Profile Photo"
                width={214}
                height={214}
                className="object-cover"
              />
            </div>
          ) : (
            <div
              style={{
                width: 214,
                height: 214,
                borderRadius: "50%",
                overflow: "hidden",
              }}
              className="bg-gray-200 flex items-center justify-center"
            >
              <div className="w-20 h-20 flex items-center justify-center">
                {DefaultSvg}
              </div>
            </div>
          )}
        </div>

        {/* Footer with Cancel and Delete buttons */}
        <div
          className="w-full px-6 py-4 flex justify-center gap-20  "
          style={{
            fontFamily: "Mulish",
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          <button
            onClick={onClose}
            className="px-8 py-2 border-2 border-gray-300 bg-transparent text-gray-700 rounded-full font-semibold text-base hover:bg-gray-50 transition w-[146px]"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-8 py-2 bg-[#E55573] text-white rounded-full font-semibold text-base shadow-md transition hover:bg-[#d14462] w-[146px]"
          >
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

