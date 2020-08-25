import { SET_API } from '../constants/Api'
import { getData , delItem , addItem  , editItem} from '../actions/ApiActions';

const initialState = {
    data: '',
    fetching: false
  }
  
  export default function setApi(state = initialState, action) {
    switch (action.type) {
        case 'GET_DATA':
          getData("GET" , action.data.Component);
        return state;

        case 'DEL_ITEM':
          delItem("DELETE" , action.data.Component , action.data.id);
        return state;

        case 'ADD_ITEM':
          addItem("POST" , action.data.Component , action.data.title , action.data.store);
        return state;

        case 'EDIT_ITEM':
          editItem("POST" , action.data.Component , action.data.title , action.data.id);
        return state;


        default:
          return state;
      }
  
  }