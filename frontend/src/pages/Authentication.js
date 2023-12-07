  import { json,redirect } from 'react-router-dom';
  import AuthForm from '../components/AuthForm';

  function AuthenticationPage() {
    return <AuthForm />;
  }
  export default AuthenticationPage;


  export async function AuthSubmitAction({request}){
    const searchParamsObj = new URL(request.url).searchParams;
    const data = await request.formData();
    const mode = searchParamsObj.get('mode') || 'login';

    if(mode !== 'login' && mode !== 'signup'){
      throw json({message:"Unsupported Sign-up or Login"},{status:422})
    }

    const authData = {
      email:data.get('email'),
      password:data.get('password')
    }
    
    const response = await fetch(`http://localhost:8080/${mode}`,{
      method: 'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(authData)
    })
    if(response.status === 422 || response.status === 401){
      return response
    }
    if(!response){
      throw json({message:"Invalid Authentication"},{status:500})
    }
    return redirect('/')
  }