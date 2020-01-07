console.log("Client Script on")
const search=document.querySelector('input')
const messageone=document.querySelector("#message1")
const messagtwo=document.querySelector("#message2")
const messagethree=document.querySelector("#message3")

messageone.textContent=''
document.getElementById("submitbtn").addEventListener('click',(e)=>{
    //console.log("Event Started")
    e.preventDefault()
    const location=search.value
    messageone.textContent="Loading..."
    messagtwo.textContent=''
    messagethree.textContent=''
    //console.log(location)
    fetch('/test?location='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageone.textContent=error
            }
            else{
                messageone.textContent=data.place
                messagtwo.textContent=data.forecast
                messagethree.textContent=data.second_statement
            }
        })
    })
})
