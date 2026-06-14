import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { circuits } from "../../data/circuits";

export default function QuizCircuitScreen() {
  const router = useRouter();

  const [questions] = useState(() =>
    [...circuits].sort(() => Math.random() - 0.5).slice(0, 20),
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [locked, setLocked] = useState(false);

  const currentQuestion = questions[currentIndex];

  const options = useMemo(() => {
    if (!currentQuestion) return [];

    const wrongAnswers = circuits
      .filter((item) => item.vietnamese !== currentQuestion.vietnamese)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((item) => item.vietnamese);

    return [currentQuestion.vietnamese, ...wrongAnswers].sort(
      () => Math.random() - 0.5,
    );
  }, [currentQuestion?.english]);

  // CHỌN ĐÁP ÁN
  const handleAnswer = (option: string) => {
    if (locked) return;

    setSelected(option);
    setLocked(true);

    if (option === currentQuestion.vietnamese) {
      setScore((prev) => prev + 1);
    }
  };

  // NEXT
  const handleNext = () => {
    if (!locked) return;

    if (currentIndex === questions.length - 1) {
      setFinished(true);
      return;
    }

    setSelected(null);
    setLocked(false);
    setCurrentIndex((prev) => prev + 1);
  };

  if (finished) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.resultTitle}>🎉 Hoàn thành bài kiểm tra</Text>

        <Text style={styles.score}>
          {score} / {questions.length}
        </Text>

        <Pressable style={styles.homeBtn} onPress={() => router.replace("/")}>
          <Text style={styles.homeText}>🏠 Về trang chủ</Text>
        </Pressable>

        <Pressable
          style={styles.homeBtn}
          onPress={() => router.replace("/quiz/system-quiz")}
        >
          <Text style={styles.homeText}>🔁 Làm lại</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable onPress={() => router.replace("/")}>
          <Text style={styles.back}>⬅ Home</Text>
        </Pressable>

        <Text style={styles.counter}>
          Câu {currentIndex + 1}/{questions.length}
        </Text>

        <View style={{ width: 60 }} />
      </View>

      {/* QUESTION */}
      <Text style={styles.question}>{currentQuestion.english}</Text>

      {/* OPTIONS */}
      {options.map((option) => {
        const isCorrect = option === currentQuestion.vietnamese;
        const isSelected = option === selected;

        let bgColor = "#fff";

        if (locked) {
          if (isCorrect) {
            bgColor = "#dcfce7"; // luôn highlight đúng
          }

          if (isSelected && !isCorrect) {
            bgColor = "#fee2e2"; // sai → đỏ
          }
        }

        return (
          <Pressable
            key={option}
            onPress={() => handleAnswer(option)}
            style={[styles.option, { backgroundColor: bgColor }]}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        );
      })}

      {/* NEXT BUTTON */}
      <Pressable
        onPress={handleNext}
        disabled={!locked}
        style={[styles.nextBtn, !locked && styles.nextDisabled]}
      >
        <Text style={styles.nextText}>➡ Next</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8fafc",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  back: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2563eb",
  },

  counter: {
    fontSize: 16,
    color: "#64748b",
  },

  question: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 40,
  },

  option: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  optionText: {
    fontSize: 16,
  },

  nextBtn: {
    marginTop: 20,
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  nextDisabled: {
    backgroundColor: "#94a3b8",
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  resultTitle: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 100,
  },

  score: {
    fontSize: 40,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
  },

  homeBtn: {
    marginTop: 20,
    backgroundColor: "#e2e8f0",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  homeText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
