import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header';
import { useToast } from '@chakra-ui/react'

function Signup() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate();
    const toast = useToast()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("https://hp-electronics-api.vercel.app/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            // alert('Enter Valid Details');
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
            navigate("/login");
        }
    }

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div style={{ "background-image": "url(https://img.freepik.com/free-vector/gradient-futuristic-background-with-connection-concept_23-2149104856.jpg?w=360)", "backgroundSize": "cover", "minHeight": "100vh" }}>
            <div><Header /></div>
            <section>
                <div className="container mt-5 pt-5">
                    <div className="row" >
                        <div className='col-12 col-sm-8 col-md-6 m-auto'>
                            <div className="card border-0 shadow">
                                <div className="card-body" style={{ backgroundColor: "skyblue" }}>
                                    <form onSubmit={handleSubmit}>
                                        <div className='text-center'>
                                            <h1>SignUp</h1>
                                            <hr />
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingName" placeholder="Het" name="name" value={credentials.name} onChange={onChange} />
                                            <label htmlFor="floatingName">Name</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
                                            <label htmlFor="floatingInput">Email address</label>
                                            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="password" className="form-control" id="floatingPassword" placeholder="PassWord" name='password' value={credentials.password} onChange={onChange} />
                                            <label htmlFor="floatingPassword">Password</label>
                                        </div>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingAddress" placeholder="Address" name='geolocation' value={credentials.geolocation} onChange={onChange} />
                                            <label htmlFor="floatingAddress">Address</label>
                                        </div>

                                        <div className="d-flex" style={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <button type="submit" className="btn" style={{backgroundColor:"purple", color:"white"}}>Submit</button>
                                        <Link to="/login" className=''>Already a User? <u>Login</u></Link>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Signup
