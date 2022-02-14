import React, { useMemo } from 'react'
import { DateTime } from 'luxon'

import { Typography } from '@mui/material'

// Components
import Button from '~/components/_uikit/Button'
// Styles
import s from '~/components/cards/journal/JournalAppointmentCard.module.scss'
// hooks
import useIsMobile from '~/hooks/useIsMobile'
import { IJournalTicketData } from '~/store/types/journal'
import { capitalize, formatDate } from '~/utils/helpers'

interface Props {
  downloadable?: {
    onDownload: (id: number) => void,
    onCancel: (id: number) => void,
  },
  journalAppointment: IJournalTicketData
}

const JournalAppointmentCard: React.FC<Props> = ({
  downloadable,
  journalAppointment
}) => {
  const { isMobileView } = useIsMobile()

  const defaultStyleForDate = {
    lineHeight: '10px',
    color: '#2D3748',
    fontWeight: isMobileView ? 500 : 400
  }

  // Common Data For Appointment
  const doctorName = journalAppointment.doctorName
  const hospitalName = journalAppointment.hospitalName
  const specialityName = capitalize(journalAppointment.specialtyName)
  const appointmentAddress = journalAppointment.address

  // Data Gathering Data
  const date = new Date(journalAppointment.dt)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  // Date Formatting
  const preFormattedDate = DateTime.utc(year, month, day).toISO().substring(0, 10)
  const formattedDate = useMemo(() => formatDate(preFormattedDate, 'DDD'), [preFormattedDate])
  const formattedDateWeek = useMemo(() => formatDate(preFormattedDate, 'cccc'), [preFormattedDate])
  const formattedDateClock = useMemo(() => formatDate(journalAppointment.value, 'T'), [journalAppointment])

  return (
    <div className={s.card}>
      <div className={s.cardAppointmentTime}>
        <Typography variant='subtitle3'>{ formattedDateClock }</Typography>
        <div className={s.cardAppointmentTimeAdditionalInformation}>
          <div className={s.cardAppointmentTimeDate}>
            <Typography variant='body4' sx={defaultStyleForDate}>{ formattedDate }</Typography>
          </div>
          <div>
            <Typography variant='body4' sx={defaultStyleForDate}>{ formattedDateWeek }</Typography>
          </div>
        </div>
      </div>
      <div className={s.cardAppointmentInformation}>
        <div className={s.cardAppointmentInformationContainer}>
          <div className={s.cardAppointmentInformationPiece}>
            <Typography variant='bodyBig' sx={{ fontWeight: 500 }}>{ specialityName }</Typography>
            <div>
              <Typography variant='body4'>{ doctorName }</Typography>
            </div>
          </div>
          <div className={s.cardAppointmentInformationPiece}>
            <div>
              <Typography variant='bodyBig' sx={{ fontWeight: 500 }}>
                { hospitalName }
              </Typography>
            </div>
            <div>
              <Typography variant='body4'>{ appointmentAddress }</Typography>
            </div>
          </div>
        </div>
        {
          downloadable && (
            <div className={`${s.cardAppointmentInformationDownloadOptions} ${s.cardAppointmentInformationContainer}`}>
              <div>
                <Button 
                  buttonType='outlined'
                  onClick={() => downloadable.onDownload(1)}
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                  rounded
                >Скачать талон</Button>
              </div>
              <div>
                <Button 
                  buttonType='outlined'
                  onClick={() => downloadable.onCancel(journalAppointment.id)}
                  sx={{
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                  rounded
                >Отменить</Button>
              </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default JournalAppointmentCard
