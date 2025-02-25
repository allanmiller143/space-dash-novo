import { Box, Typography } from '@mui/material';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ExpandableTable from './Componentes/ExpandableTable';

const Messages = () => {
  return (
    <Box>
      <Breadcrumb title="Mensagens dos Usuários" subtitle="Veja e responda as mensagens dos usuários" description="this is Form Wizard page" />
      <ExpandableTable/>
        
    </Box>
  );
};

export default Messages;
