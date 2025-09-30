// Console Playground

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

const ObjToJson = JSON.stringify(person);
const parsed = JSON.parse(ObjToJson);

console.log(ObjToJson);
console.log(parsed.age);

function Playground() {
  return <div>Playground</div>;
}

export default Playground;
