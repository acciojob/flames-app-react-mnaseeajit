import React, {Component, useState} from "react";
import '../styles/App.css';

// class App extends Component {
    // constructor(props){
    //     super(props);
    //     this.state = {};
    // }
    
    // render() {

    //     return(
    //         <div id="main">
    //            {/* Do not remove the main div */}
    //            <input id="input1" placeholder="Enter first name"/>
    //            <input id="input2" placeholder="Enter second name"/>
    //            <button id="answer" onClick={giveAnswer}>Calculate Relationship Future</button>
    //            <button id="clear" onClick={clearInput}>Clear</button>
    //         </div>
    //     )
    // }
//}

const App = () => {
   
    const[input1Value , setInput1Value] = useState("");
    const[input2Value , setInput2Value] = useState("");
    const[relationship , setRelationship] = useState("");

    const clearInput = () => {
         setInput1Value("");
         setInput2Value("");
         setRelationship("");
    }

    const calculateRelationship = () => {
        let str1 = input1Value.trim();
        let str2 = input2Value.trim();

        if (str1 === "" || str2 === "") {
            setRelationship("Please Enter valid input");
            return;
        }

        const frequencyMap1 = {};
        const frequencyMap2 = {};

        for (let char of str1) {
            frequencyMap1[char] = (frequencyMap1[char] || 0) + 1;
        }

        for (let char of str2) {
            frequencyMap2[char] = (frequencyMap2[char] || 0) + 1;
        }

        let remainingStr1 = "";
        let remainingStr2 = "";

        for (let char in frequencyMap1) {
            if (!frequencyMap2[char]) {
                remainingStr1 += char.repeat(frequencyMap1[char]);
            } else {
                const minOccurrence = Math.min(frequencyMap1[char], frequencyMap2[char]);
                remainingStr1 += char.repeat(frequencyMap1[char] - minOccurrence);
                remainingStr2 += char.repeat(frequencyMap2[char] - minOccurrence);
            }
        }

        for (let char in frequencyMap2) {
            if (!frequencyMap1[char]) {
                remainingStr2 += char.repeat(frequencyMap2[char]);
            }
        }

        const totalLength = remainingStr1.length + remainingStr2.length;
        const result = totalLength % 6;

        switch (result) {
            case 1:
                setRelationship("Friends");
                break;
            case 2:
                setRelationship("Love");
                break;
            case 3:
                setRelationship("Affection");
                break;
            case 4:
                setRelationship("Marriage");
                break;
            case 5:
                setRelationship("Enemy");
                break;
            case 0:
                setRelationship("Siblings");
                break;
            default:
                setRelationship("Unknown");
        }
    }

    return (
        <div id="main">
               {/* Do not remove the main div */}
               <input id="input1" placeholder="Enter first name" value={input1Value} onChange={(e) => setInput1Value(e.target.value)}/>
               <input id="input2" placeholder="Enter second name" value={input2Value} onChange={(e) => setInput2Value(e.target.value)}/>
               <button id="answer" onClick={calculateRelationship} >Calculate Relationship Future</button>
               <button id="clear" onClick={clearInput}>Clear</button>
               <h3>{relationship}</h3>
            </div>
    )
}


export default App;
