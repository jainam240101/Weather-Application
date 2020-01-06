const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const messageone=document.querySelector("#message1")
const messagtwo=document.querySelector("#message2")

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    console.log(location)
    fetch('/test?location='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent=error
            }
            else{
                messageone.textContent=data.place
                messagtwo.textContent=data.forecast
            }
        })
    })

})
