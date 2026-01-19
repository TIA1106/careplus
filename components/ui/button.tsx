import * as React from "react"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost"
    size?: "default" | "sm" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "default", ...props }, ref) => {
        const baseStyles =
            "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:pointer-events-none disabled:opacity-50"

        const variants = {
            primary: "bg-primary text-white hover:bg-primary-dark shadow-md",
            secondary: "bg-secondary text-white hover:bg-secondary-dark shadow-md",
            outline:
                "border-2 border-primary text-primary hover:bg-primary/5",
            ghost: "text-accent hover:bg-gray-100",
        }

        const sizes = {
            default: "h-11 px-8 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-14 rounded-md px-10 text-lg",
        }

        const cn = (...classes: (string | undefined)[]) =>
            classes.filter(Boolean).join(" ")

        return (
            <button
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
