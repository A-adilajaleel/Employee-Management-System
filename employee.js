let text=document.getElementById('text')
let form=document.getElementById('form')
let namee=document.getElementById('namee')
let job = document.getElementById('job')
let salary=document.getElementById('salary')
let table=document.getElementById('table')
let search=document.getElementById('search')
let select=document.getElementById('select')


let editmode=false;
let editid=-1;

let Employee=JSON.parse(localStorage.getItem('employee')) || []
let filteredemployees=[...Employee]




function updatestorage(){
    localStorage.setItem('employee',JSON.stringify(Employee))
     filteredemployees=[...Employee]

     
}




function display(){
    table.innerHTML=` 
    <tr>
        <th>Name</th>
        <th>Job</th>
        <th>Salary</th>
        <th>Actions</th>
       </tr>`
    filteredemployees.forEach((emp)=>{
    table.innerHTML+=`
    <tr>
    <td>${emp.namee}</td>
    <td>${emp.job}</td>
    <td>${emp.salary}</td>
    <td>
    <button onclick="setEdit(${emp.id})">${editid==emp.id?'cancel':'edit'}</button>
    <button onclick ="deleteEmployee(${emp.id})">delete</button>
    </td>
    </tr>
    
    `

    })
    

}

function selectcategory(){
    if(select.value=='select'){
        filteredemployees=[...Employee]
        display()
         return
    }

   filteredemployees=Employee.filter((x) =>{
    return x.job.toLowerCase() == select.value
   })
   display()

}


















function setEdit(id){
    if(editmode){
        return cancelEdit()
    }
    editmode=true;
    editid=id;
    let empp=Employee.find((x=>x.id==id));
    namee.value=empp.namee
    job.value=empp.job
    salary.value=empp.salary
    display()




}




function add(e){
    e.preventDefault()


    if(namee.value==''||job.value==''||salary.value==''){
        return alert("fill all the fields")
    }
    if(editmode){
    let emp = Employee.find((x)=>x.id=== editid)
    emp.namee = namee.value
    emp.job = job.value
    emp.salary = salary.value
    editmode = false
    editid = -1
} else {
    let newemployee = {
        id: Date.now(),
        namee: namee.value,
        job: job.value,
        salary: salary.value,
    }
    Employee.push(newemployee)
}

   
    console.log(Employee)
    clearinput()
    updatestorage()
    display()
  
}



function searchemployee(){
    
    filteredemployees=Employee.filter((emp)=>{
        return emp.namee.toLowerCase().includes(search.value.toLowerCase())||emp.job.toLowerCase().includes(search.value.toLowerCase())||emp.salary.toLowerCase().includes(search.value.toLowerCase())
    })

    display()
}

function deleteEmployee(id){

    let okaytodelete=confirm('are you sure to delete')
    if(!okaytodelete){
        return
    }
    let employee=Employee.find((x)=>x.id==id)
    let index=Employee.indexOf(employee)
    Employee.splice(index,1)
     updatestorage()
    display()
   

}

function cancelEdit(){
    editmode=false;
    editid=-1

    clearinput()
    display()

}





function clearinput(){
    namee.value=''
    job.value=''
    salary.value=''
}







form.addEventListener('submit',add)
search.addEventListener('input',()=>{
    searchemployee()
})

select.addEventListener('change',selectcategory)
display()
