import ReviewService from "@/features/review/services/ReviewService";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import StarRating from "../components/StarRating";

import {
  CreateReviewInput,
  createReviewSchema,
} from "../validations/ReviewSchema";

import { Input } from "@/shared/ui/input";
import TextEditorTest from "@/shared/ui/texteditortest";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateReviewInput>({
    resolver: zodResolver(createReviewSchema),
    defaultValues: {
      comment: "",
      title: "",
      rating: 0,
      product_id: Number(id),
    },
  });

  const handleSubmit = async (data: CreateReviewInput) => {
    console.log("LOG DATA", data);
    try {
      setIsSubmitting(true);
      await ReviewService.createReview(data);

      toast.success("¡Gracias por tu reseña!");
      navigate(`/my-orders`);
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar la reseña.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onError = (error) => {
    console.error("Error", error);
  };

  return (
    <div className="w-fit mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Dejar una reseña</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit, onError)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Titulo" {...field} />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.title?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comentario</FormLabel>
                    <FormControl>
                      <TextEditorTest
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage>
                      {form.formState.errors.comment?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Calificación</FormLabel>
                    <FormControl>
                      <StarRating
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="product_id"
                render={({ field }) => <input type="hidden" {...field} />}
              />

              <Button disabled={isSubmitting} type="submit">
                {isSubmitting ? "Enviando..." : "Enviar reseña"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateReview;
