## 'Question'

Create a simple Phonebook REST app using NodeJS:

    * Add a new contact (name, mobile number)
      - name and number cannot be empty
      - number should be a valid Bangladeshi mobile number
    * Get contact details by a mobile number
    * Get all the contacts
    * Edit a contact number
    * Delete a given number
 
## In the 'app' directory for server side configuration
    * create database 'phonebook_webapp'
    * you can dump DB  which is in this directory or you can run following query
        -   CREATE TABLE phonebook (
               id smallint unsigned not null auto_increment,
               name varchar(255) not null,
               mobile_number varchar(255) not null,
               constraint pk_properties primary key (id)
            );
    * In 'app' directory run 'npm install'
    * Then in the same directory run 'node server.js'

## In the 'frontend' directory for client side configuration

    ### `yarn install`
    
    ### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
