const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res=>res.json())
    .then(data=>displayLesson(data.data) )
}
const addBtnOutline=()=>{
    const btnOutline=document.querySelectorAll(".lesson-btn")
    btnOutline.forEach(btn=>btn.classList.add("btn-outline"))
     
}
const loadLessonWord=(id)=>{
    manageSpinner(true);
    const url=`https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        addBtnOutline()
        const clickBtn=document.getElementById(`lesson-btn-${id}`)
        clickBtn.classList.remove("btn-outline")
        return displayLessonWord(data.data)
    })
}
const loadWordDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/word/${id}`
    const res=await fetch(url)
    const data= await res.json()
    displayWardDetails(data.data)
}
const synonyms=(arr)=>{
    const newArr=arr.map(data=>`<span class="btn">${data}</span>`)
    return newArr.join(" ")
}
const manageSpinner=(status)=>{
    if(status==true){
        document.getElementById("spinner-div").classList.remove("hidden")
        document.getElementById("card-container").classList.add("hidden")
    }else{
         document.getElementById("card-container").classList.remove("hidden")
        document.getElementById("spinner-div").classList.add("hidden")
    }
}
const displayWardDetails=(word)=>{
 
    const modalBox=document.getElementById("modal-box")
    modalBox.innerHTML=`
             <h1 class="text-4xl font-semibold leading-10">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h1>
      <p class="text-2xl font-semibold">Meaning</p>
      <p class="text-2xl font-medium bangla-font">${word.meaning?word.meaning:"Not Found"}</p>
      <p class="text-2xl font-semibold">Example</p>
      <p class="text-2xl">${word.sentence?word.sentence:"Not Found"}</p>
      <p class="text-2xl font-medium bangla-font">সমার্থক শব্দ গুলো</p>
      <div>
        ${synonyms(word.synonyms)}
      </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
    
    `
    document.getElementById("my_modal_5").showModal()
    
}
const displayLessonWord=(words)=>{
    
    const cardContainer=document.getElementById("card-container")
    cardContainer.innerHTML=""
     if(words.length===0){
            cardContainer.innerHTML=`
                     <div class="text-center space-y-5 col-span-full p-8">
                <img class="items-center mx-auto" src="./assets/alert-error.png" alt="">
                <p class="bangla-font text-sm ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="text-4xl font-medium">নেক্সট Lesson এ যান</h1>
            </div>
            ` 
            manageSpinner(false)
            return
        }
    for(let word of words){
       
        const newDiv=document.createElement("div")
        newDiv.innerHTML=`
                <div class="bg-white text-center space-y-4 p-5 rounded-2xl h-full">
                <h1 class="text-3xl font-bold">${word.word?word.word:"Not Found"}</h1>
                <p class="text-xl font-medium">Meaning /Pronounciation</p>
                <div class="text-3xl font-semibold bangla-font">"${word.meaning?word.meaning:"Not Found"} / ${word.pronunciation?word.pronunciation:"Not Found"}"</div>
                <div class="flex justify-between items-center w-10/12 mx-auto">
                    <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info "></i></button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        cardContainer.appendChild(newDiv)
        manageSpinner(false)
    }
}
const displayLesson=(lessons)=>{
    const lessonContainer=document.getElementById("lesson-container")
    lessonContainer.innerHTML=""
   for(let lesson of lessons ){
     const newDiv=document.createElement("div")
    newDiv.innerHTML=`
            <div class="mt-10 ">
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLessonWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn" ><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
             </div>
    `
    lessonContainer.append(newDiv)
   }
}
loadLesson()
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
document.getElementById("search-btn").addEventListener("click", ()=>{
    const input=document.getElementById("search-input")
    const inputValue=input.value.trim().toLowerCase()
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res=>res.json())
    .then(data=>{
        const allWord=data.data
        const filterWord=allWord.filter(word=>word.word.toLowerCase().includes(inputValue))
        displayLessonWord(filterWord)
    })
})