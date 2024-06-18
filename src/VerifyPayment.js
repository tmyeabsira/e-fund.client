const VerifyPayment = (tx_ref)=>{

    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer CHASECK_TEST-DJoVqQq8taDbvGcyYAyqI1lM9DSb4kXg");
    
    var raw = "";
    
    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
    
    fetch(`https://api.chapa.co/v1/transaction/verify/${tx_ref}`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

export default VerifyPayment;