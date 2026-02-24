export const handleServiceError = (error, context) => {
  console.error(`${context} Error:`, error);
  
  let userMessage = "An unexpected error occurred. Please try again later.";
  
  if (error.response) {
    // Server responded with an error status (4xx, 5xx)
    const { status, data } = error.response;
    
    if (status === 400 && data.error) {
      userMessage = data.error;
    } else if (status === 401) {
      userMessage = "Session expired. Please log in again.";
    } else if (status === 403) {
      userMessage = "You don't have permission to perform this action.";
    } else if (status === 404) {
      userMessage = "Resource not found.";
    } else if (status >= 500) {
      userMessage = "Server error. Please try again later.";
    }
  } else if (error.request) {
    // Request was made but no response received
    userMessage = "Network error. Please check your connection.";
  } else {
    // Something happened in setting up the request
    userMessage = error.message || userMessage;
  }
  
  return userMessage;
};

export const logError = (error, context) => {
  console.error(`[${context}]`, error);
  
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...(error.response && {
      response: {
        status: error.response.status,
        data: error.response.data
      }
    })
  };
  
  // In a real app, you would send this to an error tracking service
  // sendToErrorTrackingService(errorInfo, context);
  
  return errorInfo;
};