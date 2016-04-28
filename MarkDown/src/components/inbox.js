import React, { Component } from 'react';

class Inbox extends Component{

    render(){
      return (
      	<div >
         <p>Headings</p>
         <p>========</p>
         <p>Sub-heading</p>
         <p>---------------</p>
         <p>### Another deeper heading</p>
         <br />
         <p>Paragraphs are separated</p>
         <p>by a blank line.</p>
         <br />
         <p>Leave 2 spaces at the end of a line to do a  </p>
         <p>line break</p>
         <br />
         <p>Text attributes *italic*, **bold**, </p>
         <p>`monospace`, ~~strikethrough~~ .</p>
         <br />
         <p>Shopping List</p>
         <br />
         <br />
         <ul>
         <br />
             <li>apples</li>
             <br />
             <li>oranges</li>
             <br />

             <li>pears</li>
             <br />
          </ul> 
                
        </div>
      );
         	
     }
	
};

export default Inbox;