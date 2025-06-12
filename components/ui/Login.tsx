import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  Asistencia: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const { height } = Dimensions.get("window");

export default function Login({ navigation }: Props) {
  return (
    <View style={styles.container}>
      {/* Parte superior */}
      <View style={styles.topSection}>
        <Image
          source={require("../../assets/logotipoUML.png")}
          style={styles.logo}
          accessibilityLabel="Logotipo UML"
        />
      </View>

      {/* Parte inferior */}
      <View style={styles.bottomSection}>
        <Text style={styles.title}>Bienvenido al sistema de asistencia UML</Text>

        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => alert("Iniciar sesión con Google")}
        >
          <Image
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
            }}
            style={styles.googleIcon}
          />
          <Text style={styles.googleButtonText}>Iniciar sesión con Google</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>¿No estás registrado?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Registro")}>
            <Text style={styles.linkText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topSection: {
    height: height * 0.5,
    backgroundColor: "#49A1DB",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { width: 140, height: 170, resizeMode: "contain" },
  bottomSection: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 30 },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  googleIcon: { width: 18, height: 18, marginRight: 10 },
  googleButtonText: { fontSize: 16, color: "#2C3E50" },
  footer: { flexDirection: "row", alignItems: "center" },
  footerText: { fontSize: 14, color: "#2C3E50", marginRight: 5 },
  linkText: { fontSize: 14, color: "#007AFF", textDecorationLine: "underline" },
});
