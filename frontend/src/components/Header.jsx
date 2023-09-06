// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import React, {useState}from 'react';
import { Link , useNavigate} from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReducer';
import { Button } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import { useColorMode } from '@chakra-ui/react'
import { purple } from '@mui/material/colors';


function Header() {
  const { colorMode, toggleColorMode } = useColorMode()

  let data = useCart();

  const [cardView, setcardView] = useState(false)

  const navigate = useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authToken');
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme={colorMode === 'dark' ? 'dark' : undefined}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 mx-5" to="/">HP Electronics</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorder">My Order</Link>
            </li>
            : ""}
            </ul>
            
            {(!localStorage.getItem("authToken"))?
            <div className='d-flex'>
              <Button className='btn mx-1' leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    size='md'
                    variant='solid'
                    colorScheme='purple'
                    backgroundColor={purple}
                    onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
              <Link className='btn mx-1' style={{ backgroundColor: "purple", color: "white" }} to="/login">Login</Link>
              <Link className='btn mx-1' style={{ backgroundColor: "purple", color: "white" }} to="/createuser">SignUp</Link>
              </div>
            : 
            <div className='d-flex'>
              <Button className='btn mx-1' leftIcon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                    size='md'
                    variant='solid'
                    colorScheme='purple'
                    onClick={toggleColorMode}>
                    {colorMode === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
              <div className='btn mx-2' style={{ backgroundColor: "purple", color: "white" }} onClick={()=>setcardView(true)}>
                My Cart {" "}
                {data.length>=1 ? <Badge pill bg=''>{data.length}</Badge> :""} 
              </div>
              {cardView ? <Modal onClose={()=>setcardView(false)}> <Cart/> </Modal> : null}
              <div className='btn mx-2' style={{ backgroundColor: "purple", color: "white" }} onClick={handleLogout}>Log Out</div>
              </div>
            }
              
            

          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;