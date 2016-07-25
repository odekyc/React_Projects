export function addState(newstate){
    

	return {
      type: 'ADD',
      payload: newstate
	};
	
}


export function selectDish(thisdish){

  

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
       type: 'UPDATE_STATE',
       payload: newState
	};
}

export function getSelectDish(){

	return{
      type: 'GETSELECTDISH'
	};
}