export const handler = async (event: any = {}): Promise<any> => {
  // Log the event argument for debugging and for use in local development.
  const response = JSON.stringify(event, undefined, 2);
  console.log(response);

  return response;
}
