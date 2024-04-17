const button = document.querySelector("button")
const inputCryptoSymbol = document.getElementById("crypto-symbol")
const divInputResult = document.querySelector(".input-result")
const clearBtn = document.getElementById("clear")
const searchInput = document.getElementById("search")


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


button.addEventListener("click", () => {
    let trimmedInput = inputCryptoSymbol.value.replace(/\s+/g, "");
    let splittedInput = trimmedInput.split(",")

    fetch("/crypto-prices", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            input: splittedInput,
        })
    })
    .then(res => {
        return res.json()
    })
    .then(response => {
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


        let keys = Object.keys(response.message.rates)
        let values = Object.values(response.message.rates)

        for (let i = 0; i < keys.length; i++) {
            const divResultTextSpan = document.createElement("div")
            divResultTextSpan.classList.add("result-text-span")

            const spanKey = document.createElement("span")
            const spanValue = document.createElement("span")

            spanKey.innerHTML = keys[i].toUpperCase()
            spanValue.innerHTML = `${Number(values[i].toFixed(2)).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`


            divResultTextSpan.appendChild(spanKey)
            divResultTextSpan.appendChild(spanValue)

            divResultTextDiv.appendChild(divResultTextSpan)
        }
    })
})