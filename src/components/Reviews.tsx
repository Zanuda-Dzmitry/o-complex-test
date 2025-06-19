"use client";

import { useGetReviewsQuery } from "@/store/apiSlice";
import DOMPurify from "dompurify";

export function Reviews() {
  const { data: reviews, isLoading, isError } = useGetReviewsQuery();

  if (isLoading) return <div className="text-center py-8">Загрузка...</div>;
  if (isError)
    return (
      <div className="text-red-500 text-center py-8">Error loading reviews</div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="p-4 rounded-lg bg-[#D9D9D9] shadow-sm"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(review.text) }}
        />
      ))}
    </div>
  );
}
