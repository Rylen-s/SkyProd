import {StyleSheet} from 'react-native';
import React from 'react';


export const Styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 60,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      backButton: {
        padding: 50,
        paddingHorizontal: 15
      },
      input: {
        height: 40,
        paddingVertical: 10,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        color: 'black', 
        fontSize: 16,
        backgroundColor: '#f0f0f0',
      },
      timer_name: {
        fontSize:24
    },
    timer_screen:{
        display:"flex",
        flex:1,
    },
    timer_text:{

    },
    timer_container:{
        justifyContent:'center',
        alignContent:'center',
        flex:0.5
    },
    timer_text_container:{
        flex:0.5
    },
    timer_value_text:{
        fontSize:50,
        fontWeight:'bold',
        justifyContent:'center',
        alignSelf:'center',
        textAlign:'center'
    }


})

export default Styles;