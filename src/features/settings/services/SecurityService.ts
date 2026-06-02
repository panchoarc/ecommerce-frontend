import instance from "@/config/axios";

const getSecurityStatus = async () => {
  try {
    const response = await instance.get("/security/status");
    return response.data.data;
  } catch (error) {
    console.error("Error getting security status:", error);
    throw error;
  }
};

const startOtpSetup = async () => {
  try {
    const response = await instance.post("/security/start-otp-setup");
    return response.data.data;
  } catch (error) {
    console.error("Error starting OTP setup:", error);
    throw error;
  }
};

const disableOtp = async () => {
  try {
    const response = await instance.delete("/security/otp");
    return response.data.data;
  } catch (error) {
    console.error("Error disabling OTP:", error);
    throw error;
  }
};

const SecurityService = {
  getSecurityStatus,
  startOtpSetup,
  disableOtp,
};

export default SecurityService;