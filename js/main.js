let elCountries = document.querySelector(".country-list")
let elSelect = document.querySelector(".country-select")
let elInpit = document.querySelector(".input")
let elLikeBtn = document.querySelector(".like-btn")
let elSavedBtn = document.querySelector(".saved-btn")
let elModalWrapper = document.querySelector(".modal-wrapper")
let elInnerWrapper = document.querySelector(".inner-wrapper")

let countries = get("countries") || countrylist

// Storage start
function set(key,value){
  localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value) : value)
}
function get(key){
    try{
      const result = JSON.parse(localStorage.getItem(key))
      return result
    }catch{
      return localStorage.getItem(key)
    }
}
set("countries", countries)
// Storage end


// mode start
function modeClick(){
  document.body.classList.toggle("dark")
}
// mode end



// Modal start 
function showModal(active){
  if(active){
    elModalWrapper.classList.remove("scale-[0]")
    elModalWrapper.classList.add("scale-[1]")
  }else{
    elModalWrapper.classList.remove("scale-[1]")
    elModalWrapper.classList.add("scale-[0]")
  }
}
elModalWrapper.addEventListener("click", (evt)=>{
      if(evt.target.id){
        showModal()
      }
})
// Modal end

// Format population
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
// Format population


// select start
function selectCountry(arr, list){
  list.innerHTML = null
    let countryRes = arr.reduce((prevValue, item) => {
      if(!prevValue.includes(item.region)){
        prevValue.push(item.region)
      }
      return prevValue
    },["All"])
         countryRes.forEach(item =>{
          let elOption = document.createElement("option")
          elOption.textContent = item
          elOption.value = item.toLowerCase()
          list.appendChild(elOption)
         })
         
}
selectCountry(countries, elSelect)

elSelect.addEventListener("change", (evt)=>{
 if(evt.target.value == "all"){
   renderCountry(countries, elCountries)
}else{
  const selectlist = countries.filter(item => item.region.toLowerCase() == evt.target.value)
   renderCountry(selectlist, elCountries)
 }
})
// select end



// input start
elInpit.addEventListener("input", (evt)=>{
  const searchinput = countries.filter(item => item.name.toLowerCase().includes(evt.target.value.toLowerCase()) || item.capital.toLowerCase().includes(evt.target.value.toLowerCase()) || item.population.toLowerCase().includes(evt.target.value.toLowerCase()))
  renderCountry(searchinput, elCountries)
})
// input end 




// render country start
function renderCountry(arr, list){
  list.innerHTML = null
  arr.forEach(item => {
    let elItem = document.createElement("li")
    elItem.innerHTML = `
      <li class="render-item cursor-pointer w-[300px] rounded-md overflow-hidden shadow-lg shadow-[#040f8f] hover:scale-105 duration-300">
                    <img class="w-[300px] h-[200px]" src="${item.img}" alt="" width="300" height="200">
                    <div class="py-[10px] px-[10px] render-item-text ">
                        <p><strong>Country:</strong> ${item.name}</p>
                        <p><strong>Capital:</strong> ${item.capital}</p>
                        <p><strong>Population:</strong> ${item.population}</p>
                        <p><strong>Region:</strong> ${item.region}</p>
                    </div>
                    <div class="pl-[10px] pt-[20px] pb-[5px]">
                    <button><img onclick="likeBtnClick(${item.id})" class="w-[35px]  mr-[19px] cursor-pointer" src="${item.active ? './images/love1.png' : './images/love.png'}"/></button>
                    <button><img onclick="savedBtnClick(${item.id})" class="w-[35px]  mr-[19px] cursor-pointer" src="${item.saved ? './images/bookmark.png' : './images/save-instagram.png'}"/></button>
                    <button><img onclick="MorehandleClick(${item.id})" class="w-[35px]  mr-[19px] cursor-pointer" src="./images/plus.png"/></button> 
                    <button><img onclick="UpdatehandleClick(${item.id})"  class="w-[35px]  mr-[19px] cursor-pointer" src="./images/rotation.png"/></button>
                    <button><img onclick="DeletehandleClick(${item.id})" class="w-[35px]  mr-[19px] cursor-pointer" src="./images/delete.png"/></button>

                    </div>

                </li>` 
        list.appendChild(elItem)
});
elLikeBtn.children[1].textContent = countries.filter(item => item.active).length
elSavedBtn.children[1].textContent = countries.filter(item => item.saved).length
}
renderCountry(countries, elCountries)
// render country end


// Like start 
function likeBtnClick(id){
  const likeBtn = countries.find(item => item.id == id)
  likeBtn.active = !likeBtn.active;
  renderCountry(countries, elCountries)
  set("countries", countries)
}
elLikeBtn.addEventListener("click", () => {
  let likelist = countries.filter(item => item.active)
  renderCountry(likelist, elCountries)
})


// Like end


// Saved start
function savedBtnClick(id){
  const savedBtn = countries.find(item => item.id == id)
  savedBtn.saved = !savedBtn.saved;
  renderCountry(countries, elCountries)
  set("countries", countries)
}
elSavedBtn.addEventListener("click", () => {
  let savedlist = countries.filter(item => item.saved)
  renderCountry(savedlist, elCountries)
})
// Saved end

// More start
function MorehandleClick(id){
  const moreClick = countries.find(item => item.id == id);
  showModal(true)
 elInnerWrapper.classList.add("h-[400px]")
  elInnerWrapper.classList.remove("h-[200px]")
  elInnerWrapper.innerHTML = `
  <div class="flex items-center justify-center gap-[40px] pt-[33px]">
  <img class="w-[400px] h-[300px]" src="${moreClick.img}" alt="" width="300" height="200">
  <div class="py-[10px] px-[10px] more text-[18px]">
              <p><strong>Country:</strong> ${moreClick.name}</p>
              <p><strong>Capital:</strong> ${moreClick.capital}</p>
              <p><strong>Population:</strong> ${moreClick.population}</p>
              <p><strong>Region:</strong> ${moreClick.region}</p>
           </div>
   </div>
  `
  
}
// More end


// Delete start
function DeletehandleClick(id){
  showModal(true)
  elInnerWrapper.classList.remove("h-[400px]")
  elInnerWrapper.classList.add("h-[200px]")

  elInnerWrapper.innerHTML = `
  <div class="text-center">
      <h2 class="text-bold delete rounded-md text-[32px] mb-[20px] pt-[15px]">ARE YOU SOUR DELETE </h2>
      <div class="flex justify-center gap-[20px]">
      <button onclick="cancelClick()" class="w-[40%] bg-green-500 h-[50px] cursor-pointer">Cancel</button>
      <button onclick="deleteClick(${id})" class="w-[40%] bg-red-500 h-[50px] cursor-pointer">Delete</button>
      </div>
  </div>
  `
}
function cancelClick(){
showModal()
}

function deleteClick(id){
const deletebtn = countries.findIndex(item => item.id == id)
countries.splice(deletebtn, 1)
renderCountry(countries, elCountries)
set("countries", countries)
showModal()

}
// Delete end 


// Create start 
function handleCreateBtn(){
  showModal(true)
   elInnerWrapper.classList.remove("h-[400px]")
   elInnerWrapper.classList.add("h-[350px]")
  elInnerWrapper.innerHTML = `
  <form class="flex flex-wrap justify-center create-form">
  <div class="flex justify-between pt-[10px]">
    <div class="w-[49%] space-y-[30px] ">
       <input name="img" class="w-full rounded-md p-2 border-[1px] input" placeholder="Enter img link"/>
       <input name="name" class="w-full rounded-md p-2 border-[1px] input" placeholder="Enter country name"/>
       <input name="capital" class="w-full rounded-md p-2 border-[1px] input" placeholder="Enter country capital"/>
    </div>
    <div class="w-[49%] space-y-[30px] ">
       <input name="population" class="w-full rounded-md p-2 border-[1px] input" placeholder="Enter country population"/>
       <input name="region" class="w-full rounded-md p-2 border-[1px] input" placeholder="Enter country region"/>
    </div>  
  </div>
  <button type="submit" class="mt-[50px] create cursor-pointer w-[49%] py-[10px] rounded-[10px]">Create</button>
  </form>
  `

  let elCreateform = document.querySelector(".create-form")
  elCreateform.addEventListener("submit", (evt) => {
   evt.preventDefault()
   const data = {
     id: countries[countries.length - 1].id ? countries[countries.length - 1].id + 1 : 1,
     img: evt.target.img.value,
     name: evt.target.name.value,
     population: formatNumber(evt.target.population.value),
     region: evt.target.region.value,
     capital: evt.target.capital.value,
     active:false,
     saved:false,
   }
countries.push(data);
renderCountry(countries, elCountries);
selectCountry(countries, elSelect)
showModal()    
  })
}
// Create end


// Update start 
function UpdatehandleClick(id){
showModal(true)
 elInnerWrapper.classList.remove("h-[400px]")
   elInnerWrapper.classList.add("h-[350px]")
let Updatecountry = countries.find(item => item.id == id);
 elInnerWrapper.innerHTML = `
  <form class="flex flex-wrap justify-center create-form">
  <div class="flex justify-between pt-[10px]">
    <div class="w-[49%] space-y-[30px] ">
       <input value="${Updatecountry.img}" name="img" class="w-full rounded-md p-2 border-[1px] update"/>
       <input value="${Updatecountry.name}" name="name" class="w-full rounded-md p-2 border-[1px] update" />
       <input value="${Updatecountry.capital}" name="capital" class="w-full rounded-md p-2 border-[1px] update" />
    </div>
    <div class="w-[49%] space-y-[30px] ">
       <input value="${Updatecountry.population}" name="population" class="w-full rounded-md p-2 border-[1px] update"/>
       <input value="${Updatecountry.region}" name="region" class="w-full rounded-md p-2 border-[1px] update"/>
    </div>  
  </div>
  <button type="submit" class="mt-[50px] create w-[49%] py-[10px] rounded-[10px]">Update</button>
  </form>
  `

   let elCreateform = document.querySelector(".create-form")
  elCreateform.addEventListener("submit", (evt) => {
   evt.preventDefault()
   
  Updatecountry.img = evt.target.img.value
  Updatecountry.name = evt.target.name.value
  Updatecountry.population = evt.target.population.value
  Updatecountry.region = evt.target.region.value
  Updatecountry.capital = evt.target.capital.value
  
  


renderCountry(countries, elCountries);
set("countries", countries)
showModal()    
  })
}
// Update end