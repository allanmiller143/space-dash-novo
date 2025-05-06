import { Box, Tab, Tabs, } from '@mui/material';
import Breadcrumb from '../../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import DataTable from './DataTable';
import BlankCard from 'src/components/shared/BlankCard';
import { useState } from 'react';

const GerenciarAnunciosFront = () => {

  const [adType, setAdType] = useState('big'); // Estado para controlar o tipo de anúncio

  const handleTabChange = (event, newValue) => {
    setAdType(newValue);
  };

  
  return (
    <>  
      <Breadcrumb title="Gerenciador de anúncios" subtitle={"Gerencie os anúncios existentes na Space imóveis"}  description="this is Form Wizard page" />
      <BlankCard> 
        <Box p ={3}>
          <Tabs value={adType} onChange={handleTabChange} centered sx = {{ mb: 4, mt:2, backgroundColor: '#f5f5f5' }}>
            <Tab label="Anúncios centrais" value="big" />
            <Tab label="Anúncio laterais" value="small" />
          </Tabs>
          <DataTable type={adType}/>
        </Box>
      </BlankCard>
    </>
  );
};

export default GerenciarAnunciosFront;
