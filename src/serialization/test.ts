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

console.log(person);
