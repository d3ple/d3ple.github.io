import React from 'react'
// Components
import Typography from '@mui/material/Typography'

// Styles
import s from '~/components/atom/hospital/type/HospitalAtomType.module.scss'

interface Props {
  isPrivate: boolean,
  iconClass?: string,
  underline?: boolean,
}

const HospitalAtomType: React.FC<Props> = ({
  isPrivate,
  underline = true,
  iconClass
}) => {

  const typeOfCardText = isPrivate ? 'Частная клиника' : 'Государственное учереждение'

  return (
    <>
      { isPrivate ?
        <svg className={iconClass ? iconClass : s.defaultIconClass} width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1516_9222" fill="white">
          <path fillRule="evenodd" clipRule="evenodd" d="M9 9H6C5.44772 9 5 9.44772 5 10V20C5 20.5523 5.44772 21 6 21H20C20.5523 21 21 20.5523 21 20V10C21 9.44772 20.5523 9 20 9H17V10.6H19.4V19.4H6.6V10.6H9V9Z"/>
          </mask>
          <path fillRule="evenodd" clipRule="evenodd" d="M9 9H6C5.44772 9 5 9.44772 5 10V20C5 20.5523 5.44772 21 6 21H20C20.5523 21 21 20.5523 21 20V10C21 9.44772 20.5523 9 20 9H17V10.6H19.4V19.4H6.6V10.6H9V9Z" fill="black"/>
          <path d="M9 9H10.6V7.4H9V9ZM17 9V7.4H15.4V9H17ZM17 10.6H15.4V12.2H17V10.6ZM19.4 10.6H21V9H19.4V10.6ZM19.4 19.4V21H21V19.4H19.4ZM6.6 19.4H5V21H6.6V19.4ZM6.6 10.6V9H5V10.6H6.6ZM9 10.6V12.2H10.6V10.6H9ZM9 7.4H6V10.6H9V7.4ZM6 7.4C4.56406 7.4 3.4 8.56406 3.4 10H6.6C6.6 10.3314 6.33137 10.6 6 10.6V7.4ZM3.4 10V20H6.6V10H3.4ZM3.4 20C3.4 21.4359 4.56406 22.6 6 22.6V19.4C6.33137 19.4 6.6 19.6686 6.6 20H3.4ZM6 22.6H20V19.4H6V22.6ZM20 22.6C21.4359 22.6 22.6 21.4359 22.6 20H19.4C19.4 19.6686 19.6686 19.4 20 19.4V22.6ZM22.6 20V10H19.4V20H22.6ZM22.6 10C22.6 8.56406 21.4359 7.4 20 7.4V10.6C19.6686 10.6 19.4 10.3314 19.4 10H22.6ZM20 7.4H17V10.6H20V7.4ZM15.4 9V10.6H18.6V9H15.4ZM19.4 9H17V12.2H19.4V9ZM21 19.4V10.6H17.8V19.4H21ZM6.6 21H19.4V17.8H6.6V21ZM5 10.6V19.4H8.2V10.6H5ZM9 9H6.6V12.2H9V9ZM10.6 10.6V9H7.4V10.6H10.6Z" fill="#718096" mask="url(#path-1-inside-1_1516_9222)"/>
          <mask id="path-3-inside-2_1516_9222" fill="white">
          <rect x="9" y="16" width="8" height="5" rx="1"/>
          </mask>
          <rect x="9" y="16" width="8" height="5" rx="1" stroke="#718096" strokeWidth="3.2" mask="url(#path-3-inside-2_1516_9222)"/>
          <mask id="path-4-inside-3_1516_9222" fill="white">
          <path d="M12.5 17.5C12.5 17.2239 12.7239 17 13 17C13.2761 17 13.5 17.2239 13.5 17.5V20.5C13.5 20.7761 13.2761 21 13 21C12.7239 21 12.5 20.7761 12.5 20.5V17.5Z"/>
          </mask>
          <path d="M11.9 17.5V20.5H15.1V17.5H11.9ZM14.1 20.5V17.5H10.9V20.5H14.1ZM13 19.4C13.6075 19.4 14.1 19.8925 14.1 20.5H10.9C10.9 21.6598 11.8402 22.6 13 22.6V19.4ZM11.9 20.5C11.9 19.8925 12.3925 19.4 13 19.4V22.6C14.1598 22.6 15.1 21.6598 15.1 20.5H11.9ZM13 18.6C12.3925 18.6 11.9 18.1075 11.9 17.5H15.1C15.1 16.3402 14.1598 15.4 13 15.4V18.6ZM13 15.4C11.8402 15.4 10.9 16.3402 10.9 17.5H14.1C14.1 18.1075 13.6075 18.6 13 18.6V15.4Z" fill="#718096" mask="url(#path-4-inside-3_1516_9222)"/>
          <rect x="0.25" y="-0.25" width="19.5" height="0.5" rx="0.25" transform="matrix(1 0 0 -1 3 20.5)" stroke="#718096" strokeWidth="0.5"/>
          <mask id="path-7-inside-4_1516_9222" fill="white">
          <rect x="8" y="5" width="10" height="8" rx="1"/>
          </mask>
          <rect x="8" y="5" width="10" height="8" rx="1" stroke="#718096" strokeWidth="3.2" mask="url(#path-7-inside-4_1516_9222)"/>
          <path d="M13 8V10" stroke="#718096" strokeWidth="1.6" strokeLinecap="round"/>
          <path d="M14 9L12 9" stroke="#718096" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      : 
      <svg className={iconClass ? iconClass : s.defaultIconClass} width='24px' height='24px' viewBox="0 0 26 26" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M11.517 15.8672H13.6239C14.4611 15.8672 15.1448 16.5509 15.1448 17.3881V19.8136H9.99609V17.3881C9.99609 16.5509 10.6798 15.8672 11.517 15.8672V15.8672Z" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path d="M18.2609 19.9989L19.9996 19.9996C20.552 19.9998 21 19.552 21 18.9996V10C21 9.44771 20.5523 9 20 9H18" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <path d="M7.65217 19.9991L5.00024 19.9998C4.44786 19.9999 4 19.5521 4 18.9998V12C4 11.4477 4.44772 11 5 11H8" stroke="#718096" strokeWidth="1.6" strokeMiterlimit="22.9256"/>
        <mask id="path-4-inside-1_933_25070" fill="white">
        <path d="M14.1833 10.5811H10.9531V12.1438H14.1833V10.5811Z"/>
        </mask>
        <path d="M14.1833 10.5811H10.9531V12.1438H14.1833V10.5811Z" fill="#718096"/>
        <path d="M10.9531 10.5811V8.98105H9.35312V10.5811H10.9531ZM14.1833 10.5811H15.7833V8.98105H14.1833V10.5811ZM14.1833 12.1438V13.7438H15.7833V12.1438H14.1833ZM10.9531 12.1438H9.35312V13.7438H10.9531V12.1438ZM10.9531 12.1811H14.1833V8.98105H10.9531V12.1811ZM12.5833 10.5811V12.1438H15.7833V10.5811H12.5833ZM14.1833 10.5438H10.9531V13.7438H14.1833V10.5438ZM12.5531 12.1438V10.5811H9.35312V12.1438H12.5531Z" fill="#718096" mask="url(#path-4-inside-1_933_25070)"/>
        <mask id="path-6-inside-2_933_25070" fill="white">
        <path d="M14.1833 12.793H10.9531V14.3557H14.1833V12.793Z"/>
        </mask>
        <path d="M14.1833 12.793H10.9531V14.3557H14.1833V12.793Z" fill="#718096"/>
        <path d="M10.9531 12.793V11.193H9.35312V12.793H10.9531ZM14.1833 12.793H15.7833V11.193H14.1833V12.793ZM14.1833 14.3557V15.9557H15.7833V14.3557H14.1833ZM10.9531 14.3557H9.35312V15.9557H10.9531V14.3557ZM10.9531 14.393H14.1833V11.193H10.9531V14.393ZM12.5833 12.793V14.3557H15.7833V12.793H12.5833ZM14.1833 12.7557H10.9531V15.9557H14.1833V12.7557ZM12.5531 14.3557V12.793H9.35312V14.3557H12.5531Z" fill="#718096" mask="url(#path-6-inside-2_933_25070)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M9.64603 6.24805H8.98105C7.70204 6.24805 6.66016 7.28993 6.66016 8.56894V20.1687V20.9687H7.46016H17.6809H18.4809V20.1687V8.56894C18.4809 7.28993 17.439 6.24805 16.16 6.24805H15.4599V7.84805H16.16C16.5553 7.84805 16.8809 8.17358 16.8809 8.56894V19.3687H8.26016V8.56894C8.26016 8.17358 8.58569 7.84805 8.98105 7.84805H9.64603V6.24805Z" fill="#718096"/>
        <path d="M13.2653 4H11.8723C11.6796 4 11.5234 4.15618 11.5234 4.34883V8.80455C11.5234 8.9972 11.6796 9.15338 11.8723 9.15338H13.2653C13.4579 9.15338 13.6141 8.9972 13.6141 8.80455V4.34883C13.6141 4.15618 13.4579 4 13.2653 4Z" fill="#718096"/>
        <path d="M15.1484 7.27096L15.1484 5.88153C15.1484 5.68807 14.9916 5.53125 14.7982 5.53125L10.3438 5.53125C10.1504 5.53125 9.99353 5.68807 9.99353 5.88153L9.99353 7.27096C9.99353 7.46441 10.1504 7.62123 10.3438 7.62123L14.7982 7.62123C14.9916 7.62123 15.1484 7.46441 15.1484 7.27096Z" fill="#718096"/>
      </svg>
      }
      <Typography variant='body4' sx={{
        textDecoration: underline ? 'underline' : 'none',
      }}>{ typeOfCardText }</Typography>
    </>
  )
}

export default HospitalAtomType
