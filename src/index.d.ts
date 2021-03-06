import * as React from 'react';

export type OnSubmitResult = {
  values: Record<string, any>[]
}

export interface ContextFormProps {
  name?: string
  className?: string
  values?: object,
  onChange?: (value: any) => void
  onBeforeSubmit?: (data: any) => boolean
  onSubmit?: (res: OnSubmitResult) => void
  initialValues?: any
  validateOnSubmit?: boolean
  autoComplete?: boolean
}

export interface FormFieldProps {
  name: string
  type?: string
  className?: string
  placeholder?: string
  required?: boolean
  autoComplete?: boolean
  label?: string | any
  description?: string | any
  component?: any
  onChange?: (value: any) => void
  [x: string]: any
}

export interface FieldArrayProps {
  name         : string,
  initialCount : number,
  minCount?     : number,
}

export interface ContextFormProviderProps {
  theme?: ThemeInterface
}

export type ValidationError = {
  message: string,
  required: boolean,
} & Map<string, any>

export type FieldError = Record<string, ValidationError[]>

export interface ContextFormContextInterface {
  submit: () => void
  getValue: (name: string) => any
  setValue: (name: string, value: any) => any
  getValues: () => object
  validateFields: () => Promise<{ values: Map<string, any>, errors: Map<string, FieldError> }>
  getErrors: (name: string) => FieldError
  addError: (name: string, error: any) => void
  isValid: () => boolean
  getId: () => string
  getName: () => string
  errors: any[]
}

export interface ThemeFieldInterface {
  Container: any,
  Label: any,
  InputContainer: any,
  Description: any,
  Errors: any,
}

export interface ThemeFieldTypeInterface {
  component: any,
}

export interface ThemeInterface {
  name: string,
  Form: any,
  Field: ThemeFieldInterface,
  Footer: any,
  types: { [key: string]: ThemeFieldTypeInterface }
}

export interface FieldArrayConsumer {
  removeGroup: () => void
  count: number
  getValue: (name) => any
  setValue: (name, value) => void
  meta: any
}

export interface WithContextFormProps {
  contextForm: { getForm: (name: string) => ContextFormContextInterface }
}

export interface ContextFormContextConsumer {
  theme        : any,
  validator    : any,
  registerForm : () => void,
  getForm      : (name: string) => ContextFormContextInterface,
}

declare function humanizeName(name: string): string;

declare function withContextForm<T extends WithContextFormProps>(component: React.ComponentType<T>): React.ComponentClass<Omit<T, 'contextForm'>, any>

declare function withContextFormInstanceConsumer<T>(component: React.Component): React.Component<T & WithContextFormProps>

declare class ContextFormProvider extends React.Component<ContextFormProviderProps, any> {
}

declare class Field extends React.Component<FormFieldProps, any> {
}

declare class FieldArrayContext extends React.Component<FormFieldProps, any> {
  static Consumer: any
}

declare class FieldInput extends React.Component<FormFieldProps, any> {
}

declare class FormFooter extends React.Component<{}, any> {
}

declare class FieldArray extends React.Component<FieldArrayProps, any> {
  static Remove: any;
  static Add: any;
}

declare var SimpleTheme: ThemeInterface;

declare class Form extends React.Component<ContextFormProps, any> {
  static Field: Field;
}

declare class FormContext extends React.Component<any, any> {
  static Consumer: any;
}

declare class ContextFormContext extends React.Component<any, any> {
  static Consumer: any;
}

export default Form;
export {
  Field,
  FieldInput,
  FormFooter,
  FieldArray,
  ContextFormProvider,
  FieldArrayContext,
  ContextFormContext,
  FormContext,
  SimpleTheme,
  withContextFormInstanceConsumer,
  humanizeName,
  withContextForm,
}
