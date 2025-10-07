interface IPerson {
  id: number;
  name: string;
  age: number;
  birth: string;
}

const person: IPerson = {
  id: 1,
  name: "Kani",
  age: 23,
  birth: "Unna",
};

const person2: IPerson = {
  id: 2,
  name: "Test Person",
  age: 21,
  birth: "Bayern",
};

const person3: IPerson = {
  id: 3,
  name: "Tim",
  age: 34,
  birth: "Polen",
};

const person4: IPerson = {
  id: 4,
  name: "Leon",
  age: 34,
  birth: "Finnland",
};

console.log(person, person2, person3);
