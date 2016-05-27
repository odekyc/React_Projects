export function addState(newstate){
    

	return {
      type: 'ADD',
      payload: newstate
	};
	
}

export function addIngre(newIngre){

    return {
      type: 'ADDINGRE',
      payload: newIngre
	};

}