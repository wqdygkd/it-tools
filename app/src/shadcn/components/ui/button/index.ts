import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  'tw-:inline-flex tw-:items-center tw-:justify-center tw-:gap-2 tw-:whitespace-nowrap tw-:rounded-md tw-:text-sm tw-:font-medium tw-:transition-colors tw-:focus-visible:outline-none tw-:focus-visible:ring-1 tw-:focus-visible:ring-ring tw-:disabled:pointer-events-none tw-:disabled:opacity-50 tw-:[&_svg]:pointer-events-none tw-:[&_svg]:size-4 tw-:[&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'tw-:bg-primary tw-:text-primary-foreground tw-:shadow tw-:hover:bg-primary/90',
        destructive:
          'tw-:bg-destructive tw-:text-destructive-foreground tw-:shadow-sm tw-:hover:bg-destructive/90',
        outline:
          'tw-:border tw-:border-input tw-:bg-background tw-:shadow-sm tw-:hover:bg-accent tw-:hover:text-accent-foreground',
        secondary:
          'tw-:bg-secondary tw-:text-secondary-foreground tw-:shadow-sm tw-:hover:bg-secondary/80',
        ghost: 'tw-:hover:bg-accent tw-:hover:text-accent-foreground',
        link: 'tw-:text-primary tw-:underline-offset-4 tw-:hover:underline',
      },
      size: {
        "default": 'tw-:h-9 tw-:px-4 tw-:py-2',
        "xs": 'tw-:h-7 tw-:rounded tw-:px-2',
        "sm": 'tw-:h-8 tw-:rounded-md tw-:px-3 tw-:text-xs',
        "lg": 'tw-:h-10 tw-:rounded-md tw-:px-8',
        "icon": 'tw-:h-9 tw-:w-9',
        "icon-sm": 'tw-:size-8',
        "icon-lg": 'tw-:size-10',
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
