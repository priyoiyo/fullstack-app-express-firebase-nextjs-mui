interface SuccessResponse<T> {
    status: "success";
    message: string;
    data: T;
  }
  
  export const createSuccessResponse = <T>(message: string, data: T): SuccessResponse<T> => {
    return {
      status: "success",
      message,
      data,
    };
  };