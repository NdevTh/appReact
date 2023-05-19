import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

class Header extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View>
                <Text style={styles.header}>{this.props.title ? this.props.title : "Page sans titre"}</Text>
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

export default (Header);
