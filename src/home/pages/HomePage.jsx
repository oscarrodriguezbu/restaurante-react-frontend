import React, { useEffect, useState } from 'react';
import '../HomePage.css';
import { Navbar, Restaurant } from '../';
import { restaurantsCitiesApi } from '../../api';
import { Audio } from 'react-loader-spinner';
import Swal from 'sweetalert2';
import { TransactionHistorial } from '../components/TransactionHistorial';


export const HomePage = () => {

    const [restaurant, setRest] = useState([]);
    const [id, setId] = useState(0);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useState([0, ""]);
    const [loader, setLoader] = useState(false);
    const [searchHistorial, setsearchHistorial] = useState(false);

    useEffect(() => {
        getRestaurants();
    }, [query]);

    const getRestaurants = async () => {
        if (!(query[0] === 0 && query[1] === "")) {
            try {
                const { data } = await restaurantsCitiesApi.get(`/v2.1/search?entity_id=${query[0]}&entity_type=city&q=${query[1]}&count=100`);
                setRest(data.restaurants);
                setLoader(false);
            } catch (error) {
                console.log(error);
                setLoader(false);
            }
        }

        if ((query[0] === 0 && query[1] === "" && loader === true && searchHistorial === false)) {
            Swal.fire({
                title: 'Error en la b&uacute;squeda',
                text: 'Ingresa un valor para empezar la búsqueda',
                icon: 'warning',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#03B103'
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoader(false);
                }
            });
        }
    };

    const updateID = e => {
        setId(e.target.value);
    }

    const updateSearch = e => {
        setSearch(e.target.value);
    }

    const getSearch = (e) => {
        e.preventDefault();
        setLoader(true);
        setQuery([id, search]);
        setsearchHistorial(false);
    }

    const geHistorial = e => {
        e.preventDefault();
        setsearchHistorial(true);    
    }


    return (
        <div className="App">
            <Navbar />
            <div className="jumbotron">
                <div className="logo">RESTAURANT-APP</div>
                <h1>Encuentra los mejores restaurantes en tu ciudad</h1>
                <form className="searchBar" onSubmit={getSearch}>
                    <div>
                        <select id="select_id" className="city" onChange={updateID}>
                            <option value="0" hidden>Selecciona la ciudad</option>
                            <option value="4">Bengaluru</option>
                            <option value="256" >Vancouver</option>
                            <option value="1">Delhi</option>
                            <option value="6">Hyderabad</option>
                            <option value="5">Pune</option>
                            <option value="11290">Trivandrum</option>
                            <option value="7">Chennai</option>
                            <option value="11">Ahmedabad</option>
                        </select>
                        <input id="getText" type="text" className="restaurant" placeholder="Busca tu restaurante" onChange={updateSearch} />
                        <button id="getMessage" className="search-btn">Buscar</button>
                    </div>
                </form>
                <button id="getHistorial" className="search-btn" onClick={geHistorial}>Historial b&uacute;squedas</button>
            </div>

            {
                (loader === false)
                    ? (searchHistorial === true)
                        ? <TransactionHistorial />
                        :
                        restaurant.map(rest => (
                            <Restaurant
                                key={rest.restaurant.id}
                                name={rest.restaurant.name}
                                thumb={rest.restaurant.thumb}
                                locality={rest.restaurant.location.locality}
                                address={rest.restaurant.location.address}
                                cuisines={rest.restaurant.cuisines}
                                cost={rest.restaurant.average_cost_for_two}
                                rating={rest.restaurant.user_rating.aggregate_rating}
                                votes={rest.restaurant.user_rating.votes}
                                rating_color={rest.restaurant.user_rating.rating_obj.bg_color.type}
                            />
                        ))

                    : <div className="loader">
                        <Audio
                            height="100"
                            width="100"
                            color="#03B103"
                            ariaLabel="audio-loading"
                            wrapperStyle={{}}
                            wrapperClass="wrapper-class"
                            visible={true}
                        />
                    </div>
            }
        </div>

    )
}
