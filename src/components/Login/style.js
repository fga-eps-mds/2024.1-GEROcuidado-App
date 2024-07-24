import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F2F1F7', 
    },
    imageContainer: {
        alignItems: 'center', 
        marginBottom: 10, 
        marginTop: -30, 
    },
    image: {
        width: 278, 
        height: 96, 
        resizeMode: 'contain', 
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10, 
        textAlign: 'center',
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F1F7',
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#F2F1F7',
        paddingHorizontal: 10,
        color: '#000000',
    },
    button: {
        backgroundColor: '#2CCDB5',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
