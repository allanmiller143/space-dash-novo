import React from 'react';
import { Box, Grid } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import WelcomeCard from '../../../../components/dashboards/Payment/WelcomeCard';
import Expence from '../../../../components/dashboards/Payment/Expence';
import Sales from '../../../../components/dashboards/Payment/Sales';
import RevenueUpdates from '../../../../components/dashboards/Payment/RevenueUpdates';  
import SalesOverview from '../../../../components/dashboards/Payment/SalesOverview';
import SalesTwo from '../../../../components/dashboards/Payment/SalesTwo';
import Growth from '../../../../components/dashboards/Payment/Growth';
import MonthlyEarnings from '../../../../components/dashboards/Payment/MonthlyEarnings';
import WeeklyStats from '../../../../components/dashboards/Home/WeeklyStats';
import PaymentGateways from '../../../../components/dashboards/Payment/PaymentGateways';
import RecentTransactions from '../../../../components/dashboards/Payment/RecentTransactions';
import ProductPerformances from '../../../../components/dashboards/Payment/ProductPerformances';

const Ecommerce = () => {
  return (
    <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
      <Box mt={3}>
        <Grid container spacing={3}>

          {/* <Grid item xs={12} lg={8}>
            <WelcomeCard />
          </Grid>

          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Expence />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Sales />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <RevenueUpdates />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <SalesTwo />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Growth />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} lg={4}>
            <WeeklyStats/>
          </Grid>


          <Grid item xs={12} lg={4}>
            <PaymentGateways/>
          </Grid>


          <Grid item xs={12} lg={4}>
            <RecentTransactions />
          </Grid>

          <Grid item xs={12} lg={8}>
            <ProductPerformances />
          </Grid> */}
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Ecommerce;
