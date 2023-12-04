import axios from 'axios';

export default async function Apicreateuser(props)
{ 
        await axios.post(process.env.REACT_APP_MAIN_URL+"/users", props.user)
        .then((response) => {
            //console.log("useradded",response.data.user_added);
          })
        .catch(error => {
            //console.error('There was an error!', error);
        });
} 