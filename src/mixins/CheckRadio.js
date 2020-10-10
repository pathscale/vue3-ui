const CheckRadioMixin = {
  props: {
    modelValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      required: true,
    },
    nativeValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: null,
    },
    type: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: null,
    },
    required: {
      type: Boolean,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: null,
    },
  }
}

export default CheckRadioMixin
