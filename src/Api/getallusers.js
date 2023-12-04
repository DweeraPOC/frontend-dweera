import axios from 'axios';

export default async function Apigetallusers()
{ 
    async function getallusers() {
        await axios.get(process.env.REACT_APP_MAIN_URL+"/users")
        .then((response) => {
            //console.log(response.data.allusers);
        })
        .catch((error) => {
            //console.log(error);
        })
        }
    await getallusers()
    return;
} 