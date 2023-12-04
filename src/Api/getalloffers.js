import axios from 'axios';

export default async function Apigetalloffers()
{ 
    async function getalloffers() {
        await axios.get(process.env.REACT_APP_MAIN_URL+"/offers")
        .then((response) => {
            //console.log(response.data.alloffers);
        })
        .catch((error) => {
            //console.log(error);
        })
        }
    await getalloffers()
    return;
} 