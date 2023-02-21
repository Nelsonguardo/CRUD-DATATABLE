$(document).ready(function() {
var user_id, opcion;
    
tablaUsuarios = $('#tablaUsuarios').DataTable({                          
        "bProcessing": true,
        "bDeferRender": true,	
        "bServerSide": true,                
        "sAjaxSource": "serverside/serversideUsuarios.php",	
        "columnDefs": [ {
            "targets": -1,        
            "defaultContent": "<div class='wrapper text-center'><div class='btn-group'><button class='btn btn-info btn-sm btnEditar' data-toggle='tooltip' title='Editar'><i class='material-icons'>edit</i></button><button class='btn btn-danger btn-sm btnBorrar' data-toggle='tooltip' title='Eliminar'><span class='material-icons'>delete</span></button></div></div>"
        } ],	    
});     

var fila; //captura la fila, para editar o eliminar
//submit para el Creacion y Actualización
$('#formUsuarios').submit(function(e){                         
    e.preventDefault(); //evita el comportambiento normal del submit, es decir, recarga total de la página
    tdc = $.trim($('#tdc').val());    
    ndc = $.trim($('#ndc').val());
    nme = $.trim($('#nme').val());    
    est = $.trim($('#est').val());    
    cre = $.trim($('#cre').val());                        
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {user_id:user_id, tdc:tdc, ndc:ndc, nme:nme, est:est, cre:cre,opcion:opcion},    
          success: function(data) {
            tablaUsuarios.ajax.reload(null, false);
           }
        });			        
    $('#modalCRUD').modal('hide');											     			
});
        
//para limpiar los campos antes de crear una Persona
$("#btnNuevo").click(function(){
    opcion = 1;           
    user_id=null;
    $("#formUsuarios").trigger("reset");
    $(".modal-header").css( "background-color", "#17a2b8");
    $(".modal-header").css( "color", "white" );
    $(".modal-title").text("Crear de Usuario");
    $('#modalCRUD').modal('show');	    
});

//Editar        
$(document).on("click", ".btnEditar", function(){		        
    opcion = 2;//editar
    fila = $(this).closest("tr");	        
    user_id = parseInt(fila.find('td:eq(0)').text()); //capturo el ID		            
    tdc = fila.find('td:eq(1)').text();
    ndc = fila.find('td:eq(2)').text();
    nme = fila.find('td:eq(3)').text();
    est = fila.find('td:eq(4)').text();
    cre = fila.find('td:eq(5)').text();
    $("#tdc").val(tdc);
    $("#ndc").val(ndc);
    $("#nme").val(nme);
    $("#est").val(est);
    $("#cre").val(cre);
    $(".modal-header").css("background-color", "#007bff");
    $(".modal-header").css("color", "white" );
    $(".modal-title").text("Editar Usuario");		
    $('#modalCRUD').modal('show');		   
});

//Borrar
$(document).on("click", ".btnBorrar", function(){
    fila = $(this);           
    user_id = parseInt($(this).closest('tr').find('td:eq(0)').text()) ;		
    opcion = 3; //eliminar        
    var respuesta = confirm("¿Está seguro de borrar el registro "+user_id+"?");                
    if (respuesta) {            
        $.ajax({
          url: "bd/crud.php",
          type: "POST",
          datatype:"json",    
          data:  {opcion:opcion, user_id:user_id},    
          success: function() {
              tablaUsuarios.row(fila.parents('tr')).remove().draw();                  
           }
        });	
    }
 });
     
});    