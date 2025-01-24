import { useState, useEffect } from "react";
import {Box,Typography,List,ListItem,ListItemAvatar,ListItemText,Avatar,Skeleton,Button,} from "@mui/material";
import NovosImoveisDialog from "./NovosImoveisDialog";
import { getData } from "../../Services/Api";
import { useNavigate } from 'react-router-dom';
import {toast} from 'sonner';
import DashboardCard from "../../components/shared/DashboardCard";

const ImoveisList = () => {
  const [imoveis, setImoveis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImovel, setSelectedImovel] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);

  async function loadImoveis() {
    setLoading(true);
    try {
      const response = await getData(
        `admin/properties/new?page=${currentPage}`,
        token
      );
      if (response.status === 200 || response.status === 201) {
        setImoveis(response.userInfo.properties);
      } else {
        navigate('/error');
      }
    } catch (error) {
      toast.error('ocorreu um erro insperado');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadImoveis();
  }, [currentPage]); // Agora a página será carregada sempre que 'currentPage' mudar.

  const handleImovelClick = (imovel) => {
    setSelectedImovel(imovel);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedImovel(null);
  };

  const type = (type) => {
    switch (type) {
      case "house":
        return "Casa";
      case "apartment":
        return "Apartamento";
      case "farm":
        return "Fazenda/Chácaras";
      case "land":
        return "Terreno";
      default:
        return "Imóvel";
    }
  };

  return (
    <DashboardCard >
      {/* Cabeçalho */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h6">Novos Imóveis</Typography>
        <Typography variant="h6" color="primary">
          {imoveis.length}
        </Typography>
      </Box>

      {/* Lista com rolagem limitada */}
      <Box
        sx={{
          maxHeight: 7 * 74, // Altura estimada de cada item (72px) * 6 itens
          overflowY: "auto",
          pr: 1,
        }}
      >
        <List>
          {loading
            ? // Skeletons para simular os cards de imóveis
              Array.from({ length: 6 }).map((_, index) => (
                <ListItem key={index} sx={{ padding: 0, marginBottom: 2 }}>
                  <ListItemAvatar>
                    <Skeleton
                      variant="rectangular"
                      width={55}
                      height={55}
                      sx={{ borderRadius: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={<Skeleton width="60%" />}
                    secondary={<Skeleton width="80%" />}
                    sx={{ marginLeft: 1 }}
                  />
                </ListItem>
              ))
            : imoveis.length === 0
            ? <Box height={7 * 73} sx ={{display: 'flex',flexDirection: 'column' , justifyContent: 'center', alignItems: 'center'}}>
                <Typography variant="h5" color="textSecondary" align="center" mb={1}> Ops</Typography> 
                <Typography variant="body2" color="textSecondary" align="center">Nenhum imóvel novo encontrado.</Typography> 
              </Box>
            : imoveis.map((imovel) => (
                <ListItem
                  key={imovel.id}
                  sx={{ padding: 0, marginBottom: 1, cursor: "pointer" }}
                  onClick={() => handleImovelClick(imovel)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={imovel.pictures[0].url}
                      alt={imovel.nome}
                      sx={{ width: 55, height: 55, borderRadius: 1, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={type(imovel.propertyType)}
                    secondary={`${imovel.address.street}, ${imovel.address.number} - ${imovel.address.neighborhood} - ${imovel.address.city}, ${imovel.address.state}`}
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondaryTypographyProps={{
                      sx: {
                        display: "-webkit-box",
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        WebkitLineClamp: 2, // Limita a 2 linhas
                        fontSize: "11px",
                      },
                    }}
                  />
                </ListItem>
              ))}
        </List>
      </Box>

      {/* Botão para carregar mais imóveis */}
      <Box mt={2}>
        <Button
          color="primary"
          onClick={()=>{toast.warning('ainda não disponivel')}}
          href="/dashboards/imoveis"
        >
          Ver Todos
        </Button>
      </Box>

      {/* Diálogo com detalhes do imóvel */}
      <NovosImoveisDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        imovel={selectedImovel}
        setImoveis={setImoveis}
        imoveis={imoveis}
      />
    </DashboardCard>  );
};

export default ImoveisList;
