# NODE TASK

## Create APIs to Upload an excel File, read its contents & and insert it in MongoDB as well as upload it to user's google drive-Tasks Included :
### Upload an excel file, handle it using Multer
### Read the files contents & Store it in Database
### Upload the excel file to User's Google Drive

## Solution Approach
### Library Used
- `express` 
    - to build a server 
- `googleapis`
    - to connect to google drive and upload file 
- `mongodb`
    - MongoDB Driver
- `mongoose`
    - to establish connection between DB and Node Js
- `multer`
    - To perform operations on multimedia file 
- `validator`
    - To perform data validation 
- `convert-excel-to-json`
    - handle excel sheet
- `date-and-time`
    - convert sheet date to node supported dates
- Dev Dependencies 
    - `nodemon`
        - to keep server running while development 

## Files and Directory
- files folder
    - contain the excel sheet before uploading it to drive
- GoogleKeys folder
    - This folder contains the google credentials and the token after returned after allowing permissions (This folder has not be uploaded to github and added to gitignore file)
- src folder
    - db folder
        - mongoose.js 
            - This file is used for connection b/w DB and Node Js
    - google folder
         - googleAPI.js
            - This file contains code to upload file to drive 
    - models folder
        - inBound.js
           - This file contains code for Schema of Inbound 
        - outbound.js
            - This file contains code for Schema of outbound 
    - routers folder
        - bound.js
            - This file contains code for routing 
    - utils folder
        - support.js
            - contains functions need to convert json to schema supported object
    - index.js
        - call the listen function for express sever
    - app.js
        - add routes to server



## Work Flow 
Code is Running on port 3000
To upload file route to /upload 
--> upload file to the route 
--> uploaded file will be checked for file type validation as the code only accepts excel file.
--> A buffer will be created for the uploaded file 
--> convert the  excel buffer to json using  `convert-excel-to-json` library
--> Paas each record from sheet to `toDBInObject` and `toDBOutObject`function so this it will performing data cleaning and create object for schema 
--> save the object to database
--> convert the wexcel buffer to excel file and save it to files folder 
--> upload the file to drive that was just saved to file folder 
--> Return the response status as 200


