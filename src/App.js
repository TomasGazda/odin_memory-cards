
import './App.css';
import React, { useState, useEffect,useRef } from 'react';
import { Topbar } from './components/topbar';
import { Card } from './components/card';
import * as uuid from 'uuid';

const data = [{
  "index":uuid.v1(),
  "image":"./images/Airedale-Terrier.jpg",
  "name":"Airedale Terrier"
},
{
  "index":uuid.v1(),
  "image":"./images/labrador-retriever.jpg",
  "name":"Labrador Retriever"
},
{
  "index":uuid.v1(),
  "image":"./images/german-shepherd.jpg",
  "name":"German Shepherd"
},
{
  "index":uuid.v1(),
  "image":"./images/golden-retriever.jpg",
  "name":"Golden Retriever"
},
{
  "index":uuid.v1(),
  "image":"./images/bulldog.jpg",
  "name":"Bulldog"
},
{
  "index":uuid.v1(),
  "image":"./images/poodle.jpg",
  "name":"Poodle"
},
{
  "index":uuid.v1(),
  "image":"./images/rottweiler.jpg",
  "name":"Rottwiler"
},
{
  "index":uuid.v1(),
  "image":"./images/boxer.jpg",
  "name":"Boxer"
},
{
  "index":uuid.v1(),
  "image":"./images/great-dane.jpg",
  "name":"Great Dane"
},
{
  "index":uuid.v1(),
  "image":"./images/siberian-husky.jpg",
  "name":"Siberian Husky"
},
{
  "index":uuid.v1(),
  "image":"./images/shih-tzu.jpg",
  "name":"Shih Tzu"
},
{
  "index":uuid.v1(),
  "image":"./images/pug.jpg",
  "name":"Pug"
},
{
  "index":uuid.v1(),
  "image":"./images/border-collie.jpg",
  "name":"Border Collie"
},
{
  "index":uuid.v1(),
  "image":"./images/mastiff.jpg",
  "name":"Mastiff"
},
{
  "index":uuid.v1(),
  "image":"./images/chihuahua.jpg",
  "name":"Chihuahua"
},
{
  "index":uuid.v1(),
  "image":"./images/shiba-inu.jpg",
  "name":"Shiba Inu"
},
{
  "index":uuid.v1(),
  "image":"./images/american-akita.jpg",
  "name":"Akita"
},
{
  "index":uuid.v1(),
  "image":"./images/dalmatian.jpg",
  "name":"Dalmatian"
}
];
function App() {

  //keep maximum score
   const [maxScore,setMaxScore] = useState(0);
  // keep actual score
   const [score,setScore] = useState(0);
  //keep level of dificulty
   const [level,setLevel] = useState(6);
  // keep end of game
  const [end,setEnd] = useState(false);
  const [final,setFinal] = useState([]);
  const [usedIndeces,setUsedIndeces] = useState([]);
  const [lastCard,setLastCard]= useState([]);
  



const firstUpdate = useRef(true);
useEffect(() => {    
  if(!firstUpdate.current){   
    if (maxScore>0){setEnd(true);}   
    
    setFinal([]);
      for (let index = 0; index < level; index++) {
          let random_index;
          do{
          random_index = Math.floor(Math.random() * (data.length));
          }while(usedIndeces.indexOf(random_index)!==-1)
          setUsedIndeces(usedIndeces.push(random_index));
          let item = data[random_index];
          setFinal(final => [...final,<Card key={item.index} id={item.index} image={item.image} name={item.name} clickCard={() => setLastCard(lastCard => [...lastCard,item.index])}></Card>]);     
      }
      setUsedIndeces([]);
  }
}, [level]);

useEffect(() =>{
  if(!firstUpdate.current){
   if(score>maxScore){
    setMaxScore(score);
   }
  }
    
},[score]);
  //setting new game and checking new high score at the end of game
  useEffect(()=>{
    if(firstUpdate.current){
      firstUpdate.current = false;
      
    }else
    {
      if(end){
        if(score>=maxScore){
          alert('New High Score! Congrats!');
        }
        if(score > 0){
          alert('New Game!');
        }
        setScore(0);
        setEnd(false);
        setLastCard(lastCard => []);
        
      }
      
    } 


  },[end]);

useEffect(() => {
  if(lastCard.length>0){
    if(lastCard.indexOf(lastCard[lastCard.length-1])!==-1 && lastCard.indexOf(lastCard[lastCard.length-1])!==lastCard.length-1){
      setEnd(true);
    }else{
      setScore(sc => sc+1)
      let newArray=[];
      
      for (let index = 0; index < final.length; index++) {
        let random_index;
        do{
        random_index = Math.floor(Math.random() * (final.length));
        }while(usedIndeces.indexOf(random_index)!==-1)
        setUsedIndeces(usedIndeces.push(random_index));
        newArray.push(final[random_index]);
      }
      setUsedIndeces([]);
      setFinal(final => newArray);



    }
  }
  
}, [lastCard]);



  
  
  return (
    <div className="App">
      <Topbar highScore = {maxScore} actualScore={score} diff={level} setDifficulty={(diff)=>{setLevel(diff)}}></Topbar>
      {/* <p>{score}</p>
      <button onClick={()=>{setScore(score+1)}}>Score</button> */}
      <div className='board'>
          {final}
      </div>
       {/* <Board  endGame={(didEnded)=>(setEnd(didEnded))} updateScore={()=>{setScore(score+1)}} diff={level} array={data} ></Board>  */}
    </div>
  );
}

export default App;
