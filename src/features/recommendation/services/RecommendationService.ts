import instance from "@/config/axios";

const getPopularRecommendations = async () => {
  try {
    const response = await instance.get(`/recommendations`);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};

const getSimilarProducts = async (productId: number) => {
  try {
    const response = await instance.get(
      `/recommendations/${productId}/similar`
    );
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
const RecommendationService = {
  getPopularRecommendations,
  getSimilarProducts,
};

export default RecommendationService;
