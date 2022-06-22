import React from "react";
import SvgIcon, { SvgProps } from "./SvgIcon";

const AngleDownIcon: React.FunctionComponent<
  SvgProps & React.HTMLAttributes<SVGElement>
> = ({ color = "#000", ...rest }) => {
  return (
    <SvgIcon {...rest}>
      <path
        xmlns="http://www.w3.org/2000/svg"
        fill={color}
        fillRule="evenodd"
        d="M7.61105234,1.24305289 C7.23357641,0.910562568 6.64505651,0.920380305 6.28024642,1.2652535 C5.91543633,1.6101267 5.90554835,2.16601382 6.25788698,2.52226769 L16.4724222,12.1691752 L6.25846924,21.4795051 C5.90709824,21.8356948 5.91741079,22.3907202 6.28179756,22.7350452 C6.64618434,23.0793701 7.23379611,23.0893496 7.61105234,22.75762 L19,12.1691752 L7.61105234,1.24305289 Z"
        transform="rotate(90 12.5 12)"
      />
    </SvgIcon>
  );
};

export default AngleDownIcon;
