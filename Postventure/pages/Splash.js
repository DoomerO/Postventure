import {View, Box, Text, Image} from "native-base";
import { useEffect } from "react";

const Splash = ({ navigation }) => {
    
    const post = require('../img/Postventure.png')

    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Posts'); 
        }, 3000); 
    }, []);

    return (
        <View w="100%" h="100%" bg="#14181f">
            <Box w="100%" h="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Image source={post} size="xl" w="200" alt="Logo"></Image>
                <Text color="#fff" fontSize="25px" fontWeight="semibold" letterSpacing="0.5px">Postventure</Text>
            </Box>
        </View>
    )
}

export default Splash;