export const token_endpoint = "auth/login";
export const token_key = "access-token";

export const FindAccessToken = (response) => {
  console.log(response);
  const AccessToken = response?.access_token[0]?.token;
  return AccessToken;
};
