function renderWeather(cityName) {

    const apiKey = "474e3283a2e80a762c447a3e8f23769f";
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${APIKey}`;
  
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
     
      $("#currentCityName").text(response.name);
      $("#currentDate").text("(" + Date().substring(0, 15) + ")");
      $("#currentTemp").text(response.main.temp);
      
      const weatherIcon = $(
        "<img src='http://openweathermap.org/img/wn/" +
          response.weather[0].icon +
          ".png' style='margin-left:10px;'/>"
      );
      storeCity(response.name);
      createBtn();
      fiveDayForcast(cityName);
  
     
  
      $("#icon").empty();
      $("#icon").append(weatherIcon);
  
      $("#currentHum").text(response.main.humidity) + "%";
      $("#currentWindSpeed").text(response.wind.speed);
      $("#currentUV").text(response.wind.speed);
  
      
      longitude = response.coord.lon;
      latitude = response.coord.lat;
  
    
      uvURL =
        "https://api.openweathermap.org/data/2.5/uvi?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIKey;

      $.ajax({
        url: uvURL,
        method: "GET",
      }).then(function (response) {
       
        const UV = response.value;
  

        $("#currentUV").text(UV);
        uvColor(UV);
      });
    });
  }
  

  $("#addCity").click(function () {
  

    const cityName = $("#cityName").val();

    renderWeather(cityName);
    createBtn();
  });
  
  
  function storeCity(cityName) {
  
    const seen = false;
    for (var i = 0; i < localStorage.length; i++) {
      if (cityName === localStorage.getItem(i)) {
        seen = true;
      }
    }
    if (seen !== true) {
      localStorage.setItem(localStorage.length, cityName);
    }
  
  
  function displayPrev() {
    const prevCity = localStorage.getItem(localStorage.length - 1);
    renderWeather(prevCity);
  }
  
  function displayPrevFiveDay() {
    const prevCityFiveDay = localStorage.getItem(localStorage.length - 1);
    fiveDayForcast(prevCityFiveDay);
  }
  
  
  function createBtn() {
    $("#bookmarks").empty();
    for (var i = 0; i < localStorage.length; i++) {

      const btn = $(`<button>`).text(localStorage.getItem(i));
      btn.addClass("button cityBtn is-medium is-fullwidth");
    
      $("#bookmarks").append(btn);
    }
    $(".cityBtn").click(function () {
      console.log("clicked");
  
      cityName = $(this).text();
      renderWeather(cityName);
    });
  }
  

  function fiveDayForcast(cityName) {
    const fiveDayAPIkey = "474e3283a2e80a762c447a3e8f23769f";
    const fiveDayForcastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&cnt=5&appid=${fiveDayAPIkey}`;
  
  
    $.ajax({
      url: fiveDayForcastURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
  
      for (let i = 0; i < 5; i++) {
       
        $("#day-" + i).empty();
        const date = new Date();
        const fullDate =
          date.getMonth() +
          1 +
          "/" +
          (date.getDate() + i + 1) +
          "/" +
          date.getFullYear();
     

        $("#day-" + i).text(fullDate);
        const iconFore = $(
          "<img src='http://openweathermap.org/img/wn/" +
            response.list[i].weather[0].icon +
            ".png' style='margin-left:10px;'/>"
        );
        
        $("#day-" + i).append(iconFore);
        const tempFore = $("<p>").text(
          "Temperature:\n" + response.list[i].main.temp + "°F"
        );
    
        $("#day-" + i).append(tempFore);
        const humFore = $("<p>").text(
          "Humidity:\n" + response.list[i].main.humidity + "%"
        );
       
        $("#day-" + i).append(humFore);
      }
    });
  }}