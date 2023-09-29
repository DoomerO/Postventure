import {View, Box, Flex, Stack, Input, Text, InputGroup, InputRightAddon, ScrollView} from "native-base"
import Icon from "react-native-vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { TouchableHighlight } from "react-native-web";
import { TouchableOpacity } from "react-native";
import {socket} from "../assets/socket";

const Posts = () => {
    const [post, setPost] = useState({
        name : "",
        content : ""
    })
    const [posts, setPosts] = useState([]);
    let postsArray = [];
    
    if (socket.disconnect) {
        socket.connect();
    }

    socket.on("message", (res) => {
        console.log(res);
    })

    socket.on("showPosts", (res) => {
        setPosts(res);
    })

    useEffect(() => {
        socket.emit("reqPosts");
    }, [])

    posts.map(item => {
        postsArray.push(item)
    })

    function postTest() {
        socket.emit("makePost", post)
        
        //setPosts((prev) => ([...prev, {name : post.name , content : post.content}]))
        setPost((prev) => ({...prev, content : ""}));
    }

    const renderPosts = postsArray.map((item, index) => {
        return <Stack key={item.id} space={2} direction="column" w="90%" h="fit-content">
            <Text display={(index > 0) ? (item.name == postsArray[index - 1].name) ? "none" : "normal" : "normal"} fontWeight="semibold" fontSize="20px" color={(item.name == post.name) ? "#a2d3f5" : "#f5d3a2"} borderBottomColor="#fff">{item.name + " >"}</Text>
            <Text textAlign="justify" color="#fff" fontSize="17px">{item.content}</Text>
        </Stack>
    })

    return (
        <View w="100%" h="100%" bg="#14181f">
            <Box w="100%" h="100%" display="flex" flexDirection="column" alignItems="center">
                <Stack space={0.12} w="90%" pt="2vh" maxH="65%" minH="65%" overflowY="auto">
                    <ScrollView>
                        {renderPosts}
                    </ScrollView>
                </Stack>
                <Stack space={4} h="30%" w="100%" alignItems="center" pt="20px">
                    <Flex direction="column">
                        <Text color="#fff" fontWeight="semibold" fontSize="22px">Postar como:</Text>
                        <Input type="text" placeholder="Nome" color="#fff" fontSize="18px" value={post.name} name="name" onChangeText={(text) => {setPost(prev => ({...prev, name: text}))}} w="95%"/>
                    </Flex>
                    <Flex direction="column">
                        <Text color="#fff" fontWeight="semibold" fontSize="22px">Mensagem:</Text>
                        <InputGroup>
                            <Input type="text" placeholder="Escreva aqui" fontSize="18px" value={post.content} onChangeText={(text) => {setPost(prev => ({...prev, content: text}))}} name="content" color="#fff" w="80"/>
                            <TouchableOpacity onPress={postTest}>
                                <InputRightAddon w="20" h="12"><Icon name="send" size="20"/></InputRightAddon>
                            </TouchableOpacity>
                        </InputGroup>
                    </Flex>
                </Stack>
            </Box>
        </View>
    )
}

export default Posts;