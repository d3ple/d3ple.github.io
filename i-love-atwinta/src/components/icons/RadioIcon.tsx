import React from 'react'

interface IRadioIcon {
  checked: boolean,
}

export const RadioIcon: React.FC<IRadioIcon> = ({ checked }) => {
  return (
    <>
      {
      checked ? 
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path d="M7 14C10.866 14 14 10.866 14 7C14 3.13401 10.866 0 7 0C3.13401 0 0 3.13401 0 7C0 10.866 3.13401 14 7 14Z" fill="#1874FD"/>
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <mask id="path-1-inside-1_788_25289" fill="white">
          <rect width="10" height="10" rx="1"/>
        </mask>
        <rect width="10" height="10" rx="1" fill="#1874FD" stroke="#1874FD" strokeWidth="4" mask="url(#path-1-inside-1_788_25289)"/>
      </svg>  
      }
    </>
  )
}

export default RadioIcon