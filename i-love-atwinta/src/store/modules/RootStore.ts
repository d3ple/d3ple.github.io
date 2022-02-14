// Stores
import System from "~/store/modules/SystemModule"
import Hospital from "~/store/modules/hospital/HospitalStore"
import Appointment from "~/store/modules/appointment/AppointmentStore"
import AppointmentSteps from "~/store/modules/appointment-steps/AppointmentStepsStore"
import Specialist from "~/store/modules/specialist/SpecialistStore"
import Region from "~/store/modules/common/RegionStore"
import Journal from "~/store/modules/journal/JournalStore"
import Patient from "~/store/modules/patient/PatientStore"
import Speciality from "~/store/modules/speciality/SpecialityStore"
import EgisError from "~/store/modules/egis/EgisErrorStore"
import Popup from "./helpers/PopupStore"

/**
 * NOTE: Информация по каждому из Store'ов
 * -> systemStore - Store с работы, связанной с сильными сайд-эффектами
 * -> egisErrorStore - Store для обработки ошибок со стороны EGIS
 * -> regionStore - Store для работы с регионами, городами
 * -> appointmentStepsStore - Store для работы с ШАГАМИ записи, сама запись происходит в appointmentStore
 * -> appointmentStore - Store для работы с самой записью к врачу, талоны, отказ от записи, запись.
 * -> patientStore - Store для работы с данными пациента
 * -> hospitalStore - Store для работы с больницами
 * -> specialityStore - Store для работы с специальностями
 * -> specialityStore - Store для работы с специалистами (докторами)
 * -> popupStore - Store для работы с глобальными popup окнами
 */

class RootStore {
  hospitalStore!: Hospital
  systemStore!: System
  appointmentStepsStore!: AppointmentSteps
  appointmentStore!: Appointment
  specialistStore!: Specialist
  regionStore!: Region
  journalStore!: Journal
  patientStore!: Patient
  specialityStore!: Speciality
  egisErrorStore!: EgisError
  popupStore!: Popup

  constructor() {
    this.systemStore = new System(this)
    this.egisErrorStore = new EgisError(this)
    this.regionStore = new Region(this)
    this.appointmentStepsStore = new AppointmentSteps(this)
    this.appointmentStore = new Appointment(this)
    
    this.patientStore = new Patient(this)
    this.journalStore = new Journal(this)
    
    this.hospitalStore = new Hospital(this)
    this.specialityStore = new Speciality(this)
    this.specialistStore = new Specialist(this)
    this.popupStore = new Popup(this)
  }

  /**
   * NOTE: Ресет к Init Значению для важных для процесса записи сущностей
   */
  resetAppointmentProcess() {
    this.patientStore = new Patient(this)
    this.hospitalStore = new Hospital(this)
    this.specialistStore = new Specialist(this)
    this.specialityStore = new Speciality(this)
    this.appointmentStore = new Appointment(this)
    this.appointmentStepsStore = new AppointmentSteps(this)
    this.journalStore = new Journal(this)
    
    this.egisErrorStore.resetNonBreakingErrorsToInitialState()
  }
}


export default RootStore