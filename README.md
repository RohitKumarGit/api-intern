# api-intern

To make any request to any of the *Endpoints* you will have to set `Authorization` header to an *auth token* which will be auto generated whenever you login to https://api-intern.herokuapp.com/
. The auth token will expire in exactly one hour.

# How to get Auth token ?

go to https://api-intern.herokuapp.com/ 
<br>
Enter admin@admin.com as email and admin123# as password
<br>
Get the auth key in the console 
<br>
Now use this key as authorization header for all the requests

# Endpoints

 ## GET /events
 get all the events created 
 
  ## POST /event
 get all the events created 
 <br>
 Expected `body` format
 ```
 {
    date:Date // yyyy-mm-dd,
    eventName:String
}
 ```
 ## GET /range
 get all the events between a date range
  Expected `body` format
 ```
 {
                gte:Date, // yyyy-mm-dd
                lte:Date  // yyyy-mm-dd
   }
 ```
 ## POST /deleteEvent
delete an event
  Expected `body` format
 ```
 {
                id:_id // _id you will get from /events
   }
 ```
  ## POST /updateEvenet
update an event
  Expected `body` format
 ```
 {
                id:_id , // _id you will get from /events
                data:{
                // modified event details
                }
   }
 ```
 
 all the requests will be made to https://api-intern.herokuapp.com/ through an HTTP server
