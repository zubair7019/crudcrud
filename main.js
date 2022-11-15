const myform = document.querySelector("#my-form");
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");



/////userscreen update///
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get(
      "https://crudcrud.com/api/4d93573f0a8b488fbce9a863087ae41f/appointmentcell"
    )
    .then((response) => {
      // console.log(response.data)
      for (let i = 0; i < response.data.length; i++) {
        onscreenshow(response.data[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});

myform.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  const name =e.target.name.value;
  const email =e.target.email.value;

  if (name ===""|| email ==="") {
    msg.classList.add("error")
    msg.innerHTML = "please enter all field";
    setTimeout(() => msg.remove(), 3000);
    // console.log("please enter all field?")
  }

  const obj = {
    name,
    email,
  };

  axios
    .post(
      "https://crudcrud.com/api/4d93573f0a8b488fbce9a863087ae41f/appointmentcell",
      obj
    )
    .then((response) => {
      onscreenshow(response.data);
      // console.log(response)
    })
    .catch((err) => console.log(err));
    
  
}


//adding screenshow the data on screen if rfresh the page//
function onscreenshow(obj) {
  const li = document.createElement("li");
  //add delete and edit//
  const del = document.createElement("button");
  const edt = document.createElement("button");
  del.appendChild(document.createTextNode("delete"));
  del.className = "delete";
  edt.appendChild(document.createTextNode("EDIT"));
  edt.className="editli"
   
  li.appendChild(document.createTextNode(`${obj.name}`));
  li.appendChild(document.createTextNode(" "));
  li.appendChild(document.createTextNode(`${obj.email}`));
  li.appendChild(del);
  li.appendChild(edt);
  userList.appendChild(li);
  name.value="";
    email.value=""
}

userList.addEventListener("click", remove);

function remove(e) {
  // e.preventDefault();
  if (e.target.classList.contains("delete")) {
    li = e.target.parentElement;
    let key = li.childNodes[2].textContent;
   datadelte(key)
    userList.removeChild(li);
  }
}

userList.addEventListener("click",edititem)

 function edititem(e){
  if(e.target.classList.contains("editli")){
    
    li = e.target.parentElement;
    let newName = li.childNodes[0].textContent;
    let newEmail = li.childNodes[2].textContent;
      // console.log(newName,newEmail)
      name.value=newName
      email.value=newEmail
      datadelte(newEmail)
      userList.removeChild(li)
      update(newEmail)
      
  }
}

 ///target unique key email/////
 function datadelte(key)
{
  axios
  .get(
    "https://crudcrud.com/api/4d93573f0a8b488fbce9a863087ae41f/appointmentcell"
  )
  .then((response) => {
    let data = response.data;
    for (let i = 0; i < data.length; i++){
      if (key === data[i].email) {
        // console.log(data[i]._id)
        axios.delete(
          `https://crudcrud.com/api/4d93573f0a8b488fbce9a863087ae41f/appointmentcell/${data[i]._id}`
        );

      }
    }
  });
}

















/////practice/////////
// const myform=document.querySelector("#my-form")
// const name=document.querySelector("#name")
// const email=document.querySelector("#email")
// const userList=document.querySelector("#users")

// myform.addEventListener("submit",onsubmit)

// function onsubmit(e){
//   e.preventDefault();
//   const name=e.target.name.value
//   const email=e.target.email.value
//   const obj={
//     name,
//     email,
//   }
  
//   const li=document.createElement("li")
//   const btn=document.createElement("button")
//   const edtbtn=document.createElement("button")
  

//  btn.appendChild(document.createTextNode("Delete"))
//  btn.style.margin="10px"
//  btn.className="del"
//  edtbtn.appendChild(document.createTextNode("Edit"))
//  edtbtn.className="edt"

//   li.appendChild(document.createTextNode(`${obj.name}`));
//   li.appendChild(document.createTextNode(" "));
//   li.appendChild(document.createTextNode(`${obj.email}`));
//   li.appendChild(btn)
//   li.appendChild(edtbtn)
//  userList.appendChild(li)
//  //clear input field//
// e.target.name.value="";
// e.target.email.value=""
// }
// userList.addEventListener("click",remove)

// function remove(e){
//   if(e.target.classList.contains("del")){
//     li=e.target.parentElement
//     let key=li.childNodes[2].textContent
//     userList.removeChild(li)
//   }
// }

// userList.addEventListener("click",edititem)

// function edititem(e){
// li=e.target.parentElement
// let newname=li.childNodes[0].textContent
// let newemail=li.childNodes[2].textContent

// name.value=newname
// email.value=newemail
// userList.removeChild(li)
// }