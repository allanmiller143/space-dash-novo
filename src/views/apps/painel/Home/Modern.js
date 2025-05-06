import { Box, Grid } from '@mui/material';
import TopCards from '../../../../components/dashboards/Home/TopCards';
import RevenueUpdates from '../../../../components/dashboards/Home/RevenueUpdates';
import YearlyBreakup from '../../../../components/dashboards/Home/YearlyBreakup';
import LatestUsers from '../../../../components/dashboards/Home/LatestUsers';
import MonthlyEarnings from '../../../../components/dashboards/Home/MonthlyEarnings';
import Customers from '../../../../components/dashboards/Home/Customers';
import Projects from '../../../../components/dashboards/Home/Projects';
import Social from '../../../../components/dashboards/Home/Social';
import SellingProducts from '../../../../components/dashboards/Home/SellingProducts';
import WeeklyStats from '../../../../components/dashboards/Home/WeeklyStats';
import TopPerformers from '../../../../components/dashboards/Home/TopPerformers';
import ImoveisList from '../../../../views/apps/painel/NovosImoveis/NovosImoveis';
import EmployeeSalary from '../../../../components/dashboards/Home/EmployeeSalary';

const Modern = () => {
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item sm={12} lg={12}>
          <TopCards/>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item sm={12} lg={12}>
              <RevenueUpdates />
            </Grid>
            <Grid item sm={12} lg={12}>
              {/* <LatestUsers /> */}
            </Grid>
          </Grid>
        </Grid>


        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              <ImoveisList/>
            </Grid>
          </Grid>
        </Grid>
        {/*
        <Grid item xs={12} lg={4}>
          <EmployeeSalary/>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Customers />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Projects />
            </Grid>
            <Grid item xs={12}>
              <Social />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <SellingProducts />
        </Grid>

        <Grid item xs={12} lg={4}>
          <WeeklyStats />
        </Grid>
        
        <Grid item xs={12} lg={8}>
          <TopPerformers />
        </Grid> */}
      </Grid>

    </Box>
  );
};

export default Modern;
