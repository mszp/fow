// PROGRAMING OF THE APP
function fnAdd() {

  var recordNo = document.getElementById("txtrecordno").value;
  var Age = document.getElementById("txtpersonAge").value;
  var Name = document.getElementById("txtpersonName").value;
  var Feeling = document.getElementById("txtpersonFeeling").selectedIndex;
  var Country = document.getElementById("txtpersonCountry").selectedIndex;

  var db = new PouchDB('Feeling');

  var getid = 0;

  if (!parseInt(Age)) {
    alert('You can only enter numeric value in Age field');
  } else {


    if (recordNo == "" || Name == "" || Age == "" || Feeling == 0 || Country == 0) {
      alert('please enter all the fields');
    } else {
      var peopleFeeling = {
        _id: recordNo,
        personAge: Age,
        personName: Name,
        personFeeling: Feeling,
        personCountry: Country

      };
      db.put(peopleFeeling, function callback(err, result) {
        if (!err) {
          alert('Successfully posted a peopleFeeling! of recordno ' + recordNo);
          fnReset();

        }
      });
      fnAllDoc();
    }

  }
}

function fnShow() {
  var db = new PouchDB('Feeling');
  var recordNo = prompt("Input record no");
  if (recordNo == "") {
    alert('please enter the record No');
  } else {
    db.get(recordNo).then(function (doc) {

      document.getElementById("txtrecordno").value = doc._id;
      document.getElementById("txtpersonAge").value = doc.personAge;
      document.getElementById("txtpersonName").value = doc.personName;
      document.getElementById("txtpersonFeeling").selectedIndex = doc.personFeeling;
      document.getElementById("txtpersonCountry").selectedIndex = doc.personCountry;

    }).catch(function (err) {
      console.log(err);
    });
  }
}

function fnReset() {
  document.getElementById("txtrecordno").value = '';
  document.getElementById("txtpersonAge").value = '';
  document.getElementById("txtpersonName").value = '';
  document.getElementById("txtpersonFeeling").selectedIndex = 0;
  document.getElementById("txtpersonCountry").selectedIndex = 0;
  fnautoGenerateRecord();
}

function fnEdit() {

  var db = new PouchDB('Feeling');
  var recordNo = document.getElementById("txtrecordno").value;
  var Age = document.getElementById("txtpersonAge").value;
  var Name = document.getElementById("txtpersonName").value;
  var Feeling = document.getElementById("txtpersonFeeling").selectedIndex;
  var Country = document.getElementById("txtpersonCountry").selectedIndex;

  //Reading the contents of a Document
  if (Name == "" || Age == "" || Feeling == 0 || Country == 0) {
    alert('please change all the fields except recordNo and then click the edit button to update the record');
  } else {
    db.get(recordNo, function (err, doc) {
      if (err) {
        return console.log(err);
      } else {
        console.log(doc);


        var newdoc = {
          _id: recordNo,
          personAge: Age,
          personName: Name,
          personFeeling: Feeling,
          personCountry: Country,
          _rev: doc._rev
        }

        db.put(newdoc, function callback(err, result) {

          if (!err) {
            alert("Record has been updated successfully");
          } else {
            console.log(result);
          }

        });

        fnReset();
        fnAllDoc();
      }
    });
  }


}

function fnFirst() {
  var db = new PouchDB('Feeling');
  var recordNo = '1';

  db.get(recordNo).then(function (doc) {

    document.getElementById("txtrecordno").value = doc._id;
    document.getElementById("txtpersonAge").value = doc.personAge;
    document.getElementById("txtpersonName").value = doc.personName;
    document.getElementById("txtpersonFeeling").selectedIndex = doc.personFeeling;
    document.getElementById("txtpersonCountry").selectedIndex = doc.personCountry;

  }).catch(function (err) {
    console.log(err);
  });
}

function fnLast() {
  var db = new PouchDB('Feeling');

  db.allDocs({
    descending: true,
    limit: 1,
    include_docs: true
  }).then(function (result) {
    // handle result
    console.log(result);
    document.getElementById("txtrecordno").value = result.rows[0].doc._id;
    document.getElementById("txtpersonAge").value = result.rows[0].doc.personAge;
    document.getElementById("txtpersonName").value = result.rows[0].doc.personName;
    document.getElementById("txtpersonFeeling").selectedIndex = result.rows[0].doc.personFeeling;
    document.getElementById("txtpersonCountry").selectedIndex = result.rows[0].doc.personCountry;
  }).catch(function (err) {
    console.log(err);
  });

}

function fnNext() {
  var db = new PouchDB('Feeling');
  var rec = document.getElementById("txtrecordno").value;

  if (rec == "") {
    rec = 1;
  } else {
    rec = parseInt(rec) + 1;
  }


  db.get(rec.toString()).then(function (doc) {

    document.getElementById("txtrecordno").value = doc._id;
    document.getElementById("txtpersonAge").value = doc.personAge;
    document.getElementById("txtpersonName").value = doc.personName;
    document.getElementById("txtpersonFeeling").selectedIndex = doc.personFeeling;
    document.getElementById("txtpersonCountry").selectedIndex = doc.personCountry;
  }).catch(function (err) {
    console.log(err);
    alert("Recordno " + rec.toString() + " does not exist!")

  });
}

function fnPrevious() {
  var db = new PouchDB('Feeling');
  var rec = document.getElementById("txtrecordno").value;

  if (rec == "") {
    rec = 1;
  } else {
    rec = parseInt(rec) - 1;
  }


  db.get(rec.toString()).then(function (doc) {

    document.getElementById("txtrecordno").value = doc._id;
    document.getElementById("txtpersonAge").value = doc.personAge;
    document.getElementById("txtpersonName").value = doc.personName;
    document.getElementById("txtpersonFeeling").selectedIndex = doc.personFeeling;
    document.getElementById("txtpersonCountry").selectedIndex = doc.personCountry;
  }).catch(function (err) {
    console.log(err);
    alert("Recordno " + rec.toString() + " does not exist!")

  });

}

function fnAllDoc() {

  var db = new PouchDB('Feeling');

  db.allDocs({
    include_docs: true

  }).then(function (result) {

    console.log(result);

    var tbl = document.getElementById("tblPersonFeeling");

    for (var i = 1; i < tbl.rows.length;) {
      document.getElementById("tblPersonFeeling").deleteRow(i)
    }

    for (i = 0; i < result.rows.length; i++) {

      tr = tbl.insertRow();
      var checkbox = document.createElement('input');
      checkbox.type = 'checkbox';

      tr.insertCell(0).appendChild(checkbox);
      tr.insertCell(1).innerHTML = result.rows[i].doc._id;
      tr.insertCell(2).innerHTML = result.rows[i].doc.personAge;
      tr.insertCell(3).innerHTML = result.rows[i].doc.personName;
      tr.insertCell(4).innerHTML = result.rows[i].doc.personFeeling;
      tr.insertCell(5).innerHTML = result.rows[i].doc.personCountry;



    }

  })
}

function fnDeleteChkdRec() {
  var db = new PouchDB('Feeling');
  var feelingTable = document.getElementById("tblPersonFeeling");
  for (i = 1; i < feelingTable.rows.length; i++) {

    if (feelingTable.rows[i].cells[0].childNodes[0].checked == true) {
      var recno = feelingTable.rows[i].cells[1].innerHTML;
      db.get(recno).then(function (doc) {
        db.remove(doc);
        fnAllDoc();
      });
    }
  }
}

function fnautoGenerateRecord() {
  var db = new PouchDB('Feeling');
  var rec = 0;
  db.allDocs({
    descending: true,
    limit: 1,
    include_docs: true
  }).then(function (result) {
   
    if (result.rows.length == 0) {
      rec = 1;
    } else {
      rec = parseInt(result.rows[0].doc._id) + 1;
    } 
    
    document.getElementById("txtrecordno").value = parseInt(rec);
  }).catch(function (err) {
    console.log(err);
  });
}

function numericOnly(event){
  var key = event.keyCode;
  if(key >= 48 && key <= 57 || key == 8){
    return true;
  }else
  {
    return false;
  }

}

function alphaOnly(event){
  var key = event.keyCode;
  if(key >= 65 && key <= 90 || key == 8 || key >= 97 && key <= 122){
    
    return true;
  }else{
    return false;
  }
}
