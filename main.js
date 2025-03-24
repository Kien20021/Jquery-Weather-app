const API_KEY = `02ac31aab528819053457737dd81930f`;
const cityName = $(".city-name");
const weatherState = $(".weather-state");
const temperature = $(".temperature");
const weatherIcon = $(".weather-icon");

const additionalSection = $(".additional-section");
const humidity = $(".humidity");
const windSpeed = $(".wind-speed");

$(document).ready(function () {
  $(".search-city").on("change", function () {
    const city = $(".search-city").val();
    if (city == "") return;
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather`,
      type: "GET",
      data: {
        q: city,
        units: "metric",
        lang: "vi",
        appid: API_KEY,
      },
      success: function (json) {
        cityName.html(`${json.name} `);
        weatherState.html(`${json.weather[0].description}`);
        weatherIcon.attr(
          "src",
          `https://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`
        );
        temperature.html(`${parseInt(json.main.temp)}`);
        humidity.html(`${json.main.humidity} %`);
        const windSpeedCmPerS = Math.round(json.wind.speed * 100);
        const windSpeedKmh = Math.round(windSpeedCmPerS * 0.036);
        windSpeed.html(`${parseInt(windSpeedKmh)} km/h`);

        switch (json.weather[0].main) {
          case "Clear":
            $(".container").css(
              `background-image`,
              `url(./image/bg-clear.avif)`
            );
            break;
          case "Rain":
            $(".container").css(`background-image`, `url(./image/bg-rain.jpg)`);
            break;
          case "Mist":
            $(".container").css(`background-image`, `url(./image/bg-mist.jpg)`);
            break;
          case "Clouds":
            $(".container").css(
              `background-image`,
              `url(./image/bg-clouds.jpeg)`
            );
            break;
          case "Snow":
            $(".container").css(
              `background-image`,
              `url(./image/bg-snow.jpeg)`
            );
            break;

          default:
            break;
        }
      },
      error: function () {
        $(".container").css(`background-image`, `url(./image/404-not.jpg)`);
        cityName.html("Thanh pho kh ton tai");
        weatherState.html("Not found");
        temperature.html("");
        weatherIcon.attr("src", `./image/404.png`);
        humidity.html("--");
        windSpeed.html("--");
      },
    });
  });
});
