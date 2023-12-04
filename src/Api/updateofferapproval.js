import axios from 'axios';

export default async function Apiupdateoffer(OfferId,token){ 

    axios.patch(process.env.REACT_APP_MAIN_URL+'/offerapproval',
    {
        "OfferId": JSON.stringify(OfferId),
    },
            { headers: { 'x-access-token': token} }
        ).then((response) => {
            //console.log(response);
            //alert('The operation was successful');
        }).catch((error) => {
            //console.log(error)
        })
     
} 