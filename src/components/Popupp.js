import React, { Component } from 'react'

export default  function Popupp(props) {

  const closePopupp = () => {
    console.log('closePopupp');
    console.log(props);
    props.menu.setState(
          { popuppDisplay: 0 }
     );
  };

  const myRef = React.createRef();

  const addTask = (e) => {
  	props.api.state.data.push({
  		id: 9999, title: myRef.current.value
  	});
  	
    props.store.dispatch({
		      type: 'ADD_ITEM',
		      data: {
		        'title': myRef.current.value,
		        'store': props.store
		      }
	    	})
 
    props.menu.setState(
          { popuppDisplay: 0 }
     );
  };
	  return (
	    <div id='popupp' class='popupp'>
	        <span  
	            class='popupp__close'
	            	onClick={ closePopupp }
	            >   
	        </span>
	        <p>Краткое описание</p>
	        <p><input ref={myRef} type='text'/></p>
	        <p class='popupp__error'></p>
	        <button 
		        class='popupp__send'
		        onClick={ addTask }
		    >
	          Создать
	        </button>
	    </div>
	  );
}




