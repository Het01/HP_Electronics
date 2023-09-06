import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { useToast } from '@chakra-ui/react'
// import Footer from '../components/Footer';

function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const toast = useToast()

  // const [error , seterror] = useState("noerror");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    })

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      // alert(json.errors[0].msg);
      <div>
        {toast({
          title: json.errors[0].msg,
          // position: "top",
          status: `error`,
          isClosable: true,
        })}
      </div>
    }
    else {
      localStorage.setItem("userEmail", credentials.email)   // For check out option in the last 
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  // 
  return (
    <div >
      <div style={{ "background-image": "url(https://img.freepik.com/free-vector/gradient-futuristic-background-with-connection-concept_23-2149104856.jpg?w=360)", "backgroundSize": "cover", "minHeight": "100vh" }}>
        <div><Header /></div>
        <section >
          <div className="container mt-5 pt-5" >
            <div className="row" style={{ "border-radius": "10%" }}>
              <div className='col-12 col-sm-8 col-md-6 m-auto'>
                <div className="card border-0 shadow" >
                  <div className="card-body" style={{ backgroundColor: "skyblue" }}>

                    <form onSubmit={handleSubmit}>
                      <div className='text-center'>
                        <h1>Login</h1>
                        <hr />
                      </div>

                      <div className="form-floating mb-3">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" name='email' value={credentials.email} onChange={onChange} />
                        <label for="floatingInput">Email address</label>
                      </div>
                      <div className="form-floating mb-3">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" name='password' value={credentials.password} onChange={onChange} />
                        <label htmlFor="floatingPassword">Password</label>
                      </div>
                      <div className='d-flex' style={{ justifyContent: "space-between", alignItems: "center" }}>
                        <button type="submit" className="btn" style={{backgroundColor:"purple" , color:"white"}}>Submit</button>
                        <div><Link to="/createuser" className=''>Don't have Account? <u>Signup</u></Link></div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <Footer/> */}
      </div>
    </div>
  )
}

export default Login