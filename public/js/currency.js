const inputCheckBox = document.getElementById("checkbox")
const queryButton = document.getElementById("query")
const divInputResult = document.querySelector(".input-result")
const inputExchange = document.getElementById("exchange-code")
let index = 10

inputCheckBox.addEventListener("change", () => {
    const checkboxClickDiv = document.getElementById("checkboxClickDiv")
    checkboxClickDiv.classList.toggle("checkbox-click")
    checkboxClickDiv.classList.toggle("checkbox-click-on")
})


queryButton.addEventListener("click", () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "rzW1BJ4Q5W2dftGrNBqfiWpkSPdCOyAc");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    if (inputCheckBox.checked) {
        
    } else {
        fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=&base=${inputExchange.value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            const divResult = document.createElement("div")
            divResult.classList.add("result")

            const pResult = document.createElement("p")
            pResult.innerHTML = "Az értékek"

            const divResultText = document.createElement("div")
            divResultText.classList.add("result-text")


            divResult.appendChild(pResult)
            divResult.appendChild(divResultText)
            divInputResult.appendChild(divResult)

            let keys = Object.keys(result.rates)
            let values = Object.values(result.rates)

            for (let i = 0; i < index; i++) {
                const divResultTextSpan = document.createElement("div")
                divResultTextSpan.classList.add("result-text-span")

                const spanKey = document.createElement("span")
                const spanValue = document.createElement("span")

                spanKey.innerHTML = keys[i]
                spanValue.innerHTML = values[i]

                delete keys[i]
                delete values[i]

                divResultTextSpan.appendChild(spanKey)
                divResultTextSpan.appendChild(spanValue)

                divResultText.appendChild(divResultTextSpan)
            }

            
            const loadMoreButton = document.createElement("button")
            loadMoreButton.innerHTML = "További betöltése"

            divResult.appendChild(loadMoreButton)

            console.log(keys);
            console.log(values);


            loadMoreButton.addEventListener("click", () => {
                if (keys[169] != undefined) {
                    for (let i = index; i < index + 10; i++) {
                        const divResultTextSpan = document.createElement("div")
                        divResultTextSpan.classList.add("result-text-span")
        
                        const spanKey = document.createElement("span")
                        const spanValue = document.createElement("span")
        
                        spanKey.innerHTML = keys[i]
                        spanValue.innerHTML = values[i]
        
                        delete keys[i]
                        delete values[i]
        
                        divResultTextSpan.appendChild(spanKey)
                        divResultTextSpan.appendChild(spanValue)
        
                        divResultText.appendChild(divResultTextSpan)
                    }
                } else {
                    return
                }

                index += 10

                console.log(keys);
                console.log(values);
            })
        })
    }
})