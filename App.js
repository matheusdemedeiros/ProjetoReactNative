import React from 'react';
import {Alert, StyleSheet, TextInput, View, Button, Text, FlatList, ScrollView} from 'react-native;

var ip = '192.168.1.4';

class Banco extends React.Component{
    constructor(props){
        this.state = {
            nome: '',
            sobrenome: '',
            idade: '',
            vetor:[]
        }
    }

    //INSERCAO DOS DADOS
    insercao = () =>{
        var nome = this.state.nome;
        var sobrenome = this.state.sobrenome;
        var idade = this.state.idade;
        if(this.state.nome != "" && this.state.sobrenome != "" && this.state.idade != ""){
            fetch('http://'+ip+'/programas/2019_II_POO/app/insert.php',{
                method: 'POST',
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    idade: idade
                })
            })
            .then(response => {
                return response.json()
            })
            .then(json => {
                Alert.alert(json);
                this.setState({nome:''});
                this.setState({sobrenome:''});
                this.setState({idade:''});
            })
        }else{
            Alert.alert('Preencha os dados!');
        }
    }

    //SELECAO DOS DADOS
    selecao = () => {
        fetch('http://'+ip+'/programas/2019_II_POO/app/select.php')
        .then(response => {
            return response.json()
        })
        .then(json => {
            //let vetor = JSON.stringfy(json);
            //Alert.alert(vetor);
            //alert(json);
            this.setState({vetor:json})
        })
    }

    //ATUALIZACAO DOS DADOS
    atualizacao = () => {
        var nome = this.state.nome;
        var sobrenome = this.state.sobrenome;
        var idade = this.state.idade;
        if(this.state.nome != "" && this.state.sobrenome != "" && this.state.idade != ""){
            fetch('http://'+ip+'/programas/2019_II_POO/app/select.php', {
                method: 'POST',
                body: JSON.stringify({
                    nome: nome,
                    sobrenome: sobrenome,
                    idade: idade
                })
            }).then(response =>{
                return response.json()
            })
            .then(json => {
                Alert.alert(json);
                this.setState({nome:''});
                this.setState({sobrenome:''});
                this.setState({idade:''});
            })
            }
            else{
                Alert.alert('Preencha os dados!');
            }
        }

        //REMOCAO DOS DADOS
        remocao = () => {
            var nome = this.state.nome;
            if(this.state.nome != ""){
                fetch('http://'+ip+'/programas/2019_II_POO/app/delete.php', {
                    method: 'POST',
                    body: JSON.stringify({
                        nome: nome
                    })
                }).then(response => {
                    return response.json()
                })
                .then(json => {
                    Alert.alert(json);
                    this.setState({nome:''});
                })
            }
        }

    render(){
        return(
            <View style={StyleSheet.container}>
                <TextInput
                    style = {StyleSheet.entrada}
                    placeholder='Nome'
                    onChangeText={nome => this.setState({nome})}
                    value = {this.state.nome}
                />
                <TextInput
                    style = {StyleSheet.entrada}
                    placeholder='Sobrenome'
                    onChangeText={sobrenome => this.setState({sobrenome})}
                    value = {this.state.sobrenome}
                />
                <TextInput
                    style = {StyleSheet.entrada}
                    placeholder='Idade'
                    onChangeText={idade => this.setState({idade})}
                    value = {this.state.idade}
                />
                <View style = {StyleSheet.botao}>
                    <Button
                        title = 'Inserir'
                        onPress = {this.insercao}
                        color = '#2196F3'
                    />
                </View>
                <View style = {StyleSheet.botao}>
                    <Button
                        title = 'Selecionar'
                        onPress = {this.selecao}
                        color = '#2196F3'
                    />
                </View>
                <View style = {StyleSheet.botao}>
                <Button
                    title = 'Atualizar'
                    onPress = {this.atualizacao}
                    color = '#2196F3'
                />
                </View>
                <View style = {StyleSheet.botao}>
                <Button
                    title = 'Remover'
                    onPress = {this.remocao}
                    color = '#2196F3'
                />
                </View>
                <ScrollView>
                <View style = {StyleSheet.botao}>
                <FlatList
                    data={this.state.vetor}
                    renderItem={ ({ item }) => <Text>{item}</Text>}
                    keyExtractor={item => item}
                    />
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Banco;

const styles = StyleSheet.create({
    container: {
        marginTop: 150,
        flex: 1,
        margin: 10
    },
    entrada: {
        textAlign: 'center',
        marginBottom: 7,
        height: 40,
        borderWidth: 1,
        borderColor: 'grey'
    },
    botao: {
        marginBottom: 7
    }
});