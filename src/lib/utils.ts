import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const BC_TAX_BRACKETS = [
  {
    min: 0, max: 47937, rate: 0.0506 
  },
  {
    min: 47937.01, max: 95875, rate: 0.0770
  },
  {
    min: 95875.01, max: 110076, rate: 0.1050
  },
  {
    min: 110076.01, max: 133664, rate: 0.1229
  },
  {
    min: 133664.01, max: 181232, rate: 0.1470
  },
  {
    min: 181232.01, max: 252752, rate: 0.1680
  },
  {
    min: 252752.01, max: 999999, rate: 0.2050
  }
]

export const CANADA_TAX_BRACKETS = [
  {
    min: 0, max: 55867, rate: 0.1500
  },
  {
    min: 55867.01, max: 111733, rate: 0.2050
  },
  {
    min: 111733.01, max: 173205, rate: 0.2600
  },
  {
    min: 173205.01, max: 246752, rate: 0.2900
  },
  {
    min: 246752.01, max: 999999, rate: 0.3300
  }
]

export const MAX_CPP_CONTRIBUTORY_EARNINGS = 65000
export const BASE_CPP_RATE = 0.0495
export const ENHANCED_CPP_RATE = 0.0100

export const MAX_EI_CONTRIBUTORY_EARNINGS = 63200
export const EI_RATE = 0.0166
