import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
} from "@material-ui/core";
import { FiHeart, FiBookmark } from "react-icons/fi";
import sendMsg from "../rest-api/sendMsg";
import { FaSpinner } from "react-icons/fa";
import { useSnackbar } from "notistack";


export default function ProfileContactBtn(props) {
  const { senderId, recipientMemberId } = props;
  const [open, setOpen] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMsg(value);
  };

  const handleSubmit = async (e) => {
    setSending(true);

    const memberId = parseInt(recipientMemberId);
    const myMsg = msg;
    sendMsg(myMsg, senderId, recipientMemberId)
      .then((response) => {
        if (response.ok === true) {
          // Submitted successfully!
          handleClose();
          enqueueSnackbar("Your message has been successfully sent!", { variant: "success" });
          setSending(false);
        }
        return response.json();
      })
      .then((object) => {
        // Comment submission failed.
        // Output `object.message` to see the error message.
        // enqueueSnackbar(object.message, { variant: 'error' });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>

        Contact this member
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contact</DialogTitle>
        <DialogContent>
          <DialogContentText>Some text here...</DialogContentText>
          <TextareaAutosize
            aria-label="message"
            rowsMin={3}
            placeholder="Your message"
            name="msg"
            onChange={handleChange}
            disabled={sending}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" disabled={sending}
>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={sending}
>
            {sending && (
              <FaSpinner
                icon="spinner"
                className="spinner"
                style={{ marginRight: 10 }}
              />
            )}
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
