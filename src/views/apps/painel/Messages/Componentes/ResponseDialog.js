import { Typography, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Slide, IconButton, Divider} from '@mui/material';
import { Box, padding } from '@mui/system';
import React, { useState } from 'react';
import { postData, putData } from '../../../../../Services/Api';
import { toast } from 'sonner';
import { Cancel } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResponseDialog = ({openDialog,  setOpenDialog, onClose, selectedMessage,setExpandedRow, setData , expandedRow}) => {
  const [text,setText] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  async function submmit(){
    setLoading(true);
    if(text.length === 0){
      toast.error('Preencha o campo de texto');
      setLoading(false);
      return;
    }

    try{
      const data = {
        message: text
      }
      const response = await postData(`admin/contact/${expandedRow}`, data, token);
      console.log(response);

      if(response.status === 200 || response.status === 201){
        toast.success('Mensagem respondida com sucesso');
        setData((prevData) => prevData.map((item) => item.id === expandedRow ? {...item, answered: true} : item));
        setExpandedRow(null);
        setOpenDialog(false);
      }else{
        toast.error(response.message);
      }

    }catch(error){
      toast.error('Ocorreu um erro');

    }finally{
      setLoading(false);
    } 
  }

  return (

      <Dialog open={openDialog} onClose={onClose} TransitionComponent={Transition} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              Responder mensagem
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>  
        <Divider />      
        
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {selectedMessage}
          </Typography>
          <TextField
            fullWidth multiline onChange={(e) => setText(e.target.value)} rows={4} placeholder="Digite sua resposta aqui..." variant="outlined"
            sx={{
              "& .MuiInputBase-input": {
                padding: 0,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">Cancelar</Button>
          <Button variant="contained" color="primary" onClick={submmit} disabled={loading}> {loading ? 'Enviando...' : 'Enviar'} </Button>
        </DialogActions>
      </Dialog>
  );
};

export default ResponseDialog;
