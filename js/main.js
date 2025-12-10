let elCountries = document.querySelector(".country-list")
let elSelect = document.querySelector(".country-select")
let elInpit = document.querySelector(".input")



// select start
function selectCountry(arr, list){
    let countryRes = arr.reduce((prevValue, item) => {
      if(!prevValue.includes(item.region)){
        prevValue.push(item.region)
      }
      return prevValue
    },[])
  
    



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
    elItem.className = "w-[300px] rounded-md bg-slate-300 overflow-hidden"
    elItem.innerHTML = `
      <li class="bg-[#FEBA17] cursor-pointer">
                    <img class="w-[300px] h-[200px]" src="${item.img}" alt="" width="300" height="200">
                    <div class="py-[10px] px-[10px] text-black">
                        <p><strong>Country:</strong> ${item.name}</p>
                        <p><strong>Capital:</strong> ${item.capital}</p>
                        <p><strong>Population:</strong> ${item.population}</p>
                        <p><strong>Region:</strong> ${item.region}</p>
                    </div>
                    <div class="pl-[10px] pt-[20px] pb-[5px]">
                    <button><img class="w-[35px] mr-[19px] cursor-pointer" src="./images/love.png"/></button>
                    <button><img class="w-[35px]  mr-[19px] cursor-pointer" src="./images/save-instagram.png"/></button>
                    <button><img class="w-[35px]  mr-[19px] cursor-pointer" src="./images/plus.png"/></button> 
                    <button><img class="w-[35px]  mr-[19px] cursor-pointer" src="./images/rotation.png"/></button>
                    <button><img class="w-[35px]  mr-[19px] cursor-pointer" src="./images/delete.png"/></button>

                    </div>

                </li>` 
        list.appendChild(elItem)
});
}
renderCountry(countries, elCountries)
// render country end