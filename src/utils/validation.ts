export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  custom?: (value: any) => string | undefined
}

export interface ValidationError {
  field: string
  message: string
}

export class Validator {
  private errors: ValidationError[] = []

  validate(value: any, field: string, rules: ValidationRule): this {
    this.errors = this.errors.filter(error => error.field !== field)

    // Required validation
    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      this.addError(field, `${field} is required`)
      return this
    }

    // Skip other validations if value is empty and not required
    if (!value || (typeof value === 'string' && !value.trim())) {
      return this
    }

    // String validations
    if (typeof value === 'string') {
      // Min length validation
      if (rules.minLength && value.length < rules.minLength) {
        this.addError(field, `${field} must be at least ${rules.minLength} characters`)
      }

      // Max length validation
      if (rules.maxLength && value.length > rules.maxLength) {
        this.addError(field, `${field} must not exceed ${rules.maxLength} characters`)
      }

      // Pattern validation
      if (rules.pattern && !rules.pattern.test(value)) {
        this.addError(field, `${field} format is invalid`)
      }
    }

    // Custom validation
    if (rules.custom) {
      const customError = rules.custom(value)
      if (customError) {
        this.addError(field, customError)
      }
    }

    return this
  }

  private addError(field: string, message: string): void {
    this.errors.push({ field, message })
  }

  getError(field: string): string | undefined {
    return this.errors.find(error => error.field === field)?.message
  }

  getAllErrors(): ValidationError[] {
    return [...this.errors]
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }

  clear(): void {
    this.errors = []
  }

  clearField(field: string): void {
    this.errors = this.errors.filter(error => error.field !== field)
  }
}

// Price list specific validation rules
export const priceListValidationRules = {
  name: {
    required: true,
    minLength: 1,
    maxLength: 255,
    custom: (value: string) => {
      if (value && value.trim() !== value) {
        return 'Name cannot have leading or trailing spaces'
      }
      return undefined
    }
  }
}

// Helper function for form validation
export const validatePriceListForm = (data: { name: string }): ValidationError[] => {
  const validator = new Validator()
  
  validator.validate(data.name, 'name', priceListValidationRules.name)
  
  return validator.getAllErrors()
}