"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

interface ToolkitActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    loadingText?: string;
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

/**
 * Shared action button used across all Career Toolkit pages
 * Provides consistent styling with 3D shadow effect
 * 
 * @example
 * <ToolkitActionButton
 *   onClick={handleGenerate}
 *   disabled={isLoading}
 *   isLoading={isLoading}
 *   loadingText="Generating..."
 *   icon={<Wand2 className="w-5 h-5" />}
 * >
 *   Generate Template
 * </ToolkitActionButton>
 */
export default function ToolkitActionButton({
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Loading...",
    icon,
    children,
    className,
}: ToolkitActionButtonProps) {
    return (
        <Button
            onClick={onClick}
            disabled={disabled || isLoading}
            className={cn(
                // Base styles
                "flex items-center gap-2",
                // Colors
                "bg-[#0070E0] hover:bg-[#003C6C]",
                // 3D shadow effect
                "shadow-[0_7px_0_#0C5CAC] hover:shadow-[0_7px_0_#002952]",
                // Typography
                "text-white text-base font-semibold",
                // Shape
                "rounded-full px-8 py-3",
                // Animation
                "transition-all",
                // Disabled state
                "disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
        >
            {isLoading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {loadingText}
                </>
            ) : (
                <>
                    {icon}
                    {children}
                </>
            )}
        </Button>
    );
}
