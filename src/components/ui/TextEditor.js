import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } 
  from '@material-ui/core';
import { setData } from '../database/FirebaseAPI.js';

export default function TextEditor(props) {

  const [input, setInput] = useState();
  const [input_kor, setInput_kor] = useState();

  const handleSubmit = () => {
    let data = {};
    data[props.id] = input;
    data[props.id + '_kor'] = input_kor;
    setData(props.dataPath, data).then(() => window.location.reload());
    handleClose();
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle fontSize='large'>Edit Text</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please enter the new text to be displayed for: "{props.id}"
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="text"
            label="Display Text"
            fullWidth
            multiline
            variant="filled"
            defaultValue={props.placeholder}
            onChange={(event) => setInput(event.target.value)}
          />
          <TextField
            margin="normal"
            id="text"
            label="Display Text (Korean)"
            fullWidth
            multiline
            variant="filled"
            defaultValue={props.placeholder_kor}
            onChange={(event) => setInput_kor(event.target.value)}
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
