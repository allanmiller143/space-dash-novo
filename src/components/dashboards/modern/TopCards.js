import { Box, CardContent, Grid, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People"; // Total usuários
import HomeWorkIcon from "@mui/icons-material/HomeWork"; // Imobiliárias
import BusinessIcon from "@mui/icons-material/Business"; // Proprietários
import PersonIcon from "@mui/icons-material/Person"; // Corretores
import WarningIcon from "@mui/icons-material/Warning"; // Cadastro incompleto

const topcards = [
  {
    icon: <PeopleIcon fontSize="large" color="primary" />,
    title: "Total usuários",
    digits: "96",
  },
  {
    icon: <BusinessIcon fontSize="large" color="secondary" />,
    title: "Proprietários",
    digits: "985",
  },
  {
    icon: <PersonIcon fontSize="large" color="success" />,
    title: "Corretores",
    digits: "356",
  },
  {
    icon: <HomeWorkIcon fontSize="large" color="warning" />,
    title: "Imobiliárias",
    digits: "696",
  },
  {
    icon: <WarningIcon fontSize="large" color="error" />,
    title: "Cadastro incompleto",
    digits: "696",
  },
];

const TopCards = () => {
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
