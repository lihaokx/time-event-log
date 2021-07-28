
    async function dashFunction(rows) {
        var importanceP1 = [0,0];
        var importanceN1 = [0,0];
        var importance0 =  [0,0];
        var total =[0,0];
    
        for(const row of rows){
            if (row.period != ""){
            switch(row.importance){
                case 0 :
                    console.log("row.period: ", row.period);
                    importance0[0] = importance0[0] +parseInt(row.period.split(":")[0] );
                    importance0[1] = importance0[1] +parseInt(row.period.split(":")[1]);
                    importance0[0] = importance0[0] + Math.floor(importance0[1]/60);
                    importance0[1] = importance0[1]%60;
                    console.log("row.id: ", row.id, "importance0: ", importance0)
                    continue;
            
                case -1:
                    console.log("row.period: ", row.period);
                    importanceN1[0] = importanceN1[0] +parseInt(row.period.split(":")[0] );
                    importanceN1[1] = importanceN1[1] +parseInt(row.period.split(":")[1]);
                    importanceN1[0] = importanceN1[0] + Math.floor(importanceN1[1]/60);
                    importanceN1[1] = importanceN1[1]%60;
                    console.log("row.id: ", row.id, "importanceN1: ", importanceN1)
                    continue;

                case 1:
                    console.log("row.period: ", row.period);
                    importanceP1[0] = importanceP1[0] +parseInt(row.period.split(":")[0] );
                    importanceP1[1] = importanceP1[1] +parseInt(row.period.split(":")[1]);
                    importanceP1[0] = importanceP1[0] + Math.floor(importanceP1[1]/60);
                    importanceP1[1] = importanceP1[1]%60;
                    console.log("row.id: ", row.id, "importanceP1: ", importanceP1)
                    continue;
                 }
            }

        }
        total[0] = importanceP1[0] + importanceN1[0] + importance0[0];
        total[1] = importanceP1[1] + importanceN1[1] + importance0[1];
        total[0] = total[0] + Math.floor(total[1]/60);
        total[1] = total[1]%60;
        console.log("total: ", total);
        var dashboardValue ={
            importanceP1: (importanceP1[0] < 9 ? "0" : "") + importanceP1[0] + ":" + (importanceP1[1] < 9 ? "0" : "") + importanceP1[1],
            importanceN1: (importanceN1[0] < 9 ? "0" : "") + importanceN1[0] + ":" + (importanceN1[1] < 9 ? "0" : "") + importanceN1[1],
            importance0: (importance0[0] < 9 ? "0" : "") + importance0[0] + ":" + (importance0[1] < 9 ? "0" : "") + importance0[1],
            total: (total[0] < 9 ? "0" : "") + total[0] + ":" + (total[1] < 9 ? "0" : "") + total[1],
        }
        console.log("dashboardValue: ", dashboardValue);
        return dashboardValue;
    }
export default dashFunction;