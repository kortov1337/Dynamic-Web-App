const books=[];
const validationLog=[];

//Classes//////////////////////////////////////////////////////////////////////////////////

class Author {
    constructor (name,country,gender){
    this.name=name;
    this.country=country;
    this.gender=gender;
    } 
}

class Book{
    constructor (title,publishingHouse,type,branch,id){
    this.id=id;
    this.title=title;
    this.publishingHouse=publishingHouse;
    this.branch=branch; 
    this.type=type;
    this.author=new Author("Default Name","Default Country","Default gender");  
    }
    get getAuthor (){
        return this.author;
    }
}

class Audiobook extends Book{
    constructor (narrator,duration){
    super();
    this.narrator=narrator;
    this.duration=duration;   
    }
    get getNarrator(){
        return this.narrator;
    }
    get getDuration(){
        return this.duration;
    } 

}

class Textbook extends Book{
    constructor (binding,numberOfPage){
        super();
        this.numberOfPage=numberOfPage;
        this.binding=binding;
    } 

}

class Vali{
    constructor (fieldName,validator){
    this.isValid=validator;
    this.fieldName=fieldName;
    }
}    

//---------------------------------------------------------------------------------------//
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

function pushInLog(item){
    let flag= false;
    validationLog.forEach((it,i,validationLog)=>{if(it.fieldName==item.fieldName)flag=true;})
    if(!flag)validationLog.push(item);
    else return;
}

function deleteFromLog(fieldName){
    let position;
    validationLog.forEach((item,i,validationLog)=>{if(item.fieldName==fieldName)
    position=i;})
    validationLog.splice(position,1);
}

function getAllBooks(){
    let xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books',false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    let result=JSON.parse(xmlhttp.responseText)
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
    let flag = false;
    books.forEach((item,i,books)=>{
        if(item.id==id)
        flag = true;      
    })
    return flag;
}

function jsonToBooks(res){
    if(Array.isArray(res)){
        res.forEach((item,i,res)=>{
            if(!isAlreadyIn(item.id))
            if(item.type=='Audiobook')
            {                            
                let tmp= new Audiobook(item.narrator,item.duration);               
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
                let tmp= new Textbook(item.binding,item.numberOfPage);
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
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
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
    let data=books;
    let root_node=document.getElementById("content");
    let old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);
    
    root_node.innerHTML="";
    let table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    let tbody=document.createElement("tbody");
    table.appendChild(tbody);
    let row=document.createElement("tr");
 
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(let i=0; i<values.length; i++)
    {
        let cell=document.createElement("th");
        cell.innerHTML=values[i];       
        row.appendChild(cell);
    }
     for(let i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(let j=0; j<values.length; j++)
        {
            let cell=document.createElement("td");
            if(j==3)
            {             
                let ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }
       
        let cell=document.createElement("td");
        let editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.setAttribute("onclick","loadInfo('"+data[i].id+"')");
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
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
    let data=books;
    let root_node=document.getElementById("content");
    let old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);

    root_node.innerHTML="";
    let table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    let tbody=document.createElement("tbody");
    table.appendChild(tbody);
    let row=document.createElement("tr");
 
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(let i=0; i<values.length; i++)
    {
        let cell=document.createElement("th");
        cell.innerHTML=values[i];
        row.appendChild(cell);
    }
     for(let i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        if(data[i].type=="Audiobook")
        {
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(let j=0; j<values.length; j++)
        {
            let cell=document.createElement("td");
            if(j==3)
            {             
                let ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }
        let cell=document.createElement("td");
        let editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
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
    let data=books;
    let root_node=document.getElementById("content");
    let old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);

    root_node.innerHTML="";
    let table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";
    let tbody=document.createElement("tbody");
    table.appendChild(tbody);
    let row=document.createElement("tr");
 
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    tbody.appendChild(row);
    for(let i=0; i<values.length; i++)
    {
        let cell=document.createElement("th");
        cell.innerHTML=values[i];
        row.appendChild(cell);
    }
     for(let i=0; i<data.length; i++)
    {
        row=document.createElement("tr");
        tbody.appendChild(row);
        if(data[i].type=="Textbook")
        {
        values=
        [data[i].id, data[i].type, data[i].author.name, data[i].title, data[i].branch, data[i].publishingHouse];
        for(let j=0; j<values.length; j++)
        {
            let cell=document.createElement("td");
            if(j==3)
            {             
                let ref=document.createElement("a");
                ref.href="info.html?id="+data[i].id;
                ref.innerHTML=values[j];  
                ref.className="editref";         
                cell.appendChild(ref);
           }
           else
               cell.innerHTML=values[j];
                         
            row.appendChild(cell);
        }

        let cell=document.createElement("td");
        let editref=document.createElement("a");
        editref.text="Edit ";
        editref.className="editref";
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
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
        let button = document.getElementById(classType);
        let button2 = document.getElementById('tb');
        let button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"        
        loadAudiobooks();        
    }
    if(classType=='tb')
    {
        let button = document.getElementById(classType);
        let button2 = document.getElementById('ab');
        let button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"      
        loadTextbooks();    
    }
    if(classType=='alb')
    {
        let button = document.getElementById(classType);
        let button2 = document.getElementById('ab');
        let button3 = document.getElementById('tb');
        button.className="pressedpicker";
        button2.className="pickertable"
        button3.className="pickertable"        
        loadBooks();
    } 
}

function switchType(buttId){
    if(buttId=='ab'){
        let numOfPage = document.getElementById('numofpage');
        let label1 = document.getElementById('num');
        let bbinding = document.getElementById('binding');
        let label2 = document.getElementById('bind');
        let button = document.getElementById('cb');
        let button2 = document.getElementById('clb');
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
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
        let button = document.getElementById('cb');
        let button2 = document.getElementById('clb');
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
    let xmlhttp=getXmlHttp();
    xmlhttp.open('DELETE','http://localhost:2403/books/'+itemId,true);  
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ==4 ){
            if(xmlhttp.status == 200 ){
                alert("Operation complete");
                let row = document.getElementById(itemId).parentNode.parentNode;
                row.parentNode.removeChild(row);
               // document.location.reload();
            }
        }
    }; 
    xmlhttp.send(null);
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
        let numOfPage = document.getElementById('duration');
        let label1 = document.getElementById('dur');
        let bbinding = document.getElementById('narrator');
        let label2 = document.getElementById('nar');
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
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let publishingHouse = document.getElementById('phouse').value;
    let branch = document.getElementById('branch').value;  
    if(callType=='ab'){
        let duration = document.getElementById('duration').value;
        let narrator = document.getElementById('narrator').value;
        let obj = new Audiobook(narrator,duration);
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
        let numofpage = document.getElementById('numofpage').value;
        let binding = document.getElementById('binding').value;
        let obj = new Textbook(binding,numofpage);   
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
        let xmlhttp = getXmlHttp();
        xmlhttp.open('POST','http://localhost:2403/books',true);
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
    let Id = getUrlVars()["id"];
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let publishingHouse = document.getElementById('phouse').value;
    let branch = document.getElementById('branch').value;  
    if(callType =='ab'){
        let duration = document.getElementById('duration').value;
        let narrator = document.getElementById('narrator').value;
        var obj = new Audiobook(narrator,duration);
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
        let numofpage = document.getElementById('numofpage').value;
        let binding = document.getElementById('binding').value;
        var obj = new Textbook(binding,numofpage);  
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

    if(validationLog.length!=0)
    alert("Validation failed. Plz fill fields correctly");
    else{      
        var xmlhttp = getXmlHttp();
        xmlhttp.open('PUT','http://localhost:2403/books/'+obj.id,true);
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