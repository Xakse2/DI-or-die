import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utilities';
import { labelVariants } from './labelVariants';

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

export { Label };
