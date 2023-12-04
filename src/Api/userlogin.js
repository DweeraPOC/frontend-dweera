import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default async function Apiuserlogin(props)
{
    let respmessage ="";
    async function userlogin() {

    await axios.post(process.env.REACT_APP_MAIN_URL+"/users/login", props.logingdata)
    .then((response) => {
        //console.log("userlogged",response.data.user_logged);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userID', response.data.user_logged.Id);   
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('Email', response.data.user_logged.Email);
        if (response.data.user_logged.FirstName == null)
        { localStorage.setItem('Completeprofile',false);}
        else {
          localStorage.setItem('Completeprofile',true);
        }
        respmessage="user login success";
        return response;
      })
    .catch(error => {
        //console.log("userlogin",error);
        if(error.response.data.message=="This user Email isn't registered")
        {
          respmessage="This user Email isn't registered ";
        }
        else if (error.response.data.message=="Incorrect user password")
        {  respmessage="Incorrect user password";
          //alert("the password for this user account is incorrect"); 
        }
    });
    //console.log(respmessage)
    }
    await userlogin()
    return respmessage;
} 