
import './App.css';
import React, { useState, useEffect,useRef } from 'react';
import { Topbar } from './components/topbar';
import { Board } from './components/board';
import { Card } from './components/card';
import * as uuid from 'uuid';

const data = [{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 1"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 2"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 3"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 4"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 5"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 6"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 7"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 8"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 9"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 10"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 11"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 12"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 13"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 14"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 15"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 16"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 17"
},
{
  "index":uuid.v1(),
  "image":"./images/test.png",
  "name":"test 18"
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
        
  if(firstUpdate.current){
      firstUpdate.current = false;
      
  }else
  {
  setFinal([]);
      for (let index = 0; index < level; index++) {
          let random_index;
          do{
          random_index = Math.floor(Math.random() * (data.length));
          }while(usedIndeces.indexOf(random_index)!==-1)
          setUsedIndeces(usedIndeces.push(random_index));
          let item = data[random_index];
          setFinal(final => [...final,<Card key={item.index} id={item.index} image={item.image} name={item.name} clickCard={(id)=>{cardPressed(id)}}></Card>]);     
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
  
  //reseting game if level changed
  useEffect(()=>{
    if(!firstUpdate.current){
      setEnd(true);
    }
  },[level]);

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
        setScore(0);
        setEnd(false);
        setLastCard(lastCard => []);
        alert('New Game!');
      }
      
    } 


  },[end]);

  function cardPressed(id) {
    if(lastCard.indexOf(id) !== -1){
        setEnd(true);
     }else{    
         setLastCard(lastCard => [...lastCard,id]);
         setScore(score => score+1);
         
     }
}



  
  
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
