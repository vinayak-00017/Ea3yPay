
export default function InputBox({label, placeholder,value,setValue}:
    {label : string, placeholder : string, value:string, setValue:(value:string)=>void}){
       
       return <div>
                <div className="font-medium text-lg ">
                    {label}
                </div>
                <input value={value} 
                        onChange={(e)=>setValue(e.target.value)}
                className="mb-4 w-full py-2 px-2 rounded-md bg-zinc-600" 
                placeholder={placeholder}></input>
        </div>
    }