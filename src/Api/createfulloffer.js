import axios from 'axios';

export default async function Apicreatefulloffer(OfferfullData,token)
{  
    let Offerid=0
    var message = "";
    async function createoffer() {     
        await axios.post(process.env.REACT_APP_MAIN_URL+"/offers/createfulloffer",OfferfullData,
        {
          headers: {
            'x-access-token': token
          }
        })
        .then((response) => {
            if(response.data.success==false){
              //alert(response.data.details);
            }
            else{
                //console.log("offeradded",response.data.offer_added)
                Offerid =  response.data.offer_added.Id;
                message = "new offer added successfully!";
            }
         
        })
        .catch((error) => {
            //console.log("login",error);
            message = "une erreur s'est produite lors du traitement de votre demande";
        })   
    }
    await createoffer()
    return {message : message, Offerid : Offerid};
} 

