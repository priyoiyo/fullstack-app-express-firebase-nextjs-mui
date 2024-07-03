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
import { setCookie } from "cookies-next";
import { login } from "@/apis/authApi";
import Notification from "@/components/Notification/Notification";

export default function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    text: "",
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userCredential: any = await login(email, password);
      if (userCredential) {
        const idToken = userCredential._tokenResponse.idToken;
        await setCookie("token", idToken);
        setNotification({
          isOpen: true,
          title: "Success",
          text: "Login successful",
        });
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 1000);
      } else {
        setNotification({
          isOpen: true,
          title: "Failed",
          text: "Login failed",
        });
      }
    } catch (error: any) {
      setNotification({
        isOpen: true,
        title: "Failed",
        text: error.message || "Login failed",
      });
    }
  };

  useEffect(() => {
    setIsDisabled(!(email && password));
  }, [email, password]);

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
              inputProps={{ maxLength: 30 }}
              id="form-email"
              label="Email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl color="secondary" fullWidth variant="outlined">
            <InputLabel htmlFor="form-password">Password</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 30, autoComplete: "new-password" }}
              id="form-password"
              label="Password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                    }}
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
            <span>{password.length} /30</span>
          </div>

          <Button
            sx={{ margin: "auto", marginTop: "10px", color: "white" }}
            color="secondary"
            variant="contained"
            disabled={isDisabled}
            onClick={onSubmit}
          >
            Login
          </Button>
        </CardContent>
      </Card>
      <Notification
        title={notification.title}
        text={notification.text}
        isOpen={notification.isOpen}
        onClose={handleClose}
      />
    </>
  );
}
