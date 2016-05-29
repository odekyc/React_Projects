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
         
         <textarea rows="6" cols="10" id="newingredients">
         </textarea>
        </form>
        </div>
       </div>
    );
  }


}