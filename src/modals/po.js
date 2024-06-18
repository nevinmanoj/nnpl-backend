import mongoose from "mongoose";

import {itemschema} from "./item.js"

const poschema = mongoose.Schema({
    pno: {
        type: String,
        required: true,
      },
      poStatus:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    tax:{
        type:Number,
        required:true
    },
    items:{
        type:[itemschema],
        required:true
    },
    vendor:{
        type:String,
        required:true
    },
    billing:{
        type:String,
        required:true
    },
    customer:{
        type:String,
        required:true
    },
    tc:{
        type:Object,
        required:false
    }
});

export const PoSchema = mongoose.model("PoSchema", poschema,"data");

