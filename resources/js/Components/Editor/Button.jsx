import { useNode } from "@craftjs/core";

export function Button({ text, className = "", disabled, children, ...props }) {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <button
        {...props}
        className={
          `inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150 ${
            disabled && "opacity-25"
          } ` + className
        }
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
}