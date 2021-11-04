var x = document.getElementById("location_text");


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition, error);
} else { 
   x.innerHTML = "Preglednik ne podržava geolokaciju!";
}

function showPosition(position) {

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  x.innerHTML = 
  "Geografska širina: " + latitude + "<br>" + 
  "Geografska dužina: " + longitude + "<br>";
}

function error(){
  x.innerHTML = "Nismo uspjeli dohvatiti vašu geolokaciju!";
}