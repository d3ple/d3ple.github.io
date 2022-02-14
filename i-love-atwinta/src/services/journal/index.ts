import { post } from "~/utils/services/api-helpers"
import { baseEndpoint } from "~/utils/services/constants"
import { 
  IJournalResponse,
  IJournalPayload
} from "~/store/types/journal"

// Note: Сервис получение "талонов" из журнала
export const fetchJournalService = (payload: IJournalPayload) => {
  return post<typeof payload, IJournalResponse>(`${baseEndpoint}/v6/mo/account/patient/history`, payload)
}