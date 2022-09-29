// export default function SvgIcon({
//   name,
//   prefix = "icon",
//   color = "#333",
//   ...props
// }) {
//   const symbolId = `#${prefix}-${name}`;

//   return (
//     <svg {...props} aria-hidden="true">
//       <use href={symbolId} fill={color} />
//     </svg>
//   );
// }

import { useDynamicSvgImport } from "../../hooks";

interface IProps {
  iconName: string;
  wrapperStyle?: string;
  svgProp?: React.SVGProps<SVGSVGElement>;
}

function SvgIcon(props: IProps) {
  const { iconName, wrapperStyle, svgProp } = props;
  const { loading, SvgIcon } = useDynamicSvgImport(iconName);

  return (
    <>
      {loading && (
        <div className="rounded-full bg-slate-400 animate-pulse h-8 w-8"></div>
      )}
      {SvgIcon && (
        <div className={wrapperStyle}>
          <SvgIcon {...svgProp} />
        </div>
      )}
    </>
  );
}

export default SvgIcon;
