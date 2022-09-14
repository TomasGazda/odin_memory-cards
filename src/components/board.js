import React, { useState,useEffect,useRef } from 'react';
import "../resources/board.css"
import { Card } from './card';






function Board (props){
    
    const [final,setFinal] = useState([]);
    const [usedIndeces,setUsedIndeces] = useState([]);
    const [lastCard,setLastCard]= useState([]);

    const firstUpdate = useRef(true);
    useEffect(() => {
        
        if(firstUpdate.current){
            firstUpdate.current = false;
            
        }else
        {
        setFinal([]);
            for (let index = 0; index < props.diff; index++) {
                let random_index;
                do{
                random_index = Math.floor(Math.random() * (props.array.length));
                }while(usedIndeces.indexOf(random_index)!==-1)
                setUsedIndeces(usedIndeces.push(random_index));
                let item = props.array[random_index];
                setFinal(final => [...final,<Card key={item.index} id={item.index} image={item.image} name={item.name} clickCard={(id)=>{cardPressed(id)}}></Card>]);     
            }
            setUsedIndeces([]);
        }

        
    }, [props.diff]);

    
    
    function cardPressed(id) {
        if(lastCard.indexOf(id) !== -1){
            const empty = [];
            setLastCard(empty);
            props.endGame(true);
         }else{    
             setLastCard(lastCard.push(id));
             props.updateScore();
             
         }
    }

    if(final.length === 0){
        
        return (
            <div>Loading...</div>
        )
    }else{
        
    return(
        <div className='board'>
            {final} 
        </div>
    );
    }

}

function changeOrder(array){
    
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
 
}

export {Board}; 