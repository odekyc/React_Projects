export default function addState(state=[{dish: 'Spaghetti'}, {dish: 'Onion Pie'}], action){

 switch(action.type){
 	case 'ADD':
 	   alert("Add case");
       alert(action.payload.dish);
 
 	   return [...state, action.payload];
 
    default:
    return state;
   }
}