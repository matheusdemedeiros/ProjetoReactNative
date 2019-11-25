<?php
include 'configBD';
$con = mysqli_connect($local, $usuario, $senha);
$dados = mysqli_select_db($con, $banco);
$json = file_get_contents('php://input');
$obj = json_decode($json, true);
$nome = $obj['nome'];
$sobrenome = $obj['sobrenome'];
$idade = $obj['idade'];
$inserir = "insert into informacoes (nome, sobrenome, idade) values ('$nome', '$sobrenome', '$idade')";
$sql = mysqli_query($con, $inserir);
$msg = 'Dados inseridos com sucesso!';
$json = json_encode($msg);
echo $json;
mysqli_close($con);