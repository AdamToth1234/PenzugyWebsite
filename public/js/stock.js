const button = document.querySelector("button")
const inputTickerSymbol = document.getElementById("stock")
const divInputResult = document.querySelector(".input-result")
const clearBtn = document.getElementById("clear")


clearBtn.addEventListener("click", () => {
    const result = document.querySelectorAll(".result")
    for (let i of result) {
        i.remove()
    }
    clearBtn.classList.remove("reveal")
    clearBtn.classList.add("hide")
})


button.addEventListener("click", () => {
    let trimmedInput = inputTickerSymbol.value.replace(/\s+/g, "");
    let splittedInput = trimmedInput.split(",")
    
    fetch("/stock-prices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: splittedInput,
        })
    }).then(res => {
        return res.json()
    }).then(response => {
        if (Object.keys(response.message).includes("message")) {
            for (let i of Object.values(response)) {
                if (i.message) {
                    alert("Hiba! Ellenőrizd az adatokat, amiket beütöttél!")
                    break
                }
            }
        } else {
            let problem = false
            for (let i of Object.values(response.message)) {
                if (i.message) {
                    alert("Hiba! Ellenőrizd az adatokat, amiket beütöttél!")
                    problem = true
                    break
                }
            }
            if (!problem) {
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
    
                let keys = Object.keys(response.message)
                let values = Object.values(response.message)
                console.log(response.message);
    
    
                for (let i = 0; i < keys.length; i++) {
                    const divResultTextSpan = document.createElement("div")
                    divResultTextSpan.classList.add("result-text-span")
    
                    const spanKey = document.createElement("span")
                    const spanValue = document.createElement("span")
    
                    if (keys.length == 1) {
                        spanKey.innerHTML = inputTickerSymbol.value.toUpperCase()
                        spanValue.innerHTML = `$${Number(values[0]).toFixed(2)}`
                    } else {
                        spanKey.innerHTML = keys[i].toUpperCase()
                        spanValue.innerHTML = `$${Number(values[i]["price"]).toFixed(2)}`
                    }
    
    
                    divResultTextSpan.appendChild(spanKey)
                    divResultTextSpan.appendChild(spanValue)
    
                    divResultTextDiv.appendChild(divResultTextSpan)
                }
            }

        }
    })
})