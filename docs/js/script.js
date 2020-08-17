const quoteTextdis=document.querySelector("#quote");
const quoteAuthordis=document.querySelector("#author");
const tweetbutton=document.querySelector("#twitter");
const newbutton=document.querySelector("#new-quote");
// get quote
async function getQuote(){
    const proxyUrl="https://cors-anywhere.herokuapp.com/"
    const apiUrl='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try {
        const response=await fetch(proxyUrl+ apiUrl);
        const {quoteAuthor,quoteText}=await response.json();
        //Check if the author is empty
        if(quoteAuthor===''){
            quoteAuthordis.innerHTML="unknow";
        }else{
            quoteAuthordis.innerHTML=quoteAuthor;
        }
        
        //manage long quotes
        if(quoteText.length>120){
            quoteTextdis.classList.add("long-quote");
        }else{
            quoteTextdis.classList.remove("long-quote");
        }
        quoteTextdis.innerHTML=quoteText;

    } catch (error) {
        console.log("something bad happen",error);
    }
}
function gettweet(){
    const quote=quoteTextdis.innerHTML;
    const author=quoteAuthordis.innerHTML;
    const twitUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitUrl,"_blank");
}
//on Load
getQuote();
//buttonListeners
newbutton.addEventListener("click",getQuote);
tweetbutton.addEventListener("click",gettweet);