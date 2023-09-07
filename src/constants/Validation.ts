export const rules = {
  required: (val: string) => (val && val.length > 0) || 'لطفا فیلد را پر کنید',
  requiredNumber: (val: number) => val > 0 || 'لطفا عدد را وارد کنید',
};
