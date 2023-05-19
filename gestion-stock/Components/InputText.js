import React, { memo } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { theme } from '../core/theme';

class InputText extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        const {value, toto} = this.props
        var maValue = ''
        if(value){
            maValue = value
        }
        return(
            <View>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10 }}
                    value={maValue}
                    onChangeText={toto}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        fontSize: 26,
        color: theme.colors.primary,
        fontWeight: 'bold',
        paddingVertical: 14,
    },
});

export default (InputText);
