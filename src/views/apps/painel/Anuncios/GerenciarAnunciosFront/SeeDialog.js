/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel,} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,Typography,Box,IconButton,Grid, Slide, DialogActions, Button, Divider, Avatar,} from "@mui/material";
import React, { useEffect } from "react";
import { deleteData, postData } from "../../../../../Services/Api";
import { toast } from "sonner";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SeeDialog = ({ open, onClose, anuncio, setAnuncios, anuncios }) => {
  const token = localStorage.getItem('token');  
  const [loading, setLoading] = React.useState(false);
  const [denyLoading, setDenyLoading] = React.useState(false);

  if(!anuncio){
    return null;
  }  

  const handleSendPaymentLink = async () => {
    setLoading(true)
    try{
        const reponse = await postData(`announcement/approve/${anuncio.id}`,{},token);
        await payment();
        if(reponse.status === 200){
            toast.success('Anuncio aprovado com sucesso');
            setAnuncios(anuncios.filter((item) => item.id !== anuncio.id));         
        }else{
            toast.error('Infelizmente não foi possível aprovar o anúncio nesse momento, por favor tente novamente mais tarde.');
        }
    }catch(error){
        toast.error('Infelizmente não foi possível aprovar o anúncio nesse momento, por favor tente novamente mais tarde.');
    }finally{
        setLoading(false);
    }
    onClose();
  };

  const handleDeny = async () => {
    setDenyLoading(true)
    try{
        const reponse = await postData(`announcement/deny/${anuncio.id}`,{},token);
        await payment();
        if(reponse.status === 200){
            toast.success('Anuncio negado com sucesso');
            setAnuncios(anuncios.filter((item) => item.id !== anuncio.id));         
        }else{
            toast.error('Infelizmente não foi possível negar o anúncio nesse momento, por favor tente novamente mais tarde.');
        }
    }catch(error){
        toast.error('Infelizmente não foi negar aprovar o anúncio nesse momento, por favor tente novamente mais tarde.');
    }finally{
        setDenyLoading(false);
    }
    onClose();
  };


  const payment = async () => {
    const data = {
        announcementId: anuncio.id,
        description: `Olá, você está prestes a adquirir um pacote de anúncios da Space Imóveis, de valor de R$ ${anuncio.transactionAmount}.`,
        type: anuncio.type
    }
    try{
        const reponse = await postData(`/announcement/payment`,data,token);
        console.log(reponse);
        if(reponse.status === 200){
            toast.success('Anuncio aprovado com sucesso');
            setAnuncios(anuncios.filter((item) => item.id !== anuncio.id));         
        }else{
            toast.error('Infelizmente não foi possível aprovar o anúncio nesse momento, por favor tente novamente mais tarde.');
        }
    }catch(error){
        toast.error('Infelizmente não foi possível aprovar o anúncio nesse momento, por favor tente novamente mais tarde.');
    }finally{
        setLoading(false);
    }
  } 

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" maxHeight="500px" TransitionComponent={Transition}>
        <DialogTitle>
            <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
                Aceitar anúncio
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
                <Cancel />
            </IconButton>
            </Box>
        </DialogTitle>
        <Divider/>

        <DialogContent>
            <Box display={'flex'} flexDirection={'column'}>
                <Avatar sx={{ width: '100%', height: 200, mb: 1, borderRadius: 1 }} src={anuncio.photoUrl} />
                <Typography variant="body2" mb={1} sx={{alignSelf: 'end'}}>{anuncio.siteUrl}</Typography>
                <Divider/>
            </Box>
            <Typography variant ="body1" pt ={2} >
                Enviar email com o link para pagamento ao anunciante
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSendPaymentLink} color="primary" disabled={loading} > { loading ? 'Enviando...' : 'Aceitar'}</Button>
            <Button onClick={handleDeny} color="primary" disabled={denyLoading} > { denyLoading ? 'Negando...' : 'Negar'}</Button>

        </DialogActions>

    </Dialog>
  );
};

export default SeeDialog;

