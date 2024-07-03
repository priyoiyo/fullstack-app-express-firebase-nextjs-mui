import FormUserInfo from "@/components/FormUserInfo/FormUserInfo";
import Typography from "@mui/material/Typography/Typography";
import { cookies } from "next/headers";

const getData = async () => {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    const response = await fetch("http://localhost:8080/fetch-user-data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(token, "token");
    if (response.ok) {
      return await response.json();
    }
  } catch (error: any) {
    console.error("Failed to get user info", error);
  }
};

const Dashboard = async () => {
  const userInfo = await getData();

  return (
    <div>
      <Typography
        sx={{ textAlign: "center" }}
        gutterBottom
        variant="h4"
        component="h4"
      >
        DASHBOARD
      </Typography>
      <FormUserInfo
        photoProfileUrl={userInfo?.data?.photoProfileUrl ?? ""}
        location={userInfo?.data?.location ?? ""}
        phoneNumber={userInfo?.data?.phoneNumber ?? ""}
      />
      {/* Render other user info as needed */}
    </div>
  );
};

export default Dashboard;
