const url = "http://localhost:5001";
// const url =  "http://tradecars.onrender.com";
// const url =  "https://tradecars-micro.onrender.com";

const sortByYear = async (order) => {
  const response = await fetch(url+"/api/year?order="+order);
  const json = await response.json();
  rebuildList(json);
}

const sortByPrice = async (order) => {
  const response = await fetch(url+"/api/price?order="+order);
  const json = await response.json();
  rebuildList(json);
}

const sortByMileage = async (order) => {
  const response = await fetch(url+"/api/mileage?order="+order);
  const json = await response.json();
  rebuildList(json);
}

const rebuildList = (json) => {
  var listingContainer = document.getElementById("listings");
  listingContainer.innerHTML = "";
  json.forEach((listing) => {
    var listingElement = document.createElement("a");
    listingElement.classList.add("listing-item");
    listingElement.href = "/product/" + listing.id;
    var img = document.createElement("img");
    img.src = "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&q=80&w=2456&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    var h2 = document.createElement("h2");
    h2.innerText = listing.model;
    var li1 = document.createElement("li");
    li1.innerText = listing.make;
    var li2 = document.createElement("li");
    li2.innerText = "$" + listing.price;
    listingElement.appendChild(img);
    listingElement.appendChild(h2);
    listingElement.appendChild(li1);
    listingElement.appendChild(li2);
    listingContainer.appendChild(listingElement);
  })
}