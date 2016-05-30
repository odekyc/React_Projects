import React from 'react';
import { Component } from 'react';
import { updateState } from '../Actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getSelectDish } from '../Actions/index';


class Editingre extends Component {

    constructor(){
      super();

      this.submitEditBox=this.submitEditBox.bind(this);
    }

     render() {
        return (
        <div>
        <div id="editbox">
        <center>
        Ingredients:
        </center>

        <form onSubmit={this.submitEditBox} >
         <div id="editingreX" onClick={ this.hideEditBox}>
         <center>
         <p> X </p>
         </center>
         </div>
         <textarea rows="7" cols="11" id="newingredients">
         </textarea>
         

          <input type="submit" id="submitnewingre" ></input>
        </form>
        </div>
       </div>
    );
  }

  hideEditBox(){
     $('#editbox').css('visibility', 'hidden');
  }

  submitEditBox(event){
      
      alert("submiteditbox");
      
    
      let newingres=$('#newingredients').val();
      this.props.getSelectDish();
       
      let curdish=this.props.myactivedish[0];
      let dishname=curdish.dish;
       
      alert("editbox dishname"+ curdish.dish);

      newingres=newingres.split(',');

      alert(typeof newingres);
      
      this.props.updateState({dish: dishname, in: newingres})
      
      let hi=this.props.mydishes[0];

      alert(hi.in);

      $('#editbox').css('visibility', 'hidden');
      $('#ingredientBox').css('visibility', 'hidden');

      event.preventDefault();
  }


}

function mapStateToProps(state){
     
     return{
        mydishes: state.mydish,
        myactivedish: state.activedish

     };
  
}

function mapDispatchToProps(dispatch){



  return bindActionCreators({ updateState: updateState, getSelectDish: getSelectDish }, dispatch);

}



export default connect(mapStateToProps, mapDispatchToProps)(Editingre);
