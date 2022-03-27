import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } 
  from '@material-ui/core';
import { setData } from '../database/FirebaseAPI.js';

export default function ImageEditor(props) {

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
        <DialogTitle>Edit Image Source</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter the new image link to be displayed for: "{props.id}"
          </DialogContentText>
          <Button
            href={'https://imgur.com/upload'}
            target="_blank">
            Or upload an image in Imgur and paste its URL here.
          </Button>
          <TextField
            autoFocus
            margin="normal"
            id="link"
            label="Image Link"
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
