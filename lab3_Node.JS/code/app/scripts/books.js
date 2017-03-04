const books=[];
const searchResult=[];

export class Author {
    constructor (name,country,gender){
    this.name=name;
    this.country=country;
    this.gender=gender;
    } 
}

export class Book{
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

export class Audiobook extends Book{
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

export class Textbook extends Book{
    constructor (binding,numberOfPage){
        super();
        this.numberOfPage=numberOfPage;
        this.binding=binding;
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

function getAllBooks(){
    let xmlhttp=getXmlHttp();
    xmlhttp.open('GET','http://localhost:2403/books',false);
    xmlhttp.send(null);
    if(xmlhttp.status==200){
    let result=JSON.parse(xmlhttp.responseText)
    jsonToBooks(result);
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
    table.setAttribute("onclick","BooksModule.sortGrid()");
    let tbody=document.createElement("tbody");
    let theader = document.createElement("thead");
    table.appendChild(theader);
    table.appendChild(tbody);
    let row=document.createElement("tr");    
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];
    
    for(let i=0; i<values.length; i++)
    {
        
        let cell=document.createElement("th");
        cell.innerHTML=values[i];
        cell.setAttribute("data-type","string");
        row.appendChild(cell);            
    }
    theader.appendChild(row);
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
        editref.setAttribute("onclick","BooksModule.loadInfo('"+data[i].id+"')");
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;     
        delref.setAttribute("onclick","BooksModule.deleteById('"+data[i].id+"')");
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
    table.setAttribute("onclick","BooksModule.sortGrid()");
    let tbody=document.createElement("tbody");
    let theader = document.createElement("thead");
    table.appendChild(theader);
    table.appendChild(tbody);
    let row=document.createElement("tr");    
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];

    for(let i=0; i<values.length; i++)
    {
        let cell=document.createElement("th");
        cell.innerHTML=values[i];
        cell.setAttribute("data-type","string");
        row.appendChild(cell);            
    }
    theader.appendChild(row);
     for(let i=0; i<data.length; i++)
    {       
        if(data[i].type=="Audiobook")
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
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;       
        delref.setAttribute("onclick","BooksModule.deleteById('"+data[i].id+"')");
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
    table.setAttribute("onclick","BooksModule.sortGrid()");
    let tbody=document.createElement("tbody");
    let theader = document.createElement("thead");
    table.appendChild(theader);
    table.appendChild(tbody);
    let row=document.createElement("tr");    
    let values = ["ID","Type","Author Name","Title","Branch","Publishing House",""];

    for(let i=0; i<values.length; i++)
    {
        let cell=document.createElement("th");
        cell.innerHTML=values[i];
        cell.setAttribute("data-type","string");
        row.appendChild(cell);            
    }
    theader.appendChild(row);
     for(let i=0; i<data.length; i++)
    {     
        if(data[i].type=="Textbook")
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
        editref.href="edit.html?id="+data[i].id;
        let delref=document.createElement("a");
        delref.text="Delete";
        delref.className="delref";
        delref.id=data[i].id;       
        delref.setAttribute("onclick","BooksModule.deleteById('"+data[i].id+"')");
        cell.appendChild(editref);
        cell.appendChild(delref);
        row.appendChild(cell);
        }
    }
    
    root_node.appendChild(table);
}

 function pickClass(classType){   
    if(classType=='ab')
    {
        let button = document.getElementById(classType);
        let button2 = document.getElementById('tb');
        let button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable";
        button3.className="pickertable";     
        loadAudiobooks();        
    }
    if(classType=='tb')
    {
        let button = document.getElementById(classType);
        let button2 = document.getElementById('ab');
        let button3 = document.getElementById('alb');
        button.className="pressedpicker";
        button2.className="pickertable";
        button3.className="pickertable";      
        loadTextbooks();    
    }
    if(classType=='alb')
    {
        let button = document.getElementById(classType);
        let button2 = document.getElementById('ab');
        let button3 = document.getElementById('tb');
        button.className="pressedpicker";
        button2.className="pickertable";
        button3.className="pickertable";        
        loadBooks();
    } 
}

function search () {
    //debugger;
    searchResult.forEach((item,i,searchResult)=>{
        searchResult.pop();
    })
    let query = document.getElementById('query').value;
   //console.log(query.toLowerCase);

    books.forEach((item,i,books)=>{
        if(
            query==item.author||//.toLowerCase||
            query==item.title||//.toLowerCase||
            query==item.type||//.toLowerCase||
            query==item.authorName||//.toLowerCase||
            query==item.publishingHouse||//.toLowerCase||
            query==item.branch//.toLowerCase
            ){
                searchResult.push(item);
            }       
    })  
    printSearchResult();
}

function printSearchResult(){
    
    let data=searchResult;
    let root_node=document.getElementById("content");
    let old_table = document.getElementById("datatable");
    root_node.removeChild(old_table);
    
    root_node.innerHTML="";
    let table=document.createElement("table");
    table.className="datatable";
    table.id="datatable";    
    let tbody=document.createElement("tbody");
    table.appendChild(tbody);
    if(searchResult.length>0)
    {
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
        row.appendChild(cell);
    }   
    root_node.appendChild(table);
    }
    else{
    let header=document.createElement("h2");
    header.className="datatable";
    header.innerHTML="No results was found..."
    root_node.appendChild(header);
    root_node.appendChild(table);
    }
}

export{
    loadBooks,
    pickClass,
    search
}