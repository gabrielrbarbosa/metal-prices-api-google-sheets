/*
//  Setup:
//  1. Register a free account at metals.dev
//  2. You instantly get an API key. Replace here in this function "YOUR_API_KEY" with the key.
//  3. In Google Sheets go to the Tools menu and select Script Editor
//  4. Create a new Script
//  5. CTRL+S to save the script.
//
//  Usage in Google Sheets:
//  =GETPRICE("USD";"gold","g")
//  It will return the price of $1 worth of gold in this case.
*/

function GETPRICE(currency = 'USD', metal = 'gold', unit = 'g') {
    let apiKey = "YOUR_API_KEY";
    let cacheHours = 24;
    let cache = CacheService.getScriptCache();
    let cached = cache.get(currency + metal);
    if (cached != null) {
      return parseFloat(cached);
    }

    let response = UrlFetchApp.fetch("https://api.metals.dev/v1/latest?api_key="+ apiKey + "&currency="+ currency + "&unit=" + unit);
    let json = JSON.parse(response.getContentText());

    cache.put(metal, json.metals[metal], 60 * 60 * cacheHours);
    return parseFloat(json.metals[metal]);
}
