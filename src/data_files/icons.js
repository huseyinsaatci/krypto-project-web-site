import '../style.css'

export const changeVisualizer = (change, styleProps) => {
    const arrowIcon = change < 0 ? "bi-arrow-down-square-fill" : "bi-arrow-up-square-fill";
    const color = change < 0 ? "red-b" : "green-b";
    return (
        <span className={color + " rad-10 " + styleProps}>
            <span
                className="iconify"
                style={{ styleProps }}
                data-icon={arrowIcon}>
            </span> {change}%
        </span>
    );
}