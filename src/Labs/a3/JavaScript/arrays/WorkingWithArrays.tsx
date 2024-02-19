// be imported to JavaScript/index.tsx
// -----------------all imported function-----------------------------------------------------------
import ArrayIndexAndLength from "./ArrayIndexAndLength";
import AddingAndRemovingDataToFromArrays from "./AddingAndRemovingDataToFromArrays";
import ForLoop from "./ForLoops";
import MapFunction from "./MapFunction";
import FindFunction from "./FindFunction";
import FindIndex from "./FindIndex";
import FilterFunction from "./FilterFunction";
// -----------------all imported function-----------------------------------------------------------

var functionScoped = 2;
let blockScoped = 5;
const constant1 = functionScoped - blockScoped;
let numberArray1 = [1, 2, 3, 4, 5];
let stringArray1 = ["string1", "string2"];

let variableArray1 = [
  functionScoped,
  blockScoped,
  constant1,
  numberArray1,
  stringArray1,
];

const WorkingWithArrays = () => {
  return (
    <div>
      <h3>Working with Arrays </h3>
      numberArray1={numberArray1}
      <br />
      stringArray1={stringArray1}
      <br />
      variableArray1={variableArray1}
      <br />
      <ArrayIndexAndLength />
      <AddingAndRemovingDataToFromArrays />
      <ForLoop />
      <MapFunction />
      <FindFunction />
      <FindIndex />
      <FilterFunction />
    </div>
  );
};
export default WorkingWithArrays;
