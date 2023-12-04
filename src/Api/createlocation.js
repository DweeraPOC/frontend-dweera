import axios from 'axios';

export default async function Apicreatelocation(props)
{  let LocationId =0
    //console.log("newlocation ", props.newlocation);
    async function createlocation() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/locations", props.newlocation)
        .then((response) => {
            //console.log("locationadded",response.data.location_added)
            LocationId = response.data.location_added.Id;
          })
        .catch(error => {
            //console.error('There was an error!', error);
        });
    }
    await createlocation()
    return LocationId;
} 