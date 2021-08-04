import {threeColors} from '../shared/threeColors'
    async function dashFunction(rows) {
        var importanceP1 = [0,0];
        var importanceN1 = [0,0];
        var importance0 =  [0,0];
        var total =[0,0];
        var numRowsCanvas =  new Array() ; 
         
        // console.log("numRowsCanvas.....: ", numRowsCanvas)
        
        for (var i=0; i<rows.length; i++){

        // for(const row of rows){
            // console.log("rows[i].period:................ ", rows[i].period)
            if (rows[i].period !== "" && rows[i].period !==  "NaN:NaN"){
                numRowsCanvas.push({
                    start :0.0,
                    period: 0.0,
                    color: '',
                    event: '',
                    id: 0
                })
                switch(rows[i].importance){
                    case 0 :
                        // console.log("row.period: ", rows[i].period);
                        importance0[0] = importance0[0] +parseInt(rows[i].period.split(":")[0] );
                        importance0[1] = importance0[1] +parseInt(rows[i].period.split(":")[1]);
                        importance0[0] = importance0[0] + Math.floor(importance0[1]/60);
                        importance0[1] = importance0[1]%60;
                        numRowsCanvas[i].period = parseInt(rows[i].period.split(":")[0] ) + parseInt(rows[i].period.split(":")[1])/60
                        numRowsCanvas[i].color = threeColors.color0;
                        numRowsCanvas[i].start = parseInt(rows[i].start.split(":")[0] ) + parseInt(rows[i].start.split(":")[1] )/60
                        numRowsCanvas[i].event = rows[i].event
                        numRowsCanvas[i].id = i
                        // console.log("row.id: ", rows[i].id, "importance0: ", importance0)
                        continue;
            
                    case -1:
                        // console.log("row.period: ", rows[i].period);
                        importanceN1[0] = importanceN1[0] +parseInt(rows[i].period.split(":")[0] );
                        importanceN1[1] = importanceN1[1] +parseInt(rows[i].period.split(":")[1]);
                        importanceN1[0] = importanceN1[0] + Math.floor(importanceN1[1]/60);
                        importanceN1[1] = importanceN1[1]%60;
                        numRowsCanvas[i].period = parseInt(rows[i].period.split(":")[0] ) + parseInt(rows[i].period.split(":")[1])/60
                        numRowsCanvas[i].color = threeColors.colorN1;
                        numRowsCanvas[i].start = parseInt(rows[i].start.split(":")[0] ) + parseInt(rows[i].start.split(":")[1] )/60
                        numRowsCanvas[i].event = rows[i].event
                        numRowsCanvas[i].id = i
                        // console.log("row.id: ", rows[i].id, "importanceN1: ", importanceN1)
                        continue;
                    case 1:
                        // console.log("row.period: ", rows[i].period);
                        importanceP1[0] = importanceP1[0] +parseInt(rows[i].period.split(":")[0] );
                        importanceP1[1] = importanceP1[1] +parseInt(rows[i].period.split(":")[1]);
                        importanceP1[0] = importanceP1[0] + Math.floor(importanceP1[1]/60);
                        importanceP1[1] = importanceP1[1]%60;
                        numRowsCanvas[i].period = parseInt(rows[i].period.split(":")[0] ) + parseInt(rows[i].period.split(":")[1])/60
                        numRowsCanvas[i].color = threeColors.colorP1;
                        numRowsCanvas[i].start = parseInt(rows[i].start.split(":")[0] ) + parseInt(rows[i].start.split(":")[1])/60
                        numRowsCanvas[i].event = rows[i].event
                        numRowsCanvas[i].id = i
                        // console.log("row.id: ", rows[i].id, "importanceP1: ", importanceP1)
                        continue;
                    }
                }
            }
        total[0] = importanceP1[0] + importanceN1[0] + importance0[0];
        total[1] = importanceP1[1] + importanceN1[1] + importance0[1];
        total[0] = total[0] + Math.floor(total[1]/60);
        total[1] = total[1]%60;
        // console.log("total: ", total);
        var dashboardValue ={
            importanceP1: (importanceP1[0] < 9 ? "0" : "") + importanceP1[0] + ":" + (importanceP1[1] < 9 ? "0" : "") + importanceP1[1],
            importanceN1: (importanceN1[0] < 9 ? "0" : "") + importanceN1[0] + ":" + (importanceN1[1] < 9 ? "0" : "") + importanceN1[1],
            importance0: (importance0[0] < 9 ? "0" : "") + importance0[0] + ":" + (importance0[1] < 9 ? "0" : "") + importance0[1],
            total: (total[0] < 9 ? "0" : "") + total[0] + ":" + (total[1] < 9 ? "0" : "") + total[1],
        }
        // console.log("dashboardValue: ", dashboardValue);
        // console.log("numRowsCanvas after: ", numRowsCanvas)
        var dashboardCanvas = {
            dashboardValue: dashboardValue,
            numRowsCanvas: numRowsCanvas
        }
        return dashboardCanvas;
    }

export default dashFunction;

