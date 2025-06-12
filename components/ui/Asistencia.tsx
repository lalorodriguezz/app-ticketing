import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const { width, height } = Dimensions.get("window");

const attendanceData = [
  {
    date: "22/05/2025",
    time: "08:00 am",
    subject: "Gestión de redes",
    teacher: "Ing. Uriel Martinez",
    status: "Presente",
  },
  {
    date: "22/05/2025",
    time: "10:50 am",
    subject: "Emprendimiento e innovación",
    teacher: "Prof. Yorlenne",
    status: "Presente",
  },
  {
    date: "22/05/2025",
    time: "12:50 pm",
    subject: "Auditoría de Sistemas",
    teacher: "Ing. Frijolito",
    status: "Ausente",
  },
];

export default function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedTrimester, setSelectedTrimester] = useState("1");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mis asistencias</Text>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar Menu */}
      {menuVisible && (
        <View style={styles.sidebar}>
          <TouchableOpacity
            style={styles.closeMenu}
            onPress={() => setMenuVisible(false)}
          >
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.menuItem}>Mis asistencias</Text>
          <Text style={styles.menuItem}>Mis tickets</Text>
        </View>
      )}

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Asistencias</Text>

        {/* Trimester Picker */}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedTrimester}
            onValueChange={(itemValue) => setSelectedTrimester(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Trimestre 1" value="1" />
            <Picker.Item label="Trimestre 2" value="2" />
            <Picker.Item label="Trimestre 3" value="3" />
            <Picker.Item label="Trimestre 4" value="4" />
          </Picker>
        </View>

        {/* Attendance Cards */}
        <FlatList
          data={attendanceData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardLeft}>
                <Text style={styles.cardDate}>{item.date}</Text>
                <Text style={styles.cardTime}>{item.time}</Text>
              </View>
              <View style={styles.cardRight}>
                <Text style={styles.cardSubject}>{item.subject}</Text>
                <Text style={styles.cardTeacher}>{item.teacher}</Text>
                <Text
                  style={[
                    styles.status,
                    { color: item.status === "Presente" ? "green" : "red" },
                  ]}
                >
                  {item.status}
                </Text>
              </View>
            </View>
          )}
        />
        <TouchableOpacity style={styles.qrButton}>
          <Ionicons name="qr-code" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    height: 60,
    backgroundColor: "#49A1DB",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#2ecc71",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  logoutText: {
    color: "white",
    fontSize: 12,
  },
  sidebar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: height,
    width: 200,
    backgroundColor: "#2980b9",
    paddingTop: 60,
    zIndex: 10,
  },
  closeMenu: {
    position: "absolute",
    top: 15,
    right: 15,
  },
  menuItem: {
    color: "white",
    fontSize: 16,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3498db",
  },
  content: {
    flex: 1,
    padding: 15,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  pickerContainer: {
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 5,
    elevation: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  cardLeft: {
    flex: 1,
    justifyContent: "center",
  },
  cardRight: {
    flex: 2,
    justifyContent: "center",
  },
  cardDate: {
    fontWeight: "bold",
    fontSize: 14,
  },
  cardTime: {
    fontSize: 12,
    color: "#7f8c8d",
  },
  cardSubject: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardTeacher: {
    fontSize: 14,
    color: "#34495e",
  },
  status: {
    marginTop: 5,
    fontWeight: "bold",
  },
  qrButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#49A1DB",
    borderRadius: 30,
    padding: 15,
    elevation: 4,
  },
});
