import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Star } from "lucide-react";
import React from "react";

const formatDate = (dateStr) => {
  const [datePart, timePart] = dateStr.split(" ");
  const [day, month, year] = datePart.split("/");
  const [hour, minute] = timePart.split(":");

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    Number(hour),
    Number(minute)
  );

  return date.toLocaleString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ProductReviews = React.memo(({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No hay reseñas aún.</p>;
  }

  return (
    <div className="space-y-6 my-12">
      <h2 className="text-3xl md:text-5xl font-bold scroll-mt-24">Reseñas</h2>
      {reviews.map((review) => (
        <Card
          key={review.id}
          className="bg-gray-1000 border-none rounded-none  hover:shadow-md "
        >
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center justify-between text-base font-medium">
              <div className="flex items-center gap-3">
                <Avatar className="w-9 h-9">
                  <AvatarImage
                    src={review.user.avatarUrl}
                    alt={review.user.fullName}
                  />
                  <AvatarFallback>{review.user.fullName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-semibold">{review.user.fullName}</span>
                  {review.createdAt && (
                    <span className="text-xs text-muted-foreground">
                      {formatDate(review.createdAt)}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? " text-yellow-500 fill-yellow-500"
                        : "text-muted"
                    }
                  />
                ))}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="py-4">
            <p dangerouslySetInnerHTML={{ __html: review.comment }} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
});

export default ProductReviews;
