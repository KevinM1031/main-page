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

    let key = titleToId(input);
    if (!props.content[key]) {
      let data = props.content;
      data[key] = {};

      data[key].name_kor = '한국어 제목';
      data[key].description = 'Sample description text.';
      data[key].description_kor = '한국어 설명.';
      data[key].image = 'https://picsum.photos/600/400';
      data[key].status = 'Sample Status Text.';
      data[key].status_kor = '한국어 상태.';

      setData(props.dataPath, data).then(() => window.location.reload());
      handleClose();

    } else {
      setFailed(true);
    }
    
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle fontSize='large'>Create New Item</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            Choose a name for the new list item.
          </DialogContentText>
          <CustomTextField id={'addItem'} label={'Name'} placeholder={''} listener={setInput} autoFocus={true}/>
          <Collapse in={failed}>
            <Alert variant="outlined" severity="error" color="error">
              Invalid item name. This name is already in use.
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
    let key = titleToId(props.item);
    data[key] = {};
    setData(props.dataPath, data).then(() => window.location.reload());
    handleClose();
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle fontSize='large'>Delete Item</DialogTitle>
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

export default function ShopEditor(props) {
  const [failed, setFailed] = useState(false);

  const handleSubmit = () => {
    let data = props.content;
    let key = titleToId(selectedItem);
    let newKey = titleToId(name);

    if (data[newKey] && name != selectedItem) {
      setFailed(true);
      return;
    }

    if (!data[newKey]) {
      data[newKey] = data[key];
      data[key] = {};
      key = newKey;
    }

    data[key].name_kor = name_kor;
    data[key].description = description;
    data[key].description_kor = description_kor;
    data[key].image = image;
    data[key].status = status;
    data[key].status_kor = status_kor;

    if (price == '')
      data[key].price = null;
    else data[key].price = price;

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
  }

  const updateTextFields = (item) => {
    setName(item);
    let key = titleToId(item);
    setName_kor(props.content[key].name_kor);
    setStatus(props.content[key].status);
    setStatus_kor(props.content[key].status_kor);
    setDescription(props.content[key].description);
    setDescription_kor(props.content[key].description_kor);
    setImage(props.content[key].image);

    if (!props.content[key].price) {
      setPrice('');
    } else setPrice(props.content[key].price);
  };

  const [items, setItems] = useState(['']);
  const [selectedItem, setSelectedItem] = useState('');

  const [name, setName] = useState('');
  const [name_kor, setName_kor] = useState('');
  const [description, setDescription] = useState('');
  const [description_kor, setDescription_kor] = useState('');
  const [image, setImage] = useState('');
  const [status, setStatus] = useState('');
  const [status_kor, setStatus_kor] = useState('');
  const [price, setPrice] = useState('');

  const [addItemOpen, setAddItemOpen] = useState(false);
  const [removeItemOpen, setRemoveItemOpen] = useState(false);

  useEffect(() => {
    if (props.content) {
      let newItems = Object.keys(props.content);
      for (let i = 0; i < newItems.length; i++)
        newItems[i] = idToTitle(newItems[i]);
      setItems(newItems);
      setSelectedItem(newItems[props.page]);
      updateTextFields(newItems[props.page]);
    } else setItems(['']);
  }, [props.page, props.open]);

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
        <DialogTitle fontSize='large'>Edit Shop</DialogTitle>
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

          <CustomTextField id={'name'} label={'Name'} placeholder={name} listener={setName} autoFocus={true}/>
          <Collapse in={failed}>
            <Alert variant="outlined" severity="error" color="error">
              Invalid name. This name is already in use.
            </Alert>
          </Collapse>
          <CustomTextField id={'name_kor'} label={'Name (Korean)'} placeholder={name_kor} listener={setName_kor}/>
          <CustomTextField id={'status'} label={'Status'} placeholder={status} listener={setStatus}/>
          <CustomTextField id={'status_kor'} label={'Status (Korean)'} placeholder={status_kor} listener={setStatus_kor}/>
          <CustomTextField id={'price'} label={'Price (optional)'} placeholder={price} listener={setPrice}/>
          <CustomTextField id={'description'} label={'Description'} placeholder={description} listener={setDescription}/>
          <CustomTextField id={'description_kor'} label={'Description (Korean)'} placeholder={description_kor} listener={setDescription_kor}/>
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
