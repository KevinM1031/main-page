import { useRef, useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Select, 
  MenuItem, Grid, IconButton, Collapse, Alert } 
  from '@material-ui/core';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import { setData, titleToId, idToTitle } from '../database/FirebaseAPI.js';

const CustomTextField = (props) => {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.value = props.placeholder;
    }
  }, [props.placeholder]);

  return (
    <TextField
      inputRef={ref}
      margin="normal"
      id={props.id}
      label={props.label}
      fullWidth
      multiline
      variant="filled"
      defaultValue={props.placeholder}
      autoFocus={props.autoFocus}
      onChange={(event) => props.listener(event.target.value)}
    />
  );
}

const AddItemDialog = (props) => {
  const [input, setInput] = useState();
  const [failed, setFailed] = useState(false);

  const handleClose = () => {
    setFailed(false);
    props.setOpen(false);
  };

  const handleSubmit = () => {
    if (!input || input == '') return;

    if (!props.content[input]) {
      let data = props.content;
      let key = input;
      data[key] = {};
      data[key].title = 'Sample Title';
      data[key].image = 'https://picsum.photos/600/400';

      setData(props.dataPath, data).then(() => window.location.reload());
      handleClose();

    } else {
      setFailed(true);
    }
    
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Create New Item</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Choose an ID for the new item.
          </DialogContentText>
          <CustomTextField id={'addItem'} label={'Item ID'} placeholder={''} listener={setInput} autoFocus={true}/>
          <Collapse in={failed}>
            <Alert variant="outlined" severity="error" color="error">
              Invalid item ID. This ID is already in use.
            </Alert>
          </Collapse>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const RemoveItemDialog = (props) => {

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleConfirm = () => {
    let data = props.content;
    let key = props.item;
    data[key] = {};
    setData(props.dataPath, data).then(() => window.location.reload());
    handleClose();
  };
  
  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Delete Item</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Delete {props.item}? This cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function GalleryEditor(props) {
  const [failed, setFailed] = useState(false);

  const handleSubmit = () => {
    let data = props.content;
    let key = selectedItem;
    let newKey = ID;

    if (data[newKey] && ID != selectedItem) {
      setFailed(true);
      return;
    }

    if (!data[newKey]) {
      data[newKey] = data[key];
      data[key] = {};
      key = newKey;
    }

    data[key].title = title;
    data[key].image = image;

    setData(props.dataPath, data).then(() => window.location.reload());
    handleClose();
  };

  const handleClose = () => {
    setFailed(false);
    props.setOpen(false);
  };

  const handleSelect = (event) => {
    setSelectedItem(event.target.value);
    updateTextFields(event.target.value);
  };

  const updateTextFields = (key) => {
    setID(key);
    setTitle(props.content[key].title);
    setImage(props.content[key].image);
  };

  const [items, setItems] = useState(['']);
  const [selectedItem, setSelectedItem] = useState('');

  const [ID, setID] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const [addItemOpen, setAddItemOpen] = useState(false);
  const [removeItemOpen, setRemoveItemOpen] = useState(false);

  useEffect(() => {
    if (props.content) {
      let newItems = Object.keys(props.content);
      setItems(newItems);
      setSelectedItem(newItems[0]);
      updateTextFields(newItems[0]);
    } else setItems(['']);
  }, [props.open]);

  return (
    <div>
      <AddItemDialog 
        open={addItemOpen} 
        setOpen={setAddItemOpen} 
        content={props.content}
        dataPath={props.dataPath}/>

      <RemoveItemDialog 
        open={removeItemOpen} 
        setOpen={setRemoveItemOpen} 
        content={props.content}
        item={selectedItem}
        dataPath={props.dataPath}/>   

      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle fontSize='large'>Edit Gallery</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Please modify the selected list element.
          </DialogContentText>

          <Grid container justifyContent='center' alignItems='center'>
            <Grid item xs={8}>
              <Select
                id="selectItem"
                value={selectedItem}
                onChange={handleSelect}
                fullWidth>

                {items.map((item) => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={2} align='right'>
              <IconButton onClick={() => setAddItemOpen(true)}>
                <AddCircleOutline fontSize="large"/>
              </IconButton>
              
            </Grid>
            <Grid item xs={2} align='left'>
              <IconButton 
                disabled={!items || items.length <= 1}
                onClick={() => setRemoveItemOpen(true)}>
                <RemoveCircleOutline fontSize="large"/>
              </IconButton>
            </Grid>
          </Grid>

          <CustomTextField id={'ID'} label={'Item ID'} placeholder={ID} listener={setID}/>
          <Collapse in={failed}>
            <Alert variant="outlined" severity="error" color="error">
              Invalid ID. This ID is already in use.
            </Alert>
          </Collapse>
          <CustomTextField id={'title'} label={'Title'} placeholder={title} listener={setTitle} autoFocus={true}/>
          <CustomTextField id={'image'} label={'Image Source'} placeholder={image} listener={setImage}/>
          
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
