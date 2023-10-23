const url = "http://localhost:5002";
// const url =  "http://tradecars.onrender.com";

const send = async () => {
  const response = await fetch(url+"/api/mail", {
    Method: 'POST'
});
}

