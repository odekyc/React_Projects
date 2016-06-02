export default function (state=[{dish: 'Spaghetti',in:['Noodles', 'Tomato Sauce', '(Optional) Meatballs']}, {dish: 'Onion_Pie', in: ['Onion','Pie Crust']}], action){

 switch(action.type){
 	case 'ADD':
     

 	   return [...state, action.payload];
 
    case 'DISH_TO_DELETE':

       var index=state.indexOf(action.payload);
      

       return state.slice(0, index).concat(state.slice(index+1));

    case 'UPDATE_STATE':
        var dishname=action.payload.dish;
        var index=null;
        var i;
        for(i=0; i<state.length; i++ ){
        	if(state[i].dish===dishname){
        		index=i;
        		state[i].in=action.payload.in;
        	}
        }
        alert("index"+index);
        return state;

    default:
    return state;
   }
}

