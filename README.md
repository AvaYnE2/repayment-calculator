# Loan Repayment Calculator 

This project provides a loan repayment calculator, enabling users to understand the progression of their loan by
calculating various parameters such as loan amount, interest rate, initial repayment percentage, and optionally
the fixed interest period.

## Features

- **Loan Parameter Input**: Users can enter the loan amount, interest rate, and initial repayment.
- **Optional Fixed Interest Period**: Users can select a fixed interest period between 1 and 30 years.
- **Calculation Results**: Clicking the "Berechnen" button displays the monthly payment and optionally the remaining debt at the end of the fixed interest period.
- **Repayment Plan**: A repayment plan showing an annual breakdown of year, rate, interest portion, repayment portion, and remaining debt is displayed.
- **Automatic Updates**: The calculation is automatically updated when input parameters change. 
  
## Technologies

- **Frontend**: [ReactJS](https://react.dev) with [Material-UI](https://mui.com/) for the user interface. [Zustand](https://zustand-demo.pmnd.rs/) is used for state management.
- **Backend**: [NextJS](https://nextjs.org/) app router.
- **tRPC**: [tRPC](https://trpc.io/)  is used to fetch the repayment plan from the backend.
- **create-t3-app**: The project was created using [Create T3GG](https://create.t3.gg/), a CLI for generating full-stack TypeScript applications.


## Getting Started

#### 1. Clone the Repository:

```
git clone https://github.com/AvaYnE2/repayment-calculator
```

#### 2. Install Dependencies:

```
cd repayment-calculator
npm install
```

#### 3. Run the Application:

```
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).