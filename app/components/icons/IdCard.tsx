import React from 'react'

const IdCard = () => (
  <svg width="50" height="50" viewBox="0 0 45 45" xmlSpace="preserve" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* IdCard 아이콘 */}
    <g transform="translate(11, 11)">
      {' '}
      {/* 아이콘을 중앙에 맞추기 위해 translate 사용 */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.5 7V17C3.5 18.1046 4.39543 19 5.5 19H19.5C20.6046 19 21.5 18.1046 21.5 17V7C21.5 5.89543 20.6046 5 19.5 5H5.5C4.39543 5 3.5 5.89543 3.5 7Z"
        stroke="#000000"
        strokeWidth="1.5"
      />
      <path d="M15.5 10H18.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15.5 13H18.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 10C11.5 11.1046 10.6046 12 9.5 12C8.39543 12 7.5 11.1046 7.5 10C7.5 8.89543 8.39543 8 9.5 8C10.0304 8 10.5391 8.21071 10.9142 8.58579C11.2893 8.96086 11.5 9.46957 11.5 10Z"
        stroke="#000000"
        strokeWidth="1.5"
      />
      <path d="M5.5 16C8.283 12.863 11.552 13.849 13.5 16" stroke="#000000" strokeWidth="1.5" />
    </g>
  </svg>
)

export default IdCard
