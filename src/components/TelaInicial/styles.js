import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 50, 
        backgroundColor: '#F2F1F7',
    },
    imageContainer: {
        alignItems: 'center', 
        marginBottom: 20, 
    },
    image: {
        width: 270,
        height: 266,
    },
    textCuidador: {
        width: 320,
        height: 100,
        fontSize: 32,
        fontWeight: '700',
        lineHeight: 38.73,
        textAlign: 'center',
        color: "#000000",
        marginBottom: 20, 
    },
    greenButton: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        backgroundColor: "#2CCDB5",
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 15, 
    },
    purpleButton: {
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
        width: 300,
        backgroundColor: "#B47B9D",
        paddingTop: 14,
        paddingBottom: 14,
        marginBottom: 15, 
    },
    textButton: {
        fontSize: 20,
        color: "#ffffff",
    }
});

export default styles;
