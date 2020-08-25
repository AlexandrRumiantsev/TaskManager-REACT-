import {
  URL
} from '../constants/Api'


const ajax = function(type , component , url , param , action , store){
    

    var request = new XMLHttpRequest();
      request.open(type, url , true);
      let actionAJAX = action;

        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        
        request.onreadystatechange = function () {
        if (request.readyState === 4) {
          if (request.status == 200 && request.status < 300){
            if(
              actionAJAX == 'addItem' || 
              actionAJAX == 'editItem' ||
              actionAJAX == 'delItem'
            ){
                document.location.reload(true)
            }else{
              if(JSON.parse(request.response)['data']){
                
                component.setState(
                  { data: 0 }
                )
              }
              component.setState(
                { data: JSON.parse(request.response)['data'] }
              )
            }   
            }else{
              document.getElementsByClassName('popupp__error')[0].innerHTML = JSON.parse(request.response)['error'];   
            }
          }
        } 
       
      
      if(param)
        request.send(param)
      else request.send()
}


export function getData(type , component) {
      
  ajax(
    type , 
    component , 
    'https://test.megapolis-it.ru/api/list'
  );

}

export function delItem(type , component , id) {
  ajax(
    'DELETE' , 
    component , 
    'https://test.megapolis-it.ru/api/list/'+id,
    '',
    'delItem'
  );
}


export function addItem(type , component , title , store) {

    var params={
        title:title
    }
    
    ajax(
      'POST' , 
      component , 
      "https://test.megapolis-it.ru/api/list" , 
      JSON.stringify(params),
      'addItem',
      store
    );

}



export function editItem(type , component , title , id) {
  console.log(title);
  var params={
        title:title
    }
  ajax(
    type , 
    component , 
    "https://test.megapolis-it.ru/api/list/"+id , 
    JSON.stringify(params),
    'editItem'
  ); 

}  