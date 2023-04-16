$(function(){
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();
    $('.carousel').carousel({
      interval: 1000
    });
})

  $('#contactModal').on('show.bs.modal', function (e){
    console.log('se esta mostrando')

    $('#contacto').removeClass('btn-success');
    $('#contacto').addClass('btn-outline-success');
    $('#contacto').prop('desabled', true);

  });

  $('#contactModal').on('shown.bs.modal	', function (e){
    console.log('se mostro')
  });

  $('#contactModal').on('hide.bs.modal', function (e){
    console.log('se esta ocultando')
  });
  $('#contactModal').on('hidden.bs.modal', function (e){
    console.log('se oculto')
    
    $('#contacto').removeClass('btn-outline-success');
    $('#contacto').addClass('btn-success');
    $('#contacto').prop('desabled', false);
  });