import instance from "@/config/axios";

const createReview = async (data) => {
  try {
    const response = await instance.post(`/reviews`, data);

    return response.data;
  } catch (error) {
    console.error("Error", error);
  }
};

const ReviewService = {
  createReview,
};

export default ReviewService;
