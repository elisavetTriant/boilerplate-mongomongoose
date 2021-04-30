require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = process.env['MONGO_URI']

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let elissavetTriant = new Person({'name': 'Elissavet', 'age': 40, 'favoriteFoods': ['Yemista', 'Fish', 'Calamari']})
  elissavetTriant.save(function(err, data){
    if (err) return console.error(err);
    done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data){
    if (err) return console.error(err);
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personsFound) {
    if (err) return console.error(err);
     done(null, personsFound);
  })
};


const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, personFound) {
    if (err) return console.error(err);
     done(null, personFound);
  }
)};

const findPersonById = (personId, done) => {
 Person.findById(personId, function(err, personFound) {
    if (err) return console.error(err);
     done(null, personFound);
  }
 )};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  // Firstly .findById()  with the parameter personId.
  Person.findById(personId, function(err, personFound) {
    
    //if error on retrieving return
    if (err) return console.error(err);
    
    //push to favoriteFood
    personFound.favoriteFoods.push(foodToAdd);
    
    //save the records and return the person
    personFound.save((err, updatedPerson) => {
      //if error on saving return
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedPerson) {
    if(err) return console.log(err);
    done(null, updatedPerson);
  })
};

const removeById = (personId, done) => {

   Person.findByIdAndRemove(
    personId,
    function(err, removedDoc) {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove(
    {name: nameToRemove},
    function(err, removedDocsInfo) {
      if(err) return console.log(err);
      done(null, removedDocsInfo);
    }
  ); 
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec(function(err, people) {
    if(err) return console.log(err);
    done(null, people);
  });

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
