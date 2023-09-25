import {View, Box, Text, Image} from "native-base";
import PostVentureLogo from "../img/Postventure.png";
import { useEffect } from "react";

const Splash = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Posts'); 
        }, 1000); 
    }, []);

    return (
        <View w="100%" h="100%" bg="#14181f">
            <Box w="100%" h="100%" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <Image src={PostVentureLogo} size="xl"></Image>
                <Text color="#fff" fontSize="25px" fontWeight="semibold" letterSpacing="0.5px">Postventure</Text>
            </Box>
        </View>
    )
}

export default Splash;