import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import MoneyInput from "@/components/moneyinput"
import { ChangeEvent, useEffect, useState } from "react";
import { BASE_CPP_RATE, BC_TAX_BRACKETS, BC_TAX_CREDIT_BASE_AMOUNT, CANADA_TAX_BRACKETS, CANADA_TAX_CREDIT_BASE_AMOUNT, EI_RATE, ENHANCED_CPP_RATE, MAX_CPP_CONTRIBUTORY_EARNINGS, MAX_EI_CONTRIBUTORY_EARNINGS } from "@/lib/utils";

function CalculatorCard() {
  const [employmentIncome, setEmploymentIncome] = useState(0);
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState(0);
  const [rrspfhsaDeductions, setRrspfhsaDeductions] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [taxesPaid, setTaxesPaid] = useState(0);

  const [cppTaxesOwed, setCppTaxesOwed] = useState("");
  const [eiTaxesOwed, setEiTaxesOwed] = useState("");
  const [bcTaxesOwed, setBcTaxesOwed] = useState("");
  const [canadaTaxesOwed, setCanadaTaxesOwed] = useState("");
  const [totalTaxesOwed, setTotalTaxesOwed] = useState("");

  const [taxesFinal, setTaxesFinal] = useState("");

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
    // Add up to get the total taxible income
    let totalTaxableIncome = (employmentIncome + selfEmploymentIncome + otherIncome) - (rrspfhsaDeductions)

    let cppEnhancedDeduction = totalTaxableIncome > MAX_CPP_CONTRIBUTORY_EARNINGS ? (MAX_CPP_CONTRIBUTORY_EARNINGS * ENHANCED_CPP_RATE) : (totalTaxableIncome * ENHANCED_CPP_RATE)
    let cppBaseTaxCredit = totalTaxableIncome > MAX_CPP_CONTRIBUTORY_EARNINGS ? (MAX_CPP_CONTRIBUTORY_EARNINGS * BASE_CPP_RATE) : (totalTaxableIncome * BASE_CPP_RATE)
    let ei = totalTaxableIncome > MAX_EI_CONTRIBUTORY_EARNINGS ? (MAX_EI_CONTRIBUTORY_EARNINGS * EI_RATE) : (totalTaxableIncome * EI_RATE)

    let canadaTaxes = 0
    let bcTaxes = 0

    let totalTaxableIncomeCanada = totalTaxableIncome - cppEnhancedDeduction
    let canadaRefundableTaxCredits = (CANADA_TAX_CREDIT_BASE_AMOUNT + cppBaseTaxCredit + ei + (Math.min((employmentIncome + otherIncome), 1368))) * 0.15

    let totalTaxableIncomeBC = totalTaxableIncome - cppEnhancedDeduction
    let bcNonRefundableTaxCredits = (BC_TAX_CREDIT_BASE_AMOUNT + cppBaseTaxCredit + ei) * 0.0506

    CANADA_TAX_BRACKETS.forEach(bracket => {
      let amountForBracket = bracket.max - bracket.min;
      let amountTaxedInBracket = Math.min(totalTaxableIncomeCanada, amountForBracket)

      totalTaxableIncomeCanada -= amountTaxedInBracket

      if (amountTaxedInBracket > 0) {
        canadaTaxes += (amountTaxedInBracket * bracket.rate)
      }
    });

    BC_TAX_BRACKETS.forEach(bracket => {
      let amountForBracket = bracket.max - bracket.min;
      let amountTaxedInBracket = Math.min(totalTaxableIncomeBC, amountForBracket)

      totalTaxableIncomeBC -= amountTaxedInBracket

      if (amountTaxedInBracket > 0) {
        bcTaxes += amountTaxedInBracket * bracket.rate
      }
    });

    canadaTaxes -= canadaRefundableTaxCredits
    bcTaxes = ((bcTaxes - bcNonRefundableTaxCredits) < 0) ? 0 : (bcTaxes - bcNonRefundableTaxCredits)
    let allTaxes = canadaTaxes + bcTaxes + cppBaseTaxCredit + cppEnhancedDeduction + ei

    setCppTaxesOwed((cppBaseTaxCredit + cppEnhancedDeduction).toFixed(2))
    setEiTaxesOwed(ei.toFixed(2))
    setCanadaTaxesOwed(canadaTaxes.toFixed(2))
    setBcTaxesOwed(bcTaxes.toFixed(2))
    setTotalTaxesOwed(allTaxes.toFixed(2))
    setTaxesFinal((allTaxes - taxesPaid).toFixed(2))
  }

  useEffect(() => {
    calculateTaxes()
  }, [employmentIncome, selfEmploymentIncome, otherIncome, rrspfhsaDeductions, taxesPaid])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Calculate BC Taxes
        </CardTitle>
        <CardDescription>
          Calculate approximate owed taxes in line with the 2024 Government of Canada and Government of BC tax brackets
        </CardDescription>
      </CardHeader>
      <CardContent>
        <MoneyInput name="employment-income" placeholder="Employment Income" value={employmentIncome === 0 ? "" : employmentIncome} onChange={updateEmploymentIncome} />
        <MoneyInput name="self-employment-income" placeholder="Self Employment Income" value={selfEmploymentIncome === 0 ? "" : selfEmploymentIncome} onChange={updateSelfEmploymentIncome} />
        <MoneyInput name="rrsp-fhsa-deductions" placeholder="RRSP and FHSA Deductions" value={rrspfhsaDeductions === 0 ? "" : rrspfhsaDeductions} onChange={updateRrspfhsaDeductions} />
        <MoneyInput name="other-income" placeholder="Other Income" value={otherIncome === 0 ? "" : otherIncome} onChange={updateOtherIncome} />
        <MoneyInput name="taxes-paid" placeholder="Taxes Paid" value={taxesPaid === 0 ? "" : taxesPaid} onChange={updateTaxesPaid} />
      </CardContent>
      <CardFooter className="block">
        <div className="flex col-span-2 justify-between mb-2">
          <p>BC Tax Owed</p>
          <p>${bcTaxesOwed}</p>
        </div>
        <div className="flex col-span-2 justify-between mb-2">
          <p>Canada Tax Owed</p>
          <p>${canadaTaxesOwed}</p>
        </div>
        <div className="flex col-span-2 justify-between mb-2">
          <p>CPP Owed</p>
          <p>${cppTaxesOwed}</p>
        </div>
        <div className="flex col-span-2 justify-between mb-2">
          <p>EI Owed</p>
          <p>${eiTaxesOwed}</p>
        </div>
        <hr className="border-white mb-2"></hr>
        <div className="flex col-span-2 justify-between mb-2">
          <p>Total Tax Owed</p>
          <p>${totalTaxesOwed}</p>
        </div>
        <div className="flex col-span-2 justify-between mb-2">
          <p>Tax Already Paid</p>
          <p>- ${taxesPaid.toFixed(2)}</p>
        </div>
        <div className="flex col-span-2 justify-between mb-2">
          <p>Total Taxes Owed</p>
          <p>= ${taxesFinal}</p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default CalculatorCard
