import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Skeleton,
  Chip,
} from '@mui/material';
import DashboardCard from '../../shared/DashboardCard';
import { toast } from 'sonner';
import g1 from '../../../assets/images/news/g1.png';

const LatestUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulação de chamada à API
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { name: 'Ana Silva', avatar: '', registeredAt: '2025-01-20', type: 'Corretor' },
        { name: 'João Souza', avatar: '', registeredAt: '2025-01-21', type: 'Corretor' },
        { name: 'Maria Santos', avatar: '', registeredAt: '2025-01-22', type: 'Imobiliária' },
        { name: 'Ana Silva', avatar: '', registeredAt: '2025-01-20', type: 'Corretor' },
        { name: 'João Souza', avatar: '', registeredAt: '2025-01-21', type: 'Proprietario' },
        { name: 'Maria Santos', avatar: '', registeredAt: '2025-01-22', type: 'Corretor' },
        { name: 'Ana Silva', avatar: '', registeredAt: '2025-01-20', type: 'Usuário' },
        { name: 'João Souza', avatar: '', registeredAt: '2025-01-21', type: 'Usuário' },
        { name: 'Maria Santos', avatar: '', registeredAt: '2025-01-22', type: 'Usuário' },
      ]);
      setLoading(false);
    }, 2000); // Simula um atraso de 2 segundos
  }, []);

  return (
    <DashboardCard
      title="Novos usuários"
      subtitle="Visão Geral dos novos usuários nos últimos 7 dias"
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        {/* Lista de usuários ou Loading */}
        {loading ? (
          <Box>
            {[1, 2, 3].map((index) => (
              <ListItem key={index} sx={{ padding: '8px 0' }}>
                <Skeleton
                  variant="circular"
                  width={40}
                  height={40}
                  sx={{ marginRight: 2 }}
                />
                <Box sx={{ width: '100%' }}>
                  <Skeleton width="60%" height={20} />
                  <Skeleton width="40%" height={15} sx={{ marginTop: 1 }} />
                </Box>
              </ListItem>
            ))}
          </Box>
        ) : (
          <Box sx={{ maxHeight: 200, overflowY: 'auto' }}>
            <List>
              {users.map((user, index) => (
                <ListItem
                  key={index}

                  sx={{
                    padding: '8px 0',
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                      borderRadius: 1,
                      zIndex: 1,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={user.avatar}
                      alt={user.name}
                      sx={{ backgroundColor: 'primary.dark', color: '#fff' }}
                    >
                      {user.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={`Cadastrado em ${new Date(
                      user.registeredAt
                    ).toLocaleDateString()}`}
                    primaryTypographyProps={{
                      fontWeight: '500',
                      color: '#333',
                    }}
                    secondaryTypographyProps={{
                      color: 'textSecondary',
                    }}
                  />
                  <Box sx={{ mr: 2 }}>
                    {' '}
                    <Chip label={user.type} color="primary" />{' '}
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        )}


        {/* Botão Ver Todos */}
        <Box mt={2}>
          <Button
            color="primary"
            onClick={() => {
              toast.warning('ainda não disponivel');
            }}
          >
            Ver Todos
          </Button>
        </Box>
      </Box>
    </DashboardCard>
  );
};

export default LatestUsers;
