const isFloatNumber = (string) => {
  return /^[+-]?([0-9]*[.])?[0-9]+$/.test(string)
}

Vue.component('currency-input', {
  props: [
    'label',
    'value',
    'errorMessageProp'
  ],
  methods: {
    handleInput (event) {
      this.$emit('input', event.target.value)
    }
  },
  computed: {
    isActive () {
      return !!this.value
    },
    isInvalid () {
      return (this.value && !isFloatNumber(this.value)) || this.errorMessage
    },
    errorMessage () {
      return this.value && !isFloatNumber(this.value) ? 'Please Enter a valid number' : this.errorMessageProp
    }
  },
  template: `
    <div class="currency-input" :class="{'currency-input--active': isActive, 'currency-input--error': isInvalid}">
      <input type="text" inputmode="numeric" class="currency-input__input" :value="value" @input="handleInput" >
      <label class="currency-input__label">{{ label }}</label>
      <span class="currency-input__error" v-show="isInvalid">{{ errorMessage }}</span>
    </div>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    navigationOpen: false,
    exchangRates: {
      USD: 1,
      EUR: 0.815894,
      CAD: 1.204355,
      GBP: 0.70602,
      MXN: 19.88162,
      PLN: 3.66121
    },
    sendCurrency: 'USD',
    receiveCurrency: 'EUR',
    balance: {
      USD: 564.34,
      EUR: 120,
      CAD: 1450,
      GBP: 0,
      MXN: 9492,
      PLN: 0
    },
    fee: 3.67,
    minimumAmount: 10,
    amountSend: null,
    amountReceive: null
  },
  methods: {
    toggleNavigation () {
      this.navigationOpen = !this.navigationOpen
    },
    getFlagSrc (currencyName) {
      return `images/flags/${currencyName}.svg`
    },
    handleSendAmountChange (value) {
      if (!value || this.errorMessage || !isFloatNumber(value)) {
        this.amountReceive = null
        return
      }
      const amountSendInUsd = parseFloat(value) / this.exchangRates[this.sendCurrency]
      const amountReceiveInUsd = amountSendInUsd - this.fee
      const amountReceiveInCurrentCurrency = amountReceiveInUsd * this.exchangRates[this.receiveCurrency]
      this.amountReceive = amountReceiveInCurrentCurrency.toFixed(2)
    },
    handleReceiveAmountChange (value) {
      if (!value || !isFloatNumber(value)) {
        this.amountSend = null
        return
      }
      const amountReceiveInUsd = parseFloat(value) / this.exchangRates[this.receiveCurrency]
      const amountSendInUsd = amountReceiveInUsd + this.fee
      const amountSendInCurrentCurrency = amountSendInUsd * this.exchangRates[this.sendCurrency]
      this.amountSend = amountSendInCurrentCurrency.toFixed(2)
    }
  },
  computed: {
    currencyList () {
      return Object.keys(this.exchangRates)
    },
    currentBalance () {
      return this.balance[this.sendCurrency]
    },
    currentExchangeRate () {
      const rate = this.exchangRates[this.receiveCurrency] / this.exchangRates[this.sendCurrency]
      return rate % 1 === 0 ? parseInt(rate) : parseFloat(rate).toFixed(7)
    },
    currentSendImageSrc () {
      return this.getFlagSrc(this.sendCurrency.toLowerCase())
    },
    currentReceiveImageSrc () {
      return this.getFlagSrc(this.receiveCurrency.toLowerCase())
    },
    errorMessage () {
      const amountSend = parseFloat(this.amountSend)
      const minimumAmountInCurrentCurrency = parseFloat(this.minimumAmount * this.exchangRates[this.sendCurrency]).toFixed(2)
      switch (true) {
        case (!amountSend):
          return ''
        case (amountSend > this.currentBalance):
          return 'The send amount is exceeding your balance'
        case (amountSend < minimumAmountInCurrentCurrency):
          return `The minimum send amount is ${minimumAmountInCurrentCurrency} ${this.sendCurrency}`
        default:
          return ''
      }
    }
  },
  watch: {
    sendCurrency () {
      this.amountSend = null
      this.amountReceive = null
    },
    receiveCurrency () {
      this.amountSend = null
      this.amountReceive = null
    }
  }
})
