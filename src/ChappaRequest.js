const uid = function() {
    return 'tx_ref' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };
  
  const ChappaRequest = (currency, amount, firstName, lastName) => {
    console.log(currency, amount);
  
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer CHASECK_TEST-DJoVqQq8taDbvGcyYAyqI1lM9DSb4kXg");
    myHeaders.append("Content-Type", "application/json");
  
    var raw = JSON.stringify({
      "amount": amount,
      "currency": currency,
      "tx_ref": uid(),
      "return_url": "http://localhost:3000/thank-you",
      "first_name": firstName,
      "last_name": lastName
    });
  
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
  
    fetch("/api", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'success') {
          window.location.href = result.data.link; // Redirect to payment page
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  }
  
  export default ChappaRequest;
  