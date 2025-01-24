/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {Cancel,Pool,Balcony,LocalParking,KingBed,Bathtub,CheckCircle,OutdoorGrill,AcUnit,Toys,Event,Restaurant,Roofing,FitnessCenter,Grass,Deck,Person,Forest,Home,Elevator,WbSunny} from "@mui/icons-material";
import {Dialog,DialogTitle,DialogContent,DialogActions,Typography,Button,Box,IconButton,Divider,Chip,Stack, Slide, Grid,} from "@mui/material";
import React, { useState } from "react";
import AceitarNegarImovelDialog from "./AceitarNegarImovelDialog";
import GalleryPhotos from "./GalleryPhotos";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NovosImoveisDialog = ({ open, onClose, imovel,imoveis,setImoveis }) => {
  if (!imovel) return null;
  const {description,propertyType,bedrooms,suites,bathrooms,parkingSpaces,size,address,commodities,financiable,negotiable, } = imovel;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [accepted, setAccepted] = useState();
  
  
  // Função para mapear comodidades disponíveis
  const renderCommodities = () => {
    const commodityIcons = {
      pool: <Pool />,
      grill: <OutdoorGrill />,
      airConditioning: <AcUnit />,
      playground: <Toys />,
      eventArea: <Event />,
      gourmetArea: <Restaurant />,
      garden: <Grass />,
      porch: <Deck />,
      slab: <Roofing />,
      gatedCommunity: <Home />,
      gym: <FitnessCenter />,
      balcony: <Balcony />,
      solarEnergy: <WbSunny />,
      concierge: <Person />,
      yard: <Forest />,
      elevator: <Elevator />,
    };
  
    const commodityLabels = {
      pool: "Piscina",
      grill: "Churrasqueira",
      airConditioning: "Ar Condicionado",
      playground: "Playground",
      eventArea: "Área de Eventos",
      gourmetArea: "Espaço Gourmet",
      garden: "Jardim",
      porch: "Varanda",
      slab: "Laje",
      gatedCommunity: "Condomínio Fechado",
      gym: "Academia",
      balcony: "Sacada",
      solarEnergy: "Energia Solar",
      concierge: "Portaria",
      yard: "Quintal",
      elevator: "Elevador",
    };
  
    return Object.entries(commodities)
      .filter(([key, value]) => value === true)
      .map(([key]) => (
        <Chip
          key={key}
          icon={commodityIcons[key] || <CheckCircle />}
          label={commodityLabels[key] || key}
          color="primary"
          variant="outlined"
        />
      ));
  };
  

  const type = (type) => {
    if(type === 'house'){
        return 'Casa'
    }else if(type === 'apartment'){
        return 'Apartamento'    
    }else if(type === 'farm'){
        return 'Fazenda/Chácaras'
    }else if(type === 'land'){
        return 'Terreno'
    }
  }  

  const formatPrice = (price) => {
    return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : '';
  };

  const prices = () => {
    if (imovel.announcementType === 'both') {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Preço de compra R$ ${formatPrice(imovel.prices.sellPrice)}`}<br />
          {`Aluguel R$ ${formatPrice(imovel.prices.rentPrice)}`}
        </Typography>
      );
    } else if (imovel.announcementType === 'rent') {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Aluguel R$ ${formatPrice(imovel.prices.rentPrice)}`}
        </Typography>
      );
    } else {
      return (
        <Typography variant="h6" component="p" sx={{ mb: 1 }}>
          {`Preço de venda R$ ${formatPrice(imovel.prices.sellPrice)}`}
        </Typography>
      );
    }
  };
  
  return (
<Dialog open={open} onClose={onClose} maxWidth="sm" maxHeight="500px" TransitionComponent={Transition}>
  <DialogTitle>
    <Box display="flex" alignItems="center">
      <Typography variant="h5" component="span" style={{ flexGrow: 1 }}>
        Detalhes do Imóvel
      </Typography>
      <IconButton edge="end" color="inherit" onClick={onClose} aria-label="close">
        <Cancel />
      </IconButton>
    </Box>
  </DialogTitle>

  <DialogContent>
    {/* Galeria de Fotos */}
    <GalleryPhotos property={imovel} />

    <Box mt={3}>
  <Divider />

  <Typography variant="h6" gutterBottom mt={2}>
    Endereço
  </Typography>

  <Grid container spacing={1} mt={2}>
    <Grid item xs={12}>
      <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
        Rua
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
        {address.street}
      </Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
        Número
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
        {address.number}
      </Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
        Bairro
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
        {address.neighborhood}
      </Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
        Cidade
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
        {address.city}
      </Typography>
    </Grid>

    <Grid item xs={6}>
      <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
        Estado
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
        {address.state}
      </Typography>
    </Grid>

    {address.complement && (
      <Grid item xs={12}>
        <Typography variant="subtitle2" sx={{ color: '#888', marginBottom: 0.5 }}>
          Complemento
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: '500', color: '#000' }}>
          {address.complement}
        </Typography>
      </Grid>
    )}
  </Grid>
</Box>



    <Divider sx={{ my: 3 }} />

    {/* Características */}
    <Box>
      <Typography variant="h6" gutterBottom>
        Características
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={2}>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <KingBed fontSize="small" /> {`${bedrooms} Quartos`}
        </Typography>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <Bathtub fontSize="small" /> {`${bathrooms} Banheiros`}
        </Typography>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <Balcony fontSize="small" /> {`${suites} Suíte`}
        </Typography>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <LocalParking fontSize="small" /> {`${parkingSpaces} Vaga`}
        </Typography>
        <Typography variant="body1" display="flex" alignItems="center" gap={1}>
          <Balcony fontSize="small" /> {`${size} m²`}
        </Typography>
      </Box>
    </Box>

    <Divider sx={{ my: 3 }} />

    {/* Comodidades */}
    <Box>
      <Typography variant="h6" gutterBottom>
        Comodidades
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {renderCommodities()}
      </Stack>
    </Box>

    <Divider sx={{ my: 3 }} />

    {/* Descrição */}
    <Box>
      <Typography variant="h6" gutterBottom>
        Descrição
      </Typography>
      <Typography>{description}</Typography>
    </Box>

    <Divider sx={{ my: 3 }} />

    {/* Preço e Condições */}
    <Box>
      <Typography variant="h6" gutterBottom>
        Preço e Condições
      </Typography>
      {prices()}
      <Typography color="textSecondary">
        {financiable ? "Financiável" : "Não Financiável"} |{" "}
        {negotiable ? "Negociável" : "Não Negociável"}
      </Typography>
    </Box>
  </DialogContent>

  <DialogActions>
    <Button
      onClick={() => {
        setAccepted(false);
        setDialogOpen(true);
      }}
      variant="outlined"
    >
      Negar
    </Button>
    <Button
      onClick={() => {
        setAccepted(true);
        setDialogOpen(true);
      }}
      variant="contained"
      color="primary"
    >
      Aceitar
    </Button>
  </DialogActions>
  <AceitarNegarImovelDialog
    imovel={imovel}
    open={dialogOpen}
    onClose={() => setDialogOpen(false)}
    accepted={accepted}
    imoveis={imoveis}
    setImoveis={setImoveis}
    onCloseFist={onClose}
  />
</Dialog>

  );
};

export default NovosImoveisDialog;

