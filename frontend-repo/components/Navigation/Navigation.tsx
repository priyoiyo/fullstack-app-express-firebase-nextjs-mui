"use client";
import Card from "@mui/material/Card/Card";
import Link from "next/link";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie, setCookie } from "cookies-next";
import { logout } from "@/apis/authApi";
import Notification from "@/components/Notification/Notification";

const Navigation = () => {
  const pathname = usePathname();
  const token = getCookie("token");
  const router = useRouter();
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    text: "",
  });
  const handleClose = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };
  const onLogout = async () => {
    try {
      await logout();
      setCookie("token", "");
      setNotification({
        isOpen: true,
        title: "Success",
        text: "Logout successful",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setNotification({
        isOpen: true,
        title: "Failed",
        text: "Logout failed",
      });

      console.error("Failed to logout", error);
    }
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxWidth: "450px",
          margin: "1rem auto",
          justifyContent: "space-between",
          display: "flex",
          padding: "1rem",
        }}
      >
        {pathname !== "/register" && <Link href="/register">Register</Link>}
        {pathname !== "/login" && <Link href="/login">Login</Link>}
        {pathname !== "/dashboard" && <Link href="/dashboard">Dashboard</Link>}
        {token && (
          <span style={{ cursor: "pointer" }} onClick={onLogout}>
            Logout
          </span>
        )}
      </Card>
      <Notification
        title={notification.title}
        text={notification.text}
        isOpen={notification.isOpen}
        onClose={handleClose}
      />
    </div>
  );
};

export default Navigation;
