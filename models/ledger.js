var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ledgerSchema = new Schema({
    start_date: {type:String,required:true},
    end_date: {type:String,required:true},
    frequency:{type:String,required:true},
    weakly_rent:{type:Number,required:true},
    timezone:{type:String},
});

var lineItemSchema = new Schema({
    start_date: {type:String,required:true},
    end_date: {type:String,required:true},
    total_amount:{type:Number, required:true}
})

var responceSchema = new Schema({
    lineitem:[
        {
            start_date: {type:String,required:true},
            end_date: {type:String,required:true},
            total_amount:{type:Number, required:true}
        }
    ] 
});



const ledgerRequestData = mongoose.model('ledgerRequestData', ledgerSchema);
const ledgerResponceData = mongoose.model('ledgerResponceData', responceSchema);
const ledgerlineItem = mongoose.model('ledgerlineItem', lineItemSchema);


module.exports = { ledgerRequestData: ledgerRequestData, ledgerResponceData: ledgerResponceData, ledgerlineItem:ledgerlineItem };
