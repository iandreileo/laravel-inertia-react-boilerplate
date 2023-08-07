export default function Icon({ name, ...props }) {
    return (
        <span className="material-symbols-rounded" {...props}>
            {name}
        </span>
    );
}
