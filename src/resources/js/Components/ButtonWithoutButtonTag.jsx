export default function ButtonWithoutButtonTag({ className = '', disabled, children, ...props }) {
    return (
        <div
            {...props}
            className={
                `inline-flex items-center px-4 py-2  border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </div>
    );
}