
const checkIfDateEmpty = ( todayDate) => {
    const datePromise =new Promise(
        function(myResolve, myReject){
            if( todayDate == ''){
                myReject(new Error("Date is empty!"))
            }
            else{
                console.log("success");
                myResolve("Date is not empty.");
            }
        }
    )
    return datePromise;
}


export default checkIfDateEmpty;
