import { Box, Grid, Typography } from '@mui/material';
import UsersTable from './Componentes/UsersTable';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import TopCards from '../../../../components/dashboards/Home/TopCards';


const Usuarios = () => {
  return (
    <Box>
      <Breadcrumb title="Todos os usuarios" subtitle="Veja e responda as mensagens dos usuários" description="this is Form Wizard page" />
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <TopCards/>
        </Grid>
        <Grid item sm={12} lg={12}>
          <UsersTable/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Usuarios;
