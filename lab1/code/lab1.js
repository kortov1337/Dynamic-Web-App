window.books=[];
window.validationLog=[];

//Classes//////////////////////////////////////////////////////////////////////////////////
function Author(name,country,gender){
    this.name=name;
    this.country=country;
    this.gender=gender;
}

function Book(title,publishingHouse,type,branch,id){
    this.id=id;
    this.title=title;
    this.publishingHouse=publishingHouse;
    this.branch=branch; 
    this.type=type;
    this.author=new Author("Default Name","Default Country","Default gender");
    this.getAuthor=function (){
        return this.author;
    }

    this.getTitle=function(){
        return this.title;
    }

    this.getPublishingHouse=function(){
        return this.publishingHouse;
    }

    this.getType=function(){
        return this.type;
    }

    this.getBranch=function(){
        return this.branch;
    }
}

function AudioBook(narrator,duration){
    Book.call(this);
    this.narrator=narrator;
    this.duration=duration;
    this.getNarrator=function(){
        return this.narrator;
    }
    this.getDuration=function(){
        return this.duration;
    }
}

function TextBook(binding,numberOfPage){
    Book.call(this);
    this.numberOfPage=numberOfPage;
    this.binding=binding;
}

function Vali(fieldName,validator){
    this.isValid=validator;
    this.fieldName=fieldName;
}
//---------------------------------------------------------------------------------------//
function getXmlHttp(){
    var xmlhttp;
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

function pushInLog(item){
    var flag= false;
    validationLog.forEach(function(it,i,validationLog){
        if(it.fieldName==item.fieldName)flag=true;
    })
    if(!flag)validationLog.push(item);
    else return;
}

function deleteFromLog(fieldName){
    var position;
    validationLog.forEach(function(item,i,validationLog){
    if(item.fieldName==fieldName)
    position=i;
    })
    validationLog.splice(position,1);
}

/*function checkValidation(){
    var flag=false;
    validationLog.forEach(function(item,i,validationLog){
        if(item.is)
    })
}*/

function getAllBooks(){
    var xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books',false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    var result=JSON.parse(xmlhttp.responseText)
    jsonToBooks(result);
    }
}

function Clear(callType){
    document.getElementById('title').value="";
    document.getElementById('author').value="";
    document.getElementById('phouse').value="";
    document.getElementById('branch').value="";
    if(callType=='ab'){
    document.getElementById('duration').value="";
    document.getElementById('narrator').value="";
    }

    if(callType=='tb'){
    document.getElementById('numofpage').value="";
    document.getElementById('binding').value="";
    }

}

function isAlreadyIn(id){
    var flag = false;
    books.forEach(function(item,i,books){
        if(item.id==id)
        flag = true;      
    })
    return flag;
}

function jsonToBooks(res){
    if(Array.isArray(res)){
        res.forEach(function(item,i,res){
            if(!isAlreadyIn(item.id))
            if(item.type=='Audiobook')
            {                            
                var tmp= new AudioBook(item.narrator,item.duration);
                tmp.title=item.title;
                tmp.publishingHouse=item.publishingHouse;
                tmp.branch=item.branch;
                tmp.id=item.id;
                tmp.type=item.type;
                tmp.author.name=item.authorName;
                tmp.author.country=item.authorCountry;
                tmp.author.gender=item.authorGender;
                books.push(tmp);
            }
            else if(item.type=='Textbook')
            {
                var tmp= new TextBook(item.binding,item.numberOfPage);
                tmp.title=item.title;
                tmp.publishingHouse=item.publishingHouse;
                tmp.branch=item.branch;
                tmp.id=item.id;
                tmp.type=item.type;
                tmp.author.name=item.authorName;
                tmp.author.country=item.authorCountry;
                tmp.author.gender=item.authorGender;
                books.push(tmp);
            }
        })
    }  
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function loadInfo(){
    var Id = getUrlVars()["id"];
    var xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books/'+Id,false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    var result=JSON.parse(xmlhttp.responseText)
    if(result.type=="Audiobook")
    {
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
        document.getElementById('type').value=result.type;
        document.getElementById('title').value=result.title;
        document.getElementById('author').value=result.authorName;
        document.getElementById('phouse').value=result.publishingHouse;
        document.getElementById('branch').value=result.branch;
        var numOfPage = document.getElementById('duration');
        var label1 = document.getElementById('dur');
        var bbinding = document.getElementById('narrator');
        var label2 = document.getElementById('nar');
        numOfPage.id='numofpage';
        numOfPage.value=result.numberOfPage;
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.value=result.binding;
        label2.innerText='Binding';
        label2.id='bind';
    }
}
}

//Loading books in objects/page////////////////////////////////////////////////////////////

function loadBooks(){
    getAllBooks();
    var data=books;
    var root_node=document.getElementById("content");
    var old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);
    
    root_node.innerHTML="";
    var table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    var tbody=document.createElement("tbody");
    table.appendChild(tbody);
    var row=document.createElement("tr");
 
    var values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(var i=0; i<values.length; i++)
    {
        var cell=document.createElement("th");
        cell.innerHTML=values[i];       
        row.appendChild(cell);
    }
     for(var i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(var j=0; j<values.length; j++)
        {
            var cell=document.createElement("td");
            if(j==3)
            {             
                var ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }
       
        var cell=document.createElement("td");
        var editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.setAttribute("onclick","loadInfo('"+data[i].id+"')");
        editref.href="edit.html?id="+data[i].id;
        var delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;     
        delref.setAttribute("onclick","deleteById('"+data[i].id+"')");
        cell.appendChild(editref);
        cell.appendChild(delref);
        row.appendChild(cell);
    }
    
    root_node.appendChild(table);
}

function loadAudiobooks(){
   
    getAllBooks();
    var data=books;
    var root_node=document.getElementById("content");
    var old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);

    root_node.innerHTML="";
    var table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    var tbody=document.createElement("tbody");
    table.appendChild(tbody);
    var row=document.createElement("tr");
 
    var values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(var i=0; i<values.length; i++)
    {
        var cell=document.createElement("th");
        cell.innerHTML=values[i];
        row.appendChild(cell);
    }
     for(var i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        if(data[i].type=="Audiobook")
        {
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(var j=0; j<values.length; j++)
        {
            var cell=document.createElement("td");
            if(j==3)
            {             
                var ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }
        var cell=document.createElement("td");
        var editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.href="edit.html?id="+data[i].id;
        var delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;       
        delref.setAttribute("onclick","deleteById('"+data[i].id+"')");
        cell.appendChild(editref);
        cell.appendChild(delref);
        row.appendChild(cell);
        }
    }
    
    root_node.appendChild(table);
}

function loadTextbooks(){
   
    getAllBooks();
    var data=books;
    var root_node=document.getElementById("content");
    var old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);

    root_node.innerHTML="";
    var table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    var tbody=document.createElement("tbody");
    table.appendChild(tbody);
    var row=document.createElement("tr");
 
    var values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(var i=0; i<values.length; i++)
    {
        var cell=document.createElement("th");
        cell.innerHTML=values[i];
        row.appendChild(cell);
    }
     for(var i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        if(data[i].type=="Textbook")
        {
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(var j=0; j<values.length; j++)
        {
            var cell=document.createElement("td");
            if(j==3)
            {             
                var ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }

        var cell=document.createElement("td");
        var editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.href="edit.html?id="+data[i].id;
        var delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;
        delref.setAttribute("onclick","deleteById('"+data[i].id+"')");
        cell.appendChild(editref);
        cell.appendChild(delref);
        row.appendChild(cell);
        }
    }
    
    root_node.appendChild(table);
}
//---------------------------------------------------------------------------------------//

//Filtering buttons////////////////////////////////////////////////////////////////////////
function pickClass(classType){   
    if(classType=='ab')
    {
        var button = document.getElementById(classType);
        var button2 = document.getElementById('tb');
        var button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"        
        loadAudiobooks();        
    }
    if(classType=='tb')
    {
        var button = document.getElementById(classType);
        var button2 = document.getElementById('ab');
        var button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"      
        loadTextbooks();    
    }
    if(classType=='alb')
    {
        var button = document.getElementById(classType);
        var button2 = document.getElementById('ab');
        var button3 = document.getElementById('tb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"        
        loadBooks();
    } 
}

function switchType(buttId){
    if(buttId=='ab'){
        var numOfPage = document.getElementById('numofpage');
        var label1 = document.getElementById('num');
        var bbinding = document.getElementById('binding');
        var label2 = document.getElementById('bind');
        var button = document.getElementById('cb');
        var button2 = document.getElementById('clb');
        document.getElementById(buttId).className='pressedpicker';
        document.getElementById('tb').className='pickertable';
        document.getElementById('type').value="Audiobook";
        button.setAttribute("onclick","create('ab')");
        button2.setAttribute("onclick","Clear('ab')");
        numOfPage.id='duration';
        numOfPage.setAttribute("onchange","validate('duration','durerr')");
        label1.innerText='Duration';
        label1.id='dur';
        bbinding.id='narrator';
        bbinding.setAttribute("onchange","validate('narrator','narerr')");
        label2.innerText='Narrator';
        label2.id='nar'; 
        }
    if(buttId=='tb'){
        var numOfPage = document.getElementById('duration');
        var label1 = document.getElementById('dur');
        var bbinding = document.getElementById('narrator');
        var label2 = document.getElementById('nar');
        var button = document.getElementById('cb');
        var button2 = document.getElementById('clb');
        document.getElementById(buttId).className='pressedpicker';
        document.getElementById('ab').className='pickertable';
        document.getElementById('type').value="Textbook";
        button.setAttribute("onclick","create('tb')");
        button2.setAttribute("onclick","Clear('tb')");
        numOfPage.id='numofpage';
        numOfPage.setAttribute("onchange","validate('numofpage','durerr')");
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.setAttribute("onchange","validate('binding','narerr')");
        label2.innerText='Binding';
        label2.id='bind';
    }
}
//---------------------------------------------------------------------------------------//

//CRUD inerface////////////////////////////////////////////////////////////////////////////
function deleteById(itemId){
    if(confirm("Delete?")){  
    var xmlhttp=getXmlHttp();
    xmlhttp.open('DELETE','http://localhost:2403/books/'+itemId,true);  
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ==4 ){
            if(xmlhttp.status == 200 ){
                alert("Operation complete");
                var row = document.getElementById(itemId).parentNode.parentNode;
                row.parentNode.removeChild(row);
            }
        }
    }; 
    xmlhttp.send(null);
    }
}

function edit(){
    var Id = getUrlVars()["id"];
    
    var xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books/'+Id,false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    var result=JSON.parse(xmlhttp.responseText)
    if(result.type=="Audiobook")
    {
        document.getElementById('save').setAttribute('onclick',"save('ab')");
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
        document.getElementById('save').setAttribute('onclick',"save('tb')");
        document.getElementById('type').value=result.type;
        document.getElementById('title').value=result.title;
        document.getElementById('author').value=result.authorName;
        document.getElementById('phouse').value=result.publishingHouse;
        document.getElementById('branch').value=result.branch;
        var numOfPage = document.getElementById('duration');
        var label1 = document.getElementById('dur');
        var bbinding = document.getElementById('narrator');
        var label2 = document.getElementById('nar');
        numOfPage.id='numofpage';
        numOfPage.value=result.numberOfPage;
        numOfPage.setAttribute("onchange","validate('numofpage','durerr')");
        label1.innerText='Number of pages';
        label1.id='num';
        bbinding.id='binding';
        bbinding.value=result.binding;
        bbinding.setAttribute("onchange","validate('binding','narerr')");
        label2.innerText='Binding';
        label2.id='bind';
    }}

}

function create(callType){
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var publishingHouse = document.getElementById('phouse').value;
    var branch = document.getElementById('branch').value;  
    if(callType=='ab'){
        var duration = document.getElementById('duration').value;
        var narrator = document.getElementById('narrator').value;
        var obj = new AudioBook(narrator,duration);
        obj.type="Audiobook";
        obj.author.name=author;
        obj.title = title;
        obj.publishingHouse=publishingHouse;
        obj.branch = branch;
        var tmp = "type="+encodeURIComponent(obj.type)+"&title="+encodeURIComponent(obj.title)+"&authorName="+
        encodeURIComponent(obj.author.name)+"&publishingHouse="+encodeURIComponent(obj.publishingHouse)+
        "&narrator="+encodeURIComponent(obj.narrator)+"&duration="+encodeURIComponent(obj.duration)+"&branch="+
        encodeURIComponent(obj.branch)+"&author="+JSON.stringify(obj.author);
    }
    if(callType=='tb'){
        var numofpage = document.getElementById('numofpage').value;
        var binding = document.getElementById('binding').value;
        var obj = new TextBook(binding,numofpage);   
        obj.type="Textbook";
        obj.author.name=author;
        obj.title = title;
        obj.publishingHouse=publishingHouse;
        obj.branch = branch;
        var tmp = "type="+encodeURIComponent(obj.type)+"&title="+encodeURIComponent(obj.title)+"&authorName="+
        encodeURIComponent(obj.author.name)+"&publishingHouse="+encodeURIComponent(obj.publishingHouse)+
        "&numberOfPage="+encodeURIComponent(obj.numberOfPage)+"&binding="+encodeURIComponent(obj.binding)+"&branch="+
        encodeURIComponent(obj.branch)+"&author="+JSON.stringify(obj.author);
    }

    if(validationLog.length!=0)
    alert("Validation failed. Plz fill fields correctly");
    else{
        var xmlhttp = getXmlHttp();
        xmlhttp.open('POST','http://localhost:2403/books',true);
     //xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ==4 ){
            if(xmlhttp.status == 200 ){
                alert("Operation complete");
                document.location.href="lab1.html";           
            }
        }
    }; 
    xmlhttp.send(tmp); 
    }   
}

function save(callType){
    var Id = getUrlVars()["id"];
    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var publishingHouse = document.getElementById('phouse').value;
    var branch = document.getElementById('branch').value;  
    if(callType =='ab'){
        var duration = document.getElementById('duration').value;
        var narrator = document.getElementById('narrator').value;
        var obj = new AudioBook(narrator,duration);
        obj.id=Id;
        obj.type="Audiobook";
        obj.author.name=author;
        obj.title = title;
        obj.publishingHouse=publishingHouse;
        obj.branch = branch;
        var tmp = "id="+encodeURIComponent(obj.id)+"type="+encodeURIComponent(obj.type)+"&title="+
        encodeURIComponent(obj.title)+"&authorName="+encodeURIComponent(obj.author.name)+"&publishingHouse="+
        encodeURIComponent(obj.publishingHouse)+"&narrator="+encodeURIComponent(obj.narrator)+
        "&duration="+encodeURIComponent(obj.duration)+"&branch="+encodeURIComponent(obj.branch);
    }
    if(callType=='tb'){
        var numofpage = document.getElementById('numofpage').value;
        var binding = document.getElementById('binding').value;
        var obj = new TextBook(binding,numofpage);  
        obj.id=Id; 
        obj.type="Textbook";
        obj.author.name=author;
        obj.title = title;
        obj.publishingHouse=publishingHouse;
        obj.branch = branch;
        var tmp = "id="+encodeURIComponent(obj.id)+"type="+encodeURIComponent(obj.type)+"&title="+
        encodeURIComponent(obj.title)+"&authorName="+encodeURIComponent(obj.author.name)+"&publishingHouse="+
        encodeURIComponent(obj.publishingHouse)+"&numberOfPage="+encodeURIComponent(obj.numberOfPage)+
        "&binding="+encodeURIComponent(obj.binding)+"&branch="+encodeURIComponent(obj.branch);
    }


  /* validationLog.forEach(function(item,i,validationLog){
        console.log(item.fieldName+" : "+item.isValid);     
    });*/
    if(validationLog.length!=0)
    alert("Validation failed. Plz fill fields correctly");
    else{      
        var xmlhttp = getXmlHttp();
        xmlhttp.open('PUT','http://localhost:2403/books/'+obj.id,true);
        //xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ==4 ){
                if(xmlhttp.status == 200 ){
                    alert("Operation complete");
                    document.location.href="lab1.html";           
            }
        }
        }; 
    xmlhttp.send(tmp);       
    }
}

function cancel(){
document.location.href="lab1.html"; 
}

function validate(fieldId,msgStab){
    var field = document.getElementById(fieldId);
    var msgstab = document.getElementById(msgStab);

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