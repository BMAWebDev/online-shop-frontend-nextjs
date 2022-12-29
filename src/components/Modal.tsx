// Types
import { ReactElement } from "react";

interface IProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  handler: Function;
  modalHandlerValue?: any;
  text?: string;
}

// Modules
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Modal({
  showModal,
  setShowModal,
  handler,
  modalHandlerValue,
  text,
}: IProps): ReactElement {
  return (
    <Dialog
      open={showModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>

      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text || "Are you sure you want to continue with this action?"}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={(e) => setShowModal(false)}>Cancel</Button>

        <Button onClick={(e) => handler(modalHandlerValue)} autoFocus>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
