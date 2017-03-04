var sortFlag=false;
const validationLog=[];

let proxy = new Proxy(validationLog,{
    get(target,prop){
         console.log(`Read ${prop}`);
         return target[prop];
    },
    set(target, prop, value) {
    console.log(`Write ${prop} ${value}`);
    target[prop] = value;
    return true;
  }
})

class Vali{
    constructor (fieldName,validator){
    this.isValid=validator;
    this.fieldName=fieldName;
    }
}

function getXmlHttp(){
    let xmlhttp;
    try{
        xmlhttp= new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e){
        try{
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }catch(E){
            xmlhttp=false;
        }
    }
    if(!xmlhttp&&typeof XMLHttpRequest!='undefined'){
        xmlhttp=new XMLHttpRequest();
    }
    return xmlhttp;
}

function Clear(){
    let inputs = document.querySelectorAll("input")
    let inputsIterator = getInputsIterator(inputs);
    inputsIterator.next();
   for(let i = 0;i<inputs.length;i++)
   {
     let inp = inputsIterator.next();
     if(!inp.done&&(inp.value.type=="text"||inp.type=="number"))
     inp.value.value="";
   }
}

function getUrlVars() {
    let lets = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        lets[key] = value;
    });
    return lets;
}

function loadInfo(){
    let Id = getUrlVars()["id"];
    let xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books/'+Id,false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    let result=JSON.parse(xmlhttp.responseText)
    if(result.type=="Audiobook")
    {
        let{type="default",title="default",authorName="default",publishingHouse="default",branch="default",
        duration="default",narrator="default"}=result;
        document.getElementById('type').value=type;
        document.getElementById('title').value=title;
        document.getElementById('author').value=authorName;
        document.getElementById('phouse').value=publishingHouse;
        document.getElementById('branch').value=branch;
        document.getElementById('duration').value=duration;
        document.getElementById('narrator').value=narrator;
    }
     if(result.type=="Textbook")
    {
        let{type,title,authorName,publishingHouse,branch,numberOfPage,binding}=result;
        document.getElementById('type').value=type;
        document.getElementById('title').value=title;
        document.getElementById('author').value=authorName;
        document.getElementById('phouse').value=publishingHouse;
        document.getElementById('branch').value=branch;
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
        numOfPage.id='numofpage';
        numOfPage.value=numberOfPage;
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.value=binding;
        label2.innerText='Binding';
        label2.id='bind';
    }
    }
}

function getInputsIterator(array){
    var nextIndex = 0;   
    return {
       next: function(){
           return nextIndex < array.length ?
               {value: array[nextIndex++], done: false} :
               {done: true};
       }
    }
}

function switchType(buttId){
    if(buttId=='ab'){
        let numOfPage = document.getElementById('numofpage');
        let label1 = document.getElementById('num');
        let bbinding = document.getElementById('binding');
        let label2 = document.getElementById('bind');
        let button = document.getElementById('cb');
        document.getElementById(buttId).className='pressedpicker';
        document.getElementById('tb').className='pickertable';
        document.getElementById('type').value="Audiobook";
        button.setAttribute("onclick","BooksModule.create('ab')");
        numOfPage.id='duration';
        numOfPage.setAttribute("onchange","BooksModule.validate('duration','durerr')");
        label1.innerText='Duration';
        label1.id='dur';
        bbinding.id='narrator';
        bbinding.setAttribute("onchange","BooksModule.validate('narrator','narerr')");
        label2.innerText='Narrator';
        label2.id='nar'; 
        }
    if(buttId=='tb'){
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
        let button = document.getElementById('cb');
        document.getElementById(buttId).className='pressedpicker';
        document.getElementById('ab').className='pickertable';
        document.getElementById('type').value="Textbook";
        button.setAttribute("onclick","BooksModule.create('tb')");
        numOfPage.id='numofpage';
        numOfPage.setAttribute("onchange","BooksModule.validate('numofpage','durerr')");
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.setAttribute("onchange","BooksModule.validate('binding','narerr')");
        label2.innerText='Binding';
        label2.id='bind';
    }
}

function deleteById(itemId){
    if(confirm("Delete?")){ 
        let promise = fetch('http://localhost:2403/books/'+itemId,
        {
            method: 'DELETE'
        }).then(response=>{
            if(response.status==200)
            {
               // console.log(response);
                alert("Operation complete");
                let row = document.getElementById(itemId).parentNode.parentNode;
                row.parentNode.removeChild(row);
            }
            else
            console.log(response.statusText);
        })
    }
}

function edit(){
    let Id = getUrlVars()["id"];  
    let xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books/'+Id,false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    let result=JSON.parse(xmlhttp.responseText)
    if(result.type=="Audiobook")
    {
        document.getElementById('save').setAttribute('onclick',"BooksModule.save('ab')");
        document.getElementById('type').value=result.type;
        document.getElementById('title').value=result.title;
        document.getElementById('author').value=result.authorName;
        document.getElementById('phouse').value=result.publishingHouse;
        document.getElementById('branch').value=result.branch;
        document.getElementById('duration').value=result.duration;
        document.getElementById('narrator').value=result.narrator;
    }
     if(result.type=="Textbook")
    {
        document.getElementById('save').setAttribute('onclick',"BooksModule.save('tb')");
        document.getElementById('type').value=result.type;
        document.getElementById('title').value=result.title;
        document.getElementById('author').value=result.authorName;
        document.getElementById('phouse').value=result.publishingHouse;
        document.getElementById('branch').value=result.branch;
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
        numOfPage.id='numofpage';
        numOfPage.value=result.numberOfPage;
        numOfPage.setAttribute("onchange","BooksModule.validate('numofpage','durerr')");
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.value=result.binding;
        bbinding.setAttribute("onchange","BooksModule.validate('binding','narerr')");
        label2.innerText='Binding';
        label2.id='bind';
    }}

}

function save(callType){
    let Id = getUrlVars()["id"];
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let publishingHouse = document.getElementById('phouse').value;
    let branch = document.getElementById('branch').value;  
    if(callType =='ab'){
        let duration = document.getElementById('duration').value;
        let narrator = document.getElementById('narrator').value;
        let type="Audiobook";
        var tmp = "id="+encodeURIComponent(Id)+"type="+encodeURIComponent(type)+"&title="+
        encodeURIComponent(title)+"&authorName="+encodeURIComponent(author)+"&publishingHouse="+
        encodeURIComponent(publishingHouse)+"&narrator="+encodeURIComponent(narrator)+"&duration="+
        encodeURIComponent(duration)+"&branch="+encodeURIComponent(branch);
    }
    if(callType=='tb'){
        let numofpage = document.getElementById('numofpage').value;
        let binding = document.getElementById('binding').value;
        let type="Textbook";
        var tmp = "id="+encodeURIComponent(Id)+"type="+encodeURIComponent(type)+"&title="+ 
        encodeURIComponent(title)+"&authorName="+encodeURIComponent(author)+"&publishingHouse="+
        encodeURIComponent(publishingHouse)+"&numberOfPage="+encodeURIComponent(numofpage)+"&binding="+
        encodeURIComponent(binding)+"&branch="+encodeURIComponent(branch);
    }

      if(validationLog.length!=0)
    {
         let troubles="";
         validationLog.forEach((item,i,validationLog)=>{
             if(!item.isValid)
             troubles+=item.fieldName+", ";
         })
         alert(`Validation failed. Plz fill fields correctly: ${troubles}`);
    }
    else{
        let promise = fetch('http://localhost:2403/books/'+Id,{
            method : 'PUT',
            headers :  {"Content-Type": "application/x-www-form-urlencoded"},
            body: tmp
        }).then(response=>{
            return response.json();
        })
        .then(item=>{
            alert("Operation complete! "+item.title+" saved.");
            document.location.href="lab1.html"; 
        })
    }  
}

function cancel(){
    document.location.href="lab1.html"; 
}

function create(callType){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let publishingHouse = document.getElementById('phouse').value;
    let branch = document.getElementById('branch').value;  
    if(callType=='ab'){
        let duration = document.getElementById('duration').value;
        let narrator = document.getElementById('narrator').value;
        let type = "Audiobook";
        var tmp = "type="+encodeURIComponent(type)+"&title="+encodeURIComponent(title)+"&authorName="+
        encodeURIComponent(author)+"&publishingHouse="+encodeURIComponent(publishingHouse)+
        "&narrator="+encodeURIComponent(narrator)+"&duration="+encodeURIComponent(duration)+"&branch="+
        encodeURIComponent(branch);
    }
    if(callType=='tb'){
        let numofpage = document.getElementById('numofpage').value;
        let binding = document.getElementById('binding').value;
        let type = "Textbook";
        var tmp = "type="+encodeURIComponent(type)+"&title="+encodeURIComponent(title)+"&authorName="+
        encodeURIComponent(author)+"&publishingHouse="+encodeURIComponent(publishingHouse)+
        "&numberOfPage="+encodeURIComponent(numofpage)+"&binding="+encodeURIComponent(binding)+"&branch="+
        encodeURIComponent(branch);
    }

    if(validationLog.length!=0)
    {
         let troubles="";       
         proxy.forEach((item,i,proxy)=>{
             if(!item.isValid)
             troubles+=item.fieldName+", ";
         })

         alert(`Validation failed. Plz fill fields correctly: ${troubles}`);
    }
   
    else{
        let promise = fetch('http://localhost:2403/books',{
            method : 'POST',
            headers :  {"Content-Type": "application/x-www-form-urlencoded"},
            body: tmp
        }).then(response=>{
            return response.json();
        })
        .then(item=>{
            alert("Operation complete! "+item.title+" added.");
            document.location.href="lab1.html"; 
        })
    }   
}

function validate(fieldId,msgStab){
    let field = document.getElementById(fieldId);
    let msgstab = document.getElementById(msgStab);

    if(fieldId=="type"){
    if(field.value=="") {       
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required";  
        pushInLog(new Vali("type",false));
    }  
    if(field.value=="Audiobook"||field.value=="Textbook"){
         msgstab.style="visibility: hidden";   
         deleteFromLog("type");
    }
    else {
         msgstab.innerHTML="This field must be Audiobook or Textbook only";
         msgstab.style="visibility: unset";
         pushInLog(new Vali("type",false));
    }
    }   

    else if(fieldId=="duration"){
    if(!isNaN(parseInt(field.value))){
        if(parseInt(field.value)>0)
        { 
        msgstab.style="visibility: hidden";  
        deleteFromLog("duration");  
        }
    }
    else{
        msgstab.innerHTML="This field must be a number more than 0";
        msgstab.style="visibility: unset";
        pushInLog(new Vali("duration",false));
    } }

    else if(fieldId=="title"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("title",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("title");
    }    }
    else if(fieldId=="author"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("author",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("author");
    }}
    else if(fieldId=="phouse"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("phouse",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("phouse");
    }}
    else if(fieldId=="branch"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("branch",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("branch");
    }}
    else if(fieldId=="narrator"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("narrator",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("narrator");
    }}   
    else if(fieldId=="numofpage"){
    if(!isNaN(parseInt(field.value))){
        if(parseInt(field.value)>0)
        { 
        msgstab.style="visibility: hidden";  
        deleteFromLog("numofpage");  
        }
    }
    else{
        msgstab.innerHTML="This field must be a number more than 0";
        msgstab.style="visibility: unset";
        pushInLog(new Vali("numofpage",false));
    } }
    else if(fieldId=="binding"){
    if(field.value=="")
    {      
        msgstab.style="visibility: unset";
        msgstab.innerHTML="This field is required"; 
        pushInLog(new Vali("binding",false));     
    }
    else
    {
        document.getElementById(msgStab).style="visibility: hidden";
        deleteFromLog("binding");
    }} 

}

function deleteFromLog(fieldName){
    let position;
    validationLog.forEach((item,i,validationLog)=>{if(item.fieldName==fieldName)
    position=i;})
    validationLog.splice(position,1);
}

function pushInLog(item){
    let flag= false;
    validationLog.forEach((it,i,validationLog)=>{if(it.fieldName==item.fieldName)flag=true;})
   // if(!flag)validationLog.push(item);
   if(!flag)proxy.push(item);
    else return;
}

function sortGrid() {
    var grid = document.getElementById('datatable');    
    let target = event.target;
    let type = target.getAttribute('data-type');
    let colNum = target.cellIndex;
    if (target.tagName != 'TH') return;
    else{
         var tbody = grid.getElementsByTagName('tbody')[0];
         var rowsArray = [].slice.call(tbody.rows);
         var compare;
         
      switch (type) {
        case 'number':
          compare = function(rowA, rowB) {
              if(!sortFlag)
              {
                  sortFlag=true;
                  return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
              }
              else{
                  sortFlag=false;
                  return rowB.cells[colNum].innerHTML - rowA.cells[colNum].innerHTML;
              }
          };
          break;
        case 'string':
        if(!sortFlag)
              {
                sortFlag=true;
                compare = (rowA, rowB) =>{return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;}
                break;
              }
        else
            {
                sortFlag=false;
                compare = (rowA, rowB) =>{return rowA.cells[colNum].innerHTML < rowB.cells[colNum].innerHTML ? 1 : -1;}
                break;
            }
          };
          
      }
      rowsArray.sort(compare);
      grid.removeChild(tbody);
      for (var i = 0; i < rowsArray.length; i++) {
        tbody.appendChild(rowsArray[i]);
      }
      grid.appendChild(tbody);
    }  
       

export
    {
        sortGrid,
        cancel,
        save,
        edit,
        deleteById,
        switchType,
        loadInfo,
        Clear,
        create,
        validate
    }