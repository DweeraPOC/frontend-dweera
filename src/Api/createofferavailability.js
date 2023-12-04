import axios from 'axios';

export default async function Apicreateofferavailability(props)
{ let OAId =0
    
    async function createofferavailability() {
       await axios.post(process.env.REACT_APP_MAIN_URL+"/offeravailability", props.newoavailability)
        .then((response) => {
            //console.log("offeravailabilityadded",response.data.availability_added)
            OAId = response.data.availability_added.Id;
          
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
    }
    await createofferavailability()
    return OAId;
} 