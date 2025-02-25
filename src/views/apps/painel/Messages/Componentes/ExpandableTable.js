'use client';
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableRow, Paper, TableCell, TableBody, Avatar, Typography, TableHead, Box, CircularProgress, Collapse, IconButton, Chip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Stack } from '@mui/system';
import ResponseDialog from './ResponseDialog';
import { getData } from '../../../../../Services/Api';
import male1 from '../../../../../assets/images/profile/user-1.jpg'
import male2 from '../../../../../assets/images/profile/user-3.jpg'
import male7 from '../../../../../assets/images/profile/user-7.jpg'

import female1 from '../../../../../assets/images/profile/user-9.jpg'
import female2 from '../../../../../assets/images/profile/user-10.jpg'
import female6 from '../../../../../assets/images/profile/user-6.jpg'
import { toast } from 'sonner';


const ExpandableTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [answeredFilter, setansweredFilter] = useState('all'); // Estado do filtro
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadData();
  }, []);

  async function loadData(){
    setLoading(true)
    try{
      const response = await getData( 'admin/contact', token);
      console.log(response);
      if(response.status ===  200 || response.status ===  201){
        setData(response.userInfo.messages)
      }else{
        toast.error('deu ruim no else');
      }

    }catch(e){
      toast.error('deu ruim no catch');

    }finally{
      setLoading(false)
    }
  }

  const getProfileImage = (userName) => {
    if (!userName) return ''; // Se não houver nome, não retorna imagem
  
    const firstuserName = userName.split(' ')[0]; // Pega o primeiro nome
    const lastChar = firstuserName.slice(-1).toLowerCase(); // Pega a última letra em minúsculo
  
    const maleList = [male1, male2,male7];
    const femaleList = [female1, female2, female6];
  
    if (lastChar === 'a') {
      return femaleList[Math.floor(Math.random() * femaleList.length)]; // Escolhe uma imagem feminina aleatória
    } else if (lastChar === 'o') {
      return maleList[Math.floor(Math.random() * maleList.length)]; // Escolhe uma imagem masculina aleatória
    }
  
    return ''; // Caso não termine com 'a' ou 'o', retorna sem imagem
  };
  
  

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const handleOpenDialog = (message) => {
    setSelectedMessage(message);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedMessage(null);
  };

  // Filtrar dados com base no answered selecionado
  const filteredData = answeredFilter === 'all' ? data : data.filter(item => item.answered === answeredFilter);

  const formatanswered = (answered) => {
    switch (answered) {
      case true:
        return 'Respondido';
      case false:
        return 'Pendente';
      default:
        return 'Desconhecido';
    }
  };

  if(loading){
    return(
      <Box display="flex" justifyContent="center" alignItems="center" p={3} sx = {{minHeight: '600px'}}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" p={2} minWidth={200}>
        <FormControl>
          <InputLabel>Status</InputLabel>
          <Select
            value={answeredFilter}
            onChange={(e) => setansweredFilter(e.target.value)}
            label="answered"
          >
            <MenuItem value="all">Todos</MenuItem>
            <MenuItem value= {true}>Respondidos</MenuItem>
            <MenuItem value={false}>Pendentes</MenuItem>
          </Select>
        </FormControl>
      </Box>      
      <TableContainer component={Paper} >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3} sx = {{minHeight: '600px'}}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Mensagem</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(item.id)}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                      <Avatar src={item.imgsrc || getProfileImage(item.userName)} alt={item.userName} />
                      <Typography variant="body2">{item.userName}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.userEmail}</TableCell>
                    <TableCell>
                      {item.message.length > 20 ? `${item.message.slice(0, 40)}...` : item.message}
                    </TableCell>                    
                    <TableCell>
                      <Chip label={formatanswered(item.answered)} color={item.answered === true ? 'success' : 'warning'} />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        {expandedRow === item.id ? <ExpandLess color="primary" /> : <ExpandMore color="primary" />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12} sx={{ p: 0 }}>
                      <Collapse in={expandedRow === item.id} timeout="auto" unmountOnExit>
                        <Box p={2} borderRadius={1}>
                          <Typography variant="h6" color="textSecondary">Mensagem completa</Typography>
                          <Typography variant="body1" color="textSecondary" pb={2}>{item.message}</Typography>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenDialog(item.message);
                            }}
                            disabled={item.answered}
                          >
                            Responder
                          </Button>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
        <ResponseDialog openDialog={openDialog} setOpenDialog={setOpenDialog} onClose={handleCloseDialog} selectedMessage={selectedMessage} setData={setData} setExpandedRow={setExpandedRow} expandedRow={expandedRow} />
      </TableContainer>
    </Box>
  );
};

export default ExpandableTable;
