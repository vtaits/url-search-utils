import {parseHashParams, setHashParams} from 'url-search-utils'
import moment from 'moment'

const strInput = document.querySelector('[name="str"]')
const checkboxes = Array.prototype.slice.call(
  document.querySelectorAll('[name="arr"]')
)
const dateInput = document.querySelector('[name="date"]')

const applyButton = document.getElementById('apply')

const currentParams = parseHashParams({
  arr: 'array-of-strings',
  date: (value) => moment(value, 'DD.MM.YYYY').format('YYYY-MM-DD'),
})

if (currentParams.str) {
  strInput.value = currentParams.str
}

if (currentParams.arr) {
  checkboxes.forEach((checkbox) => {
    if (currentParams.arr.includes(checkbox.value)) {
      checkbox.checked = true
    }
  })
}

if (currentParams.date) {
  dateInput.value = currentParams.date
}

applyButton.onclick = () => {
  const values = {
    str: strInput.value,
    arr: checkboxes
      .filter(({ checked }) => checked)
      .map(({ value }) => value),
    date: dateInput.value,
  }

  setHashParams(values, {}, {
    date: (date) => date ?
      moment(date, 'YYYY-MM-DD').format('DD.MM.YYYY') :
      null,
  })
}
