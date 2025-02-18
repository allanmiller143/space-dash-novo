import { toast } from "sonner";
import { getData } from "../../../../../Services/Api";

const initialDataList = [
    {
      id: 1,
      imageUrl: "http://localhost:5173/src/assets/images/posters/Banner1.png",
      link: "https://color.adobe.com/pt/create/color-wheel",
      createdAt: "2023-06-01",
      endAt: "2023-07-01",
      clicks: 10,
      advertiser : "Allan Miller",
      status : "ativo",
      email : "milleraallan17@gmail.com" ,
      type : 'center'
    },
    {
      id: 2,
      imageUrl: "http://localhost:5173/src/assets/images/posters/Banner1.png",
      link: "https://www.youtube.com/watch?v=EOdlorjAKQU",
      createdAt: "2023-02-01",
      endAt: "2023-03-01",
      clicks: 10,
      advertiser : "Allan Miller",
      status : "ativo",
      email : "allan@gmail",
      type : 'center'
    },
    {
      id: 3,
      imageUrl: "http://localhost:5173/src/assets/images/posters/Banner1.png",
      link: "https://color.adobe.com/pt/create/color-wheel",
      createdAt: "2023-04-01",
      endAt: "2023-05-01",
      clicks: 10,
      advertiser : "Allan Miller",
      status : "ativo",
      email : "allan@gmail",
      type : 'side'
    },
  ];

const token = localStorage.getItem("token");  



async function loadData (setLoading) {
    setLoading(true);
    try {
      const response = await getData('announcement', token);
      console.log(response);
      if(response.status === 200){
        return response.userInfo;
      }else{
        toast.error('Algo deu errado');
        return initialDataList;
      }
    }catch(error){
      toast.error('algo deu errado');
      return initialDataList;

    }finally{
      setLoading(false);
    }
  }

export default loadData