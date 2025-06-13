import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import type { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
};

type RegistroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Registro"
>;

export default function Registro({
  navigation,
}: {
  navigation: RegistroScreenNavigationProp;
}) {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [carne, setCarne] = useState("");
  const [perfil, setPerfil] = useState("Estudiante");

  const handleRegistro = () => {
    if (!correo.endsWith("@uml.edu.ni")) {
      Alert.alert("Correo inválido", "El correo debe terminar en @uml.edu.ni");
      return;
    }
    Alert.alert(
      "Registro exitoso",
      `Datos enviados correctamente\nPerfil: ${perfil}`
    );
  };

  return (
    <View style={styles.container}>
      {/* Flecha de regreso */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.backArrow}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registro</Text>

      {/* Campo: Nombre completo */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
      </View>

      {/* Campo: Selección de perfil */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Perfil</Text>
        <View style={styles.input}>
          <Picker
            selectedValue={perfil}
            onValueChange={(itemValue) => setPerfil(itemValue)}
          >
            <Picker.Item label="Estudiante" value="Estudiante" />
            <Picker.Item label="Docente" value="Docente" />
          </Picker>
        </View>
      </View>

      {/* Campo: Correo institucional */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Correo institucional</Text>
        <TextInput
          style={styles.input}
          placeholder="@uml.edu.ni"
          value={correo}
          onChangeText={setCorreo}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Campo: Número de carné */}
      <View style={styles.fieldGroup}>
        <Text style={styles.label}>Número de carné</Text>
        <TextInput
          style={styles.input}
          value={carne}
          onChangeText={setCarne}
        />
      </View>

      {/* Botón de registro */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistro}>
        <Text style={styles.registerText}>Registrarme</Text>
      </TouchableOpacity>

      {/* Pie con enlace */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Ya estás registrado?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  backButton: {
    position: "absolute",
    top: 30,
    left: 20,
  },
  backArrow: {
    fontSize: 40,
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A1A1A",
    textAlign: "center",
    marginBottom: 40,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#007AFF",
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: "#28A745",
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    marginTop: 10,
  },
  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  footerText: {
    color: "#333",
    fontSize: 14,
    marginRight: 4,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    textDecorationLine: "underline",
  },
});
