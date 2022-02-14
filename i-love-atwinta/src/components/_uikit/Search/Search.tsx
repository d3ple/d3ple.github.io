import React, { forwardRef } from 'react'
import { styled } from '@mui/material';
import InputUnstyled, { InputUnstyledProps } from '@mui/base/InputUnstyled';

import Button from '~/components/_uikit/Button'
// Styles
import s from '~/components/_uikit/Search/Search.module.scss'
import useIsMobileView from '~/hooks/useIsMobile';

const StyledInputElement = styled('input')(
  ({ theme }) => {
    const { isMobileView } = useIsMobileView()
    return `
    width: 100%;
    font-size: ${isMobileView ? '0.75rem'  : '0.875rem'};
    font-family: Rubik, sans-serif;
    font-weight: 400;
    line-height: 1.5;
    color: ${theme.palette.grey[200]};
    background: white;
    border: 18px solid #D3EBFF;
    border-radius: 40px;
    padding: 12px 12px;
    transition: all 150ms ease;
    padding-left: ${ !isMobileView ? '53px' : '17px'};
    padding-right: ${ !isMobileView ? '170px' : '72px'};
  
    &::placeholder {
      text-overflow: ellipsis;
      overflow: hidden; 
    }
    
    &:focus {
      outline: none;
    }
  `
  },
);

const CustomInput = forwardRef(function CustomInput(
  props: InputUnstyledProps & {
    externalProps: {
      onSearch: (value: string) => void
    }
  },
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const { isMobileView } = useIsMobileView()

  return (
    <div className={s.searchHospitalField}>
      <InputUnstyled components={{ Input: StyledInputElement }} {...props} ref={ref} />
      <div className={s.confirmButton}>
        <Button
          onClick={props.externalProps.onSearch}
          sx={{
            borderRadius: '25px',
            fontSize: '0.875rem',
            padding: !isMobileView ? '15px 14px' : '10px 14px',
            width: !isMobileView ? '168px' : '72px',
          }}
        >
          { !isMobileView
            ? 
              'NORMAL' 
            :
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.6487 9.52694C19.4851 12.6238 17.6526 15.8123 14.5558 16.6487C11.4589 17.4851 8.27041 15.6526 7.43402 12.5558C6.59764 9.45892 8.4301 6.2704 11.527 5.43401C14.6238 4.59763 17.8123 6.43009 18.6487 9.52694Z" stroke="#718096" strokeWidth="1.5"/>
              <path d="M18.6487 9.52694C19.4851 12.6238 17.6526 15.8123 14.5558 16.6487C11.4589 17.4851 8.27041 15.6526 7.43402 12.5558C6.59764 9.45892 8.4301 6.2704 11.527 5.43401C14.6238 4.59763 17.8123 6.43009 18.6487 9.52694Z" stroke="white" strokeWidth="1.5"/>
              <path d="M16.109 10.6659C15.6054 8.80101 13.6852 7.6975 11.8203 8.20117" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M16.109 10.6659C15.6054 8.80101 13.6852 7.6975 11.8203 8.20117" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M19.6211 16.9629L21.6613 19.0292" stroke="#718096" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M19.6211 16.9629L21.6613 19.0292" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          }

        </Button>
      </div>
    </div>
  );
});

interface Props {
  value: string,
  onChange: (value: string) => void,
  onSearch: (value: string) => void,  
}

const Search: React.FC<Props> = ({
  value,
  onChange,
  onSearch,
}) => {
  const { isMobileView } = useIsMobileView()

  return <CustomInput
    aria-label="Demo input"
    placeholder={isMobileView ? 'Поиск мед. учреждения, услуги' : 'Поиск медицинского учреждения'}
    value={value}
    onChange={(e) => onChange(e.currentTarget.value)}
    externalProps={{
      onSearch: () => onSearch(value),
    }}
  />;
}

export default Search