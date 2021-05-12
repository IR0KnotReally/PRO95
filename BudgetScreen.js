import React, {Component} from 'react'
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import MyHeader from '../components/MyHeader'
import { RFValue } from "react-native-responsive-fontsize";
import {Input} from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'

export default class BudgetScreen extends Component {
    constructor() {
        super()
        this.state = {
            userId :  firebase.auth().currentUser.email,
            groceries : 0,
            rent : 0,
            bills : 0,
            entertainment : 0,
            kids : 0,
            fuel : 0,
            other: 0,
            setBudget : "",
            userDocId : '',

            groceriesBudget : 0,
            rentBudget : 0,
            billsBudget : 0,
            entertainmentBudget : 0,
            kidsBudget : 0,
            fuelBudget : 0,
            otherBudget : 0,
        }
    }
    addBudget = () =>{
        var grocery = parseInt(this.state.groceries)
        var rent = parseInt(this.state.rent)
        var bills = parseInt(this.state.bills)
        var entertainment = parseInt(this.state.entertainment)
        var kids = parseInt(this.state.kids)
        var fuel = parseInt(this.state.fuel)
        var other = parseInt(this.state.other)
        db.collection("budget").add({
            "user_id" : this.state.userId,
            "groceries" : grocery,
            "rent" : rent,
            "bills" : bills,
            "entertainment" : entertainment,
            "kids" : kids,
            "fuel" : fuel,
            "other" : other,
        })
        db.collection("users").where("email_id", "==", this.state.userId).get()
        .then()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                db.collection("users").doc(doc.id).update({
                    setBudget: true,
                });
            });
        });
    }
    getSetBudget() {
        db.collection("users").where("email_id", "==", this.state.userId)
        .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              this.setState({
                setBudget: doc.data().setBudget,
                userDocId: doc.id,
              });
            });
        });
    }
    getBudgetForDisplay = () => {
        db.collection("budget").where("user_id", '==', this.state.userId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                this.setState({
                    groceriesBudget : doc.data().groceries,
                    rentBudget : doc.data().rent,
                    billsBudget : doc.data().bills,
                    entertainmentBudget : doc.data().entertainment,
                    kidsBudget : doc.data().kids,
                    fuelBudget : doc.data().fuel,
                    otherBudget : doc.data().other,
                })
            })
        })
    }
    componentDidMount() {
        this.getBudgetForDisplay();
    }
    render() {
        if(this.state.setBudget === true) {
            return(
                <View style = {{flex : 1}}>
                    <MyHeader 
                        navigation = {this.props.navigation}
                        title = "Your Budgets"
                    />
                    <View style={styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Groceries : {this.state.groceriesBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Rent : {this.state.rentBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Bills : {this.state.billsBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Entertainment : {this.state.entertainmentBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Kids : {this.state.kidsBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Fuel : {this.state.fuelBudget}
                        </Text>
                    </View>
                    <View style = {styles.box}>
                        <Text style={styles.spendingCatogeriesText}>
                            Others : {this.state.otherBudget}
                        </Text>
                    </View> 
                    <View style = {{justifyContent : 'center',alignItems : 'center'}}>
                        <TouchableOpacity 
                            style={styles.button}
                            onPress = {()=>{
                                this.props.navigation.navigate("BudgetEdit")
                            }}>
                            <Text>Edit</Text>    
                        </TouchableOpacity> 
                    </View>
                       
                </View>
            )
        }
        else {
            return(
                <View style = {{flex : 1}}>
                    <MyHeader 
                        navigation = {this.props.navigation}
                        title = "Your Budget"
                    />
                    <View style = {{justifyContent: 'center', alignItems : 'center'}}>
                        <Text style = {{fontSize : RFValue(25), marginBottom: RFValue(20)}}>Set your spending categories here!</Text>
                    </View>
                    
                    <ScrollView style={styles.scrollView}>
                        <KeyboardAvoidingView>
                        <View>
                            <Text style = {{fontSize : RFValue(20)}}>Groceries</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"Vegetables, fruits, milk, etc"}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        groceries : text
                                    })
                                }}
                                value = {this.state.groceries}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Rent</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"Home Rent, EMI's"} 
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        rent : text
                                    })
                                }}
                                value = {this.state.rent}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Bills</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"Electricity, Internet, DTH"}
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        bills : text
                                    })
                                }}
                                value = {this.state.bills}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Entertainment</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"Shopping, Movies, Tours"} 
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        entertainment : text
                                    })
                                }}
                                value = {this.state.entertainment}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Kids</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"Fees, clothes, toys"} 
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        kids : text
                                    })
                                }}
                                value = {this.state.kids}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Fuel</Text>
                            <Input
                                style = {styles.formTextInput}
                                placeholder = {"2 or 4 wheeler, Public Transport"} 
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        fuel : text
                                    })
                                }}
                                value = {this.state.fuel}
                            />
                            <Text style = {{fontSize : RFValue(20)}}>Others</Text>
                            <Input
                                style = {{width: "75%", height: RFValue(35), padding: 10,}}
                                placeholder = {"..."} 
                                keyboardType = {'numeric'}
                                onChangeText = {(text)=>{
                                    this.setState({
                                        other : text
                                    })
                                }}
                                value = {this.state.other}
                            />
                            <View style = {{alignItems : 'center'}}>
                                <TouchableOpacity style = {styles.button} onPress = {()=>{this.addBudget()}} >
                                    <Text style = {styles.buttonText}>Set Budgets</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            ) 
        }
        
    }
}
const styles = StyleSheet.create({
    formTextInput: {
        width: "75%",
        height: RFValue(35),
        padding: 10,
    },
    scrollView: {
        marginHorizontal: 20,
    },
    spendingCatogeriesText : {
        fontWeight: "400",
        fontSize: RFValue(20),
    },
    box : {
        flex : 0.1, 
        justifyContent:'center',
        alignItems:'center',
        marginTop:RFValue(10),
        padding: RFValue(10),
        borderWidth:1,
        borderColor:'#deeedd', 
        marginLeft : RFValue(10),
        marginRight : RFValue(10),
        width : RFValue(410)
    },
    button: {
        width: "80%",
        height: RFValue(50),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(25),
        backgroundColor: "#ffff",
        shadowColor: "#000",
        marginBottom: RFValue(10),
        shadowOffset: {
          width: 0,
          height: 8
        },
        shadowOpacity: 0.3,
        shadowRadius: 10.32,
        elevation: 16
    },
    buttonText: {
        color: "#32867d",
        fontWeight: "200",
        fontSize: RFValue(20)
    },
})