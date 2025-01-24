import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { IconArrowUpLeft } from '@tabler/icons';

import DashboardCard from '../../shared/DashboardCard';
import { getData } from '../../../Services/Api';

const YearlyBreakup = () => {
  // chart color
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const primarylight = theme.palette.secondary.dark;
  const successlight = theme.palette.success.light;
  const [valueMesAtual, setValueMesAtual] = useState({month : '', value : 0});
  const [valueMesAnterior, setValueMesAnterior] = useState({month : '', value : 0});
  const [seriescolumnchart, setSeriescolumnchart] = useState([]);

  const token = localStorage.getItem("token");

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];


  const getGraphicProperties = async () => {
    const dataAtual = new Date();
    const mesAtual = dataAtual.getMonth(); // Obtém o índice do mês (0-11)
    const nomeMes = meses[mesAtual];

    try {
      const response = await getData('admin/properties/monthly', token);
      if (response.status === 200 || response.status === 201) {
        const dados = response.userInfo;

        // Preencher os meses ausentes com valores padrão
        const dadosCompletos = meses.map((mes) => {
          const dado = dados.find((d) => d.month === mes);
          return dado || { month: mes, value: 0 };  // Adiciona valor 0 se o mês não existir
        });
        const total = dadosCompletos.reduce((acc, dado) => acc + dado.value, 0);
        dadosCompletos.map((dado,index) => {
          let valueAtual = 0;
          let valueAnterior = 0;
          if(dado.month === nomeMes){
            setValueMesAtual(dado); valueAtual = dado.value;
            if(index > 0){
              setValueMesAnterior(dadosCompletos[index-1]); valueAnterior = dadosCompletos[index-1].value;
            }else{
              setValueMesAnterior({
                month: 'Dezembro',
                value: 0
              });
              valueAnterior = 0;
            }
            if(valueAtual === total){
              setSeriescolumnchart([valueAtual, 8, 80]);
            }else{
              setSeriescolumnchart([valueAtual, valueAnterior, total]);
            }
            
          }
        });  
      } else {
        alert('Erro ao carregar conteúdo');
        console.log(response);
      }
    } catch (error) {
      alert('Ocorreu um erro inesperado');
    }
  };

  useEffect(() => {
    getGraphicProperties();
  }, []);


  // chart
  const optionscolumnchart = {
    chart: {
      type: 'donut',
      fontFamily: "'Inter', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, '#F9F9FD'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: '75%',
          background: 'transparent',
        },
      },
    },
    tooltip: {
      enabled: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  

  return (
    <DashboardCard title="Aumento mensal">
      <Grid container spacing={1}>
        {/* column */}
        <Grid item xs={7} sm={8}>
          <Typography variant="h3" fontWeight="700">
            {valueMesAtual.value - valueMesAnterior.value} imóveis
          </Typography>
          <Stack direction="row" spacing={1} mt={1} alignItems="center">
            <Avatar sx={{ bgcolor: successlight, width: 27, height: 27 }}>
              <IconArrowUpLeft width={20} color="#39B69A" />
            </Avatar>
            <Typography variant="subtitle2" fontWeight="600">
              {(valueMesAtual.value - valueMesAnterior.value) * 100} %
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Mês passado
            </Typography>
          </Stack>
          <Stack spacing={3} mt={5} direction="row">
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primary, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {valueMesAtual.month}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar
                sx={{ width: 9, height: 9, bgcolor: primarylight, svg: { display: 'none' } }}
              ></Avatar>
              <Typography variant="subtitle2" color="textSecondary">
                {valueMesAnterior.month}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        {/* column */}
        <Grid item xs={5} sm={4}>
          <Chart
            options={optionscolumnchart}
            series={seriescolumnchart}
            type="donut"
            height="130px"
          />
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default YearlyBreakup;
