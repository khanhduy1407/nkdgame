import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const theme = createTheme({
    components: {
        MuiCardMedia: {
            styleOverrides: {
                root: {
                    width: '140px',
                    height: '140px',
                    margin: '0 auto'
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    margin: '0 auto'
                }
            }
        }
    },
});

export default function CardItem({ item }) {
    return (
        <ThemeProvider theme={theme}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    image={item.img}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    {/*<Typography variant="body2" color="text.secondary"></Typography>*/}
                </CardContent>
                <CardActions>
                    <Button size="small" href={item.path}>Play</Button>
                    <Button size="small" href="#">Learn More</Button>
                </CardActions>
            </Card>
        </ThemeProvider>
    )
}
