const button = document.querySelector("button")
const inputTickerSymbol = document.getElementById("stock")

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
        console.log(response);
    })
})