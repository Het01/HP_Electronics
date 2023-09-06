import React, { useState, useRef, useEffect } from 'react'
import { useCart, useDispatchCart } from './ContextReducer';

function Card(props) {

    let dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let option = Object.keys(options);

    const priceRef = useRef();

    const [qty, setqty] = useState(1);
    const [size, setsize] = useState("")

    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItems._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.foodItems._id, price: finalPrice, qty: qty })
                return
            }
            else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodItems.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }

        await dispatch({ type: "ADD", id: props.foodItems._id, name: props.foodName, price: finalPrice, qty: qty, size: size });
        console.log(data);
    }

    useEffect(() => {
        setsize(priceRef.current.value)
    }, [])

    let finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div className="card mt-5" style={{ "width": "18rem", "maxHeight": "450px", "border": "0", "border-bottom-left-radius": "5%", "border-bottom-right-radius": "5%", "backgroundColor": "skyblue" }}>
                <img src={props.foodImg} className="card-img-top" alt="" style={{ height: "180px", objectFit: "fill" }} />
                <div className="card-body rounded-bottom">
                    <h5 className="card-title">{props.foodName}</h5>
                    <p className="card-text" style={{ "height": "70px" }}>{props.foodDes}</p>
                    <div className="container w-100">
                        <select className='m-1 h-100' style={{ "backgroundColor": "skyblue" }} onChange={(e) => setqty(e.target.value)}>
                            {Array.from(Array(5), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}> {i + 1} </option>
                                )
                            })}
                        </select>

                        <select className='m-1 h-100' style={{ "backgroundColor": "skyblue" }} ref={priceRef} onChange={(e) => setsize(e.target.value)}>
                            {option.map(data => {
                                return (<option key={data} value={data}>{data}</option>)
                            })}
                        </select>

                        <div className="d-inline m-1 h-100 fs-5">
                            ₹{finalPrice}/-
                        </div>
                    </div>
                    <hr />
                    <button className='btn justify-center ms-2 mb-2' style={{ backgroundColor: "purple", color: "white", display: "flex", alignItems: "center" }} onClick={handleAddToCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-check-fill d-flex" viewBox="0 0 16 16">
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 1 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 1 1 0-2z" />
                        </svg>
                        <span style={{ marginLeft: "4px" }}>Add to Cart</span>
                    </button>

                </div>
            </div>
        </div>
    )
}

export default Card