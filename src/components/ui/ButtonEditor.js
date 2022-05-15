import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } 
  from '@material-ui/core';
import { setData } from '../database/FirebaseAPI.js';

export default function ButtonEditor(props) {

  const [input, setInput] = useState();

  const handleSubmit = () => {
    let data = {};
    data[props.id] = input;
    setData(props.dataPath, data).then(() => window.location.reload());
    handleClose();
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle fontSize='large'>Edit Button</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter the new action link for: "{props.id}"
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="link"
            label="Action Link"
            fullWidth
            variant="outlined"
            defaultValue={props.placeholder}
            onChange={(event) => setInput(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
