export const successResponseHandler = (
  statusCode?: number,
  message?: string,
  result?: any
) => {
  const response = {
    status: statusCode ?? 200,
    message: message ?? "successfull",
    data: result ?? [],
  };
  return response;
};
