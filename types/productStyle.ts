import { StylesConfig } from 'react-select'
import { ProductType } from '@/schemas/product.schema'


export type SelectOption = {
  value: string
  label: string
}


export const multiSelectStyles: StylesConfig<SelectOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#94a3b8',
    },
  }),
  input: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748b',
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#dbeafe',
    borderRadius: 6,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#1d4ed8',
    fontWeight: 600,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#1d4ed8',
    ':hover': {
      backgroundColor: '#bfdbfe',
      color: '#1e40af',
    },
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f1f5f9' : '#ffffff',
    color: state.isSelected ? '#1d4ed8' : '#0f172a',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#64748b',
  }),
}

export type CategoryValue = ProductType['category']
export type CategoryOption = {
  value: CategoryValue
  label: string
}

export const categoryOptions: CategoryOption[] = [
  { value: 'watch', label: 'Watches' },
  { value: 'shoe', label: 'Shoes' },
  { value: 'cloth', label: 'Clothes' },
]

export const genderOptions: SelectOption[] = [
  { value: 'men', label: 'Male' },
  { value: 'women', label: 'Female' },
  { value: 'unisex', label: 'Unisex' },
]

export const featureOptionsByCategory: Record<CategoryValue, SelectOption[]> = {
  watch: [
    { value: 'analog', label: 'Analog Display' },
    { value: 'digital', label: 'Digital Display' },
    { value: 'smart', label: 'Smart Watch' },
    { value: 'waterresistant', label: 'Water Resistant' },
    { value: 'stainlesssteel', label: 'Stainless Steel' },
    { value: 'chronograph', label: 'Chronograph Function' },
    { value: 'leatherstrap', label: 'Leather Strap' },
  ],
  cloth: [
    { value: 'cotton', label: 'Cotton Fabric' },
    { value: 'linen', label: 'Linen Material' },
    { value: 'polyester', label: 'Polyester Blend' },
    { value: 'handmade', label: 'Handmade' },
    { value: 'washable', label: 'Machine Washable' },
    { value: 'casual', label: 'Casual Wear' },
    { value: 'formal', label: 'Formal Wear' },
  ],
  shoe: [
    { value: 'leather', label: 'Leather Material' },
    { value: 'sports', label: 'Sports Type' },
    { value: 'waterproof', label: 'Waterproof' },
    { value: 'lightweight', label: 'Lightweight' },
    { value: 'slipresistant', label: 'Slip Resistant' },
    { value: 'breathable', label: 'Breathable Material' },
    { value: 'cushioned', label: 'Cushioned Sole' },
  ],
}

export const sizeOptionsByCategory: Record<CategoryValue, SelectOption[]> = {
  watch: [
    { value: '28mm', label: '28 mm (Small)' },
    { value: '32mm', label: '32 mm (Medium - Women)' },
    { value: '36mm', label: '36 mm (Unisex)' },
    { value: '40mm', label: '40 mm (Standard Men)' },
    { value: '44mm', label: '44 mm (Large Dial)' },
    { value: '46mm', label: '46 mm (Extra Large)' },
  ],
  cloth: [
    { value: 'xs', label: 'XS (Extra Small)' },
    { value: 's', label: 'S (Small)' },
    { value: 'm', label: 'M (Medium)' },
    { value: 'l', label: 'L (Large)' },
    { value: 'xl', label: 'XL (Extra Large)' },
    { value: 'xxl', label: 'XXL (2X Large)' },
  ],
  shoe: [
    { value: '38', label: 'EU 38 / US 6' },
    { value: '39', label: 'EU 39 / US 7' },
    { value: '40', label: 'EU 40 / US 7.5' },
    { value: '41', label: 'EU 41 / US 8' },
    { value: '42', label: 'EU 42 / US 9' },
    { value: '43', label: 'EU 43 / US 10' },
    { value: '44', label: 'EU 44 / US 11' },
  ],
}

export const singleSelectStyles: StylesConfig<CategoryOption, false> = {
  control: (base, state) => ({
    ...base,
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: state.isFocused ? '#3b82f6' : '#cbd5e1',
    boxShadow: state.isFocused ? '0 0 0 2px rgba(59, 130, 246, 0.2)' : 'none',
    '&:hover': {
      borderColor: state.isFocused ? '#3b82f6' : '#94a3b8',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  input: (base) => ({
    ...base,
    color: '#0f172a',
  }),
  placeholder: (base) => ({
    ...base,
    color: '#64748b',
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
    border: '1px solid #e2e8f0',
    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.12)',
    zIndex: 30,
  }),
  menuList: (base) => ({
    ...base,
    backgroundColor: '#ffffff',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? '#dbeafe' : state.isFocused ? '#f1f5f9' : '#ffffff',
    color: state.isSelected ? '#1d4ed8' : '#0f172a',
    cursor: 'pointer',
  }),
  noOptionsMessage: (base) => ({
    ...base,
    color: '#64748b',
  }),
}
