const inputCheckBox = document.getElementById("checkbox")

inputCheckBox.addEventListener("change", () => {
    const exception = document.getElementById("exception")
    exception.classList.toggle("exception")
    exception.classList.toggle("exception-div")

    var myHeaders = new Headers();
    myHeaders.append("apikey", "rzW1BJ4Q5W2dftGrNBqfiWpkSPdCOyAc");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    fetch("https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=10", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
})