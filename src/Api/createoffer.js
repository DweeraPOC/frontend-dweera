import axios from 'axios';

export default async function Apicreateoffer(props)
{   let Offerid=0
    async function createoffer() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/offers", props.OfferformData)
        .then((response) => {
            //console.log("offeradded",response.data.offer_added)
            Offerid =  response.data.offer_added.Id
          })
        .catch(error => {
            //console.error('There was an error!', error);
        });
    }
    await createoffer()
    return Offerid;
} 
