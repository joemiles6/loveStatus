// javascript 

const form = document.querySelector('form')
const getBoo = document.querySelector('#boo')
const getBabe = document.querySelector('#bae')
const stat = document.querySelector('.stat')
const mainStat = document.querySelector('.statusMain')
const lodash = document.querySelector('.lodash')
const stage = document.querySelector('.stage')


    const state = {arrLogs : []}


function tidy(){
    updateStorage()
}

// Random engine 

const random = function(rand){
let msg;
let arrH = ['hate', 'fairly hates', 'has uncountable hatred', 'has sexual feelings', 'is cheating on']
let arrL= ['has unBreakable love for', 'has One love for',  'has an undisputed love for']
let arrC= ['jovial love', 'Room mate love',  'casual love', 'brotherly love', 'outdated love', 'dating love', 'parental love', 'Funny love', 'workers love', 'emotional love' ]
if(rand < 50){
    msg = arrH[Math.floor(Math.random() * arrH.length)] 
}else if(rand < 70 && rand > 51){
    msg = arrC[Math.floor(Math.random() * arrC.length)]
}
else{
    msg = arrL[Math.floor(Math.random() * arrL.length)]
}
 return msg
} 


form.addEventListener('submit', (e) => {
    e.preventDefault()
    const rand = Math.floor(Math.random() * 100)

    lodash.style.display="inline-block"
    fetch(`/calculate/?boo=${getBoo.value}&bae=${getBabe.value}`).then((response) => {
     response.json().then((data) => { 
        if(data.error){
            lodash.style.display="none"
            stat.textContent ='Error : ' + data.error
        } else {
            // validate
            if(getBoo.value === '' || getBabe.value === '') {
                lodash.style.display="inline-block"
                stat.textContent ='Error : missing field :( '
                
            } else{
             lodash.style.display="none"
             updateHistory(rand, {a: data.boo, b: data.bae}, random(rand))
            const markup = ['If you judge people, you have no time to love them', 'Love conquers all things; let us too surrender to Love', 'Love gives light even in the darkest tunnel.', 'True love doesn\'t have a happy ending, it\'s because true love doesn\'t have an ending.']
            const msg = markup[Math.floor(Math.random() * markup.length)] 
            stat.innerHTML = '<marquee>' + msg + '</marquee>'
           clearInput( getBoo, getBabe)
            }
             
        }
     })
    })

})


function updateHistory(percent, data, amount){
    const arrColors = ['#4caf50', '#3a065e', '#03ac6b', '#f342a9', '#313131', '#94c1f7', '#7270f1']
    const markup = `<div class="parent" data-findArr=${state.arrLogs.length}>
            <div class="count">
               ${percent}%
           </div>
           <div class="table">
               <div class="tradeMark" style="background-color:${arrColors[Math.floor(Math.random() * arrColors.length)]}">${data.a.charAt(0).toUpperCase()}${data.b.charAt(0).toUpperCase()}</div>
               <div class="name">${shortenText(data.a)} ${amount} ${shortenText(data.b)} with ${percent}%</div>
               <div class="cancel"><i class="fa fa-trash"></i></div>
           </div>
           </div>`

        //  persist storage
            state.arrLogs.push(markup)
            localStorage.setItem('store', JSON.stringify(state.arrLogs))
            stage.insertAdjacentHTML('afterbegin', markup) 
}



// UPDATE STORAGE
function updateStorage(){

    const storage = JSON.parse(localStorage.getItem('store'))
    if(storage) state.arrLogs = storage
    state.arrLogs.forEach(el => {
        stage.insertAdjacentHTML('afterbegin', el)
    })
   return state.arrLogs  
}
// ADD EVENT LISTENSERS FOR:

// HISTORY ACCORDIAN

document.querySelector('#history').addEventListener('click', () => {
    if(stage.style.display == 'block'){
            console.log( stage.style.display="none")
    } else{
     stage.style.display="block"
    }
    
 })

// gender switching 

document.querySelector('.switch').addEventListener('click', () => {
    // variables
    const male = document.querySelector('#male')
    const female = document.querySelector('#female')

    // work flows
   if(male.className.endsWith('fa fa-male') && female.className.endsWith('fa fa-female')  ) {
       male.className = 'fa fa-female'
        female.className = 'fa fa-male'
   }else if (male.className.endsWith('fa fa-female') && female.className.endsWith('fa fa-male')) {
    male.className = 'fa fa-male'
    female.className = 'fa fa-female'
   }

//    Exchange placeholder
   if(getBoo.placeholder === "BOO'S NAME"){
    getBoo.placeholder = "BABE'S NAME"
    
   }else{
    getBoo.placeholder = "BOO'S NAME"
   }
   if(getBabe.placeholder === "BABE'S NAME"){
    getBabe.placeholder = "BOO'S NAME"
   }else{
    getBabe.placeholder = "BABE'S NAME"
   }

})


addEventListener('click', function(ev){
    deleteItem(ev)
})

// 
 
document.querySelector('#navigate').addEventListener('click', function(){
        const status = document.querySelector('.status')
        const section = document.querySelector('.section')
       
        if(status.style.display === 'none') {
            section.style.cssText=" flex-grow: 1; display: grid; grid-template: 100% / 0px 1fr;"
            status.style.cssText ="display:block"
            } else {
                section.style.cssText=" flex-grow: 1; display: grid; grid-template: 100% / 1fr 0px;"
                status.style.cssText ="display:none"
            }

})


// --------------------------------------------------------- End of listener ------------------------


// litte function 

function shortenText(value, setLength= 6){
 const short = Array.from(value).slice(0,  setLength).join('') + `${value.length > 30 ? '...' : ''}`
   return short
}

function clearInput(getBoo, getBabe) {
    // const cant be mutated
    let clear = Array.from(getBoo.value).slice(0, getBoo.value.length);
    getBoo.value = ''
    getBabe.value = ''
    getBoo.focus()
    return clear
     
}


// DELETE UTILISES
function deleteItem(ev) {
    if(ev.target.closest(".cancel")){
        const trash = document.querySelectorAll('.cancel');

        const trueData = ev.target.closest(".cancel").parentElement.parentElement
        // clear ui
        trueData.style.cssText = "background:#313131"
        deleteFromUI(trueData)
       
    }
}


function deleteFromUI(trueData) {
    setTimeout(()=>{
        //  clear from ui
        trueData.style.display="none"

        // clear from local storage
        state.arrLogs.splice(trueData.dataset.findarr, 1)
        localStorage.setItem('store', JSON.stringify(state.arrLogs))    
    }, 2000)
    }


 


    
    tidy()
