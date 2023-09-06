import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
// import Carousel from '../components/Carousel'

function Home() {

    const [foodCat, setfoodCat] = useState([]);
    const [foodItem, setfoodItem] = useState([]);

    // search
    const [search, setsearch] = useState("")

    const loadData = async () => {
        const response = await fetch("http://localhost:5000/api/foodData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }

        });

        const respons = await response.json();
        // console.log(respons[0] , respons[1]);

        setfoodItem(respons[0]);
        setfoodCat(respons[1]);
    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <>
            <div>
                <Header />
            </div>

            {/* Carousel */}
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
                    <div className="carousel-inner" style={{ maxHeight: "500px" }}>
                        <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
                            <div className="d-flex justift-content-center" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e)=>{setsearch(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://m.media-amazon.com/images/I/313DoICHT0L.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://m.media-amazon.com/images/I/41vVavfyzxS._SX300_SY300_QL70_FMwebp_.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                        <div className="carousel-item">
                            <img src="https://img1.gadgetsnow.com/gd/images/products/additional/large/G306210_View_1/mobiles/smartphones/apple-iphone-13-pro-128-gb-sierra-blue-6-gb-ram-.jpg" className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (

                                <div className='row mb-3'>
                                    <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                                    <hr />
                                    {foodItem !== [] ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItems={filterItems}
                                                        foodName={filterItems.name}
                                                        options={filterItems.options[0]}
                                                        foodImg={filterItems.img}
                                                        foodDes={filterItems.description} />
                                                </div>
                                            )
                                        })

                                        : ""}
                                </div>
                            )
                        })
                        : ""
                }

            </div>

            <div>
                <Footer />
            </div>
        </>
    )
}

export default Home