import axios from 'axios';

export default async function Apigetoffersbyuserid()
{ let thisuseroffers = [];
    async function getalloffers() {
        await axios.get(process.env.REACT_APP_MAIN_URL+"/offers/useroffers",{
            headers: {
              'x-access-token': localStorage.getItem('token')
            }
          })
        .then((response) => {
            //console.log(response.data.alloffers);
            thisuseroffers = response.data.alloffers
        })
        .catch((error) => {
            //console.log(error);
        })
        }
    await getalloffers()
    return thisuseroffers;
} 