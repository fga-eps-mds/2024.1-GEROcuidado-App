import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    photoButton: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#DDDDDD',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F1F7',
        borderBottomWidth: 1,
        borderBottomColor: '#333333',
        marginBottom: 15,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    button: {
        backgroundColor: '#2CCDB5',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
        width: '50%',
        bottom: -55,
        left: '25%',
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: -10,
    },
    feedbackText: {
        fontSize: 14,
        marginTop: -10,
    },
    mediumPassword: {
        color: '#DAA520', 
    },
    passwordStrength: {
        color: '#004d00', 
    },
});

export default styles;
