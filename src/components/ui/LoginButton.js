import { Login, Logout } from '@mui/icons-material';
import { isEditor, login, logout } from '../database/FirebaseAPI.js';
import { useEffect, useState } from 'react';
import { IconButton, Button, TextField, Dialog, DialogActions, DialogContent, Collapse, Alert, DialogTitle, Tooltip } 
  from '@material-ui/core';

export default function LoginButton(props) {

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
            <Tooltip title={loggedIn ? 
                (props.lang === 'kor' ? '로그아웃' : 'Log Out') : 
                (props.lang === 'kor' ? '로그인' : 'Log In')}>

                <IconButton onClick={handleOpen}>
                    {
                    loggedIn ?
                    <Logout fontSize={props.landscape ? 'large' : 'medium'}/>
                    :
                    <Login fontSize={props.landscape ? 'large' : 'medium'}/>
                    }
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Collapse in={failed}>
                        <Alert variant="outlined" severity="error" color="error">
                            Login attempt failed. Unregistered email-password combination.
                        </Alert>
                    </Collapse>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email"
                        label="Email"
                        fullWidth
                        onChange={(event) => setEmail(event.target.value)}/>
                    <TextField
                        margin="normal"
                        id="password"
                        label="Password"
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