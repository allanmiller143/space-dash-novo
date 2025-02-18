/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,TextField,MenuItem, Slide} from "@mui/material";
import React, { useState } from "react";
import { toast } from "sonner";
import { postData } from "../../../../Services/Api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AceitarNegarImovelDialog = ({ open, onClose, imovel, accepted, imoveis, setImoveis,onCloseFist }) => {
    const [motivo, setMotivo] = useState("");
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("token");

    const motivosNegacao = [
      "Imagens inadequadas",
      "Endereço inválido",
      "Descrição inapropriada",
      "Imóvel duplicado",
      "Informações insuficientes",
    ];
  
    if (!imovel) return null;
  
    const handleConfirmar = async () => {
      if (!accepted && !motivo) {
        toast.info("Por favor, informe o motivo da recusa.");
        return;
      }

      if(accepted){
        handlePublicar();
      }else{
        handleNegar();
      }
    };

    async function handleNegar() {
      setLoading(true);
      try{
        setLoading(true);
        const response = await postData(`admin/property/deny/${imovel.id}`,{'reason': motivo}, token);
        if( response.status === 200){
          toast.success('Publicação recusada com sucesso');
          setImoveis((prevImoveis) => prevImoveis.filter((item) => item.id !== imovel.id));
        }else{
          toast.error(response.message);
        }
      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
        onClose();
        onCloseFist();
      }
    }  

    async function handlePublicar() {
      setLoading(true);
      try {
        const response = await postData(`admin/property/approve/${imovel.id}`,{},token);
        if (response.status === 200) {
          toast.success("Publicação concluída com sucesso");
          setImoveis((prevImoveis) => prevImoveis.filter((item) => item.id !== imovel.id));
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Erro ao publicar imóvel");
      } finally {
        setLoading(false);
        onClose();
        onCloseFist();
      }
    }  
  
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" TransitionComponent={Transition}>
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
              {accepted ? "Confirmar Publicação" : "Motivo da Recusa"}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
  
        <DialogContent>
          {accepted ? (
            <Typography>
              Tem certeza de que deseja publicar o imóvel? Ele ficará visível para todos os usuários.
            </Typography>
          ) : (
            <>
              <Typography>
                Por favor, informe o motivo da recusa do imóvel. Você pode selecionar uma opção abaixo ou escrever
                um motivo personalizado.
              </Typography>
              <TextField
                select
                label="Motivo da Recusa"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                fullWidth
                margin="normal"
              >
                {motivosNegacao.map((opcao) => (
                  <MenuItem key={opcao} value={opcao}>
                    {opcao}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Motivo Personalizado"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </>
          )}
        </DialogContent>
  
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="contained" color="primary" onClick={handleConfirmar} disabled={loading}>
            {accepted ? (loading ? "Publicando..." : "Publicar Imóvel") : ( loading ? "Recusando..." : "Confirmar Recusa")}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AceitarNegarImovelDialog;