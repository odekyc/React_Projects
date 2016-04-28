import React, { Component } from 'react';

class Paragraphs extends Component{

    render(){
      return (
      	<div >
         <p>Paragraphs are separated by a blank line.</p>
         <p>Leave 2 spaces at the end of a line to do a line break.</p>
         <p>Text attributes <i>italic</i>, <strong>bold</strong>, <span id="red">monospace</span>, <del>strikethrough</del> .</p>
         <p>Shopping List:</p>
          <ul>
             <li>apples</li>
             <li>oranges</li>
             <li>pears</li>
          </ul> 
          <p>Numbered List:</p>
          <ol>
             <li>apples</li>
             <li>oranges</li>
             <li>pears</li>
          </ol> 

          <p>The rain---not the reign---in Spain.</p>

           <a href="http://www.w3schools.com/html/">Herman Fassett</a> 

        </div>
      );
         	
     }
	
};

export default Paragraphs;