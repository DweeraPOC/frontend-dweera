import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../Middlewares/AuthContext';
const defaultTheme = createTheme();

export default function PaymentSuccess() {
    const navigate = useNavigate()
    const { token } = useParams();
    const auth = useAuth();
    useEffect(() => {
        (async () => {
            try {
                await axios({
                    method: "POST",
                    url: process.env.REACT_APP_MAIN_URL + "/bookings/create-booking",
                    data: {
                        token : token
                    },
                    headers: {
                        "x-access-token": auth?.user.token
                    }
                })
                    .then((res) => {
                        if (res.status == 201) {
                            setTimeout(() => {
                                navigate('/manage-my-bookings')
                            }, 3000)
                        }
                    })
                    .catch((err) => {
                        alert("An error has occurred, please try again later.")
                    })
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        })();
    }, [])

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" >
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#65D01E' }}>
                        <DoneOutlineIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" sx={{ color: '#65D01E' }}>
                        Payment Seccess
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ color: 'gray' }}>
                        Please wait moment we will redirect you to the confirmation page
                    </Typography>
                    <Avatar sx={{ m: 2, bgcolor: '#65D01E', width: '50px', height: '50px' }}>
                        {/*<AutorenewIcon />*/}
                        <CircularProgress sx={{
                            color: "white",
                            padding: 1
                        }} />
                    </Avatar>

                </Box>
            </Container>
        </ThemeProvider>
    );
}