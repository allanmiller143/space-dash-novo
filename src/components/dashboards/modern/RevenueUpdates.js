import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Typography, Button, Box } from '@mui/material';
import { IconGridDots } from '@tabler/icons';
import DashboardCard from '../../shared/DashboardCard';
import { getData } from '../../../Services/Api';
import {toast} from 'sonner';

const AtualizacaoReceitas = () => {
  const [dadosApi, setDadosApi] = useState([]);
  const [totalvalue, setTotalvalue] = useState(0);
  const [maxGrafico, setMaxGrafico] = useState(0);
  const token = localStorage.getItem("token");

  const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", 
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  const getGraphicProperties = async () => {
    try {
      const response = await getData('admin/properties/monthly', token);
      if (response.status === 200 || response.status === 201) {
        const dados = response.userInfo;

        // Preencher os meses ausentes com valores padrão
        const dadosCompletos = meses.map((mes) => {
          const dado = dados.find((d) => d.month === mes);
          return dado || { month: mes, value: 0 };  // Adiciona valor 0 se o mês não existir
        });

        setDadosApi(dadosCompletos);

        // Calcula o valor máximo do gráfico
        const maxValor = Math.max(...dadosCompletos.map((dado) => dado.value));
        setMaxGrafico(maxValor + 5);

        // Calcula o total de value
        const total = dadosCompletos.reduce((acc, dado) => acc + dado.value, 0);
        setTotalvalue(total);
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

  const theme = useTheme();
  const primaria = theme.palette.primary.main;

  const opcoesGrafico = {
    chart: {
      type: 'bar',
      fontFamily: "'Inter', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: true,
      },
      height: 370,
      stacked: false,
    },
    colors: [primaria],
    plotOptions: {
      bar: {
        horizontal: false,
        barHeight: '60%',
        columnWidth: '40%',
        borderRadius: [6],
        borderRadiusApplication: 'end',
      },
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
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
    },
    yaxis: {
      min: 0,
      max: maxGrafico, // Define o valor máximo dinamicamente
      tickAmount: 4,
    },
    xaxis: {
      categories: dadosApi.map((dado) => dado.month),
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const dadosGrafico = [
    {
      name: 'value por mês',
      data: dadosApi.map((dado) => dado.value),
    },
  ];

  return (
    <DashboardCard
      title="Atualização de novos imóveis"
      subtitle="Visão Geral de todos os imoveis cadastrados"
    >
      <Grid container spacing={3}>
        {/* Gráfico */}
        <Grid item xs={12} sm={9}>
          <Box className="rounded-bars">
            <Chart options={opcoesGrafico} series={dadosGrafico} type="bar" height="370px" />
          </Box>
        </Grid>
        {/* Informações */}
        <Grid item xs={12} sm={3} display="flex" flexDirection="column" justifyContent="start" >
          <Stack spacing={3} my={3}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                width={40}
                height={40}
                bgcolor="primary.light"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="primary" variant="h6" display="flex">
                  <IconGridDots width={21} />
                </Typography>
              </Box>
              <Box>
                <Typography variant="h5" fontWeight="700">
                  {totalvalue} imóveis
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Total
                </Typography>
              </Box>
            </Stack>
          </Stack>
          <Button color="primary" fontSize="12px" variant="contained" fullWidth>
            <Typography variant="body2">
              Ver Relatório Completo
            </Typography>
          </Button>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default AtualizacaoReceitas;
