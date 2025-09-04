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
                    <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-circle-info "></i></button>
                    <button class="btn bg-[#1A91FF10]"><i class="fa-solid fa-volume-high"></i></button>
                </div>
            </div>
        `
        cardContainer.appendChild(newDiv)
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