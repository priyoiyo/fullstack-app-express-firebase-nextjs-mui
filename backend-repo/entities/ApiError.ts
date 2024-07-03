interface ErrorResponse {
    status: "error";
    message: string;
    data?: any;
  }
  
  export const createErrorResponse = (message: string, data?: any): ErrorResponse => {
    return {
      status: "error",
      message,
      data,
    };
  };