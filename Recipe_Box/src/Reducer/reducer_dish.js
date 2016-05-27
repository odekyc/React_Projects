export default function (state=[{dish: 'Spaghetti'}, {dish: 'Onion Pie'}], action){

 switch(action.type){
 	case 'ADD':
 	 
 
 	   return [...state, action.payload];
 
    default:
    return state;
   }
}