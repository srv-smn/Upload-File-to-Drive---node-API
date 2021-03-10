// DataBase Schema for InBound 

const mongoose = require('mongoose')
const validator = require('validator')

const inBoundSchema =  new mongoose.Schema({
    date:{
        type:Date,
        required:true,
    },
    mode:{
        type:String,
        required:true,
        trim:true
    },
    location:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    customer:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    product_code: {
        type:String,
        required:true,
        trim:true
    },
    source:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    railcar:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    fleet:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    subfleet:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    railcar_seals:{
        type:[String]
    },
    bol:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    destination:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    city:{
        type: String,
        required: true,
        trim:true,
    },
    state:{
        type: String,
        required: true,
        trim:true,
        uppercase:true
    },
    weight:{
        type:Number,
        required:true
    },
    temperature:{
        type:Number,
        required:true
    },
    density:{
        type:Number,
        required:true
    },
    sw_percent:{
        type:Number,
        required:true
    },
    sw_bbl:{
        type:Number,
        required:true
    },
    net_oil_bbl:{
        type:Number,
        required:true
    },
    total_volume_bbl:{
        type:Number,
        required:true
    },
    sw_m3:{
        type:Number,
        required:true
    },
    net_oil_m3:{
        type:Number,
        required:true
    },
    total_volume_m3:{
        type:Number,
        required:true
    },
    bol_date:{
        type:Date,
        required:true
    },
    heel_volume:{
        type:Number,
        required:true
    },
    heel_weight:{
        type:Number,
        required:true
    }
})

const InBound = mongoose.model('InBound',inBoundSchema)

module.exports = InBound