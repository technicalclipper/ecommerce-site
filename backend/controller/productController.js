import supabase from "../model/userdb.js";

export const getproducts = async(req,res)=>{
    const { data, error } = await supabase
                                .from('products')
                                .select('*');
    return res.json(data);
  
}

export const addtocart =async(req,res)=>{
    const sno=req.user.sno;
    const {pno}=req.body;
    try {
        const { data, error } = await supabase
                                    .from('cart')
                                    .insert([{ sno: sno, pno: pno }]);
        if (error) {
          console.error('Error adding to cart:', error.message);
          return { success: false, error: error.message };
        }
    
        console.log('Item added to cart:', data);
        return res.json({ success: true, data });
      } catch (err) {
        console.error('Unexpected error:', err.message);
        return res.status(401).json({ success: false, error: err.message });
      }
}

export const getcartitems = async(req,res)=>{
    const sno=req.user.sno;
    const { data, error } = await supabase
                                    .from('cart')
                                    .select('cno, sno, pno, products(pname, cost)')  
                                    .eq('sno', sno);  

    if (error) {
        console.error('Error fetching cart items:', error);
        return [];
    }
    return res.json(data); 
}

export const deletefromcart = async(req,res)=>{
    const {cno}=req.body
    const { data, error } = await supabase
                                    .from('cart') 
                                    .delete()
                                    .eq('cno', cno);

    if (error) {
        res.json({status:" not deleted"})
    } 
    else {
        res.json({status:"deleted"})
    }
}