import FormLogin from "@/components/FormLogin/FormLogin";
import Typography from "@mui/material/Typography/Typography";

export default function Login() {
  return (
    <div>
      <Typography
        sx={{ textAlign: "center" }}
        gutterBottom
        variant="h4"
        component="h4"
      >
        LOGIN
      </Typography>
      <FormLogin />
    </div>
  );
}
