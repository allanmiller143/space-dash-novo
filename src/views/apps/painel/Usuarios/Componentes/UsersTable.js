'use client';
import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableRow, Paper, TableCell, TableBody, Avatar, Typography, TableHead, Box, CircularProgress, Collapse, IconButton, Chip, Button, Pagination, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { ExpandMore, ExpandLess } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { putData } from '../../../../../Services/Api';
import { toast } from 'sonner';
import { formatDate, GetProfileURL, GetUserType } from './Utils/Utils';
import UserDetail from './UserDetail';

const ExpandableTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRow, setExpandedRow] = useState(null);
  const [nameFilter, setNameFilter] = useState(''); // Filtro por nome
  const [typeFilter, setTypeFilter] = useState(''); // Filtro por tipo
  const [TotalItens, setTotalItens] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const token = localStorage.getItem('token');

  useEffect(() => {
    loadData();
  }, [currentPage, nameFilter, typeFilter]);

  async function loadData() {
    setLoading(true);
    const data = {
      name : nameFilter,
      type : typeFilter
    }
    try {
      const response = await putData(`admin/users/filter?page=${currentPage}`, data, token);
      setData(response.data.users);
      setTotalItens(response.data.pagination.total);
      console.log(response);
    } catch (e) {
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }

  const handleRowClick = (email) => {
    setExpandedRow(expandedRow === email ? null : email);
  };



  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };



  return (
    <Box>
      {/* Filtros */}
      <Box display="flex" sx = {{width: '100%', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px', justifyContent: 'space-between'}} alignSelf ="end" gap={2} alignItems="center">
        <Box>
          {
              nameFilter || typeFilter
              ? (
                <Button size="small" onClick={() => {
                  setNameFilter('');
                  setTypeFilter('');
                  loadData();
                }}>
                  Limpar Filtros
                </Button>
              )
              : null
          }
        </Box>
        <Box sx = {{display: 'flex', gap: '10px'}}>
          <TextField
            label="Filtrar por Nome"
            variant="outlined"
            size="small"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
          <FormControl size="small" variant="outlined" sx = {{minWidth: '150px'}}>
            <InputLabel>Filtrar por Tipo</InputLabel>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              label="Filtrar por Tipo"
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="client">Clientes</MenuItem>
              <MenuItem value="owner">Proprietário</MenuItem>
              <MenuItem value="realtor">Corretor</MenuItem>
              <MenuItem value="realtor">Imobiliária</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={3} sx={{ minHeight: '600px' }}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>E-mail</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Criado</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Ver +</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <React.Fragment key={item.id}>
                  <TableRow hover sx={{ cursor: 'pointer' }} onClick={() => handleRowClick(item.email)}>
                    <TableCell>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Avatar src={GetProfileURL(item)} alt={item.name} />
                        <Typography variant="body2">{item.name}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.info.phone}</TableCell>
                    <TableCell>{formatDate(item.createdAt)}</TableCell>
                    <TableCell>
                      <Chip label={GetUserType(item)} color="primary" />
                    </TableCell>
                    <TableCell>
                      <IconButton>
                        {expandedRow === item.id ? <ExpandLess color="primary" /> : <ExpandMore color="info" />}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell colSpan={12} sx={{ p: 0 }}>
                      <Collapse in={expandedRow === item.email} timeout="auto" unmountOnExit>
                        <UserDetail data={item} />
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {data.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 4 }}>
          {TotalItens && currentPage && !loading && (
            <Pagination
              count={Math.ceil(TotalItens / 12)}
              page={currentPage}
              onChange={handleChangePage}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default ExpandableTable;
