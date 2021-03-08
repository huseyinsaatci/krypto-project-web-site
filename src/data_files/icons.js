import coin_colors from './coin_data.json';
import '../style.css'


export const cryptoCoinIconDefault = (id, classProps) => {
    return (
        <span
            className={"iconify " + classProps}
            style={{ color: coin_colors[id] }}
            data-icon={"cryptocurrency:" + id.toLowerCase()} >
        </span>
    );
}

export const cryptoCoinIconCustom = (id, classProps, styleProps) => {
    return (
        <span
            className={"iconify " + classProps}
            style={{ color: [styleProps] }}
            data-icon={"cryptocurrency:" + id.toLowerCase()} >
        </span>
    );
}

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

export const downArrow = (classProps, styleProps) => {
    return (
        <span
            className={"iconify " + classProps}

            style={{ color: [styleProps] }}
            data-icon="bi-arrow-down-square-fill">
        </span>
    );
}

export const upArrow = (classProps, styleProps) => {
    return (
        <span
            className={"iconify " + classProps}

            style={{ color: [styleProps] }}
            data-icon="bi-arrow-up-square-fill">
        </span>
    );
}