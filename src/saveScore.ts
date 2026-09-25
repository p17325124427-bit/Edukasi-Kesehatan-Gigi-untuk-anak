import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export async function saveScore(data: {
  nama: string;
  skor: number;
}) {
  try {
    await addDoc(collection(db, "skor"), {
      nama: data.nama,
      skor: data.skor,
      waktu: serverTimestamp(),
    });

    console.log("Skor berhasil disimpan");
  } catch (error) {
    console.error("Gagal menyimpan skor:", error);
  }
}
