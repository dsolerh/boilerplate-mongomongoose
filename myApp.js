require("dotenv").config();
const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose.connect(
  process.env.MONGO_URI.replace("<password>", process.env.MONGO_PASS),
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("🚀 ~ file: myApp.js ~ line 8 ~ err", err);
  }
);

const personSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [{ type: String }],
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  let person = new Person({
    name: "Daniel",
    age: 30,
    favoriteFoods: ["Spaguetti", "IceCream"],
  });
  person.save(function (err, data) {
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople).then((data) => {
    console.log("🚀 ~ file: myApp.js ~ line 48 ~ ]).then ~ data", data);
    done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }).then((data) => {
    console.log("🚀 ~ file: myApp.js ~ line 44 ~ Person.find ~ data", data);
    done(null, data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }).exec(function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId).exec(function (err, data) {
    if (err) {
      done(err);
    }

    done(null, data);
  });
};

const findEditThenSave = async (personId, done) => {
  const foodToAdd = "hamburger";

  let person = await Person.findById(personId).exec();
  person.favoriteFoods.push(foodToAdd);

  person.save(function (err, data) {
    if (err) {
      done(err);
    }
    done(null, data);
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true }
  ).exec(function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId).exec(function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function (err, data) {
    if (err) done(err);
    done(null, data);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({ favoriteFoods: foodToSearch })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec(function (err, data) {
      console.log("🚀 ~ file: myApp.js ~ line 120 ~ data", data)
      if (err) done(err);
      done(null, data);
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
