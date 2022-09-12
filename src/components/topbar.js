
import "../resources/topbar.css"

function Topbar (props){

    
    return(
        <div className='navbar'>
            <div className='name'>
                <div className='name_text'>Memory Cards</div>
            </div>
            <div className="level">
                <div className="level_text">Difficulty</div>
                <div className="level_select"> 
                    <select name="dificulty" id="dificulty" value={props.diff} onChange={(e)=>{let value =e.target.value; props.setDifficulty(value)}}>
                        <option value="6">Easy</option>
                        <option value="12">Medium</option>
                        <option value="18">Hard</option>
                        
                    </select>
                </div>

            </div>
            <div className='score'>
                <div id='score_actual'>Actual Score: {props.actualScore}</div>
                <div id='highes_score'> Highest Score: {props.highScore}</div>
            </div>
        </div>
    );

}

export {Topbar}; 