import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Modal from "@mui/joy/Modal";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  ModalDialog,
} from "@mui/joy";
import { Warning } from "@mui/icons-material";
import axios from "axios";

export default function OrderCreationForm() {
  const [open, setOpen] = React.useState<boolean>(false);

  interface FormElements extends HTMLFormControlsCollection {
    date: HTMLInputElement;
    typeOfService: HTMLInputElement;
    place: HTMLInputElement;
    comments: HTMLInputElement;
  }
  interface OrderFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  interface IOrder {
    date: string;
    typeOfService?: string;
    place: string;
    comments: string;
  }

  async function retrieveLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Latitude:", position.coords.latitude);
          console.log("Longitude:", position.coords.longitude);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }

  async function handleSubmition() {
    try {
      let data = JSON.parse(
        window.localStorage.getItem("newOrderReq") ||
          "new order not updated at client side"
      );

      data.typeOfService = sessionStorage.getItem("typeOfService") as string;

      data.email = JSON.parse(
        window.localStorage.getItem("currentUser") ||
          "user details not updated at client side"
      ).email;

      await axios.post(`${process.env.REACT_APP_API_URL}/order`, data);
      alert(
        "Thank you for the order, We'll get in touch with you shorty, మీ రిక్వెస్ట్ ను స్వీకరిచినం, మా కస్టమర్ సపోర్ట్ మీకు కాల్ చేస్తాడు"
      );
      window.location.reload();

      window.localStorage.removeItem("newOrderReq");
      sessionStorage.removeItem("typeOfService");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  function setDataInBrowser(newOrderReq: IOrder) {
    window.localStorage.setItem("newOrderReq", JSON.stringify(newOrderReq));
    setOpen(true);
  }

  return (
    <Sheet
      sx={{
        display: "flex",
        flexFlow: "row wordwrap",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "95vh",
      }}
    >
      <form
        onSubmit={(event: React.FormEvent<OrderFormElement>) => {
          event.preventDefault();
          const formElements = event.currentTarget.elements;
          const data = {
            date: formElements.date.value,
            place: formElements.place.value,
            comments: formElements.comments.value,
          };

          setDataInBrowser(data);
        }}
      >
        <Grid container spacing={2} sx={{ flexGrow: 1, mt: "6vh" }}>
          <Grid>
            <FormControl required>
              {/* <DateTimePicker
                label="Select a date and time"
                value={date}
                onChange={(newValue) => setDate(newValue)}
              /> */}
              <FormLabel>Delivery Date/ డెలివరీ కావాల్సిన తేదీ</FormLabel>
              <Input name="date" type="date" />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl>
              <FormLabel>Place/ ప్రాంతం</FormLabel>
              <Input name="place" type="text" placeholder="place" />
            </FormControl>
          </Grid>
          <Grid>
            <FormControl>
              <FormLabel>Comments/ వ్యాఖ్యలు</FormLabel>
              <Input name="comments" type="text" placeholder="comments" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid sx={{ mt: 5 }}>
          <Sheet
            sx={{
              display: "flex",
              flexFlow: "row nowrap",
              justifyContent: "center",
              alignItems: "center",
              // minHeight: '40vh',
            }}
          >
            <Button
              variant="solid"
              color="primary"
              // startDecorator={<Add />}
              // onClick={() => {}}
              type="submit"
            >
              New Order Request/ సేవా అభ్యర్థనను పంపండి
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>
              <ModalDialog variant="outlined" role="alertdialog">
                <DialogTitle>
                  <Warning />
                  Confirmation
                </DialogTitle>
                <Divider />
                <DialogContent>
                  Are you sure you want to create request for the order ?
                </DialogContent>
                <DialogActions>
                  <Button
                    type="submit"
                    value="submit"
                    variant="solid"
                    color="danger"
                    onClick={() => {
                      setOpen(false);
                      handleSubmition();
                    }}
                  >
                    Continue
                  </Button>
                  <Button
                    variant="plain"
                    color="neutral"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </ModalDialog>
            </Modal>
          </Sheet>
        </Grid>
      </form>
    </Sheet>
  );
}
