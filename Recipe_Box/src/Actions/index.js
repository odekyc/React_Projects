export function addState(newstate){
    

	return {
      type: 'ADD',
      payload: newstate
	};
	
}


export function selectDish(thisdish){

    alert("inside selectDish");

	return{
      type: 'DISH_SELECTED',
      payload: thisdish
	};
}
