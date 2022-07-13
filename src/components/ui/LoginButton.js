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
            localStorage.setItem("admin", "false");
            window.location.reload();
        } else setOpen(true);
    }

    const handleLogin = () => {
        login(email, password).then(() => {
            handleClose();
            localStorage.setItem("admin", "true");
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
                <DialogTitle fontSize='large'>{props.lang === 'kor' ? '로그인' : 'Log In'}</DialogTitle>
                <DialogContent style={{overflow: 'hidden'}}>
                    <Collapse in={failed}>
                        <Alert variant="outlined" severity="error" color="error">
                            {
                            props.lang === 'kor' ? 
                                '로그인 실패. 이메일과 비밀번호의 조합이 인식되지 않았습니다.'
                            : 
                                'Login attempt failed. Unregistered email-password combination.'
                            }
                        </Alert>
                    </Collapse>
                    <TextField
                        autoFocus
                        margin="normal"
                        id="email"
                        label={props.lang === 'kor' ? '이메일' : 'Email'}
                        fullWidth
                        onChange={(event) => setEmail(event.target.value)}/>
                    <TextField
                        margin="normal"
                        id="password"
                        label={props.lang === 'kor' ? '비밀번호' : 'Password'}
                        type="password"
                        fullWidth
                        onChange={(event) => setPassword(event.target.value)}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{props.lang === 'kor' ? '취소' : 'Cancel'}</Button>
                    <Button onClick={handleLogin} type="submit">{props.lang === 'kor' ? '확인' : 'Enter'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}