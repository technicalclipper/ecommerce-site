import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey)

async function getuser(){
    const{data,error}=await supabase.from('users').select();
    return data;
}

console.log(await getuser());