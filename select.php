<?php
include 'configBD';
$con = mysqli_connect($local, $usuario, $senha);
$dados = mysqli_select_db($con, $banco);
$selecionar = "select * from informacoes";
$sql = mysqli_query($conm $selecionar);
$cont = mysqli_num_rows($sql);
if($cont == 0){
    $vetor[] = "nao existem dados cadastrados!";
}
else{
    while ($informacao = mysqli_fetch_assoc($sql)){
        $nome = $informacao['nome'];
        $sobrenome = $informacao['sobrenome'];
        $idade = $informacao['idade'];
        $vetor[] = $nome . " " . $sobrenome . " " . $idade . " anos";
        }
}
$msg = $vetor;
$json = json_encode($msg);
echo $json;
mysqli_close($con);