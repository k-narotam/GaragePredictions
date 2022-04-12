import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { deepPurple } from '@mui/material/colors';
import axios from 'axios'


export default function ProfileMenu() {

    const [errorMessage, setError] = useState("abc");

    const [errorVisible, setErrorVisible] = useState("none");

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const handleLogout = (event) => {
        event.preventDefault();

        axios.post("https://group17poos-api.herokuapp.com/logout")
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
            } else {
                setErrorVisible("block");
                setError(response.data.error);
            }
        });
    }
    
    return(
        <React.Fragment>
            <Box sx={{ display: 'flex', alighItems: 'center', textAlign: 'center'}}>
                <Tooltip title="Profile settings">
                    <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 42, height: 42, bgcolor: deepPurple[500] }}>RE</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                },
                '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                },
            },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
            Your email
        </MenuItem>
        <MenuItem>
            Customize Avatar
        </MenuItem>
        <MenuItem>
            Reset Password
        </MenuItem>
        <MenuItem>
        <Button
                id="logout-button"
                aria-controls={open ? 'logout-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant ="contained"
                color ="success"
                size = "medium"
                sx = {{fullWidth: "true"}}
            >
                LOGOUT ACCOUNT
            </Button>
        </MenuItem>
        <MenuItem component="form" noValidate onSubmit={handleLogout}>
            <Button
                id="delete-button"
                aria-controls={open ? 'delete-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant ="contained"
                color ="error"
                size="medium"
                sx = {{fullWidth: "true"}}
            >
                DELETE ACCOUNT
            </Button>
            
        </MenuItem>
        </Menu>
        </React.Fragment>
    );
}
