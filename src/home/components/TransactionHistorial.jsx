import { useSelector } from "react-redux";
import { Restaurant } from "./Restaurant";
import imagen from "../../assets/faye.png";

export const TransactionHistorial = () => {

    const { restaurants } = useSelector(state => state.restaurant);
    console.log(restaurants.length);

    return (
        <>
            <h2>Historial de b&uacute;squedas</h2>

            {
                (restaurants.length === 0)
                    ?
                    <div className="noHistoryImg">
                        <div className="noHistoryImg">
                            <p>
                                NO HAY NADA QUE MOSTRAR
                            </p>
                            <img src={imagen} alt="ups, algo pasó con la img." />
                        </div>
                    </div>
                    : restaurants.map((rest, i) => (
                        <Restaurant
                            key={`${rest.rating_color}${rest.rating}${rest.votes}${i}`}
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
