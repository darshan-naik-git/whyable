Whyable Location Based Search
=

This is the application for location based search.

List of API:
---

**/ : GET** Displays welcome message  
**/api/create : POST** request accept new emotions as data  
```json
{
	"locationName":"Banglore",
	"lat":12.9716,
	"long":77.5946,
	"emotion":"happy"
}
```  
**/api/emotion: GET**   Accepts lat & long values a query params  
*/api/emotion?lat=17.0&long=78.5*

Install and Run Command:   
---

### `npm i`  
Install dependency

### `npm start`  
Start the application and add multiple data points to begin with.
