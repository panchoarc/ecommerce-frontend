import instance from "@/config/axios";

const createPaymentIntent = async (data) => {
  const paymentData = {
    amount: data,
  };
  try {
    const response = await instance.post(`/payments/create`, paymentData);
    return response.data.data;
  } catch (error) {
    console.error(error);
  }
};
const PaymentService = {
  createPaymentIntent,
};

export default PaymentService;
