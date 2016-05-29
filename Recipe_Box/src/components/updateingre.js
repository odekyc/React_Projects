import React from 'react';
import { Component } from 'react';

export default class Editingre extends Component {

     render() {
        return (
        <div>
        <div id="editbox">
        <center>
        Ingredients:
        </center>

        <form >
         <div id="editingreX" onClick={ this.hideEditBox}>
         <center>
         <p> X </p>
         </center>
         </div>
         <textarea rows="7" cols="11" id="newingredients">
         </textarea>

         <input type="submit" id="submitnewingre"></input>
        </form>
        </div>
       </div>
    );
  }

  hideEditBox(){
     $('#editbox').css('visibility', 'hidden');
  }


}