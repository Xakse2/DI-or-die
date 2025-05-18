import * as React from 'react';
// import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utilities';
import { labelVariants } from './labelVariants ';

function Label({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'label'> &
  VariantProps<typeof labelVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'label';

  return (
    <Comp
      data-slot="label"
      className={cn(labelVariants({ variant, size, className }))}
      {...props}
    />
  );
}

// function Label({
//   className,
//   ...props
// }: React.ComponentProps<typeof LabelPrimitive.Root>) {
//   return (
//     <LabelPrimitive.Root
//       data-slot="label"
//       className={cn(
//         'flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
//         className,
//       )}
//       {...props}
//     />
//   );
// }

export { Label };
