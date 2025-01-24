import { Box, Grid } from '@mui/material';
import TopCards from '../../components/dashboards/modern/TopCards';
import RevenueUpdates from '../../components/dashboards/modern/RevenueUpdates';
import YearlyBreakup from '../../components/dashboards/modern/YearlyBreakup';
import MonthlyEarnings from '../../components/dashboards/modern/MonthlyEarnings';
import EmployeeSalary from '../../components/dashboards/modern/EmployeeSalary';
import Customers from '../../components/dashboards/modern/Customers';
import Projects from '../../components/dashboards/modern/Projects';
import Social from '../../components/dashboards/modern/Social';
import SellingProducts from '../../components/dashboards/modern/SellingProducts';
import WeeklyStats from '../../components/dashboards/modern/WeeklyStats';
import TopPerformers from '../../components/dashboards/modern/TopPerformers';
import ImoveisList from '../NovosImoveis/NovosImoveis';
import LatestUsers from 'src/components/dashboards/modern/LatestUsers';
const Modern = () => {
  return (
    <Box>
      <Grid container spacing={3}>

        <Grid item sm={12} lg={12}>
          <TopCards />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={3}>
            <Grid item sm={12} lg={12}>
              <RevenueUpdates />
            </Grid>
            <Grid item sm={12} lg={12}>
              <LatestUsers />
            </Grid>
          </Grid>
        </Grid>

        {/* column */}
        <Grid item xs={12} lg={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={12}>
              <YearlyBreakup />
            </Grid>
            <Grid item xs={12} sm={6} lg={12}>
              {/* <MonthlyEarnings /> */}
              <ImoveisList/>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} lg={4}>
          <EmployeeSalary />
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
