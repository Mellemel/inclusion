var fs = require('fs')

fs.readFile('baby-names.csv', function(err, data){
    if(err){
        throw err
    }
    var newData = data.toString('utf-8')
    newData.split('\n').slice(1).map(function (data, index) {
        var row = data.split(',')
        if(!row[0] || !row[4] || !row[5]){
            console.log(row, index)
        }
    })
})