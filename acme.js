"use strict"
$(document).ready(function(){

 var categoriesObj = null;
 var typesObj = null;
 var productsObj = null;


function getExplosive(jsonFile){
  return new Promise((resolve, reject) => {
  $.ajax({
    url: `${jsonFile}.json`,
    // sets up Listener and Callback
    success: function (data){resolve(data)
      // console.log("cat", data);
    },
    fail:function(xhr, status, error) {
      reject(error);
      }
    })
  });
  }

$("#explosive").on("click", function() {
     getExplosive("categories").then(function(catgoriesJSON) {
       categoriesObj = catgoriesJSON.categories;
       console.log("cat", categoriesObj);
       return getExplosive("types")
     })
     .then(function(typesJSON){
       typesObj = typesJSON.types;
       console.log("types", typesObj);
       return getExplosive("products")
     })
     .then(function(productsJSON){
       productsObj = productsJSON.products;
       console.log("prod", productsObj);
       outputDOM();
     });  
  });

 function outputDOM(){
  $(categoriesObj).each(function(index, catElement){
    if ($("#explosive").val() === catElement.name){
      $("#catDOM").append(`${catElement.name}`);

      $(typesObj).each(function(index, typesElement){
        if (catElement.id === typesElement.category){
        $("#typesDOM").append(`${typesElement.name}`);

        $(productsObj).each(function(index, prodElement){
          if (typesElement.id === prodElement.type){
          $("#prodDOM").append(`${prodElement.name}`);  
          }
          });
      }
      });
    }
    });    
 }
    

});