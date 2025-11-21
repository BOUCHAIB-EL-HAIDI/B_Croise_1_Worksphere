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

const autreRole = document.querySelector('.autreRole');
const autreRoleInput = document.getElementById('autrerole');


const image = document.getElementById('imageSRC');
image.src = "Assets/NO_image.png" ;

const unassignedList =  document.querySelector('.unassigned_list');

let employeIdCount = 0 ;


let employe = {};
 
let employes = [];

let experience_count = 0;

let experience = {};

let Total_Experience = [];

let roomsAllowed = [];

// this array is storing allowed rooms by role 
const allowedRoomsByRole = [
  {
    role: "Manager",
    allowedRooms: [
      "confrence_room",
      "reception_room",
      "serveurs_room",
      "security_room",
      "personnel_room",
      "archives_room"
    ]
  },

  {
    role: "Réceptionnistes",
    allowedRooms: [
      "reception_room"
    ]
  },

  {
    role: "Techniciens IT",
    allowedRooms: [
      "serveurs_room"
    ]
  },

  {
    role: "Agents de sécurité",
    allowedRooms: [
      "security_room"
    ]
  },

  {
    role: "Nettoyage",
    allowedRooms: [
      "confrence_room",
      "reception_room",
      "serveurs_room",
      "security_room",
      "personnel_room"
      
    ]
  },

  {
    role: "Autres Role",
    allowedRooms: [
      "personnel_room"
    ]
  }
];



// displaying  the form 

workerBTn.addEventListener('click', ()=>{
form.classList.toggle('hidden')
});
//closing the form 
closeForm.addEventListener('click', ()=>{
form.classList.toggle('hidden')
experience_container.innerHTML ="";
form.reset();
});




imageURlInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});


roleInput.addEventListener('change', ()=> {

if(roleInput.value === "Autres Role"){
autreRole.classList.remove('hidden');
autreRoleInput.setAttribute('required', 'required');

}else {

    autreRole.classList.add('hidden');
    autreRoleInput.removeAttribute('required');
    autreRoleInput.value = ''; 
}



})




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
  

    // this is for getting and storing every employes experience
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
   

    // this is for getting allowed room by role 


    allowedRoomsByRole.forEach(e  => {

      if(e.role === roleInput.value){
      roomsAllowed = e.allowedRooms

      }

    })




// this if for getting the value of the role when the role is autres 


    let finalRole;
    
    if(roleInput.value === "Autres Role"){
        finalRole = autreRoleInput.value; 
    } else {
        finalRole = roleInput.value; 
    }


    

   employe = {
    id: employeIdCount,
    name: nameInput.value,
    role: finalRole,
    photo: image.src,
    email: emailInput.value,
    phone: phoneInput.value,
    experiences: Total_Experience,
    assigned: false,
    assignedZone: null,
    allowedRooms: roomsAllowed 
   }

    employes.push(employe);
    displayEmploye(employe)
    employeIdCount++;
   
    alert("Employee added successfully!");

    roomsAllowed = [];

    form.reset();
    image.src = "Assets/NO_image.png";
    experience_count = 0;
    addExpBtn.disabled = false;
    experience_container.innerHTML ="";
    form.classList.add('hidden');
    updateCount(employes)
 
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







//displaying the card employee in the unnasigned list 

function displayEmploye(employe) {


const employeId = employe.id ;

unassignedList.insertAdjacentHTML('beforeend', `
  
  <div class="card w-70 rounded-lg shadow-md flex items-center bg-white h-fit my-3 box-border p-4 " data-id=${employeId}>
   <img  class="rounded-full border-4 border-gray-800 w-14 h-14" src="${employe.photo}" alt="${employe.name}">


   <div class="flex-1 mx-2">
    <h1 class="font-bold  text-black my-1">${employe.name}</h1>
     <h2 class="text-gray-600 font-semibold my-1">${employe.role}</h2>

   </div>
   <button class="delete w-fit h-fit p-2  bg-red-500 rounded-md  hover:bg-red-900 transition">
    <i class="fa-solid fa-trash font-bold text-center text-white bg-none  rounded-md"></i>
   </button>

  </div> 
  
  `)
}




//this is for removing employe form the unnasigned list and update the employes array

unassignedList.addEventListener('click',(e)=> {

  
  const deleteBtn = e.target.closest('.delete');

  if(!deleteBtn) return ;

  const card = deleteBtn.closest('.card');

  if(!card) return ;
  
  const employeid = card.getAttribute('data-id')

  card.remove();

  employes = employes.filter(emp => emp.id != employeid)

  updateCount(employes)

})


//update the employe count 


function updateCount(employes){

const Employecount = document.querySelector('.count');

const unassignedCount = employes.filter(emp => !emp.assigned).length;

Employecount.innerText = unassignedCount;

}



//this is for making the assign employe card in each room 

const PlusBtn = document.querySelectorAll('.rooms i ');

PlusBtn.forEach(p => {

p.addEventListener('click',(e)=> {



const roomDiv = e.currentTarget.closest("div[class*='_room']")

const roomName = roomDiv.classList[0];

const assignContainer = roomDiv.querySelector('.assign_employe')

 
const cardRemaining = assignContainer.querySelectorAll('.card');

const unassignedList_Length = unassignedList.querySelectorAll('.card').length

if(!assignContainer.classList.contains('hidden') ) {
  assignContainer.classList.add('hidden');
  return;
}else if (unassignedList_Length === 0){

  alert("there is no available employe to add to room")
  assignContainer.classList.add('hidden');
  return;

}


assignContainer.classList.remove('hidden');


assignContainer.innerHTML = "";


 assignContainer.insertAdjacentHTML('afterbegin', `
    <div class="flex justify-between items-center mb-[2px]">
      <h1 class="text-black font-semibold  mx-[2px]">Assign Employee</h1>
      <button class="close bg-red-500 text-white px-[2px] py-[2px]rounded hover:bg-red-700">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </div>
  `);

  
  const closeBtn = assignContainer.querySelector('.close');
  closeBtn.addEventListener('click', () => {
    assignContainer.classList.add('hidden');
  });

employes.forEach(e => {

if (e.allowedRooms.includes(roomName) && !e.assigned) {


 assignContainer.insertAdjacentHTML('beforeend', `
  
    <div class="card w-fit rounded-lg shadow-md flex items-center bg-white h-fit mb-[1px] box-border scale-50 cursor-pointer " data-id=${e.id}>
   <img  class="rounded-full border-4 border-gray-800 w-14 h-14" src="${e.photo}" alt="${e.name}">


   <div class="flex-1 mx-2">
    <h1 class="font-bold  text-black my-1">${e.name}</h1>
     <h2 class="text-gray-600 font-semibold my-1">${e.role}</h2>

   </div>
   
  </div> 
  
  
  `)

}

})

  
  
   

    
  const CreatedCard = assignContainer.querySelectorAll('.card');


  CreatedCard.forEach(c => {

c.addEventListener('click' , ()=> {
      
      const employeeId = c.getAttribute('data-id');
      const employee = employes.find(emp => emp.id == employeeId);
      
      if(employee.assigned) {
        alert('This employee is already assigned!');
        return;
      }
      
   roomDiv.insertAdjacentHTML('beforeend',`
    
        <div class="card w-fit rounded-lg shadow-md flex items-center bg-white h-fit mb-1 box-border scale-75 cursor-pointer " data-id=${employee.id}>
   <img  class="rounded-full border-4 border-gray-800 w-14 h-14" src="${employee.photo}" alt="${employee.name}">
    

   <div class="flex-1 mx-[4px]">
    <h1 class="font-bold  text-black my-1">${employee.name}</h1>
     <h2 class="text-gray-600 font-semibold my-1">${employee.role}</h2>

   </div>
     <button class="RemoveEmployeFromRoom w-fit h-fit p-[4px] mr-[2px] bg-red-500 rounded-md  hover:bg-red-900 transition">
     <i class="fa-sharp-duotone fa-solid fa-x text-center text-white bg-none  rounded-md"></i> 
     </button>
   </div> 
     
    `)

    RemoveEmployeFromRoom();


    employee.assigned = true;
    employee.assignedZone = `${roomName}` ;




    //this is for removing employe card from the unassignedlist when the card is assigned to a room 
     const unassignedCard = unassignedList.querySelector(`.card[data-id="${employee.id}"]`);
    if(unassignedCard) {
      unassignedCard.remove();
    }
     c.remove();

     updateCount(employes);
     
     assignContainer.classList.add('hidden');
     
   })

})

})

})




//this is for removing employe from room 


function RemoveEmployeFromRoom() {



const allRooms =  document.querySelectorAll('div[class*="_room"]')

allRooms.forEach(r=> {

const removeFromRoomBtns = r.querySelectorAll('.RemoveEmployeFromRoom')

removeFromRoomBtns.forEach(btn => {

  btn.addEventListener('click', ()=> {

  const targetEmployeCard = btn.closest('.card');


  const targetemployeId = targetEmployeCard.getAttribute('data-id');
  const targetEmploye = employes.find(emp => emp.id == targetemployeId)

  
  targetEmploye.assigned = false ;

  targetEmploye.assignedZone = null ;

  console.log(targetEmploye)
  targetEmployeCard.remove()
  updateCount(employes)

 
  
  unassignedList.insertAdjacentHTML('beforeend', `
  
  <div class="card w-70 rounded-lg shadow-md flex items-center bg-white h-fit my-3 box-border p-4 " data-id=${targetemployeId}>
   <img  class="rounded-full border-4 border-gray-800 w-14 h-14" src="${targetEmploye.photo}" alt="${targetEmploye.name}">


   <div class="flex-1 mx-2">
    <h1 class="font-bold  text-black my-1">${targetEmploye.name}</h1>
     <h2 class="text-gray-600 font-semibold my-1">${targetEmploye.role}</h2>

   </div>
   <button class="delete w-fit h-fit p-2  bg-red-500 rounded-md  hover:bg-red-900 transition">
    <i class="fa-solid fa-trash font-bold text-center text-white bg-none  rounded-md"></i>
   </button>

  </div>
  
  `)

   
   
   updateCount(employes)


  })





})











})



}
