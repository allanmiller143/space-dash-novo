import {Box,Typography,Button,Stack,Divider, CircularProgress,} from '@mui/material';
import { Link } from 'react-router-dom';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../../../Services/Api';
import { toast } from 'sonner';

function AuthLogin  ()  {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();


    if (email === '' || password === '') {
      alert('Preencha todos os campos');
    } else {
      setLoading(true);
      try {
        const data = { email: email, password: password };
        const response = await postData('login/admin', data);
        if (response.status === 200 || response.status === 201) {
          const token = response.data.accessToken;
          const user = response.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('admin', JSON.stringify(user));
          navigate('/dashboards/modern');
        } else {
          toast.error('Email ou senha inválidos');
        }
      } catch (error) {
        toast.error('Ocorreu um erro');
      } finally {
        setLoading(false);      }
    }
  };



  return (
  <>
    <Box mt={3}>
      <Divider>
        <Typography
          component="span"
          color="textSecondary"
          variant="h6"
          fontWeight="400"
          position="relative"
          px={2}
        >
          Entre no painel
        </Typography>
      </Divider>
    </Box>

    <Stack>
      <Box>
        <CustomFormLabel htmlFor="username">Email</CustomFormLabel>
        <CustomTextField id="username" variant="outlined" fullWidth onChange={(e) => setEmail(e.target.value)} />
      </Box>
      <Box>
        <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
        <CustomTextField id="password" type="password" variant="outlined" fullWidth onChange={(e) => setPassword(e.target.value)}/>
      </Box>
      <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
      </Stack>
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        type="submit"
        onClick={login}
        disabled={loading}
      >
        {
          !loading ? 'Entrar' : <CircularProgress size={20} color='inherit' /> 
        }
      </Button>
    </Box>
  </>
  )}

export default AuthLogin;
