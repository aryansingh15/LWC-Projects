public with sharing class WeatherAppController {
  @AuraEnabled
  public static string getWeatherDetails(String input) {
    String url =
      'https://api.openweathermap.org/data/2.5/weather?q=' +
      input +
      '&units=metric' +
      getKey();
    string response = getResponse(url);
    return response;
  }

  public static string getResponse(String strurl) {
    Http h = new Http();
    HttpRequest req = new HttpRequest();
    HttpResponse res = new HttpResponse();
    req.setEndpoint(strurl);
    req.setMethod('GET');
    req.setTimeout(12000);
    res = h.send(req);
    string responseBody = res.getBody();
    return responseBody;
  }
  public static string getKey() {
    string key = '4f17542697a8a1ed7d73dbaad05335c3';
    string output = '&appid=' + key;
    return output;
  }
}
