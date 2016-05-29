export default function (state=[{dish: 'Spaghetti',in:['Noodles', 'Tomato Sauce', '(Optional) Meatballs']}, {dish: 'Onion Pie', in: ['Onion','Pie Crust']}], action){

 switch(action.type){
 	case 'ADD':
     

 	   return [...state, action.payload];
 
    default:
    return state;
   }
}

