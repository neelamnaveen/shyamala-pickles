import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Add from '@mui/icons-material/Add';

import Sidebar from './components/Sidebar';
import ServiceTable from './components/ServiceTable';
import ServiceList from './components/ServiceList';
import Header from './components/Header';
import ServiceCreationForm from './components/ServiceCreationForm';
import { useNavigate } from 'react-router-dom';
import OrderCreationForm from './components/OrderCreationForm';
import ServicesDashboard from './components/ServicesDashboard';

export default function CreateOrder() {
  const [step, setStep] = React.useState<number>(0);
    const navigate = useNavigate()
    return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
        <Header />
        <Sidebar />
        <Box
          component="main"
          className="MainContent"
          sx={{
            px: { xs: 2, md: 6 },
            pt: {
              xs: 'calc(12px + var(--Header-height))',
              sm: 'calc(12px + var(--Header-height))',
              md: 3,
            },
            pb: { xs: 2, sm: 2, md: 3 },
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            minWidth: 0,
            height: '100dvh',
            gap: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Breadcrumbs
              size="sm"
              aria-label="breadcrumbs"
              separator={<ChevronRightRoundedIcon />} //fontSize="sm"
              sx={{ pl: 0 }}
            >
              <Link
                underline="none"
                color="neutral"
                href="#some-link"
                aria-label="Home"
              >
                <HomeRoundedIcon />
              </Link>
              <Link
                underline="hover"
                color="neutral"
                href="#some-link"
                fontSize={12}
                fontWeight={500}
                onClick={()=>{navigate("/orders")}}
              >
                Orders
              </Link>
              <Typography color="primary" fontWeight={500} fontSize={12}>
                Create New Order
              </Typography>
            </Breadcrumbs>
          </Box>

          {(step===0)&&<ServicesDashboard setStep={setStep} />}
          {(step===1)&&<OrderCreationForm/>}

          {/* <Box
            sx={{
              display: 'flex',
              mb: 1,
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: { xs: 'start', sm: 'center' },
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="h2" component="h1">
              Secure New Service
            </Typography>
            <Button
              color="primary"
              startDecorator={<Add />}
              size="sm"
            >
              Secure New Service in Blockchain
            </Button>
          </Box>
          <ServiceTable />
          <ServiceList /> */}
        </Box>
      </Box>
    </CssVarsProvider>
  );
}