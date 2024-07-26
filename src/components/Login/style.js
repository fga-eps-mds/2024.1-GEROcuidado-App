import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F2F1F7',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -30,
    },
    image: {
        width: 278,
        height: 96,
        resizeMode: 'contain',
    },
    welcomeText: {
        fontSize: 24,
        marginBottom: 50,
        textAlign: 'center',
        color: '#000000',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F1F7',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        marginBottom: 15,
        marginTop: 0,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        backgroundColor: '#F2F1F7',
        paddingHorizontal: 10,
        color: '#333333',
    },
    button: {
        backgroundColor: '#2CCDB5',
        borderRadius: 8,
        paddingVertical: 15,
        alignItems: 'center',
        width: '57%',
        bottom: -55,
        left: '0%',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 5,
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default styles;
