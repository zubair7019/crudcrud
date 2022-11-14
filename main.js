const myform = document.querySelector("#my-form");
const Inputname = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");

myform.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;

  const obj = {
    name,
    email,
  };

  axios
    .post(
      "https://crudcrud.com/api/074139016f66489c8d26028642d74e06/appointmentcell",
      obj
    )
    .then((response) => {
      onSubmit(response.data);
      // console.log(response)
    })
    .catch((err) => console.log(err));


  if (Inputname.value === "" || emailInput.value === "") {
    msg.classList.add("error");
    msg.innerHTML = "please enter all field";
    setTimeout(() => msg.remove(), 3000);
  } else {
    const li = document.createElement("li");
    //add delete and edit
    const del = document.createElement("button");
    const edt = document.createElement("button");
    del.appendChild(document.createTextNode("delete"));
    del.className = "delete";
    edt.appendChild(document.createTextNode("EDIT"));

    // li.appendChild(document.createTextNode(`${Inputname.value} ${emailInput.value}`))

    li.appendChild(document.createTextNode(`${obj.name}`));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(`${obj.email}`));
    li.appendChild(del);
    li.appendChild(edt);
    userList.appendChild(li);

    // clearfiled
    Inputname.value = "";
    emailInput.value = "";
  }
}

  /////userscreen update///

window.addEventListener("DOMContentLoaded",()=>{
    axios.get("https://crudcrud.com/api/074139016f66489c8d26028642d74e06/appointmentcell")
    .then((response)=>{
        // console.log(response.data)
        for(let i=0;i<response.data.length;i++)
        {
            onscreenshow(response.data[i])
        }
    })
    .catch((error)=>{
        console.log(error)
    })
 })
 //adding screenshow the data on screen if rfresh the page//
function onscreenshow(obj)
{
const li = document.createElement("li");
    //add delete and edit
    const del = document.createElement("button");
    const edt = document.createElement("button");
    del.appendChild(document.createTextNode("delete"));
    del.className = "delete";
    edt.appendChild(document.createTextNode("EDIT"));


    li.appendChild(document.createTextNode(`${obj.name}`));
    li.appendChild(document.createTextNode(" "));
    li.appendChild(document.createTextNode(`${obj.email}`));
    li.appendChild(del);
    li.appendChild(edt);
    userList.appendChild(li);

}


userList.addEventListener("click", remove);

function remove(e) {
  
  e.preventDefault();
  if (e.target.classList.contains("delete")) {
    li = e.target.parentElement;
    let key = li.childNodes[2].textContent;
     axios.get("https://crudcrud.com/api/074139016f66489c8d26028642d74e06/appointmentcell").then((response)=>{
      let data=response.data
      for(let i=0;i<data.length;i++)
      {
        if(key===data[i].email)
        {
          console.log(data[i]._id)
          axios.delete(`https://crudcrud.com/api/074139016f66489c8d26028642d74e06/appointmentcell/${data[i]._id}`)
        }
      }
     })

    userList.removeChild(li);
  }
}
