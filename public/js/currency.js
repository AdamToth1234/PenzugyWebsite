const inputCheckBox = document.getElementById("checkbox")
const queryButton = document.querySelector("button")
const divInputResult = document.querySelector(".input-result")
const inputExchange = document.getElementById("exchange-code")
const clearBtn = document.getElementById("clear")
const searchInput = document.getElementById("search")
let index = 34


searchInput.addEventListener("input", () => {
    const hideTextSpan = document.querySelectorAll(".hide")

    if (searchInput.value == "") {
        for (let i of hideTextSpan) {
            i.classList.remove("hide")
            i.classList.add("result-text-span")
        }
    } else {
        for (let i of hideTextSpan) {
            i.classList.remove("hide")
            i.classList.add("result-text-span")
        }

        const resultTextSpan = document.querySelectorAll(".result-text-span")
        let trimmedInput = searchInput.value.replace(/\s+/g, "");

        for (let i of resultTextSpan) {
            let currencyCode = i.children[0].innerHTML.substring(0, trimmedInput.length)
            if (currencyCode != trimmedInput.toUpperCase()) {
                i.classList.remove("result-text-span")
                i.classList.add("hide")
            }
        }
    }
})


inputCheckBox.addEventListener("change", () => {
    const checkboxClickDiv = document.getElementById("checkboxClickDiv")
    checkboxClickDiv.classList.toggle("checkbox-click")
    checkboxClickDiv.classList.toggle("checkbox-click-on")
})


clearBtn.addEventListener("click", () => {
    const result = document.querySelectorAll(".result")
    for (let i of result) {
        i.remove()
    }
    clearBtn.classList.remove("reveal")
    clearBtn.classList.add("hide")

    searchInput.classList.remove("reveal")
    searchInput.classList.add("hide")
})


queryButton.addEventListener("click", () => {
    var myHeaders = new Headers();
    myHeaders.append("apikey", "An9fHXnm4tgyr6d2Yj3hwZh1H1qT1IT2");

    var requestOptions = {
        method: 'GET',
        redirect: 'follow',
        headers: myHeaders
    };

    if (inputCheckBox.checked) {
        const checkboxClickDiv = document.getElementById("checkboxClickDiv")
        fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${checkboxClickDiv.children[0].value}&from=${inputExchange.value}&amount=${checkboxClickDiv.children[1].value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert("Hiba! Ellenőrizd az adatokat, amiket beütöttél!")
            } else {
                clearBtn.classList.remove("hide")
                clearBtn.classList.add("reveal")

                const divResult = document.createElement("div")
                divResult.classList.add("result")

                const pResult = document.createElement("p")
                pResult.innerHTML = "Az értékek"
                pResult.style.textAlign = "center"
                pResult.style.fontSize = "2rem"

                const divResultText = document.createElement("div")
                divResultText.classList.add("result-text")

                const divResultTextDiv = document.createElement("div")
                divResultTextDiv.classList.add("result-text-div")

                
                divResultText.appendChild(divResultTextDiv)
                divResult.appendChild(pResult)
                divResult.appendChild(divResultText)
                divInputResult.appendChild(divResult)


                const divResultTextSpan = document.createElement("div")
                divResultTextSpan.classList.add("result-text-span")

                const spanKey = document.createElement("span")
                const spanValue = document.createElement("span")

                spanKey.innerHTML = result.query.to
                spanValue.innerHTML = Number(result.result.toFixed(4)).toLocaleString('hu-HU')


                divResultTextSpan.appendChild(spanKey)
                divResultTextSpan.appendChild(spanValue)

                divResultTextDiv.appendChild(divResultTextSpan)
            }
        })
    } else {
        fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=&base=${inputExchange.value}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result.error) {
                alert("Hiba! Ellenőrizd az adatokat, amiket beütöttél!")
            } else {
                clearBtn.classList.remove("hide")
                clearBtn.classList.add("reveal")

                searchInput.classList.remove("hide")
                searchInput.classList.add("reveal")

                const divResult = document.createElement("div")
                divResult.classList.add("result")
    
                const pResult = document.createElement("p")
                pResult.innerHTML = "Az értékek"
                pResult.style.textAlign = "center"
                pResult.style.fontSize = "2rem"
    
                const divResultText = document.createElement("div")
                divResultText.classList.add("result-text")
    
                const divResultTextDiv = document.createElement("div")
                divResultTextDiv.classList.add("result-text-div")
    
    
                divResultText.appendChild(divResultTextDiv)
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
                    spanValue.innerHTML = Number(values[i]).toFixed(4)
    
                    delete keys[i]
                    delete values[i]
    
                    divResultTextSpan.appendChild(spanKey)
                    divResultTextSpan.appendChild(spanValue)
    
                    divResultTextDiv.appendChild(divResultTextSpan)
                }
    
                
                const loadMoreButton = document.createElement("button")
                loadMoreButton.innerHTML = "További betöltése"
    
                divResult.appendChild(loadMoreButton)
    
    
                loadMoreButton.addEventListener("click", () => {
                    if (keys[169] != undefined) {
                        const divResultTextDiv = document.createElement("div")
                        divResultTextDiv.classList.add("result-text-div")
                        divResultText.appendChild(divResultTextDiv)
                        for (let i = index; i < index + 34; i++) {
                            const divResultTextSpan = document.createElement("div")
                            divResultTextSpan.classList.add("result-text-span")
            
                            const spanKey = document.createElement("span")
                            const spanValue = document.createElement("span")
            
                            spanKey.innerHTML = keys[i]
                            spanValue.innerHTML = Number(values[i]).toLocaleString('hu-HU')
            
                            delete keys[i]
                            delete values[i]
            
                            divResultTextSpan.appendChild(spanKey)
                            divResultTextSpan.appendChild(spanValue)
            
                            divResultTextDiv.appendChild(divResultTextSpan)
                        }
                    } else {
                        return
                    }
    
                    index += 34
                })
            }
        })
    }
})