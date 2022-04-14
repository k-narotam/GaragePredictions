import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// import { deepPurple } from '@mui/material/colors';
import axios from 'axios'
import Dialog from "../components/Dialog";
export default function ProfileMenu() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [deleteClick, setDeleteClick] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = (event) => {
        setAnchorEl(null);
    }

    const handleLogout = (event) => {
        console.log("handle logout");
        event.preventDefault();
        axios.post(global.config.host + "/logout", {}, {withCredentials: true})
        .then(response => {
            if (response.data.error === "") {
                window.location.href = '/login';
            } else {
                console.log("error");
                console.log(response.data.error);
            }
        });
    }

    /*
    const OpenDialog = () => {
        <Dialog/>
    };

    */
   
    const handleDelete = (event) => {
        setDeleteClick(true);
        console.log("Delete clicked", deleteClick);

        const email = Dialog.email;

        console.log(email);
        event.preventDefault();

        /*
        axios.post(global.config.host + "/delete_acc",
      {"email": email},
      {withCredentials: true}
      )
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
            } else {
                setErrorVisible("block");
                setError(response.data.error);
            }
        });
        */
    }

    const handleReset = (event) => {
        console.log("reset password clicked");

        event.preventDefault();

        /*
        axios.post(global.config.host + "/change_password",
      {"new_password": newPassword},
      {withCredentials: true}
      )
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
            } else {
                setErrorVisible("block");
                setError(response.data.error);
            }
        });
        */
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
                        <Avatar sx={{ width: 42, height: 42, bgcolor: "#c79632" }}></Avatar>
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
        <Button
        onClick={handleReset}
        
                id="reset-button"
                aria-controls={open ? 'reset-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant ="contained"
                size = "small"
                sx = {{width : 150}}
            >
                Reset Password
            </Button>
        </MenuItem>
        <MenuItem>
        <Button
        onClick={handleLogout}
        
                id="logout-button"
                aria-controls={open ? 'logout-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant ="contained"
                color ="success"
                size = "small"
                sx = {{width : 150}}
            >
                Logout
            </Button>
            
        </MenuItem>
        <MenuItem>
            <Button
            onClick={handleDelete}
             //onClick={OpenDialog()}
                id="delete-button"
                aria-controls={open ? 'delete-button' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant ="contained"
                color ="error"
                size="small"
                sx = {{width : 150}}
            >
                Delete Account
            </Button>

        </MenuItem>
        
        </Menu>
        </React.Fragment>
    );
}
