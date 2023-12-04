import axios from 'axios';

export default async function Apiupdateoffer(props){ 
    axios.patch(process.env.REACT_APP_MAIN_URL+'/booking/',
    {
        "Id": props.Id,
        "OwnerId": props.offers.UserId,
        "BookingApprovalStatus":"Not Approved"
    },
            { headers: { 'x-access-token': localStorage.getItem('token')} }
        ).then((response) => {
            //console.log(response)
        }).catch((error) => {
            //console.log(error)
        })
     
}