export default function (state=[], action){

   switch(action.type){
 	case 'ADDINGRE':
 	alert("add ingre");
    alert(action.payload.ingre);

    return state;
   }

   return state;
}