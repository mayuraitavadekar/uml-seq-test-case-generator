import { API } from "./backend";

export const getJSON = (formdata) => {
  return fetch(`${API}/submit`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formdata,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log("error in hitting the route!"));
};
