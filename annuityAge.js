var annuityAge = function (options) {
    this.isJointLife = options.isJointLife && true;
    this.currentAge = options.currentAge; 
    this.dependantAge = options.dependantAge;
    this.retirementAge = options.retirementAge;
    this.term = this.retirementAge - this.currentAge;
};

annuityAge.prototype.tempAnnuityAge = function () {
  var tempAnnuityAge = retirementAge;
  if(this.isJointLife&&true){
    tempAnnuityAge =  Math.max(Math.min(this.currentAge, this.dependantAge), (this.currentAge - 10)) + this.term;
    }
  else{
    tempAnnuityAge =  this.currentAge + this.term;
  }
  return tempAnnuityAge;
};
