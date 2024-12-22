import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Typography from "@mui/joy/Typography";
import BookmarkAdd from "@mui/icons-material/BookmarkAddOutlined";

interface IService {
  _id: string;
  typeOfService: string;
  image: string;
  description: string;
}

interface ServiceCardProps { service: IService; setStep: any}

export default function ServiceCard({ service, setStep }: ServiceCardProps) {
  function gotoRequestFormHandler(typeOfService:string): React.MouseEventHandler<HTMLDivElement> | undefined {
    console.log("ఈ సేవా అభ్యర్థనను పంపండి")
    sessionStorage.setItem('typeOfService', typeOfService);
    setStep(1)
    return
  }

  return (
    <Card sx={{ width: 320 }} onClick={()=> gotoRequestFormHandler(service.typeOfService)}>
      <div>
        <Typography level="title-lg">{service.typeOfService}</Typography>
        <br></br>
        <Typography level="body-sm">{service.description}</Typography>
        <IconButton
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: "absolute", top: "0.875rem", right: "0.5rem" }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={service.image}
          srcSet={service.image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      {/* <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography sx={{ fontSize: "lg", fontWeight: "lg" }}>
            ₹2,500
          </Typography>
        </div>
        <Button
          variant="solid"
          size="md"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
        >
          ఎంచుకోండి/ Select
        </Button>
      </CardContent> */}
    </Card>
  );
}
