export default function (state=[], action){

 switch(action.type){
 	case 'DISH_SELECTED':
       
 	   return [action.payload];

 	case 'GETSELECTDISH':

 	   return [action.payload];
 
    default:
    return [];
   }
}