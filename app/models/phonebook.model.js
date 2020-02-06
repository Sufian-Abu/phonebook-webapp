// CREATE TABLE phonebook (
//   id smallint unsigned not null auto_increment,
//   name varchar(255) not null,
//   mobile_number varchar(255) not null,
//   constraint pk_properties primary key (id)
// );

const sql = require("./db.js");
// constructor
const Phonebook = function(contact) {
  this.name = contact.name;
  this.mobile_number = contact.mobile_number;
};


// create new phonebook
Phonebook.create = (newPhonebook, result) => {
  sql.query("INSERT INTO phonebook SET ?", newPhonebook, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newPhonebook });
  });
};

// get all contacts as lists
Phonebook.getAll = result => {
  sql.query("SELECT * FROM phonebook", (err, res) => {
    if (err) {
      result(null, err);
      return;
    }
    result(null, res);
  });
};


//filter contact by filteritem provided by user
Phonebook.findByFilterItem = (filterItem, result) => {
  sql.query(`SELECT * FROM phonebook WHERE name LIKE '${filterItem}%' OR mobile_number LIKE '%${filterItem}%'`, (err, res) => {
    if (err) {""
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res);
      return;
    }
    // not found contacts
    result({ kind: "not_found" }, null);
  });
};

// edit contact information
Phonebook.updateById = (id, contact, result) => {
  sql.query(
    "UPDATE phonebook SET name = ?, mobile_number = ? WHERE id = ?",
    [contact.name, contact.mobile_number, id],
    (err, res) => {
      if (err) {
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found contact with the id
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { id: id, ...contact });
    }
  );
};

// remove contact which is requested by user
Phonebook.remove = (id, result) => {
  sql.query("DELETE FROM phonebook WHERE id = ?", id, (err, res) => {
    if (err) {
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found contact with the id
      result({ kind: "not_found" }, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Phonebook;
