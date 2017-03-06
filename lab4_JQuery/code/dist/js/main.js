//underscore в pushInLog


import * as Books from './books'
import * as Functions from './functions'
function main(){
    let book = new Books.Book("sadasd","dfsdfa","qweqwe");  
    console.log(`PI = ${book.title}`);
    console.log(Books);
}
function loadBooks(){
    Books.loadBooks();
}

function pickClass(callType){
    Books.pickClass(callType);
}

function search(){
    Books.search();
}

function switchType(callType){
    Functions.switchType(callType);
}

function create(callType){
    Functions.create(callType);
}

function deleteById(itemId){
    Functions.deleteById(itemId);
}

function validate(input,msgstub){
    Functions.validate(input,msgstub);
}

function sortGrid(){
    Functions.sortGrid();
}

function Clear(){
    Functions.Clear();
}

function loadInfo(){
    Functions.loadInfo();
}

function edit(){
    Functions.edit();
}

function save(callType){
    Functions.save(callType);
}

function cancel(){
    Functions.cancel();
}


//global export
export {
    main,
    loadBooks,
    pickClass,
    search,
    switchType,
    create,
    deleteById,
    validate,
    sortGrid,
    Clear,
    loadInfo,
    edit,
    save,
    cancel 
};
