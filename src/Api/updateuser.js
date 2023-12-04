import axios from 'axios';
export default async function Apiuserupdate(props)
{   
    var message = false;
    await axios.patch(process.env.REACT_APP_MAIN_URL+"/users/completeprofile", props.FullData,
    {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          "Access-Control-Allow-Origin": "*"
        }
    })
    .then((response) => {
        localStorage.setItem('FirstName',response.data.FirstName);
        localStorage.setItem('LastName',response.data.LastName);
        message = true;
      })
    .catch(error => {
      message = false;
      //console.log(error)
    });

    await axios.patch(`${process.env.REACT_APP_MAIN_URL}/users/update-cin`,props.FullData2,
      {
          headers: {
              'x-access-token': localStorage.getItem('token'),
              "Access-Control-Allow-Origin": "*"
          }
      })
      .then((response) => {
        //console.log(response);
      })
      .catch((err) => {
        //console.log(err);
      })
  return message;
} 