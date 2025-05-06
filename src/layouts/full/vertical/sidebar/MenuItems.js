import {
  IconPoint,
  IconNotes,
  IconMail,
  IconUserCircle,
  IconAperture,

} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { getData } from '../../../../Services/Api';



async function loadData() {
  const token = localStorage.getItem('token');
  try {
    const response = await getData('announcement', token);
    console.log(response);
    if (response.status === 200) {
      // Filtra apenas os que não têm verified igual a 'verified'
      const filteredData = response.userInfo.filter(item => item.verified === "pending");
      console.log(filteredData.length);
      return filteredData.length;
    } else {
      toast.error('Algo deu errado');
      return 4;
    }
  } catch (error) {
    toast.error('Algo deu errado');
    return 4;
  } 
}



const Menuitems = async () => {
    const pendingCount = await loadData();
    return [
      {
        navlabel: true,
        subheader: 'Home',
      },

      {
        id: uniqueId(),
        title: 'Visão geral',
        icon: IconAperture,
        href: '/dashboards/modern',
      },
      {
        id: uniqueId(),
        title: 'Anúncios',
        icon: IconNotes,
        href: '/dashboards/anuncios',
        children: [
          {
            id: uniqueId(),
            title: 'Inserir anúncio',
            icon: IconPoint,
            href: '/dashboards/anuncios',
          },
          {
            id: uniqueId(),
            title: 'Gerenciar anúncios',
            icon: IconPoint,
            href: '/dashboards/gerenciar-anuncios',
          },
          {
            id: uniqueId(),
            title: 'Pendentes',
            icon: IconPoint,
            href: '/dashboards/gerenciar-anuncios-front',
            chip : pendingCount,
          },
        ],
      },
      {
        id: uniqueId(),
        title: 'Mensagens',
        icon: IconMail,
        href: '/dashboards/messages',
      },
      // {
      //   id: uniqueId(),
      //   title: 'Pagamentos',
      //   icon: IconShoppingCart,
      //   href: '/dashboards/ecommerce',
      // },
      // {
      //   id: uniqueId(),
      //   title: 'Imoveis',
      //   icon: IconHome,
      //   href: '/dashboards/imoveis',
      // },
      {
        id: uniqueId(),
        title: 'Usuários',
        icon: IconUserCircle,
        href: '/dashboards/users',
      },
      // {
      //   id: uniqueId(),
      //   title: 'Configurações',
      //   icon: IconSettings,
      //   href: '/dashboards/settings',
      // },
    ];
}

export default Menuitems;






