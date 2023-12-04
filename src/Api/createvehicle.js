import axios from 'axios';

export default async function Apicreatevehicle(props)
{   let vehicleId =0
    
    //console.log("newvehicle", props.newvehicle)
    async function createvehicle() {
        await axios.post(process.env.REACT_APP_MAIN_URL+"/vehicles", props.newvehicle)
        .then((response) => {
            //console.log("vehicleadded",response.data.vehicle_added)
            //console.log("Id",response.data.vehicle_added.Id)
            vehicleId= response.data.vehicle_added.Id;
          })
        .catch(error => {
            //console.error('There was an error!', error);
        });
    }
    await createvehicle();
    return vehicleId;
} 