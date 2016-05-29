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


export function deleteState(thisdish){

    alert("inside deleteState");

	return{
      type: 'DISH_TO_DELETE',
      payload: thisdish
	};
}
