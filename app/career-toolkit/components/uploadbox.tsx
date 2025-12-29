import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
interface UploadBoxProps {
  dragActive: any;
  openFileDialog: any;
  handleDrag: any;
  handleFileChange: any;
  handleDrop?: any;
  labelText?: string; // <-- make optional
  infoText?: { formats: string; maxSize: string };
}

export default function UploadBox({
  dragActive,
  openFileDialog,
  handleDrag,
  handleFileChange,
  handleDrop,
  labelText,
  infoText = { formats: "PDF, DOCX, TXT", maxSize: "5MB" },
}: UploadBoxProps) {
  return (
    <div className="flex flex-col items-start w-full space-y-1">
      {labelText && (
        <p className="text-sm text-gray-700 font-medium self-start ml-1">
          {labelText}
        </p>
      )}

      {/* Upload Area */}
      <div
        onClick={openFileDialog}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop || handleDrag}
        className={cn(
          "flex flex-col items-center justify-center border-2 border-dashed rounded-xl bg-white p-5 text-center space-y-2 cursor-pointer transition w-full h-[11.25rem]",
          dragActive ? "border-blue-400 bg-blue-50" : "border-gray-400"
        )}
      >
        <UploadCloud className="w-8 h-8 text-blue-500" />
        <p className="text-sm text-gray-700 text-center leading-tight">
          Choose your file, or drag & drop it here
        </p>
        <Button
          onClick={openFileDialog}
          type="button"
          className="rounded-full bg-[#F8F9FB] hover:bg-[#EDEDED] text-black border border-[#C7C7C7] px-4 py-1 text-xs shadow-sm transition h-[1.5625rem]"
        >
          Browse Files
        </Button>
        <Input
          type="file"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {/* Info Text */}
      <div className="text-[0.8125rem] font-medium break-words overflow-hidden">
        <p>
          Supported Formats:{" "}
          <span className="text-[#0073CF]">{infoText.formats}</span>
        </p>
        <p>
          Maximum File Size: <span className="text-[#0073CF]">{infoText.maxSize}</span>
        </p>
      </div>
    </div>
  );
}
