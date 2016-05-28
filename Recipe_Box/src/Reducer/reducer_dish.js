export default function (state=[{dish: 'Spaghetti',in:['Noodles', 'Tomato Sauce', '(Optional) Meatballs']}, {dish: 'Onion Pie', in: ['Onion','Pie Crust']}], action){

 switch(action.type){
 	case 'ADD':
       alert(action.payload.in[0]);

 	   return [...state, action.payload];
 
    default:
    return state;
   }
}