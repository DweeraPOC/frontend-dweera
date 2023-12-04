import axios from 'axios';

export default async function Apicreatebooking(booking,token)
{ 
    async function createbooking() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/booking/", booking,
        { headers: { 'x-access-token':  token} })
        .then((response) => {
            //console.log("bookingadded",response.data.booking_added);
          })
        .catch(error => {
            //alert('There was an error!', error);
        });
    }
    await createbooking()
    return;
} 