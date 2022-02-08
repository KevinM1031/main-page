import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        width: '100%'
    },
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&ixid=' +
            'MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    link: {
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline"
        }
    },

    loading: {
        position: "absolute",
        left: "50%",
        top: "40%",
    }
}));
