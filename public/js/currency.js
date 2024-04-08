var myHeaders = new Headers();
myHeaders.append("apikey", "veGHysOhHdvNFtu35XKftBASCmyu6BKy");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};

fetch("https://api.apilayer.com/exchangerates_data/convert?to=USD&from=EUR&amount=10", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))