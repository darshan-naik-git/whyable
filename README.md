Whyable Location Based Search
=

This is the application for location based search.

List of API:
---

* Displays welcome message  
**/ : GET** 
* Accept new emotions  
**/api/create : POST** 
```json
{
	"locationName":"Banglore",
	"lat":12.9716,
	"long":77.5946,
	"emotion":"happy"
}
```  
* Location based search  
**/api/emotion: GET**  
*/api/emotion?lat=17.0&long=78.5*

Install and Run Command:   
---

### `npm i`  
Install dependency

### `npm start`  
Start the application and add multiple data points to begin with.
