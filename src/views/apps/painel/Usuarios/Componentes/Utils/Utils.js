import male1 from '../../../../../../assets/images/profile/user-1.jpg'
import female1 from '../../../../../../assets/images/profile/user-9.jpg'


export const getProfileImage = (userName) => {
    if (!userName) return ''; // Se não houver nome, não retorna imagem
  
    const firstuserName = userName.split(' ')[0]; // Pega o primeiro nome
    const lastChar = firstuserName.slice(-1).toLowerCase(); // Pega a última letra em minúsculo
  
    const maleList = [male1,];
    const femaleList = [female1];
  
    if (lastChar === 'a') {
      return femaleList[Math.floor(Math.random() * femaleList.length)]; // Escolhe uma imagem feminina aleatória
    } else if (lastChar === 'o') {
      return maleList[Math.floor(Math.random() * maleList.length)]; // Escolhe uma imagem masculina aleatória
    }
  
    return ''; // Caso não termine com 'a' ou 'o', retorna sem imagem
  };

  export const GetProfileURL = (user) => {
    if(user.profile === null){
      return getProfileImage(user.name)
    }else if(user.profile.url){
      return user.profile.url
    }
  };

  export const GetUserType = (user) => {
    if(user.type === 'client'){
      return 'Cliente'
    }else if(user.type === 'owner'){
      return 'Proprietário'
    }else if(user.type === 'realtor'){
      return 'Corretor'
    }else if (user.type === 'admin'){
      return 'Admin'
    }
    else{
      return 'Imobiliária'
    }
  };


  export function formatDate(isoString) {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }
  
  