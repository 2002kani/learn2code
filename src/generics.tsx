
// Generics Basics

/*
//eine Funktion, die je nach Datentyp des Arguments auch genau das selbe zurückgibt
const saveInput = <T,> (val: T): T => {
    return val;
}
console.log(saveInput("KANII"));

interface Karte {
    name: string,
    alter: number,
    isStudent: boolean
}

const testGen = <T,>(val1: T, val2: Karte): void => {
    if(val1){
        console.log(val1);
        
    }
    console.log(val2);
}

testGen("TEST", {name: "Kani", alter: 22, isStudent: true}); */




const Generics = () => {
    return <></>
}

export default Generics