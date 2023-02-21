<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$tDocumento = (isset($_POST['tdc'])) ? $_POST['tdc'] : '';
$nDocumento = (isset($_POST['ndc'])) ? $_POST['ndc'] : '';
$nombre = (isset($_POST['nme'])) ? $_POST['nme'] : '';
$Estado = (isset($_POST['est'])) ? $_POST['est'] : '';
$Creador = (isset($_POST['cre'])) ? $_POST['cre'] : '';

$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$user_id = (isset($_POST['user_id'])) ? $_POST['user_id'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO conductor (TIPODOC, NROIDE, NOMBRE, ESTADO, USUACREA) VALUES('$tDocumento', '$nDocumento', '$nombre', '$Estado', '$Creador') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM conductor ORDER BY ID DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE conductor SET TIPODOC='$tDocumento', NROIDE='$nDocumento', NOMBRE='$nombre', ESTADO='$Estado', USUACREA='$Creador' WHERE ID='$user_id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM conductor WHERE ID='$user_id' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM conductor WHERE ID='$user_id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;    
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;