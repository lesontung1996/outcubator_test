# Technical Test - Readme

## 1. Local development guideline

### Prerequisites
 - Sass

### Clone repo to local

```
  git clone https://github.com/lesontung1996/outcubator_test.git
  cd outcubator_test
```

### Run SASS watch for scss file changes

```sass --watch scss/style.scss:css/style.css```

## 2. Deploy link

https://fasterpay-fe-test.netlify.app/

## 3. What I have completed

### Fuctionalities

1. Collapsible navigation on Mobile
2. Exchange widget was made using VueJS

### What can be customize in Exchange widget

In file `js/script.js`, find the `data` object of the main app.

```
  {
    exchangRates: Exchange rate of currency relative to USD.
    sendCurrency: Default send currency.
    receiveCurrency: Default receive currency.
    balance: Account balance.
    fee: Fee in USD.
    minimumAmount: Minimum amount to send in USD.
  }
```

### What can be improved

1. Dynamic progress bar instead of using svg
2. Custom select box for better customizability and better visual
