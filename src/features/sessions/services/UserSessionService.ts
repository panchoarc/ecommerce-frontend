import instance from "@/config/axios";

const getUserSessionsActive = async () => {
  try {
    const response = await instance.get("/security/sessions");
    return response.data.data;
  } catch (error) {
    console.error("Error getting user sessions:", error);
    throw error;
  }
};

const UserSessionService = {
  getUserSessionsActive,

};

export default UserSessionService;