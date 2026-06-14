import { router } from "expo-router";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🚗 Auto Quiz</Text>

      <Text style={styles.subtitle}>Học lý thuyết ô tô</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/quiz/system-quiz")}
      >
        <Text style={styles.icon}>🚗</Text>

        <View>
          <Text style={styles.cardTitle}>Hệ thống</Text>

          <Text style={styles.cardDesc}>
            Kiểm tra kiến thức các hệ thống trên xe
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/quiz/circuit-quiz")}
      >
        <Text style={styles.icon}>⚡</Text>

        <View>
          <Text style={styles.cardTitle}>Mạch điện</Text>

          <Text style={styles.cardDesc}>Kiểm tra kiến thức mạch điện ô tô</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
    padding: 20,
    justifyContent: "center",
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#64748B",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  icon: {
    fontSize: 36,
    marginRight: 16,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
  },

  cardDesc: {
    fontSize: 14,
    color: "#64748B",
    marginTop: 4,
  },
});
