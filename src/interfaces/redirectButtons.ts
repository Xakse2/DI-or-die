export interface RedirectButtons {
  path: string;
  label: string;
  variant?:
    | 'green'
    | 'default'
    | 'link'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost';
}
