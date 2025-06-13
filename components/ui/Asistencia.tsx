import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import QRCode from "react-native-qrcode-svg";
import "react-native-get-random-values"; // Compatibilidad con crypto.getRandomValues
import { v4 as uuidv4 } from "uuid";

const { width } = Dimensions.get("window");

// === Tipos e Interfaces ===
interface ClassData {
  id: string;
  subject: string;
  teacher: string;
}

// === Datos de ejemplo ===
const classData: ClassData[] = [
  {
    id: "1",
    subject: "Gestión de redes",
    teacher: "Ing. Uriel Martinez",
  },
  {
    id: "2",
    subject: "Emprendimiento e innovación",
    teacher: "Prof. Yorlenne",
  },
  {
    id: "3",
    subject: "Auditoría de Sistemas",
    teacher: "Ing. Frijolito",
  },
];

// === Tema de estilos ===
const theme = {
  colors: {
    primary: "#49A1DB",
    background: "#FFFFFF",
    cardBg: "#F9F9F9",
    text: "#333333",
    muted: "#888888",
  },
  spacing: {
    s: 8,
    m: 15,
    l: 20,
    xl: 30,
  },
  radii: {
    s: 6,
    m: 10,
    l: 20,
  },
};

// === Componentes ===
const Header: React.FC = () => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Asistencia</Text>
  </View>
);

const ClassDetail: React.FC<{
  item: ClassData;
  onBack: () => void;
}> = ({ item, onBack }) => {
  const [qr, setQr] = useState<string>("");

  const generateQr = useCallback(() => {
    const uniqueCode = uuidv4(); // Genera UUID compatible con Hermes
    setQr(uniqueCode);
  }, []);

  return (
    <View style={styles.detailContainer}>
      <View style={styles.classHeader}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backTxt}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerSubject} numberOfLines={1}>
            {item.subject}
          </Text>
          <Text style={styles.headerTeacher} numberOfLines={1}>
            {item.teacher}
          </Text>
        </View>
      </View>

      <View style={styles.qrSection}>
        {qr ? (
          <>
            <Text style={styles.qrTitle}>Código QR para asistencia</Text>
            <View style={styles.qrContainer}>
              <QRCode value={qr} size={200} />
            </View>
            <Text style={styles.qrHint}>
              Escanea este código para registrar tu asistencia
            </Text>
          </>
        ) : (
          <TouchableOpacity style={styles.qrButton} onPress={generateQr}>
            <Text style={styles.qrButtonText}>Generar QR de Asistencia</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const ClassCard: React.FC<{
  item: ClassData;
  onSelect: (id: string) => void;
}> = ({ item, onSelect }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onSelect(item.id)}
    activeOpacity={0.8}
  >
    <View style={styles.cardContent}>
      <Text style={styles.cardSubject}>{item.subject}</Text>
      <Text style={styles.cardTeacher}>{item.teacher}</Text>
    </View>
  </TouchableOpacity>
);

// === App Principal ===
export default function App() {
  const [selectedTrimester, setSelectedTrimester] = useState("1");
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

  const handleSelect = useCallback((id: string) => {
    setSelectedClassId(id);
  }, []);

  const handleBack = useCallback(() => {
    setSelectedClassId(null);
  }, []);

  const selectedClass = classData.find((c) => c.id === selectedClassId);

  return (
    <View style={styles.container}>
      <Header />

      {selectedClass ? (
        <ClassDetail item={selectedClass} onBack={handleBack} />
      ) : (
        <View style={styles.content}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedTrimester}
              onValueChange={setSelectedTrimester}
              style={styles.picker}
            >
              {["1", "2", "3", "4"].map((t) => (
                <Picker.Item key={t} label={`Trimestre ${t}`} value={t} />
              ))}
            </Picker>
          </View>

          <FlatList
            data={classData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ClassCard item={item} onSelect={handleSelect} />
            )}
            contentContainerStyle={styles.listContent}
          />
        </View>
      )}
    </View>
  );
}

// === Estilos ===
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.l,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: theme.spacing.s,
  },
  content: {
    flex: 1,
    padding: theme.spacing.m,
  },
  pickerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: theme.radii.m,
    marginBottom: theme.spacing.l,
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  listContent: {
    paddingBottom: theme.spacing.l,
  },
  card: {
    backgroundColor: theme.colors.cardBg,
    borderRadius: theme.radii.m,
    padding: theme.spacing.m,
    marginVertical: theme.spacing.s,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  cardContent: {
    flex: 1,
  },
  cardSubject: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors.text,
    marginBottom: 4,
  },
  cardTeacher: {
    fontSize: 15,
    color: theme.colors.muted,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: "#e8f4fa",
  },
  classHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.m,
  },
  backButton: {
    marginRight: theme.spacing.s,
  },
  backTxt: {
    fontSize: 28,
    color: "white",
    fontWeight: "bold",
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: theme.spacing.s,
  },
  headerSubject: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerTeacher: {
    fontSize: 16,
    color: "white",
    opacity: 0.9,
  },
  qrSection: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing.l,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: theme.spacing.m,
    textAlign: "center",
    color: theme.colors.text,
  },
  qrContainer: {
    backgroundColor: "white",
    padding: theme.spacing.m,
    borderRadius: theme.radii.m,
    elevation: 5,
  },
  qrHint: {
    marginTop: theme.spacing.m,
    color: theme.colors.muted,
    textAlign: "center",
    maxWidth: "80%",
  },
  qrButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.radii.m,
    alignSelf: "center",
  },
  qrButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
