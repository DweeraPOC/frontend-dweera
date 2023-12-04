import axios from 'axios';

export default function Apitest()
{ 
    
    async function check() {
        await axios.get(process.env.REACT_APP_MAIN_URL+"/test")
        .then((response) => {
            //console.log(response.data.message);
        })
        .catch((error) => {
            //console.log(error);
        })
        }
    check()
    return;
} 