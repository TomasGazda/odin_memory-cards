
import "../resources/card.css"

function Card (props){

    return(
        <div className='card' onClick={() => props.clickCard(props.id)} id={props.id}>
            <div className='card_image'>
                <img src={props.image} alt={props.name}></img>
            </div>
            <div className='card_name'>{props.name}</div>
        </div>
    );
}

export {Card}; 




