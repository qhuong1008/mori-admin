import * as type from "../../types";
export const authenticateAdminRequest = async () => {
  return fetch(`${type.BACKEND_URL_DEV}/api/admin`, {
    method: "GET",
    headers: {
      ...type.requestHeader,
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
