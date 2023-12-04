import CssBaseline from '@mui/material/CssBaseline';
import React, { useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ErrorIcon from '@mui/icons-material/Error';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { useNavigate, useParams } from 'react-router-dom'
import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../Middlewares/AuthContext';
const defaultTheme = createTheme();

export default function PaymentFail() {
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 3000)
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
                    <Avatar sx={{ m: 1, bgcolor: '#BB2525' }}>
                        <ErrorIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" sx={{ color: '#BB2525' }}>
                        Payment Fail
                    </Typography>
                    <Typography component="h1" variant="h5" sx={{ color: 'gray' }}>
                        Please wait moment we will redirect you to the home page
                    </Typography>
                    <Avatar sx={{ m: 2, bgcolor: '#BB2525', width: '50px', height: '50px' }}>
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