import axios from 'axios';

export default async function Apigetdatesofbookings()
{ let thisbookingsdates = [];
    async function getalldates() {
        await axios.get(process.env.REACT_APP_MAIN_URL+"/booking/getdatesofotherbookings/"+props.offerid,{
            headers: {
              'x-access-token': localStorage.getItem('token')
            }
          })
        .then((response) => {
            //console.log(response.data.dates_otherbookings);
            thisbookingsdates = response.data.dates_otherbookings
        })
        .catch((error) => {
            //console.log(error);
        })
        }
    await getalldates()
    return thisbookingsdates;
} 