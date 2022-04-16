import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import axios from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ProfileMenu() {


    const [new_password, set_password] = useState("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const [delOpen, setDelOpen] = useState(false);
    const [resetOpen, setResetOpen] = useState(false);

    const handleDelClickOpen = (event) => {
        setDelOpen(true);
    };

    const handleDelClose = () => {
        setDelOpen(false);
        handleClick();
    };


    const handleResetClickOpen = (event) => {
        setResetOpen(true);
    };

    const handleResetClose = () => {
        set_password(null);
        setResetOpen(false);
        handleClick();
    };

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
                localStorage.clear();
            } else {
                console.log("error");
                console.log(response.data.error);
            }
        });
    }



   
    const handleDelete = (event) => {
        event.preventDefault();
        axios.post(global.config.host + "/delete_acc",{},
      {withCredentials: true})
      
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
            }
        });
        
    }

    const handleReset = (event) => {
        event.preventDefault();
        axios.post(global.config.host + "/change_password",{'new_password': new_password},
      {withCredentials: true})
      
        .then(response => {
            if (response.data.error === '') {
                window.location.href = '/login';
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
                        <Avatar sx={{ width: 42, height: 42, bgcolor: "#c79632" }}></Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                //onClick={handleClose}
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
        onClick={handleResetClickOpen}
        
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
            <Dialog 
            open={resetOpen} onClose={handleResetClose}>
        <DialogTitle>Change Password?</DialogTitle>
        <DialogContent>
         
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="New Password"
            value = {new_password}
            onChange={(e) => set_password(e.target.value)}
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetClose}>Cancel</Button>
          <Button onClick={handleReset}>Reset Password</Button>
        </DialogActions>
      </Dialog>
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
             onClick={handleDelClickOpen}
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

            <Dialog
        open={delOpen}
        onClose={handleDelClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           This action cannot be reversed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDelClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

        </MenuItem>
        
        </Menu>
        </React.Fragment>
    );
}
