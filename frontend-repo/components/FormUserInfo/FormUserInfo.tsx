"use client";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateUserData } from "@/store/slices/userInfoSlice";
import {
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import Notification from "@/components/Notification/Notification";

interface UserInfoProps {
  location: string;
  phoneNumber: string;
  photoProfileUrl: string;
}

const FormUserInfo = ({
  location,
  phoneNumber,
  photoProfileUrl,
}: UserInfoProps) => {
  const [locationValue, setLocationValue] = useState(location);
  const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);
  const [photoProfileUrlValue, setPhotoProfileUrlValue] =
    useState(photoProfileUrl);
  const dispatch = useAppDispatch();
  const { loading, error, success } = useAppSelector(
    (state) => state.userInfoReducer
  );
  const [notification, setNotification] = useState({
    isOpen: false,
    title: "",
    text: "",
  });

  const handleClose = () => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  };

  const handleUpdateUserInfo = () => {
    dispatch(
      updateUserData({
        location: locationValue,
        phoneNumber: phoneNumberValue,
        photoProfileUrl: photoProfileUrlValue,
      })
    );
  };

  useEffect(() => {
    setLocationValue(location);
    setPhoneNumberValue(phoneNumber);
    setPhotoProfileUrlValue(photoProfileUrl);
  }, [location, phoneNumber, photoProfileUrl]);

  useEffect(() => {
    if (loading) {
      setNotification({
        isOpen: true,
        title: "Updating...",
        text: "Please wait...",
      });
    } else if (error) {
      setNotification({
        isOpen: true,
        title: "Failed",
        text: error,
      });
    } else if (success) {
      setNotification({
        isOpen: true,
        title: "Success",
        text: "Update success",
      });
    }
  }, [loading, error, success]);

  useEffect(() => {
    if (notification.isOpen) {
      const timer = setTimeout(() => {
        setNotification((prev) => ({ ...prev, isOpen: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification.isOpen]);

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
            <InputLabel htmlFor="form-location">Location</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 30 }}
              id="form-location"
              label="Location"
              type="text"
              value={locationValue}
              onChange={(e) => setLocationValue(e.target.value)}
            />
          </FormControl>
          <FormControl
            color="secondary"
            fullWidth
            variant="outlined"
            style={{ margin: "1rem 0" }}
          >
            <InputLabel htmlFor="form-phone">Phone Number</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 30 }}
              id="form-phone"
              label="Phone Number"
              type="text"
              value={phoneNumberValue}
              onChange={(e) => setPhoneNumberValue(e.target.value)}
            />
          </FormControl>
          <FormControl
            color="secondary"
            fullWidth
            variant="outlined"
            style={{ margin: "1rem 0" }}
          >
            <InputLabel htmlFor="form-photo">Photo Profile URL</InputLabel>
            <OutlinedInput
              inputProps={{ maxLength: 30 }}
              id="form-photo"
              label="Photo Profile URL"
              type="text"
              value={photoProfileUrlValue}
              onChange={(e) => setPhotoProfileUrlValue(e.target.value)}
            />
          </FormControl>

          <Button
            sx={{ margin: "auto", marginTop: "10px", color: "white" }}
            color="secondary"
            variant="contained"
            onClick={handleUpdateUserInfo}
          >
            UPDATE
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
};

export default FormUserInfo;
