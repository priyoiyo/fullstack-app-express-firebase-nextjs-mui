import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export interface NotificationProps {
  text: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Notification({
  text,
  title,
  isOpen,
  onClose,
}: NotificationProps) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {title || "Notification"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {text}
          </Typography>
          <Button onClick={onClose}>OK</Button>
        </Box>
      </Modal>
    </div>
  );
}
