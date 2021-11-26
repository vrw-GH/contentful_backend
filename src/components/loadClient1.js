import axios from "axios";

const LoadClient = (clientUrl, page, hitsPerPg, setClientData)=>{
   const getData = async () => {
      try {
         const response = await axios.get(`${clientUrl}&${hitsPerPg}&page=${page}`);
         //console.log(response.status);                // check
         if (!response.status) {
            throw Error("Couldnt get data.");
         } else {
            const {hits: dataArray,} = response.data;
            console.log("got data:",dataArray);                        // check
            setClientData(dataArray);
         };
      } catch (e) {alert('Something went wrong :( ', e.message)};
   };
   getData();
}

export default LoadClient;