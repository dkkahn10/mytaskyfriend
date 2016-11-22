$(document).ready(function(){
    $('.collapsible').collapsible();
    $('.modal').modal();
    $(".button-collapse").sideNav();

    $('.dropdown-button').dropdown({
      inDuration: 370,
      constrain_width: false,
      hover: true,
      gutter: 20,
      belowOrigin: true,
      alignment: 'left'
    }
  );
});
