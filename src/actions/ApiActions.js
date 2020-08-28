import {
  URL
} from '../constants/Api'

/**
     * Функция для отправки Запроса на сервер (универсальная для 3 действий).
     * @function
     * @param {string} type - Тип отпрвляемого запроса
     * @param {object} component - Объект компонента, 
          который передается в запрос, для последующего обновления.
     * @param {string} url - Адрес запроса.
     * @param {object} param - Параметры запроса.
     * @param {string} action - Тип действия запроса(можно объеденить с type).
     * @param {object} store - хранилище данных.
     */
const ajax = function(
                      type , 
                      component , 
                      url , 
                      param , 
                      action , 
                      store,
                      callback){
    

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
                 callback('SUCCES')
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
              callback(
                'ERROR',
                JSON.parse(request.response)['error']
              )
              //document.getElementsByClassName('popupp__error')[0].innerHTML = JSON.parse(request.response)['error'];   
            }
          }
        } 
       
      
      if(param)
        request.send(param)
      else request.send()
}

/**
  * Получение данных с сервера
  * function
  * @param {string} type - Тип отпрвляемого запроса
  * @param {object} component - Объект компонента
**/
export function getData(type , component) {
      
  ajax(
    type , 
    component , 
    'https://test.megapolis-it.ru/api/list'
  );

}


/**
  * Удаление данных элемента на сервере
  * function
  * @param {string} type - Тип отпрвляемого запроса
  * @param {object} component - Объект компонента
  * @param {string} id - идентификатор элемента
**/
export function delItem(type , component , id , callback) {
  ajax(
    'DELETE' , 
    component , 
    'https://test.megapolis-it.ru/api/list/'+id,
    '',
    'delItem' ,
    '',
    callback
  );
}

/**
  * Добавление данных на сервер
  * function
  * @param {object} store - хранилище данных.
  * @param {string} type - Тип отпрвляемого запроса
  * @param {object} component - Объект компонента
  * @param {string} title - новый заголовок задачи-элемента
**/
export function addItem(type , component , title , store , callback) {

    var params={
        title:title
    }
    ajax(
      'POST' , 
      component , 
      "https://test.megapolis-it.ru/api/list" , 
      JSON.stringify(params),
      'addItem',
      store ,
      callback
    );

}


/**
  * Редактирование данных на сервере
  * function
  * @param {object} id - идентификатор редактируемого элемента.
  * @param {string} type - Тип отпрвляемого запроса
  * @param {object} component - Объект компонента
  * @param {string} title - новый заголовок задачи-элемента
**/
export function editItem(type , component , title , id , callback) {
  var params={
        title:title
    }
  ajax(
    type , 
    component , 
    "https://test.megapolis-it.ru/api/list/"+id , 
    JSON.stringify(params),
    'editItem',
    '',
    callback
  ); 

}  