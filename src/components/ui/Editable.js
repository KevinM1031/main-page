import { Box, Collapse, Alert } from '@material-ui/core';
import { isEditor } from '../database/FirebaseAPI.js';
import { auth } from '../database/firebase-config';
import { useEffect, useState } from 'react';

export default function Editable(props) {
    const [editing, setEditing] = useState(false);
    useEffect(() => {
        setEditing(isEditor());
    }, [auth.currentUser]);
    
    const borderStyle = () => {
        return editing ? '3px dashed white' : '';
    }

    return (
        <Box 
            sx={{ border: borderStyle(), width: '100%', height: '100%' }}
            onClick={() => {if (editing) props.editor(props.id)}}>
            <Collapse in={editing}>
                <Alert variant="outlined" severity="info" color="info">
                    Click here to edit this element.
                </Alert>
            </Collapse>
            <div style={{ width: '100%', height: '100%'}}>
                {props.children}
            </div>
        </Box>
    );
}