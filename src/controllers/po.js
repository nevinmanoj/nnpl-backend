import {PoSchema} from "../modals/po.js";

export const getpos = async (req,res) => {
    try {
        const pos = await PoSchema.where().lean().exec();

      res.status(200).json({ message: 'GET All PO(s) for user success',count:pos.length, pos});
  } catch (error) {
      res.status(401).json({ message: 'GET All PO(s) failed' });
  }
};

export const getposById = async (req,res) => {
    try {
        // req.params.id
        const po=await PoSchema.where("_id",req.params.id);
        if(po.length!=0){
            res.status(200).json({ message: 'GET  PO for success', po});
        }
        else{
            res.status(401).json({ message: 'GET PO failed' }); 
        }
        
  } catch (error) {
      res.status(401).json({ message: 'GET PO failed' });
  }
};

export const addPo = async (req,res) => {
    try {
       const {pno,poStatus,date,tax,items,vendor,billing, customer,tc}=req.body;
    //   const userID=req.decoded.userID;
      const newPO = new PoSchema( {pno,poStatus,date,tax,items,vendor,billing, customer,tc});
      await newPO.save();
      res.status(200).json({ message: 'PO add success',data:newPO});
  } catch (error) {
      res.status(401).json({ message: 'PO add failed' ,error});
  }
};

export  const modifyPo=async(req,res)=>{
    {
      try {
        const{pno,poStatus,date,tax,items,vendor,billing, customer,tc}= req.body;
        //   const userID=req.decoded.userID;
        var PofromDb=await PoSchema.findById(req.params.id);
        Object.assign(PofromDb,  {pno,poStatus,date,tax,items,vendor,billing,customer,tc});
        await PofromDb.save();
        res.status(200).json({ message: 'PO modify success',data:PofromDb});
          
      } catch (error) {
          res.status(404).json({ message: 'PO modify failed'});
      }
    }
    
}

export const deletePo=async(req,res)=>{
    try {
        
    //   const userID=req.decoded.userID;
        var PofromDb=await PoSchema.findById(req.params.id);
        await PofromDb.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'PO delete success'});
      
  } catch (error) {
      res.status(404).json({ message: 'PO delete failed'});
  }
}
