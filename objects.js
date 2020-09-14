// Φτιάχνω ένα object και το βάζω στην μεταβλητή myobj
// Αυτός είναι ο πρώτος τρόπος
// Τα object περιέχουν ζευγάρια από key - value
let myobj = {
  name: 'John',
  age: 30,
  'has dog': true,
};

// Δεύτερος τρόπος
let myobj2 = new Object({
  name: 'John',
  age: 30,
  'has dog': true
});

// Για να πάρω μια τιμή από ένα object χρησιμοποιώ την ( . )
console.log(myobj.name);

// Αν έχω τιμή με κενά που δεν πρέπει να γίνεται αυτό κανονικά
// Μπορώ να χρησιμοποιήσω brackets
console.log(myobj['has dog']);

// Διαγραφή ζευγαριού
delete myobj.name;

// Object destructuring
// Όταν αποθηκεύω σε μεταβλητή κάποιο key με την τιμή του από κάποιο object
let myobj3 = {
  name: "John"
};
// στην ουσία κάνει let name = myobj3.name
let { name } = myobj3;

// Παράλειψη value σε object οταν το value me to key είναι ίδιο όνομα
let age = 30;
let myobj4 = {
  age // είναι το ίδιο με age: age => age: 30
};

let fruit = 'apples';
let myobj5 = {
  [fruits]: 10 // apples: 10
};