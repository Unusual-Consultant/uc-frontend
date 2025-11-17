"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Star, Send } from "lucide-react";
import "@fontsource/mulish/700.css";

interface ReviewFormProps {
  mentorName: string;
  sessionType: string;
  onSubmit: (review: ReviewData) => void;
  onCancel: () => void;
}

interface ReviewData {
  rating: number;
  review: string;
  tags: string[];
  sessionSpecific: {
    punctuality: number;
    communication: number;
    expertise: number;
    helpfulness: number;
  };
}

const skillTags = [
  "Clear Explanations",
  "Timely Delivery",
  "Great Communication",
  "Industry Expertise",
  "Practical Advice",
  "Patient Teaching",
  "Well Prepared",
  "Motivational",
  "Problem Solver",
  "Good Listener",
];

export function ReviewForm({
  mentorName,
  sessionType,
  onSubmit,
  onCancel,
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sessionRatings, setSessionRatings] = useState({
    punctuality: 0,
    communication: 0,
    expertise: 0,
    helpfulness: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initials = mentorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSessionRating = (
    category: keyof typeof sessionRatings,
    value: number
  ) => {
    setSessionRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async () => {
    if (rating === 0) return;
    setIsSubmitting(true);
    const reviewData: ReviewData = {
      rating,
      review,
      tags: selectedTags,
      sessionSpecific: sessionRatings,
    };
    try {
      await onSubmit(reviewData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValid = rating > 0 && review.trim().length >= 10;

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#F8F9FB] border border-[#C7C7C7] font-[Mulish] p-6">
      {/* Header */}
      <CardHeader className="text-center">
        <CardTitle className="text-[22px] font-[700] text-black">
          Rate Your Session
        </CardTitle>
        <p className="text-[16px] text-gray-600 mt-1">
          {sessionType} with <span className="font-[600]">{mentorName}</span>
        </p>

        {/* Avatar + Document Circles */}
        <div className="flex justify-center items-center mt-4 relative">
  {/* Mentor Initials Circle (slightly overlapping the document one) */}
  <div className="w-12 h-12 rounded-full bg-[#8556BC] flex items-center justify-center text-white font-[700] text-[16px] z-10 -mr-3">
    {initials}
  </div>

  {/* Document Icon Circle */}
  <div className="w-12 h-12 rounded-full bg-[#DDEDFD] flex items-center justify-center">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    stroke="#0073CF"
    strokeWidth="1.8"
    fill="none"
    viewBox="0 0 24 24"
    width="22"
    height="22"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
</div>


        </div>
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {/* Overall Rating */}
        <div>
          <label className="block font-[700] text-[18px] text-black mb-2">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1 justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="p-1"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  className={`h-8 w-8 transition-colors ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 px-6 text-black font-[600] text-[16px]">
              {rating > 0 &&
                (rating === 1
                  ? "Poor"
                  : rating === 2
                  ? "Fair"
                  : rating === 3
                  ? "Good"
                  : rating === 4
                  ? "Very Good"
                  : "Excellent")}
            </span>
          </div>
        </div>

        {/* Session-Specific Ratings */}
        <div>
          <label className="block font-[700] text-[18px] font-bold mb-3">Rate Specific Aspects</label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(sessionRatings).map(([category, value]) => (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className=" capitalize font-[600] text-[16px] font-semibold">{category}</span>
                  <span className="font-[600] text-[16px] font-semibold text-black">{value}/5</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleSessionRating(category as keyof typeof sessionRatings, star)}
                    >
                      <Star className={`h-4 w-4 ${star <= value ? "fill-[#0073CF] text-[#0073CF]" : "text-[#0073CF]"}`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skill Tags */}
        <div>
  <label className="block text-[18px] font-[700] mb-2">
    What did they do well? (Select all that apply)
  </label>

  <div className="flex flex-wrap gap-3">
    {skillTags.map((tag) => (
      <Badge
        key={tag}
        variant={selectedTags.includes(tag) ? "default" : "outline"}
        className={`cursor-pointer transition-colors border border-[#C7C7C7] rounded-full 
          font-[600] text-[12px] px-[10px] py-[5px]
          ${
            selectedTags.includes(tag)
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        onClick={() => handleTagToggle(tag)}
      >
        {tag}
      </Badge>
    ))}
  </div>
</div>


        {/* Written Review */}
        <div>
        <label className="block text-[18px] mb-2 text-black font-[Mulish] font-[700]">
            Written Review  (Minimum 10 characters)
          </label>
          <Textarea
            placeholder="Share your experience with this mentor. What did you learn? How did they help you? Be specific and constructive..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
            className="resize-none"
          />
          <div className="text-right text-[16px] text-[#6B7280] mt-1">{review.length}/500 characters</div>
        </div>

        {/* Guidelines */}
        <div className="bg-[#DDEDFD] p-4 rounded-lg">
          <h4 className="font-medium text-[#0073CF] text-[15px] mb-2 font-[700]">Review Guidelines</h4>
          <ul className="text-sm text-[#0073CF] text-[14px] space-y-3">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Focus on the mentor's skills and session quality</li>
            <li>• Avoid personal attacks or inappropriate language</li>
            <li>• Your review helps other mentees make informed decisions</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
  {/* Cancel Button */}
  <Button
    variant="outline"
    onClick={onCancel}
    disabled={isSubmitting}
    className="rounded-full bg-white text-black border border-black px-6 py-2 font-semibold w-40"
  >
    Cancel
  </Button>

  {/* Submit Button */}
  <Button
    onClick={handleSubmit}
    disabled={!isValid || isSubmitting}
    className="rounded-full bg-[#0073CF] hover:bg-[#003C6C] text-white border border-black px-6 py-2 font-semibold w-40 flex items-center justify-center"
  >
    {isSubmitting ? (
      "Submitting..."
    ) : (
      <>
        {/* Paper Plane Icon (filled, pointing right) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          className="mr-2 rotate-[0deg]"
        >
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
        </svg>
        Submit Review
      </>
    )}
  </Button>
</div>

      </CardContent>
    </Card>
  )
}
