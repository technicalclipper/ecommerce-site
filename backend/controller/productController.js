import supabase from "../model/userdb.js";

export const getproducts = async(req,res)=>{
    const { data, error } = await supabase
                                .from('products')
                                    .select('*');
    return res.json(data);
  
}

