import { Login, Logout } from '@mui/icons-material';
import { isEditor, login, logout } from '../database/FirebaseAPI.js';
import { useEffect, useState } from 'react';
import { IconButton, Button, TextField, Dialog, DialogActions, DialogContent, Collapse, Alert, DialogTitle } 
  from '@material-ui/core';

export default function Editable() {

    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [failed, setFailed] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        setLoggedIn(isEditor());
    });

    const handleOpen = () => {
        if (loggedIn) {
            logout();
            window.location.reload();
        } else setOpen(true);
    }

    const handleLogin = () => {
        login(email, password).then(() => {
            handleClose();
            window.location.reload();
        }).catch(() => {
            setFailed(true);
        });
    };

    const handleClose = () => {
        setOpen(false);
        setFailed(false);
    };

    return (
        <div>
            <IconButton onClick={handleOpen} size="large">
                {
                loggedIn ?
                <Logout color="secondary"/>
                :
                <Login color="secondary"/>
                }
            </IconButton>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Log In</DialogTitle>
                <DialogContent>
                    <Collapse in={failed}>
                        <Alert variant="standard" severity="error" color="error">
                            Login attempt failed. Unregistered email-password combination.
                        </Alert>
                    </Collapse>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setEmail(event.target.value)}/>
                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
                        variant="outlined"
                        type="password"
                        fullWidth
                        onChange={(event) => setPassword(event.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin}  type="submit">Enter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}