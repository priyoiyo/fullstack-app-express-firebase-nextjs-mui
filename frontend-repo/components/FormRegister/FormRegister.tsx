"use client";
import React, { useEffect, useState } from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Button, Card, CardContent } from "@mui/material";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import useChecker from "./useChecker";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { register } from "@/apis/authApi";

export default function FormRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const router = useRouter();

  const {
    password,
    handleChangePassword1,
    handleChangePassword2,
    passwordChecker,
    passwordMatch,
    isPasswordMatch,
  } = useChecker({
    password1: "",
    password2: "",
  });

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleChangeEmail = (event: any) => {
    setEmail(event.target.value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await register(email, password.password1);
      if (response) {
        router.push("/login");
      } else {
        console.log("Register failed");
      }
    } catch (error: any) {
      console.log("Register failed", error);
    }
  };
  useEffect(() => {
    if (isPasswordMatch && email && password.password1 && password.password2) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [password.password1, password.password2, isPasswordMatch, email]);

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: "450px", margin: "auto" }}>
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl
            color="secondary"
            fullWidth
            variant="outlined"
            style={{ margin: "1rem 0" }}
          >
            <InputLabel htmlFor="form-email">Email</InputLabel>
            <OutlinedInput
              inputProps={{
                maxLength: 30,
              }}
              id="form-email"
              label="Email"
              type="email"
              onChange={handleChangeEmail}
            />
          </FormControl>
          <FormControl color="secondary" fullWidth variant="outlined">
            <InputLabel htmlFor="form-password">Password</InputLabel>
            <OutlinedInput
              inputProps={{
                maxLength: 30,
                autoComplete: "new-password",
                form: {
                  autoComplete: "off",
                },
              }}
              id="form-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={handleChangePassword1}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <div
            style={{
              fontSize: "0.7rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span>{password.password1.length} /30</span>
          </div>

          <FormControl color="secondary" fullWidth variant="outlined">
            <InputLabel htmlFor="form-password2">Confirm Password</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 30 }}
              id="form-password2"
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              onChange={handleChangePassword2}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <Box
            style={{
              fontSize: "0.7rem",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span>{password.password2.length} /30</span>
          </Box>
          {password.password1 && (
            <Box sx={{ width: "100%", fontSize: "0.8rem" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Password Strength</span>
                {passwordChecker.emoticon}
              </Box>
              <LinearProgress
                variant="determinate"
                color={passwordChecker.color}
                value={passwordChecker.barValue}
              />
              <span>{passwordChecker.helper}</span>
              <br />
              <span>{passwordMatch}</span>
            </Box>
          )}

          <Button
            sx={{ margin: "auto", marginTop: "10px", color: "white" }}
            color="secondary"
            variant="contained"
            disabled={isDisabled}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
