class index{
  constructor(){

  }

  static byId(id,dealer){
    let length = dealer.length
    let result = []
    for(let i = 0;i<length;i++){
      if(dealer[i].id == id) {
        result.push(dealer[i])
      }
    }
    return result
  }




}
module.exports = index