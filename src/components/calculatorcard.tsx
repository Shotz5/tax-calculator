import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MoneyInput from "@/components/moneyinput"
import { ChangeEvent, useState } from "react";

function CalculatorCard() {
  const [employmentIncome, setEmploymentIncome] = useState(0);
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState(0);
  const [rrspfhsaDeductions, setRrspfhsaDeductions] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [taxesPaid, setTaxesPaid] = useState(0);

  const updateEmploymentIncome = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = parseInt(event.target.value)
    if (!isNaN(parsed)) {
      setEmploymentIncome(parsed)
    } else {
      setEmploymentIncome(0)
    }
  }

  const updateSelfEmploymentIncome = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = parseInt(event.target.value)
    if (!isNaN(parsed)) {
      setSelfEmploymentIncome(parsed)
    } else {
      setSelfEmploymentIncome(0)
    }
  }

  const updateRrspfhsaDeductions = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = parseInt(event.target.value)
    if (!isNaN(parsed)) {
      setRrspfhsaDeductions(parsed)
    } else {
      setRrspfhsaDeductions(0)
    }
  }

  const updateOtherIncome = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = parseInt(event.target.value)
    if (!isNaN(parsed)) {
      setOtherIncome(parsed)
    } else {
      setOtherIncome(0)
    }
  }

  const updateTaxesPaid = (event: ChangeEvent<HTMLInputElement>) => {
    let parsed = parseInt(event.target.value)
    if (!isNaN(parsed)) {
      setTaxesPaid(parsed)
    } else {
      setTaxesPaid(0)
    }
  }

  const calculateTaxes = () => {
    
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Calculate BC Taxes
        </CardTitle>
        <CardDescription>
          Calculate taxes in line with the 2024 Government of Canada and Government of BC tax brackets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MoneyInput name="employment-income" placeholder="Employment Income" value={employmentIncome === 0 ? "" : employmentIncome} onChange={updateEmploymentIncome} />
        <MoneyInput name="self-employment-income" placeholder="Self Employment Income" value={selfEmploymentIncome === 0 ? "" : selfEmploymentIncome} onChange={updateSelfEmploymentIncome} />
        <MoneyInput name="rrsp-fhsa-deductions" placeholder="RRSP and FHSA Deductions" value={rrspfhsaDeductions === 0 ? "" : rrspfhsaDeductions} onChange={updateRrspfhsaDeductions} />
        <MoneyInput name="other-income" placeholder="Other Income" value={otherIncome === 0 ? "" : otherIncome} onChange={updateOtherIncome} />
        <MoneyInput name="taxes-paid" placeholder="Taxes Paid" value={taxesPaid === 0 ? "" : taxesPaid} onChange={updateTaxesPaid} />
      </CardContent>
      <CardFooter>
        <p>Card footer</p>
      </CardFooter>
    </Card>
  )
}

export default CalculatorCard