// let countrys=require('./countrys').getCountrys();
let getArea_chs=require('./location_chs').getArea_chs;
let getArea_en=require('./location_en').getArea_en;
const regular=/^[0-9A-Z]{1,}$/;
const regular_num=/\d+/g;
let areas=[];
let countrys=[];

function getAll(){//获取当前语言，以及所有区域和国家。
  countrys=require('./countrys').getCountrys();
  let Areas={}
  areas=[];
  if (sessionStorage.getItem('language') === 'cn') {
    Areas = getArea_chs()
  } else {
    Areas = getArea_en()
  }
  for (let i in Areas) {
    areas.push({ value: Areas[i], key: i })
  }
}


export function translateCharacters (parameter){
  return new Promise(async function(resolve,reject){
    getAll();
    if(parameter instanceof Array){
      let projects=parameter;
      for(let index in projects){
        let project=projects[index];
        let obj=await translate(project.country,project.province,project.city)
        project.country=obj.country;
        project.province=obj.province;
        project.city=obj.city;
      }
      resolve();
    }else if(parameter instanceof Object){
      let project=parameter;
      let obj=await translate(project.country,project.province,project.city)
      project.country=obj.country;
      project.province=obj.province;
      project.city=obj.city;
      resolve(project);
    }
    else{
      resolve(parameter);
    }
    
  })
}


function isLetterOrNum(str){
  if(str.match(regular)){
    return true;
  }
  return false;
}

function isNum(str){
  if(str.match(regular_num)){
    return true;
  }
  return false;
}


function translate(country,province,city){
  return new Promise(function(resolve,reject){
    if(isLetterOrNum(city)&&isLetterOrNum(province)&&isNum(country)){
      let provinces=areas[country].value
      let obj={
        city:provinces[province][city].n,
        province:provinces[province].n,
        country:countrys[country]
      }
      resolve(obj);
    }
    else{
      resolve({country,province,city})
    }
  })
  
}
