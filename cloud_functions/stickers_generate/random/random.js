class random{
  constructor(){

  }
  static bit(n){
    var t=''; 
    for(var i=0;i<n;i++){ 
        t+=Math.floor(Math.random()*10); 
    } 
    return t; 
  }


}
module.exports = random