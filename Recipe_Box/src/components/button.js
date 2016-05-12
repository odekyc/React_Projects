import React from 'react';
import { Component } from 'react';

export default class Button extends Component {

     render() {
        return (
        <div>
        <button type="button" onClick={this.displayForm} >Add Recipe</button>
       </div>
    );
  }

  displayForm(){
  	$('#newrecpe').css('visibility', 'visible');
  }

}