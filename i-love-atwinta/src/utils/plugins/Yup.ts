import * as Yup from 'yup';

import { VALIDATION_REQUIRED_MESSAGE } from '~/utils/services/constants';

Yup.setLocale({
  mixed: {
    required: VALIDATION_REQUIRED_MESSAGE,
  },
});

export default Yup