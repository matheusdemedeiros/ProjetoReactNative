<?php
include 'configBD';
$con = mysqli_connect($local, $usuario, $senha);
$dados = mysqli_select_db($con, $banco);
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$nome = $obj['nome'];
$sobrenome = $obj['sobrenome'];
$idade = $obj['idade'];
$selecionar = "select * from informacoes where (nome='$nome')";
$sql = mysqli_query($con, $selecionar);
$informacao = mysqli_fetch_assoc($sql);
$nomeBanco = $informacao['nome'];
if($nomeBanco != null){
    $atualizar = "update informacoes set sobrenome='$sobrenome', idade='$idade' where (nome='$nome')";
    $sql = mysqli_query($con, $atualizar);
    $msg = 'Dados atualizados!';
    $json = json_encode($msg);
    echo $json;
    mysqli_close($con);
}
else{
    $msg = 'Usuario nao encontrado!';
    $json = json_encode($msg);
    echo $json;
    mysqli_close($con);
}