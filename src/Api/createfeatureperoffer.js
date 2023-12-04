import axios from 'axios';

export default async function Apiaddfeatureperoffer(newfeatureperoffer,token)
{
    async function addfeatureperoffer() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/featureperoffer", newfeatureperoffer,{
            headers : {
                "x-access-token" : token
            }
        })
        .then((response) => {
            //console.log("featureperofferadded",response.data.featureperoffer_added)
        })
        .catch(error => {
            //console.error('There was an error!', error);
        });
    }
    await addfeatureperoffer()
    return;
} 