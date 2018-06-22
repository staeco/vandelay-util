import * as validator from 'validator'
import isPhone from 'is-phone'

export default {
  ...validator,
  isPhone
}
