import React from 'react'
import { Formik } from 'formik'

import { FormLabel, Typography } from '@mui/material'

// Styling
import s from '~/components/forms/LoginForm.module.scss'
// Components
import FormikTextField from '~/components/_uikit/FormikTextField'
import FormikCheckbox from '~/components/_uikit/FormikCheckbox'
import LinkText from '~/components/typography/LinkText'
import Button from '~/components/_uikit/Button'
import FormikRadioGroup from '~/components/_uikit/FormikRadioGroup'
import TextFieldWithMask from '~/components/_uikit/TextFieldWithMask'
// Types
import { Sex, INewPatientForm } from '~/store/types/patient'
// FormValidation
import Yup from '~/utils/plugins/Yup'

interface Props {
  loginCallback: (payload: INewPatientForm, callback: () => void) => void,
  regionId: number | null,
}

const INITIAL_LOGIN_FORM_STATE: INewPatientForm = {
  fname: '',
  lname: '',
  mname: '',
  birthday: '',
  insurance_policy: '',
  id_gender: Sex.male,
  personal: false,
}

const FORM_VALIDATION = Yup.object().shape({
  fname: Yup.string()
    .required(),
  lname: Yup.string()
    .required(),
  mname: Yup.string(),
  birthday: Yup.string()
    .required()
    .matches(/^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/, 'Неверный формат даты'),
  insurance_policy: Yup.string().matches(/^(.*)?\S+(.*)?$/, 'Не пустое поле')
    .required()
    .matches(/^[0-9]+$/, "Только числа разрешены")
    .min(16, 'Укажите верный формат полиса')
    .max(16, 'Укажите верный формат полиса'),
  id_gender: Yup.number().required()
    .oneOf([Sex.female, Sex.male]),
  personal: Yup.boolean().required()
    .oneOf([true], 'Обязательное поле'),
})

const LoginForm: React.FC<Props> = ({
  loginCallback,
  regionId,
}) => {
  return (
    <Formik
      initialValues={{
        ...INITIAL_LOGIN_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      validateOnMount
      onSubmit={(values, actions) => {
        actions.setSubmitting(true)
        // Note: ресетаем
        actions.setFieldValue('personal', false)
        loginCallback(values, () => {
          actions.setSubmitting(false)
        })
      }}
    >
      { ({ isValid, handleSubmit, isSubmitting }) => {
          return (<form className={s.form} onSubmit={handleSubmit}>
            <div className={s.formContainer}>
              <FormikTextField
                autoFocus
                name='lname'
                label='Фамилия'
                fullWidth
              />
              <FormikTextField
                name='fname'
                label='Имя'
                fullWidth
              />
              <FormikTextField
                name='mname'
                label='Отчество'
                fullWidth
              />
              <TextFieldWithMask
                name='birthday'
                placeholder='__.__.____'
                label='Дата рождения'
                fullWidth
              />
              <TextFieldWithMask
                name='insurance_policy'
                mask='#### #### #### ####'
                label='Полис'
                fullWidth
              />
            </div>
            <div className={s.formGender}>
              <FormikRadioGroup
                name='id_gender'
                options={[{ value: Sex.male, label: 'мужской' }, { value: Sex.female, label: 'женский' } ]}
              />
            </div>
            <div className={s.formAgreement}>
              <FormLabel sx={{
                display: 'flex',
                alignItems: 'flex-start',
              }}>
                <FormikCheckbox
                  name='personal'
                  sx={{
                    display: 'inline-block',
                    marginRight: '10px',
                  }}
                />
                <LinkText
                  type='external'
                  src='https://onlinezdrav.ru'
                >
                  Согласие на обработку персональных данных
                </LinkText>
              </FormLabel>
            </div>
            <div className={s.formConfirm}>
              <Button type="submit" disabled={!isValid || !regionId || isSubmitting} sx={{
                width: '100%',
                fontSize: '1rem',
                lineHeight: '20px',
                letterSpacing: '0.04em',
              }}>Войти</Button>
            </div>
            {
               !regionId && 
                  <Typography variant='small' sx={{
                    display: 'inline-block',
                    marginTop: '10px',
                    color: 'error.main'
                  }}>Для продолжения работы разрешите геолокацию на устройстве и обновите страницу</Typography>
            }
          </form>
        )}
      }
    </Formik>
  )
}

export default LoginForm
