
import { Box, Grid, Typography, Avatar, Divider } from "@mui/material";
import { GetProfileURL } from "./Utils/Utils";

const UserDetail = ({ data }) => {
  if (!data) return <Typography variant="h6">Nenhum dado disponível</Typography>;

  return (
    <Box p={3} >
      {/* Cabeçalho com avatar e nome */}
      <Box display="flex" alignItems="center" mb={3}>
        <Avatar 
          src={GetProfileURL(data)}
          alt={data.name}
          sx={{ width: 80, height: 80, mr: 2 }}
        />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            {data.name || "Nome não informado"}
          </Typography>
          <Typography color="textSecondary">
            {data.type === "owner" ? "Proprietário" : "Usuário"}
          </Typography>
        </Box>
      </Box>

      {/* Seção de Informações Pessoais */}
      <Typography variant="h6" fontWeight="bold" mb={1}>📌 Informações Pessoais</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Email:</Typography>
          <Typography color="textSecondary">{data.email || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Telefone:</Typography>
          <Typography color="textSecondary">{data.info?.phone || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">CPF:</Typography>
          <Typography color="textSecondary">{data.info?.cpf || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Plano:</Typography>
          <Typography color="textSecondary">{data.info?.subscription || "Não informado"}</Typography>
        </Grid>
      </Grid>

      {/* Seção de Endereço */}
      <Typography variant="h6" fontWeight="bold" mt={4} mb={1}>🏠 Endereço</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Rua:</Typography>
          <Typography color="textSecondary">{data.address?.street || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold">Número:</Typography>
          <Typography color="textSecondary">{data.address?.number || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold">CEP:</Typography>
          <Typography color="textSecondary">{data.address?.cep || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight="bold">Bairro:</Typography>
          <Typography color="textSecondary">{data.address?.neighborhood || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold">Cidade:</Typography>
          <Typography color="textSecondary">{data.address?.city || "Não informado"}</Typography>
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="subtitle1" fontWeight="bold">Estado:</Typography>
          <Typography color="textSecondary">{data.address?.state || "Não informado"}</Typography>
        </Grid>
      </Grid>

      {/* Seção de Redes Sociais */}
      <Typography variant="h6" fontWeight="bold" mt={4} mb={1}>🌐 Redes Sociais</Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={2}>
        {data.socials?.length > 0 ? (
          data.socials.map((social) => (
            <Grid item xs={12} md={6} key={social.id}>
              <Typography variant="subtitle1" fontWeight="bold">{social.type.toUpperCase()}:</Typography>
              <Typography color="textSecondary">{social.url || "Não informado"}</Typography>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color="textSecondary">Nenhuma rede social cadastrada</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default UserDetail;