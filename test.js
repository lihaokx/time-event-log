
var  algorithm =  "mergeort" 
let doSort = algorithm === "bubbleSort" ?
"bubbleSort" : algorithm === "quickSort" ?
  "quickSort" : algorithm === "heapSort" ?
    "heapSort" : algorithm === "mergeSort" ?
      "mergeSort" : null;

      console.log("doSort: ", doSort)