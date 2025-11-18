// Declaration 

const  workerBTn = document.querySelector('.add_worker_btn')
const form = document.querySelector('.form');

const closeForm = document.querySelector('.close')
const submitBtn= document.getElementById('submitBtn');

const nameInput= document.getElementById('name'); 
const emailInput= document.getElementById('email');
const phoneInput= document.getElementById('phone');
const roleInput= document.getElementById('role');
const imageURlInput= document.getElementById('image');

const experience_container = document.querySelector('.experience_container')

const addExpBtn = document.getElementById('addExpBtn');
const experience_entry = document.querySelectorAll('.experience_entry');

let employeIdCount = 0 ;


let employe = {};
 
let employes = [];

let experience_count = 0;

let experience = {};

let Total_Experience = [];

//adding multible experience 

addExpBtn.addEventListener('click', ()=> {


    if (experience_count < 3){

  experience_container.insertAdjacentHTML('beforeend', `
    <div class="experience_entry mb-4">
            <div class="flex flex-col">
    <label for="Company_Name">Company Name</label>
    <input  pattern="^[A-Za-z0-9&.,\- ]{2,50}$" title="Company name should be 2-50 characters long and can include letters, numbers, spaces, and symbols"  type="text" class="Company_Name" placeholder="Enter Company Name" required class="mt-1">
    </div>
     <div class="flex flex-col">
    <label for="Start_Date">Start Date</label>
    <input   type="date" class="Start_Date"  required class="mt-1">
    </div>
     <div class="flex flex-col">
    <label for="End_Date">End Date</label>
    <input  type="date" class="End_Date" required class="mt-1">
    </div>
     <div class="flex flex-col">
    <label for="Role">Role</label>
    <input pattern="^[A-Za-z\s]{2,50}$" title="Only letters and spaces, 2–50 characters" type="text" class="Role" placeholder="Enter role" required class="mt-1">
    </div>
    </div>
    `);

    }
    experience_count++;
    

     if (experience_count > 3) {
            addExpBtn.disabled = true; 
            alert("only 3 experience are allowed ")
        }

      


})











// displaying  the form 

workerBTn.addEventListener('click', ()=>{
form.classList.toggle('hidden')
});
//closing the form 
closeForm.addEventListener('click', ()=>{
form.classList.toggle('hidden')
});


//add event listener to submit button 
submitBtn.addEventListener('click', (e)=>{
   
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const startDate= document.querySelectorAll('.Start_Date');
    const endDate= document.querySelectorAll('.End_Date');

  for (let i=0 ; i<startDate.length ; i++){

     if(!validateDate(startDate[i].value,endDate[i].value)) {
      return ;
     } 
    
    }
  


    Total_Experience = [];
    experience = {};
    
    let company_name = document.querySelectorAll('.Company_Name');

    let companyRole = document.querySelectorAll('.Role')

    const experience_entry = document.querySelectorAll('.experience_entry');

    for (let i=0 ; i<experience_entry.length ;i++ ){

     experience = {

      companyName :company_name[i].value ,
      startingdATE : startDate[i].value,

      endingDate : endDate[i].value ,

      role : companyRole[i].value 

     }
     Total_Experience.push(experience)

     experience = {};

    }
   


   employe = {
    id: employeIdCount,
    name: nameInput.value,
    role: roleInput.value,
    photo: imageURlInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    experiences: Total_Experience,
    assigned: false,
    assignedZone: null,
    allowedRooms: ["Reception"]
   }
    employes.push(employe);
    employeIdCount++;
   
    alert("Employee added successfully!");

    console.log("Employee:", employe);
    console.log("All Employees:", employes);

    form.reset();
    experience_count = 0;
    addExpBtn.disabled = false;
    experience_container.innerHTML ="";
    form.classList.add('hidden');
});



// validate the end date and start date start date should be lesser then end date 


function validateDate(startDate, endDate) {
    const startD = new Date(startDate);
    const endD = new Date(endDate);

if(startD >= endD){

alert("Start date must be earlier than end date.");
return false

}else return true ;


}




