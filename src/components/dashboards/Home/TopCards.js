import { Box, CardContent, Grid, Skeleton, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People"; // Total usuários
import HomeWorkIcon from "@mui/icons-material/HomeWork"; // Imobiliárias
import BusinessIcon from "@mui/icons-material/Business"; // Proprietários
import PersonIcon from "@mui/icons-material/Person"; // Corretores
import WarningIcon from "@mui/icons-material/Warning"; // Cadastro incompleto
import {getData} from '../../../Services/Api'
import { useEffect, useState } from "react";
import { toast } from "sonner";


const TopCards = () => {

  const list = ['client','owner', 'realtor', 'realstate'];
  const [loading, setLoading] = useState(false);
  const [topcards, setTopCards] = useState([

      {
        icon: <PeopleIcon fontSize="large" color="primary" />,
        title: "Total usuários",
        key : 'total',
        digits: "0",
      },
      {
        icon: <BusinessIcon fontSize="large" color="secondary" />,
        title: "Proprietários",
        key : 'owner',
        digits: "0",
      },
      {
        icon: <PersonIcon fontSize="large" color="success" />,
        title: "Corretores",
        key : 'realtor',
        digits: "0",
      },
      {
        icon: <HomeWorkIcon fontSize="large" color="warning" />,
        title: "Imobiliárias",
        key : 'realstate',
        digits: "0",
      },
      {
        icon: <WarningIcon fontSize="large" color="error" />,
        title: "Cadastro incompleto",
        key : 'client',
        digits: "0",
      },
    ]);



    async function loadData() {
      setLoading(true);
      try {
        // Faz todas as requisições ao mesmo tempo
        const responses = await Promise.all(list.map(key => getData(`${key}`)));
    
        // Atualiza os valores com base nas respostas
        let totalUsers = 0;
        const updatedCards = topcards.map(topcard => {
          const responseIndex = list.indexOf(topcard.key);
          if (responseIndex !== -1) {
            const value = responses[responseIndex]?.status === 200 
              ? responses[responseIndex].userInfo.pagination.total 
              : 0;
            
            totalUsers += value; // Soma os valores
            return { ...topcard, digits: value };
          }
          return topcard;
        });
    
        // Atualiza o "Total usuários" com a soma dos valores
        const finalCards = updatedCards.map(card =>
          card.key === "total" ? { ...card, digits: totalUsers } : card
        );
    
        setTopCards(finalCards);
      } catch (error) {
        toast.error("Ocorreu um erro inesperado");
      } finally {
        setLoading(false);
      }
    }
    

  useEffect  (() => {
    loadData();
  },[])
  

  if(loading){
    return (
      <Grid container spacing={3} >
        {[1,2,3,4,5.].map((topcard, i) => (
          <Grid item xs={12} sm={4} lg={2.4} key={i}>
            <Box>
              <Skeleton variant="rectangular" height={'140px'} />
            </Box>
          </Grid>
        ))}
      </Grid>
    )
  }

  return (
    <Grid container spacing={3}>
      {topcards.map((topcard, i) => (
        <Grid item xs={12} sm={4} lg={2.4} key={i}>
          <Box
            sx={{
              border: "1px solid #e0e0e0",
              textAlign: "center",
              borderRadius: "8px",
              "&:hover": {
                border: "1px solid #bdbdbd",
              },
            }}
          >
            <CardContent>
              {topcard.icon}
              <Typography
                mt={1}
                variant="subtitle1"
                fontWeight={600}
                color="text.primary"
              >
                {topcard.title}
              </Typography>
              <Typography variant="h4" fontWeight={600} color="text.secondary">
                {topcard.digits}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopCards;
