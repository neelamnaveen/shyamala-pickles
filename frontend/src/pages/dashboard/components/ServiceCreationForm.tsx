import * as React from "react";
import Sheet from "@mui/joy/Sheet";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Modal from "@mui/joy/Modal";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  ModalDialog,
} from "@mui/joy";
import { Add, DeleteForever, Warning } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ServiceCreationForm() {
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);
  const [image, setImage] = React.useState<String | Uint8Array | null>(null);

  interface FormElements extends HTMLFormControlsCollection {
    typeOfService: HTMLInputElement;
    image: HTMLInputElement;
    description: HTMLInputElement;
  }
  interface ServiceFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

  interface IService {
    typeOfService: string;
    image: typeof image;
    description: string;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files![0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
      };
      reader.readAsDataURL(file);
      
    }
  };

  async function handleSubmition() {
    // alert("service request sumbitted" + JSON.stringify(data));
    try {
      let data =
        window.localStorage.getItem("newService") ||
        "new service not updated at client side";

      await axios.post(
        `${process.env.REACT_APP_API_URL}/service`,
        JSON.parse(data)
      );
      alert("New service has been added to service list");
      navigate("/services");

      window.localStorage.removeItem("newService");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }

  function setDataInBrowser(newService: IService) {
    window.localStorage.setItem("newService", JSON.stringify(newService));
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
        onSubmit={(event: React.FormEvent<ServiceFormElement>) => {
          event.preventDefault();
          const formElements = event.currentTarget.elements;
          const data = {
            typeOfService: formElements.typeOfService.value,
            image: image,
            description: formElements.description.value,
          };
          //   alert(JSON.stringify(data, null, 2));
          // handleSubmition(data)

          setDataInBrowser(data);
        }}
      >
        <Sheet
          sx={{
            //   width: 300,
            mx: "auto",
            my: 4,
            py: 3,
            px: 2,
            display: "flex",
            // flexDirection: 'row',
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
          }}
          variant="outlined"
          className="serviceForm"
        >
          <FormControl required>
            <FormLabel>Type Of Service</FormLabel>
            <Input name="typeOfService" type="text" />
          </FormControl>
          <FormControl required>
            <FormLabel>Image</FormLabel>
            <Input
              name="image"
              type="file"
              placeholder="image"
              onChange={handleFileChange}
            />
          </FormControl>
          <FormControl required>
            <FormLabel>Description</FormLabel>
            <Input name="description" type="text" placeholder="description" />
          </FormControl>
        </Sheet>
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
            startDecorator={<Add />}
            // onClick={() => {}}
            type="submit"
          >
            Add New Service
          </Button>
          <Modal open={open} onClose={() => setOpen(false)}>
            <ModalDialog variant="outlined" role="alertdialog">
              <DialogTitle>
                <Warning />
                Confirmation
              </DialogTitle>
              <Divider />
              <DialogContent>
                Are you sure you want to submit new service to service list ?
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
      </form>
    </Sheet>
  );
}
