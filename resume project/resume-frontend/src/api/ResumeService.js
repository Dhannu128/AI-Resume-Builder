import axios from "axios";

// Use environment variable for API base URL, fallback to production URL
export const baseURL = import.meta.env.VITE_API_BASE_URL || "https://resume-ai-backend-production.up.railway.app";

export const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Changed to false as your backend doesn't require credentials
  timeout: 60000,
});

// Request interceptor for logging
axiosInstance.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
axiosInstance.interceptors.response.use(
  (response) => {
    console.log(`Response received from: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.response?.data?.message || error.message
    });
    return Promise.reject(error);
  }
);

// Test backend connectivity
export const testBackendConnection = async () => {
  try {
    console.log("🔍 Testing backend connection...");
    console.log("🌐 Testing URL:", `${baseURL}/actuator/health`);

    const response = await axiosInstance.get("/actuator/health");
    console.log("✅ Backend is reachable:", response.status);
    return { success: true, status: response.status };
  } catch (error) {
    console.error("❌ Backend connection failed:", error.message);
    return { success: false, error: error.message };
  }
};

export const generateResume = async (description) => {
  try {
    if (!description?.trim()) {
      throw new Error("Please enter your professional details");
    }

    // Validate description length (backend expects 10-5000 characters)
    if (description.length < 10) {
      throw new Error("Description must be at least 10 characters long");
    }
    if (description.length > 5000) {
      throw new Error("Description must be less than 5000 characters");
    }

    console.log("🚀 Starting resume generation...");
    console.log("📝 Description length:", description.length);
    console.log("🌐 API URL:", baseURL);

    // Test connection first
    const connectionTest = await testBackendConnection();
    if (!connectionTest.success) {
      throw new Error(`Backend server is not reachable: ${connectionTest.error}`);
    }

    const response = await axiosInstance.post("/api/v1/resume", {
      userDescription: description,
    });

    console.log("✅ Response received:", response.status);
    console.log("📦 Response data structure:", Object.keys(response.data || {}));

    // Handle HTTP errors
    if (response.status >= 400) {
      throw new Error(response.data?.message || `Request failed with status ${response.status}`);
    }

    // Check for expected response structure
    if (!response.data) {
      throw new Error("No data received from API");
    }

    if (response.data.status !== 'success') {
      throw new Error(response.data.message || "API returned error status");
    }

    if (!response.data.data?.resume) {
      console.error("❌ Invalid response structure:", response.data);
      throw new Error("Missing resume data in API response");
    }

    console.log("✅ Resume data received successfully");
    return {
      success: true,
      data: transformAPIResponse(response.data.data.resume, description),
    };

  } catch (error) {
    console.error("❌ API Error Details:", {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      code: error.code,
      name: error.name,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        baseURL: error.config?.baseURL,
        timeout: error.config?.timeout
      }
    });

    let errorMessage = "Failed to generate resume";

    // Network-related errors
    if (error.code === 'NETWORK_ERROR' || error.message.includes('Network Error')) {
      errorMessage = "❌ Network connection failed. Please check your internet connection and ensure the backend server is running.";
    } else if (error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED')) {
      errorMessage = "❌ Cannot connect to server. Please ensure the backend is running and accessible.";
    } else if (error.code === 'ENOTFOUND' || error.message.includes('ENOTFOUND')) {
      errorMessage = "❌ Server not found. Please check the API URL configuration.";
    } else if (error.code === 'ETIMEDOUT' || error.message.includes('timeout')) {
      errorMessage = "⏱️ Request timed out. The server might be slow or unavailable.";
    }
    // HTTP status errors
    else if (error.response?.status === 429) {
      errorMessage = "⚠️ Too many requests. Please wait a moment and try again.";
    } else if (error.response?.status === 400) {
      errorMessage = error.response.data?.message || "❌ Invalid request. Please check your input.";
    } else if (error.response?.status >= 500) {
      errorMessage = "🔧 Server error. Please try again later.";
    } else if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return {
      success: false,
      error: errorMessage,
      data: null,
    };
  }
};

function transformAPIResponse(apiData, description) {
  const personalInfo = apiData.personalInformation || {};
  
  return {
    personalInformation: {
      fullName: personalInfo.fullName || extractName(description),
      email: personalInfo.email || "",
      phoneNumber: personalInfo.phoneNumber || "",
      location: personalInfo.location || "",
      jobTitle: extractJobTitle(description),
      linkedIn: personalInfo.linkedIn || "",
      gitHub: personalInfo.gitHub || "",
      portfolio: personalInfo.portfolio || "",
    },
    summary: apiData.summary || generateDefaultSummary(description),
    skills: apiData.skills || parseSkillsFromDescription(description),
    experience: apiData.experience || [],
    education: apiData.education || [],
    certifications: apiData.certifications || [],
    projects: apiData.projects || [],
    languages: apiData.languages || [],
    interests: apiData.interests || [],
  };
}

// Helper functions remain same as before
function extractName(desc) {
  const nameMatch = desc.match(/(?:my name is|myself|i am|name:)\s*([A-Za-z]+(?:\s+[A-Za-z]+){0,2})/i);
  return nameMatch ? nameMatch[1] : "";
}

function extractJobTitle(desc) {
  const titleMatch = desc.match(/(?:i am a|as a|role:|position:)\s*([\w\s]+?)(?:\s+at|\s+with|,|$)/i);
  return titleMatch ? titleMatch[1].trim() : "IT Professional";
}

function generateDefaultSummary(desc) {
  const jobTitle = extractJobTitle(desc);
  return `Experienced ${jobTitle} with a proven track record in...`;
}

function parseSkillsFromDescription(desc) {
  const skillKeywords = [
    "Java", "Spring Boot", "React", "Node.js", "JavaScript",
    "Python", "AWS", "Docker", "SQL", "Git", "Cybersecurity",
    "Full-stack", "AI", "Spring", "Android", "Backend"
  ];

  return skillKeywords
    .filter(skill => new RegExp(`\\b${skill}\\b`, "i").test(desc))
    .map(skill => ({ title: skill, level: "Proficient" }));
}