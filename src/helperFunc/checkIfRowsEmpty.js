
const checkIfRowsEmpty = (rows) => {
    const rowsPromise =new Promise(
        function(myResolve, myReject){     
            for (let i = 0; i < rows.length; i++) {
                for (let [key, value] of Object.entries(rows[i])) {
                    // console.log(i, ' ', key, ' ', value);
                    // === is different from ==
                    if (value === ''){
                        var row = i+1
                        myReject(new Error(key+ " in row "+ row + " is empty!" ));
                        break;
                    }    
                    if(i==rows.length-1 && key =='importance' && value != ''){
                        myResolve("There is no empty values in rows!")
                    }
                }  
            } 
        }
    )
    return rowsPromise;
}


export default checkIfRowsEmpty;
