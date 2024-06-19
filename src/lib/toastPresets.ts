import Toastify from 'toastify-js'

export enum ToastSeverity {
    Information,
    Success,
    Warning,
    Error
}

export function showToast(text: string, severity: ToastSeverity, onClick: null | (() => void) = null) {
    let color = "";

    switch (severity) {
        case ToastSeverity.Success:
            color = "rgb(50,255,50)";
            break;
        case ToastSeverity.Information:
            color = "rgb(220,220,220)"
            break;
        case ToastSeverity.Warning:
            color = "rgb(210,130,130)"
            break
        case ToastSeverity.Error:
            color = "rgb(255,50,50)"
            break;
    }

    Toastify({
        text: text,
        duration: 3000,
        style: {
            "background": color,
            "color": "rgb(10,10,10)"
        },
        gravity: "bottom",
        position: "right",
        onClick: (onClick == null ? () => { } : onClick)
    }).showToast()
}