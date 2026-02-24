import { axiosInstance } from '../api/ResumeService';

export const generateInterviewQuestions = async (resumeContent, jobDescription) => {
  try {
    if (!resumeContent?.trim()) {
      throw new Error("Resume content is required");
    }

    const response = await axiosInstance.post("/api/v1/resume/prepare-interview", {
      resumeContent,
      jobDescription: jobDescription || ""
    });

    // Handle HTTP errors
    if (response.status >= 400) {
      throw new Error(response.data?.message || `Request failed with status ${response.status}`);
    }

    // Check for expected response structure based on backend API
    if (!response.data || response.data.status !== 'success') {
      throw new Error(response.data?.message || "Invalid response from API");
    }

    // Return the interview data from the response
    return response.data.data.interview;
  } catch (error) {
    console.error("Interview API Error:", error);
    let errorMessage = error.message;

    if (error.response) {
      errorMessage = error.response.data?.message ||
                    error.response.data?.error ||
                    `Request failed with status ${error.response.status}`;
    }

    throw new Error(errorMessage);
  }
};