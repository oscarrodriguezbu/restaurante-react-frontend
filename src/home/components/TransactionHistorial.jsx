import { useSelector } from "react-redux";
import { Restaurant } from "./Restaurant";

export const TransactionHistorial = () => {

    const { restaurants } = useSelector(state => state.restaurant);
    console.log(restaurants);

    return (
        <>
            <h2>Historial de b&uacute;squedas</h2>

            {
                restaurants.map(rest => (
                    <Restaurant
                        key={`${rest.rating_color}${rest.rating}${rest.votes}`}
                        name={rest.name}
                        thumb={rest.thumb}
                        locality={rest.locality}
                        address={rest.address}
                        cuisines={rest.cuisines}
                        cost={rest.cost}
                        rating={rest.rating}
                        votes={rest.votes}
                        rating_color={rest.rating_color}
                    />
                ))
            }
        </>
    )
}
