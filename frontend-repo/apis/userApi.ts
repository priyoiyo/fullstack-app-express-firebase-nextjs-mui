import { getCookie } from "cookies-next";
export const getUser = async () => {
    const response  = await fetch("http://localhost:8080/fetch-user-data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to get user info");
        }
}

