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


	return{
      type: 'DISH_TO_DELETE',
      payload: thisdish
	};
}

export function updateState(newState){

	return{
       type: 'UPDATED_STATE',
       payload: newState
	};
}
