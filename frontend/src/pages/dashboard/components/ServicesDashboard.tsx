import ServiceCard from "./ServiceCard";
import * as React from "react";
import { Grid } from "@mui/joy";
import axios from "axios";

interface IService {
  _id: string;
  typeOfService: string;
  image: string;
  description: string;
}

let service = {
  _id: "Loading",
  typeOfService: "Loading",
  image: "Loading",
  description: "Loading",
};

export default function ServicesDashboard({setStep}: any) {
  const [loading, setLoading] = React.useState(true);
  const [services, setServices] = React.useState<IService[]>([service]);

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_URL}/service`
        );
        setServices(response);
      } catch (error: any) {
        console.error(error.message);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <Grid container spacing={2} sx={{ flexGrow: 1, alignSelf: "center", justifyContent: "center" }}>
      <>
        {services.map((serv) => {
          return (
            <Grid key={serv._id}>
              <ServiceCard service={serv} setStep={setStep} />
            </Grid>
          );
        })}
      </>
    </Grid>
  );
}
