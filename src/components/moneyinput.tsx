import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, ChangeEventHandler, KeyboardEvent } from "react"

function MoneyInput({ name, placeholder, value, onChange }: Readonly<{ name: string, placeholder: string, value: number | string, onChange: ChangeEventHandler<HTMLInputElement> }>) {

  const validateKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    // Allow only numeric keys and some useful control keys like Backspace, Delete, etc.
    const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Control'];
    if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
      event.preventDefault(); // Block non-numeric keys
    }
  }

  return (
    <div className="mt-4">
      <Label htmlFor={name}>{placeholder}</Label>
      <Input type="number" id={name} placeholder={placeholder} value={value} onKeyDown={validateKeyPress} onChange={onChange} className="mt-2 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></Input>
    </div>
  )
}

export default MoneyInput
