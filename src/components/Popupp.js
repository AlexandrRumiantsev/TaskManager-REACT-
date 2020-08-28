import React, { useState, useEffect } from 'react';


export default  function Popupp(props) {
  
  const closePopupp = () => {
    props.menu.setState(
          { popuppDisplay: 0 }
     );
  };

  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    props.store.dispatch({
		      type: 'ADD_ITEM',
		      data: {
		        'title': value,
		        'store': props.store,
		        'callback': function(data , error){
		        	if(data=='ERROR'){
		        		setError(error);
		        		console.log(data);
		        	}else{
		        		props.api.state.data.push({
					  		id: 9999, title: value
					  	});
					  	props.api.setState({
					  		data: props.api.state.data
					  	})
					  	props.menu.setState(
					       { popuppDisplay: 0 }
					    );
		        	}

		        }
		      }
	    	})
  }
	  return (
	  	<form class='popupp' onSubmit={handleSubmit}>
	        <span  
	            class='popupp__close'
	            	onClick={ closePopupp }
	            >   
	        </span>
            <label>
	          Краткое описание:
	          <input 
		          type="text" 
		          value={value} 
		          onChange={handleChange}
	          />
	        </label>
	        <input type="submit" value="Submit" />
	        <p class='popupp__error'>
	          {error}
	        </p> 
	    </form>
	  );
}
