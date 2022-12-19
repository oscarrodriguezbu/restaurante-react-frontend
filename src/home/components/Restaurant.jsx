import { useDispatch } from "react-redux";
import { onActiveRestaurant } from "../../store";

export const Restaurant = (props) => {

	const { name, thumb, locality, address, cuisines, cost, rating, votes, rating_color } = props;
    const dispatch = useDispatch();

	const handleEntryClick = (e) => {     
        dispatch(onActiveRestaurant(props));
    }

	
	return (
		<div className="restaurant-tile" onClick={handleEntryClick}>
			<img alt="" src={thumb} className="rest-img" />
			<div className="rest-rating">
				<p style={{ backgroundColor: `${rating_color}` }}>{rating}</p>
				<div>{votes} votos</div>
			</div>
			<div className="rest-details">
				<h2 className="rest-name">{name}</h2>
				<div className="rest-loc">{locality}</div>
				<div className="rest-add">{address}</div>
				<hr />
				<div className="rest-cusines"><strong>COCINA:</strong> {cuisines}</div>
				<div className="rest-cost"><strong>PRECIO PARA DOS:</strong> Rs.{cost}</div>
			</div>
		</div>
	)
}


