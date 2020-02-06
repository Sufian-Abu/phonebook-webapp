module.exports = app => {
  const phonebook = require("../controllers/phonebook.controller.js");

  // create phonebook with information
  app.post('/create', phonebook.create);

  // get all contact lists
  app.get("/allcontacts", phonebook.findAll);

  // edit contact details
  app.put("/editcontact", phonebook.update);

  // edit contact details
  app.delete("/deletecontact", phonebook.delete);

  // search in the contact lists
  app.get("/searchcontact", phonebook.filterPhonebook);
};
