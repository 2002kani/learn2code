// Console Playground

interface IPerson {
  id: number;
  name: string;
  age: number;
  birth: string;
}

const person: IPerson = {
  id: 12,
  name: "Kani",
  age: 23,
  birth: "Unna",
};

const person2: IPerson = {
  id: 1,
  name: "Kani",
  age: 23,
  birth: "Unna",
};

const ObjToJson = JSON.stringify(person);
const parsed = JSON.parse(ObjToJson);

console.log(ObjToJson);
console.log(parsed.age);
console.log(person2);

function Playground() {
  return <div>Playground</div>;
}

export default Playground;
