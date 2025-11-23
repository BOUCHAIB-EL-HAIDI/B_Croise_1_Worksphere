// Main Variable Declaration 

const  workerBTn = document.querySelector('.add_worker_btn')   // this is for the add worker  btn 
const form = document.querySelector('.form');                  // this is the form modal

const closeForm = document.querySelector('.close')           // this is for closing the form
const submitBtn= document.getElementById('submitBtn');       // this is for submiting the form 

const nameInput= document.getElementById('name');                 
const emailInput= document.getElementById('email');
const phoneInput= document.getElementById('phone');             // all of this is for getting the form inputs for validation 
const roleInput= document.getElementById('role');
const imageURlInput= document.getElementById('image');

const experience_container = document.querySelector('.experience_container')        // this is for getting the experience container 

const addExpBtn = document.getElementById('addExpBtn');                             // this is for add experience button
const experience_entry = document.querySelectorAll('.experience_entry');            // this for adding the needed experinces inputs 

const autreRole = document.querySelector('.autreRole');                            // this for getting the autres role role 
const autreRoleInput = document.getElementById('autrerole');                      // this for the autres role input 


const image = document.getElementById('imageSRC');                                  // this is for the images preview src 
image.src = "Assets/NO_image.png" ;                                                  // this the preview image by default
 
const unassignedList =  document.querySelector('.unassigned_list');                    // this is for getting the unassigned list 

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


// thuis array is for room capacity 
const ROOM_CAPACITIES = {
  confrence_room: 3,    
  reception_room: 1,   
  serveurs_room: 1,      
  security_room: 1,      
  personnel_room: 3,     
  archives_room: 1       
};

//this array is for the rooms that should have the color red pale when empty 
const MANDATORY_ROOMS = ["reception_room", "serveurs_room", "security_room","archives_room"];



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



//this part is when the user add the image it got added in the image src 
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



// this is for showing the input to enter employe role when the role is autres role 
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
    <input pattern="^[A-Za-z0-9&.,\- ]{2,50}$" title="Only letters and spaces, 2–50 characters" type="text" class="Role" placeholder="Enter role" required class="mt-1">
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

       // this is ersure that the inputs get validated 
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    // this for getting the all the start date and end date drom the experience container for validation 
    const startDate= document.querySelectorAll('.Start_Date');
    const endDate= document.querySelectorAll('.End_Date');

  for (let i=0 ; i<startDate.length ; i++){

     if(!validateDate(startDate[i].value,endDate[i].value)) {
      return ;
     } 
    
    }
  

    // this is for getting and storing every employes experience
    Total_Experience = [];    // this is for storing all experiences 
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


    // this is the employe object 

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
    displayEmploye(employe)    // this for displaying the employe in the unassigned list 
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
  </div> 
  
  `)
}



//update the employe count 


function updateCount(employes){

const Employecount = document.querySelector('.count');

const unassignedCount = employes.filter(emp => !emp.assigned).length;

Employecount.innerText = unassignedCount;

}



//this is for making the assign employe card in each room 

const PlusBtn = document.querySelectorAll('.rooms .plus ');
PlusBtn.forEach(p => {
  p.addEventListener('click', (e) => {
    const roomDiv = e.currentTarget.closest("div[class*='_room']");
    const roomName = roomDiv.classList[0];
    const assignContainer = roomDiv.querySelector('.assign_employe');

    
    if (!assignContainer.classList.contains('hidden')) {
      assignContainer.classList.add('hidden');
      return;
    }

    assignContainer.innerHTML = "";
    assignContainer.classList.remove('hidden');

    // this is for adding the header assign  employe and the close button to the assign employe container
    assignContainer.insertAdjacentHTML('afterbegin', `
      <div class="flex justify-between items-center mb-[2px]">
        <h1 class="text-black font-semibold mx-[2px]">Assign Employee</h1>
        <button class="close bg-red-500 text-white px-[2px] py-[2px] rounded hover:bg-red-700">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
    `);
    assignContainer.querySelector('.close').addEventListener('click', () => {
      assignContainer.classList.add('hidden');
    });

    //this for showing available employe for room by role and assigned status should be false (not assigned)
    employes.forEach(emp => {
      if (!emp.assigned && emp.allowedRooms.includes(roomName)) {
        assignContainer.insertAdjacentHTML('beforeend', `
          <div class="card w-fit rounded-lg shadow-md flex items-center bg-white h-fit mb-[1px] box-border scale-50 cursor-pointer" data-id="${emp.id}">
            <img class="rounded-full border-4 border-gray-800 w-14 h-14" src="${emp.photo}" alt="${emp.name}">
            <div class="flex-1 mx-2">
              <h1 class="font-bold text-black my-1">${emp.name}</h1>
              <h2 class="text-gray-600 font-semibold my-1">${emp.role}</h2>
            </div>
          </div>
        `);
      }
    });

    // if there is no employe in the unassigned list show an alert 
    if (assignContainer.querySelectorAll('.card').length === 0) {
      alert("Aucun employé disponible pour cette salle !");
      assignContainer.classList.add('hidden');
      return;
    }

    // this is for adding card to room when its clicked in the assign employe container 
    assignContainer.querySelectorAll('.card').forEach(c => {
      c.addEventListener('click', () => {
        const employeeId = c.getAttribute('data-id');
        const employee = employes.find(emp => emp.id == employeeId);

        if (employee.assigned) {
          alert('Cet employé est déjà assigné !');
          return;
        }

        // this is for verifing the capacity of the room 
        const currentCount = roomDiv.querySelectorAll('.employee-in-room').length;
        const max = ROOM_CAPACITIES[roomName];
        if (currentCount >= max) {
          alert(`Salle pleine ! Capacité maximale : ${max}`);
          return;
        }

        //this for adding the employe to selected room 
        roomDiv.insertAdjacentHTML('beforeend', `
          <div class="employee-in-room w-fit rounded-lg shadow-md flex items-center bg-white h-fit mb-1 box-border scale-75 cursor-pointer" data-id="${employee.id}">
            <img class="rounded-full border-4 border-gray-800 w-14 h-14" src="${employee.photo}" alt="${employee.name}">
            <div class="flex-1 mx-[4px]">
              <h1 class="font-bold text-black my-1">${employee.name}</h1>
              <h2 class="text-gray-600 font-semibold my-1">${employee.role}</h2>
            </div>
            <button class="RemoveEmployeFromRoom w-fit h-fit p-[4px] mr-[2px] bg-red-500 rounded-md hover:bg-red-900 transition">
              <i class="fa-sharp-duotone fa-solid fa-x text-center text-white"></i>
            </button>
          </div>
        `);

        // this is for changing the state of the employe from not assigned to assigned and also getting the assignedzo,e
        employee.assigned = true;
        employee.assignedZone = roomName;
       
        // this is for  removing employe from the unaasigned list when its assigned 
        unassignedList.querySelector(`.card[data-id="${employee.id}"]`)?.remove();
        c.remove();

        // close the assign employe menu if there is no employe to assign for this room 
        if (assignContainer.querySelectorAll('.card').length === 0) {
          assignContainer.classList.add('hidden');
        }

        updateCount(employes);
        updateRoomVisualState(roomDiv);

        // this part is for removing employe from room 
        const newCard = roomDiv.lastElementChild;
        newCard.querySelector('.RemoveEmployeFromRoom').addEventListener('click', (ev) => {
          ev.stopPropagation();
          employee.assigned = false;
          employee.assignedZone = null;
       
          newCard.remove();
          displayEmploye(employee);
          updateCount(employes);
          updateRoomVisualState(roomDiv);
        });

        // this is for showing the modal details when the card is clicked 
        newCard.addEventListener('click', (ev) => {
          if (!ev.target.closest('.RemoveEmployeFromRoom')) {
            PopModaldetails(employee);
          }
        });
      });
    });
  });
});








 



//this function is for the pop up modal 
function PopModaldetails(employee) {
  const modal = document.querySelector('.Modal_details');
  


  modal.innerHTML = `
    <div class="image flex justify-center bg-gray-100 p-2 relative">
      <img src="${employee.photo}" alt="${employee.name}" class="h-[100px] w-[100px] rounded-full border-2 border-staffGreen">
      <button class="Close_PopUp w-fit h-fit p-[4px] mr-[2px] bg-red-500 rounded-md hover:bg-red-900 transition absolute right-[2px] top-[2px]">
        <i class="fa-sharp-duotone fa-solid fa-x text-center text-white bg-none rounded-md"></i> 
      </button>
    </div>
    
    <div class="employeInfo">
      <div class="name bg-gray-100 p-1 m-1">
        <span class="font-bold">Name:</span> <span>${employee.name}</span>
      </div>
      <div class="role bg-gray-100 p-1 m-1">
        <span class="font-bold">Role:</span> <span>${employee.role}</span>
      </div>
      <div class="email bg-gray-100 p-1 m-1">
        <span class="font-bold">Email:</span> <span>${employee.email}</span>
      </div>
      <div class="phone bg-gray-100 p-1 m-1">
        <span class="font-bold">Phone:</span> <span>${employee.phone}</span>
      </div>
      <div class="localisation bg-gray-100 p-1 m-1">
        <span class="font-bold">Location:</span> <span>${employee.assignedZone.split("_").join(' ') || 'Unassigned'}</span>
      </div>
      
      <div class="experience bg-white p-1 m-1 flex flex-col">
        <h1 class="font-bold">Experiences</h1>
        ${employee.experiences.map(exp => `
          <div class="exp m-2 bg-gray-100 p-2">
            <div class="expCompany">
              <span class="font-semibold">Company:</span> <span>${exp.companyName}</span>
            </div>
            <div class="expRole">
              <span class="font-semibold">Role:</span> <span>${exp.role}</span>
            </div>
            <div class="expPeriod">
              <span class="font-semibold">Period:</span> From <span>${exp.startingdATE}</span> To <span>${exp.endingDate}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  
  //this is for showing the modal 
  modal.classList.remove('hidden');
  
  // this is for closing modal when the close button is clicked 
  const closeBtn = modal.querySelector('.Close_PopUp');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.innerHTML = "";
  });
}




// this function is for the visual state of the rooms when empty and when its not empty by capacity 

function updateRoomVisualState(roomElement) {
  const roomName = roomElement.classList[0];
  const count = roomElement.querySelectorAll('.employee-in-room').length; 
  const capacity = ROOM_CAPACITIES[roomName];

  
  roomElement.classList.remove('border-red-300', 'border-orange-500', 'border-green-500');

  
  if (MANDATORY_ROOMS.includes(roomName) && count === 0) {
    roomElement.classList.add('border-4', 'border-red-300');
  }
 
  else if (count >= capacity) {
    roomElement.classList.add('border-4', 'border-orange-500');
  }
 
  else if (count > 0) {
    roomElement.classList.add('border-4', 'border-green-500');
  }
  
  else {
    roomElement.classList.add('border-4', 'border-gray-400'); 
  }
}





