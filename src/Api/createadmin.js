import axios from 'axios';

export default async function Apicreateadmin(admin,token)
{ 
    async function createadmin() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/admins/Create-Admin", admin,
        { headers: { 'x-access-token': token} })
        .then((response) => {
            //console.log("adminadded",response.data.admin_added);
            //alert('The operation was successful');
            window.location.reload(false);
          })
        .catch(error => {
           //console.error('There was an error!', error);
        });
    }
    await createadmin()
    return;
} 