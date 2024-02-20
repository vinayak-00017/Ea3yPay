
export default function InputBox({label, placeholder,value,setValue,type}:
    {label : string, placeholder : string, value:any, 
        setValue:(value:any)=>void, type : string
    }){
       
       return <div>
                <div className="font-medium text-lg ">
                    {label}
                </div>
                <input value={value} 
                        onChange={(e)=>setValue(e.target.value)}
                        className="mb-4 w-full py-2 px-2 rounded-md bg-zinc-600 " 
                         placeholder={placeholder}
                        type={type}
                ></input>
        </div>
    }