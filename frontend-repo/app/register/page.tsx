import FormRegister from "@/components/FormRegister/FormRegister";
import Typography from "@mui/material/Typography/Typography";

export default function Register() {
  return (
    <div>
      <Typography
        sx={{ textAlign: "center" }}
        gutterBottom
        variant="h4"
        component="h4"
      >
        Register
      </Typography>
      <FormRegister />
    </div>
  );
}
