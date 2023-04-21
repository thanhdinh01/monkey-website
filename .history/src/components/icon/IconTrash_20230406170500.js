import React from "react";

const IconTrash = ({ className = "", onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

    </span>
  );
};

export default IconSearch;
import React from "react";

const IconSearch = ({ className = "", onClick = () => {} }) => {
  return (
    <span className={className} onClick={onClick}>
      <svg
        width="18"
        height="17"
        viewBox="0 0 18 17"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <ellipse
          cx="7.66669"
          cy="7.05161"
          rx="6.66669"
          ry="6.05161"
          stroke="#999999"
          strokeWidth="1.5"
        />
        <path
          d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
          stroke="#999999"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};

export default IconTrash;
