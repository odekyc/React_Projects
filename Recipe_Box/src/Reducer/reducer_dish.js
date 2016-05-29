export default function (state=[{dish: 'Spaghetti',in:['Noodles', 'Tomato Sauce', '(Optional) Meatballs']}, {dish: 'Onion_Pie', in: ['Onion','Pie Crust']}], action){

 switch(action.type){
 	case 'ADD':
     

 	   return [...state, action.payload];
 
    case 'DISH_TO_DELETE':

       var index=state.indexOf(action.payload);
      

       return state.slice(0, index).concat(state.slice(index+1));

    default:
    return state;
   }
}

