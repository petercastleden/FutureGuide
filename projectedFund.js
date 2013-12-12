var projectedFund = function (options) {
    this.currentSavings = options.currentSavings;
    this.currentFund = options.currentFund;
    this.currentAge = options.currentAge;
    this.retirementAge = options.retirementAge;
    this.investmentReturn = options.investmentReturn;
    this.term = this.retirementAge - this.currentAge;
    this.monthlyInvestmentReturn = Math.pow(1+this.investmentReturn,1/12)-1;
};

projectedFund.prototype.currentFutureFund = function(){
    var currentFutureFund = this.currentFund * Math.pow(1+this.monthlyInvestmentReturn,this.term*12)+this.currentSavings*(Math.pow(1+this.monthlyInvestmentReturn,this.term*12)-1)/(this.monthlyInvestmentReturn)*(1+this.monthlyInvestmentReturn);
    return currentFutureFund;
};


