import Link from "next/link"

export default function BottomPrompt({label,buttonText,to} : {
    label: string, buttonText : string, to: string
}){
    return <div className="flex justify-center text-sm">
        {label}
        <Link href={to} className="ml-2">
            {buttonText}
        </Link>
    </div>
}