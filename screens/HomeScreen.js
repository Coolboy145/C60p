import * as React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import db from "../config";

export default class HomeScreen extends React.Component{
    constructor(){
        super()
        this.state={
            all_students:[],
            presentsPressedList:[],
            abstentPressedList:[]
        }
    }
    componentDidMount=async()=>{
        var class_ref=await db.ref("/").on("value",(data)=>{
            var all_students=[]
            var class_a=data.val()["class"]

            for (var i in class_a){
                all_students.push(class_a[i])
            }
            all_students.sort(function(a,b){
                return a.roll_num-b.roll_num
            })
            this.setState({all_students:all_students})
            console.log(all_students)

        })

    }
    updateAttendance(roll_num,status){
        var id = ""
        if(roll_num<=9){
            id="0"+roll_num
        }
        else{
            id=roll_num
        }
        var today=new Date()
        var dd = today.getDate()
        var mm = today.getMonth()+1
        var yy = today.getFullYear()
        if(dd<10){
            dd="0"+dd
        }
        if(mm<10){
            mm="0"+mm
        }
        today=dd+"-"+mm+"-"+yy
        var ref_path="class/"+id
        var class_ref=db.ref(ref_path)
        class_ref.update({
            [today]:status
        })
    }

    goToSummary=()=>{
        this.props.navigation.navigate("SummaryScreen")
    }

    render(){
        var all_students = this.state.all_students
        if(all_students.length===0){
            return(
                <View style={{
                    flex:1,
                    justifyContent:"center",
                    alignItems:"center",

                }}>
                    <Text>No student found</Text>
                </View>
            )
        }
        else{
            return(
                <View style={styles.container}>
                    <View style={{flex:3}}>
                        {all_students.map((student,index)=>(
                            <View key={index}style={styles.studentChardContainer}>
                                <View
                                key={"name"+index}
                                style={{flex:1,flexDirection:"row"}}>
                                    <Text style={{fontSize:15,fontWeight:"bold",marginRight:10}}>
                                        {student.roll_num}
                                    </Text>
                                    <Text style={{fontSize:15,fontWeight:"bold"}}>
                                        {student.name}
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:"row"}}>
                                    <TouchableOpacity
                                    style={
                                        this.state.presentsPressedList.includes(index)
                                        ?[styles.presentButton,{backgroundColor:"green"}]
                                        :styles.presentButton
                                    }
                                    onPress={()=>{
                                        var presentsPressedList=this.state.presentsPressedList
                                        presentsPressedList.push(index)
                                        this.setState({
                                            presentsPressedList:presentsPressedList
                                        })
                                        var roll_num=index+1
                                        this.updateAttendance(roll_num,"present")
                                    }}>
                                        <Text>present</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                    style={
                                        this.state.absentPressedListPressedList.includes(index)
                                        ?[styles.absentButton,{backgroundColor:"red"}]
                                        :styles.absentButtonButton
                                    }
                                    onPress={()=>{
                                        var absentPressedList=this.state.absentPressedList
                                        absentPressedList.push(index)
                                        this.setState({
                                            presentsPressedList:absentPressedList
                                        })
                                        var roll_num=index+1
                                        this.updateAttendance(roll_num,"absent")
                                    }}>
                                        <Text>absent</Text>
                                    </TouchableOpacity>
                            </View>
                        </View>
                        ))}
                        <View style={{flex:1}}>
                            <TouchableOpacity
                            style={styles.footer}
                            onPress={()=>{this.props.navigation.navigate("SummaryScreen")}}>
                                <Text>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )
        }
    }
}

const styles=StyleSheet.create({
    container: { 
        flex: 1, },

    studentChartContainer: { 
        flexDirection: 'row', 
        padding: 10, 
        alignItems: 'center', 
        margin: 20, },

    presentButton: { width: 70, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 10, 
        borderWidth: 4, },

    absentButton: { width: 70, 
        height: 30, 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderWidth: 4, },

    footer: { left: 0, 
        right: 0, 
        bottom: 0, 
        height: 67, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: 'yellow', 
        marginTop: 10, },
        

})