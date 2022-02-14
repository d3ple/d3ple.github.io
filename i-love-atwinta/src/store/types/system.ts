export interface IBreadcrumb {
  to: string,
  title: string,
  external?: boolean,
}

export interface INameValue {
  name: string,
  value: string|number|null,
}