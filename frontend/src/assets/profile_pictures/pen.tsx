export default function Pen({scale}: { readonly scale?: number }) {
    return (
        <div style={{position: "absolute", transform:"translate(-15px, 3px)"}}>
        <svg width={scale ? (scale * 140) : 140} height={scale ? (scale * 220) : 220}
             viewBox={`0 0 ${scale ? (scale * 140) : 140} ${scale ? (scale * 220) : 220}`} fill="none"
             xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink">
            <rect width={scale ? (scale * 140) : 140} height={scale ? (scale * 220) : 220} fill="url(#pattern0)"/>
            <defs>
                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlinkHref="#image0_228_3" transform="scale(0.00714286 0.00454545)"/>
                </pattern>
                <image id="image0_228_3" width={scale ? (scale * 140) : 140} height={scale ? (scale * 220) : 220}
                       xlinkHref="data:image/png;base64,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GNC3C7Qatv19bNutE8D/DFxpHX+tCcQ+SW90tMgRMLQNXFx3NHkPuNwBwk+6ZEiO5KcpFIvA+xl9Ux4YvgUCa25v7X2cPgBZ6mr5Bjg4BMZLlL3u8e7+7t7+PdPu7weYknK2mty0tAAADRhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDQuNC4wLUV4aXYyIj4KIDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+CiAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIgogICAgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIKICAgIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIKICAgIHhtbG5zOkdJTVA9Imh0dHA6Ly93d3cuZ2ltcC5vcmcveG1wLyIKICAgIHhtbG5zOnRpZmY9Imh0dHA6Ly9ucy5hZG9iZS5jb20vdGlmZi8xLjAvIgogICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIgogICB4bXBNTTpEb2N1bWVudElEPSJnaW1wOmRvY2lkOmdpbXA6ZWQyZmI3MWItZTk3NS00MzA2LWJkNGEtNWQyY2IzNDMwZGE3IgogICB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjg0NmE1Mzc4LTlmMDQtNDdlMi1hZWUyLTZmY2Q3ZTc4OGJlYiIKICAgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOjA2ODY4NDM1LTlkMjItNDU3Ni05ODQzLTUyMmUwMjA3NTExZSIKICAgZGM6Rm9ybWF0PSJpbWFnZS9wbmciCiAgIEdJTVA6QVBJPSIyLjAiCiAgIEdJTVA6UGxhdGZvcm09IldpbmRvd3MiCiAgIEdJTVA6VGltZVN0YW1wPSIxNjk4MTU5NTQ1Mjg3Njc4IgogICBHSU1QOlZlcnNpb249IjIuMTAuMjQiCiAgIHRpZmY6T3JpZW50YXRpb249IjEiCiAgIHhtcDpDcmVhdG9yVG9vbD0iR0lNUCAyLjEwIj4KICAgPHhtcE1NOkhpc3Rvcnk+CiAgICA8cmRmOlNlcT4KICAgICA8cmRmOmxpCiAgICAgIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiCiAgICAgIHN0RXZ0OmNoYW5nZWQ9Ii8iCiAgICAgIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OWE4NDE3NmItYzRiNS00MWRhLThhYTctMWMwOTI0YjA4Yjk2IgogICAgICBzdEV2dDpzb2Z0d2FyZUFnZW50PSJHaW1wIDIuMTAgKFdpbmRvd3MpIgogICAgICBzdEV2dDp3aGVuPSIyMDIzLTEwLTI0VDE2OjU5OjA1Ii8+CiAgICA8L3JkZjpTZXE+CiAgIDwveG1wTU06SGlzdG9yeT4KICA8L3JkZjpEZXNjcmlwdGlvbj4KIDwvcmRmOlJERj4KPC94OnhtcG1ldGE+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAKPD94cGFja2V0IGVuZD0idyI/PiSGQNMAAAAGYktHRAD/AP8A/6C9p5MAAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfnChgOOwVeztD2AAAMRElEQVR42u2dbWhV5x3Af7kcQhghA/GDhJ3MD5kbLgPJ1kxGCCXkQ6ur8yW+pVVjWytZ2ewsAUXOgpyJFDdpO1g3mVWns2wi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"/>
            </defs>
        </svg>
        </div>

    );
}
