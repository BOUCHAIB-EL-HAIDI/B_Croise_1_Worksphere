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




const allowedRooms = [{ role:""}






]






let employeIdCount = 0 ;


let employe = {};
 
let employes = [];

// displaying  the form 

workerBTn.addEventListener('click', ()=>{
form.classList.toggle('hidden')
});
//closing the form 
closeForm.addEventListener('click', ()=>{
form.classList.toggle('hidden')
});


//add event listener to submit button 
submitBtn.addEventListener('click', ()=>{

   employe = {
    id: employeIdCount,
    name: nameInput.value,
    role: roleInput.value,
    photo: imageURlInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    experiences:" [ { company, startDate, endDate, role }, ... ]",
    assigned: false,
    assignedZone: null,
    allowedRooms: ["Reception"]
   }

employes.push(employe)
console.log(employe)
console.log(employes)
employeIdCount++;

});



