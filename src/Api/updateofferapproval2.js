import axios from 'axios';

export default async function Apiupdateoffer2(OfferId,reason,token){ 
    axios.patch(process.env.REACT_APP_MAIN_URL+'/offerapproval',
    {
        "OfferId": JSON.stringify(OfferId),
        "ApprovalStatus":"Not Approved",
        "DeniedApprovalReason":JSON.stringify(reason)   },
            { headers: { 'x-access-token': token} }
        ).then((response) => {
            //console.log(response)
            window.location.reload(false);
        }).catch((error) => {
            //console.log(error)
        })
     
}